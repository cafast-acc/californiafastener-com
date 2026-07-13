import Link from "next/link";

export function CfFooter() {
  return (
    <footer className="cf-footer">
      <div className="cf-footer-cols">
        <div className="cf-footer-col">
          <div className="cf-footer-brand">
            <span className="cf-nav-logo-mark" />
            California Fastener
          </div>
          <div className="cf-footer-tagline">
            Precision industrial fasteners and CNC machined components for critical applications.
          </div>
          <div className="cf-footer-contact">
            <a href="tel:+18885817077">707.741.3277</a> ·{" "}
            <a href="mailto:info@californiafastener.com">info@californiafastener.com</a>
          </div>
        </div>
        <div className="cf-footer-col">
          <h2>Products</h2>
          <Link href="/anchor-bolts">Anchor Bolts</Link>
          <Link href="/stud-bolts-threaded-rod">Stud Bolts &amp; Threaded Rod</Link>
          <Link href="/structural-fasteners">Structural Fasteners</Link>
          <Link href="/industrial-fasteners">Industrial Fasteners</Link>
          <Link href="/u-bolts">U-Bolts</Link>
          <Link href="/stainless-steel-fasteners">Stainless Steel Fasteners</Link>
          <Link href="/silicon-bronze">Silicon Bronze Hardware</Link>
          <Link href="/hollo-bolt">Specialty &amp; Lindapter</Link>
        </div>
        <div className="cf-footer-col">
          <h2>Industries</h2>
          <Link href="/industries/construction">Construction</Link>
          <Link href="/industries/manufacturing">Manufacturing</Link>
          <Link href="/industries/infrastructure">Infrastructure</Link>
          <Link href="/industries/power-generation">Power Generation</Link>
          <Link href="/industries/power-transmission">Power Transmission</Link>
          <Link href="/industries/oil-gas">Oil, Gas &amp; Chemical</Link>
          <Link href="/industries/marine">Marine &amp; Shipbuilding</Link>
          <Link href="/industries/aerospace">Aerospace &amp; Defense</Link>
        </div>
        <div className="cf-footer-col">
          <h2>Resources</h2>
          <Link href="/spec-builder">Spec Builder</Link>
          <Link href="/spec-library">Spec Library</Link>
          <Link href="/bolt-weight-calculator">Bolt Weight Calculator</Link>
          <Link href="/catalog">Product Catalog</Link>
          <Link href="/blog">Field Notes (Blog)</Link>
        </div>
        <div className="cf-footer-col">
          <h2>Company</h2>
          <Link href="/about">About</Link>
          <Link href="/cnc-machining">CNC Machining</Link>
          <Link href="/quote">Request a Quote</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
      <div className="cf-footer-bottom">
        <div>© {new Date().getFullYear()} California Fastener · CA Fast LLC</div>
        <div>Built in Benicia, California</div>
      </div>
    </footer>
  );
}
