import Anthropic from "@anthropic-ai/sdk";
import { getArticlesWithoutSummary, updateArticleSummary } from "./articles";
import type { SummarizeResult } from "./types";

export async function summarizeUnsummarized(
  batchSize: number = 20
): Promise<SummarizeResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { summarized: 0, errors: ["ANTHROPIC_API_KEY not set"] };
  }

  const client = new Anthropic({ apiKey });
  const articles = getArticlesWithoutSummary(batchSize);
  let summarized = 0;
  const errors: string[] = [];

  for (const article of articles) {
    try {
      const summary = await generateSummary(
        client,
        article.title,
        article.description || "",
        article.source_name
      );
      updateArticleSummary(article.id, summary);
      summarized++;
      console.log(`  Summarized: ${article.title.slice(0, 60)}...`);

      // Rate limit: 1 second between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      const msg = `[ID:${article.id}] ${(err as Error).message}`;
      errors.push(msg);
      console.error(`  Error: ${msg}`);
    }
  }

  return { summarized, errors };
}

async function generateSummary(
  client: Anthropic,
  title: string,
  description: string,
  sourceName: string
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content: `You are a concise tech news reporter for an AI developer. Summarize the following article in 2-3 sentences. Focus on: what happened, why it matters for AI developers, and key takeaways.

Title: ${title}
Source: ${sourceName}
Content: ${description}

Provide ONLY the summary, no preamble or labels.`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  return textBlock?.text || description;
}
