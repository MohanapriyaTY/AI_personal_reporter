import { NextResponse } from "next/server";
import { summarizeUnsummarized } from "@/lib/summarizer";

export async function POST() {
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
