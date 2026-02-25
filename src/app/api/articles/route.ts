import { NextRequest, NextResponse } from "next/server";
import { getArticles, getCategoryCounts } from "@/lib/articles";
import { safeInt, isValidDate, sanitizeSearch, isAllowed } from "@/lib/validate";
import { CATEGORIES } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const categoryParam = searchParams.get("category");
  const category = isAllowed(categoryParam, CATEGORIES as unknown as string[])
    ? categoryParam
    : undefined;

  const dateParam = searchParams.get("date");
  const date = dateParam && isValidDate(dateParam) ? dateParam : undefined;

  const searchParam = searchParams.get("search");
  const search = searchParam ? sanitizeSearch(searchParam) : undefined;

  const source = searchParams.get("source") || undefined;
  const bookmarked =
    searchParams.get("bookmarked") === "true" ? true : undefined;
  const unreadOnly =
    searchParams.get("unread") === "true" ? true : undefined;

  const page = safeInt(searchParams.get("page"), 1, 1, 1000);
  const limit = safeInt(searchParams.get("limit"), 50, 1, 200);

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
