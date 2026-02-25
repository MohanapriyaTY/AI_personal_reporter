# 🤖 AI Personal Tech Reporter

A personal AI & tech news aggregator dashboard built with **Next.js**, **TypeScript**, and **SQLite**. Fetches articles from 14+ sources including TechCrunch, The Verge, OpenAI, Anthropic, Hacker News, Reddit, Bluesky, and more — all in one clean interface.

Optionally uses **Claude (Anthropic)** to generate concise AI summaries of each article.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📰 Multi-source aggregation | Pulls from 14 RSS feeds + Bluesky social posts |
| 🏷️ Auto-categorization | Keyword-based sorting into AI/ML, Dev Tools, Industry News, Research, Social |
| 🔍 Full-text search | Search across article titles and descriptions |
| 📅 Date filtering | Browse articles by specific date |
| 🔖 Bookmarks | Save articles for later reading |
| 🧠 AI Summaries | Optional 2–3 sentence summaries via Claude (Anthropic API) |
| 🧹 Deduplication | URL normalization + title similarity (Jaccard bigrams) to skip duplicates |
| ⚡ One-click fetch | "Fetch New" button in the header to pull latest articles |
| 📱 Responsive UI | Clean, modern layout with Tailwind CSS |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Language:** TypeScript
- **Database:** SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **RSS Parsing:** [rss-parser](https://github.com/rbren/rss-parser)
- **Social Feed:** [Bluesky (AT Protocol)](https://bsky.app/) public search API
- **AI Summaries:** [Anthropic Claude](https://www.anthropic.com/) (optional)
- **Runtime:** Node.js

---

## 📦 Sources (14 feeds)

| Category | Sources |
|----------|---------|
| Tech News | TechCrunch, The Verge, Ars Technica, Wired |
| AI/ML Blogs | OpenAI Blog, Anthropic Blog, Google DeepMind, MIT Tech Review |
| Dev Community | Hacker News, Reddit r/artificial, Dev.to AI |
| Products & Repos | Product Hunt, GitHub Trending |
| Social | Bluesky (public search) |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Setup

```bash
# Clone the repo
git clone https://github.com/MohanapriyaTY/AI_personal_reporter.git
cd AI_personal_reporter

# Install dependencies
npm install

# Fetch articles from all sources (~30 seconds)
npm run fetch

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional: AI-Powered Summaries

If you have an [Anthropic API key](https://console.anthropic.com/), create a `.env.local` file:

```
ANTHROPIC_API_KEY=your_key_here
```

Then generate summaries:

```bash
npm run summarize
```

This produces 2–3 sentence AI summaries for each article using Claude.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run fetch` | Fetch latest articles from all feeds |
| `npm run summarize` | Generate AI summaries (requires API key) |
| `npm run fetch-and-summarize` | Fetch + summarize in one command |
| `npm run lint` | Run ESLint |

---

## 🗂️ Project Structure

```
├── scripts/
│   ├── fetch-articles.ts        # CLI script to fetch from all feeds
│   └── summarize-articles.ts    # CLI script to generate AI summaries
├── src/
│   ├── app/
│   │   ├── page.tsx             # Main dashboard
│   │   ├── layout.tsx           # Root layout with header
│   │   ├── article/[id]/        # Article detail page
│   │   ├── bookmarks/           # Bookmarks page
│   │   └── api/                 # API routes (articles, fetch, summarize)
│   ├── components/              # React components
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   ├── BookmarkButton.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── DatePicker.tsx
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   └── SourceBadge.tsx
│   ├── lib/                     # Core logic
│   │   ├── articles.ts          # CRUD operations
│   │   ├── bluesky.ts           # Bluesky API integration
│   │   ├── categorizer.ts       # Keyword-based categorization
│   │   ├── db.ts                # SQLite connection
│   │   ├── dedup.ts             # Deduplication logic
│   │   ├── feeds.ts             # Feed source definitions
│   │   ├── fetcher.ts           # RSS & social feed fetching
│   │   ├── schema.ts            # Database schema
│   │   ├── summarizer.ts        # Anthropic Claude integration
│   │   └── types.ts             # TypeScript type definitions
│   └── utils/
│       ├── date.ts              # Date formatting helpers
│       └── text.ts              # Text processing utilities
├── data/                        # SQLite database (gitignored)
└── public/                      # Static assets
```

---

## ⏰ Automate Fetching (Optional)

Add a cron job to fetch new articles automatically:

```bash
crontab -e
```

```cron
# Fetch new articles every 4 hours
0 */4 * * * cd /path/to/AI_personal_reporter && npm run fetch
```

---

## 🔒 Privacy & Data

- All data is stored **locally** in a SQLite database (`data/reporter.db`)
- No data is sent to any third party (except Anthropic for optional AI summaries)
- RSS feeds are public syndication endpoints designed for aggregation
- Bluesky integration uses only the **public** search API (no authentication required)
- API keys are loaded from environment variables only and never committed to source

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Mohanapriya TY** — [GitHub](https://github.com/MohanapriyaTY)

---

> Built for personal use and daily AI/tech learning. Pull requests and suggestions welcome!

