export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS articles (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  guid          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  url           TEXT NOT NULL,
  source_name   TEXT NOT NULL,
  source_type   TEXT NOT NULL DEFAULT 'rss',
  source_feed   TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'Industry News',
  description   TEXT,
  summary       TEXT,
  author        TEXT,
  image_url     TEXT,
  published_at  DATETIME NOT NULL,
  fetched_at    DATETIME NOT NULL DEFAULT (datetime('now')),
  is_read       INTEGER NOT NULL DEFAULT 0,
  is_bookmarked INTEGER NOT NULL DEFAULT 0,
  score         INTEGER,
  comment_count INTEGER
);

CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_source ON articles(source_name);
CREATE INDEX IF NOT EXISTS idx_articles_is_read ON articles(is_read);
CREATE INDEX IF NOT EXISTS idx_articles_is_bookmarked ON articles(is_bookmarked);
CREATE INDEX IF NOT EXISTS idx_articles_url ON articles(url);
CREATE INDEX IF NOT EXISTS idx_articles_fetched_at ON articles(fetched_at DESC);
`;
