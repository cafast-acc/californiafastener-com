import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-products.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Anchor bolts, structural fasteners, industrial bolting, stud bolts and threaded rod, U-bolts, stainless and silicon bronze hardware, and Lindapter specialty fasteners — stocked, certified, and built to print.",
};

type Category = {
  href: string;
  name: string;
  sub: string;
  tags: string[];
  available: boolean;
};

const CATEGORIES: Category[] = [
  {
    href: "/anchor-bolts",
    name: "Anchor Bolts",
    sub: "F1554 Gr 36/55/105, A193 B7/B8M, F593 — headed, bent, rod assemblies, post-install. Built with nuts, washers, and template plates.",
    tags: ["F1554", "A193 B7", "B8M", "Custom bends"],
    available: true,
  },
  {
    href: "/stud-bolts-threaded-rod",
    name: "Stud Bolts & Threaded Rod",
    sub: "Double-end studs for flanged connections and threaded rod in every grade, length, and finish — cut and chamfered in-house.",
    tags: ["B7 / B16", "B8 / B8M", "A307", "Cut to length"],
    available: true,
  },
  {
    href: "/structural-fasteners",
    name: "Structural Fasteners",
    sub: "A325, A490, and tension-control bolts for steel-to-steel connections, beam-column joints, and critical structural applications.",
    tags: ["A325", "A490", "TC bolts"],
    available: true,
  },
  {
    href: "/industrial-fasteners",
    name: "Industrial Fasteners",
    sub: "Heavy hex bolts, socket head cap screws, flange bolts, and ASTM A193 bolting for pressure, piping, and heavy equipment.",
    tags: ["Hex", "Socket", "Flange", "Grade 5 / 8"],
    available: true,
  },
  {
    href: "/u-bolts",
    name: "U-Bolts",
    sub: "Standard and custom U-bolt profiles — square, round, and semi-round bends in carbon and stainless across every common pipe size.",
    tags: ["Standard", "Custom profiles"],
    available: false,
  },
  {
    href: "/stainless-steel-fasteners",
    name: "Stainless Steel Fasteners",
    sub: "304, 316, and duplex stainless for marine, chemical, and corrosive-service applications — anchors, studs, and structural hardware.",
    tags: ["304", "316", "Duplex"],
    available: false,
  },
  {
    href: "/silicon-bronze",
    name: "Silicon Bronze Hardware",
    sub: "Marine and architectural silicon bronze fasteners — bolts, nuts, washers, and lag screws for saltwater and exposed-finish work.",
    tags: ["Marine", "Architectural"],
    available: false,
  },
  {
    href: "/hollo-bolt",
    name: "Specialty & Lindapter",
    sub: "Lindapter Hollo-Bolt expansion fasteners, girder clamps, and blind bolts for hollow structural sections and one-side access.",
    tags: ["Hollo-Bolt", "Girder clamps", "Blind bolts"],
    available: false,
  },
];

export default function ProductsPage() {
  const available = CATEGORIES.filter((c) => c.available);
  return (
    <>
      <CfNav />

      <section className="pi-hero">
        <div className="pi-hero-inner">
          <div className="pi-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Products
          </div>
          <div className="pi-eyebrow">Product Catalog</div>
          <h1>
            Every fastener,
            <br />
            <i>every grade.</i>
          </h1>
          <p className="pi-hero-sub">
            Industrial and structural fasteners — stocked, certified, and ready to ship. Browse by
            category, or send us your print and we&apos;ll quote it.
          </p>
        </div>
      </section>

      <section className="pi-grid">
        <div className="pi-grid-head">
          <h2>Fastener categories</h2>
          <div className="pi-grid-head-meta">
            {available.length} categories live · {CATEGORIES.length - available.length} coming soon
          </div>
        </div>
        <div className="pi-cards">
          {CATEGORIES.map((cat, i) => {
            const num = String(i + 1).padStart(2, "0");
            const className = `pi-card${cat.available ? "" : " pi-card--soon"}`;
            const inner = (
              <>
                <div className="pi-card-num">{num}</div>
                <div className="pi-card-title">{cat.name}</div>
                <div className="pi-card-sub">{cat.sub}</div>
                <div className="pi-card-tags">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="pi-card-tag">{tag}</span>
                  ))}
                </div>
                <span className="pi-card-cta">
                  {cat.available ? "Browse category" : "Coming soon"}
                </span>
              </>
            );
            return cat.available ? (
              <Link key={cat.href} href={cat.href} className={className}>
                {inner}
              </Link>
            ) : (
              <div key={cat.href} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section className="pi-quote">
        <div className="pi-quote-inner">
          <div>
            <h2>Don&apos;t see what you need?</h2>
            <p>
              Send us a print, PDF, or BOM. Every quote gets personal attention from our team — we
              respond within 24 hours with availability and pricing.
            </p>
          </div>
          <div className="pi-quote-actions">
            <Link href="/quote" className="cf-pill cf-pill--blue">
              Request a Quote
            </Link>
            <a href="mailto:info@californiafastener.com" className="pi-quote-email">
              info@californiafastener.com
            </a>
          </div>
        </div>
      </section>

      <CfFooter />
    </>
  );
}
