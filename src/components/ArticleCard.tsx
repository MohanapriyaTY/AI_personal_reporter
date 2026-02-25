"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SourceBadge } from "./SourceBadge";
import { BookmarkButton } from "./BookmarkButton";
import { timeAgo } from "@/utils/date";
import { truncate } from "@/utils/text";
import type { Article } from "@/lib/types";

const CATEGORY_DOT: Record<string, string> = {
  "AI/ML": "bg-blue-500",
  "Dev Tools": "bg-green-500",
  "Industry News": "bg-purple-500",
  Research: "bg-amber-500",
  Social: "bg-sky-500",
};

export function ArticleCard({ article }: { article: Article }) {
  const searchParams = useSearchParams();
  const isUnread = !article.is_read;
  const description = article.summary || article.description || "";

  // Preserve current filters in the article link
  const backParams = searchParams.toString();
  const articleHref = backParams
    ? `/article/${article.id}?${backParams}`
    : `/article/${article.id}`;

  return (
    <Link href={articleHref}>
      <div
        className={`card-hover bg-white rounded-2xl border p-5 cursor-pointer group ${
          isUnread ? "border-gray-200/80" : "border-gray-100 opacity-70"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
              <SourceBadge source={article.source_name} />
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[article.category] || "bg-gray-400"}`}
                />
                {article.category}
              </span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-gray-400">
                {timeAgo(article.published_at)}
              </span>
            </div>

            <h3
              className={`text-[15px] leading-snug mb-2 group-hover:text-blue-600 transition-colors ${
                isUnread ? "font-semibold text-gray-900" : "text-gray-600"
              }`}
            >
              {article.title}
            </h3>

            {description && (
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                {truncate(description, 160)}
              </p>
            )}
          </div>

          <div className="flex-shrink-0 pt-0.5">
            <BookmarkButton
              articleId={article.id}
              initialBookmarked={!!article.is_bookmarked}
            />
          </div>
        </div>

        {article.score !== null && (
          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              {article.score}
            </span>
            {article.comment_count !== null && (
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {article.comment_count}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
