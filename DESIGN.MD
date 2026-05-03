# Global Design System: The Technical Editorial

## 1. Overview & Creative North Star

**Creative North Star: "The Brutalist Architect"**
This system moves away from "friendly SaaS" aesthetics toward a high-density, high-contrast, and technically honest interface. It celebrates the underlying structure of information.

---

## 2. Visual Language

### Typography

| Role | Font | Variable |
|------|------|----------|
| Display / Headings | VineMonoPro | `--font-vin-pro-mono` |
| Body / UI / Labels | IBM Plex Mono | `--font-ibm-plex-mono` |
| Code snippets | Coders Crux | `--font-coders-crux` |

**Loading fonts** — `src/app/fonts.ts`:

- `vinProMono` → `variable: '--font-vin-pro-mono'` (weights: 300 / 500 / 700)
- `ibmPlexMono` → `variable: '--font-ibm-plex-mono'` (add via `next/font/google`)
- `codersCrux` → `variable: '--font-coders-crux'` (local)

**Tailwind usage:**

- `font-vin-pro-mono` for all headings / display text
- `font-[family-name:var(--font-ibm-plex-mono)]` for body / labels / meta

### Color Palette

#### Light mode (default)

| Role | Token | Value |
|------|-------|-------|
| Background | `bg-background` | `#ffffff` |
| Surface | `bg-card` | `#f8f8f8` |
| Border | `border-border` | `#e5e7eb` |
| Foreground (primary text) | `text-foreground` | `#0a0a0a` |
| Muted text | `text-muted-foreground` | `#6b7280` |
| Primary accent (blue) | `#0052FF` | Used for entry IDs, CTAs, active filter states |
| Secondary accent (green) | `#00E676` | Photo circle, decorative |
| Interactive hover | `bg-accent` | `#f3f4f6` |

#### Dark mode

| Role | Token | Value |
|------|-------|-------|
| Background | `bg-background` | `#0e0e0e` |
| Surface | `bg-card` | `#1a1a1a` |
| Border | `border-border` | `#2a2a2a` |
| Foreground | `text-foreground` | `#f5f5f5` |
| Muted text | `text-muted-foreground` | `#9ca3af` |
| Primary accent (blue) | `#0052FF` | Same — high energy on dark |

> Note: CLAUDE.md mentions `#E53935` red as CTA colour — this belongs to a previous iteration. The active design system uses `#0052FF` blue as the primary accent. Update CLAUDE.md if consensus is reached.

### Atmosphere

- Blending modes (Difference/Exclusion) on cursor
- Monochromatic layering; sharp edges — zero border-radius on editorial elements
- Use `rounded-none` explicitly to override shadcn defaults on blog/data components

---

## 3. Mobile Breakpoints

| Breakpoint | Width | Tailwind prefix | Device |
|------------|-------|-----------------|--------|
| xs (baseline) | 375px | *(default)* | iPhone SE / safe floor |
| — | 360px | *(within default)* | Samsung Galaxy S23 |
| — | 393px | *(within default)* | iPhone 14 Pro (primary mobile target) |
| md | 768px | `md:` | Tablet |
| lg | 1280px | `lg:` | Desktop |

**Convention:** Always write mobile-first. `default` = 375px. `md:` = tablet. `lg:` = desktop.

**Page width standard (all pages):**

```
container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16
```

---

## 4. Global Components

### TopNavBar

Fixed position, `backdrop-blur`, uppercase navigation, prominent "Book a Call" CTA. Includes the theme switcher.

### Footer

Minimalist, uppercase tracking. Social links + "Engineered with Precision" branding.

### Custom Cursor

Circular blending-mode cursor reacting to underlying content.

---

## 5. Interaction Principles

- **Transitions:** Fast, rhythmic — `duration-150` or `duration-200`. No bouncy animations; linear or `ease-in-out` only.
- **Hover states:** Scale-down or tonal shifts, not simple opacity changes.
- **Micro-copy tone:** Technical terminology — "Initializing…", "Loading Buffer…", "Source…", "Transmission".

---

## 6. Page Designs

### 6.1 Blog Archive — "Transmissions"

**URL:** `/blog`  
**Figma reference:** `Vfm78oUNf2DGiPQrUsgAVU`, node `513:251`

#### Header section

```
TRANSMISSIONS                    ← VineMonoPro, bold, 4xl (mobile) → 6xl (desktop), uppercase
Thoughts, tutorials, and         ← IBM Plex Mono Regular, muted-foreground, 18px
engineering deep dives from
the terminal to the canvas.
```

#### Filter bar

Tonal button-based filters. Categories loaded live from Sanity.

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Selected | `bg-foreground` | `text-background` | none |
| Unselected | `bg-muted` | `text-muted-foreground` | none |
| Hover (unselected) | `bg-accent` | `text-foreground` | none |

- `rounded-none px-4 py-2`
- Font: IBM Plex Mono SemiBold, `text-xs uppercase tracking-widest`
- Default selected: "ALL"

#### Article row — two-column (Figma structure)

Desktop (`md:` and up) — `grid grid-cols-[1fr_3fr] gap-12`:

| Left column | Right column |
|-------------|--------------|
| Entry number: IBM Plex Mono Bold, `#0052FF`, `text-sm uppercase tracking-widest` | Title: VineMonoPro, `text-3xl md:text-4xl uppercase tracking-tight text-foreground` |
| Date: IBM Plex Mono Regular, muted, `text-sm uppercase tracking-widest` | Abstract: IBM Plex Mono Regular, `text-muted-foreground text-base` |
| *(flex spacer — category pins to bottom)* | |
| Category: IBM Plex Mono Regular, `#E53935`, `text-xs uppercase tracking-widest` | |

Mobile (default) — stacked:

```
01 · OCT 24, 2024
TITLE OF THE POST
Abstract excerpt text
ENGINEERING
```

**Row dividers:** `border-t border-border` between rows. No card boxes, no border-radius.  
**Hover state:** Full row `hover:bg-accent transition-colors duration-150`.  
**Entry numbers:** Sequential (01, 02, 03…) — not prefixed.

#### Pagination — "Load Archive"

- Centred button, `rounded-none border border-border`
- Text: IBM Plex Mono Bold, `#0052FF`, `text-sm uppercase tracking-[0.2em]`
- Label: `LOAD ARCHIVE`
- Behaviour: client-side — increments visible count by `BLOG_PAGE_SIZE`

#### Dark mode colours (Figma source)

| Element | Dark value |
|---------|-----------|
| Entry number | `#95aaff` |
| Category label | `#ff7162` |
| Filter selected bg | `#829bff` / text `#001a63` |
| Filter unselected bg | `#262626` / text `#ababab` |
| LOAD ARCHIVE text | `#95aaff` |

#### Mobile considerations

- 375px: Stack entry metadata above title. Entry number + date on one line (`01 · OCT 2024`).
- 393px / 360px: Same as 375px.
- 768px: Two-column grid begins.
- 1280px: Container max-width active.
