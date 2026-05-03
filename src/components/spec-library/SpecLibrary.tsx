"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  LIB_FACETS,
  LIB_SECTIONS,
  LIB_SPECS,
  type SectionId,
  type Spec,
} from "@/lib/specLibrary/data";
import {
  isFilterActive,
  searchBlob,
  specMatchesFilter,
  type FilterState,
} from "@/lib/specLibrary/filtering";

type Layout = "editorial" | "grid" | "table";

/** Hero quick-index — one entry per section, with a count. */
const heroIndexEntries = LIB_SECTIONS.map((s) => ({
  id: s.id,
  // Strip the redundant suffix from the section title for the index
  title: s.title.replace(" Specifications", "").replace(" Reference", "").replace(" Standards", ""),
  count: LIB_SPECS.filter((sp) => sp.section === s.id).length,
}));

/** Pre-compute the search blob once per spec so live-filter is fast. */
const SPEC_BLOBS = new Map<string, string>(LIB_SPECS.map((sp) => [sp.code, searchBlob(sp)]));

/** Pre-compute facet counts (chips with zero hits don't render). */
const FACET_COUNTS = (() => {
  const counts = {
    category: {} as Record<string, number>,
    industry: {} as Record<string, number>,
    service: {} as Record<string, number>,
  };
  LIB_SPECS.forEach((sp) => {
    counts.category[sp.section] = (counts.category[sp.section] ?? 0) + 1;
    sp.industries.forEach((i) => (counts.industry[i] = (counts.industry[i] ?? 0) + 1));
    sp.service.forEach((s) => (counts.service[s] = (counts.service[s] ?? 0) + 1));
  });
  return counts;
})();

export function SpecLibrary() {
  const [layout, setLayout] = useState<Layout>("grid");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<SectionId | null>(null);
  const [industry, setIndustry] = useState<Set<string>>(new Set());
  const [service, setService] = useState<Set<string>>(new Set());
  const [refineOpen, setRefineOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Body class drives the editorial / grid / table look (CSS hooks `body.lib-layout--…`)
  useEffect(() => {
    document.body.classList.add(`lib-layout--${layout}`);
    return () => {
      document.body.classList.remove(`lib-layout--${layout}`);
    };
  }, [layout]);

  // Show the Refine drawer automatically once any industry/service filter is active
  useEffect(() => {
    if (industry.size + service.size > 0) setRefineOpen(true);
  }, [industry, service]);

  // Keyboard shortcuts: `/` focuses search, `Esc` clears
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const inSearch = document.activeElement === searchRef.current;
      if ((e.key === "/" || e.key === "s") && !inSearch && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && inSearch) {
        searchRef.current?.blur();
        setQ("");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const filterState: FilterState = useMemo(
    () => ({ q, category, industry, service }),
    [q, category, industry, service]
  );

  // Filter every spec once per state change, group by section
  const visibleBySection = useMemo(() => {
    const grouped = new Map<SectionId, Spec[]>();
    LIB_SECTIONS.forEach((s) => grouped.set(s.id, []));
    LIB_SPECS.forEach((sp) => {
      const blob = SPEC_BLOBS.get(sp.code) ?? "";
      if (specMatchesFilter(sp, filterState, blob)) {
        grouped.get(sp.section)!.push(sp);
      }
    });
    // Sort each section by popularity desc (1 → top), preserving stable order otherwise
    for (const list of grouped.values()) {
      list.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
    }
    return grouped;
  }, [filterState]);

  const totalShown = useMemo(
    () => Array.from(visibleBySection.values()).reduce((acc, l) => acc + l.length, 0),
    [visibleBySection]
  );

  const hasFilters = isFilterActive(filterState);

  const clearAll = () => {
    setQ("");
    setCategory(null);
    setIndustry(new Set());
    setService(new Set());
  };

  const toggleIndustry = (id: string) => {
    setIndustry((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleService = (id: string) => {
    setService((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startFromIndustry = () => {
    clearAll();
    setIndustry(new Set(["structural"]));
    document.getElementById("specs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const startFromService = () => {
    clearAll();
    setService(new Set(["high-temp"]));
    document.getElementById("specs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const startFromStrength = () => {
    clearAll();
    setCategory("bolt");
    document.getElementById("specs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Stats context label
  const statsContext = (() => {
    const parts: string[] = [];
    if (category) parts.push(LIB_FACETS.category.find((c) => c.id === category)?.label ?? category);
    else parts.push("All categories");
    if (industry.size > 0) {
      parts.push(
        Array.from(industry)
          .map((id) => LIB_FACETS.industry.find((x) => x.id === id)?.label ?? id)
          .join(" + ")
      );
    }
    if (service.size > 0) {
      parts.push(
        Array.from(service)
          .map((id) => LIB_FACETS.service.find((x) => x.id === id)?.label ?? id)
          .join(" + ")
      );
    }
    if (q.trim()) parts.push(`“${q.trim()}”`);
    return parts.join(" · ");
  })();

  const refineCount = industry.size + service.size;

  return (
    <>
      {/* HERO */}
      <header className="lib-hero">
        <div className="lib-wrap">
          <div className="lib-crumbs">
            <Link href="/">California Fastener</Link>
            <span className="sep">/</span>
            <Link href="/resources">Resources</Link>
            <span className="sep">/</span>
            <span className="here">Spec Library</span>
          </div>

          <div className="lib-hero-grid">
            <div className="lib-hero-left">
              <div className="lib-kicker">
                <b>Reference</b> · Updated 2025 · 35 standards
              </div>
              <h1 className="lib-h1">
                Fasteners, <i>demystified.</i>
              </h1>
              <p className="lib-lede">
                Thirty-five ASTM, SAE, ASME, ISO, and DIN standards in plain English — and in the
                depth a specifying engineer actually needs. Bolts, nuts, washers, threads, coatings,
                and metric reference. Every page opens with an &ldquo;at-a-glance&rdquo; so
                non-specialists can get oriented in ten seconds.
              </p>
              <div className="lib-hero-actions">
                <a href="#specs" className="cf-pill cf-pill--blue">
                  Browse all specs
                </a>
                <Link href="/spec-builder" className="cf-link">
                  Open spec builder&nbsp;→
                </Link>
              </div>
              <dl className="lib-hero-meta">
                <div>
                  <dt>Standards</dt>
                  <dd>35</dd>
                </div>
                <div>
                  <dt>Categories</dt>
                  <dd>6</dd>
                </div>
                <div>
                  <dt>Revision</dt>
                  <dd>2025.1</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>ask us</dd>
                </div>
              </dl>
            </div>

            <aside className="lib-hero-index" aria-label="Quick index">
              <div className="lib-index-head">
                <span className="lib-index-eyebrow">Contents</span>
                <span className="lib-index-count">35 specs</span>
              </div>
              <ol className="lib-index-list">
                {heroIndexEntries.map((s) => (
                  <li key={s.id}>
                    <a href={`#sec-${s.id}`}>
                      <span className="lib-index-title">{s.title}</span>
                      <span className="lib-index-count-mini">{s.count}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="lib-index-foot">
                Press <kbd>/</kbd> to search
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* STARTING POINTS */}
      <section className="lib-starts">
        <div className="lib-wrap">
          <div className="lib-starts-head">
            <div className="lib-section-kicker">§ Start here</div>
            <h2 className="lib-starts-title">Three ways in.</h2>
            <p className="lib-starts-sub">
              Most engineers don&apos;t arrive here knowing the spec number. Pick the path that
              matches what&apos;s already on your desk — a drawing, an application, or an
              environment.
            </p>
          </div>
          <div className="lib-starts-grid">
            <button type="button" className="lib-start" onClick={startFromIndustry}>
              <div className="lib-start-num">01</div>
              <h3>By industry</h3>
              <p>
                Refinery, structural, marine, power, aerospace. Jump to the specs that dominate your
                vertical — filtered and ready.
              </p>
              <div className="lib-start-chips">
                <span>Oil &amp; Gas</span>
                <span>Structural</span>
                <span>Marine</span>
                <span>Power</span>
              </div>
            </button>
            <button type="button" className="lib-start" onClick={startFromService}>
              <div className="lib-start-num">02</div>
              <h3>By service condition</h3>
              <p>
                High temperature, sour (H₂S), cryogenic, corrosive, outdoor. Let the environment
                narrow the grade before you pick a spec.
              </p>
              <div className="lib-start-chips">
                <span>High temp</span>
                <span>Sour / NACE</span>
                <span>Low temp</span>
                <span>Corrosive</span>
              </div>
            </button>
            <button type="button" className="lib-start" onClick={startFromStrength}>
              <div className="lib-start-num">03</div>
              <h3>By strength class</h3>
              <p>
                Grade 5, Grade 8, A325, A490, Class 10.9. When the spec sheet says a strength and the
                rest is your problem.
              </p>
              <div className="lib-start-chips">
                <span>A325</span>
                <span>B7</span>
                <span>Grade 8</span>
                <span>10.9</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* BROWSE */}
      <section className="lib-browse" id="specs">
        <div className="lib-wrap">
          {/* Toolbar */}
          <div className="lib-toolbar">
            <div className="lib-toolbar-top">
              <label className="lib-search">
                <svg
                  className="lib-search-icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="7" cy="7" r="5" />
                  <path d="M11 11l3 3" />
                </svg>
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search — &ldquo;A325&rdquo;, &ldquo;sour service&rdquo;, &ldquo;316&rdquo;, &ldquo;low temperature&rdquo;…"
                  autoComplete="off"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                <kbd className="lib-search-hint" style={{ opacity: q ? 0 : 1 }}>
                  /
                </kbd>
              </label>
              <div className="lib-layout-switch" role="tablist" aria-label="Layout">
                <button
                  type="button"
                  data-layout="editorial"
                  className={layout === "editorial" ? "is-active" : ""}
                  title="Editorial"
                  onClick={() => setLayout("editorial")}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M2 3h12M2 7h9M2 11h12M2 14h7" />
                  </svg>
                </button>
                <button
                  type="button"
                  data-layout="grid"
                  className={layout === "grid" ? "is-active" : ""}
                  title="Grid"
                  onClick={() => setLayout("grid")}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="2" y="2" width="5" height="5" />
                    <rect x="9" y="2" width="5" height="5" />
                    <rect x="2" y="9" width="5" height="5" />
                    <rect x="9" y="9" width="5" height="5" />
                  </svg>
                </button>
                <button
                  type="button"
                  data-layout="table"
                  className={layout === "table" ? "is-active" : ""}
                  title="Table"
                  onClick={() => setLayout("table")}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="2" y="3" width="12" height="10" />
                    <path d="M2 7h12M6 3v10" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="lib-toolbar-bottom">
              <div className="lib-facet-group">
                <span className="lib-facet-label">Category</span>
                <div className="lib-facet-chips">
                  {LIB_FACETS.category.map((f) => {
                    const n = FACET_COUNTS.category[f.id] ?? 0;
                    if (!n) return null;
                    const active = category === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        className={"lib-facet-chip" + (active ? " is-active" : "")}
                        data-facet="category"
                        data-val={f.id}
                        onClick={() => setCategory(active ? null : (f.id as SectionId))}
                      >
                        {f.label}
                        <em>{n}</em>
                      </button>
                    );
                  })}
                </div>
              </div>
              <span className="lib-facet-divider" />
              <button
                type="button"
                className="lib-facet-more"
                aria-expanded={refineOpen}
                onClick={() => setRefineOpen((v) => !v)}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 5h10M5 8h6M7 11h2" />
                </svg>
                Refine
                {refineCount > 0 && <span className="lib-facet-more-count">{refineCount}</span>}
              </button>
              {hasFilters && (
                <button type="button" className="lib-facet-clear" onClick={clearAll}>
                  Clear all
                </button>
              )}
            </div>

            {refineOpen && (
              <div className="lib-toolbar-refine">
                <div className="lib-facet-group">
                  <span className="lib-facet-label">Industry</span>
                  <div className="lib-facet-chips">
                    {LIB_FACETS.industry.map((f) => {
                      const n = FACET_COUNTS.industry[f.id] ?? 0;
                      if (!n) return null;
                      const active = industry.has(f.id);
                      return (
                        <button
                          key={f.id}
                          type="button"
                          className={"lib-facet-chip" + (active ? " is-active" : "")}
                          data-facet="industry"
                          data-val={f.id}
                          onClick={() => toggleIndustry(f.id)}
                        >
                          {f.label}
                          <em>{n}</em>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="lib-facet-group">
                  <span className="lib-facet-label">Service</span>
                  <div className="lib-facet-chips">
                    {LIB_FACETS.service.map((f) => {
                      const n = FACET_COUNTS.service[f.id] ?? 0;
                      if (!n) return null;
                      const active = service.has(f.id);
                      return (
                        <button
                          key={f.id}
                          type="button"
                          className={"lib-facet-chip" + (active ? " is-active" : "")}
                          data-facet="service"
                          data-val={f.id}
                          onClick={() => toggleService(f.id)}
                        >
                          {f.label}
                          <em>{n}</em>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="lib-stats">
            <span>
              Showing <b>{totalShown}</b> of <b>{LIB_SPECS.length}</b>
            </span>
            <span className="lib-stats-ctx">{statsContext}</span>
            <span className="lib-stats-ver">
              ASTM · SAE · ASME · ISO · DIN &nbsp;·&nbsp; <a href="#">Request a revision</a>
            </span>
          </div>

          {/* Sections */}
          <div>
            {LIB_SECTIONS.map((s) => {
              const visible = visibleBySection.get(s.id) ?? [];
              return (
                <section
                  key={s.id}
                  className={"lib-sec" + (visible.length === 0 ? " is-hidden" : "")}
                  id={`sec-${s.id}`}
                >
                  <header className="lib-sec-head">
                    <div className="lib-sec-marker">
                      <b>{s.num}</b>
                      {s.tag} · {visible.length} specs
                    </div>
                    <div>
                      <h2 className="lib-sec-title">{s.title}</h2>
                      <p className="lib-sec-lede">{s.lede}</p>
                    </div>
                    <aside className="lib-sec-starthere">
                      <b>Start here</b>
                      <a href="#">{s.starthere.code}</a>
                      {s.starthere.why}
                    </aside>
                  </header>
                  <div className="lib-sec-cards">
                    {visible.map((sp) => (
                      <SpecCard key={sp.code} sp={sp} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Empty state */}
          {totalShown === 0 && (
            <div className="lib-empty">
              <div className="lib-empty-icon">
                <svg viewBox="0 0 32 32" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="14" cy="14" r="9" />
                  <path d="M21 21l6 6" />
                </svg>
              </div>
              <h3>
                No specs match{" "}
                <span>{q.trim() ? `“${q.trim()}”` : "your filters"}</span>.
              </h3>
              <p>
                Try a grade (B7, A325), an industry (marine, oil &amp; gas), or a service condition
                (sour, low temp).
              </p>
              <button type="button" className="cf-pill" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function SpecCard({ sp }: { sp: Spec }) {
  const grades = sp.grades.slice(0, 6);
  const industryTags = sp.industries
    .slice(0, 2)
    .map((id) => LIB_FACETS.industry.find((f) => f.id === id))
    .filter(Boolean) as { id: string; label: string }[];
  const serviceTags = sp.service
    .filter((s) => s !== "ambient")
    .slice(0, 2)
    .map((id) => LIB_FACETS.service.find((f) => f.id === id))
    .filter(Boolean) as { id: string; label: string }[];
  const isPopular = sp.popularity === 1;

  return (
    <Link
      href={`/spec-library/${sp.file}`}
      className={"lib-card" + (isPopular ? " is-popular" : "")}
      data-spec={sp.file}
      data-section={sp.section}
    >
      <div className="lib-card-id">
        <div className="lib-card-code">{sp.code}</div>
        {isPopular && <span className="lib-card-popular">● Commonly shipped</span>}
      </div>
      <div className="lib-card-body">
        <h3 className="lib-card-title">{sp.title}</h3>
        <p className="lib-card-note">{sp.note}</p>
      </div>
      <div className="lib-card-meta">
        <div className="lib-card-grades">
          {grades.map((g) => (
            <span key={g} className="lib-card-grade">
              {g}
            </span>
          ))}
        </div>
        <div className="lib-card-tags">
          {industryTags.map((t) => (
            <span key={t.id} className="lib-card-tag lib-card-tag--industry">
              {t.label}
            </span>
          ))}
          {serviceTags.map((t) => (
            <span key={t.id} className="lib-card-tag lib-card-tag--service">
              {t.label}
            </span>
          ))}
        </div>
      </div>
      <svg
        className="lib-card-arrow"
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M5 11l6-6M11 5v5H6" />
      </svg>
    </Link>
  );
}
