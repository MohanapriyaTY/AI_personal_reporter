"use client";

import { CATEGORIES } from "@/lib/types";

const CATEGORY_STYLES: Record<string, { active: string; icon: string }> = {
  "AI/ML": { active: "bg-blue-600 shadow-blue-600/25", icon: "🤖" },
  "Dev Tools": { active: "bg-green-600 shadow-green-600/25", icon: "🛠️" },
  "Industry News": { active: "bg-purple-600 shadow-purple-600/25", icon: "📰" },
  Research: { active: "bg-amber-600 shadow-amber-600/25", icon: "🔬" },
  Social: { active: "bg-sky-600 shadow-sky-600/25", icon: "💬" },
};

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
  counts: Record<string, number>;
}

export function CategoryFilter({
  selected,
  onChange,
  counts,
}: CategoryFilterProps) {
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-wrap gap-2 mb-7">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          selected === "all"
            ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
        }`}
      >
        All
        <span className="ml-1.5 text-xs opacity-60">{totalCount}</span>
      </button>

      {CATEGORIES.map((cat) => {
        const style = CATEGORY_STYLES[cat] || { active: "bg-gray-900", icon: "📌" };
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selected === cat
                ? `${style.active} text-white shadow-lg`
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className="mr-1">{style.icon}</span>
            {cat}
            <span className="ml-1.5 text-xs opacity-60">
              {counts[cat] || 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
