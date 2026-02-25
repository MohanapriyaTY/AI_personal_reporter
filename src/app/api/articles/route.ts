import { NextRequest, NextResponse } from "next/server";
import { getArticles, getCategoryCounts } from "@/lib/articles";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const category = searchParams.get("category") || undefined;
  const date = searchParams.get("date") || undefined;
  const search = searchParams.get("search") || undefined;
  const source = searchParams.get("source") || undefined;
  const bookmarked =
    searchParams.get("bookmarked") === "true" ? true : undefined;
  const unreadOnly =
    searchParams.get("unread") === "true" ? true : undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  const result = getArticles({
    category,
    date,
    search,
    source,
    bookmarked,
    unreadOnly,
    page,
    limit,
  });

  const counts = getCategoryCounts(date);

  return NextResponse.json({ ...result, counts });
}
