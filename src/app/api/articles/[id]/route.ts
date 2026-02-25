import { NextRequest, NextResponse } from "next/server";
import { getArticleById, markAsRead, toggleBookmark } from "@/lib/articles";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId) || articleId < 1) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  const article = getArticleById(articleId);
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(article);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId) || articleId < 1) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Only allow known fields
  if (typeof body.is_read === "boolean") {
    markAsRead(articleId, body.is_read);
  }
  if (typeof body.is_bookmarked === "boolean") {
    toggleBookmark(articleId, body.is_bookmarked);
  }

  const updated = getArticleById(articleId);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
