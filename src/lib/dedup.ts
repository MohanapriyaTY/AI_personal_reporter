import { getRecentArticleUrls, getRecentArticleTitles } from "./articles";
import { normalizeUrl, bigrams, jaccardSimilarity } from "@/utils/text";

export function isDuplicateByUrl(url: string): boolean {
  const normalized = normalizeUrl(url);
  const existingUrls = getRecentArticleUrls();
  return existingUrls.some(
    (existing) => normalizeUrl(existing) === normalized
  );
}

export function isDuplicateByTitle(
  title: string,
  threshold: number = 0.7
): boolean {
  const titleBigrams = bigrams(title);
  if (titleBigrams.size === 0) return false;

  const recentTitles = getRecentArticleTitles();
  return recentTitles.some(
    (existing) =>
      jaccardSimilarity(titleBigrams, bigrams(existing)) > threshold
  );
}

export function isDuplicate(url: string, title: string): boolean {
  return isDuplicateByUrl(url) || isDuplicateByTitle(title);
}
