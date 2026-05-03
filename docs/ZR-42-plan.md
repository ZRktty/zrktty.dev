# Plan: ZR-42 — Blog archive page — Transmissions design

## Ticket

https://zoltanrakottyai.atlassian.net/browse/ZR-42

## Summary

Redesign the `/blog` page to implement the "Transmissions" archive layout: a two-column terminal-log style feed with entry IDs, category filters, VineMonoPro headings, and IBM Plex Mono metadata. Light mode first. Design reference from Figma node `513:251`.

---

## Figma design analysis (dark mode → light mode mapping)

| Element                | Figma dark value     | Light mode adaptation           |
| ---------------------- | -------------------- | ------------------------------- |
| Background             | `#0e0e0e`            | `bg-background` (`#ffffff`)     |
| Entry ID (number)      | `#95aaff` periwinkle | `#0052FF` blue                  |
| Date                   | `#ababab` muted      | `text-muted-foreground`         |
| Category label         | `#ff7162` coral      | `#E53935` red (existing system) |
| Post title             | white                | `text-foreground`               |
| Abstract               | `#ababab`            | `text-muted-foreground`         |
| Filter selected bg     | `#829bff`            | `bg-foreground`                 |
| Filter selected text   | `#001a63`            | `text-background`               |
| Filter unselected bg   | `#262626`            | `bg-muted`                      |
| Filter unselected text | `#ababab`            | `text-muted-foreground`         |
| LOAD ARCHIVE text      | `#95aaff`            | `#0052FF`                       |
| LOAD ARCHIVE border    | `rgba(72,72,72,0.3)` | `border-border`                 |

**Font corrections from Figma:**

- Post titles: `Space_Grotesk` in Figma → **VineMonoPro** in our project (`font-vin-pro-mono`)
- All mono labels: IBM Plex Mono Bold/Regular/SemiBold
- The "TRANSMISSIONS" heading was above viewport in the Figma frame — we add it as a large VineMonoPro display heading

---

## Files to create

- `src/components/Blog/PostListItem.tsx` — row-based post item with two-column layout
- `src/components/Blog/CategoryFilter.tsx` — client component for tonal category filter pills
- `src/components/Blog/BlogArchiveClient.tsx` — `'use client'` shell that owns filter + pagination state

## Files to modify

- `src/app/(with-layout)/blog/page.tsx` — server component: fetches all posts + categories, renders shell
- `src/sanity/queries.ts` — extend `POSTS_QUERY` with `categories[]->{ _id, title }`, add `BLOG_CATEGORIES_QUERY`
- `src/constants.ts` — add `BLOG_PAGE_SIZE = 10`
- `src/app/fonts.ts` — add `IBM_Plex_Mono` font
- `src/app/globals.css` — register `--font-ibm-plex-mono` in `@theme`
- `src/app/layout.tsx` — add IBM Plex Mono variable class to `<body>`
- `DESIGN.MD` — ✅ already updated

---

## Implementation steps

### 1. Add IBM Plex Mono font

- `fonts.ts`: `import { IBM_Plex_Mono } from 'next/font/google'`, export `ibmPlexMono` with `variable: '--font-ibm-plex-mono'`, subsets: `['latin']`
- `globals.css` `@theme`: add `--font-ibm-plex-mono: var(--font-ibm-plex-mono), monospace;`
- `layout.tsx`: spread `ibmPlexMono.variable` into body className

### 2. Update constants

- `BLOG_PAGE_SIZE = 10`

### 3. Update Sanity queries

- Extend `POSTS_QUERY`: add `"categories": categories[]->{ _id, title }` projection
- Add `BLOG_CATEGORIES_QUERY`: all distinct categories referenced by published posts

### 4. Create `PostListItem`

Based on Figma row structure:

```
[left col — ~1/4 width]           [right col — ~3/4 width]
  01                                 ARCHITECTING FOR THE VOID...   ← VineMonoPro, uppercase, large
  OCT 24, 2024                       An exploration of failure...   ← IBM Plex Mono, muted
  ↕ flex spacer
  ENGINEERING                        ← #E53935 red, IBM Plex Mono, xs, uppercase, tracking-widest
```

- Row separated by `border-t border-border`
- Full-row `hover:bg-accent transition-colors`
- Desktop (`md:`): `grid grid-cols-[1fr_3fr] gap-12`
- Mobile: stacked — number + date on one line, then title, then abstract, then category

### 5. Create `CategoryFilter`

- `'use client'`
- "ALL SYSTEMS" + one per Sanity category
- Active: `bg-foreground text-background`
- Inactive: `bg-muted text-muted-foreground hover:bg-accent`
- `rounded-none px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors`
- IBM Plex Mono SemiBold

### 6. Create `BlogArchiveClient`

- `'use client'`
- Props: `posts: PostWithCategories[]`, `categories: string[]`
- State: `activeCategory: string` (default `'ALL SYSTEMS'`), `visibleCount: number` (default `BLOG_PAGE_SIZE`)
- Filters posts client-side; increments `visibleCount` on "Load Archive" click
- Renders `CategoryFilter` + feed of `PostListItem` rows + Load Archive button

### 7. Redesign `blog/page.tsx`

- Server component, fetches all posts + categories (all for client-side filter)
- Header: "TRANSMISSIONS" in VineMonoPro + subtitle in IBM Plex Mono
- Page width: `container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16`
- Renders `BlogArchiveClient` with data

### 8. Build check

`bun run build` — fix all errors before PR

---

## Architecture

```
blog/page.tsx (server)
  └── BlogArchiveClient (client — filter + pagination state)
        ├── CategoryFilter (display only, callback up)
        └── PostListItem[] (display only)
```

---

## Mobile considerations

| Viewport      | PostListItem layout                                                                  |
| ------------- | ------------------------------------------------------------------------------------ |
| 375px         | Stacked: `01 · OCT 24 2024` on one line, title below, abstract below, category below |
| 393px / 360px | Same as 375px                                                                        |
| 768px         | Two-column grid begins (`md:grid-cols-[1fr_3fr]`)                                    |
| 1280px        | Container max-width active                                                           |

---

## Questions / blockers

- None. Schema confirmed (categories are array of references → title), fonts confirmed, Figma design confirmed.
- Note: Figma uses Space Grotesk for post titles; we substitute VineMonoPro (our system heading font).
- Note: Category label colour in Figma is `#ff7162` coral — we use `#E53935` (existing system red) in light mode.
