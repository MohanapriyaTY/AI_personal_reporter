import type { FeedSource } from "./types";

export const FEED_SOURCES: FeedSource[] = [
  // --- Tech News (RSS) ---
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    type: "rss",
    defaultCategory: "Industry News",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    type: "rss",
    defaultCategory: "Industry News",
  },
  {
    name: "Ars Technica",
    url: "https://arstechnica.com/ai/feed",
    type: "rss",
    defaultCategory: "Industry News",
  },
  {
    name: "Wired",
    url: "https://www.wired.com/feed/tag/ai/latest/rss",
    type: "rss",
    defaultCategory: "Industry News",
  },

  // --- AI/ML Blogs & Research (RSS) ---
  {
    name: "OpenAI Blog",
    url: "https://openai.com/news/rss.xml",
    type: "rss",
    defaultCategory: "AI/ML",
  },
  {
    name: "Anthropic Blog",
    url: "https://raw.githubusercontent.com/Olshansk/rss-feeds/main/feeds/feed_anthropic_news.xml",
    type: "rss",
    defaultCategory: "AI/ML",
  },
  {
    name: "Google DeepMind",
    url: "https://deepmind.google/blog/rss.xml",
    type: "rss",
    defaultCategory: "Research",
  },
  {
    name: "MIT Tech Review",
    url: "https://www.technologyreview.com/feed/",
    type: "rss",
    defaultCategory: "Research",
  },

  // --- Dev Community (RSS) ---
  {
    name: "Hacker News",
    url: "https://hnrss.org/frontpage?q=AI+OR+machine+learning+OR+LLM+OR+GPT+OR+Claude&points=50",
    type: "rss",
    defaultCategory: "Dev Tools",
  },
  {
    name: "Reddit r/artificial",
    url: "https://www.reddit.com/r/artificial/.rss",
    type: "rss",
    defaultCategory: "AI/ML",
  },
  {
    name: "Dev.to AI",
    url: "https://dev.to/feed/tag/ai",
    type: "rss",
    defaultCategory: "Dev Tools",
  },

  // YouTube RSS feeds are currently unavailable (deprecated by YouTube).
  // When they return, add channels here with type: "youtube".

  // --- Product Hunt (RSS) ---
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com/feed",
    type: "rss",
    defaultCategory: "Dev Tools",
  },

  // --- GitHub Trending (RSS) ---
  {
    name: "GitHub Trending",
    url: "https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml",
    type: "github",
    defaultCategory: "Dev Tools",
  },
];

// Bluesky search terms for AI/tech content
export const BLUESKY_SEARCH_TERMS = [
  "artificial intelligence",
  "machine learning",
  "LLM",
  "GPT",
  "Claude AI",
  "AI tools",
  "deep learning",
];
