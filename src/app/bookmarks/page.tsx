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
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="text-gray-300 hover:text-gray-900 transition-colors group"
        >
          <svg className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <svg className="h-7 w-7 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Bookmarks
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {loading ? "Loading…" : `${articles.length} saved article${articles.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {!loading && articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-5">
            <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg font-medium">No bookmarks yet</p>
          <p className="text-gray-300 text-sm mt-1">
            Save articles from the feed to find them here later.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Browse the feed
          </Link>
        </div>
      ) : (
        <ArticleList articles={articles} loading={loading} />
      )}
    </div>
  );
}
