import { NextRequest, NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/fetcher";
import { isRateLimited } from "@/lib/rate-limit";
import { requireAuth } from "@/lib/auth";

// Cooldown: 60 seconds between fetch requests
const FETCH_COOLDOWN = 60;

export async function POST(request: NextRequest) {
  // Auth check (only enforced if API_SECRET is set)
  const authError = requireAuth(request);
  if (authError) return authError;

  // Rate limit check
  const { limited, retryAfter } = isRateLimited("fetch", FETCH_COOLDOWN);
  if (limited) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const result = await fetchAllFeeds();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
