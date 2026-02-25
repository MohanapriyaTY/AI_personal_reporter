import Link from "next/link";
import { getArticleById, markAsRead } from "@/lib/articles";
import { SourceBadge } from "@/components/SourceBadge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { formatDate } from "@/utils/date";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ArticleDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const article = getArticleById(parseInt(id));

  if (!article) {
    notFound();
  }

  // Mark as read
  markAsRead(article.id, true);

  // Build "Back to feed" URL preserving filters
  const backParams = new URLSearchParams();
  if (resolvedSearchParams.category) backParams.set("category", String(resolvedSearchParams.category));
  if (resolvedSearchParams.date) backParams.set("date", String(resolvedSearchParams.date));
  if (resolvedSearchParams.search) backParams.set("search", String(resolvedSearchParams.search));
  const backQuery = backParams.toString();
  const backHref = backQuery ? `/?${backQuery}` : "/";

  const content = article.summary || article.description || "";

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
      >
        <svg className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to feed
      </Link>

      <article>
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <SourceBadge source={article.source_name} />
          <span className="text-sm text-gray-400">{article.category}</span>
          <span className="text-sm text-gray-300">•</span>
          <span className="text-sm text-gray-400">
            {formatDate(article.published_at)}
          </span>
          <BookmarkButton
            articleId={article.id}
            initialBookmarked={!!article.is_bookmarked}
            size="md"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
          {article.title}
        </h1>

        {article.author && (
          <p className="text-sm text-gray-400 mb-8">
            By <span className="text-gray-600 font-medium">{article.author}</span>
          </p>
        )}

        {content && (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-8 mb-8 shadow-sm">
            {article.summary && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg ring-1 ring-inset ring-blue-600/10">
                  ✨ AI Summary
                </span>
              </div>
            )}
            <p className="text-gray-700 leading-[1.8] text-[15px]">
              {content}
            </p>
          </div>
        )}

        {article.score !== null && (
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              {article.score} points
            </span>
            {article.comment_count !== null && (
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {article.comment_count} comments
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
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

          <div className="text-xs text-gray-300 self-center">
            Source: {article.source_name} via {article.source_type}
          </div>
        </div>
      </article>
    </div>
  );
}
