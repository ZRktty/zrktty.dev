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
**Tracker:** Plane — project **ZRktty.dev** (`ZRKTTYDEV`)  
<https://app.plane.so/zrktty/projects/62ee9d97-66ff-4a9d-9cb2-78ba066b5008>

> Jira is gone — the account was cancelled on 2026-08-20. Plane is the only tracker. Work items
> numbered `ZR-XX` in `docs/` predate the migration and have no live ticket behind them.

---

## Available MCPs

> Keep active MCPs under 10 to preserve context window. Disable any not needed for the current ticket.

### Via Docker MCP (enable in Docker Desktop MCP profile)

| MCP                     | When to use                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **next-devtools-mcp**   | Every session with dev server running — query live Next.js errors, routes, hydration issues. Configured in `.mcp.json` via `bunx next-devtools-mcp@latest`. |
| **Fetch**               | When reading a URL inline — shadcn docs, Next.js API reference, etc.                                                                                        |
| **Sequential Thinking** | Complex planning — use before writing the plan for any ticket with >5 implementation steps                                                                  |

### Must be added manually (not in Docker catalog)

| MCP            | Setup                                                                                                                                                                                                                             | When to use                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Sanity**     | ✅ Configured in `.mcp.json` — already connected, no setup needed                                                                                                                                                                 | Any ticket touching Sanity schemas, GROQ queries, or content — gives full schema awareness, live query execution, document patching |
| **PostHog**    | ✅ Configured in `.mcp.json` — already connected, no setup needed                                                                                                                                                                 | Any ticket touching analytics — query events, inspect funnels, check feature flags, review session replays, diagnose tracking gaps  |
| **Playwright** | ✅ Configured in `.mcp.json` via `bunx @playwright/mcp@latest`                                                                                                                                                                    | Every UI ticket — self-QA responsive check after implementation, before owner handoff                                               |
| **Plane**      | ⚠️ `plane-local`, configured **user-level** in `~/.claude.json`, not in this repo's `.mcp.json`. Runs the local Docker image `plane-mcp-server:local` with an env file outside the repo, so it exists only on the owner's machine | Every session — read work items, create them, move state. Replaces the old Atlassian/Jira MCP entirely                              |

> **Playwright must run headed, never headless.** `@playwright/mcp` is headed by default — do not add `--headless`. Do **not** use the Playwright bundled in the Docker MCP profile: it runs inside a container with no display, so it is always headless.

> **GitHub**: do NOT add a GitHub MCP. Use `gh` CLI via Bash for all GitHub operations (branch push, PR create, CI status). The Copilot MCP endpoint does not support Claude Code's OAuth flow.

### Verify MCPs before starting work

```text
/mcp
```

Project-scoped MCPs (vercel, sanity, posthog, next-devtools, playwright from `.mcp.json`) must be
connected, as must the user-level `plane-local`. Docker-profile MCPs only need to be enabled for tickets that use
them. **Do not add an Atlassian MCP** — there is no Jira account any more.

### Plane IDs — do not re-derive

| Thing               | UUID                                   |
| ------------------- | -------------------------------------- |
| Workspace slug      | `zrktty`                               |
| Project `ZRKTTYDEV` | `62ee9d97-66ff-4a9d-9cb2-78ba066b5008` |
| State — Backlog     | `7221cf45-ed6b-426a-af4f-31a9b5f8de11` |
| State — Todo        | `0782eafe-7ff2-4f63-87c7-a74cf5b887ad` |
| State — In Progress | `21a749a2-5612-48df-8a9f-ef9bf5c37133` |
| State — Done        | `375e58b8-19b1-4aeb-b985-7c2af26f0562` |
| State — Cancelled   | `6760cfe2-f28d-47f7-882f-1c84a414f8dd` |

Work item URL shape: `https://app.plane.so/zrktty/projects/62ee9d97-66ff-4a9d-9cb2-78ba066b5008/issues/{work_item_uuid}`

Move a work item's state with `mcp__plane-local__update_work_item(project_id, work_item_id, state=<uuid>)`.
There is a second Plane project, `ZRKTT` — that one is the untouched Plane demo. Never file work there.

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
bunx sanity schema extract           # extract schema from studio/ submodule
bunx sanity typegen generate         # generate types → studio/sanity.types.ts, then cp to src/sanity/types.ts
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

```text
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
docs/                       # agent plan files: ZRKTTYDEV-N-plan.md per ticket
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

```text
feat(ZRKTTYDEV-N): short description
fix(ZRKTTYDEV-N): short description
chore(ZRKTTYDEV-N): tooling, config, deps
refactor(ZRKTTYDEV-N): restructure without behaviour change
```

Plane work item key always in scope, `N` being its `sequence_id`. Message in lowercase.
Repo-wide chores with no work item behind them may use a bare `chore:` scope.

### When to commit

Commit granularly — after each small, self-contained piece of work is done and lint-clean. Do not accumulate changes across multiple logical steps before committing. Ask: "if this were the last commit, would the codebase be in a valid state?" If yes, commit now.

After each commit, **suggest the next commit point** to the owner so the work stays in small, reviewable chunks.

Good commit points:

- A dependency is installed and its config is complete
- A new file or module is fully wired up and lint-clean
- A single component or utility is implemented and correct
- A component renders correctly at all viewports
- A bug is fixed and verified
- A refactor step is complete without behaviour change

Never commit a broken build. Never commit mid-thought. Never batch multiple logical units into one commit.

### Branch naming

```text
ZRKTTYDEV{number}_{kebab-case-description}

ZRKTTYDEV1_contact-form-sheet
ZRKTTYDEV2_homepage-hero-tweak
```

No type prefix. No slash. Underscore after the work item number. Kebab-case description.
Branches named `ZR{number}_…` are pre-migration history — do not create new ones.

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

1. Via **Plane MCP**: `mcp__plane-local__list_work_items(project_id="62ee9d97-66ff-4a9d-9cb2-78ba066b5008", expand="state")`
2. Find the first work item that is:
   - **In Progress** → resume it (check if `docs/ZRKTTYDEV-N-plan.md` exists)
   - **Todo** → pick the next one by `sort_order`
3. Read the full work item description (`description_stripped` is the readable form).
4. Check if `docs/ZRKTTYDEV-N-plan.md` exists — if so, read it first.
5. Decide if `bun run dev` must be running for this ticket (yes for all UI work).

---

### Step 1 — Write the plan

Create `docs/ZRKTTYDEV-{N}-plan.md` before touching any code:

```markdown
# Plan: ZRKTTYDEV-N — {Work item title}

## Ticket

{Plane work item URL}

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

> **"Plan ready for ZRKTTYDEV-N. Please review `docs/ZRKTTYDEV-N-plan.md` and reply 'approved' to proceed, or give feedback."**

Do not write any production code until the owner says "approved".

---

### Step 3 — Implement

Once approved:

1. **Plane MCP**: move the work item → **In Progress** (`state="21a749a2-5612-48df-8a9f-ef9bf5c37133"`)
2. `git checkout -b ZRKTTYDEV{number}_{kebab-case-description}`
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

> **"ZRKTTYDEV-N complete. Playwright check passed at all 5 viewports, no hydration errors. Please review on `bun run dev` at localhost:3000 and reply 'looks good' to create the PR, or describe what to change."**

---

### Step 5 — Apply feedback

Apply changes, re-run Playwright check, then:

> **"Changes applied and re-checked at all viewports. Please confirm 'looks good'."**

---

### Step 6 — Create PR

1. Push branch: `git push -u origin ZRKTTYDEV{n}_...`
2. **`gh` CLI**: create PR

   ```bash
   gh pr create --title "feat(ZRKTTYDEV-N): {work item title lowercase}" --base main --body "..."
   ```

   Body must include:

   ```markdown
   Closes ZRKTTYDEV-N
   {Plane work item URL}

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

1. **Plane MCP**: move the work item → **Done** (`state="375e58b8-19b1-4aeb-b985-7c2af26f0562"`)
2. Delete branch: `git branch -d ZRKTTYDEV{n}_... && git push origin --delete ZRKTTYDEV{n}_...`
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
- Sanity document types are **generated** into `src/sanity/types.ts` — never write them manually there
- `src/types/index.ts` is for shared app-level types only (GROQ projections, UI interfaces)
- Always use **Sanity MCP** (`get_schema`, `query_documents`) to verify schema and queries before writing code

---

## Sanity Studio

The Sanity Studio lives in `studio/` as a **git submodule** sourced from <https://github.com/ZRktty/studio-zoltanrakottyai.dev>.

It is already checked out — no cloning needed. Always work with `studio/` directly.

### Studio structure

```text
studio/
  schemaTypes/
    index.ts        # registers all types — import + add to schemaTypes array
    blockContent.ts
    post.ts
    author.ts
    category.ts
    experience.ts
    project.ts
    aboutMe.ts
    structure.ts
  sanity.config.ts
  sanity.types.ts   # auto-generated — do not edit manually
  schema.json       # extracted schema — do not edit manually
```

### Adding a new Sanity document type — full workflow

1. **Create the schema file** in `studio/schemaTypes/myType.ts` — follow the pattern in `experience.ts`:

   ```ts
   import { defineField, defineType } from 'sanity'
   export const myType = defineType({ name: 'myType', type: 'document', fields: [...] })
   ```

2. **Register it** in `studio/schemaTypes/index.ts`:

   ```ts
   import { myType } from './myType'
   export const schemaTypes = [...existing, myType]
   ```

3. **Commit and push** the studio submodule:

   ```bash
   git -C studio add schemaTypes/myType.ts schemaTypes/index.ts
   git -C studio commit -m "feat(ZRKTTYDEV-N): add myType schema"
   git -C studio push origin main
   ```

4. **Deploy schema via Sanity MCP** so GROQ queries work immediately:

   ```text
   mcp__sanity__deploy_schema
   ```

5. **Regenerate TypeScript types** and copy to this repo:

   ```bash
   bunx sanity schema extract
   bunx sanity typegen generate
   cp studio/sanity.types.ts src/sanity/types.ts
   ```

6. **Update the submodule pointer** in this repo:

   ```bash
   git add studio src/sanity/types.ts
   git commit -m "chore: update studio submodule, regenerate types"
   ```

### ⚠️ Keep studio submodule and MCP schema in sync

The Sanity MCP `deploy_schema` updates the **cloud registry** used by GROQ at runtime. The `studio/` files are the source of truth for the Studio UI. Always do both — push to `studio/` and call `mcp__sanity__deploy_schema`.

---

## Environment variables

`.env.local` — never commit (see `.env.example` for the canonical list):

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-09
SANITY_API_TOKEN=
FLAGS_SECRET=
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
