import { initializeDatabase } from "../src/lib/db";
import { fetchAllFeeds } from "../src/lib/fetcher";

async function main() {
  console.log("=== AI Personal Reporter - Fetch ===\n");
  console.log("Initializing database...");
  initializeDatabase();

  console.log("Fetching articles from all feeds...\n");
  const result = await fetchAllFeeds();

  console.log("\n=== Results ===");
  console.log(`Fetched: ${result.fetched} new articles`);
  console.log(`Skipped: ${result.skipped} (duplicates/existing)`);

  if (result.errors.length > 0) {
    console.warn(`\nErrors (${result.errors.length}):`);
    result.errors.forEach((e) => console.warn(`  - ${e}`));
  }

  console.log("\nDone!");
}

main().catch(console.error);
