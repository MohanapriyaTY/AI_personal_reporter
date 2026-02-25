import Parser from "rss-parser";
import { FEED_SOURCES, BLUESKY_SEARCH_TERMS } from "./feeds";
import { insertArticle, articleExistsByGuid } from "./articles";
import { isDuplicate } from "./dedup";
import { categorize } from "./categorizer";
import { fetchBlueskyPosts } from "./bluesky";
import { stripHtml, decodeEntities } from "@/utils/text";
import type { FeedSource, FetchResult } from "./types";

const parser = new Parser({
  timeout: 15000,
  headers: {
    "User-Agent":
      "AI-Personal-Reporter/1.0 (personal news aggregator)",
  },
  customFields: {
    item: [
      ["media:thumbnail", "mediaThumbnail"],
      ["media:content", "mediaContent"],
    ],
  },
});

export async function fetchAllFeeds(): Promise<FetchResult> {
  let fetched = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Fetch RSS feeds
  for (const source of FEED_SOURCES) {
    try {
      console.log(`Fetching: ${source.name}...`);
      const result = await fetchRSSFeed(source);
      fetched += result.fetched;
      skipped += result.skipped;
      console.log(
        `  ${source.name}: +${result.fetched} new, ${result.skipped} skipped`
      );
    } catch (err) {
      const msg = `[${source.name}] ${(err as Error).message}`;
      errors.push(msg);
      console.error(`  ${msg}`);
    }
  }

  // Fetch Bluesky posts
  try {
    console.log("Fetching: Bluesky...");
    const posts = await fetchBlueskyPosts(BLUESKY_SEARCH_TERMS, 10);
    let bskyFetched = 0;
    let bskySkipped = 0;

    for (const post of posts) {
      if (articleExistsByGuid(post.guid)) {
        bskySkipped++;
        continue;
      }
      if (insertArticle(post)) {
        bskyFetched++;
      } else {
        bskySkipped++;
      }
    }

    fetched += bskyFetched;
    skipped += bskySkipped;
    console.log(
      `  Bluesky: +${bskyFetched} new, ${bskySkipped} skipped`
    );
  } catch (err) {
    const msg = `[Bluesky] ${(err as Error).message}`;
    errors.push(msg);
    console.error(`  ${msg}`);
  }

  return { fetched, skipped, errors };
}

async function fetchRSSFeed(
  source: FeedSource
): Promise<{ fetched: number; skipped: number }> {
  const feed = await parser.parseURL(source.url);
  let fetched = 0;
  let skipped = 0;

  for (const item of feed.items) {
    const guid = item.guid || item.link || "";
    if (!guid) {
      skipped++;
      continue;
    }

    if (articleExistsByGuid(guid)) {
      skipped++;
      continue;
    }

    const url = item.link || "";
    const title = decodeEntities(item.title || "Untitled");

    if (url && isDuplicate(url, title)) {
      skipped++;
      continue;
    }

    const description = stripHtml(
      item.contentSnippet || item.content || item.summary || ""
    );
    const category = categorize(title, description, source.defaultCategory);
    const imageUrl = extractImageUrl(item as unknown as Record<string, unknown>);

    const inserted = insertArticle({
      guid,
      title,
      url,
      source_name: source.name,
      source_type: source.type,
      source_feed: source.url,
      category,
      description: description || null,
      author: item.creator || (item as unknown as Record<string, string>).author || null,
      image_url: imageUrl,
      published_at: item.isoDate || new Date().toISOString(),
      score: null,
      comment_count: null,
    });

    if (inserted) {
      fetched++;
    } else {
      skipped++;
    }
  }

  return { fetched, skipped };
}

function extractImageUrl(item: Record<string, unknown>): string | null {
  // Try media:thumbnail
  const mediaThumbnail = item.mediaThumbnail as
    | { $?: { url?: string } }
    | undefined;
  if (mediaThumbnail?.$?.url) return mediaThumbnail.$.url;

  // Try media:content
  const mediaContent = item.mediaContent as
    | { $?: { url?: string; medium?: string } }
    | undefined;
  if (mediaContent?.$?.url && mediaContent.$.medium === "image")
    return mediaContent.$.url;

  // Try enclosure
  const enclosure = item.enclosure as
    | { url?: string; type?: string }
    | undefined;
  if (enclosure?.url && enclosure.type?.startsWith("image"))
    return enclosure.url;

  return null;
}
