import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-products.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import Image from "next/image";
import { INDUSTRIES, INDUSTRY_ORDER } from "@/lib/industries/data";

export const metadata: Metadata = {
  title: "Industries — Fasteners for Every Sector We Serve",
  description:
    "California Fastener supplies certified industrial, structural, and custom fasteners to oil & gas, power generation, construction, power transmission, manufacturing, infrastructure, marine, and aerospace & defense.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <div className="pe-page">
      <CfNav active="industries" />

      {/* HEADER */}
      <header className="pe-head">
        <div className="pe-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          Industries
        </div>
        <div className="pe-head-row">
          <h1>
            Every industry
            <br />
            we <i>serve.</i>
          </h1>
          <div>
            <p className="pe-head-sub">
              From refinery turnarounds to data-center foundations — certified fasteners, custom
              machining, and the paperwork to back them, for the eight sectors that can&rsquo;t
              afford a bad bolt.
            </p>
            <div className="pe-head-meta">
              <div>
                <b>8</b>Industries served
              </div>
              <div>
                <b>28K+</b>Stock SKUs
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
        {INDUSTRY_ORDER.map((slug, i) => {
          const ind = INDUSTRIES[slug];
          const nn = String(i + 1).padStart(2, "0");
          const chips = ind.heroTag
            .split("·")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 4);
          return (
            <Link key={slug} href={`/industries/${slug}`} className="pe-tile">
              <div className="pe-tile-art">
                <Image
                  src={ind.heroImg}
                  alt={ind.heroImgAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                />
              </div>
              <div className="pe-tile-scrim" />
              <div className="pe-tile-body">
                <div className="pe-tile-num">{`${nn} — ${ind.navLabel}`}</div>
                <h2 className="pe-tile-title">{ind.h1}</h2>
                <p className="pe-tile-desc">{ind.h2}</p>
                <div className="pe-tile-grades">
                  {chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
                <span className="pe-tile-cta">Explore industry</span>
              </div>
            </Link>
          );
        })}
      </main>

      {/* CTA */}
      <section className="pe-cta">
        <h2>
          Don&apos;t see your industry?
          <br />
          We&apos;ve probably supplied it.
        </h2>
        <p>
          If it&rsquo;s bolted, we&rsquo;ve likely shipped to it. Tell us what you&rsquo;re building
          and we&rsquo;ll spec the fasteners — and the certs — to match.
        </p>
        <div className="pe-cta-ctas">
          <Link href="/quote" className="cf-pill cf-pill--blue">
            Request a Quote
          </Link>
          <a href="tel:+18885817077" className="cf-pill pe-cta-call no-swap">
            Call 707.741.3277
          </a>
        </div>
      </section>

      <CfFooter />
    </div>
  );
}
