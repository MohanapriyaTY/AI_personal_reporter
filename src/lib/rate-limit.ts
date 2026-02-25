/**
 * Simple in-memory rate limiter.
 * Tracks last call time per action and enforces a cooldown period.
 * No external dependencies — resets on server restart.
 */

const lastCallMap = new Map<string, number>();

export function isRateLimited(
  action: string,
  cooldownSeconds: number
): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const lastCall = lastCallMap.get(action) || 0;
  const elapsed = (now - lastCall) / 1000;

  if (elapsed < cooldownSeconds) {
    const retryAfter = Math.ceil(cooldownSeconds - elapsed);
    return { limited: true, retryAfter };
  }

  lastCallMap.set(action, now);
  return { limited: false, retryAfter: 0 };
}
