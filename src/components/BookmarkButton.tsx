"use client";

import { useState } from "react";

interface BookmarkButtonProps {
  articleId: number;
  initialBookmarked: boolean;
  size?: "sm" | "md";
}

export function BookmarkButton({
  articleId,
  initialBookmarked,
  size = "sm",
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const newValue = !bookmarked;
    setBookmarked(newValue);

    try {
      await fetch(`/api/articles/${articleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_bookmarked: newValue }),
      });
    } catch {
      setBookmarked(!newValue);
    }
  }

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <button
      onClick={toggle}
      className="text-gray-400 hover:text-yellow-500 transition-colors"
      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <svg
        className={iconSize}
        fill={bookmarked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
