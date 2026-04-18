# CLAUDE.md — Agent Workflow Instructions

> This file is read by Claude Code at the start of every session.
> Follow every section exactly. Do not skip steps. Do not assume — ask if unclear.

---

## Project

**Name:** zrktty.dev — Personal portfolio website  
**Owner:** Zoltan Rakottyai  
**Stack:** Next.js (latest) · TypeScript · Sanity CMS · shadcn/ui · Tailwind CSS · Bun  
**Repo:** <https://github.com/ZRktty/zrktty.dev>  
**Studio repo:** <https://github.com/ZRktty/studio-zoltanrakottyai.dev>  
**Sanity project ID:** `8tbsip27` · dataset: `production`  
**Jira board:** <https://zoltanrakottyai.atlassian.net/jira/core/projects/ZR/board>  
**Epic:** ZR-21

---

## Available MCPs

> Keep active MCPs under 10 to preserve context window. Disable any not needed for the current ticket.

### Via Docker MCP (enable in Docker Desktop MCP profile)

| MCP                     | When to use                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Atlassian**           | Every session — read/transition Jira tickets, update status, add comments                                                                                   |
| **Playwright**          | Every UI ticket — self-QA responsive check after implementation, before owner handoff                                                                       |
| **next-devtools-mcp**   | Every session with dev server running — query live Next.js errors, routes, hydration issues. Configured in `.mcp.json` via `bunx next-devtools-mcp@latest`. |
| **Fetch**               | When reading a URL inline — shadcn docs, Next.js API reference, etc.                                                                                        |
| **Sequential Thinking** | Complex planning — use before writing the plan for any ticket with >5 implementation steps                                                                  |

### Must be added manually (not in Docker catalog)

| MCP        | Setup                                                             | When to use                                                                                                                         |
| ---------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Sanity** | ✅ Configured in `.mcp.json` — already connected, no setup needed | Any ticket touching Sanity schemas, GROQ queries, or content — gives full schema awareness, live query execution, document patching |

> **GitHub**: do NOT add a GitHub MCP. Use `gh` CLI via Bash for all GitHub operations (branch push, PR create, CI status). The Copilot MCP endpoint does not support Claude Code's OAuth flow.

### Verify MCPs before starting work

```
/mcp
```

Project-scoped MCPs (vercel, sanity, next-devtools from `.mcp.json`) must be connected. Docker-profile MCPs (Atlassian, Playwright, etc.) only need to be enabled for tickets that use them.

---

## Package manager

**Always use `bun`** — never npm, never yarn, never npx for project scripts.

```bash
bun install                          # install deps
bun add <pkg>                        # add a package
bun add -d <pkg>                     # add dev dependency
bun run dev                          # local dev server
bun run build                        # production build check
bun run lint                         # eslint
bunx sanity typegen generate         # generate Sanity TypeScript types
bunx shadcn@latest add <component>   # add shadcn component
```

---

## Coding standards

Non-negotiable. A PR that violates these will be rejected.

### General

- **TypeScript strict mode** — no `any`, no `// @ts-ignore`, no `as unknown as X`
- **No magic numbers or strings** — extract shared values into the appropriate constants/module file for that area; never duplicate literals
- **Single source of truth** — never duplicate data, config, or logic
- **Small components** — one component per file, one responsibility per component
- **No inline GROQ** — all Sanity queries in `src/lib/sanity/queries.ts` as named exports
- **No unit tests** — skip test files entirely

### File & folder conventions

```
src/
  app/                      # Next.js App Router pages + layouts
  components/
    ui/                     # shadcn/ui primitives — DO NOT edit manually
    [feature]/              # e.g. hero/, services/, blog/, projects/
    shared/                 # reusable: SocialLinks, SectionHeading, etc.
  sanity/
    client.ts               # Sanity client singleton
    queries.ts              # ALL GROQ queries — named exports only
    types.ts                # generated types via `bunx sanity typegen generate`
    utils.ts                # @sanity/image-url builder + helpers
  types/
    index.ts                # all shared TypeScript types
  hooks/                    # custom React hooks
docs/                       # agent plan files: ZR-XX-plan.md per ticket
.claude/
  settings.json             # hooks config
```

### Component rules

- Functional components only, no class components
- Props typed with `interface` (use `type` only for unions)
- Named exports only — default exports only for Next.js pages/layouts
- Use `shadcn/ui` before writing any custom UI primitive
- Import order convention: React → Next → third-party → internal (`@/`)

### Mobile-first responsive

Every UI component is mobile-first. Target viewports:

| Name            | Width  | Device                                |
| --------------- | ------ | ------------------------------------- |
| mobile_min      | 375px  | safe floor — older iPhones            |
| mobile_s23      | 360px  | Samsung Galaxy S23                    |
| mobile_iphone14 | 393px  | iPhone 14 Pro — primary mobile target |
| tablet          | 768px  |                                       |
| desktop         | 1280px |                                       |

Tailwind convention: default = mobile (`375px`), `md:` = tablet, `lg:` = desktop.  
**Never write desktop-first styles.** A layout broken at 375px is a broken layout.

### Commits — conventional commits (recommended)

```
feat(ZR-XX): short description
fix(ZR-XX): short description
chore(ZR-XX): tooling, config, deps
refactor(ZR-XX): restructure without behaviour change
```

Jira ticket key always in scope. Message in lowercase.

### When to commit

Commit when you reach a clean, working milestone — a logical unit that compiles, lints, and stands alone as a correct step forward. Ask: "if this were the last commit, would the codebase be in a valid state?" If yes, commit.

Good commit points:

- A new file or module is fully wired up and lint-clean
- A dependency is installed and its config is complete
- A component renders correctly at all viewports
- A bug is fixed and verified

Never commit a broken build. Never commit mid-thought.

### Branch naming

```
ZR{number}_{kebab-case-description}

ZR33_mcp-setup-claude-md
ZR22_project-setup-nextjs-upgrade
ZR24_homepage-hero-section
```

No type prefix. No slash. Underscore after ticket number. Kebab-case description.

---

## Hooks — `.claude/settings.json`

Commit this file. It makes the agent self-correct automatically.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "bun run lint --max-warnings=0 2>&1 | tail -20"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your input\" with title \"zrktty.dev\" sound name \"Glass\"'"
          }
        ]
      }
    ]
  }
}
```

- **Lint hook** — runs `bun run lint` after every file write, surfaces errors immediately
- **Notification hook** — macOS alert whenever the agent pauses at an approval checkpoint

---

## Agent workflow — follow this exactly every session

### Step 0 — Orient yourself

1. Via **Atlassian MCP**: check the board https://zoltanrakottyai.atlassian.net/jira/core/projects/ZR/board
2. Find the first ticket that is:
   - **In Progress** → resume it (check if `docs/ZR-XX-plan.md` exists)
   - **To Do** → pick the next one by board order within epic ZR-21
3. Read the full ticket description.
4. Check if `docs/ZR-XX-plan.md` exists — if so, read it first.
5. Decide if `bun run dev` must be running for this ticket (yes for all UI work).

---

### Step 1 — Write the plan

Create `docs/ZR-{KEY}-plan.md` before touching any code:

```markdown
# Plan: ZR-XX — {Ticket title}

## Ticket

{Jira URL}

## Summary

{1-2 sentences}

## Files to create

- `src/...` — reason

## Files to modify

- `src/...` — reason

## Implementation steps

1. ...

## Mobile considerations

- Viewports to test: 375, 393, 360, 768, 1280

## Questions / blockers

- (list anything unclear before starting)
```

Use **Sequential Thinking MCP** for tickets with more than 5 implementation steps.  
Use **Sanity MCP** to read the actual schema before writing any GROQ or TypeScript types.

---

### Step 2 — Ask for approval ⛔ STOP

> **"Plan ready for ZR-XX. Please review `docs/ZR-XX-plan.md` and reply 'approved' to proceed, or give feedback."**

Do not write any production code until the owner says "approved".

---

### Step 3 — Implement

Once approved:

1. **Atlassian MCP**: move ticket → **In Progress**
2. `git checkout -b ZR{number}_{kebab-case-description}`
3. Implement per the plan — lint hook runs automatically after each file write
4. For schema changes: use **Sanity MCP** to verify schema is valid before writing queries
5. When done: `bun run build` — fix all errors before proceeding to Step 4

---

### Step 4 — Playwright self-QA ⛔ STOP (UI tickets only)

For any ticket that touches UI, run this automatically before notifying the owner.

**Using Playwright MCP**, navigate to `localhost:3000` (or the relevant route) and check each viewport:

| Viewport | Size           | Device        |
| -------- | -------------- | ------------- |
| 375×667  | mobile min     | safe floor    |
| 393×852  | mobile primary | iPhone 14 Pro |
| 360×780  | mobile         | Samsung S23   |
| 768×1024 | tablet         |               |
| 1280×800 | desktop        |               |

Check for: layout overflow, broken flex/grid, cut-off text, images not loading, elements overlapping.

**Using next-devtools-mcp**: check for hydration errors and runtime errors.

Fix any issues found. Then say:

> **"ZR-XX complete. Playwright check passed at all 5 viewports, no hydration errors. Please review on `bun run dev` at localhost:3000 and reply 'looks good' to create the PR, or describe what to change."**

---

### Step 5 — Apply feedback

Apply changes, re-run Playwright check, then:

> **"Changes applied and re-checked at all viewports. Please confirm 'looks good'."**

---

### Step 6 — Create PR

1. Push branch: `git push -u origin ZRxx_...`
2. **`gh` CLI**: create PR

   ```bash
   gh pr create --title "feat(ZR-XX): {ticket title lowercase}" --base main --body "..."
   ```

   Body must include:

   ```markdown
   Closes ZR-XX
   {Jira URL}

   ## What was built

   - ...

   ## Tested

   - Playwright: 375px ✓ 393px ✓ 360px ✓ 768px ✓ 1280px ✓
   - bun run build ✓
   - bun run lint ✓
   ```

3. Say: **"PR ready: {URL}. Please review and merge."**

---

### Step 7 — Close

When owner confirms merge:

1. **Atlassian MCP**: move ticket → **Done**
2. Delete branch: `git branch -d ZRxx_... && git push origin --delete ZRxx_...`
3. Return to **Step 0**

---

## Design system reference

| Token                    | Value                                               |
| ------------------------ | --------------------------------------------------- |
| Primary accent (red)     | `#E53935` — CTAs, active states, borders, links     |
| Secondary accent (green) | `#00E676` — photo circle, decorative element        |
| Heading font             | JetBrains Mono, bold                                |
| Body font                | System sans                                         |
| Dark mode strategy       | `next-themes`, class-based, `dark:` Tailwind prefix |
| Component library        | shadcn/ui — always check before writing custom UI   |

Add shadcn component: `bunx shadcn@latest add <name>`

---

## Sanity content model

| Document type | Key fields                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `homepage`    | heading, subtitle, ctaLabel, bio, photo                                                                                                                |
| `post`        | title, slug, publishedAt, excerpt, coverImage, body (PortableText), category                                                                           |
| `project`     | title, slug, shortDescription, thumbnail, liveUrl, githubUrl, client, timeline, role[], techStack[], body (PortableText), featured, highlighted, order |
| `experience`  | company, role, webUrl, type, startDate, endDate, description, techStack[], logo, order                                                                 |
| `service`     | title, icon, bullets[], isHighlighted                                                                                                                  |
| `skillGroup`  | title, skills[]: { name, logo }                                                                                                                        |

- All GROQ → `src/sanity/queries.ts` (no inline GROQ anywhere else)
- TypeScript types are written manually in `src/types/index.ts` (no local studio = no typegen)
- Always use **Sanity MCP** (`get_schema`, `query_documents`) to verify schema and queries before writing code

---

## Sanity Studio repo

The Sanity Studio lives in a **separate repository**: <https://github.com/ZRktty/studio-zoltanrakottyai.dev>

There is no local studio in this Next.js repo. The `gh` CLI is authenticated — clone and push directly:

```bash
gh repo clone ZRktty/studio-zoltanrakottyai.dev /tmp/studio-zoltanrakottyai
```

### Studio repo structure

```text
schemaTypes/
  index.ts          # registers all types — import + add to schemaTypes array
  blockContent.ts
  post.ts
  author.ts
  category.ts
  experience.ts
  project.ts        # added ZR-28
  aboutMe.ts
  structure.ts
sanity.config.ts
sanity.types.ts     # auto-generated — do not edit manually
```

### Adding a new Sanity document type — full workflow

1. **Clone the studio repo** (if not already local):

   ```bash
   gh repo clone ZRktty/studio-zoltanrakottyai.dev /tmp/studio-zoltanrakottyai
   ```

2. **Create the schema file** — follow the pattern in `experience.ts`: use `defineType` / `defineField`, export a named const:

   ```ts
   // schemaTypes/myType.ts
   import { defineField, defineType } from 'sanity'
   export const myType = defineType({ name: 'myType', type: 'document', fields: [...] })
   ```

3. **Register it in `schemaTypes/index.ts`**:

   ```ts
   import { myType } from './myType'
   export const schemaTypes = [...existing, myType]
   ```

4. **Push to `main`**:

   ```bash
   cd /tmp/studio-zoltanrakottyai
   git add schemaTypes/myType.ts schemaTypes/index.ts
   git commit -m "feat(ZR-XX): add myType schema"
   git push origin main
   ```

5. **Deploy the Studio** (run from the studio directory):

   ```bash
   npx sanity deploy
   ```

   Or push triggers CI/CD if configured.

6. **Also deploy schema via Sanity MCP** so the cloud registry is in sync and GROQ queries work immediately (without waiting for studio deploy):

   ```text
   mcp__sanity__deploy_schema
   ```

7. **Write TypeScript types manually** in this repo's `src/types/index.ts` — `bunx sanity typegen generate` requires a local studio and won't work here.

### ⚠️ Important: keep studio repo and MCP schema in sync

The Sanity MCP `deploy_schema` tool updates the **cloud schema registry** independently of the studio repo files. If you use it alone, the studio UI and cloud registry get out of sync. Always do both:

- Push the `.ts` file to the studio repo (source of truth for the Studio UI)
- Call `mcp__sanity__deploy_schema` (makes GROQ queries work immediately)

---

## Environment variables

`.env.local` — never commit (see `.env.example` for the canonical list):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-09
NEXT_PUBLIC_MAINTENANCE_MODE=false
SANITY_API_TOKEN=
```

---

## Never do

| ❌                                      | Why                                          |
| --------------------------------------- | -------------------------------------------- |
| Skip plan or either approval checkpoint | Quality gate                                 |
| Merge own PR                            | Owner reviews                                |
| Use npm / yarn — always `bun`           | Lockfile consistency                         |
| Write inline GROQ outside `queries.ts`  | Single source of truth                       |
| Use magic numbers or hardcoded strings  | Maintainability                              |
| Add `any` to TypeScript                 | Type safety                                  |
| Write unit tests                        | Out of scope                                 |
| Edit `src/components/ui/`               | shadcn-managed                               |
| Commit to `main` directly               | Feature branches only                        |
| Skip Playwright self-QA on UI tickets   | Catch responsive bugs before owner sees them |
| Write desktop-first CSS                 | 375px is the baseline, always                |
