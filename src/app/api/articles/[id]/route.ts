import { NextRequest, NextResponse } from "next/server";
import { getArticleById, markAsRead, toggleBookmark } from "@/lib/articles";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const article = getArticleById(parseInt(id));
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
  const body = await request.json();
  const articleId = parseInt(id);

  if (body.is_read !== undefined) {
    markAsRead(articleId, body.is_read);
  }
  if (body.is_bookmarked !== undefined) {
    toggleBookmark(articleId, body.is_bookmarked);
  }

  const updated = getArticleById(articleId);
  return NextResponse.json(updated);
}
