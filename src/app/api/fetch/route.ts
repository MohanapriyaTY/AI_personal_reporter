import { NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/fetcher";

export async function POST() {
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
