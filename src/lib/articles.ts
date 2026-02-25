import { getDb } from "./db";
import type { Article, NewArticle, ArticleFilters, ArticlesResult } from "./types";

export function insertArticle(data: NewArticle): boolean {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO articles
    (guid, title, url, source_name, source_type, source_feed, category, description, author, image_url, published_at, score, comment_count)
    VALUES (@guid, @title, @url, @source_name, @source_type, @source_feed, @category, @description, @author, @image_url, @published_at, @score, @comment_count)
  `);
  const result = stmt.run(data);
  return result.changes > 0;
}

export function getArticles(filters: ArticleFilters): ArticlesResult {
  const db = getDb();
  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (filters.category) {
    conditions.push("category = @category");
    params.category = filters.category;
  }

  if (filters.date) {
    conditions.push("DATE(published_at) = @date");
    params.date = filters.date;
  }

  if (filters.search) {
    conditions.push("(title LIKE @search OR description LIKE @search)");
    params.search = `%${filters.search}%`;
  }

  if (filters.source) {
    conditions.push("source_name = @source");
    params.source = filters.source;
  }

  if (filters.bookmarked) {
    conditions.push("is_bookmarked = 1");
  }

  if (filters.unreadOnly) {
    conditions.push("is_read = 0");
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const page = filters.page || 1;
  const limit = filters.limit || 50;
  const offset = (page - 1) * limit;

  const countStmt = db.prepare(`SELECT COUNT(*) as total FROM articles ${where}`);
  const { total } = countStmt.get(params) as { total: number };

  const articlesStmt = db.prepare(`
    SELECT * FROM articles ${where}
    ORDER BY published_at DESC
    LIMIT @limit OFFSET @offset
  `);
  const articles = articlesStmt.all({ ...params, limit, offset }) as Article[];

  return {
    articles,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export function getArticleById(id: number): Article | undefined {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM articles WHERE id = ?");
  return stmt.get(id) as Article | undefined;
}

export function markAsRead(id: number, isRead: boolean): void {
  const db = getDb();
  const stmt = db.prepare("UPDATE articles SET is_read = ? WHERE id = ?");
  stmt.run(isRead ? 1 : 0, id);
}

export function toggleBookmark(id: number, isBookmarked: boolean): void {
  const db = getDb();
  const stmt = db.prepare("UPDATE articles SET is_bookmarked = ? WHERE id = ?");
  stmt.run(isBookmarked ? 1 : 0, id);
}

export function updateArticleSummary(id: number, summary: string): void {
  const db = getDb();
  const stmt = db.prepare("UPDATE articles SET summary = ? WHERE id = ?");
  stmt.run(summary, id);
}

export function getArticlesWithoutSummary(limit: number = 20): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT * FROM articles
    WHERE summary IS NULL
    ORDER BY published_at DESC
    LIMIT ?
  `);
  return stmt.all(limit) as Article[];
}

export function articleExistsByGuid(guid: string): boolean {
  const db = getDb();
  const stmt = db.prepare("SELECT 1 FROM articles WHERE guid = ?");
  return !!stmt.get(guid);
}

export function getRecentArticleUrls(hoursBack: number = 48): string[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT url FROM articles
    WHERE fetched_at >= datetime('now', '-' || ? || ' hours')
  `);
  const rows = stmt.all(hoursBack) as { url: string }[];
  return rows.map((r) => r.url);
}

export function getRecentArticleTitles(hoursBack: number = 48): string[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT title FROM articles
    WHERE fetched_at >= datetime('now', '-' || ? || ' hours')
  `);
  const rows = stmt.all(hoursBack) as { title: string }[];
  return rows.map((r) => r.title);
}

export function getCategoryCounts(date?: string): Record<string, number> {
  const db = getDb();
  let query = "SELECT category, COUNT(*) as count FROM articles";
  const params: Record<string, string> = {};

  if (date) {
    query += " WHERE DATE(published_at) = @date";
    params.date = date;
  }

  query += " GROUP BY category";
  const stmt = db.prepare(query);
  const rows = stmt.all(params) as { category: string; count: number }[];
  const counts: Record<string, number> = {};
  for (const row of rows) {
    counts[row.category] = row.count;
  }
  return counts;
}

export function getSourceNames(): string[] {
  const db = getDb();
  const stmt = db.prepare("SELECT DISTINCT source_name FROM articles ORDER BY source_name");
  const rows = stmt.all() as { source_name: string }[];
  return rows.map((r) => r.source_name);
}
