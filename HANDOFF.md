# Session handoff — pick up from another machine

This file is a self-contained brief so you (or a new Claude Code session) can
resume work on this repo on a different machine without losing context.

---

## Where things live

| | |
|---|---|
| GitHub repo | https://github.com/cafast-acc/californiafastener-com (private) |
| Production | https://cafastdotcom2026-2.vercel.app/ |
| Vercel project | `california-fastener/cafastdotcom2026-2` (in the `california-fastener` team scope) |
| Branch | `master` (auto-deploys to prod on push) |

The repo has nine commits as of this handoff — homepage ported, three product
pages ported, a shared `pp-*` CSS module extracted, image perf fixes landed.

## Set up the new machine

```sh
gh auth login                            # cafast-acc account, HTTPS protocol
git clone https://github.com/cafast-acc/californiafastener-com.git
cd californiafastener-com
npm install
npm run dev                              # http://localhost:3000
```

Optional, if you want to deploy from the new machine:

```sh
npm i -g vercel
vercel login                             # use the same Vercel account; OAuth
vercel link                              # picks up .vercel/ from the repo
```

Note: on the source machine the Vercel CLI was re-prompting for auth on each
invocation — credentials weren't persisting between calls on Windows. Worth
testing once on the new machine; if it persists, fall back to dashboard
deploys (auto-deploys on `master` push are already wired up regardless).

## Stack

- Next.js 16 App Router + Turbopack + TypeScript + Tailwind v4
- `next/font` with Inter + JetBrains Mono (substituting SF Pro — no license)
- Sanity v3 planned for the blog and (possibly later) product-page content
- Jotform planned for forms — defer until needed; restyle their embed rather
  than build custom UI + API

## Conventions worth knowing before editing

The README and AGENTS.md cover the basics. The design system lives in:

- `src/styles/cf-tokens.css` — all `--cf-*` design tokens (colors, type, radii,
  spacing, motion). Lifted from `design/colors_and_type.css`. Don't redefine.
- `src/styles/cf-shared.css` — global component CSS (`cf-nav`, `cf-pill`,
  `cf-link`, `cf-footer`, `cf-rise`). Lifted from `design/_shared.css`.
- `src/styles/cf-product-page.css` — the shared `pp-*` skeleton used by
  `/structural-fasteners` and `/industrial-fasteners`. Hero, trustbar,
  intro, products grid, grades-by-family, trace, cross, quote, CTA. Use
  this for any new product page that fits the template.
- `src/styles/cf-anchor-bolts.css`, `cf-homepage.css`, `cf-structural-fasteners.css`,
  `cf-industrial-fasteners.css` — only page-unique sections; the shared
  bits got pulled out into `cf-product-page.css`.

Modifier vocabulary on `pp-*`:

- `pp-trace pp-trace--alt` — trace section on `bg-alt` instead of `bg`
- `pp-trace-grid pp-trace-grid--five` — 5-col trace grid (default 4)
- `pp-cross pp-cross--alt` — cross section on `bg-alt` (cards flip to `bg`)
- `pp-quote pp-quote--alt` — quote section on `bg`, form on `bg-alt`, inputs on `bg`

Components:

- `CfNav`, `CfFooter` — server components, CSS-only mega-menus
- `Img` (client) — `<img>` wrapper with the design's `onError` "fail silently"
  fallback. Use this for placeholder URLs (Unsplash/Squarespace) we don't
  want next/image's external-domain config burden for.
- `Image` (`next/image`) — used for owned product PNGs in `/public/assets/`
  with explicit width/height + sizes for responsive srcset. WebP/AVIF auto.
- `SpecBuilderTrigger` (client) — homepage spec-builder modal trigger + dialog
- `QuoteFormPlaceholder` (client) — visual-only inline form for product pages.
  Mimics the design's "Sent ✓" demo behavior. **Replace with a Jotform embed
  when forms are wired up.**

## Page status

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Ported | Homepage, all 12 sections |
| `/anchor-bolts` | ✅ Ported | Uses page-specific `ab-*` prefix (rotated hero image) |
| `/structural-fasteners` | ✅ Ported | Uses shared `pp-*`; `sf-rcsc` was removed (redundant with `sf-joint`) |
| `/industrial-fasteners` | ✅ Ported | Uses shared `pp-*` + `if-companion` + `if-exotic` + `pp-family--stainless` |
| `/stud-bolts-threaded-rod` | ⏳ Pending | Should fit the `pp-*` template |
| `/u-bolts` | ⏳ Pending | Should fit the `pp-*` template |
| `/stainless-steel-fasteners` | ⏳ Pending | Should fit the `pp-*` template |
| `/silicon-bronze` | ⏳ Pending | Bronze accent variant — check colors |
| `/hollo-bolt`, `/hollo-bolt-selector` | ⏳ Pending | Selector is interactive |
| `/cnc-machining` | ⏳ Pending | Purple accent (CNC-only color rule) |
| `/spec-library`, `/spec-builder`, `/spec/[id]` | ⏳ Pending | Need spec content + interactive logic from `design/spec-*-app.js` |
| `/industries/*` | ⏳ Pending | 6 industry vertical pages |
| `/quote` | ⏳ Pending | Jotform — defer |
| `/blog` | ⏳ Pending | Needs Sanity Studio + content model |

## Open caveats (inherited from the design handoff)

- **Imagery is placeholder.** The hero, CNC, and industries images on the
  homepage pull from Unsplash and Squarespace CDNs. Same for stud-bolts.
  Replace with owned, licensed assets before launch. Customer logos in the
  marquee also need written permission per the README.
- **Fonts substituted.** Inter + JetBrains Mono via `next/font` standing in
  for SF Pro Display + SF Mono. Tracking shifts slightly; acceptable in
  early dev. Revisit if SF Pro gets licensed.
- **Mobile <980px is unstyled.** Designs were authored at desktop widths.
  The shared `pp-*` CSS has 1200px and 1000px breakpoints (and `cf-shared`
  has the canonical responsive token scale), but layouts below 980px need
  framework-level work. Single-column stack at 768px is the intended
  pattern per the design handoff README.
- **Quote forms are visual placeholders.** `QuoteFormPlaceholder` doesn't
  submit anywhere. Wire up Jotform when ready.
- **CDN images are uncached.** Vercel's image optimizer only caches
  Vercel-served images. The Unsplash/Squarespace placeholder URLs aren't
  cached at the edge — replacing them with owned assets in `/public/assets/`
  also unlocks edge caching.

## Recent decisions worth not re-litigating

- `anchor-bolts` is intentionally **not** refactored to use `pp-*`. Its
  hero image rotates (`-6deg`, max-height 90% vs `pp-hero`'s 95%) and its
  sections (values, types, bend, apps, plates, spec-lib, partners) are
  unique to the page anyway. Keep it on `ab-*`.
- The "Pretension verification" section was removed from
  `/structural-fasteners` because each pretension method was already named
  in the joint-types section's tag line ("Turn-of-nut · DTI · TC bolts ·
  calibrated wrench" lives on the Pretensioned joint card).
- `cf-product-page.css` was extracted **after** porting the third product
  page. Earlier, when only one product page existed, the duplication
  picture wasn't clear enough to justify the abstraction. Don't extract
  more shared CSS until you've ported the next 1-2 product pages and seen
  whether they fit.

## Memory carry-over (write these to `~/.claude/projects/<project>/memory/` on the new machine if you want them persisted there too)

The memory facts I had on the source machine — these are also captured in this
HANDOFF.md, so they don't strictly need to be re-created, but if you want them
showing up automatically in future Claude Code sessions:

**`project_overview.md`** — Building a marketing site for californiafastener.com
(Bay Area industrial-fastener distributor + CNC shop, est. 1970, Vacaville CA).
Stack: Next.js 16 + TypeScript + Tailwind v4 + Sanity v3 (planned) + Jotform
(deferred). Canonical design tokens in `design/colors_and_type.css` and
`design/_shared.css`.

**`jotform_plan.md`** — Forms handled by Jotform. User chose to restyle Jotform's
embed code with hidden fields rather than build a custom React form that POSTs
to Jotform's API. **Do not build custom form components preemptively.** When
a page needs a form, drop in a placeholder section (e.g. `QuoteFormPlaceholder`)
and note that Jotform integration is pending.

**`imagery_and_fonts.md`** — Placeholder Unsplash/Squarespace imagery is fine
during early dev. Owned/licensed photography swaps in before launch. Inter +
JetBrains Mono are standing in for SF Pro Display + SF Mono via `next/font`.

## Suggested next moves (pick one)

1. **Stand up Sanity** — embedded Studio at `/studio`, schemas for the blog
   first, then optionally for product pages. Unblocks editable content. Gets
   real content management workflow in place. Maybe an hour for the blog
   schema + Studio embed + first content fetch.
2. **Port the next product page** — `stud-bolts-threaded-rod` is the next
   logical candidate. Should fit the `pp-*` template. Per-page CSS file
   should land in 30-60 lines if the page genuinely conforms. If it doesn't,
   that's a useful signal about whether the template needs to flex.
3. **Wire up mobile breakpoints** — designs only defended desktop. The
   `pp-*` and `cf-shared` CSS already has 1200px / 1000px breakpoints; below
   that, real mobile work is needed. Pages currently look broken at <768px.
4. **Replace placeholder imagery** — if you've got owned assets, swapping the
   Unsplash/Squarespace URLs in the homepage's hero/CNC/industries unlocks
   another ~4 MB of homepage weight reduction (rest of the post-perf-fixes
   page weight is in those placeholders). Customer logos still need written
   permission per the design README.
5. **Custom domain** — `vercel domains add californiafastener.com` (or via
   dashboard) once you're ready to point real DNS at the deploy. The current
   site at the apex domain stays live until you do.

## Quick troubleshooting

- **Dev server picks the wrong workspace root** — there's a stray
  `package-lock.json` in `C:\Users\aaron\` that confuses Turbopack. Fixed
  via `turbopack.root = import.meta.dirname` in `next.config.ts`. If you
  see `Can't resolve 'tailwindcss'` errors in dev, that's the cause and
  the config fix is in place.
- **Claude Preview vs raw `npm run dev`** — `.claude/launch.json` configures
  the Claude Preview MCP server to start on port 3000. If port 3000 is
  occupied, kill the orphan with `taskkill //F //PID <PID>` after finding
  it via `netstat -ano | grep :3000`.
- **CRLF warnings on every commit** — Windows line-ending normalization;
  cosmetic, ignore. If they get noisy, set `git config core.autocrlf true`
  globally.
