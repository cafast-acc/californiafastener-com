"use client";

import { useMemo, useRef, useState } from "react";
import {
  APPS,
  CONSTRAINTS,
  ENVS,
  STAGE_META,
  STRENGTHS,
  type Application,
  type Constraint,
  type Environment,
  type Option,
  type Stage,
  type StrengthLevel,
} from "@/lib/specBuilder/options";
import { MATERIALS, type Material } from "@/lib/specBuilder/data";
import { getWhy, rankMaterials, titleCase, type SelectionState } from "@/lib/specBuilder/scoring";
import { QuoteModal, type QuoteData } from "./QuoteModal";

const CHECK_PATH = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SpecBuilder() {
  const [stage, setStage] = useState<Stage>(1);
  const [app, setApp] = useState<Application | null>(null);
  const [env, setEnv] = useState<Environment[]>([]);
  const [strength, setStrength] = useState<StrengthLevel>("standard");
  const [constraints, setConstraints] = useState<Constraint[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<QuoteData | null>(null);

  const progressTopRef = useRef<HTMLDivElement>(null);

  const state: SelectionState = { app, env, strength, constraints };

  const ranked = useMemo(
    () => (stage === "r" ? rankMaterials(MATERIALS, state) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stage, app, env, strength, constraints]
  );

  // Stage progression guards
  const canAdvance = (target: Stage): boolean => {
    if (target === 2) return !!app;
    if (target === 3) return env.length > 0;
    if (target === 4) return true; // strength always has a default
    if (target === "r") return constraints.length > 0;
    return true;
  };

  const goToStage = (target: Stage) => {
    if (typeof target === "number" && typeof stage === "number" && target > stage) {
      // Forward — guard
      if (!canAdvance(target)) return;
    } else if (target === "r") {
      if (!canAdvance("r")) return;
    }
    setStage(target);
    requestAnimationFrame(() => {
      progressTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // Multi-select toggle (with "none" exclusivity for constraints)
  const toggleEnv = (v: Environment) => {
    setEnv((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  };
  const toggleConstraint = (v: Constraint) => {
    setConstraints((cur) => {
      if (v === "none") return cur.includes("none") ? [] : ["none"];
      const without = cur.filter((x) => x !== "none");
      return without.includes(v) ? without.filter((x) => x !== v) : [...without, v];
    });
  };

  const reset = () => {
    setApp(null);
    setEnv([]);
    setStrength("standard");
    setConstraints([]);
    setStage(1);
  };

  const openQuote = (data: QuoteData | null) => {
    setModalData(data);
    setModalOpen(true);
  };

  return (
    <>
      <div className="sb-progress-wrap" ref={progressTopRef}>
        <div className="sb-progress" aria-label="Progress">
          {STAGE_META.map((s, i) => {
            const isActive = s.n === stage;
            const isComplete =
              stage === "r"
                ? s.n !== "r"
                : typeof stage === "number" && typeof s.n === "number" && s.n < stage;
            return (
              <span key={String(s.n)} style={{ display: "contents" }}>
                <button
                  type="button"
                  className={
                    "sb-step" +
                    (isActive ? " is-active" : "") +
                    (isComplete ? " is-complete" : "")
                  }
                  onClick={() => {
                    if (isComplete || isActive) goToStage(s.n);
                  }}
                  // Visually a div, but a button for keyboard nav
                  style={{ background: "none", border: "none", font: "inherit", cursor: isComplete || isActive ? "pointer" : "default", padding: 0 }}
                >
                  <span className="sb-step-num">{isComplete ? "✓" : i + 1}</span>
                  <span className="sb-step-label">{s.label}</span>
                </button>
                {i < STAGE_META.length - 1 && (
                  <span className={"sb-step-rule" + (isComplete ? " is-complete" : "")} />
                )}
              </span>
            );
          })}
        </div>
      </div>

      <main className="sb-stages">
        {/* STAGE 1 — Application */}
        {stage === 1 && (
          <section className="sb-stage is-active">
            <StageHeader
              eyebrow="Step 1 of 4"
              title="What are you fastening?"
              subtitle="Select the primary application — this determines which fastener standards apply."
            />
            <OptionGrid<Application>
              options={APPS}
              isSelected={(v) => v === app}
              onClick={(v) => setApp(v)}
            />
            <StageNav
              next={{
                label: "Next · Environment →",
                enabled: !!app,
                onClick: () => goToStage(2),
              }}
            />
          </section>
        )}

        {/* STAGE 2 — Environment */}
        {stage === 2 && (
          <section className="sb-stage is-active">
            <StageHeader
              eyebrow="Step 2 of 4"
              title="Operating environment"
              subtitle={
                <>
                  What will these fasteners be exposed to? Select all that apply — most real
                  applications combine several (e.g. outdoor + high temp + high pressure).{" "}
                  <Counter count={env.length} />
                </>
              }
            />
            <OptionGrid<Environment>
              options={ENVS}
              isSelected={(v) => env.includes(v)}
              onClick={toggleEnv}
            />
            <StageNav
              back={() => goToStage(1)}
              next={{
                label: "Next · Strength →",
                enabled: env.length > 0,
                onClick: () => goToStage(3),
              }}
            />
          </section>
        )}

        {/* STAGE 3 — Strength */}
        {stage === 3 && (
          <section className="sb-stage is-active">
            <StageHeader
              eyebrow="Step 3 of 4"
              title="Strength requirement"
              subtitle="What tensile strength range does your application need? Drag the slider or tap a card."
            />
            <StrengthPicker value={strength} onChange={setStrength} />
            <StageNav
              back={() => goToStage(2)}
              next={{
                label: "Next · Requirements →",
                enabled: true,
                onClick: () => goToStage(4),
              }}
            />
          </section>
        )}

        {/* STAGE 4 — Constraints */}
        {stage === 4 && (
          <section className="sb-stage is-active">
            <StageHeader
              eyebrow="Step 4 of 4"
              title="Material requirements"
              subtitle={
                <>
                  Any rules on material type, origin, or compliance? Select all that apply.{" "}
                  <Counter count={constraints.length} />
                </>
              }
            />
            <OptionGrid<Constraint>
              options={CONSTRAINTS}
              isSelected={(v) => constraints.includes(v)}
              onClick={toggleConstraint}
            />
            <StageNav
              back={() => goToStage(3)}
              next={{
                label: "See recommendations →",
                enabled: constraints.length > 0,
                onClick: () => goToStage("r"),
              }}
            />
          </section>
        )}

        {/* RESULTS */}
        {stage === "r" && (
          <section className="sb-stage sb-stage-results is-active">
            <Results
              ranked={ranked}
              state={state}
              onReset={reset}
              onQuote={openQuote}
            />
          </section>
        )}
      </main>

      <QuoteModal
        open={modalOpen}
        data={modalData}
        state={state}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

function StageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: React.ReactNode;
}) {
  return (
    <header className="sb-stage-head">
      <div className="sb-stage-eyebrow">{eyebrow}</div>
      <h2 className="sb-stage-title">{title}</h2>
      <p className="sb-stage-subtitle">{subtitle}</p>
    </header>
  );
}

function Counter({ count }: { count: number }) {
  return (
    <span className={"sb-counter" + (count === 0 ? " is-empty" : "")}>
      {count} selected
    </span>
  );
}

function OptionGrid<V extends string>({
  options,
  isSelected,
  onClick,
}: {
  options: Option<V>[];
  isSelected: (v: V) => boolean;
  onClick: (v: V) => void;
}) {
  return (
    <div className="sb-opts">
      {options.map((opt) => {
        const selected = isSelected(opt.v);
        return (
          <button
            key={opt.v}
            type="button"
            className={"sb-opt" + (selected ? " is-selected" : "")}
            data-value={opt.v}
            onClick={() => onClick(opt.v)}
          >
            <div className="sb-opt-head">
              <div className="sb-opt-title">{opt.t}</div>
              <div className="sb-opt-check">{CHECK_PATH}</div>
            </div>
            <div className="sb-opt-desc">{opt.d}</div>
          </button>
        );
      })}
    </div>
  );
}

function StageNav({
  back,
  next,
}: {
  back?: () => void;
  next: { label: string; enabled: boolean; onClick: () => void };
}) {
  return (
    <div className="sb-nav">
      {back ? (
        <button type="button" className="sb-btn sb-btn-ghost" onClick={back}>
          ← Back
        </button>
      ) : (
        <span className="sb-nav-spacer" />
      )}
      <button
        type="button"
        className={"sb-btn sb-btn-primary" + (!next.enabled ? " is-disabled" : "")}
        disabled={!next.enabled}
        onClick={next.onClick}
      >
        {next.label}
      </button>
    </div>
  );
}

function StrengthPicker({
  value,
  onChange,
}: {
  value: StrengthLevel;
  onChange: (v: StrengthLevel) => void;
}) {
  const idx = STRENGTHS.findIndex((s) => s.v === value);
  const pct = [16, 50, 84][idx] ?? 16;
  return (
    <div className="sb-strength">
      <div className="sb-strength-labels">
        {STRENGTHS.map((s) => (
          <div key={s.v} className="sb-strength-tick">
            <strong>{s.r}</strong>
            <span>{s.t}</span>
          </div>
        ))}
      </div>
      <div className="sb-strength-track">
        <div className="sb-strength-fill" style={{ width: pct + "%" }} />
        <div className="sb-strength-thumb" style={{ left: pct + "%" }} />
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={idx}
          onChange={(e) => onChange(STRENGTHS[+e.target.value].v)}
          aria-label="Strength selector"
        />
      </div>
      <div className="sb-opts sb-opts-3">
        {STRENGTHS.map((s, i) => (
          <button
            key={s.v}
            type="button"
            className={"sb-opt" + (i === idx ? " is-selected" : "")}
            onClick={() => onChange(s.v)}
          >
            <div className="sb-opt-head">
              <div className="sb-opt-title">{s.t}</div>
              <div className="sb-opt-check">{CHECK_PATH}</div>
            </div>
            <div className="sb-opt-desc">{s.d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Results({
  ranked,
  state,
  onReset,
  onQuote,
}: {
  ranked: Array<Material & { score: number }>;
  state: SelectionState;
  onReset: () => void;
  onQuote: (data: QuoteData | null) => void;
}) {
  const summaryPills = [
    { l: "Application", v: state.app || "" },
    { l: "Environment", v: state.env.join(" + ") },
    { l: "Strength", v: state.strength },
    { l: "Requirements", v: state.constraints.join(" + ") },
  ].filter((p) => p.v);

  if (ranked.length === 0) {
    return (
      <>
        <ResultsHead summaryPills={summaryPills} onReset={onReset} />
        <div className="sb-noresults">
          <h3>No exact match found</h3>
          <p>
            Your requirements may call for a specialty solution. Our team handles unusual specs
            every day —{" "}
            <a href="/quote" onClick={(e) => { e.preventDefault(); onQuote(null); }}>
              talk to an estimator
            </a>{" "}
            and we&apos;ll work it through with you.
          </p>
        </div>
      </>
    );
  }

  const top = ranked[0];
  const alts = ranked.slice(1, 4);
  const isDfars = state.constraints.indexOf("dfars") >= 0;

  return (
    <>
      <ResultsHead summaryPills={summaryPills} onReset={onReset} />
      <div id="sb-results-output">
        <div className="sb-results-section">
          <div className="sb-results-label">Top recommendation</div>
          <ResultCard mat={top} state={state} isTop isDfars={isDfars} onQuote={onQuote} />
        </div>
        {alts.length > 0 && (
          <div className="sb-results-section">
            <div className="sb-results-label">Also consider</div>
            {alts.map((m) => (
              <ResultCard key={m.id} mat={m} state={state} isDfars={isDfars} onQuote={onQuote} />
            ))}
          </div>
        )}
        <div className="sb-results-footer">
          <p>
            Not finding the right match? Our estimators have specified fasteners for thousands of
            projects.
          </p>
          <button type="button" className="sb-btn sb-btn-primary" onClick={() => onQuote(null)}>
            Talk to an engineer →
          </button>
        </div>
        <div className="sb-disclaimer">
          <strong>Note —</strong> This tool is a starting point for material selection based on
          common industry practice. Final selection should be verified by a qualified engineer for
          your specific application, taking into account all relevant codes, standards,
          environmental factors, and design loads. California Fastener supplies materials per
          customer specification and does not assume responsibility for design decisions.
        </div>
      </div>
    </>
  );
}

function ResultsHead({
  summaryPills,
  onReset,
}: {
  summaryPills: Array<{ l: string; v: string }>;
  onReset: () => void;
}) {
  return (
    <div className="sb-results-head">
      <div className="sb-results-eyebrow">Recommendations</div>
      <h2 className="sb-results-title">Here&rsquo;s what fits your spec.</h2>
      <div className="sb-results-summary">
        {summaryPills.map((p) => (
          <span key={p.l} className="sb-summary-pill">
            <strong>{p.l}</strong> {titleCase(p.v)}
          </span>
        ))}
      </div>
      <div className="sb-results-actions">
        <button type="button" className="sb-btn sb-btn-ghost" onClick={onReset}>
          Start over
        </button>
        <a href="/quote" className="sb-btn sb-btn-primary">
          Request a full quote
        </a>
      </div>
    </div>
  );
}

function ResultCard({
  mat,
  state,
  isTop,
  isDfars,
  onQuote,
}: {
  mat: Material;
  state: SelectionState;
  isTop?: boolean;
  isDfars: boolean;
  onQuote: (data: QuoteData) => void;
}) {
  const companions = [...mat.nuts, ...mat.washers];
  const availLabel = mat.inStock ? "In stock" : mat.custom ? "Made to order" : "Available";
  const availClass = mat.inStock ? "is-stock" : "is-custom";

  const handleQuote = () => {
    onQuote({
      spec: mat.spec,
      grade: mat.grade,
      app: state.app || "",
      env: state.env.join(", "),
      strength: state.strength,
      constraints: state.constraints.join(", "),
    });
  };

  return (
    <article className={"sb-result" + (isTop ? " is-top" : "")}>
      <div className="sb-result-head">
        <div className="sb-result-titles">
          <div className="sb-result-spec">{mat.spec}</div>
          <div className="sb-result-grade">{mat.grade}</div>
        </div>
        <div className="sb-result-tags">
          {isTop ? (
            <span className="sb-tag sb-tag-top">Top pick</span>
          ) : (
            <span className="sb-tag">Alternative</span>
          )}
          <span className={"sb-avail " + availClass}>{availLabel}</span>
        </div>
      </div>
      <div className="sb-result-body">
        {isDfars && mat.dfars && (
          <div className="sb-result-dfars">🇺🇸 DFARS-compliant material available on this spec</div>
        )}
        <p className="sb-result-why">{getWhy(mat, state.app)}</p>
        <div className="sb-spec-grid">
          <div className="sb-spec-cell">
            <label>Tensile</label>
            <span>{mat.tensile}</span>
          </div>
          <div className="sb-spec-cell">
            <label>Temp</label>
            <span>{mat.tempRating}</span>
          </div>
          <div className="sb-spec-cell">
            <label>Diameter</label>
            <span>{mat.diamRange}</span>
          </div>
          <div className="sb-spec-cell">
            <label>Finish</label>
            <span>{mat.finish}</span>
          </div>
        </div>
        <div className="sb-companions">
          <div className="sb-companions-label">Recommended nuts &amp; washers</div>
          {companions.map((c, i) => (
            <span key={i} className="sb-companion">
              <strong>{c.spec}</strong>
              {c.grade}
            </span>
          ))}
        </div>
      </div>
      <div className="sb-result-foot">
        <div className="sb-result-cat">{mat.category}</div>
        <button type="button" className="sb-btn sb-btn-primary" onClick={handleQuote}>
          Request quote →
        </button>
      </div>
    </article>
  );
}
