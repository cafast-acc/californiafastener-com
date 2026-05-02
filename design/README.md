# Handoff — California Fastener marketing site

Apple-style marketing site for **California Fastener**, a Bay Area industrial-fastener distributor & CNC shop (Vacaville, CA, est. 1970). 16 HTML pages covering homepage, product/material deep dives, six industry verticals, a 35-spec reference library, a 4-step quote flow, a CNC PPC landing page, and an editorial blog.

---

## About the design files in this bundle

The `design/` files are **HTML/CSS design references**, not production code. They were authored as fully-rendered prototypes so you can read exact tokens, copy, and behavior — but the deliverable is to **rebuild these designs in your target codebase using its existing patterns** (React/Next/Vue/Astro/etc.). If there is no existing app, choose the framework that best fits the team — these designs are framework-agnostic; everything is plain HTML, CSS variables, and small vanilla-JS interactions.

Lift exact values from `design/_shared.css` and `design/colors_and_type.css` — those are the canonical token sources. The HTML files are how those tokens compose at the page level.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, hover states, motion timing, and interaction patterns are all settled. Recreate pixel-perfectly; do not "interpret" the visual language. The one place to bring your own judgement is responsive breakpoints below 980px — the prototypes were authored at desktop widths and only loosely defend mobile.

---

## Site map

| Page | File | Purpose |
| --- | --- | --- |
| Homepage | `homepage.html` | Cinematic hero → stats band → trust logo strip → product splits → industries grid → spec-builder feature → CTA |
| Industrial Fasteners | `industrial-fasteners.html` | Catalog deep dive — heavy hex, A193, etc. |
| Structural Fasteners | `structural-fasteners.html` | A325/A490/TC bolts |
| Anchor Bolts | `anchor-bolts.html` | F1554 anchor bolt assemblies |
| Stud Bolts & Threaded Rod | `stud-bolts-threaded-rod.html` | A193 B7 / B8 / B16 studs |
| U-Bolts | `u-bolts.html` | U-bolt configurations |
| Stainless Steel | `stainless-steel-fasteners.html` | 304, 316, duplex, 17-4 PH |
| Silicon Bronze | `silicon-bronze.html` | Marine, non-sparking — uses bronze accent variant |
| Lindapter Hollo-Bolt | `hollo-bolt.html` | Authorized distributor product page |
| Hollo-Bolt Selector | `hollo-bolt-selector.html` | Interactive sizing tool |
| Spec Library | `spec-library.html` | Filterable index of 35 ASTM/SAE/ASME/ISO/DIN standards |
| Spec detail | `spec.html` | Individual standard reference |
| Spec Builder | `spec-builder.html` | 4-step "what are you fastening?" flow |
| CNC Landing | `cnc-landing.html` | Google Ads PPC landing — uses purple accent variant |
| Quote Flow | `quote-flow.html` | 4-step Request a Quote (product → specs → drawings → contact) |
| Blog (Field Notes) | `blog.html` | Editorial blog index |
| Canvas index | `index.html` | Design-canvas presenting all artboards (build-time only — not a real route) |

`index.html` is a presentation surface for the design review. It does not need to ship.

---

## Visual language

**Apple meets industrial supply catalog.** Warm off-white neutrals, tight-tracked SF Pro Display, large numerals, monospaced uppercase kickers, and **two reserved accent colors** — steel blue on light backgrounds, light blue on dark. Purple is reserved exclusively for the CNC machining surface; bronze is reserved exclusively for silicon-bronze. Rules and 1px hairlines do most of the structural work — shadows are soft and rare.

### Color tokens

All defined in `design/colors_and_type.css` and `design/_shared.css`. Names below are the `--cf-*` semantic aliases:

| Token | Hex | Usage |
| --- | --- | --- |
| `--cf-bg` | `#FBFAF7` | Page background — warm off-white |
| `--cf-bg-alt` | `#F5F3EE` | Alt section bg, gradient stop |
| `--cf-bg-cream` | `#EFEBE2` | Image beds, product-render backdrops |
| `--cf-ink` | `#1D1D1F` | Primary text |
| `--cf-ink-soft` | `#424245` | Secondary text |
| `--cf-mid` | `#6E6E73` | Tertiary / metadata |
| `--cf-mid-soft` | `#86868B` | Quaternary |
| `--cf-rule` | `#D2D2D0` | Default 1px rule |
| `--cf-rule-soft` | `#E6E4DF` | Card border, subtle divider |
| `--cf-white` | `#FFFFFF` | Card surface on alt sections |
| `--cf-dark-1` | `#0B0B0D` | Dark hero / CNC band — never `#000` |
| `--cf-dark-2` | `#141417` | Slightly-lifted dark surface |
| `--cf-dark-text` | `#F5F5F7` | Primary on dark |
| `--cf-dark-mid` | `#A1A1A6` | Secondary on dark |
| `--cf-blue-dark` | `#1C52A3` | **Steel blue — primary accent on light bg** |
| `--cf-blue-hover` | `#15407F` | Steel blue pressed state |
| `--cf-blue` | `#38B6FF` | **Light blue — accent pop on dark bg** |
| `--cf-purple` | `#8C52FF` | CNC accent only |
| `--cf-purple-dark` | `#6B37D6` | CNC accent pressed |

**The accent rule is non-negotiable.** Steel blue on light, light blue on dark, purple only on CNC. No other hues anywhere in the product. Errors and success states lean on ink weight, not color.

### Typography

| Family | Stack | Used for |
| --- | --- | --- |
| Display | `"SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif` | All headings + body |
| Text | `"SF Pro Text", -apple-system, …` | Long-form body in spec pages |
| Mono | `"SF Mono", ui-monospace, "Menlo", Consolas, monospace` | Kickers, eyebrows, metadata, stat labels, spec codes |

**Body** sets `font-feature-settings: "ss01", "cv01"` to enable Apple's alternate-1 figures.

Type scale (variables in `colors_and_type.css`):

| Role | Size | Weight | Tracking | Line-height |
| --- | --- | --- | --- | --- |
| Display H1 | `clamp(56px, 7.5vw, 112px)` | 600 | `-0.04em` | `0.96` |
| H2 | `clamp(40px, 4.5vw, 64px)` | 600 | `-0.03em` | `1.05` |
| H3 | `28px` | 600 | `-0.02em` | `1.15` |
| Lede | `22px` | 400 | `-0.015em` | `1.3` |
| Body | `17px` | 400 | `-0.015em` | `1.45` |
| Small | `13px` | 400 | `-0.005em` | — |
| Mono kicker | `11px` UPPERCASE | 500 | `+0.12em` | `1.2` |

**Single-word color accent.** Inside any sans-serif headline, **one word (or short phrase)** is wrapped in `<i>` and rendered in the page's accent color — same family, same weight, same style as the rest of the headline, **only the color changes**. The serif-italic version of this accent has been retired; CSS forces `font-family: inherit; font-style: normal`. It's never the first word — usually the last noun.

```html
<h1>Fasteners for the next generation of <i>building.</i></h1>
<h1>Built to your <i>print.</i></h1>
<h1>Hollo-Bolt. Structural steel, fastened from <i>one side.</i></h1>
```

### Spacing & layout

- Page gutters: `40px` desktop, `22px` mobile
- Section vertical padding: `80–120px`; never less than `48px` on a feature
- Container max-widths: `1280px` content, `1440px` full-bleed grids, `980px` long-form text
- Grid gaps: `1px` (hairline grids), `24px` (cards), `40px` (columns)
- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 120` — exposed as `--cf-space-1` through `--cf-space-10`

**The 1px hairline grid** is a signature pattern — a grid of white cards separated by 1px of `--cf-rule-soft` inside a matching 1px outer border with rounded corners. Used in `.ind-cat-grid`, `.lib-starts-grid`, `.cnc-hero-spec-grid`, and the homepage stats band. It reads as technical and premium simultaneously.

### Borders, radii, shadows

- Default rule: `1px solid var(--cf-rule)` (`#D2D2D0`)
- Soft rule: `1px solid var(--cf-rule-soft)` (`#E6E4DF`)
- Radii: `6px` (inputs/spec pills), `8px` (buttons/small cards), `14px` (nav menus, mid cards), `24px` (hero images, big cards), `980px` (CTA pills). **Never go below 6px** — no sharp modern corners.
- Shadows are soft and used sparingly:
  - `--cf-shadow-lg`: `0 20px 50px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.04)` — nav menus
  - `--cf-shadow-xl`: `0 20px 60px rgba(0,0,0,0.18)` — floating panels
  - `--cf-shadow-dark`: `0 20px 50px rgba(0,0,0,0.5)` — dark-nav menus

### Motion

- Entry rise: `cf-rise` keyframes — `translateY(24px) → 0` + `opacity 0 → 1` over **900ms** with `cubic-bezier(0.2, 0, 0.1, 1)`. Stagger via `.cf-rise--delay-1/-2/-3` (`0.1s / 0.2s / 0.3s`).
- Menu reveal: opacity + `translateY(-8px → 0)` over `180ms`.
- Hover: `150–200ms` ease.
- Logo marquee: 45s linear infinite `translateX(0 → -50%)` on a doubled track.
- **Never bounce, spring, or overshoot.** This is a supply catalog, not a consumer app.

### Backdrop blur (Apple-style)

Used on sticky nav, nav dropdowns, the tweaks panel:

```css
background: rgba(251, 250, 247, 0.72);
backdrop-filter: saturate(180%) blur(20px);
-webkit-backdrop-filter: saturate(180%) blur(20px);
```

Dark-nav variant uses `rgba(11,11,13,0.72)`.

---

## Components

All canonical CSS lives in `design/_shared.css`. Class names are stable — port them or alias them.

### Nav (`<nav class="cf-nav">`)

- Sticky, `48px` tall, backdrop-blurred translucent surface.
- Logo left (`<span class="cf-nav-logo-mark">` background-image swap for dark variant) → centered nav links → CTA right (`<a class="cf-nav-quote">` with steel-blue `›` chevron).
- Mega-menus: `.cf-nav-menu--mega` — 2-column grid, 640px min-width, footer row with steel-blue link.
- Dark variant: add `.cf-nav--dark` to switch text + dropdown surfaces to dark tokens, and the chevron swaps to light blue.

### Pill CTA (`.cf-pill`)

`980px` radius, `12px × 22px` padding, `17px` body. Variants:

| Class | Bg | Fg | Hover |
| --- | --- | --- | --- |
| `.cf-pill` | `--cf-ink` | white | `#000` |
| `.cf-pill--blue` | `--cf-blue-dark` | white | `#15407F` |
| `.cf-pill--blue-light` | `--cf-blue` | white | `#5EC4FF` |
| `.cf-pill--purple` | `--cf-purple` | white | `--cf-purple-dark` |
| `.cf-pill--ghost` | transparent | `--cf-ink` | `rgba(0,0,0,0.05)` bg |
| `.cf-pill--ghost-dark` | transparent | `--cf-dark-text` | `rgba(255,255,255,0.1)` bg |

### Link CTA (`.cf-link`)

`17px` body weight, steel-blue (or `--purple` / `--blue` modifier), trailing `›` chevron that `translateX(3px)` on hover. The Apple "Learn more ›" pattern.

### Hero (`.hero-v1`)

Full-bleed cinematic hero with:
- `.hero-v1-eyebrow` — `14px / 500` mono-style kicker, optional `<i>` for steel-blue word
- `<h1>` — `clamp(64px, 9vw, 128px) / 600`, line-height `0.98`, tracking `-0.045em`
- `.hero-v1-sub` — `22px / 400`, ink-soft
- `.hero-v1-ctas` — `28px` gap, primary pill + ghost link
- `.hero-v1-image` — full-bleed `21:9` aspect ratio, dark `#0B0B0D` bed, `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35))` overlay, `<img object-fit: cover>` with `onerror="this.style.display='none'"` fallback
- `.hero-v1-image-specs` — bottom-left absolute spec strip, `12px` mono, white at 75% opacity

### Stats band (`.stats-band`)

4-column grid, big numerals (`72px+ / 600`), small mono labels, divided by `1px var(--cf-rule-soft)`. Numerals use the `--cf-blue-dark` and `--cf-purple-dark` accent variants on alternating cells.

### Logo strip (`.logos-strip` + `.logos-track`)

Horizontally scrolling marquee of customer logos. **Single source of truth lives in `homepage.html`.** Implementation notes:

- Track is doubled (logos × 2) and animated `translateX(0 → -50%)` for seamless loop.
- Edge fades via `::before` / `::after` 120px gradient masks.
- Each logo is an `<img class="logo-mark logo-mark--<brand>">`. Per-brand classes set explicit `height` + `max-width` — wordmarks vary in aspect ratio, so we equalize *optical* weight rather than literal pixel height.
- Logos are normalized to a uniform desaturated mid-gray so they read as one cohesive strip, not eight different brand expressions:
  - **Originally-white logos** (SpaceX, Chevron, PG&E, Rocket Lab, EMCOR, Primoris): `filter: invert(1) brightness(0.35) saturate(0); opacity: 0.62;`
  - **Originally-black on transparent** (Kiewit): `filter: brightness(1.7) saturate(0); opacity: 0.62;`
  - **Originally-colored on transparent** (Bechtel — red ring + gray wordmark): `filter: grayscale(1) brightness(1.15) contrast(0.95); opacity: 0.62;`
- Hover lifts opacity to 1 and deepens brightness slightly.

If you swap a logo, check its source format first (white-on-transparent vs black-on-transparent vs colored-on-transparent) and pick the matching filter variant.

### Split section (`.split` / `.split--reverse` / `.split--alt`)

50/50 grid, `min-height: 760px`. Image on one side, copy on the other (eyebrow → h2 → lede → spec bullet list → link). `.split--reverse` swaps order; `.split--alt` adds the cream alt background.

### Industry tile grid (`.industries`)

2×3 grid of image-top cards: cream-bg image bed, eyebrow, title, 2-line description, "Learn more ›" link. No hover lift — only background swap or border darken.

### Footer (`.cf-footer`)

5-column grid (brand + 4 link columns), monospace copyright line, `12px` body. Brand col uses `.cf-footer-brand` with the `cf-nav-logo-mark` at `20×20px`.

### Spec library module (`lib-*`)

Separate naming convention, defined in `design/technical-library.css`. Three-column-wide `1280px` container with dense left (hero copy + meta `<dl>`) and a sticky right "Contents" index card. Filterable specimen-card grid below. Each spec card pairs a mono code (`A193 B7`) with a plain-English title.

### Spec builder modal (`#specModal`)

Inline modal at the bottom of `homepage.html`. `rgba(29,29,31,0.72)` backdrop with `backdrop-filter: blur(10px)`. White card, `24px` radius, `48px` padding. 4-step flow with `.spec-opt` selectable cards. Close button is a `32×32px` neutral-bg circle in the top-right.

---

## Interactions & behavior

- **Sticky nav** — `position: sticky; top: 0; z-index: 100`. Backdrop blur. Mega-menus open on hover *and* focus-within (keyboard nav).
- **Logo marquee** — pure CSS, no JS. The track is doubled and translated.
- **Smooth scroll** — `html { scroll-behavior: smooth; }` for anchor links.
- **Tweaks panel** (`index.html` only — design-review surface, not production) — color/density/hero-image controls that postMessage tweaks to all open iframes. Not part of the production handoff.
- **Quote flow** (`quote-flow.html`) — 4-step progress bar, file-drop drawing upload, review screen, submit confirmation. Currently client-side only; you'll wire to your real submission endpoint.
- **Spec library** (`spec-library.html`) — facet filters across industry / service / strength class / standard family. Currently a static prototype; the real version needs the 35-spec dataset from `assets/technical-library/*.md` indexed and rendered.
- **Spec builder** (`spec-builder.html` + the homepage modal) — 4-step "what are you fastening?" flow that narrows grades. State is held in `spec-builder-app.js`; data is in `spec-builder-data.js`.

---

## Iconography

**Near-zero custom iconography.** Visual emphasis comes from typography and photography. Where a glyph is needed, the order of preference is:

1. **Typographic glyphs** — `§`, `·`, `›`, `—`, `†`, `%`, `×`, `″`, `′`
2. **CSS-drawn chevrons** — the nav menu caret is a rotated `border-right + border-bottom` 2-square; `.cf-link::after { content: '›' }` is the universal "Learn more" chevron
3. **Inline SVG** — only as a last resort, monochrome, `1.5` stroke, `16–18px`. **There is no SVG icon usage currently.** If you introduce icons, use **Lucide** (its stroke density matches SF Pro) and flag the addition to the team.

Brand mark: `assets/cf-logo-black.png` (light bg) + `assets/cf-logo-white.png` (dark bg). A hex-nut "C" — fastener geometry, not a floral roundel. Rendered inline via `<span class="cf-nav-logo-mark">` + CSS background-image.

**Emoji: zero.** Anywhere in the product. If you need a mark, use a typographic glyph or an SVG.

---

## Content rules

**Voice.** Knowledgeable, specific, unpretentious. The reader is an engineer, buyer, or contractor — someone who already knows what a Grade 55 anchor bolt is. Don't over-explain fundamentals; do over-specify grades, standards, and coatings.

**Tone.** Direct, confident, occasionally dry. Second person ("your print", "what you're fastening"). No hype, no exclamation marks, no jargon ("solutions", "synergy", "cutting-edge"). Concrete nouns over adjectives.

**Headlines.** Two-beat structure with a line break and a single emphasized word in the accent color. Sentence case with a terminal period.

> "Fasteners for the next generation of *building.*"
> "A325, A490, TC bolts. Engineered for the moment."
> "Built to your *print.*"

**Casing.**
- Headings → Sentence case with terminal period
- Kickers/eyebrows → UPPERCASE MONO, `+0.12em` tracking
- Buttons → Title case, no period ("Request a Quote")
- Inline links → Sentence case + `›` chevron ("Learn more ›")

**Numerals.** Set big, tight, bold — they're a visual feature.
- `24hr` quote turnaround
- `±.0005″` CNC tolerance
- `100%` traceability
- `F1554 Gr 55`, `A193 B7`, `A325`, `8.8 / 10.9 / 12.9`
- Use **true typographic marks**: `″` (double-prime, not `"`), `′` (prime), `×` (not `x`), `—` (em-dash, not `--`), `−` (minus, not hyphen), `&` ampersand in display type but `&amp;` in code

---

## Assets

Bundled in `design/assets/`:

**Brand**
- `cf-logo-black.png`, `cf-logo-white.png` — primary mark + dark-bg variant

**Product renders** (transparent PNG)
- `product-industrial.png` — hex bolt + nut
- `product-structural.png` — A325 render
- `product-anchor.png` — F1554 headed anchor
- `product-hollobolt.png` — Lindapter Hollo-Bolt HB1

**Photography** (webp)
- `if-factory.webp`, `template-plate.webp` — context shots
- `if-stamp-105.webp`, `if-stamp-316.webp`, `if-stamp-b8-rod.webp`, `stamp-105.webp`, `stamp-316.webp`, `stamp-b8.webp` — bolt head stamp macros
- `anchor-bent.webp`, `anchor-headed.webp`, `anchor-rods.webp`, `anchor-postinstall.webp` — anchor-bolt type illustrations

**Customer logos** (`assets/logos/`)
- `spacex.webp`, `chevron.webp`, `pge.webp`, `rocketlab.webp`, `emcor.webp`, `primoris.webp` — originally-white, need `invert + saturate(0) + brightness` filter
- `kiewit.png` — black on transparent, needs `brightness + saturate(0)` filter
- `bechtel.png` — colored (red ring + gray wordmark) on transparent, needs `grayscale + brightness` filter

**Technical library content** (`assets/technical-library/`)
- 26 markdown files for ASTM / SAE / ASME standards. These are the source content for the spec library.

**Image fallback pattern.** Most pages use `<img … onerror="this.style.display='none'" />` so a broken image URL fails silently rather than showing a broken icon. Replicate this in your framework — every product/photo `<img>` should have an `onError` handler that hides the element. Cream image beds (`background: var(--cf-bg-cream)`) provide the fallback ground.

---

## Files in this bundle

- `README.md` — this document
- `design/_shared.css` — canonical production stylesheet (nav, pills, footer, utilities, hero, splits, etc.)
- `design/colors_and_type.css` — pure token file (color, type, radii, spacing, motion variables)
- `design/technical-library.css` — spec-library layout module (lib-* classes)
- `design/spec-builder.css` — spec-builder modal styles
- `design/homepage.html` — homepage; **canonical reference for the logo strip implementation**
- `design/cnc-landing.html` — purple-accent dark-hero variant
- `design/silicon-bronze.html` — bronze-accent material page (shows accent variant pattern)
- `design/spec-library.html`, `design/spec.html`, `design/spec-builder.html` — spec library + builder
- `design/quote-flow.html` — 4-step quote flow
- `design/blog.html` — Field Notes blog index
- `design/industrial-fasteners.html`, `design/structural-fasteners.html`, `design/anchor-bolts.html`, `design/stud-bolts-threaded-rod.html`, `design/u-bolts.html`, `design/stainless-steel-fasteners.html`, `design/hollo-bolt.html`, `design/hollo-bolt-selector.html` — product pages
- `design/spec-builder-app.js`, `design/spec-builder-data.js`, `design/technical-library-app.js`, `design/technical-library-data.js`, `design/industry.js` — interaction scripts (read for behavior; reimplement in your framework)
- `design/assets/` — all brand, product, photography, logo, and technical-library content

---

## Known caveats & flags

- **Fonts.** The site leans entirely on Apple system fonts (SF Pro Display, SF Mono). On non-Apple platforms these fall through to Helvetica/monospace and tracking shifts noticeably. **For production, license Inter + a monospace family (JetBrains Mono or IBM Plex Mono) and embed via `@font-face`, OR self-host SF Pro under Apple's license terms if all viewers are on Apple devices.** Flagged.
- **Hero imagery.** Several heroes pull from Unsplash and other public CDN URLs with `onerror` fallbacks. These must be replaced with **owned, licensed assets** before launch.
- **Customer logos.** The trust strip uses third-party brand marks. Confirm with each customer that their logo can be used; the design's neutral desaturated treatment helps, but written permission is still required for production.
- **No full dark-mode site.** Only the CNC hero and end-of-page CTA bands are dark. Tokens exist (`--cf-dark-1`, `--cf-dark-text`) but haven't been composed into a full theme. If a system-wide dark mode is needed, scope that as separate work.
- **Accent discipline.** Steel/light/purple is the entire palette. Resist any pressure to add green, orange, or "warning yellow" — error/success states should lean on ink weight, not hue.
- **Responsive.** Designs were authored at desktop widths. The `clamp()`-based type scale handles the lower end of viewport widths gracefully, but layouts below 980px need framework-level breakpoint work. Single-column stack at 768px and below is the intended pattern.
- **Quote-flow + spec-builder are static prototypes.** Forms don't submit anywhere; state is in-memory only. Wire to your real backend during implementation.
