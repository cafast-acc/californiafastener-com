import Link from "next/link";

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
          <div className="cf-nav-menu cf-nav-menu--mega" role="menu">
            <div className="cf-nav-menu-label">Fasteners</div>
            <Link href="/anchor-bolts" role="menuitem">
              Anchor Bolts
              <span className="cf-nav-menu-sub">F1554, A193, F593 · headed, bent, rod assemblies</span>
            </Link>
            <Link href="/stud-bolts-threaded-rod" role="menuitem">
              Stud Bolts &amp; Threaded Rod
              <span className="cf-nav-menu-sub">B7, B8, B16 · cut to length</span>
            </Link>
            <Link href="/structural-fasteners" role="menuitem">
              Structural Fasteners
              <span className="cf-nav-menu-sub">A325, A490, TC bolts</span>
            </Link>
            <Link href="/industrial-fasteners" role="menuitem">
              Industrial Fasteners
              <span className="cf-nav-menu-sub">Hex, socket, flange, grade 5 / 8</span>
            </Link>
            <Link href="/u-bolts" role="menuitem">
              U-Bolts
              <span className="cf-nav-menu-sub">Standard &amp; custom profiles</span>
            </Link>
            <Link href="/stainless-steel-fasteners" role="menuitem">
              Stainless Steel Fasteners
              <span className="cf-nav-menu-sub">304, 316, duplex</span>
            </Link>
            <Link href="/silicon-bronze" role="menuitem">
              Silicon Bronze Hardware
              <span className="cf-nav-menu-sub">Marine &amp; architectural</span>
            </Link>
            <Link href="/hollo-bolt" role="menuitem">
              Specialty &amp; Lindapter
              <span className="cf-nav-menu-sub">Hollo-Bolt, Girder clamps, blind bolts</span>
            </Link>
            <div className="cf-nav-menu-footer">
              <Link href="/products">View all products →</Link>
              <Link href="/quote">Request a quote →</Link>
            </div>
          </div>
        </li>
        <li className={`has-menu${activeCls("industries")}`}>
          <button aria-haspopup="true">Industries</button>
          <div className="cf-nav-menu" role="menu">
            <Link href="/industries/construction" role="menuitem">Construction</Link>
            <Link href="/industries/manufacturing" role="menuitem">Industrial Machinery</Link>
            <Link href="/industries/infrastructure" role="menuitem">Infrastructure</Link>
            <Link href="/industries/power-generation" role="menuitem">Renewable Energy</Link>
            <Link href="/industries/power-transmission" role="menuitem">Power &amp; Utilities</Link>
            <Link href="/industries/oil-gas" role="menuitem">Oil, Gas &amp; Petrochemical</Link>
            <Link href="/industries/marine" role="menuitem">Marine &amp; Shipbuilding</Link>
            <Link href="/industries/aerospace" role="menuitem">Aerospace &amp; Defense</Link>
          </div>
        </li>
        <li className={activeCls("cnc-machining").trim()}>
          <Link href="/cnc-machining">CNC Machining</Link>
        </li>
        <li className={`has-menu${activeCls("resources")}`}>
          <button aria-haspopup="true">Resources</button>
          <div className="cf-nav-menu" role="menu">
            <div className="cf-nav-menu-label">Technical</div>
            <Link href="/spec-library" role="menuitem">
              Specification Library
              <span className="cf-nav-menu-sub">ASTM, SAE, ISO standards</span>
            </Link>
            <Link href="/spec-builder" role="menuitem">
              Spec Builder
              <span className="cf-nav-menu-sub">Find the right material &amp; grade</span>
            </Link>
            <Link href="/catalog" role="menuitem">Product Catalog (PDF)</Link>
            <div className="cf-nav-menu-divider" />
            <div className="cf-nav-menu-label">Tools</div>
            <Link href="/quote" role="menuitem">Request a Quote</Link>
            <Link href="/contact" role="menuitem">Contact Engineering</Link>
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
      </div>
    </nav>
  );
}
