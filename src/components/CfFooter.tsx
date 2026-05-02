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
          <div>707.741.3277 · info@californiafastener.com</div>
        </div>
        <div className="cf-footer-col">
          <h4>Products</h4>
          <Link href="/anchor-bolts">Anchor Bolts</Link>
          <Link href="/structural-fasteners">Structural</Link>
          <Link href="/stud-bolts-threaded-rod">Stud Bolts &amp; Rod</Link>
          <Link href="/stainless-steel-fasteners">Stainless Steel</Link>
          <Link href="/u-bolts">U-Bolts</Link>
          <Link href="/silicon-bronze">Silicon Bronze</Link>
        </div>
        <div className="cf-footer-col">
          <h4>Industries</h4>
          <Link href="/industries/construction">Construction</Link>
          <Link href="/industries/power-generation">Power Generation</Link>
          <Link href="/industries/infrastructure">Infrastructure</Link>
          <Link href="/industries/manufacturing">Manufacturing</Link>
          <Link href="/industries/oil-gas">Oil, Gas &amp; Chemical</Link>
        </div>
        <div className="cf-footer-col">
          <h4>Resources</h4>
          <Link href="/spec-builder">Spec Builder</Link>
          <Link href="/spec-library">Spec Library</Link>
          <Link href="/catalog">Product Catalog</Link>
          <Link href="/blog">Field Notes (Blog)</Link>
        </div>
        <div className="cf-footer-col">
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/cnc-machining">CNC Machining</Link>
          <Link href="/quote">Request a Quote</Link>
          <Link href="/careers">Careers</Link>
        </div>
      </div>
      <div className="cf-footer-bottom">
        <div>© {new Date().getFullYear()} California Fastener · CA Fast LLC</div>
        <div>Designed in Vacaville, California</div>
      </div>
    </footer>
  );
}
