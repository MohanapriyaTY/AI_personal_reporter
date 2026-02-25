const SOURCE_COLORS: Record<string, string> = {
  TechCrunch: "bg-green-50 text-green-700 ring-green-600/10",
  "The Verge": "bg-purple-50 text-purple-700 ring-purple-600/10",
  "Ars Technica": "bg-orange-50 text-orange-700 ring-orange-600/10",
  Wired: "bg-gray-50 text-gray-700 ring-gray-600/10",
  "OpenAI Blog": "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  "Anthropic Blog": "bg-amber-50 text-amber-700 ring-amber-600/10",
  "Google DeepMind": "bg-blue-50 text-blue-700 ring-blue-600/10",
  "MIT Tech Review": "bg-red-50 text-red-700 ring-red-600/10",
  "Hacker News": "bg-orange-50 text-orange-700 ring-orange-600/10",
  "Reddit r/artificial": "bg-orange-50 text-orange-700 ring-orange-600/10",
  "Dev.to AI": "bg-indigo-50 text-indigo-700 ring-indigo-600/10",
  "Two Minute Papers": "bg-red-50 text-red-700 ring-red-600/10",
  "AI Explained": "bg-cyan-50 text-cyan-700 ring-cyan-600/10",
  Fireship: "bg-yellow-50 text-yellow-700 ring-yellow-600/10",
  "Matt Wolfe AI": "bg-pink-50 text-pink-700 ring-pink-600/10",
  "Lex Fridman": "bg-violet-50 text-violet-700 ring-violet-600/10",
  "Product Hunt": "bg-orange-50 text-orange-700 ring-orange-600/10",
  "GitHub Trending": "bg-gray-50 text-gray-700 ring-gray-600/10",
  Bluesky: "bg-sky-50 text-sky-700 ring-sky-600/10",
};

const DEFAULT_COLOR = "bg-gray-50 text-gray-700 ring-gray-600/10";

export function SourceBadge({ source }: { source: string }) {
  const color = SOURCE_COLORS[source] || DEFAULT_COLOR;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ring-1 ring-inset ${color}`}
    >
      {source}
    </span>
  );
}
