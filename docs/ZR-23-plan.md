# Plan: ZR-23 — Navigation header and sticky scroll-overlay footer

## Ticket

https://zoltanrakottyai.atlassian.net/browse/ZR-23

## Summary

Finish the site-wide header and footer. The existing components are scaffolded but have a dev-mode bug (nested `<a>` tags in `MainNav.tsx`), no active-route highlighting, magic string nav labels, and a plain footer with no scroll-overlay behaviour.

## Current state

- `Header.tsx` — wired up with `MainNav` (desktop), mobile `Sheet`, `ThemeSelector`
- `MainNav.tsx` — uses `<Link><NavigationMenuLink>` pattern → nested `<a>` tags → React dev warning
- `Nav.tsx` — mobile nav, missing `React` import, magic strings, no active state
- `Footer.tsx` — renders but no scroll-overlay; content and sticky z-index not wired
- `(with-layout)/layout.tsx` — no z-index/background layering for scroll-over effect

## Files to create

_(none)_

## Files to modify

- `src/constants/index.ts` — add `NAV_ITEMS` constant array
- `src/components/MainNav.tsx` — fix nested `<a>` bug, use constants, add active state
- `src/components/Nav.tsx` — add React import, use constants, add active state
- `src/components/Footer.tsx` — add `sticky bottom-0 z-0`, keep social links
- `src/app/(with-layout)/layout.tsx` — wrap `{children}` in `relative z-10 bg-background`
- `src/app/layout.tsx` — add `min-h-screen` to root `<main>` so footer always starts at bottom

## Implementation steps

1. **`src/constants/index.ts`** — add `NAV_ITEMS` array with `{ label, href }` for Home / Projects / Blog / About me
2. **`src/components/MainNav.tsx`** — replace `<Link passHref><NavigationMenuLink>` with `<NavigationMenuLink asChild><Link>` to eliminate nested `<a>` warning; import `usePathname` to apply active style; consume `NAV_ITEMS`
3. **`src/components/Nav.tsx`** — add `import * as React from 'react'`; consume `NAV_ITEMS`; add `usePathname` active state; convert to `'use client'`
4. **`src/app/layout.tsx`** — add `min-h-screen` to root `<main>` so the scroll-over footer technique reaches the viewport bottom
5. **`src/app/(with-layout)/layout.tsx`** — wrap `{children}` in `<div className="relative z-10 bg-background">` so content overlays the sticky footer on scroll
6. **`src/components/Footer.tsx`** — add `sticky bottom-0 z-0` Tailwind classes; keep `SocialLinks`, `SiteVersion`, `LocalTime`

## Mobile considerations

- Viewports to test: 375, 393, 360, 768, 1280
- Mobile sheet nav closes on link click (will verify with Playwright)
- Footer social icons must be readable at 375px

## Questions / blockers

- `/projects` and `/experience` routes don't exist yet — nav links will be added with correct hrefs; they'll 404 until those tickets land (acceptable, matches the design spec)
