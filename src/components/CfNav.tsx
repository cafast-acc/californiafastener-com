"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CfNavMobile } from "./CfNavMobile";

type NavVariant = "light" | "dark";
export type NavSection =
  | "products"
  | "industries"
  | "cnc-machining"
  | "resources"
  | "about"
  | "blog";

export function CfNav({
  variant = "light",
  active,
}: {
  variant?: NavVariant;
  active?: NavSection;
}) {
  const navClass = variant === "dark" ? "cf-nav cf-nav--dark" : "cf-nav";
  const activeCls = (s: NavSection) => (active === s ? " is-active" : "");

  // Which mega-menu is open via click/tap. Mouse users still get hover-open
  // from CSS (:hover); this state drives the `.open` class so touch and
  // keyboard users — where :hover never fires — can open the menus too, and
  // exposes an honest aria-expanded on the trigger buttons.
  const [openMenu, setOpenMenu] = useState<NavSection | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  // Close on outside click or Escape while a menu is open.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const toggle = (s: NavSection) =>
    setOpenMenu((cur) => (cur === s ? null : s));
  const menuCls = (s: NavSection) =>
    `has-menu${activeCls(s)}${openMenu === s ? " open" : ""}`;

  return (
    <nav className={navClass} ref={navRef}>
      <Link href="/" className="cf-nav-logo">
        <span className="cf-nav-logo-mark" />
        California Fastener
      </Link>
      <ul className="cf-nav-center">
        <li className={menuCls("products")}>
          <button
            aria-haspopup="true"
            aria-expanded={openMenu === "products"}
            onClick={() => toggle("products")}
          >
            Products
          </button>
          <div className="cf-nav-menu cf-nav-menu--mega">
            <div className="cf-nav-menu-label">Fasteners</div>
            <Link href="/anchor-bolts">
              Anchor Bolts
              <span className="cf-nav-menu-sub">F1554, A193, A36...</span>
            </Link>
            <Link href="/stud-bolts-threaded-rod">
              Stud Bolts &amp; Threaded Rod
              <span className="cf-nav-menu-sub">A193 B7, B8, B16, A320 L7...</span>
            </Link>
            <Link href="/structural-fasteners">
              Structural Fasteners
              <span className="cf-nav-menu-sub">F3125 A325, A490, TC bolts...</span>
            </Link>
            <Link href="/industrial-fasteners">
              Industrial Fasteners
              <span className="cf-nav-menu-sub">A193 B7, A574, A194, F436...</span>
            </Link>
            <Link href="/u-bolts">
              U-Bolts
              <span className="cf-nav-menu-sub">A36, A193, 304, 316...</span>
            </Link>
            <Link href="/stainless-steel-fasteners">
              Stainless Steel Fasteners
              <span className="cf-nav-menu-sub">304, 316, duplex, 17-4 PH...</span>
            </Link>
            <Link href="/silicon-bronze">
              Silicon Bronze Hardware
              <span className="cf-nav-menu-sub">C651 bolts, nuts, washers...</span>
            </Link>
            <Link href="/hollo-bolt">
              Specialty &amp; Lindapter
              <span className="cf-nav-menu-sub">Hollo-Bolt, girder clamps...</span>
            </Link>
            <div className="cf-nav-menu-footer">
              <Link href="/products">View all products →</Link>
              <Link href="/quote">Request a quote →</Link>
            </div>
          </div>
        </li>
        <li className={menuCls("industries")}>
          <button
            aria-haspopup="true"
            aria-expanded={openMenu === "industries"}
            onClick={() => toggle("industries")}
          >
            Industries
          </button>
          <div className="cf-nav-menu">
            <Link href="/industries/construction">Construction</Link>
            <Link href="/industries/manufacturing">Manufacturing</Link>
            <Link href="/industries/infrastructure">Infrastructure</Link>
            <Link href="/industries/power-generation">Power Generation</Link>
            <Link href="/industries/power-transmission">Power Transmission</Link>
            <Link href="/industries/oil-gas">Oil, Gas &amp; Chemical</Link>
            <Link href="/industries/marine">Marine &amp; Shipbuilding</Link>
            <Link href="/industries/aerospace">Aerospace &amp; Defense</Link>
            <div className="cf-nav-menu-footer">
              <Link href="/industries">View all industries →</Link>
            </div>
          </div>
        </li>
        <li className={activeCls("cnc-machining").trim()}>
          <Link href="/cnc-machining">CNC Machining</Link>
        </li>
        <li className={menuCls("resources")}>
          <button
            aria-haspopup="true"
            aria-expanded={openMenu === "resources"}
            onClick={() => toggle("resources")}
          >
            Resources
          </button>
          <div className="cf-nav-menu">
            <div className="cf-nav-menu-label">Technical</div>
            <Link href="/spec-library">
              Specification Library
              <span className="cf-nav-menu-sub">ASTM, SAE, ISO standards</span>
            </Link>
            <Link href="/spec-builder">
              Spec Builder
              <span className="cf-nav-menu-sub">Find the right material &amp; grade</span>
            </Link>
            <Link href="/bolt-weight-calculator">
              Bolt Weight Calculator
              <span className="cf-nav-menu-sub">Estimate weight for shipping &amp; quoting</span>
            </Link>
            <Link href="/catalog">Product Catalog (PDF)</Link>
            <Link href="/quote">Request a Quote</Link>
          </div>
        </li>
        <li className={activeCls("about").trim()}>
          <Link href="/about">About</Link>
        </li>
        <li className={activeCls("blog").trim()}>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
      <div className="cf-nav-right">
        <Link href="/quote" className="cf-nav-quote">
          Get a Quote
        </Link>
        <CfNavMobile variant={variant} />
      </div>
    </nav>
  );
}
