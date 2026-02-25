"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [fetching, setFetching] = useState(false);
  const [fetchResult, setFetchResult] = useState<string | null>(null);

  async function handleFetch() {
    setFetching(true);
    setFetchResult(null);
    try {
      const res = await fetch("/api/fetch", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setFetchResult(data.error);
      } else {
        setFetchResult(`+${data.fetched} new articles`);
      }
      setTimeout(() => setFetchResult(null), 5000);
      if (!data.error) window.location.reload();
    } catch {
      setFetchResult("Fetch failed");
    } finally {
      setFetching(false);
    }
  }

  return (
    <header className="glass bg-gray-900/95 text-white border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
            AI
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Tech Reporter</h1>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {fetchResult && (
            <span className={`text-sm px-3 py-1 rounded-full animate-fade-in-up ${
              fetchResult.includes("failed") || fetchResult.includes("Too many")
                ? "text-red-300 bg-red-500/10"
                : "text-emerald-300 bg-emerald-500/10"
            }`}>
              {fetchResult}
            </span>
          )}

          <Link
            href="/bookmarks"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="hidden sm:inline">Bookmarks</span>
          </Link>

          <button
            onClick={handleFetch}
            disabled={fetching}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-blue-800 disabled:to-blue-800 disabled:cursor-wait text-sm font-medium rounded-lg transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 disabled:shadow-none"
          >
            {fetching ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Fetching...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Fetch New
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
