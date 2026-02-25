"use client";

import { CATEGORIES } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  "AI/ML": "bg-blue-600",
  "Dev Tools": "bg-green-600",
  "Industry News": "bg-purple-600",
  Research: "bg-amber-600",
  Social: "bg-sky-600",
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
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === "all"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All
        <span className="ml-1.5 text-xs opacity-70">{totalCount}</span>
      </button>

      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat
              ? `${CATEGORY_COLORS[cat] || "bg-gray-900"} text-white`
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat}
          <span className="ml-1.5 text-xs opacity-70">
            {counts[cat] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}
