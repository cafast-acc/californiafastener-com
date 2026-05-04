"use client";

import { useMemo, useState } from "react";
import {
  buildSku,
  FINISH_AVAIL,
  FINISH_LABELS,
  HEAD_LABELS,
  HEAD_SIZE_AVAIL,
  inchToFraction,
  PRODUCTS,
  type Finish,
  type HeadType,
  type Product,
  type Size,
} from "@/lib/holloBolt/data";

type CartItem = Product & { sku: string; finish: Finish; qty: number };

const HEAD_OPTIONS: { value: HeadType; label: string }[] = [
  { value: "HEX", label: "Hex" },
  { value: "CSK", label: "Countersunk" },
  { value: "FF", label: "Flush Fit" },
];
const SIZE_OPTIONS: Size[] = ["5/16", "3/8", "1/2", "5/8", "3/4"];

export function HolloBoltSelector() {
  const [head, setHead] = useState<HeadType>("HEX");
  const [size, setSize] = useState<Size>("5/16");
  const [finish, setFinish] = useState<Finish>("ZN");
  const [outer, setOuter] = useState(0.375);
  const [inner, setInner] = useState(0.25);
  const [project, setProject] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  const totalGrip = outer + inner;
  const sizeOk = HEAD_SIZE_AVAIL[head].includes(size);
  const finishOk = FINISH_AVAIL[head][finish];

  const matches = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          p.head === head &&
          p.size === size &&
          totalGrip >= p.gripMin &&
          totalGrip <= p.gripMax
      ).sort((a, b) => a.len - b.len),
    [head, size, totalGrip]
  );

  const alternates = useMemo(() => {
    if (matches.length > 0 || !sizeOk || !finishOk) return [];
    return PRODUCTS.filter((p) => p.head === head && p.size === size)
      .sort((a, b) => {
        const distA = Math.min(Math.abs(totalGrip - a.gripMin), Math.abs(totalGrip - a.gripMax));
        const distB = Math.min(Math.abs(totalGrip - b.gripMin), Math.abs(totalGrip - b.gripMax));
        return distA - distB;
      })
      .slice(0, 3);
  }, [head, size, totalGrip, matches.length, sizeOk, finishOk]);

  function flashToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function addToCart(p: Product) {
    const sku = buildSku(p, finish);
    setCart((prev) => {
      const existing = prev.find((i) => i.sku === sku);
      if (existing) {
        return prev.map((i) => (i.sku === sku ? { ...i, qty: i.qty + 10 } : i));
      }
      return [...prev, { ...p, sku, finish, qty: 10 }];
    });
    setRecentlyAdded(sku);
    setTimeout(() => setRecentlyAdded(null), 1400);
    if (cart.length === 0) setCartOpen(true);
    flashToast(`Added ${sku} to quote cart`);
  }

  function changeQty(sku: string, delta: number) {
    setCart((prev) =>
      prev.map((i) => (i.sku === sku ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  }

  function setQty(sku: string, qty: number) {
    setCart((prev) =>
      prev.map((i) => (i.sku === sku ? { ...i, qty: Math.max(1, qty || 1) } : i))
    );
  }

  function removeFromCart(sku: string) {
    setCart((prev) => prev.filter((i) => i.sku !== sku));
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="hbs-root">
      <header className="hbs-header">
        <h2>Hollo-Bolt Selector</h2>
        <p>
          Specify the correct Lindapter Hollo-Bolt for your steel-to-HSS connection. Filter by head
          type, diameter, finish, and fixing thickness — then request a quote directly from
          California Fastener. Authorized distributor, no login required.
        </p>
        <div className="hbs-badges">
          <span className="hbs-badge">ICC-ES ESR-3330</span>
          <span className="hbs-badge">Seismic SDC A–F</span>
          <span className="hbs-badge accent">Authorized Distributor</span>
        </div>
      </header>

      <div className="hbs-grid">
        <aside className="hbs-filters" aria-label="Hollo-Bolt filter controls">
          <h3>Specify your connection</h3>

          <div className="hbs-field">
            <label className="hbs-label">Head type</label>
            <div className="hbs-segmented" role="radiogroup" aria-label="Head type">
              {HEAD_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={`hbs-seg-btn ${head === o.value ? "active" : ""}`}
                  onClick={() => setHead(o.value)}
                  role="radio"
                  aria-checked={head === o.value}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hbs-field">
            <label className="hbs-label">
              Bolt diameter<span className="hint"> — inches</span>
            </label>
            <div className="hbs-segmented" role="radiogroup" aria-label="Bolt diameter">
              {SIZE_OPTIONS.map((s) => {
                const disabled = !HEAD_SIZE_AVAIL[head].includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    className={`hbs-seg-btn ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                    role="radio"
                    aria-checked={size === s}
                    disabled={disabled}
                    title={disabled ? "Not available with this head type" : undefined}
                  >
                    {s}&quot;
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hbs-field">
            <label className="hbs-label">Finish / corrosion protection</label>
            <select
              className="hbs-select"
              value={finish}
              onChange={(e) => setFinish(e.target.value as Finish)}
            >
              {(Object.keys(FINISH_LABELS) as Finish[]).map((f) => (
                <option key={f} value={f} disabled={!FINISH_AVAIL[head][f]}>
                  {FINISH_LABELS[f]}
                  {!FINISH_AVAIL[head][f] ? " — n/a" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="hbs-field">
            <label className="hbs-label">Fixing thickness</label>
            <div className="hbs-dual-input">
              <div>
                <span className="hbs-sublabel">Outer ply (in)</span>
                <input
                  type="number"
                  className="hbs-input"
                  value={outer}
                  step={0.0625}
                  min={0}
                  max={4}
                  onChange={(e) => setOuter(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <span className="hbs-sublabel">Inner ply (in)</span>
                <input
                  type="number"
                  className="hbs-input"
                  value={inner}
                  step={0.0625}
                  min={0}
                  max={2}
                  onChange={(e) => setInner(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="hbs-total">
              Total grip required: <strong>{inchToFraction(totalGrip)}</strong>
            </div>
          </div>

          <div className="hbs-field">
            <label className="hbs-label">
              Project reference<span className="hint"> (optional)</span>
            </label>
            <input
              type="text"
              className="hbs-input"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="e.g. Oakland Warehouse Retrofit"
            />
          </div>

          <div className="hbs-btn-row">
            <button
              type="button"
              className="hbs-btn ghost"
              onClick={() => {
                setHead("HEX");
                setSize("5/16");
                setFinish("ZN");
                setOuter(0.375);
                setInner(0.25);
                setProject("");
              }}
            >
              Reset
            </button>
          </div>
        </aside>

        <section className="hbs-results" aria-live="polite">
          <h3>Matching products</h3>
          <div className="hbs-result-meta">
            {!sizeOk ? (
              <>
                <strong>{size}&quot;</strong> is not available with{" "}
                <strong>{HEAD_LABELS[head]}</strong> head. Try a different size or head type.
              </>
            ) : !finishOk ? (
              <>
                <strong>{FINISH_LABELS[finish]}</strong> is not available with{" "}
                <strong>{HEAD_LABELS[head]}</strong> head. Switch to a compatible finish below.
              </>
            ) : (
              <>
                <strong>{matches.length}</strong>{" "}
                {matches.length === 1 ? "product matches" : "products match"}{" "}
                <strong>
                  {size}&quot; {HEAD_LABELS[head]}
                </strong>
                , <strong>{FINISH_LABELS[finish]}</strong>, total grip{" "}
                <strong>{inchToFraction(totalGrip)}</strong>.
              </>
            )}
          </div>
          <div className="hbs-result-grid">
            {!sizeOk ? (
              <div className="hbs-empty">
                <h4>Size not available for this head type</h4>
                <p>
                  {head === "FF"
                    ? "Flush Fit is only manufactured in 5/16\", 3/8\", and 1/2\"."
                    : 'Countersunk is only manufactured in 5/16", 3/8", 1/2", and 5/8".'}
                </p>
              </div>
            ) : !finishOk ? (
              <div className="hbs-empty">
                <h4>Finish not available</h4>
                <p>
                  This head type is available in:{" "}
                  {(Object.keys(FINISH_AVAIL[head]) as Finish[])
                    .filter((f) => FINISH_AVAIL[head][f])
                    .map((f) => FINISH_LABELS[f])
                    .join(", ")}
                  .
                </p>
              </div>
            ) : matches.length === 0 ? (
              <div className="hbs-empty">
                <h4>No product matches your exact fixing thickness</h4>
                <p>
                  Your total grip ({inchToFraction(totalGrip)}) is outside the range for this
                  size/head combination. Nearest alternatives:
                </p>
                <ul>
                  {alternates.map((p) => (
                    <li key={`${p.head}-${p.size}-${p.len}`}>
                      <strong>{buildSku(p, finish)}</strong> — grip {p.gripDisp}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              matches.map((p, i) => (
                <ResultCard
                  key={`${p.head}-${p.size}-${p.len}`}
                  p={p}
                  finish={finish}
                  totalGrip={totalGrip}
                  outer={outer}
                  recommended={i === 0 && matches.length > 1}
                  recentlyAdded={recentlyAdded === buildSku(p, finish)}
                  onAdd={() => addToCart(p)}
                />
              ))
            )}
          </div>
        </section>
      </div>

      <footer className="hbs-footer">
        Load values shown are Safe Working Loads per the Lindapter April 2026 US catalog (FOS 5:1).
        For ICC-ES ESR-3330 design strengths (LRFD/ASD) or seismic applications, contact us at{" "}
        <a href="mailto:sales@californiafastener.com">sales@californiafastener.com</a> or call (707)
        741-3277. California Fastener is an authorized Lindapter distributor.
      </footer>

      <aside className={`hbs-cart ${cartOpen ? "open" : ""}`} aria-label="Quote cart">
        <div
          className="hbs-cart-handle"
          role="button"
          tabIndex={0}
          aria-expanded={cartOpen}
          onClick={() => setCartOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setCartOpen((v) => !v);
            }
          }}
        >
          <div>
            <span className="hbs-cart-handle-label">Quote Cart</span>
            <span className="hbs-cart-count">{cartCount}</span>
          </div>
          <span className="hbs-cart-chevron" aria-hidden="true">
            ▲
          </span>
        </div>
        <div className="hbs-cart-body">
          {cart.length === 0 ? (
            <div className="hbs-cart-empty">
              Your quote cart is empty. Add Hollo-Bolts from the results above to request pricing.
            </div>
          ) : (
            <>
              <div className="hbs-cart-items">
                {cart.map((item) => (
                  <div key={item.sku} className="hbs-cart-item">
                    <div>
                      <div className="hbs-cart-sku">{item.sku}</div>
                      <div className="hbs-cart-desc">
                        {item.size}&quot; {HEAD_LABELS[item.head]} · {FINISH_LABELS[item.finish]}
                        {item.hcf ? " · HCF" : ""} · grip {item.gripDisp}
                      </div>
                    </div>
                    <div className="hbs-qty-group">
                      <button
                        type="button"
                        className="hbs-qty-btn"
                        onClick={() => changeQty(item.sku, -1)}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="hbs-qty-input"
                        value={item.qty}
                        min={1}
                        max={99999}
                        onChange={(e) => setQty(item.sku, parseInt(e.target.value, 10))}
                        aria-label="Quantity"
                      />
                      <button
                        type="button"
                        className="hbs-qty-btn"
                        onClick={() => changeQty(item.sku, 1)}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="hbs-remove"
                      onClick={() => removeFromCart(item.sku)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <form
                className="hbs-quote-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  flashToast("Quote request received — we'll be in touch.");
                }}
              >
                <div className="hbs-field">
                  <label htmlFor="hbs-f-name">Name</label>
                  <input id="hbs-f-name" type="text" className="hbs-input" required />
                </div>
                <div className="hbs-field">
                  <label htmlFor="hbs-f-company">Company</label>
                  <input id="hbs-f-company" type="text" className="hbs-input" />
                </div>
                <div className="hbs-field">
                  <label htmlFor="hbs-f-email">Email</label>
                  <input id="hbs-f-email" type="email" className="hbs-input" required />
                </div>
                <div className="hbs-field">
                  <label htmlFor="hbs-f-phone">Phone</label>
                  <input id="hbs-f-phone" type="tel" className="hbs-input" />
                </div>
                <div className="hbs-field full">
                  <label htmlFor="hbs-f-notes">
                    Application notes<span className="hint"> (optional)</span>
                  </label>
                  <input
                    id="hbs-f-notes"
                    type="text"
                    className="hbs-input"
                    placeholder="HSS size, loading, timeline, delivery…"
                  />
                </div>
                <button type="submit" className="hbs-submit" disabled={submitted}>
                  {submitted ? "Sent ✓ — we'll be in touch" : "Request Quote"}
                </button>
              </form>
            </>
          )}
        </div>
      </aside>

      {toast && <div className="hbs-toast show">{toast}</div>}
    </div>
  );
}

function ResultCard({
  p,
  finish,
  totalGrip,
  outer,
  recommended,
  recentlyAdded,
  onAdd,
}: {
  p: Product;
  finish: Finish;
  totalGrip: number;
  outer: number;
  recommended: boolean;
  recentlyAdded: boolean;
  onAdd: () => void;
}) {
  const sku = buildSku(p, finish);
  const outerWarn = p.outerMin > 0 && outer < p.outerMin;

  return (
    <article className={`hbs-card ${recommended ? "recommended" : ""}`} data-sku={sku}>
      <div>
        <div className="hbs-card-sku">{sku}</div>
        <div className="hbs-card-subtitle">
          {p.size}&quot; {HEAD_LABELS[p.head]} · {FINISH_LABELS[finish]}
          {p.hcf && <span className="hbs-hcf-tag">HCF</span>}
        </div>
      </div>
      <div className="hbs-specs">
        <span className="hbs-spec-label">Grip range</span>
        <span className="hbs-spec-value">{p.gripDisp}</span>
        <span className="hbs-spec-label">Total length</span>
        <span className="hbs-spec-value">{p.lengthIn}</span>
        <span className="hbs-spec-label">Torque</span>
        <span className="hbs-spec-value">{p.torque} ft·lb</span>
        <span className="hbs-spec-label">Your grip</span>
        <span className="hbs-spec-value">{inchToFraction(totalGrip)}</span>
      </div>
      <div className="hbs-loads">
        <div className="hbs-load-tile">
          <div className="hbs-load-label">Tensile SWL</div>
          <div className="hbs-load-value">{p.tensile.toLocaleString("en-US")}</div>
          <div className="hbs-load-unit">lbs (FOS 5:1)</div>
        </div>
        <div className="hbs-load-tile">
          <div className="hbs-load-label">Shear SWL</div>
          <div className="hbs-load-value">{p.shear.toLocaleString("en-US")}</div>
          <div className="hbs-load-unit">lbs (FOS 5:1)</div>
        </div>
      </div>
      {outerWarn && (
        <div className="hbs-warn">
          ⚠ This size requires min outer ply of {inchToFraction(p.outerMin)}. Your outer is{" "}
          {inchToFraction(outer)}.
        </div>
      )}
      {p.hcf && (
        <div className="hbs-warn success">
          ✓ High Clamping Force design — 3× standard clamping force.
        </div>
      )}
      <button
        className={`hbs-add-btn ${recentlyAdded ? "added" : ""}`}
        onClick={onAdd}
        type="button"
      >
        {recentlyAdded ? "✓ Added" : "Add to Quote"}
      </button>
    </article>
  );
}
