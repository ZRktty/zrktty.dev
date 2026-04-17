# Plan: ZR-36 — Upgrade Sanity ecosystem (next-sanity 9→12, @sanity/image-url 1→2)

## Ticket
<https://zoltanrakottyai.atlassian.net/browse/ZR-36>

## Summary

Upgrade `next-sanity` from `9.12.3` to `12.x` and `@sanity/image-url` from `1.x` to `2.x`. PR goes onto branch `ZR22_project-setup-nextjs-upgrade`.

## Breaking changes to address

### `@sanity/image-url` v2

1. **Default export removed** — use named `createImageUrlBuilder` instead of default `imageUrlBuilder`
2. **Type import path changed** — `SanityImageSource` must be imported from `@sanity/image-url` (main entry) not `@sanity/image-url/lib/types/types`

### `next-sanity` v12

- `createClient` API is unchanged — no code changes needed in `client.ts`

## Files to modify

- `package.json` — bump `next-sanity` and `@sanity/image-url` to latest
- `src/sanity/utils.ts` — update import: `imageUrlBuilder` default → `createImageUrlBuilder` named; update type import path

## Files to create

- none

## Implementation steps

1. `git checkout ZR22_project-setup-nextjs-upgrade && git checkout -b ZR22b_sanity-ecosystem-upgrade`
2. `bun add next-sanity@latest @sanity/image-url@latest`
3. Update `src/sanity/utils.ts`:
   - `import imageUrlBuilder from "@sanity/image-url"` → `import { createImageUrlBuilder } from "@sanity/image-url"`
   - `import type {SanityImageSource} from "@sanity/image-url/lib/types/types"` → `import type {SanityImageSource} from "@sanity/image-url"`
   - `imageUrlBuilder(...)` → `createImageUrlBuilder(...)`
4. `bunx sanity typegen generate` to refresh generated types
5. `bun run build` — fix any remaining errors
6. Push branch and create PR into `ZR22_project-setup-nextjs-upgrade`

## Mobile considerations

N/A — no UI changes

## Questions / blockers

- None
