const SOURCE_COLORS: Record<string, string> = {
  TechCrunch: "bg-green-100 text-green-800",
  "The Verge": "bg-purple-100 text-purple-800",
  "Ars Technica": "bg-orange-100 text-orange-800",
  Wired: "bg-gray-100 text-gray-800",
  "OpenAI Blog": "bg-emerald-100 text-emerald-800",
  "Anthropic Blog": "bg-amber-100 text-amber-800",
  "Google DeepMind": "bg-blue-100 text-blue-800",
  "MIT Tech Review": "bg-red-100 text-red-800",
  "Hacker News": "bg-orange-100 text-orange-700",
  "Reddit r/artificial": "bg-orange-100 text-orange-800",
  "Dev.to AI": "bg-indigo-100 text-indigo-800",
  "Two Minute Papers": "bg-red-100 text-red-700",
  "AI Explained": "bg-cyan-100 text-cyan-800",
  Fireship: "bg-yellow-100 text-yellow-800",
  "Matt Wolfe AI": "bg-pink-100 text-pink-800",
  "Lex Fridman": "bg-violet-100 text-violet-800",
  "Product Hunt": "bg-orange-100 text-orange-700",
  "GitHub Trending": "bg-gray-100 text-gray-700",
  Bluesky: "bg-sky-100 text-sky-800",
};

const DEFAULT_COLOR = "bg-gray-100 text-gray-700";

export function SourceBadge({ source }: { source: string }) {
  const color = SOURCE_COLORS[source] || DEFAULT_COLOR;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}
    >
      {source}
    </span>
  );
}
