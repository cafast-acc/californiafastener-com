import Link from "next/link";
import { ReactNode } from "react";
import "@/styles/cf-simple-page.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";

export type SimplePageProps = {
  breadcrumb: Array<{ href?: string; label: string }>;
  eyebrow: string;
  eyebrowVariant?: "blue" | "purple";
  title: ReactNode;
  sub: ReactNode;
  callouts?: Array<{ label: string; val: string; sub?: string }>;
  sections?: Array<{
    head: string;
    body: ReactNode;
    list?: Array<{ strong: string; sub?: string }>;
  }>;
  navVariant?: "light" | "dark";
  heroVariant?: "light" | "dark";
  quoteHead?: string;
  quoteBody?: string;
};

export function SimplePage({
  breadcrumb,
  eyebrow,
  eyebrowVariant = "blue",
  title,
  sub,
  callouts,
  sections,
  navVariant = "light",
  heroVariant = "light",
  quoteHead = "Ready when you are.",
  quoteBody = "Send us a print, PDF, or BOM. Every quote gets personal attention — we respond within 24 hours with availability and pricing.",
}: SimplePageProps) {
  return (
    <>
      <CfNav variant={navVariant} />

      <section className={`sp-hero${heroVariant === "dark" ? " sp-hero--dark" : ""}`}>
        <div className="sp-hero-inner">
          <div className="sp-breadcrumb">
            {breadcrumb.map((b, i) => (
              <span key={i} style={{ display: "contents" }}>
                {b.href ? <Link href={b.href}>{b.label}</Link> : b.label}
                {i < breadcrumb.length - 1 ? <span>/</span> : null}
              </span>
            ))}
          </div>
          <div className={`sp-eyebrow${eyebrowVariant === "purple" ? " sp-eyebrow--purple" : ""}`}>
            {eyebrow}
          </div>
          <h1>{title}</h1>
          <p className="sp-hero-sub">{sub}</p>
        </div>
      </section>

      {(callouts || sections) && (
        <section className="sp-body">
          {callouts && (
            <div className="sp-grid">
              {callouts.map((c, i) => (
                <div key={i} className="sp-callout">
                  <div className="sp-callout-label">{c.label}</div>
                  <div className="sp-callout-val">{c.val}</div>
                  {c.sub && <div className="sp-callout-sub">{c.sub}</div>}
                </div>
              ))}
            </div>
          )}
          {sections?.map((s, i) => (
            <div
              key={i}
              className="sp-section"
              style={{ marginTop: i === 0 && callouts ? 56 : undefined }}
            >
              <h2 className="sp-section-head">{s.head}</h2>
              <div className="sp-section-body">{s.body}</div>
              {s.list && (
                <ul className="sp-list">
                  {s.list.map((item, j) => (
                    <li key={j}>
                      <strong>{item.strong}</strong>
                      {item.sub && <span>{item.sub}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      <section className="sp-quote">
        <div className="sp-quote-inner">
          <div>
            <h2>{quoteHead}</h2>
            <p>{quoteBody}</p>
          </div>
          <div className="sp-quote-actions">
            <Link href="/quote" className="cf-pill cf-pill--blue">
              Request a Quote
            </Link>
            <a href="mailto:info@californiafastener.com" className="sp-quote-email">
              info@californiafastener.com
            </a>
          </div>
        </div>
      </section>

      <CfFooter />
    </>
  );
}
