# Font Usage — VinMonoPro

> Last updated: 2026-05-05

## Overview

VinMonoPro is a commercial typeface by [Marat Type](https://marattype.com/). The **Light (300)** weight is a free demo; all heavier weights require a paid license.

---

## Files on disk — `src/fonts/vinProMono/`

| File                         | Weight | Style  | Format | License         |
| ---------------------------- | ------ | ------ | ------ | --------------- |
| `VinMonoPro-Light.ttf`       | 300    | normal | TTF    | **Free** (demo) |
| `VinMonoPro-Light.otf`       | 300    | normal | OTF    | **Free** (demo) |
| `VinMonoPro-LightItalic.ttf` | 300    | italic | TTF    | **Free** (demo) |
| `VinMonoPro-LightItalic.otf` | 300    | italic | OTF    | **Free** (demo) |
| `VinMonoPro-Medium.ttf`      | 500    | normal | TTF    | ⚠️ **Paid**     |
| `VinMonoPro-Bold.ttf`        | 700    | normal | TTF    | ⚠️ **Paid**     |

---

## Registered weights — `src/app/fonts.ts`

| CSS variable          | Weight | File                    | Paid           | Est. price      |
| --------------------- | ------ | ----------------------- | -------------- | --------------- |
| `--font-vin-pro-mono` | 300    | `VinMonoPro-Light.ttf`  | No — free demo | —               |
| `--font-vin-pro-mono` | 500    | `VinMonoPro-Medium.ttf` | **Yes**        | ~$20–$40 (est.) |
| `--font-vin-pro-mono` | 700    | `VinMonoPro-Bold.ttf`   | **Yes**        | ~$20–$40 (est.) |

> Prices are estimates. The Marat Type site was not crawlable at time of research. Check [marattype.com](https://marattype.com/) or [MyFonts — VinMonoPro](https://www.myfonts.com/search?query=VinMonoPro) for current pricing.

---

## Active usage in components

| File                                         | Element | Tailwind weight class      | Resolved weight         | Font file served        | Paid?  |
| -------------------------------------------- | ------- | -------------------------- | ----------------------- | ----------------------- | ------ |
| `src/components/Hero.tsx`                    | `<h1>`  | _(none — browser default)_ | 400 → closest = **500** | `VinMonoPro-Medium.ttf` | ⚠️ Yes |
| `src/components/Blog/PostListItem.tsx`       | `<h2>`  | `font-bold`                | **700**                 | `VinMonoPro-Bold.ttf`   | ⚠️ Yes |
| `src/components/Blog/SimilarPostNav.tsx`     | `<h2>`  | `font-bold`                | **700**                 | `VinMonoPro-Bold.ttf`   | ⚠️ Yes |
| `src/app/(with-layout)/blog/page.tsx`        | `<h1>`  | `font-bold`                | **700**                 | `VinMonoPro-Bold.ttf`   | ⚠️ Yes |
| `src/app/(with-layout)/blog/[slug]/page.tsx` | `<h1>`  | `font-bold`                | **700**                 | `VinMonoPro-Bold.ttf`   | ⚠️ Yes |

**Weight 300 (Light) is loaded but never explicitly referenced** — no component uses `font-light`. The free weight is unused in practice.

---

## License risk summary

| Weight     | Status                                     | Action needed                                   |
| ---------- | ------------------------------------------ | ----------------------------------------------- |
| 300 Light  | Free demo — on disk, **not actively used** | Low risk; confirm demo terms allow repo storage |
| 500 Medium | **Paid — actively served** (Hero)          | Verify desktop + web license exists             |
| 700 Bold   | **Paid — actively served** (4 components)  | Verify desktop + web license exists             |

### If no license is held for Medium / Bold

Options:

1. **Purchase** a desktop + webfont license from marattype.com (Medium + Bold = ~$40–$80 est.)
2. **Replace** with [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — free OFL, already referenced in the design system spec, covers all weights
3. **Restrict to Light only** — refactor all `font-bold` usages to weight 300 and accept the lighter visual style

---

## Known issues

- `src/app/fonts.ts` line 22: `style: 'light'` should be `style: 'normal'` — `style` accepts CSS values (`normal`, `italic`, `oblique`), not weight names
- `VinMonoPro-LightItalic.{ttf,otf}` — present on disk but not registered in `fonts.ts`; either register or remove to keep the folder clean
