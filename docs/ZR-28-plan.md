# Plan: ZR-28 — Projects listing page + project detail sub-page

## Ticket

https://zoltanrakottyai.atlassian.net/browse/ZR-28

## Summary

Build the `/projects` listing page and `/projects/[slug]` detail page, backed by a new Sanity `project` document type. The listing uses a 3-2-1 masonry-style layout. The detail page matches the Figma prototype with hero, sidebar metadata, PortableText body, and a "Next Project" nav section above the footer.

---

## Sanity Schema — `project`

```
project {
  title:            string      (required)
  slug:             slug        (required, source: title)
  shortDescription: string      (tagline — shown in hero + listing card)
  thumbnail:        image       (hotspot enabled — used for card and detail hero)
  liveUrl:          url         (optional)
  githubUrl:        url         (optional)
  client:           string      (optional — sidebar)
  timeline:         string      (optional — sidebar, e.g. "Q3 2023 – Q1 2024")
  role:             array<string> (optional — sidebar, e.g. ["Lead Architect", "Backend Dev"])
  techStack:        array<string> (required — tag chips)
  body:             blockContent (PortableText article body)
  featured:         boolean     (show first on /projects listing page)
  highlighted:      boolean     (homepage masonry section — bigger card)
  order:            number      (ordering + next-project navigation)
}
```

---

## Files to create

- `src/components/projects/ProjectCard.tsx` — listing card (thumbnail, title, shortDescription, tags, link)
- `src/components/projects/FeaturedProjectCard.tsx` — full-width highlighted card (top of listing)
- `src/components/projects/ProjectsGrid.tsx` — 3-2-1 layout container (featured top + 2-col below)
- `src/components/projects/TechTag.tsx` — reusable pill chip for tech stack tags
- `src/components/projects/NextProjectNav.tsx` — "Next Project" section (above footer on detail page)
- `src/app/(with-layout)/projects/page.tsx` — listing page (replaces stub)
- `src/app/(with-layout)/projects/[slug]/page.tsx` — detail page (new)

## Files to modify

- `src/sanity/queries.ts` — add `PROJECTS_QUERY`, `PROJECT_QUERY`, `NEXT_PROJECT_QUERY`
- `src/types/index.ts` — add `ProjectItem`, `ProjectDetail` interfaces
- `src/sanity/types.ts` — regenerate after schema deploy (`bunx sanity typegen generate`)

---

## Implementation steps

1. **Deploy Sanity schema** — `project` document type via Sanity MCP (no local studio)
2. **Regenerate types** — `bunx sanity typegen generate`
3. **Add shared types** — `ProjectItem`, `ProjectDetail` to `src/types/index.ts`
4. **Add GROQ queries** to `src/sanity/queries.ts`:
   - `PROJECTS_QUERY` — all projects ordered by `order asc`, with `featured` and `highlighted`
   - `PROJECT_QUERY` — single project by slug (full fields)
   - `NEXT_PROJECT_QUERY` — next project by `order` (title + slug only, for nav)
5. **`TechTag`** — small pill chip, reused everywhere
6. **`ProjectCard`** — listing card (thumbnail, title, shortDescription, tech tags, "View Project →")
7. **`FeaturedProjectCard`** — full-width card: large thumbnail, title, description, tags, "View Case Study →" CTA
8. **`ProjectsGrid`** — layout: `highlighted` project full-width at top, remaining 2-column below
9. **`/projects` page** — fetch all projects, render `ProjectsGrid`; section header has "Featured projects" left + "Check all projects" button right (visible when viewing homepage section; hidden on the full page itself)
10. **`NextProjectNav`** — bottom of detail page: "NEXT PROJECT" label, big project title, arrow button; queries next by `order`
11. **`/projects/[slug]` page** — hero (label, title, shortDescription, live/source buttons, thumbnail), sidebar (client, timeline, role, techStack), PortableText body via `RenderBodyContent`, `NextProjectNav` at bottom; `generateStaticParams` + `generateMetadata`
12. **`bun run build`** — fix all errors

---

## Design notes (from Figma prototype)

### Listing page

- Section heading: `"Featured projects"` (JetBrains Mono, left) + `"Check all projects"` button (right, border style)
- Sub-heading: `"Some of the projects I've been thinking on"`
- Featured card (full-width): large thumbnail with overlay gradient, `FEATURED` badge, title bold, shortDescription, tech tags, "View Project →"
- Supporting cards (2-col): smaller thumbnail, title, description, tags, "View Project →"
- Mobile: single column stack

### Detail page

- Label: `01 // CASE STUDY` (IBM Plex Mono, red/accent, uppercase)
- Title: large bold (Space Grotesk)
- Buttons: "LIVE DEMO ↗" (accent fill) + "SOURCE ↗" (border) — only rendered if urls set
- Hero image: full-width, luminosity blend, dark gradient overlay
- Sidebar (desktop col-span-3): CLIENT, TIMELINE, ROLE, TECH STACK sections
- Body (desktop col-span-9): PortableText via `RenderBodyContent`
- NextProjectNav: border-top, "NEXT PROJECT" label, next project title, arrow button

### Tokens used

- Accent red: `#E53935` (our project) — Figma uses `#ff7162`, map to our token
- Mono font: IBM Plex Mono already in project
- Dark bg cards: `bg-muted` / `bg-card`
- Tags: `bg-muted text-muted-foreground` pill chips

---

## Mobile considerations

- Viewports to test: 375, 393, 360, 768, 1280
- Listing: 1-col on mobile, 2-col `md:`, featured always full-width
- Detail: sidebar stacks above body on mobile (sidebar first, then body)
- Tech tags: flex-wrap

## Questions / blockers

- None — schema, design, and scope are clear.
