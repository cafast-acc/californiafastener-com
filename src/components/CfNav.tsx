import Link from "next/link";
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
  return (
    <nav className={navClass}>
      <Link href="/" className="cf-nav-logo">
        <span className="cf-nav-logo-mark" />
        California Fastener
      </Link>
      <ul className="cf-nav-center">
        <li className={`has-menu${activeCls("products")}`}>
          <button aria-haspopup="true">Products</button>
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
        <li className={`has-menu${activeCls("industries")}`}>
          <button aria-haspopup="true">Industries</button>
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
        <li className={`has-menu${activeCls("resources")}`}>
          <button aria-haspopup="true">Resources</button>
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
