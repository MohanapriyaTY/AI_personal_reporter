"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArticleList } from "@/components/ArticleList";
import { CategoryFilter } from "@/components/CategoryFilter";
import { DatePicker } from "@/components/DatePicker";
import { SearchBar } from "@/components/SearchBar";
import type { Article } from "@/lib/types";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [loading, setLoading] = useState(true);

  // Sync filters to URL so "Back to feed" can restore them
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (date) params.set("date", date);
    if (search) params.set("search", search);
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/", { scroll: false });
  }, [category, date, search, router]);

  const fetchArticles = useCallback(async () => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (date) params.set("date", date);
    if (search) params.set("search", search);
    params.set("limit", "60");

    setLoading(true);
    try {
      const res = await fetch(`/api/articles?${params}`);
      const data = await res.json();
      setArticles(data.articles || []);
      setCounts(data.counts || {});
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  }, [category, date, search]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
          Today&apos;s AI &amp; Tech Updates
        </h2>
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-700">{total}</span> articles from{" "}
          <span className="font-semibold text-gray-700">{Object.keys(counts).length}</span> categories
          {date && (
            <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
              📅 {date}
              <button
                onClick={() => setDate("")}
                className="ml-0.5 hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}
          {search && (
            <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 bg-violet-50 text-violet-700 rounded-md text-xs font-medium">
              🔍 &quot;{search}&quot;
              <button
                onClick={() => setSearch("")}
                className="ml-0.5 hover:text-violet-900"
              >
                ✕
              </button>
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <DatePicker value={date} onChange={setDate} />
      </div>

      <CategoryFilter
        selected={category}
        onChange={setCategory}
        counts={counts}
      />

      <ArticleList articles={articles} loading={loading} />
    </div>
  );
}
