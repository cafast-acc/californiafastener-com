# California Fastener — marketing site

Rebuild of [californiafastener.com](https://californiafastener.com), a Bay Area
industrial-fastener distributor and CNC machining shop (Vacaville, CA, est. 1970).

## Stack

- **Next.js 16** (App Router, Turbopack) on **Vercel**
- **TypeScript** + **Tailwind CSS v4**
- **Inter** + **JetBrains Mono** via `next/font` — substituted for SF Pro
  (no SF Pro license; flagged in the design handoff)
- **Sanity v3** for the Field Notes blog and (later) editable product-page
  content
- **Jotform** for the quote flow and other forms — embeds get restyled in place
  rather than rebuilt as custom React forms

## Layout

```
design/                The Claude Design HTML/CSS handoff. Canonical reference
                       for tokens, copy, and component structure. Do not edit
                       to change the production site — port pages out of here
                       into src/app instead.
public/assets/         Brand mark, product renders, customer logos, photography,
                       and the 26 markdown specs that drive the spec library.
src/
  app/                 App Router routes. One folder per page.
  components/          CfNav, CfFooter (server), Img + SpecBuilderTrigger
                       (client islands).
  styles/              cf-tokens.css, cf-shared.css (canonical, lifted from
                       design/), and per-page modules like cf-homepage.css and
                       cf-anchor-bolts.css.
```

`src/styles/cf-tokens.css` and `cf-shared.css` are the single source of truth
for design tokens and component classes (`.cf-pill`, `.cf-nav`, etc.). They were
copied from `design/colors_and_type.css` and `design/_shared.css` with asset
paths rewritten to `/assets/...`. Don't reinvent these classes — use them in JSX.

## Local dev

```sh
npm install
npm run dev
```

The Claude Preview launch config (`.claude/launch.json`) wires this up for the
embedded preview. Pin Turbopack's workspace root via `next.config.ts` —
otherwise it walks up the filesystem looking for the nearest lockfile and gets
the wrong directory on machines with stray `package-lock.json` files in `$HOME`.

## Deployment

Auto-deploy on push to `master` via the GitHub → Vercel integration. Project:
[`california-fastener/cafastdotcom2026-2`](https://vercel.com/california-fastener).

## Pages

| Route | Status |
| --- | --- |
| `/` (homepage) | Ported |
| `/anchor-bolts` | Ported |
| `/structural-fasteners`, `/industrial-fasteners`, `/stud-bolts-threaded-rod`, `/u-bolts`, `/stainless-steel-fasteners`, `/silicon-bronze`, `/hollo-bolt`, `/hollo-bolt-selector` | Pending |
| `/cnc-machining` | Pending |
| `/spec-library`, `/spec-builder` | Pending (need spec content + interactive logic) |
| `/industries/*` | Pending |
| `/quote` | Pending (Jotform — defer until form is set up) |
| `/blog` | Pending (needs Sanity Studio + content model) |

## Open caveats from the handoff

- **Imagery is placeholder.** Hero/CNC/industries images pull from Unsplash
  and Squarespace CDNs with `Img` (the client `<img>` wrapper) hiding broken
  loads. Replace with owned assets before launch.
- **Fonts will shift slightly** because Inter is not SF Pro. Acceptable in
  early dev; revisit if SF Pro gets licensed.
- **Mobile <980px is unstyled** per the handoff. Breakpoints below 980px
  need framework-level work; the design defends desktop only.
