"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Img } from "@/components/Img";
import {
  calc,
  defaultSize,
  getDims,
  getSizes,
  INITIAL_STATE,
  MATERIAL_GROUP_ORDER,
  MATERIALS,
  needsLen,
  needsThread,
  SYSTEM_DEFAULTS,
  TYPES,
  type CalcState,
  type FastenerTypeId,
  type UnitSystem,
} from "@/lib/boltWeight/data";

// ── Type icons ───────────────────────────────────────────────
// hex / hvyhex / shcs / nut / hvynut use the prototype's embedded base64 photos,
// extracted into /public/assets/bolt-weight/*.png. SVG_ROD / SVG_WASHER /
// SVG_SQWASH are ported verbatim from the prototype's inline SVG strings.
const ROD_THREADS = Array.from({ length: 13 }, (_, i) => 6 + i * 3);

const TYPE_ICONS: Record<FastenerTypeId, ReactNode> = {
  hex: <Img src="/assets/bolt-weight/hex-bolt.png" alt="" />,
  hvyhex: <Img src="/assets/bolt-weight/hex-bolt.png" alt="" />,
  shcs: <Img src="/assets/bolt-weight/socket-cap.png" alt="" />,
  rod: (
    <svg viewBox="0 0 48 48" width="44" height="44" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="2" width="12" height="44" fill="#c8c8d0" stroke="#2d2d32" strokeWidth={2} />
      {ROD_THREADS.map((y) => (
        <line key={y} x1="18" y1={y} x2="30" y2={y} stroke="#a0a0aa" strokeWidth={1.2} />
      ))}
      <path d="M18,2 L24,0 L30,2" fill="#c8c8d0" stroke="#2d2d32" strokeWidth={1.5} />
      <path d="M18,46 L24,48 L30,46" fill="#c8c8d0" stroke="#2d2d32" strokeWidth={1.5} />
    </svg>
  ),
  nut: <Img src="/assets/bolt-weight/hex-nut.png" alt="" />,
  hvynut: <Img src="/assets/bolt-weight/hex-nut.png" alt="" />,
  washer: (
    <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
      <circle cx="24" cy="24" r="20" fill="#c8c8d0" stroke="#2d2d32" strokeWidth={2} />
      <path d="M10,14 A20,20 0 0,1 38,14" fill="#d8d8de" stroke="none" />
      <circle cx="24" cy="24" r="20" fill="none" stroke="#2d2d32" strokeWidth={2} />
      <circle cx="24" cy="24" r="17" fill="none" stroke="#a0a0aa" strokeWidth={0.8} />
      <circle cx="24" cy="24" r="8" fill="#fff" stroke="#2d2d32" strokeWidth={2} />
      <circle cx="24" cy="24" r="9.5" fill="none" stroke="#a0a0aa" strokeWidth={0.6} />
    </svg>
  ),
  sqwash: (
    <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
      <rect x="4" y="4" width="40" height="40" fill="#c8c8d0" stroke="#2d2d32" strokeWidth={2} />
      <path d="M4,4 L44,4 L44,18 L4,18 Z" fill="#d8d8de" stroke="none" />
      <rect x="4" y="4" width="40" height="40" fill="none" stroke="#2d2d32" strokeWidth={2} />
      <rect x="7" y="7" width="34" height="34" fill="none" stroke="#a0a0aa" strokeWidth={0.8} />
      <circle cx="24" cy="24" r="8" fill="#fff" stroke="#2d2d32" strokeWidth={2} />
      <circle cx="24" cy="24" r="9.5" fill="none" stroke="#a0a0aa" strokeWidth={0.6} />
    </svg>
  ),
};

const CHECK = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l4 4L19 7" />
  </svg>
);

function SpecCell({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bwc-spec-cell">
      <label>{label}</label>
      <span>
        {value} <span className="bwc-spec-unit">{unit}</span>
      </span>
    </div>
  );
}

export function BoltWeightCalculator() {
  const [state, setState] = useState<CalcState>(INITIAL_STATE);

  const sizes = useMemo(() => getSizes(state.tid, state.sys), [state.tid, state.sys]);
  const result = useMemo(() => calc(state), [state]);
  const dims = useMemo(() => getDims(state), [state]);

  const unit = state.sys === "metric" ? "mm" : "in";
  const typeLabel = TYPES.find((t) => t.id === state.tid)?.label ?? "";

  // Select a type — snap the size to a sensible default if the current one
  // isn't valid for the new type.
  function selectType(id: FastenerTypeId) {
    setState((s) => {
      const next = getSizes(id, s.sys);
      const sk = next.includes(s.sk) ? s.sk : defaultSize(id, s.sys);
      return { ...s, tid: id, sk };
    });
  }

  // Toggle units — reset size to default and rewrite length/thread/plate defaults.
  function setSystem(sys: UnitSystem) {
    setState((s) => ({
      ...s,
      sys,
      sk: defaultSize(s.tid, sys),
      ...SYSTEM_DEFAULTS[sys],
    }));
  }

  function update<K extends keyof CalcState>(key: K, value: CalcState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  const num = (v: string) => parseFloat(v) || 0;

  // Material optgroups, grouped + ordered.
  const materialGroups = useMemo(() => {
    const groups: Record<string, string[]> = {};
    for (const [name, { group }] of Object.entries(MATERIALS)) {
      (groups[group] ??= []).push(name);
    }
    return MATERIAL_GROUP_ORDER.filter((g) => groups[g]).map((g) => ({ group: g, names: groups[g] }));
  }, []);

  return (
    <>
      {/* ── 01 TYPE ────────────────────────────────────────── */}
      <section className="bwc-section">
        <div className="bwc-section-head">
          <div className="bwc-section-eyebrow">
            <span className="bwc-stepnum">1</span>Fastener type
          </div>
          <div className="bwc-section-title">What are you weighing?</div>
        </div>
        <div className="bwc-types">
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`bwc-type${state.tid === t.id ? " is-selected" : ""}`}
              data-heavy={t.heavy ? "" : undefined}
              aria-pressed={state.tid === t.id}
              onClick={() => selectType(t.id)}
            >
              <span className="bwc-type-check">{CHECK}</span>
              <div className="bwc-type-icon">{TYPE_ICONS[t.id]}</div>
              <div className="bwc-type-title">{t.label}</div>
              <div className="bwc-type-desc">{t.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── 02 CONFIGURE ───────────────────────────────────── */}
      <section className="bwc-section">
        <div className="bwc-section-head">
          <div className="bwc-section-eyebrow">
            <span className="bwc-stepnum">2</span>Configure
          </div>
          <div className="bwc-section-title">Size, material, and quantity.</div>
        </div>
        <div className="bwc-cfg">
          <div className="bwc-cfg-grid">
            <div className="bwc-field full">
              <span className="bwc-field-label">Unit system</span>
              <div className="bwc-toggle" role="tablist" aria-label="Unit system">
                <button
                  type="button"
                  role="tab"
                  aria-selected={state.sys === "imperial"}
                  className={`bwc-toggle-btn${state.sys === "imperial" ? " is-active" : ""}`}
                  onClick={() => setSystem("imperial")}
                >
                  Imperial (in)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={state.sys === "metric"}
                  className={`bwc-toggle-btn${state.sys === "metric" ? " is-active" : ""}`}
                  onClick={() => setSystem("metric")}
                >
                  Metric (mm)
                </button>
              </div>
            </div>

            <div className="bwc-field">
              <label className="bwc-field-label" htmlFor="bwc-size">
                Bolt size
              </label>
              <select
                className="bwc-select"
                id="bwc-size"
                value={state.sk}
                onChange={(e) => update("sk", e.target.value)}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="bwc-field">
              <label className="bwc-field-label" htmlFor="bwc-qty">
                Quantity
              </label>
              <input
                className="bwc-input"
                id="bwc-qty"
                type="number"
                step={1}
                min={1}
                value={state.qty}
                onChange={(e) => update("qty", Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            <div className="bwc-field full">
              <label className="bwc-field-label" htmlFor="bwc-mat">
                Material
              </label>
              <select
                className="bwc-select"
                id="bwc-mat"
                value={state.mat}
                onChange={(e) => update("mat", e.target.value)}
              >
                {materialGroups.map(({ group, names }) => (
                  <optgroup key={group} label={`── ${group} ──`}>
                    {names.map((name) => (
                      <option key={name} value={name}>
                        {name} — {(MATERIALS[name].density * 27.68).toFixed(2)} g/cm³
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {needsLen(state.tid) && (
              <div className="bwc-field">
                <label className="bwc-field-label" htmlFor="bwc-length">
                  Overall length ({unit})
                </label>
                <input
                  className="bwc-input"
                  id="bwc-length"
                  type="number"
                  step="any"
                  min={0.1}
                  value={state.len}
                  onChange={(e) => update("len", num(e.target.value))}
                />
              </div>
            )}

            {needsThread(state.tid) && (
              <div className="bwc-field">
                <label className="bwc-field-label" htmlFor="bwc-thread">
                  Thread length ({unit})
                </label>
                <input
                  className="bwc-input"
                  id="bwc-thread"
                  type="number"
                  step="any"
                  min={0}
                  value={state.tlen}
                  onChange={(e) => update("tlen", num(e.target.value))}
                />
              </div>
            )}

            {state.tid === "sqwash" && (
              <>
                <div className="bwc-field">
                  <label className="bwc-field-label" htmlFor="bwc-sqlen">
                    Plate length ({unit})
                  </label>
                  <input
                    className="bwc-input"
                    id="bwc-sqlen"
                    type="number"
                    step="any"
                    min={0.1}
                    value={state.sqlen}
                    onChange={(e) => update("sqlen", num(e.target.value))}
                  />
                </div>
                <div className="bwc-field">
                  <label className="bwc-field-label" htmlFor="bwc-sqwid">
                    Plate width ({unit})
                  </label>
                  <input
                    className="bwc-input"
                    id="bwc-sqwid"
                    type="number"
                    step="any"
                    min={0.1}
                    value={state.sqwid}
                    onChange={(e) => update("sqwid", num(e.target.value))}
                  />
                </div>
                <div className="bwc-field">
                  <label className="bwc-field-label" htmlFor="bwc-sqthk">
                    Plate thickness ({unit})
                  </label>
                  <input
                    className="bwc-input"
                    id="bwc-sqthk"
                    type="number"
                    step="any"
                    min={0.01}
                    value={state.sqthk}
                    onChange={(e) => update("sqthk", num(e.target.value))}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── 03 RESULTS ─────────────────────────────────────── */}
      <section className="bwc-section">
        <div className="bwc-section-head">
          <div className="bwc-section-eyebrow">
            <span className="bwc-stepnum">3</span>Weight estimate
          </div>
          <div className="bwc-section-title">{typeLabel}</div>
        </div>

        <div className="bwc-results-summary">
          <span className="bwc-summary-pill">
            <strong>Size</strong>
            {state.sk}
          </span>
          <span className="bwc-summary-pill">
            <strong>Material</strong>
            {state.mat}
          </span>
          {needsLen(state.tid) && (
            <span className="bwc-summary-pill">
              <strong>Length</strong>
              {state.len} {unit}
            </span>
          )}
          {state.tid === "sqwash" && (
            <span className="bwc-summary-pill">
              <strong>Plate</strong>
              {state.sqlen}×{state.sqwid}×{state.sqthk} {unit}
            </span>
          )}
          <span className="bwc-summary-pill">
            <strong>Qty</strong>
            {state.qty.toLocaleString()}
          </span>
        </div>

        {result ? (
          <>
            <div className="bwc-total">
              <div className="bwc-total-label">Total lot weight</div>
              <div className="bwc-total-value">
                {result.tL.toFixed(2)}
                <span className="bwc-total-unit">lbs</span>
              </div>
              <div className="bwc-total-sub">{result.tK.toFixed(2)} kg</div>
              <div className="bwc-total-qty">× {state.qty.toLocaleString()} pieces</div>
            </div>

            <div className="bwc-card">
              <div className="bwc-card-head">
                <div className="bwc-card-title">Weight per piece</div>
                <div className="bwc-card-badge">Each</div>
              </div>
              <div className="bwc-spec-grid">
                <SpecCell label="Pounds" value={result.eL.toFixed(4)} unit="lbs" />
                <SpecCell label="Ounces" value={result.eO.toFixed(2)} unit="oz" />
                <SpecCell label="Grams" value={result.eG.toFixed(1)} unit="g" />
                <SpecCell label="Kilograms" value={result.eK.toFixed(4)} unit="kg" />
              </div>
            </div>

            {dims.rows.length > 0 && (
              <div className="bwc-card">
                <div className="bwc-card-head">
                  <div className="bwc-card-title">Dimensions used</div>
                  <div className="bwc-card-badge">{dims.u}</div>
                </div>
                <div className="bwc-spec-grid">
                  {dims.rows.map(([label, value]) => (
                    <SpecCell key={label} label={label} value={String(value)} unit={dims.u} />
                  ))}
                </div>
              </div>
            )}

            <div className="bwc-quote-cta">
              <p>Ready to order this fastener? Send the spec to our team for pricing and lead time.</p>
              <Link href="/quote" className="bwc-pill">
                Request a quote
              </Link>
            </div>
          </>
        ) : (
          <div className="bwc-noresult">
            <h3>No data for this combination</h3>
            <p>This size isn&apos;t available for the selected fastener type. Try a different size or switch types.</p>
          </div>
        )}

        <div className="bwc-disclaimer">
          <strong>Note:</strong> Approximate weight — a ±5–10% variance is normal due to manufacturing
          tolerances, thread form, chamfers, coatings, and head markings. For binding quotes, send the spec
          to our team.
        </div>
      </section>
    </>
  );
}
