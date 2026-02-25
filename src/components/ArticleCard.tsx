import Link from "next/link";
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
  const isUnread = !article.is_read;
  const description = article.summary || article.description || "";

  return (
    <Link href={`/article/${article.id}`}>
      <div
        className={`bg-white rounded-xl border p-4 hover:shadow-md transition-all cursor-pointer ${
          isUnread ? "border-gray-200" : "border-gray-100 opacity-75"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <SourceBadge source={article.source_name} />
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <span
                  className={`w-2 h-2 rounded-full ${CATEGORY_DOT[article.category] || "bg-gray-400"}`}
                />
                {article.category}
              </span>
              <span className="text-xs text-gray-400">
                {timeAgo(article.published_at)}
              </span>
            </div>

            <h3
              className={`text-sm leading-snug mb-1.5 ${
                isUnread ? "font-semibold text-gray-900" : "text-gray-600"
              }`}
            >
              {article.title}
            </h3>

            {description && (
              <p className="text-xs text-gray-500 leading-relaxed">
                {truncate(description, 150)}
              </p>
            )}
          </div>

          <div className="flex-shrink-0 pt-1">
            <BookmarkButton
              articleId={article.id}
              initialBookmarked={!!article.is_bookmarked}
            />
          </div>
        </div>

        {article.score !== null && (
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
            <span>{article.score} pts</span>
            {article.comment_count !== null && (
              <span>{article.comment_count} comments</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
