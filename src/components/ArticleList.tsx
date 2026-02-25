import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/lib/types";

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
}

export function ArticleList({ articles, loading }: ArticleListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse"
          >
            <div className="flex gap-2 mb-3">
              <div className="h-5 w-20 bg-gray-100 rounded-full" />
              <div className="h-5 w-16 bg-gray-50 rounded-full" />
              <div className="h-5 w-12 bg-gray-50 rounded-full" />
            </div>
            <div className="h-4 w-full bg-gray-100 rounded mb-2" />
            <div className="h-4 w-4/5 bg-gray-100 rounded mb-3" />
            <div className="h-3 w-full bg-gray-50 rounded mb-1.5" />
            <div className="h-3 w-2/3 bg-gray-50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
          <span className="text-3xl">📡</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No articles found
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          Click &quot;Fetch New&quot; to pull the latest articles from
          all your sources, or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {articles.map((article, i) => (
        <div
          key={article.id}
          className="stagger-item"
          style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
        >
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
}
