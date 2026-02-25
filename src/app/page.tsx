"use client";

import { useState, useEffect, useCallback } from "react";
import { ArticleList } from "@/components/ArticleList";
import { CategoryFilter } from "@/components/CategoryFilter";
import { DatePicker } from "@/components/DatePicker";
import { SearchBar } from "@/components/SearchBar";
import type { Article } from "@/lib/types";

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("all");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Today&apos;s AI &amp; Tech Updates
        </h2>
        <p className="text-sm text-gray-500">
          {total} articles from {Object.keys(counts).length} categories
          {date && ` on ${date}`}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
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
