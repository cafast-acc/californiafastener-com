import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/styles/cf-industry.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { Img } from "@/components/Img";
import {
  INDUSTRIES,
  INDUSTRY_ORDER,
  PRODUCT_CARDS,
  PRODUCT_CARD_HREFS,
  type Industry,
  type IndustrySlug,
} from "@/lib/industries/data";

export function generateStaticParams() {
  return INDUSTRY_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = INDUSTRIES[slug as IndustrySlug];
  if (!ind) return { title: "Industry not found" };
  return {
    title: ind.metaTitle,
    description: `${ind.navLabel} fasteners from California Fastener — industrial, structural, and custom fastener solutions engineered for the ${ind.navLabel.toLowerCase()} industry.`,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = INDUSTRIES[slug as IndustrySlug];
  if (!ind) notFound();

  const others = INDUSTRY_ORDER.filter((s) => s !== slug);

  return (
    <>
      <CfNav active="industries" />

      {/* BREADCRUMBS */}
      <div className="ind-crumbs">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/industries/construction">Industries</Link>
        <span>›</span>
        {ind.navLabel}
      </div>

      {/* HERO */}
      <section className="ind-hero">
        <div className="ind-hero-text">
          <div className="ind-hero-eyebrow">{ind.eyebrow}</div>
          <h1>{renderAccent(ind.h1, ind.h1Accent)}</h1>
          <p className="ind-hero-sub">{ind.h2}</p>
          <p className="ind-hero-lede">{ind.lead}</p>
          <div className="ind-hero-ctas">
            <Link href="/quote" className="cf-pill cf-pill--blue">
              Request a quote
            </Link>
            <a href="#products" className="cf-link">
              Browse products
            </a>
          </div>
        </div>
        <div className="ind-hero-image">
          <div className="ind-hero-tag">{ind.heroTag}</div>
          <Img src={ind.heroImg} alt={ind.heroImgAlt} />
        </div>
      </section>

      {/* CONTEXT */}
      <section className="ind-context">
        <div className="ind-context-inner">
          <div>
            <div className="ind-context-kicker">Industry Overview</div>
            <h2>{ind.contextH2}</h2>
          </div>
          <div className="ind-context-body">
            {ind.contextBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* BULLETS */}
      <section className="ind-bullets" id="products">
        <div className="ind-bullets-head">
          <h3>{ind.bulletsH3}</h3>
          <div className="ind-bullets-head-side">
            {String(ind.bullets.length).padStart(2, "0")} · Core product lines
          </div>
        </div>
        <div className="ind-bullet-grid">
          {ind.bullets.map(([term, desc], i) => (
            <div key={term} className="ind-bullet">
              <div className="ind-bullet-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="ind-bullet-term">{term}</div>
              <div className="ind-bullet-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT CARDS */}
      <section className="ind-products">
        <div className="ind-products-kicker">Shop by Product</div>
        <h3>Fastener lines most used in {ind.navLabel}.</h3>
        <div className="ind-product-grid">
          {ind.products.map((key) => {
            const card = PRODUCT_CARDS[key];
            const href = PRODUCT_CARD_HREFS[key];
            return (
              <Link key={key} href={href} className="ind-product-card">
                <div className="ind-product-card-img">
                  <div className="ind-product-card-placeholder">{card.placeholder}</div>
                </div>
                <div className="ind-product-card-body">
                  <div className="ind-product-card-title">{card.title}</div>
                  <div className="ind-product-card-link">{card.sub}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TALK BAND */}
      <section className="ind-talk">
        <h3>
          Want to talk to a <i>real person</i> about your project? Hit the button.
        </h3>
        <Link href="/quote" className="cf-pill cf-pill--blue">
          Talk to a person
        </Link>
      </section>

      {/* CASE STUDIES */}
      <section className="ind-cases">
        <div className="ind-cases-inner">
          <div className="ind-cases-head">
            <div className="ind-cases-kicker">Case Studies</div>
            <h2>{ind.casesH2}</h2>
          </div>
          <div className="ind-cases-grid">
            {ind.cases.map((c, i) => (
              <article key={c.title} className="ind-case">
                <div className="ind-case-num">Case {String(i + 1).padStart(2, "0")}</div>
                <h3>{c.title}</h3>
                <PSlot label="Problem" text={c.problem} />
                <PSlot label="Solution" text={c.solution} />
                <PSlot label="Results" text={c.results} />
                <div className="ind-case-quote">
                  <div className="ind-case-quote-text">&ldquo;{c.quote}&rdquo;</div>
                  <div className="ind-case-quote-attr">— {c.attr}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPEC LIBRARY CALLOUT */}
      <section className="ind-spec-lib">
        <div className="ind-spec-lib-image">
          <div className="ind-spec-lib-sheet">
            <div className="ind-spec-lib-sheet-title">Specification Library</div>
            <div className="ind-spec-lib-sheet-sub">ASTM · SAE · ANSI · ISO</div>
            <SheetRow grade="GRADE" desc="DESCRIPTION" pdf="PDF" />
            <SheetRow grade="A193 B7" desc="Alloy steel bolting, high-temp" pdf="→" />
            <SheetRow grade="A193 B8M" desc="316 stainless bolting" pdf="→" />
            <SheetRow grade="A325" desc="Structural bolts, heavy hex" pdf="→" />
            <SheetRow grade="F1554 55" desc="Anchor bolts, 55 ksi yield" pdf="→" />
            <SheetRow grade="F593" desc="Stainless cap screws" pdf="→" />
            <SheetRow grade="B18.2.1" desc="Square & hex bolts dim." pdf="→" />
            <SheetRow grade="SAE J429" desc="Mech. properties — Grade 5/8" pdf="→" />
            <SheetRow grade="ISO 898-1" desc="Carbon/alloy metric properties" pdf="→" />
          </div>
        </div>
        <div className="ind-spec-lib-text">
          <div className="ind-spec-lib-kicker">Resources</div>
          <h2>Visit our Specification Library.</h2>
          <p>
            A comprehensive resource for fastener specifications across the various industries we
            service. These guides offer access to a wide array of specifications, standards, and
            technical resources.
          </p>
          <Link href="/spec-library" className="cf-pill cf-pill--blue">
            Open Spec Library
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="ind-why">
        <div className="ind-why-inner">
          <div className="ind-why-kicker">Why California Fastener</div>
          <h2>{ind.whyH2}</h2>
          <p>{ind.whyBody}</p>
          <Link href="/quote" className="cf-pill cf-pill--blue">
            Contact us
          </Link>
        </div>
      </section>

      {/* REQUEST QUOTE */}
      <section className="ind-quote">
        <div className="ind-quote-bg">
          <Img src={ind.quoteBg} alt="" />
        </div>
        <div className="ind-quote-inner">
          <div className="ind-quote-kicker">Request A Quote</div>
          <h2>
            Let&rsquo;s build it <em>together.</em>
          </h2>
          <p>{ind.quoteBody}</p>
          <Link href="/quote" className="cf-pill cf-pill--blue">
            Request a quote
          </Link>
        </div>
      </section>

      {/* RELATED INDUSTRIES */}
      <section className="ind-related">
        <div className="ind-bullets-head" style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 24, maxWidth: "none" }}>More industries we serve.</h3>
          <div className="ind-bullets-head-side">Related</div>
        </div>
        <div className="ind-related-grid">
          {others.map((s) => {
            const o = INDUSTRIES[s];
            return (
              <Link key={s} href={`/industries/${s}`} className="ind-related-card">
                <div className="ind-related-card-title">{o.navLabel}</div>
                <div className="ind-related-card-link">View page</div>
              </Link>
            );
          })}
        </div>
      </section>

      <CfFooter />
    </>
  );
}

/** Wraps the substring matching `accent` (case-insensitive) inside the
 *  H1 with a `.accent` span. Returns the original string if accent is
 *  empty or doesn't match. */
function renderAccent(h1: string, accent: string): React.ReactNode {
  if (!accent) return h1;
  const idx = h1.toLowerCase().indexOf(accent.toLowerCase());
  if (idx < 0) return h1;
  const before = h1.slice(0, idx);
  const match = h1.slice(idx, idx + accent.length);
  const after = h1.slice(idx + accent.length);
  return (
    <>
      {before}
      <span className="accent">{match}</span>
      {after}
    </>
  );
}

function PSlot({ label, text }: { label: string; text: string }) {
  return (
    <div className="ind-case-pslot">
      <div className="ind-case-plabel">{label}</div>
      <div className="ind-case-ptext">{text}</div>
    </div>
  );
}

function SheetRow({ grade, desc, pdf }: { grade: string; desc: string; pdf: string }) {
  return (
    <div className="ind-spec-lib-sheet-row">
      <span>{grade}</span>
      <span>{desc}</span>
      <span>{pdf}</span>
    </div>
  );
}

/** Re-export for any callers still importing the old data type. */
export type { Industry };
