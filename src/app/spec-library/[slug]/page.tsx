import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";
import "@/styles/cf-spec-detail.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { LIB_SECTIONS, LIB_SPECS, type SectionId } from "@/lib/specLibrary/data";
import { getSpecBySlug, parseSpec } from "@/lib/specLibrary/markdown";
import { SpecToc } from "@/components/spec-detail/SpecToc";

const SECTION_TITLES: Record<SectionId, string> = LIB_SECTIONS.reduce(
  (acc, s) => {
    acc[s.id] = s.title;
    return acc;
  },
  {} as Record<SectionId, string>
);

const META_KEYS = [
  "Category",
  "Common grades stocked",
  "Common groups stocked",
  "Common classes stocked",
  "Typical pairing",
  "Industries",
  "Applies to",
  "Typical base fasteners",
] as const;

const META_DISPLAY: Record<string, string> = {
  "Common grades stocked": "Grades stocked",
  "Common groups stocked": "Groups stocked",
  "Common classes stocked": "Classes stocked",
  "Typical base fasteners": "Typical base",
};

/** Pre-render every spec route at build time. */
export async function generateStaticParams() {
  return LIB_SPECS.map((s) => ({ slug: s.file }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spec = getSpecBySlug(slug);
  if (!spec) return { title: "Spec not found" };
  const md = await readSpecMarkdown(slug).catch(() => null);
  const parsed = md ? parseSpec(md, slug) : null;
  return {
    title: parsed?.h1 ?? spec.code,
    description: spec.note,
  };
}

async function readSpecMarkdown(slug: string): Promise<string> {
  const file = path.join(process.cwd(), "content", "spec-library", `${slug}.md`);
  return fs.readFile(file, "utf8");
}

export default async function SpecDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spec = getSpecBySlug(slug);
  if (!spec) notFound();

  let md: string;
  try {
    md = await readSpecMarkdown(slug);
  } catch {
    notFound();
  }

  const parsed = parseSpec(md, slug);

  // Strip a leading "Code — " prefix off the H1 if present, so the displayed
  // name reads cleanly underneath the big code (e.g. "ASTM A193 — Alloy and …"
  // becomes just "Alloy and Stainless Steel Bolting…").
  const h1Name = parsed.h1.replace(/^[^—–\-]+[—–\-]\s*/, "");

  // Prev/next within the same section
  const sectionSpecs = LIB_SPECS.filter((s) => s.section === spec.section);
  const idx = sectionSpecs.findIndex((s) => s.file === spec.file);
  const prev = idx > 0 ? sectionSpecs[idx - 1] : null;
  const next = idx < sectionSpecs.length - 1 ? sectionSpecs[idx + 1] : null;

  const visibleMeta = META_KEYS.filter((k) => parsed.meta[k]);

  return (
    <>
      <CfNav />
      <main className="sp-wrap">
        <div className="sp-crumbs">
          <Link href="/spec-library" className="sp-back">
            <svg
              className="sp-back-arrow"
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 4l-4 4 4 4" />
            </svg>
            Back to Spec Library
          </Link>
          <div className="sp-crumbs-trail">
            <span style={{ color: "var(--mid)" }}>{SECTION_TITLES[spec.section]}</span>
            <span className="sep">/</span>
            <span style={{ color: "var(--ink)" }}>{spec.code}</span>
          </div>
        </div>

        <header className="sp-hero">
          <div>
            <span className="sp-tag">{SECTION_TITLES[spec.section]}</span>
            <div className="sp-code">{spec.code}</div>
            <div className="sp-name">{h1Name}</div>
          </div>
          {visibleMeta.length > 0 && (
            <div className="sp-meta">
              {visibleMeta.map((k) => (
                <div key={k} className="sp-meta-row">
                  <span className="sp-meta-k">{META_DISPLAY[k] ?? k}</span>
                  {/* Meta values are inline-formatted in the source markdown
                      (bold/italic/code spans). They've already been parsed
                      by parseSpec but not run through the inline renderer
                      since they live in result.meta as plain strings.
                      Render as plain text — values in our 35 .md files are
                      simple strings without inline formatting. */}
                  <span className="sp-meta-v">{parsed.meta[k]}</span>
                </div>
              ))}
            </div>
          )}
        </header>

        {parsed.glance && (
          <div className="sp-glance" dangerouslySetInnerHTML={{ __html: parsed.glance }} />
        )}

        <div className="sp-body-wrap">
          <SpecToc items={parsed.toc} />
          <article className="sp-body">
            <div dangerouslySetInnerHTML={{ __html: parsed.bodyHtml }} />
            {parsed.related.length > 0 && (
              <div className="sp-footer-band">
                <div className="sp-related-title">Cross-references</div>
                <div className="sp-related-grid">
                  {parsed.related.slice(0, 6).map((r) => (
                    <Link key={r.file} href={`/spec-library/${r.file}`} className="sp-related-card">
                      <b>{r.code}</b>
                      <span dangerouslySetInnerHTML={{ __html: r.desc }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="sp-nav">
              <Link
                href={prev ? `/spec-library/${prev.file}` : "#"}
                className={"sp-nav-link sp-nav-prev" + (prev ? "" : " is-disabled")}
              >
                <span>← Previous</span>
                <b>{prev ? prev.code : "—"}</b>
              </Link>
              <Link
                href={next ? `/spec-library/${next.file}` : "#"}
                className={"sp-nav-link sp-nav-next" + (next ? "" : " is-disabled")}
              >
                <span>Next →</span>
                <b>{next ? next.code : "—"}</b>
              </Link>
            </div>
          </article>
        </div>
      </main>

      <section className="sp-quote-band">
        <div className="sp-wrap">
          <div className="sp-quote-inner">
            <div>
              <div className="sp-quote-head">Need this spec quoted?</div>
              <div className="sp-quote-sub">
                California Fastener stocks every specification in this library. Send a drawing, BOM,
                or part number and we&apos;ll come back with pricing, lead time, and a mill-cert
                plan.
              </div>
            </div>
            <div className="sp-quote-actions">
              <Link href="/quote" className="sp-btn-primary">
                Request a Quote
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <a href="mailto:info@californiafastener.com" className="sp-quote-email">
                info@californiafastener.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <CfFooter />
    </>
  );
}
