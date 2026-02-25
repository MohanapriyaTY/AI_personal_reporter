/**
 * Lightweight API authentication.
 * 
 * If API_SECRET is set in .env.local, mutation endpoints (POST/PATCH)
 * require an `Authorization: Bearer <token>` header or `?token=<token>` param.
 * 
 * If API_SECRET is NOT set, all requests are allowed (default for local use).
 */

import { NextRequest, NextResponse } from "next/server";

export function requireAuth(request: NextRequest): NextResponse | null {
  const secret = process.env.API_SECRET;

  // If no secret configured, allow all requests (local/personal use)
  if (!secret) return null;

  // Check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) return null;

  // Check query param fallback
  const tokenParam = request.nextUrl.searchParams.get("token");
  if (tokenParam === secret) return null;

  return NextResponse.json(
    { error: "Unauthorized. Set API_SECRET in .env.local or provide a valid token." },
    { status: 401 }
  );
}
