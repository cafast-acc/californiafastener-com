import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-products.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { Img } from "@/components/Img";

export const metadata: Metadata = {
  title: "Products — Industrial Fasteners & CNC Machining",
  description:
    "Browse every fastener family California Fastener stocks and makes — anchor bolts, structural, stud bolts, stainless, silicon bronze, Lindapter Hollo-Bolt, U-bolts, and in-house CNC machining. Nine families, 24-hour quotes.",
};

type Variant = "default" | "wide" | "tall" | "light";

type Family = {
  /** Two-digit running order, e.g. "01". */
  order: string;
  /** Mono eyebrow label shown above the title. */
  eyebrow: string;
  title: string;
  description: string;
  grades: string[];
  href: string;
  /** CTA label; defaults to "Explore". */
  cta?: string;
  /** Render-catalog placeholder code shown until a real image exists. */
  placeholder?: string;
  /** Real product render once available (object-fit: cover). */
  image?: string;
  imageAlt?: string;
  variant?: Variant;
};

/* The nine fastener families + in-house CNC machining, in DOM order.
   Drives the editorial grid below; swap in `image`/`imageAlt` to replace a
   placeholder. Hrefs point at existing routes; families without a page yet
   stay on "#" until their page ships. */
const FAMILIES: Family[] = [
  {
    order: "01",
    eyebrow: "01 — Anchor Bolts",
    title: "F1554 anchor bolts & rod assemblies",
    description:
      "Headed, bent, and rod assemblies with nuts, washers, and template plates. Large-diameter and non-standard lengths in stock.",
    grades: ["F1554 Gr 36", "Gr 55", "Gr 105", "A193 B7", "B8M"],
    href: "/anchor-bolts",
    cta: "Explore anchor bolts",
    image: "/assets/anchor-headed.webp",
    imageAlt: "F1554 headed anchor bolt with hex nut and washer",
    placeholder: "A1 · Anchor bolt hero render",
    variant: "wide",
  },
  {
    order: "02",
    eyebrow: "02 — Structural",
    title: "Structural bolts",
    description: "Steel-to-steel connections and beam-column joints.",
    grades: ["A325", "A490", "TC bolts"],
    href: "/structural-fasteners",
    image: "/assets/product-structural.png",
    imageAlt: "Structural heavy hex bolt",
    placeholder: "A1 · Structural bolt",
  },
  {
    order: "03",
    eyebrow: "03 — Industrial",
    title: "Industrial fasteners",
    description: "Heavy hex, socket head, flange & A193 bolting.",
    grades: ["Gr 5 / 8", "A193 B7", "SHCS"],
    href: "/industrial-fasteners",
    image: "/assets/products/industrial-socket-cap-1.png",
    imageAlt: "Socket head cap screw",
    placeholder: "A1 · Heavy hex",
  },
  {
    order: "04",
    eyebrow: "04 — Stud Bolts & Threaded Rod",
    title: "Stud bolts & threaded rod",
    description:
      "Double-end studs for flanged connections and threaded rod in every grade, length, and finish — cut and chamfered in-house.",
    grades: ["B7", "B16", "B8 / B8M", "A307"],
    href: "/stud-bolts-threaded-rod",
    cta: "Explore stud bolts & rod",
    image: "/assets/dbl-end-stud.png",
    imageAlt: "Double-end stud bolt with heavy hex nuts",
    placeholder: "A1 · Stud bolts & threaded rod",
    variant: "tall",
  },
  {
    order: "05",
    eyebrow: "05 — Stainless Steel",
    title: "Stainless steel fasteners",
    description:
      "Corrosion-resistant bolting for marine, coastal, and chemical service — austenitic and duplex grades from stock.",
    grades: ["304", "316", "Duplex 2205"],
    href: "/stainless-steel-fasteners",
    cta: "Explore stainless",
    image: "/assets/products/ss-hex-cap-1.png",
    imageAlt: "316 stainless hex cap bolt",
    placeholder: "A1 · 316 stainless hero",
    variant: "tall",
  },
  {
    order: "06",
    eyebrow: "06 — U-Bolts",
    title: "U-bolts",
    description: "Standard & custom profiles, bent to your radius.",
    grades: ["Round", "Square", "Custom"],
    href: "/u-bolts",
    placeholder: "A1 · U-bolt",
  },
  {
    order: "07",
    eyebrow: "07 — Silicon Bronze",
    title: "Silicon bronze",
    description: "Marine & architectural hardware, C651.",
    grades: ["C651", "Marine"],
    href: "/silicon-bronze",
    image: "/assets/products/bronze-hex-bolt-1.png",
    imageAlt: "Silicon bronze hex head bolt",
    placeholder: "A1 · Silicon bronze",
  },
  {
    order: "08",
    eyebrow: "08 — Specialty · Lindapter",
    title: "Hollo-Bolt & clamps",
    description: "Blind bolts, girder clamps — authorized distributor.",
    grades: ["Hollo-Bolt", "Girder clamp"],
    href: "/hollo-bolt",
    image: "/assets/products/hollo-bolt-trio.png",
    imageAlt: "Lindapter Hollo-Bolt hex, countersunk, and flush-fit expansion bolts",
    placeholder: "A2 · Hollo-Bolt",
  },
  {
    order: "09",
    eyebrow: "09 — Nuts & Washers",
    title: "Nuts & washers",
    description:
      "Heavy hex nuts, F436 hardened washers, and DTIs — the nuts and washers that complete every assembly.",
    grades: ["2H", "8M", "F436", "DTI F959"],
    href: "#",
    cta: "Explore nuts & washers",
    variant: "light",
  },
  {
    order: "10",
    eyebrow: "10 — CNC Machining",
    title: "Custom CNC machined parts",
    description:
      "Five-axis milling, live-tooling lathes, full CMM inspection. From one prototype to thousands of parts — built to your print.",
    grades: ["±0.0005″", "Ti · Inconel · PEEK", "CMM"],
    href: "/cnc-machining",
    cta: "Explore CNC machining",
    image: "/assets/custom-stud.png",
    imageAlt: "Custom CNC machined stud with reduced shank",
    placeholder: "F1 · CNC live-tooling lathe",
    variant: "wide",
  },
];

const MATERIALS: { label: string; sub: string; href: string }[] = [
  { label: "Carbon & alloy steel", sub: "A307, Gr 5/8, B7, B16", href: "#" },
  {
    label: "Stainless steel",
    sub: "304, 316, duplex 2205",
    href: "/stainless-steel-fasteners",
  },
  { label: "Silicon bronze", sub: "C651 · marine grade", href: "/silicon-bronze" },
  { label: "Exotic alloys", sub: "Inconel, Monel, titanium", href: "#" },
];

export default function ProductsPage() {
  return (
    <div className="pe-page">
      <CfNav active="products" />

      {/* HEADER */}
      <header className="pe-head">
        <div className="pe-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          Products
        </div>
        <div className="pe-head-row">
          <h1>
            Everything we
            <br />
            make and <i>stock.</i>
          </h1>
          <div>
            <p className="pe-head-sub">
              Nine fastener families and in-house CNC machining — anchor bolts to silicon
              bronze, in stock and built to print.
            </p>
            <div className="pe-head-meta">
              <div>
                <b>9</b>Product families
              </div>
              <div>
                <b>28+</b>Stock SKUs
              </div>
              <div>
                <b>24hr</b>Quote turnaround
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* GRID */}
      <main className="pe-grid">
        {FAMILIES.map((family) => (
          <ProductTile key={family.order} {...family} />
        ))}
      </main>

      {/* SHOP BY MATERIAL */}
      <section className="pe-shopby">
        <div className="pe-shopby-inner">
          <div className="pe-shopby-head">
            <h2>Not sure where to start? Shop by material.</h2>
            <Link href="/spec-builder">Try the Spec Builder →</Link>
          </div>
          <div className="pe-chips">
            {MATERIALS.map((material) => (
              <TileLink key={material.label} href={material.href} className="pe-chip">
                <div className="pe-chip-label">{material.label}</div>
                <div className="pe-chip-sub">{material.sub}</div>
              </TileLink>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pe-cta">
        <h2>
          Can&apos;t find the part?
          <br />
          We probably make it.
        </h2>
        <p>
          Most &ldquo;custom&rdquo; jobs are routine for us. Send a print or a sketch and
          we&apos;ll quote it within 24 hours.
        </p>
        <div className="pe-cta-ctas">
          <Link href="/quote" className="cf-pill cf-pill--blue">
            Request a Quote
          </Link>
          <a href="tel:18337073278" className="cf-pill pe-cta-call">
            Call 833.707.FAST
          </a>
        </div>
      </section>

      <CfFooter />
    </div>
  );
}

function ProductTile({
  eyebrow,
  title,
  description,
  grades,
  href,
  cta = "Explore",
  placeholder,
  image,
  imageAlt,
  variant = "default",
}: Family) {
  const variantClass =
    variant === "wide"
      ? " pe-tile--wide"
      : variant === "tall"
        ? " pe-tile--tall"
        : variant === "light"
          ? " pe-tile--light"
          : "";

  return (
    <TileLink href={href} className={`pe-tile${variantClass}`}>
      {variant !== "light" && (
        <>
          <div className="pe-tile-art">
            {image ? (
              <Img src={image} alt={imageAlt ?? title} />
            ) : (
              <div className="pe-tile-ph" data-ph={placeholder} />
            )}
          </div>
          <div className="pe-tile-scrim" />
        </>
      )}
      <div className="pe-tile-body">
        <div className="pe-tile-num">{eyebrow}</div>
        <h2 className="pe-tile-title">{title}</h2>
        <p className="pe-tile-desc">{description}</p>
        <div className="pe-tile-grades">
          {grades.map((grade) => (
            <span key={grade}>{grade}</span>
          ))}
        </div>
        <span className="pe-tile-cta">{cta}</span>
      </div>
    </TileLink>
  );
}

/* Internal routes use next/link for client navigation; TBD ("#") and external
   schemes fall back to a plain anchor. */
function TileLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
