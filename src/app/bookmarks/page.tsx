"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import type { Article } from "@/lib/types";

export default function BookmarksPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/articles?bookmarked=true&limit=100");
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="text-gray-400 hover:text-gray-900 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">Bookmarks</h2>
        <span className="text-sm text-gray-500">
          {articles.length} saved articles
        </span>
      </div>

      <ArticleList articles={articles} loading={loading} />
    </div>
  );
}
