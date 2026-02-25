import type { Category } from "./types";

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  "AI/ML": [
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "neural network",
    "llm",
    "large language model",
    "gpt",
    "claude",
    "gemini",
    "transformer",
    "fine-tuning",
    "fine tuning",
    "training data",
    "inference",
    "chatbot",
    "generative ai",
    "diffusion model",
    "reinforcement learning",
    "natural language processing",
    "computer vision",
    "openai",
    "anthropic",
    "deepmind",
    "mistral",
    "meta ai",
    "multimodal",
    "foundation model",
    "ai agent",
    "ai model",
  ],
  Research: [
    "paper",
    "arxiv",
    "research",
    "study finds",
    "benchmark",
    "dataset",
    "peer-reviewed",
    "findings",
    "methodology",
    "experiment",
    "novel approach",
    "state-of-the-art",
    "sota",
    "preprint",
    "breakthrough",
  ],
  "Dev Tools": [
    "api",
    "sdk",
    "framework",
    "library",
    "developer",
    "open source",
    "github",
    "release",
    "tool",
    "cli",
    "plugin",
    "extension",
    "integration",
    "documentation",
    "tutorial",
    "hugging face",
    "langchain",
    "llamaindex",
    "vector database",
    "embedding",
    "docker",
    "kubernetes",
  ],
  "Industry News": [
    "funding",
    "acquisition",
    "startup",
    "valuation",
    "ipo",
    "regulation",
    "lawsuit",
    "partnership",
    "launch",
    "product launch",
    "market",
    "revenue",
    "layoff",
    "hire",
    "ceo",
    "billion",
    "million",
    "investment",
    "policy",
    "government",
  ],
  Social: [
    "trending",
    "viral",
    "community",
    "discussion",
    "opinion",
    "thread",
    "debate",
    "hot take",
  ],
};

export function categorize(
  title: string,
  description: string,
  defaultCategory: Category
): Category {
  const text = `${title} ${description}`.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    scores[category] = keywords.reduce((count, kw) => {
      return count + (text.includes(kw) ? 1 : 0);
    }, 0);
  }

  let maxCategory = "";
  let maxScore = 0;
  for (const [cat, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxCategory = cat;
    }
  }

  return maxScore >= 2 ? (maxCategory as Category) : defaultCategory;
}
