import { initializeDatabase } from "../src/lib/db";
import { summarizeUnsummarized } from "../src/lib/summarizer";

async function main() {
  console.log("=== AI Personal Reporter - Summarize ===\n");

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY not set in environment.");
    console.error("Set it in .env.local or export it before running.");
    process.exit(1);
  }

  initializeDatabase();

  console.log("Summarizing articles without summaries...\n");
  const result = await summarizeUnsummarized();

  console.log("\n=== Results ===");
  console.log(`Summarized: ${result.summarized} articles`);

  if (result.errors.length > 0) {
    console.warn(`\nErrors (${result.errors.length}):`);
    result.errors.forEach((e) => console.warn(`  - ${e}`));
  }

  console.log("\nDone!");
}

main().catch(console.error);
