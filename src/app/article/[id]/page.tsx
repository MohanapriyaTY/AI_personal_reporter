import Link from "next/link";
import { getArticleById, markAsRead } from "@/lib/articles";
import { SourceBadge } from "@/components/SourceBadge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { formatDate } from "@/utils/date";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const article = getArticleById(parseInt(id));

  if (!article) {
    notFound();
  }

  // Mark as read
  markAsRead(article.id, true);

  const content = article.summary || article.description || "";

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to feed
      </Link>

      <article>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <SourceBadge source={article.source_name} />
          <span className="text-sm text-gray-500">{article.category}</span>
          <span className="text-sm text-gray-400">
            {formatDate(article.published_at)}
          </span>
          <BookmarkButton
            articleId={article.id}
            initialBookmarked={!!article.is_bookmarked}
            size="md"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
          {article.title}
        </h1>

        {article.author && (
          <p className="text-sm text-gray-500 mb-6">By {article.author}</p>
        )}

        {content && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            {article.summary && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  AI Summary
                </span>
              </div>
            )}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>
        )}

        {article.score !== null && (
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{article.score} points</span>
            {article.comment_count !== null && (
              <span>{article.comment_count} comments</span>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Read Original Article
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <div className="text-xs text-gray-400 self-center">
            Source: {article.source_name} via {article.source_type}
          </div>
        </div>
      </article>
    </div>
  );
}
