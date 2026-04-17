# zrktty.dev

Personal portfolio website for Zoltan Rakottyai — built with Next.js, TypeScript, Sanity CMS, shadcn/ui, and Tailwind CSS.

## Prerequisites

- **[Node.js](https://nodejs.org/)** ≥ 20 (required by Next.js 16)
- **[Bun](https://bun.sh/)** — used as the package manager and runtime
- **[gitleaks](https://github.com/gitleaks/gitleaks)** — required for the pre-commit secret scanning hook

```bash
brew install bun
brew install gitleaks
```

## Setup

### 1. Clone and install

```bash
git clone https://github.com/ZRktty/zrktty.dev.git
cd zrktty.dev
bun install
```

### 2. Environment variables

Copy the example file and fill in your Sanity project values:

```bash
cp .env.example .env.local
```

| Variable                         | Description                                |
| -------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Your Sanity project ID                     |
| `NEXT_PUBLIC_SANITY_DATASET`     | Dataset name (e.g. `production`)           |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version date (e.g. `2024-02-09`)       |
| `NEXT_PUBLIC_MAINTENANCE_MODE`   | Set to `true` to show the maintenance page |
| `SANITY_API_TOKEN`               | Read token for server-side Sanity queries  |

### 3. Run the dev server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command                     | Description                                |
| --------------------------- | ------------------------------------------ |
| `bun run dev`               | Start the local development server         |
| `bun run build`             | Production build — run before opening a PR |
| `bun run start`             | Start the production server locally        |
| `bun run lint`              | Run ESLint across `src/`                   |
| `bun run format`            | Run Prettier across the project            |
| `bun run security:scan`     | Run a full gitleaks scan on the repo       |
| `bun run security:baseline` | Generate a gitleaks baseline report        |

## Pre-commit hooks

[Husky](https://typicode.github.io/husky/) runs two checks on every commit:

1. **gitleaks** — scans staged files for secrets before they are committed
2. **lint-staged** — runs ESLint (and Prettier, if installed) on staged source files

Make sure `gitleaks` is installed locally (see Prerequisites above) or the hook will block all commits.

## Content management

Content is managed in [Sanity Studio](https://www.sanity.io/). To run the studio locally:

```bash
bunx sanity dev
```

After making schema changes, regenerate TypeScript types:

```bash
bunx sanity typegen generate
```

## Tech stack

| Layer           | Technology               |
| --------------- | ------------------------ |
| Framework       | Next.js 16 (App Router)  |
| Language        | TypeScript (strict mode) |
| CMS             | Sanity v3                |
| UI components   | shadcn/ui                |
| Styling         | Tailwind CSS v4          |
| Package manager | Bun                      |

# Feature

- [x] enhance LocalTime component to show timezone diff compared to visitor's timezone
