export interface Article {
  id: number;
  guid: string;
  title: string;
  url: string;
  source_name: string;
  source_type: "rss" | "youtube" | "bluesky" | "github";
  source_feed: string;
  category: Category;
  description: string | null;
  summary: string | null;
  author: string | null;
  image_url: string | null;
  published_at: string;
  fetched_at: string;
  is_read: number;
  is_bookmarked: number;
  score: number | null;
  comment_count: number | null;
}

export type Category =
  | "AI/ML"
  | "Dev Tools"
  | "Industry News"
  | "Research"
  | "Social";

export const CATEGORIES: Category[] = [
  "AI/ML",
  "Dev Tools",
  "Industry News",
  "Research",
  "Social",
];

export interface NewArticle {
  guid: string;
  title: string;
  url: string;
  source_name: string;
  source_type: "rss" | "youtube" | "bluesky" | "github";
  source_feed: string;
  category: string;
  description: string | null;
  author: string | null;
  image_url: string | null;
  published_at: string;
  score: number | null;
  comment_count: number | null;
}

export interface ArticleFilters {
  category?: string;
  date?: string;
  search?: string;
  source?: string;
  bookmarked?: boolean;
  unreadOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface ArticlesResult {
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FetchResult {
  fetched: number;
  skipped: number;
  errors: string[];
}

export interface SummarizeResult {
  summarized: number;
  errors: string[];
}

export interface FeedSource {
  name: string;
  url: string;
  type: "rss" | "youtube" | "bluesky" | "github";
  defaultCategory: Category;
}
