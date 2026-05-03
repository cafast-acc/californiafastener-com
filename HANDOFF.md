# Session handoff — pick up from another machine

Self-contained brief so you (or a new Claude Code session) can resume work on
this repo without losing context. Last updated after porting the spec builder,
spec library, 35 spec detail pages, and stud-bolts-threaded-rod.

---

## Where things live

| | |
|---|---|
| GitHub repo | https://github.com/cafast-acc/californiafastener-com (private) |
| Production | https://cafastdotcom2026-2.vercel.app/ |
| Vercel project | `california-fastener/cafastdotcom2026-2` (in the `california-fastener` team scope) |
| Branch | `master` (auto-deploys to prod on push) |

18 commits on `master` as of this update. 8 routes shipped (counting the spec
detail family as one): homepage, anchor-bolts, structural-fasteners,
industrial-fasteners, spec-builder, spec-library, spec-library/[slug] (35),
stud-bolts-threaded-rod.

## Set up the new machine

```sh
gh auth login                            # cafast-acc account, HTTPS protocol
git clone https://github.com/cafast-acc/californiafastener-com.git
cd californiafastener-com
npm install
npm run dev                              # http://localhost:3000
```

Optional Vercel CLI for local deploys (auto-deploy on push to master is
already wired up regardless):

```sh
npm i -g vercel
vercel login
vercel link                              # picks up .vercel/ from the repo
```

The Vercel CLI re-prompts for auth on each invocation on Windows — known
quirk, doesn't block deploys.

## Stack (unchanged)

- Next.js 16 App Router + Turbopack + TypeScript + Tailwind v4
- `next/font` Inter + JetBrains Mono (sub for SF Pro — handoff caveat)
- `next/image` for owned product PNGs at `quality={95}` (HD); `images.qualities`
  is allowlisted in `next.config.ts`
- Sanity v3 still pending — see "Suggested next moves"
- Jotform deferred for new forms; `/spec-builder` is the one place a real
  Jotform endpoint is wired (form ID `260995842557069` posts to a hidden
  iframe target)

## Page status

| Route | Status | Notes |
|---|---|---|
| `/` (homepage) | ✅ Ported | All 4 product PNGs at quality 95 |
| `/anchor-bolts` | ✅ Ported | Uses page-specific `ab-*` prefix (rotated hero image) |
| `/structural-fasteners` | ✅ Ported | New cinematic hero + props strip after May handoff rework |
| `/industrial-fasteners` | ✅ Ported | Same shared bolt hero image as structural |
| `/spec-builder` | ✅ Ported | Real Jotform integration — submits live |
| `/spec-library` | ✅ Ported | 35 specs faceted, three layout modes |
| `/spec-library/[slug]` | ✅ Ported | All 35 routes statically pre-rendered |
| `/stud-bolts-threaded-rod` | ✅ Ported | 4th product page on `pp-*` template |
| `/silicon-bronze` | ⏳ Pending | Bronze accent variant — different palette/accent rule |
| `/stainless-steel-fasteners` | ⏳ Pending | Should fit `pp-*` template |
| `/u-bolts` | ⏳ Pending | Should fit `pp-*` template |
| `/hollo-bolt`, `/hollo-bolt-selector` | ⏳ Pending | Selector is interactive (sizing tool) |
| `/cnc-machining` | ⏳ Pending | Purple accent (CNC-only color rule) |
| `/quote` | ⏳ Pending | Jotform — restyle their embed when wired |
| `/blog` | ⏳ Pending | Needs Sanity Studio + content model |
| `/industries/*` | ⏳ Pending | 6 industry vertical pages |

## Conventions worth knowing

### Design tokens + global CSS
- `src/styles/cf-tokens.css` — all `--cf-*` design tokens
- `src/styles/cf-shared.css` — global component CSS (`cf-nav`, `cf-pill`,
  `cf-link`, `cf-footer`, `cf-rise`)
- Both imported globally via `globals.css`. Don't redefine tokens.

### Product page template (`pp-*`)
`src/styles/cf-product-page.css` — shared skeleton for hero, trustbar, intro,
products, grades-by-family, trace, cross, quote, CTA. Used by
`/structural-fasteners`, `/industrial-fasteners`, `/stud-bolts-threaded-rod`
(`/anchor-bolts` is intentionally on its own `ab-*` prefix because its hero
has a rotated bolt image and unique sections).

**Modifier vocabulary** — four product pages now exercise four different
combinations:

| Page | trace | cross | quote |
|---|---|---|---|
| `/structural-fasteners` | `pp-trace` | `pp-cross--alt` | `pp-quote--alt` |
| `/industrial-fasteners` | `pp-trace` (5-col via `--five`) | `pp-cross--alt` | `pp-quote--alt` |
| `/stud-bolts-threaded-rod` | `pp-trace--alt` (5-col via `--five`) | `pp-cross` (default) | `pp-quote` (default) |

When a future page diverges, just pick the right combination from
`cf-product-page.css`. No new CSS needed unless the design introduces a
genuinely new section.

### Page-unique sections
Each page's per-page CSS file (`src/styles/cf-{page}.css`) holds **only** the
page's unique sections. Examples:
- `cf-structural-fasteners.css` — `sf-joint`, `sf-coatings`
- `cf-industrial-fasteners.css` — `if-companion`, `if-exotic`, `pp-family--stainless` variant
- `cf-stud-bolts.css` — `st-compare`, `st-inventory`, `st-apps`, `st-cut`, `st-coatings`

Use a 2-letter prefix derived from the route (`ab-`, `sf-`, `if-`, `st-`,
etc.). Don't pollute `cf-product-page.css` unless ≥2 pages share the section.

### Components
- `CfNav`, `CfFooter` — server, CSS-only mega-menus
- `Img` (client) — `<img>` wrapper with `onError` "fail silently" fallback.
  Use for placeholder Unsplash/Squarespace URLs we don't want next/image's
  external-domain config burden for.
- `Image` from `next/image` — used for owned product PNGs in `/public/assets/`
  with explicit `width`, `height`, `sizes`, and `quality={95}`. WebP/AVIF
  auto-served.
- `SpecBuilderTrigger` (client) — homepage spec-builder modal teaser
- `QuoteFormPlaceholder` (client) — visual-only inline form for product pages.
  Mimics "Sent ✓" demo behavior. **Not the spec builder's modal** — that
  one (`src/components/spec-builder/QuoteModal.tsx`) is a real Jotform
  integration with hidden field carry-over.

### Spec library architecture
- `src/lib/specLibrary/data.ts` — typed `LIB_SECTIONS` (6) + `LIB_SPECS` (35) + `LIB_FACETS`
- `src/lib/specLibrary/filtering.ts` — pure `searchBlob` + `specMatchesFilter`
- `src/lib/specLibrary/markdown.ts` — hand-rolled markdown renderer + `parseSpec`
  + cross-reference auto-linking (regex turns "ASTM A194" mentions in body
  into links to `/spec-library/astm-a194`)
- `content/spec-library/*.md` — 35 source markdown files, read at build via
  `fs` in the dynamic route's `generateStaticParams`. **Four are stubs**
  marked `*This page is a working stub — content team will expand.*` at the
  bottom: `din-931`, `din-934`, `iso-898-1`, `iso-3506`. Slugs are stable —
  rewrite the file content in place when proper copy arrives.
- `src/components/spec-detail/SpecToc.tsx` — client island for TOC scroll-spy
- `src/styles/cf-spec-library.css`, `cf-spec-detail.css` — page-specific CSS

The `design/assets/spec-library/*.md` folder (31 files) is the canonical
reference; the 4 stub files only exist in `content/spec-library/`. The
markdown renderer and structured extraction (At-a-glance pull-out, meta
sidebar, related-specs panel) is purpose-built — don't swap for a generic
markdown library without re-implementing the extraction.

### Spec builder architecture
- `src/lib/specBuilder/{options,data,scoring}.ts` — typed option lists,
  23-material database, pure scoring engine
- `src/components/spec-builder/SpecBuilder.tsx` — single client island holding
  state across 4 stages + results
- `src/components/spec-builder/QuoteModal.tsx` — real Jotform iframe
  integration (form ID `260995842557069`, target `sb-jf-frame`). Hidden
  fields `q7..q12` carry spec context (spec, grade, app, env, strength,
  constraints). Phone field is required. Phone-mask handles backspace
  through area code correctly.

## Open caveats (carry-overs from prior handoffs + new ones)

- **Imagery is placeholder.** Hero/CNC/industries images on the homepage pull
  from Unsplash and Squarespace CDNs. Same for stud-bolts-split. Customer
  logos in the marquee need written permission per the design README.
- **Some product PNGs are smaller than ideal.** The hollo-bolt source is
  1029×951 — at retina device pixels for the homepage's specialty section,
  it upscales slightly. Quality 95 makes it as good as the source allows.
  Drop-in 2000px+ replacements at `/public/assets/product-{anchor,hollobolt,
  industrial,structural}.png` to fully eliminate. Same filenames, no code
  changes needed.
- **Fonts substituted** (Inter + JetBrains Mono for SF Pro Display + SF Mono).
- **Mobile <980px is unstyled** per the design handoff.
- **Quote forms are placeholders** except `/spec-builder`. `QuoteFormPlaceholder`
  doesn't submit. Wire to Jotform when ready.
- **CDN images are uncached.** Vercel's image optimizer only caches
  Vercel-served images. Replacing the placeholder URLs with owned assets
  in `/public/assets/` also unlocks edge caching.
- **Spec detail cross-link regex** matches `ASTM A###`, `ASTM F###`,
  `ASTM B###`, `SAE J###`, `ASME B1.x` only. Standalone grade codes (`B7`,
  `Class 8.8`) stay as plain text. If you ever want more aggressive linking,
  the regex lives in `src/lib/specLibrary/markdown.ts`.

## Decisions worth not re-litigating

- `anchor-bolts` is **not** refactored to use `pp-*`. Its hero rotates
  (`-6deg`, max-height 90% vs `pp-hero`'s 95%) and its sections are unique.
  Keep on `ab-*`.
- `cf-product-page.css` was extracted **after** the third product page. Don't
  prematurely extract more shared CSS — wait until ≥2 pages share a new
  section pattern.
- The structural-fasteners `sf-rcsc` "Pretension verification" section was
  removed because each method was already named in the joint-types section's
  tag line.
- Spec builder phone field is **required**, mask supports clean backspace
  through area code, thank-you copy reads "A team member" not "An estimator".
- The structural-fasteners and industrial-fasteners pages share the same
  hero bolt image (`structural-hero-bolt.png`) — that's intentional per
  the May handoff.
- Spec library / spec detail tweaks panels (Body width / TOC toggle / Layout)
  are **not** ported — they're design-canvas tooling. Layout switching for
  the library landing IS ported (editorial / grid / table) since users would
  want it.
- Stub specs (4 of 35) ship visibly marked. When real content arrives,
  rewrite `content/spec-library/{din-931,din-934,iso-898-1,iso-3506}.md`
  in place — slugs stay the same.

## Memory carry-over

The user's auto-memory at `~/.claude/projects/<project>/memory/` had three
facts; they're also captured below so you don't strictly need to recreate
them on a new machine:

**Project overview** — California Fastener marketing site rebuild. Stack:
Next.js 16 + TypeScript + Tailwind v4 + Sanity v3 (planned) + Jotform
(deferred). Canonical design tokens in `design/colors_and_type.css` and
`design/_shared.css`.

**Jotform plan** — Forms handled by Jotform. User's preference: restyle
Jotform's embed code with hidden fields rather than build custom React forms
that POST to Jotform's API. **Do not build custom form components
preemptively.** When a page needs a form, drop in a `QuoteFormPlaceholder`
and note that Jotform integration is pending. Exception: `/spec-builder`
already has a real Jotform integration via `QuoteModal` — that pattern is
the model for any future Jotform-backed form (hidden iframe target, hidden
field carry-over for context, body-scroll lock, ESC-to-close).

**Imagery and fonts** — Placeholder Unsplash/Squarespace imagery is fine
during early dev. Owned/licensed photography swaps in before launch.
Inter + JetBrains Mono are standing in for SF Pro Display + SF Mono via
`next/font`.

## Suggested next moves (pick one)

Roughly ordered by ease and likelihood of fitting `pp-*` cleanly:

1. **`/silicon-bronze`** — material page with the bronze accent variant
   (separate from blue-dark). Likely fits `pp-*` template with a small
   `cf-silicon-bronze.css` for bronze color overrides. ~1 hour.
2. **`/stainless-steel-fasteners`** — should fit cleanly. ~1 hour.
3. **`/u-bolts`** — same. ~1 hour.
4. **`/cnc-machining`** — purple accent variant (CNC-only color rule).
   Larger because it's a PPC landing surface, not just a product brochure.
   ~2-3 hours.
5. **`/hollo-bolt`** + **`/hollo-bolt-selector`** — selector is interactive
   (sizing tool). Bigger lift; needs its own data + state.
6. **`/industries/*` (6 pages)** — repeating template, content-heavy.
7. **Stand up Sanity** — embedded Studio at `/studio`, schemas for blog
   first, then optionally for product pages. Unblocks editable content.
   Probably 4-8 hours of focused work.
8. **Replace placeholder imagery** — when you've got owned assets for the
   homepage hero, CNC, industries, and stud-bolts split. Just drop into
   `/public/assets/` and update the `<Img>` srcs. ~30 min once images
   are ready.
9. **Higher-resolution product PNGs** — 2000px+ replacements for the four
   `/public/assets/product-*.png` files. Drop-in, no code changes. Resolves
   the slight upscaling on retina that quality 95 can't fully fix.

## Quick troubleshooting

- **Dev server picks the wrong workspace root** — there's a stray
  `package-lock.json` in `C:\Users\aaron\` that confuses Turbopack. Fixed
  via `turbopack.root = import.meta.dirname` in `next.config.ts`. If you
  see `Can't resolve 'tailwindcss'` in dev, that's the cause.
- **Vercel CLI re-prompts for auth** — Windows quirk. Auto-deploy on push
  works regardless. For local previews, fall back to the dashboard.
- **CRLF warnings on every commit** — Windows line-ending normalization;
  cosmetic, ignore.
- **Image optimizer 400 with `w=1200`** — make sure the value is in
  `images.qualities` allowlist if specifying non-default quality, and that
  the `w` is in `images.deviceSizes` (defaults cover 640..3840).
- **Stale 'X is not defined' errors after edits** — Turbopack caches
  aggressively in dev. The route may already render correctly via `curl`
  while the error log shows old failures. Trust the curl status, not the
  log.
