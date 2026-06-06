# Design

## Theme

**Dark editorial precision.** Warm near-black body, amber-gold as the single dominant accent, terminal green contained exclusively to the ASCII animation panel. The tension between gold (product/authority) and green (engineering/code) is the portfolio's visual identity: a builder who bridges both worlds visibly.

Two accent registers:
- `#E8A830` (amber gold) — brand accent, used for all UI: buttons, active states, kickers, hover states, focus rings.
- `#37c878` (terminal green) — code signature, used ONLY in the ASCII animation and its glow. Never for UI.

## Colors

### Background

```
--bg:       oklch(0.072 0.004 88)   /* #0A0A0B — warm near-black, no green or blue tint */
--surface:  oklch(0.097 0.005 88)   /* #111114 — card surface */
--elevated: oklch(0.13 0.007 88)    /* #1A1A1E — elevated panels */
```

### Text

```
--fg:         oklch(0.946 0.008 88)  /* #F2F0EB — warm white, primary text */
--fg-2:       oklch(0.708 0.0 0)     /* ~neutral-400 ≈ #a3a3a3 — secondary/body text (7.85:1 on bg) */
--fg-muted:   oklch(0.556 0.0 0)     /* ~neutral-500 ≈ #737373 — decorative only, never body (4.15:1) */
```

**Contrast rule:** `neutral-400` is the minimum for ANY readable text (7.85:1 — passes AAA). `neutral-500` is reserved for decorative elements only (placeholder hints, legal footnotes, character counters). `neutral-600+` is never used for visible text on the dark background.

### Accent (brand)

```
--gold:     oklch(0.74 0.16 72)      /* #E8A830 — amber gold, single dominant accent */
--gold-dim: oklch(0.74 0.16 72 / 0.12)
```

### Border

```
--border:        rgba(242, 240, 235, 0.07)
--border-strong: rgba(242, 240, 235, 0.12)
```

### Code signature (ASCII only)

```
--code-green: #37c878   /* NEVER used for UI — only AsciiStudioPanel inline styles */
```

### In code (Tailwind v4 @theme)

```css
--color-primary-green: #E8A830;   /* remapped to gold; Tailwind utilities auto-update */
--color-dark-green: #0A0A0B;
```

## Typography

### Fonts

```
Display + Body: Sora Variable   (@fontsource-variable/sora)
Monospace:      JetBrains Mono  (@fontsource/jetbrains-mono, weights 400 & 500)
```

Both are self-hosted via npm fontsource packages. No Google Fonts `<link>` in production.

### Scale (fluid)

```
Hero H1:     clamp(2.6rem, 6.8vw, 5rem)    — Sora 600, tracking -0.025em
Section H2:  clamp(2rem, 4vw, 3rem)         — Sora 600, tracking -0.025em
Body:        1rem / 1.75                     — Sora 400
Small:       0.875rem / 1.5
Kickers:     0.65rem, JetBrains Mono 500, uppercase, tracking 0.3em
```

### Rules

- `text-wrap: balance` on h1–h3.
- Body max-width: 65ch.
- Line-height on dark: body 1.75–1.8 (dark text reads lighter; needs more air).
- Kickers (`section-kicker`) reserve: max one per 3 sections. Not every section gets one.

## Components

### surface-panel

```css
border-radius: 1rem;
border: 1px solid rgba(242, 240, 235, 0.07);
background: rgba(255, 255, 255, 0.025);
box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
backdrop-filter: blur(20px);
```

### spotlight-card

Extends `surface-panel`. Adds `::after` radial-gradient that illuminates under the cursor using `--spotlight-x` / `--spotlight-y` CSS custom properties set by the global JS handler. Used on project cards and about panels.

### Button (primary)

```
bg: #E8A830 | border: #E8A830 | text: #0A0A0B
hover: bg-white, border-white
shadow: 0 0 24px rgba(232, 168, 48, 0.16)
border-radius: rounded-lg (8px)
active: scale(0.97)
focus-visible: 2px gold ring, 3px offset
```

### Button (secondary)

```
bg: rgba(255,255,255,0.035) | border: rgba(255,255,255,0.12) | text: neutral-300
hover: border-gold/55, text-gold, bg-gold/7
backdrop-blur: xl
```

### Nav links (desktop)

Plain text links. No container background. `::after` pseudo-element underline (1.5px, gold) that slides `scaleX: 0 → 1` on hover (origin right → left), and stays at `scaleX: 1` when `active` class is present.

### Project card (featured)

Full-bleed video/image, aspect 21/9. Gradient overlay `from-black/92 via-black/25 to-black/10`. Glassmorphism info panel anchored to bottom: `bg-black/60 backdrop-blur-xl border-t border-white/8`.

### Project cards (bento grid)

Homepage (2 cards): Featured 12/12 + Side-by-side 12/12 (video 55% / info 45%).
Projects page (6 cards): Featured 12 cols → [7, 5] → [4, 4, 4].

## Layout

### Grid

- Container: `max-w-7xl` / `px-5 sm:px-8 lg:px-12`
- Section padding: `py-32` (128px — generous, editorial)
- Internal gaps: `gap-5` (cards), `gap-12` (hero two-col)

### Background layers (bottom to top)

1. `portfolio-shell` — CSS radial gradients, gold warmth at 15% and 78%
2. `precision-grid` — rgba(242,240,235,0.04) 72px grid, masked to top 52%
3. `layout-noise` — SVG fractalNoise grain, `mix-blend-mode: overlay`, opacity 0.04, `position: fixed`
4. Ambient orbs — 3 animated CSS divs: `orb-drift-1/2/3` keyframes (30s/25s/40s), gold radial-gradients, blur 90–130px, GPU-safe (transform+opacity only)
5. Content

## Motion

### System

- **IntersectionObserver** for `[data-aos]` elements → adds `.aos-animate` class. Replaces the original AOS library (which was installed but disabled via `opacity: 1 !important`).
- **GSAP + ScrollTrigger** (gsap npm package) initialized in `Layout.astro` via a bundled `<script>` (not `is:inline`). Uses `gsap.context()` with `revert()` cleanup on `astro:before-swap`.

### GSAP targets

| Attribute | Effect | Params |
|---|---|---|
| `[data-gsap-word-split]` | Word-by-word hero H1 reveal | yPercent 115, stagger 0.072s, delay 0.22s, power3.out |
| `[data-gsap-heading]` | Section H2 slide-up on scroll | y 26, opacity 0, 0.75s, power2.out, ScrollTrigger top 88% |
| `[data-gsap-kicker]` | Section kicker slide from left | x -14, opacity 0, 0.5s, power2.out, ScrollTrigger top 90% |
| `[data-gsap-cards]` + `[data-gsap-card]` | Card grid stagger on scroll | y 48, opacity 0, stagger 0.09s, power2.out, ScrollTrigger top 85% |

### Hero CSS animations (non-GSAP elements)

```
hero-badge:   slide-in-up 0.55s, delay 80ms
hero-sub:     slide-in-up 0.65s, delay 560ms
hero-actions: slide-in-up 0.55s, delay 700ms
hero-social:  slide-in-up 0.5s,  delay 820ms
hero-ascii:   fade-in-scale 0.9s, delay 160ms
```

Hero H1 (`.hero-title` class removed) is handled entirely by GSAP.

### Interactions

- **Spotlight cards:** JS `mousemove` → `--spotlight-x/y` CSS props → `::after` radial-gradient reveal
- **Magnetic CTA:** `[data-magnetic]` + `[data-magnetic-inner]` → vanilla JS translate on mousemove, spring return on mouseleave
- **All transitions:** `transform` and `opacity` only (no layout properties)
- **`prefers-reduced-motion`:** GSAP checks `matchMedia` before animating; CSS `@media (prefers-reduced-motion: reduce)` disables all AOS transitions

## Spacing scale (reference)

```
4px   — icon nudge, optical adjustment
8px   — tag/badge padding
12px  — compact inner padding
16px  — gap between related elements
20px  — card inner padding (sm)
24px  — card inner padding (md)
32px  — section subgrid gap
48px  — intra-section spacing
128px — section vertical padding (py-32)
```

## Z-index scale

```
0    — background layers (grid, noise, orbs)
10   — content
50   — header (fixed, floating)
9999 — skip-link (on focus)
```

## ASCII animation (visual signature)

The `AsciiStudioPanel` component renders a programmatic ASCII animation of a website being coded. Terminal green `#37c878` with glow `rgba(55, 200, 120, 0.55)`. This is the portfolio's ONE visual signature: the only place the green color appears, making the engineering identity visible without making it the entire identity.

Frame: `8px` monospace, `line-height: 0.78`, hardware-accelerated scale transform for responsive sizing. Framed by a thin gold border panel in the hero to bridge the two accent registers.

## i18n

Full EN/ES parity via `src/lib/i18n.ts`. Cookie-based toggle (`lang` cookie, `Max-Age=31536000`). No content should exist in one language without an equivalent in the other.
