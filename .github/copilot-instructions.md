# GitHub Copilot Instructions — zrktty.dev

> Project context for GitHub Copilot. Follow these standards on every suggestion.

---

## Project

**Name:** zrktty.dev — Personal portfolio website  
**Owner:** Zoltan Rakottyai  
**Stack:** Next.js (latest) · TypeScript · Sanity CMS · shadcn/ui · Tailwind CSS · Bun  
**Repo:** https://github.com/ZRktty/zrktty.dev  
**Jira board:** https://zoltanrakottyai.atlassian.net/jira/core/projects/ZR/board  
**Epic:** ZR-21

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
- **No magic numbers or strings** — extract shared values into the appropriate constants/module file; never duplicate literals
- **Single source of truth** — never duplicate data, config, or logic
- **Small components** — one component per file, one responsibility per component
- **No inline GROQ** — all Sanity queries in `src/sanity/queries.ts` as named exports
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
```

### Component rules
- Functional components only, no class components
- Props typed with `interface` (use `type` only for unions)
- Named exports only — default exports only for Next.js pages/layouts
- Use `shadcn/ui` before writing any custom UI primitive
- Import order: React → Next → third-party → internal (`@/`)

### Mobile-first responsive

Every UI component is mobile-first. Target viewports:

| Name | Width | Device |
|------|-------|--------|
| mobile_min | 375px | safe floor — older iPhones |
| mobile_s23 | 360px | Samsung Galaxy S23 |
| mobile_iphone14 | 393px | iPhone 14 Pro — primary mobile target |
| tablet | 768px | |
| desktop | 1280px | |

Tailwind convention: default = mobile (`375px`), `md:` = tablet, `lg:` = desktop.  
**Never write desktop-first styles.** A layout broken at 375px is a broken layout.

### Commits — conventional commits
```
feat(ZR-XX): short description
fix(ZR-XX): short description
chore(ZR-XX): tooling, config, deps
refactor(ZR-XX): restructure without behaviour change
```
Jira ticket key always in scope. Message in lowercase.

### Branch naming
```
ZR{number}_{kebab-case-description}

ZR33_mcp-setup-claude-md
ZR22_project-setup-nextjs-upgrade
ZR24_homepage-hero-section
```
No type prefix. No slash. Underscore after ticket number. Kebab-case description.

---

## Design system reference

| Token | Value |
|-------|-------|
| Primary accent (red) | `#E53935` — CTAs, active states, borders, links |
| Secondary accent (green) | `#00E676` — photo circle, decorative element |
| Heading font | JetBrains Mono, bold |
| Body font | System sans |
| Dark mode strategy | `next-themes`, class-based, `dark:` Tailwind prefix |
| Component library | shadcn/ui — always check before writing custom UI |

Add shadcn component: `bunx shadcn@latest add <name>`

---

## Sanity content model

| Document type | Key fields |
|---------------|-----------|
| `homepage` | heading, subtitle, ctaLabel, bio, photo |
| `post` | title, slug, publishedAt, excerpt, coverImage, body (PortableText), category |
| `project` | title, slug, thumbnail, shortDescription, techStack[], body, liveUrl, githubUrl, featured, order |
| `service` | title, icon, bullets[], isHighlighted |
| `skillGroup` | title, skills[]: { name, logo } |

- All GROQ → `src/sanity/queries.ts` (no inline GROQ anywhere else)
- Generated types → `src/sanity/types.ts` via `bunx sanity typegen generate`

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

| ❌ | Why |
|----|-----|
| Merge own PR | Owner reviews |
| Use npm / yarn — always `bun` | Lockfile consistency |
| Write inline GROQ outside `queries.ts` | Single source of truth |
| Use magic numbers or hardcoded strings | Maintainability |
| Add `any` to TypeScript | Type safety |
| Write unit tests | Out of scope |
| Edit `src/components/ui/` | shadcn-managed |
| Commit to `main` directly | Feature branches only |
| Write desktop-first CSS | 375px is the baseline, always |
