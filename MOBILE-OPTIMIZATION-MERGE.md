# Mobile / Tablet Optimization — Merge Guide

This document is a self-contained guide to apply the mobile/tablet
optimization work to another branch (e.g. `main`). Every change is
listed file-by-file with the actual code, so it can be applied either
by `git cherry-pick`, by manual diff replay, or by handing this file
to another agent on the target branch.

## TL;DR

- **17 commits** on `claude/plan-mobile-tablet-optimization-FuEdX`
  spanning Round 1 (foundation + nav + per-page passes), Round 2
  (audit-driven fixes), Round 3 (polish + owned imagery + copy).
- **2 new files**: `src/components/CfNavMobile.tsx`,
  `src/components/cfNavSections.ts`.
- **2 new assets**: `public/assets/hero-construction.jpg`,
  `public/assets/dbl-end-stud.png`.
- **17 existing files modified**: `layout.tsx`, `page.tsx`,
  `CfNav.tsx`, `CfFooter.tsx`, `SpecToc.tsx`, `markdown.ts`, and 11 CSS files.

## Approach options

### Option A — cherry-pick the range (cleanest)

```sh
git checkout main
git cherry-pick 0026304^..c5878b2
```

Replays all 17 commits in order. Works if the target branch shares
the parent `55b2f41` (`Port /industries/[slug] from design_handoff_industries`).

### Option B — merge the branch

```sh
git checkout main
git merge --no-ff claude/plan-mobile-tablet-optimization-FuEdX
```

### Option C — squash to one commit

```sh
git checkout main
git merge --squash claude/plan-mobile-tablet-optimization-FuEdX
git commit -m "Mobile/tablet optimization across shipped routes"
```

### Option D — manual file-by-file (use this doc as the recipe)

Apply each file's changes from the sections below. Useful if the
target branch has diverged on `page.tsx` or `CfNav.tsx` and you want
to merge intent rather than diffs.

---

## Conventions

- **Breakpoints:** two canonical max-width queries aligned to Tailwind
  v4 defaults — `1024px` (tablet & below) and `640px` (phone).
- **Approach:** pragmatic max-width `@media` blocks appended to
  existing CSS files (desktop CSS is the base). New files start
  mobile-first.
- **Touch target token:** `--cf-touch-min: 44px`, applied as
  `min-height` on all interactive elements at touch viewports.
- **iOS zoom prevention:** form inputs ≥ 16px font-size at ≤1024px.

---

# File-by-file changes

## 1. `src/app/layout.tsx` — viewport export

Next 16 separates `viewport` from `metadata`. Without this export,
phones render at desktop width and zoom out.

```tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "California Fastener — Industrial fasteners & precision CNC machining",
    template: "%s · California Fastener",
  },
  description:
    "Bay Area industrial-fastener distributor and CNC machining shop since 1970. Heavy hex, A325, F1554 anchor bolts, A193 stud bolts, stainless and Lindapter Hollo-Bolt. 24-hour quotes, full traceability.",
  metadataBase: new URL("https://californiafastener.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

**The only change vs. desktop-only:** added `Viewport` import and
the `export const viewport` block. Everything else is unchanged.

---

## 2. `src/styles/cf-tokens.css` — append touch + breakpoint tokens

Add these three lines inside the existing `:root` block (right after
the motion tokens, before the closing `}`):

```css
  /* ── Touch + breakpoint conventions ─────────────────── */
  --cf-touch-min: 44px;
  --cf-bp-phone: 640px;
  --cf-bp-tablet: 1024px;
}
```

---

## 3. `src/styles/cf-shared.css` — body clip, drawer styles, responsive block

Three insertions:

### 3a. Add `overflow-x: clip` to `body`

Inside the existing `body { ... }` rule near the top of the file:

```css
body {
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-feature-settings: "ss01", "cv01";
  background: var(--bg);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  /* Clip (not hidden) preserves position: sticky on inner ancestors while
     containing any fixed/transformed descendant that drifts past the right
     edge — e.g. the closed-state nav drawer at translateX(100%). */
  overflow-x: clip;
}
```

### 3b. Append the entire mobile-nav + responsive block at the end of the file

Append this after the existing `.cf-rise--delay-3 { animation-delay: 0.3s; }`
rule:

```css
/* ─────────────────────────────────────────────────────────
   Mobile navigation — hamburger toggle + slide-in drawer.
   Hidden on desktop; revealed at the tablet breakpoint where
   the desktop center menu is also hidden.
   Drawer/accordion state is driven by CfNavMobile (client).
   ───────────────────────────────────────────────────────── */
.cf-nav-toggle {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--ink);
  padding: 0;
  margin-left: 8px;
  border-radius: 8px;
}
.cf-nav-toggle:hover { background: rgba(0,0,0,0.04); }
.cf-nav--dark .cf-nav-toggle { color: var(--dark-text); }
.cf-nav--dark .cf-nav-toggle:hover { background: rgba(255,255,255,0.06); }
.cf-nav-toggle-bars {
  position: relative;
  display: block;
  width: 22px;
  height: 16px;
}
.cf-nav-toggle-bars::before,
.cf-nav-toggle-bars::after,
.cf-nav-toggle-bars > span {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  border-radius: 1px;
  transition: transform 200ms var(--cf-ease), opacity 150ms var(--cf-ease), top 200ms var(--cf-ease);
}
.cf-nav-toggle-bars::before { top: 2px; }
.cf-nav-toggle-bars > span { top: 50%; transform: translateY(-50%); display: block; }
.cf-nav-toggle-bars::after { top: calc(100% - 2px); }
.cf-nav-toggle[aria-expanded="true"] .cf-nav-toggle-bars::before {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}
.cf-nav-toggle[aria-expanded="true"] .cf-nav-toggle-bars > span { opacity: 0; }
.cf-nav-toggle[aria-expanded="true"] .cf-nav-toggle-bars::after {
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
}

.cf-nav-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(11, 11, 13, 0.4);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 200ms var(--cf-ease), visibility 200ms var(--cf-ease);
  z-index: 200;
}
.cf-nav-drawer-backdrop[data-open="true"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.cf-nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: min(360px, 88vw);
  background: var(--bg);
  box-shadow: -20px 0 60px rgba(0,0,0,0.18);
  transform: translateX(100%);
  transition: transform 240ms var(--cf-ease);
  z-index: 201;
  display: flex;
  flex-direction: column;
  padding: max(env(safe-area-inset-top), 16px) 0 max(env(safe-area-inset-bottom), 16px);
  overflow: hidden;
}
.cf-nav-drawer[data-open="true"] { transform: translateX(0); }
.cf-nav--dark + .cf-nav-drawer-backdrop + .cf-nav-drawer,
.cf-nav-drawer.cf-nav-drawer--dark {
  background: var(--dark-1);
  color: var(--dark-text);
}

.cf-nav-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 18px 12px;
  border-bottom: 1px solid var(--rule-soft);
}
.cf-nav-drawer--dark .cf-nav-drawer-head { border-bottom-color: rgba(255,255,255,0.08); }
.cf-nav-drawer-close {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  cursor: pointer;
  border-radius: 8px;
  color: inherit;
  font-size: 22px;
  line-height: 1;
}
.cf-nav-drawer-close:hover { background: rgba(0,0,0,0.05); }
.cf-nav-drawer--dark .cf-nav-drawer-close:hover { background: rgba(255,255,255,0.06); }

.cf-nav-drawer-body {
  flex: 1 1 auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 8px 8px 16px;
}
.cf-nav-drawer-section { border-bottom: 1px solid var(--rule-soft); }
.cf-nav-drawer--dark .cf-nav-drawer-section { border-bottom-color: rgba(255,255,255,0.08); }
.cf-nav-drawer-section:last-child { border-bottom: 0; }
.cf-nav-drawer-row,
.cf-nav-drawer-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: var(--cf-touch-min);
  padding: 12px 14px;
  font-size: 16px;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  background: none;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: -0.01em;
  text-align: left;
}
.cf-nav-drawer-row:hover,
.cf-nav-drawer-summary:hover { background: rgba(0,0,0,0.04); border-radius: 8px; }
.cf-nav-drawer--dark .cf-nav-drawer-row:hover,
.cf-nav-drawer--dark .cf-nav-drawer-summary:hover { background: rgba(255,255,255,0.06); }

.cf-nav-drawer-summary::after {
  content: '';
  width: 8px;
  height: 8px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(-45deg);
  opacity: 0.5;
  transition: transform 180ms var(--cf-ease);
  margin-right: 4px;
}
.cf-nav-drawer-summary[aria-expanded="true"]::after { transform: rotate(45deg); }

.cf-nav-drawer-list {
  list-style: none;
  padding: 0 0 8px 14px;
  margin: 0;
}
.cf-nav-drawer-list a {
  display: block;
  padding: 10px 14px;
  min-height: var(--cf-touch-min);
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  border-radius: 8px;
  letter-spacing: -0.01em;
  line-height: 1.3;
}
.cf-nav-drawer--dark .cf-nav-drawer-list a { color: var(--dark-text); }
.cf-nav-drawer-list a:hover { background: rgba(0,0,0,0.04); }
.cf-nav-drawer--dark .cf-nav-drawer-list a:hover { background: rgba(255,255,255,0.06); }
.cf-nav-drawer-list a .cf-nav-drawer-sub {
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: var(--mid);
  margin-top: 2px;
  letter-spacing: -0.005em;
}
.cf-nav-drawer--dark .cf-nav-drawer-list a .cf-nav-drawer-sub { color: rgba(255,255,255,0.55); }

.cf-nav-drawer-foot {
  padding: 14px 18px max(env(safe-area-inset-bottom), 14px);
  border-top: 1px solid var(--rule-soft);
}
.cf-nav-drawer--dark .cf-nav-drawer-foot { border-top-color: rgba(255,255,255,0.08); }
.cf-nav-drawer-foot .cf-pill { width: 100%; }

/* When drawer is open, lock background scroll */
body.cf-no-scroll { overflow: hidden; }

/* ─────────────────────────────────────────────────────────
   Responsive — tablet (≤1024px) and phone (≤640px).
   Pragmatic max-width queries layered on the desktop base.
   ───────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .cf-container { padding: 0 24px; }
  .cf-container-narrow { padding: 0 24px; max-width: 100%; }
  .cf-nav { padding: 0 20px; height: 56px; }
  .cf-nav-center { display: none; }
  .cf-nav-right { gap: 12px; }
  .cf-nav-toggle { display: inline-flex; }
  /* Drop the wordmark on small viewports; keep the brand-mark and bump it. */
  .cf-nav-logo { font-size: 0; gap: 0; }
  .cf-nav-logo-mark { width: 32px; height: 32px; }
  .cf-footer { padding: 24px 24px; }
  .cf-footer-cols {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    padding: 20px 0 28px;
  }
  /* Brand cell spans the row so the four link columns fall into a 2×2. */
  .cf-footer-col:first-child { grid-column: 1 / -1; }
  .cf-subhead { font-size: 22px; }
}

@media (max-width: 640px) {
  .cf-container { padding: 0 18px; }
  .cf-container-narrow { padding: 0 18px; }
  .cf-nav { padding: 0 14px; }
  .cf-footer { padding: 20px 18px; }
  .cf-footer-cols {
    /* Stay 2×2 (inherited from the tablet block); just tighten gaps. */
    gap: 22px 18px;
  }
  .cf-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .cf-pill {
    padding: 14px 22px;
    min-height: var(--cf-touch-min);
  }
  .cf-subhead { font-size: 20px; }
  .cf-eyebrow { font-size: 18px; }
}

/* Coarse pointers (touch): kill hover-driven menus.
   The CfNav desktop dropdowns also gain click-to-open via the
   `.open` class, so this only neutralizes the hover trigger. */
@media (hover: none) {
  .cf-nav-center .has-menu:hover .cf-nav-menu {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}

/* Honor reduced-motion preference for the rise animation and drawer. */
@media (prefers-reduced-motion: reduce) {
  .cf-rise { animation: none; opacity: 1; }
  .cf-nav-drawer { transition: none; }
  .cf-nav-drawer-backdrop { transition: none; }
}
```

---

## 4. `src/components/cfNavSections.ts` — NEW FILE

Typed nav-section data shared between desktop and mobile renderers.

```ts
export type CfNavLink = {
  href: string;
  label: string;
  sub?: string;
};

export type CfNavSection = {
  id: "products" | "industries" | "resources";
  label: string;
  groups: { heading?: string; items: CfNavLink[] }[];
  footer?: CfNavLink[];
};

export const CF_NAV_SECTIONS: CfNavSection[] = [
  {
    id: "products",
    label: "Products",
    groups: [
      {
        heading: "Fasteners",
        items: [
          {
            href: "/anchor-bolts",
            label: "Anchor Bolts",
            sub: "F1554, A193, F593 · headed, bent, rod assemblies",
          },
          {
            href: "/stud-bolts-threaded-rod",
            label: "Stud Bolts & Threaded Rod",
            sub: "B7, B8, B16 · cut to length",
          },
          {
            href: "/structural-fasteners",
            label: "Structural Fasteners",
            sub: "A325, A490, TC bolts",
          },
          {
            href: "/industrial-fasteners",
            label: "Industrial Fasteners",
            sub: "Hex, socket, flange, grade 5 / 8",
          },
          {
            href: "/u-bolts",
            label: "U-Bolts",
            sub: "Standard & custom profiles",
          },
          {
            href: "/stainless-steel-fasteners",
            label: "Stainless Steel Fasteners",
            sub: "304, 316, duplex",
          },
          {
            href: "/silicon-bronze",
            label: "Silicon Bronze Hardware",
            sub: "Marine & architectural",
          },
          {
            href: "/hollo-bolt",
            label: "Specialty & Lindapter",
            sub: "Hollo-Bolt, Girder clamps, blind bolts",
          },
        ],
      },
    ],
    footer: [
      { href: "/products", label: "View all products →" },
      { href: "/quote", label: "Request a quote →" },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    groups: [
      {
        items: [
          { href: "/industries/construction", label: "Construction" },
          { href: "/industries/manufacturing", label: "Industrial Machinery" },
          { href: "/industries/infrastructure", label: "Infrastructure" },
          { href: "/industries/power-generation", label: "Renewable Energy" },
          { href: "/industries/power-transmission", label: "Power & Utilities" },
          { href: "/industries/oil-gas", label: "Oil, Gas & Petrochemical" },
          { href: "/industries/marine", label: "Marine & Shipbuilding" },
          { href: "/industries/aerospace", label: "Aerospace & Defense" },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      {
        heading: "Technical",
        items: [
          {
            href: "/spec-library",
            label: "Specification Library",
            sub: "ASTM, SAE, ISO standards",
          },
          {
            href: "/spec-builder",
            label: "Spec Builder",
            sub: "Find the right material & grade",
          },
          { href: "/catalog", label: "Product Catalog (PDF)" },
        ],
      },
      {
        heading: "Tools",
        items: [
          { href: "/quote", label: "Request a Quote" },
          { href: "/contact", label: "Contact Engineering" },
        ],
      },
    ],
  },
];

export const CF_NAV_FLAT_LINKS: CfNavLink[] = [
  { href: "/cnc-machining", label: "CNC Machining" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];
```

---

## 5. `src/components/CfNavMobile.tsx` — NEW FILE

Client component: hamburger toggle + portal-rendered drawer. Critical
detail: the drawer is rendered via `createPortal(..., document.body)`
because the parent `<nav>` has `backdrop-filter: blur(...)`, which
establishes a containing block for `position: fixed` descendants. A
non-portaled drawer would slide offscreen-right of the nav rather than
the viewport, causing horizontal overflow on mobile Safari.

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CF_NAV_FLAT_LINKS, CF_NAV_SECTIONS, type CfNavSection } from "./cfNavSections";

type Props = {
  variant?: "light" | "dark";
};

export function CfNavMobile({ variant = "light" }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<CfNavSection["id"] | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerId = useId();

  // Mount-gated portal — server-render the toggle only; drawer attaches to
  // <body> on hydrate so it escapes the nav's backdrop-filter containing block.
  useEffect(() => setMounted(true), []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  // Body scroll lock + escape-to-close.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("cf-no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("cf-no-scroll");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus the close button when drawer opens.
  useEffect(() => {
    if (!open) return;
    const close = drawerRef.current?.querySelector<HTMLElement>(
      ".cf-nav-drawer-close"
    );
    close?.focus();
  }, [open]);

  const drawerCls =
    "cf-nav-drawer" + (variant === "dark" ? " cf-nav-drawer--dark" : "");

  const drawer = (
    <>
      <div
        className="cf-nav-drawer-backdrop"
        data-open={open}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        id={drawerId}
        className={drawerCls}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="cf-nav-drawer-head">
          <span className="cf-footer-brand">
            <span className="cf-nav-logo-mark" />
            California Fastener
          </span>
          <button
            type="button"
            className="cf-nav-drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="cf-nav-drawer-body">
          {CF_NAV_SECTIONS.map((section) => {
            const isOpen = expanded === section.id;
            return (
              <div key={section.id} className="cf-nav-drawer-section">
                <button
                  type="button"
                  className="cf-nav-drawer-summary"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : section.id)}
                >
                  {section.label}
                </button>
                {isOpen && (
                  <div>
                    {section.groups.map((group, gi) => (
                      <ul
                        key={gi}
                        className="cf-nav-drawer-list"
                        aria-label={group.heading ?? section.label}
                      >
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href}>
                              {item.label}
                              {item.sub ? (
                                <span className="cf-nav-drawer-sub">
                                  {item.sub}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                    {section.footer && (
                      <ul className="cf-nav-drawer-list">
                        {section.footer.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href}>{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {CF_NAV_FLAT_LINKS.map((item) => (
            <div key={item.href} className="cf-nav-drawer-section">
              <Link href={item.href} className="cf-nav-drawer-row">
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="cf-nav-drawer-foot">
          <Link href="/quote" className="cf-pill cf-pill--blue">
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="cf-nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="cf-nav-toggle-bars" aria-hidden="true">
          <span />
        </span>
      </button>
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
```

---

## 6. `src/components/CfNav.tsx` — two small edits

### 6a. Import the mobile component at the top

```tsx
import Link from "next/link";
import { CfNavMobile } from "./CfNavMobile";
```

### 6b. Render `<CfNavMobile/>` inside `.cf-nav-right`

Find the existing `.cf-nav-right` div near the end and add the
mobile component:

```tsx
      <div className="cf-nav-right">
        <Link href="/quote" className="cf-nav-quote">
          Get a Quote
        </Link>
        <CfNavMobile variant={variant} />
      </div>
```

Everything else in `CfNav.tsx` is unchanged. The desktop center menu
remains server-rendered.

---

## 7. `src/components/spec-detail/SpecToc.tsx` — collapsible on mobile

Full replacement for the existing file:

```tsx
"use client";

import { useEffect, useState } from "react";

/**
 * Spec detail TOC with scroll-spy. Highlights the H2 currently in view.
 * Direct port of the TOC behaviour from design/spec.html: the heading
 * whose top has scrolled past 140px is the active one.
 *
 * On tablet and phone (≤1024px) the TOC collapses behind a tap-to-expand
 * summary. The collapsed state is governed by `data-collapsed` on the aside;
 * cf-spec-detail.css forces the list visible on desktop regardless.
 */
export function SpecToc({ items }: { items: Array<{ id: string; text: string }> }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const update = () => {
      let active: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < 140) active = it.id;
        else break;
      }
      setActiveId(active);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  if (items.length === 0) return null;

  const activeText = items.find((i) => i.id === activeId)?.text ?? items[0].text;

  return (
    <aside className="sp-toc" data-collapsed={collapsed}>
      <button
        type="button"
        className="sp-toc-summary"
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((v) => !v)}
      >
        <span className="sp-toc-title">On this page</span>
        <span className="sp-toc-active-label">{activeText}</span>
      </button>
      <ul className="sp-toc-list">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={activeId === it.id ? "is-active" : ""}
              onClick={() => setCollapsed(true)}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

---

## 8. `src/lib/specLibrary/markdown.ts` — wrap tables in scroll container

In the pipe-table handler (around line 121), wrap the emitted `<table>`
in a `<div class="sp-body-table-wrap">` so wide tables can horizontally
scroll on touch viewports instead of clipping.

**Find:**

```ts
let html = "<table><thead><tr>";
html += header.map((h) => `<th>${inline(h)}</th>`).join("");
html += "</tr></thead><tbody>";
for (const r of rows) {
  html += "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
}
html += "</tbody></table>";
```

**Replace with:**

```ts
let html = '<div class="sp-body-table-wrap"><table><thead><tr>';
html += header.map((h) => `<th>${inline(h)}</th>`).join("");
html += "</tr></thead><tbody>";
for (const r of rows) {
  html += "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
}
html += "</tbody></table></div>";
```

---

## 9. `src/styles/cf-spec-detail.css` — TOC mobile + table wrap

### 9a. Replace the existing `.sp-toc` block

Find the current `.sp-toc` rules and the `@media (max-width: 900px)`
that turns it `position: static` — replace the whole TOC section with:

```css
  /* TOC */
  .sp-toc {
    position: sticky;
    top: 80px;
    font-size: 13px;
  }
  /* Summary button only renders on mobile; hidden on desktop. */
  .sp-toc-summary {
    display: none;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg-alt);
    border: 1px solid var(--rule-soft);
    border-radius: 10px;
    color: inherit;
    font-family: inherit;
    cursor: pointer;
    min-height: var(--cf-touch-min);
    text-align: left;
  }
  .sp-toc-summary::after {
    content: '';
    width: 8px;
    height: 8px;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: rotate(-45deg);
    opacity: 0.5;
    transition: transform 180ms var(--cf-ease);
    flex-shrink: 0;
  }
  .sp-toc-summary[aria-expanded="true"]::after { transform: rotate(45deg); }
  .sp-toc-active-label {
    color: var(--ink);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.01em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1 1 auto;
  }
  @media (max-width: 1024px) {
    .sp-toc {
      position: sticky;
      top: 64px;
      margin-bottom: 24px;
      background: var(--bg);
      z-index: 5;
    }
    .sp-toc-summary { display: inline-flex; }
    .sp-toc[data-collapsed="true"] .sp-toc-list { display: none; }
    .sp-toc[data-collapsed="false"] .sp-toc-list {
      margin-top: 10px;
      padding: 8px 14px;
      background: var(--bg-alt);
      border-radius: 10px;
      max-height: 60vh;
      overflow-y: auto;
    }
    .sp-toc-title { display: none; }
  }
```

### 9b. Also bump `.sp-body-wrap` collapse to 1024px

Find:
```css
@media (max-width: 900px) { .sp-body-wrap { grid-template-columns: 1fr; gap: 24px; } }
```

Change to:
```css
@media (max-width: 1024px) { .sp-body-wrap { grid-template-columns: 1fr; gap: 24px; } }
```

### 9c. Replace the `.sp-body table` rule with a wrapper-based version

Find the existing:
```css
.sp-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0 28px;
  font-size: 14px;
  border: 1px solid var(--rule-soft);
  border-radius: 8px;
  overflow: hidden;
  background: var(--white);
}
```

Replace with:
```css
/* Tables — wrapped in .sp-body-table-wrap so wide tables scroll
   horizontally on touch viewports instead of clipping. */
.sp-body-table-wrap {
  margin: 20px 0 28px;
  border: 1px solid var(--rule-soft);
  border-radius: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: var(--white);
}
.sp-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  font-size: 14px;
  background: var(--white);
}
```

### 9d. Append a phone polish block at the end of the file

```css
/* ─── Mobile / tablet polish ─────────────────────────── */
@media (max-width: 640px) {
  .sp-wrap { padding: 0 18px; }
  .sp-hero { padding: 32px 0 36px; gap: 24px; }
  .sp-code { font-size: 36px; }
  .sp-name { font-size: 18px; }
  .sp-glance { padding: 20px; font-size: 16px; }
  .sp-body h2 { font-size: 26px; margin-top: 36px; }
  .sp-body h3 { font-size: 18px; }
  .sp-quote { padding: 56px 18px; }
  .sp-quote-head { font-size: 24px; }
  .sp-btn-primary { width: 100%; justify-content: center; }
}
```

---

## 10. `src/styles/cf-spec-library.css` — phone collapse for table layout

Append at the end of the file (before the existing TWEAKS PANEL comment):

```css
/* ─── Mobile / tablet polish ─────────────────────────── */
@media (max-width: 1024px) {
  .lib-hero-index { position: static; margin-top: 24px; }
  .lib-quote { padding: 64px 0; }
}
@media (max-width: 640px) {
  .lib-wrap { padding: 0 18px; }
  .lib-quote { padding: 56px 0; }
  .lib-quote-grid { gap: 32px; }
  .lib-quote-actions { width: 100%; }
  .lib-quote-cta { width: 100%; justify-content: center; }
  /* Table layout collapses to a stacked-card view (still distinct from
     the editorial layout via tighter padding + visible title only). */
  body.lib-layout--table .lib-sec-cards { display: block; }
  body.lib-layout--table .lib-card {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 14px 16px;
  }
  body.lib-layout--table .lib-card-title { font-size: 15px; }
  body.lib-layout--table .lib-card-grade { justify-self: start; }
}
```

---

## 11. `src/styles/cf-spec-builder.css` — replace the existing `@media (max-width: 720px)` block

Find the existing single 720px block at the bottom of the file and
replace it with these two blocks:

```css
/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .sb-hero { padding: 56px 24px 32px; }
  .sb-progress-wrap { padding: 10px 16px; }
  .sb-stages { padding: 36px 20px 60px; }
  /* Compact stepper: hide labels for non-active steps; rules shrink. */
  .sb-step .sb-step-label { display: none; }
  .sb-step.is-active .sb-step-label { display: inline; }
  .sb-step-rule { flex: 0 0 16px; }
  .sb-step { min-height: var(--cf-touch-min); }
  .sb-modal-head { padding: 18px 20px 6px; }
  .sb-modal-head h3 { font-size: 20px; }
  .sb-modal-context { margin: 4px 20px 0; }
  .sb-modal ul.form-section { padding: 12px 20px 20px !important; }
  .sb-modal-close {
    width: var(--cf-touch-min);
    height: var(--cf-touch-min);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  /* Inputs ≥16px font prevents iOS zoom-on-focus on touch viewports */
  .sb-modal input,
  .sb-modal textarea,
  .sb-modal select,
  .sb-modal .form-textbox,
  .sb-modal .form-textarea { font-size: 16px !important; }
}

@media (max-width: 640px) {
  .sb-hero { padding: 40px 18px 22px; }
  .sb-opts { grid-template-columns: 1fr; }
  .sb-opts-3 { grid-template-columns: 1fr; }
  .sb-progress-wrap { padding: 8px 12px; }
  .sb-stages { padding: 24px 16px 48px; }
  .sb-nav { flex-direction: column-reverse; align-items: stretch; gap: 10px; }
  .sb-nav .sb-btn { width: 100%; min-height: var(--cf-touch-min); }
  .sb-step-rule { flex: 0 0 10px; }
  .sb-step { padding: 8px 8px; }
  /* Full-screen quote modal sheet */
  .sb-modal-overlay.is-open { padding: 0; align-items: stretch; }
  .sb-modal {
    border-radius: 0;
    max-width: 100%;
    width: 100%;
    max-height: 100dvh;
    height: 100dvh;
  }
  .sb-modal-head { padding: 14px 16px 4px; }
  .sb-modal-head h3 { font-size: 18px; }
  .sb-modal-context { margin: 4px 16px 0; padding: 12px 14px; }
  .sb-modal ul.form-section { padding: 12px 16px 16px !important; }
}
```

---

## 12. `src/styles/cf-product-page.css` — image-leads hero + form inputs + phone padding

### 12a. Inside the existing `@media (max-width: 1000px)` block

Replace the `.pp-hero-image` line with these two lines:

```css
@media (max-width: 1000px) {
  .pp-hero-inner, .pp-intro-inner, .pp-grades-header, .pp-cross-header, .pp-quote-inner { grid-template-columns: 1fr; gap: 40px; }
  /* Lead with the image once the hero stacks. */
  .pp-hero-image { order: -1; margin-right: 0; border-radius: 24px; min-height: 480px; }
  .pp-hero-text { order: 0; }
  .pp-products-grid { grid-template-columns: 1fr; }
  .pp-trace-grid, .pp-trace-grid--five { grid-template-columns: 1fr 1fr; }
  .pp-cross-grid { grid-template-columns: 1fr; }
  .pp-form-row { grid-template-columns: 1fr; }
}
```

### 12b. Append two new responsive blocks at the end of the file

```css
/* Tablet: prevent iOS zoom-on-focus on form inputs (≥16px) and ensure
   touch-safe input sizing. */
@media (max-width: 1024px) {
  .pp-form-field input,
  .pp-form-field textarea {
    font-size: 16px;
    min-height: var(--cf-touch-min);
  }
}

/* Phone: tighten vertical padding, drop side padding into shared container scale,
   stack hero stats. */
@media (max-width: 640px) {
  .pp-hero { padding: 48px 18px 0; }
  .pp-hero-inner { gap: 28px; min-height: 0; }
  .pp-hero-text { padding: 24px 0; }
  .pp-hero-stats { grid-template-columns: 1fr 1fr; max-width: 100%; padding-top: 20px; }
  .pp-hero-image-tag { top: 12px; left: 12px; }
  .pp-props { padding: 48px 18px; }
  .pp-trust-item { padding: 0 18px; }
  .pp-intro { padding: 64px 18px; }
  .pp-products { padding: 64px 18px; }
  .pp-grades { padding: 64px 18px; }
  .pp-grades-header { gap: 24px; margin-bottom: 32px; }
  .pp-trace { padding: 64px 18px; }
  .pp-trace-grid, .pp-trace-grid--five { grid-template-columns: 1fr; gap: 12px; }
  .pp-trace-card { padding: 22px 20px 26px; min-height: 0; }
  .pp-cross { padding: 64px 18px; }
  .pp-cross-header { gap: 24px; margin-bottom: 28px; }
  .pp-quote { padding: 56px 18px; }
  .pp-quote-inner { gap: 32px; }
  .pp-quote-form { padding: 24px 22px 28px; border-radius: 18px; }
  .pp-form-field input,
  .pp-form-field textarea { padding: 12px 14px; }
  .pp-cta { padding: 64px 18px; }
  .pp-spec-card { padding: 22px 22px; }
  .pp-family { padding: 32px 0; gap: 18px; }
}
```

---

## 13. `src/styles/cf-anchor-bolts.css` — image-leads hero + phone padding

### 13a. Update the existing `@media (max-width: 1100px)` block

```css
@media (max-width: 1100px) {
  .ab-hero-inner, .ab-values-inner, .ab-grades-header, .ab-bend-inner, .ab-plates-inner, .ab-spec-lib-inner { grid-template-columns: 1fr; gap: 40px; }
  /* Lead with the image once the hero stacks. */
  .ab-hero-image { order: -1; margin-right: 0; border-radius: 24px; min-height: 480px; }
  .ab-hero-text { order: 0; }
  .ab-plates-text { padding: 64px 40px; }
  .ab-apps-grid { grid-template-columns: repeat(2, 1fr); }
  .ab-grades-cards { grid-template-columns: 1fr; }
}
```

### 13b. Append a phone block at the end

```css
@media (max-width: 640px) {
  .ab-hero,
  .ab-values,
  .ab-types,
  .ab-grades,
  .ab-bend,
  .ab-plates,
  .ab-apps,
  .ab-spec-lib,
  .ab-cta { padding-left: 18px; padding-right: 18px; }
  .ab-hero { padding-top: 48px; padding-bottom: 32px; }
  .ab-hero-image { min-height: 320px; border-radius: 18px; }
  .ab-plates-text { padding: 32px 18px; }
  .ab-cta-ctas { flex-direction: column; align-items: stretch; }
  .ab-cta-ctas .cf-pill { width: 100%; }
}
```

---

## 14. `src/styles/cf-homepage.css` — hero crop, 2×2 stats, specialty, mobile passes

### 14a. Inside the existing `.hero-v1-image img` rule

Add `object-position: left top` so the tower crane (top-left of the
hero photo) stays in frame:

```css
.hero-v1-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Crane sits in the top-left of hero-construction.jpg; bias the crop
     so it stays visible regardless of which axis the cover-fit trims. */
  object-position: left top;
  filter: none;
}
```

### 14b. Update the existing specialty `@media (max-width: 860px)` block

```css
@media (max-width: 860px) {
  .specialty-inner { grid-template-columns: 1fr; gap: 32px; }
  .specialty-text { padding-right: 0; order: 0; }
  /* Lead with the image once the specialty grid stacks. */
  .specialty-image { order: -1; min-height: 320px; }
}
```

### 14c. Append a tablet + phone block at the end of the file

```css
/* ─── Mobile / tablet pass ─────────────────────────────
   Targets actual homepage class names. Chrome (nav, footer,
   container) handled in cf-shared.css. */
@media (max-width: 1024px) {
  .hero-v1 { padding-top: 48px; }
  .hero-v1-copy { padding: 0 24px; }
  .hero-v1-image-specs { gap: 24px; left: 24px; bottom: 18px; }
  /* 2×2 stats grid: horizontal rule between rows, vertical rule between
     cols. Override the desktop :first-child / :last-child padding
     resets so all four cells align evenly. */
  .stats-band {
    grid-template-columns: 1fr 1fr;
    padding: 48px 24px;
    gap: 0;
  }
  .stat-cell {
    padding: 22px 20px;
    border-right: none;
    border-bottom: none;
  }
  .stat-cell:first-child,
  .stat-cell:last-child { padding-left: 20px; padding-right: 20px; }
  .stat-cell:nth-child(-n+2) { border-bottom: 1px solid var(--rule-soft); }
  .stat-cell:nth-child(odd) { border-right: 1px solid var(--rule-soft); }
  .feat,
  .specialty,
  .cnc-hero,
  .industries,
  .spec-feat,
  .quote-cta { padding-left: 24px; padding-right: 24px; }
  .split {
    grid-template-columns: 1fr;
    min-height: 0;
  }
  .split-text { padding: 64px 32px; }
  .split-image { min-height: 360px; }
  .specialty-inner { grid-template-columns: 1fr; gap: 32px; }
  .industry-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .cnc-hero-spec-grid { grid-template-columns: 1fr 1fr; }
  .cnc-spec-cell {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .cnc-spec-cell:nth-last-child(-n+2) { border-bottom: none; }
  .spec-feat-inner { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 640px) {
  .hero-v1 { padding-top: 36px; }
  .hero-v1-copy { padding: 0 18px; }
  .hero-v1-eyebrow { font-size: 13px; }
  .hero-v1-sub { font-size: 18px; }
  .hero-v1-ctas {
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
    width: 100%;
    padding: 0 8px;
  }
  /* Pill stays full-width; the cf-link below it sits centered at
     intrinsic width so it reads like the nav's "Get a Quote ›" CTA. */
  .hero-v1-ctas .cf-pill { width: 100%; }
  .hero-v1-image { aspect-ratio: 4 / 3; }
  /* Strengthen the bottom scrim so the callouts read against bright sky
     and reflective glass without the type having to do all the work. */
  .hero-v1-image::after {
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0.0) 30%,
      rgba(0,0,0,0.55) 100%
    );
  }
  .hero-v1-image-specs {
    flex-direction: column;
    gap: 2px;
    left: 14px;
    right: 14px;
    bottom: 12px;
    font-size: 10px;
    color: rgba(255,255,255,0.78);
    letter-spacing: 0;
  }
  .hero-v1-image-specs strong {
    font-size: 11.5px;
    margin-bottom: 0;
  }
  /* Stays a 2×2 grid on phone (inherited from the tablet block) — just
     tighten padding and shrink the numerals so each cell fits a 360px
     viewport comfortably. The :nth-child rules from the tablet block
     keep the rules between rows / cols. */
  .stats-band { padding: 32px 18px; }
  .stat-cell { padding: 18px 14px; }
  .stat-cell:first-child,
  .stat-cell:last-child { padding-left: 14px; padding-right: 14px; }
  .stat-num { font-size: 36px; }
  .stat-label { font-size: 12px; line-height: 1.35; }
  .feat,
  .specialty,
  .cnc-hero,
  .industries,
  .spec-feat,
  .quote-cta { padding-left: 18px; padding-right: 18px; }
  .feat { padding-top: 72px; padding-bottom: 72px; }
  .split-text { padding: 48px 18px; }
  .split-text h2 { font-size: 36px; }
  .split-image { min-height: 280px; }
  .specialty { padding-top: 64px; padding-bottom: 64px; }
  .specialty-image { min-height: 260px; }
  /* Don't override the 2px specialty-specs gap — it's what creates the
     dividing rules between the four cells via the rule-soft background. */
  .specialty-ctas {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .specialty-ctas .cf-pill { width: 100%; }
  /* Center the Shop … cf-links in the split sections + the structural
     feat CTAs, so they read as deliberate end-of-section CTAs and match
     the chevron CTA in the top nav. */
  .split-text > div:last-child { text-align: center; }
  .feat-ctas { justify-content: center; }
  .cnc-hero { padding-top: 80px; padding-bottom: 80px; }
  .cnc-hero-image { margin-top: 32px; aspect-ratio: 4 / 3; }
  .cnc-hero-spec-grid { grid-template-columns: 1fr; margin-top: 32px; }
  .cnc-spec-cell { padding: 16px 12px; }
  .industries { padding-top: 72px; padding-bottom: 72px; }
  .industry-grid { grid-template-columns: 1fr; gap: 14px; }
  .industry-tile { min-height: 220px; }
  .spec-feat { padding-top: 72px; padding-bottom: 72px; }
  .quote-cta { padding-top: 72px; padding-bottom: 72px; }
  .quote-cta p { font-size: 18px; }
  .quote-cta-ctas { flex-direction: column; gap: 12px; }
  .quote-cta-ctas .cf-pill { width: 100%; }
}
```

---

## 15. `src/app/page.tsx` — hero swap, callouts, stat copy, stud-bolts image, specialty edits

This file gets four discrete edits.

### 15a. Hero — swap `<Img>` for `<Image>` with the owned asset

Find the existing `<div className="hero-v1-image cf-rise cf-rise--delay-3">`
block and replace it with:

```tsx
        <div className="hero-v1-image cf-rise cf-rise--delay-3">
          <Image
            src="/assets/hero-construction.jpg"
            alt="Tower crane and curtain-wall construction at dusk"
            width={2000}
            height={1333}
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="hero-v1-image-specs">
            <div>
              <strong>In stock</strong>Heavy hex · A325 · B7
            </div>
            <div>
              <strong>Cut to length</strong>Studs · rod · anchors
            </div>
            <div>
              <strong>Full traceability</strong>MTRs · heat lots
            </div>
          </div>
        </div>
```

### 15b. Stats band — USA cell copy

Find:
```tsx
<div className="stat-label">In-house domestic manufacturing.</div>
```

Replace with:
```tsx
<div className="stat-label">Same-day domestic shipping.</div>
```

### 15c. Stud bolts split — swap `<Img>` for owned `<Image>`

Find the existing stud-bolts `<Img>` block and replace with:

```tsx
        <div className="split-image">
          <Image
            src="/assets/dbl-end-stud.png"
            alt="Double-end stud bolt render"
            width={678}
            height={443}
            quality={95}
            sizes="(max-width: 1000px) 90vw, 600px"
          />
        </div>
```

### 15d. Specialty (Hollo-Bolt) — swap Access/Sizes order + new size range

Replace the existing `.specialty-specs` block with:

```tsx
            <div className="specialty-specs">
              <div className="specialty-spec">
                <div className="specialty-spec-label">Sizes</div>
                <div className="specialty-spec-val">M8 – M20 · 5/16″ to 3/4″</div>
              </div>
              <div className="specialty-spec">
                <div className="specialty-spec-label">Finishes</div>
                <div className="specialty-spec-val">Zinc · HDG · 316SS</div>
              </div>
              <div className="specialty-spec">
                <div className="specialty-spec-label">Access</div>
                <div className="specialty-spec-val">One-side only</div>
              </div>
              <div className="specialty-spec">
                <div className="specialty-spec-label">Approvals</div>
                <div className="specialty-spec-val">ICC-ES · CE · LABC</div>
              </div>
            </div>
```

### 15e. Make sure `Image` is imported at the top

```tsx
import Image from "next/image";
```

(Likely already present — `Image` is used elsewhere on the page.)

---

## 16. `src/components/CfFooter.tsx` — location string

Find:
```tsx
<div>Designed in Vacaville, California</div>
```

Replace with:
```tsx
<div>Built in Benicia, California</div>
```

---

## 17. New assets in `public/assets/`

Two binary files to add. Both are owned imagery, replacing Unsplash
placeholders:

- `public/assets/hero-construction.jpg` — 2000×1333 JPEG, ~700 KB. Tower
  crane + curtain-wall construction at dusk. Used as the homepage hero.
- `public/assets/dbl-end-stud.png` — 678×443 PNG, ~270 KB. Double-end
  stud bolt render. Used in the homepage stud-bolts split section.

Both files live in the `claude/plan-mobile-tablet-optimization-FuEdX`
branch under those paths. Cherry-picking commit `05d0121` brings them
across; manual copy works too.

A duplicate `DBL END STUD.png` (uppercase, spaces) also exists from the
upload — harmless, but the code references the lowercase hyphenated
name. Either delete the duplicate or leave it.

---

# Verification

```sh
npm install
npm run typecheck       # must pass — has been clean throughout
npm run dev             # open localhost:3000
```

Walk every shipped route at **375 / 390 / 414 / 768 / 1024 / 1280**
(iPhone SE, iPhone 14, Plus, iPad portrait, iPad landscape, desktop
reference). For each width:

- No horizontal scroll on any page (the `overflow-x: clip` on `body` is
  defense-in-depth, but the root cause should not exist).
- Hamburger opens drawer; section accordions work; drawer closes on
  Escape, on backdrop click, on route change.
- All tap targets ≥ 44×44 (Lighthouse "Tap targets" audit).
- Tap a form input → no iOS zoom (font-size ≥ 16px). Verify on a real
  iOS Safari pass.
- Spec-builder modal full-screen on phone, internal scroll, virtual
  keyboard doesn't push the close button off-screen.
- TOC collapsed on phone, sticky under nav (top: 64px), expands on tap.
- Hero image shows the tower crane on every viewport (the
  `object-position: left top` keeps it anchored).
- Stats band is 2×2 on phone/tablet with even alignment (no "USA"
  indent regression).
- Footer is brand-row spanning + 2×2 link columns on phone/tablet.
- Spec-detail tables swipe-scroll horizontally on phone if they're
  wider than the viewport.

Real-device pass: one iOS Safari (16+) and one Android Chrome on
`/`, `/spec-builder`, `/spec-library`. Confirm safe-area handling on
a notched phone.

---

# Out-of-scope follow-ups (not in this work, logged for later)

These belong to pending routes that weren't part of the "shipped routes
only" scope:

- **`.qf-field input/select/textarea` at 15px** in `cf-quote.css:58` —
  same iOS-zoom-on-focus risk. Fix when `/quote` ships.
- **`.hbs-filters { position: sticky; top: 80px }`** in
  `cf-hollo-bolt-selector.css:42` — becomes `static` at 900px, but
  mobile nav is 56px tall, so the offset is wrong between 900–1024.
- **HolloBoltSelector** has a multi-input filter UI and toast/cart
  patterns that need a touch audit when the route ships.
- **Anchor-bolts rotated hero image** (`transform: rotate(-6deg)`) —
  cosmetic; visual framing on small phones is awkward. Revisit once
  owned imagery lands.
- **Spec-builder progress bar scroll-into-view** — when the active
  step is offscreen in the horizontal scroller, the user must swipe to
  find it. JS `scrollIntoView({ block: 'nearest', inline: 'center' })`
  on step change.
- **`<Image sizes>` prop completeness** across other product pages —
  perf, not correctness.
