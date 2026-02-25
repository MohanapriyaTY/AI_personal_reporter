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
      setFetchResult(`+${data.fetched} new articles`);
      setTimeout(() => setFetchResult(null), 5000);
      window.location.reload();
    } catch {
      setFetchResult("Fetch failed");
    } finally {
      setFetching(false);
    }
  }

  return (
    <header className="bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">
            AI
          </div>
          <h1 className="text-lg font-semibold">Tech Reporter</h1>
        </Link>

        <div className="flex items-center gap-4">
          {fetchResult && (
            <span className="text-sm text-green-400">{fetchResult}</span>
          )}

          <Link
            href="/bookmarks"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Bookmarks
          </Link>

          <button
            onClick={handleFetch}
            disabled={fetching}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-wait text-sm font-medium rounded-lg transition-colors"
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
              "Fetch New"
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
