# Plan: ZR-48 — Replace VinProMono with JetBrains Mono (OFL license)

## Ticket

https://zoltanrakottyai.atlassian.net/browse/ZR-48

## Summary

VinProMono is a paid font (unlicensed for production). JetBrains Mono is free under SIL OFL 1.1, is a strong visual match (monospaced, terminal aesthetic), and is served via `next/font/google` with zero hosting overhead. Swap the font and rename all CSS variable / Tailwind utility class references. VinProMono font files are preserved on disk for a future restore once licensed.

## Files to modify

- `src/app/fonts.ts` — replace `localFont` VinProMono with `JetBrains_Mono` from `next/font/google`; rename export from `vinProMono` to `jetBrainsMono`; CSS variable changes from `--font-vin-pro-mono` → `--font-jetbrains-mono`
- `src/app/globals.css` — rename `--font-vin-pro-mono` CSS variable reference to `--font-jetbrains-mono`
- `src/app/layout.tsx` — update import and body className to use `jetBrainsMono.variable`
- `src/app/(with-layout)/layout.tsx` — update comment reference if any
- All component/page files using `font-vin-pro-mono` Tailwind class (~40 usages, ~30 files) — global find-replace `font-vin-pro-mono` → `font-jetbrains-mono`

## Files to leave untouched

- `src/fonts/vinProMono/` — keep font files in place for future restore

## Implementation steps

1. Update `src/app/fonts.ts`:
   - Remove `vinProMono` localFont block
   - Add `JetBrains_Mono` import from `next/font/google` with weights `['300','400','500','700']` and variable `--font-jetbrains-mono`
   - Export as `jetBrainsMono`

2. Update `src/app/globals.css`:
   - Rename `--font-vin-pro-mono` → `--font-jetbrains-mono` in the `@theme` or base layer

3. Update `src/app/layout.tsx`:
   - Update import: `vinProMono` → `jetBrainsMono`
   - Update body className: `${vinProMono.variable}` → `${jetBrainsMono.variable}`

4. Global find-replace across all `src/` files:
   - `font-vin-pro-mono` → `font-jetbrains-mono`

5. Run `bun run build` — fix any errors

## Mobile considerations

- Font swap is purely cosmetic — no layout changes
- Viewports to verify: 375, 393, 360, 768, 1280
- JetBrains Mono has slightly different metrics than VinProMono; check for any text overflow at small sizes

## Questions / blockers

- None — license confirmed (SIL OFL 1.1), approach is clear
