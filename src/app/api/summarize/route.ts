import { NextRequest, NextResponse } from "next/server";
import { summarizeUnsummarized } from "@/lib/summarizer";
import { isRateLimited } from "@/lib/rate-limit";
import { requireAuth } from "@/lib/auth";

// Cooldown: 120 seconds between summarize requests (protects Anthropic credits)
const SUMMARIZE_COOLDOWN = 120;

export async function POST(request: NextRequest) {
  // Auth check (only enforced if API_SECRET is set)
  const authError = requireAuth(request);
  if (authError) return authError;

  // Rate limit check
  const { limited, retryAfter } = isRateLimited("summarize", SUMMARIZE_COOLDOWN);
  if (limited) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured. Set it in .env.local" },
      { status: 500 }
    );
  }

  try {
    const result = await summarizeUnsummarized();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
