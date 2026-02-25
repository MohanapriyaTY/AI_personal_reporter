/**
 * Input validation helpers for API routes.
 */

/** Parse an integer with bounds. Returns the default if invalid. */
export function safeInt(
  value: string | null,
  defaultValue: number,
  min: number,
  max: number
): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return defaultValue;
  return Math.max(min, Math.min(max, parsed));
}

/** Validate that a string is a valid date (YYYY-MM-DD). */
export function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value));
}

/** Sanitize a search string — trim and limit length. */
export function sanitizeSearch(value: string, maxLength: number = 200): string {
  return value.trim().slice(0, maxLength);
}

/** Check if a value is one of the allowed values. */
export function isAllowed<T extends string>(
  value: string | null,
  allowed: T[]
): value is T {
  return value !== null && (allowed as string[]).includes(value);
}
