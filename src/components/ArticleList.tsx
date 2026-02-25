import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/lib/types";

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
}

export function ArticleList({ articles, loading }: ArticleListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse"
          >
            <div className="flex gap-2 mb-3">
              <div className="h-5 w-20 bg-gray-200 rounded" />
              <div className="h-5 w-16 bg-gray-100 rounded" />
            </div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-3" />
            <div className="h-3 w-full bg-gray-100 rounded mb-1" />
            <div className="h-3 w-2/3 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📡</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No articles found
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          Click the &quot;Fetch New&quot; button to pull the latest articles from
          all your sources, or try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
