import type { NewArticle } from "./types";
import { categorize } from "./categorizer";

const BSKY_SEARCH_URL = "https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts";

export async function fetchBlueskyPosts(
  searchTerms: string[],
  limit: number = 10
): Promise<NewArticle[]> {
  const articles: NewArticle[] = [];
  const seenUris = new Set<string>();

  for (const term of searchTerms) {
    try {
      const url = new URL(BSKY_SEARCH_URL);
      url.searchParams.set("q", term);
      url.searchParams.set("limit", String(Math.min(limit, 25)));
      url.searchParams.set("sort", "top");

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json",
          "User-Agent": "AI-Personal-Reporter/1.0",
        },
      });

      if (!response.ok) {
        console.warn(
          `Bluesky search for "${term}": ${response.status} ${response.statusText} (search may require auth)`
        );
        continue;
      }

      const data = await response.json();
      const posts = data.posts || [];

      for (const post of posts) {
        if (seenUris.has(post.uri)) continue;
        seenUris.add(post.uri);

        const record = post.record as {
          text?: string;
          createdAt?: string;
        };
        const text = record?.text || "";

        if (text.length < 50) continue;

        const handle = post.author.handle;
        const postId = post.uri.split("/").pop();
        const postUrl = `https://bsky.app/profile/${handle}/post/${postId}`;

        const title =
          text.length > 120 ? text.slice(0, 120).trimEnd() + "..." : text;

        const category = categorize(title, text, "Social");

        articles.push({
          guid: post.uri,
          title,
          url: postUrl,
          source_name: "Bluesky",
          source_type: "bluesky",
          source_feed: `bluesky:search:${term}`,
          category,
          description: text,
          author: post.author.displayName || handle,
          image_url: post.author.avatar || null,
          published_at: record?.createdAt || new Date().toISOString(),
          score: post.likeCount || null,
          comment_count: post.replyCount || null,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      console.warn(
        `Bluesky search error for "${term}":`,
        (err as Error).message
      );
    }
  }

  return articles;
}
