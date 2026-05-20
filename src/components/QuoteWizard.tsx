"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { pushEvent } from "@/lib/analytics";

/**
 * Four-step quote wizard. `submit()` POSTs the collected fields to
 * /api/forms/quote which forwards to Jotform server-side and returns a
 * submission id. On success the wizard advances to step 5 and fires a
 * `lead_submitted` dataLayer event so GTM can fan out conversions.
 */

const PRODUCTS = [
  { id: "anchor-bolts", title: "Anchor Bolts", desc: "F1554, headed, bent, rod, assemblies" },
  { id: "structural-fasteners", title: "Structural Fasteners", desc: "A325, A490, TC bolts, heavy hex" },
  { id: "industrial-fasteners", title: "Industrial Fasteners", desc: "A193 heavy hex, SHCS, specialty" },
  { id: "stud-bolts-rod", title: "Stud Bolts & Rod", desc: "A193, A320, F1554 threaded rod" },
  { id: "stainless-steel", title: "Stainless Steel", desc: "304, 316, duplex, super duplex" },
  { id: "u-bolts", title: "U-Bolts", desc: "Round & square bend, custom" },
  { id: "silicon-bronze", title: "Silicon Bronze", desc: "Marine, architectural, galvanic" },
  { id: "cnc", title: "CNC Machined Parts", desc: "Built to print, 5-axis, prototype to production" },
  { id: "custom", title: "Custom / Other", desc: "Non-standard, exotic, mixed assemblies" },
];

const GRADE_OPTIONS = [
  "F1554 Grade 55",
  "F1554 Grade 36",
  "F1554 Grade 105",
  "A193 B7",
  "A193 B8M",
  "A325",
  "A490",
  "Other / don't know",
];

const FINISH_OPTIONS = [
  "Plain (black)",
  "Hot-dip galvanized",
  "Zinc plated",
  "Mechanical galvanized",
  "Stainless (passivated)",
];

const ROLES = [
  "Procurement / Buyer",
  "Structural Engineer",
  "Mechanical Engineer",
  "Estimator",
  "Project Manager",
  "Shop / Fabricator",
  "Other",
];

const CERT_OPTIONS = [
  "Mill test reports",
  "Cert of Conformance",
  "AS9102 FAI",
  "Full lot traceability",
  "PPAP",
];

type FileEntry = { name: string; sizeKb: number };

const SAMPLE_FILES: FileEntry[] = [
  { name: "baseplate-assy-rev-C.pdf", sizeKb: 2400 },
  { name: "anchor-bolt-detail.dwg", sizeKb: 824 },
  { name: "BOM-line-items.xlsx", sizeKb: 41 },
];

const FAKE_UPLOAD_NAMES = ["section-detail.pdf", "torque-spec.pdf", "project-photos.zip"];

function formatSize(kb: number): string {
  if (kb >= 1000) return `${(kb / 1000).toFixed(1)} MB`;
  return `${kb} KB`;
}

function fileExt(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "FILE" : name.slice(dot + 1).toUpperCase();
}

export function QuoteWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [product, setProduct] = useState("Anchor Bolts");
  const [grade, setGrade] = useState(GRADE_OPTIONS[0]);
  const [finish, setFinish] = useState("Hot-dip galvanized");
  const [diameter, setDiameter] = useState('3/4″');
  const [length, setLength] = useState('24″');
  const [qty, setQty] = useState(500);
  const [neededBy, setNeededBy] = useState("June 14, 2026");
  const [appNotes, setAppNotes] = useState(
    "Baseplate anchors for a 14-story commercial steel frame, coastal exposure (2 mi from marine). Torque per AISC 348. Full Cert of Conformance and mill test reports required."
  );
  const [certs, setCerts] = useState<Set<string>>(
    new Set(["Mill test reports", "Cert of Conformance"])
  );
  const [files, setFiles] = useState<FileEntry[]>(SAMPLE_FILES);
  const [shipTo, setShipTo] = useState("94558 — Napa, CA");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  function go(n: 1 | 2 | 3 | 4 | 5) {
    setStep(n);
  }

  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  function toggleCert(c: string) {
    setCerts((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }

  function bumpQty(d: number) {
    setQty((v) => Math.max(1, v + d));
  }

  function fakeUpload() {
    const pick = FAKE_UPLOAD_NAMES[Math.floor(Math.random() * FAKE_UPLOAD_NAMES.length)];
    const sizeKb = Math.floor(Math.random() * 2000 + 100);
    setFiles((prev) => [...prev, { name: pick, sizeKb }]);
  }

  async function submit() {
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/forms/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          role,
          product,
          grade,
          finish,
          diameter,
          length,
          qty,
          neededBy,
          shipTo,
          certs: Array.from(certs),
          fileNames: files.map((f) => f.name),
          notes: appNotes,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        formId?: string;
        submissionId?: string | null;
      };
      if (!res.ok || !payload.ok) {
        const code = payload.error ?? `http_${res.status}`;
        setSubmitError(
          code === "invalid_email"
            ? "Please check the email address."
            : code === "missing_name" || code === "missing_email"
              ? "Name and email are required."
              : "Something went wrong sending your request. Please try again, or call us.",
        );
        return;
      }
      pushEvent("lead_submitted", {
        form: "quote",
        form_id: payload.formId,
        submission_id: payload.submissionId,
        product,
      });
      setConfirmationCode(payload.submissionId ?? makeConfirmationCode());
      go(5);
    } catch {
      setSubmitError(
        "We couldn't reach our server. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="qf-hero">
        <div className="qf-hero-eyebrow">Request a Quote</div>
        <h1>{step === 5 ? "Request received." : "Let's build your quote."}</h1>
        <p>
          {step === 5
            ? "We'll be in touch soon."
            : "Four quick steps. We respond in 24 hours with pricing, lead times, and availability."}
        </p>
      </section>

      {/* STEPS BAR */}
      {step !== 5 && (
        <div className="qf-steps" aria-label="Quote wizard progress">
          {(["Product", "Specs", "Drawings", "Contact"] as const).map((label, i) => {
            const idx = (i + 1) as 1 | 2 | 3 | 4;
            const cls =
              idx === step
                ? "qf-step-cell active"
                : idx < step
                ? "qf-step-cell done"
                : "qf-step-cell";
            return (
              <Cell key={label} cls={cls} idx={idx} label={label} done={idx < step} last={idx === 4} />
            );
          })}
        </div>
      )}

      {/* CARD */}
      <div className="qf-card" ref={cardRef}>
        {step === 1 && (
          <>
            <div className="qf-step-head">Step 1 of 4</div>
            <div className="qf-step-title">What are you quoting?</div>
            <div className="qf-step-sub">
              Pick the category that fits best. Not sure? Pick &ldquo;Custom / built to print&rdquo;
              — we&apos;ll sort it out with your drawings.
            </div>
            <div className="qf-product-grid">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`qf-product-card${product === p.title ? " selected" : ""}`}
                  onClick={() => setProduct(p.title)}
                  aria-pressed={product === p.title}
                >
                  <div className="qf-product-mark">◆</div>
                  <div className="qf-product-title">{p.title}</div>
                  <div className="qf-product-desc">{p.desc}</div>
                </button>
              ))}
            </div>
            <div className="qf-step-footer">
              <div className="qf-meta">Tip: you can quote multiple categories in one request.</div>
              <button type="button" className="cf-pill cf-pill--blue" onClick={() => go(2)}>
                Continue ›
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="qf-step-head">Step 2 of 4</div>
            <div className="qf-step-title">Tell us the specs.</div>
            <div className="qf-step-sub">
              Give us what you know. If fields don&apos;t apply, leave them — your drawings and our
              team will fill in the rest.
            </div>
            <div className="qf-form-row">
              <div className="qf-field">
                <label htmlFor="qf-grade">Grade / spec</label>
                <select id="qf-grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="qf-field">
                <label htmlFor="qf-finish">Material finish</label>
                <select id="qf-finish" value={finish} onChange={(e) => setFinish(e.target.value)}>
                  {FINISH_OPTIONS.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div className="qf-field">
                <label htmlFor="qf-dia">Diameter</label>
                <input
                  id="qf-dia"
                  type="text"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  placeholder='e.g. 3/4″ or 20 mm'
                />
              </div>
              <div className="qf-field">
                <label htmlFor="qf-len">Length</label>
                <input
                  id="qf-len"
                  type="text"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder='e.g. 24″ overall'
                />
              </div>
              <div className="qf-field">
                <label htmlFor="qf-qty">Quantity</label>
                <div className="qf-qty">
                  <button type="button" onClick={() => bumpQty(-100)} aria-label="Decrease 100">
                    −
                  </button>
                  <input
                    id="qf-qty"
                    type="text"
                    inputMode="numeric"
                    value={qty}
                    onChange={(e) => {
                      const v = parseInt(e.target.value.replace(/\D/g, ""), 10);
                      setQty(Number.isFinite(v) ? Math.max(1, v) : 1);
                    }}
                  />
                  <button type="button" onClick={() => bumpQty(100)} aria-label="Increase 100">
                    +
                  </button>
                </div>
              </div>
              <div className="qf-field">
                <label htmlFor="qf-need">Needed by</label>
                <input
                  id="qf-need"
                  type="text"
                  value={neededBy}
                  onChange={(e) => setNeededBy(e.target.value)}
                  placeholder="Target ship / install date"
                />
              </div>
              <div className="qf-field qf-field--full">
                <label htmlFor="qf-app">Application / project context</label>
                <textarea
                  id="qf-app"
                  value={appNotes}
                  onChange={(e) => setAppNotes(e.target.value)}
                  placeholder="Helpful: end use, environment, torque requirements, installation conditions, inspection level."
                />
                <div className="qf-field-hint">The more we know, the tighter our quote.</div>
              </div>
              <div className="qf-field qf-field--full">
                <label>Certification &amp; traceability</label>
                <div className="qf-chip-row">
                  {CERT_OPTIONS.map((c) => {
                    const checked = certs.has(c);
                    return (
                      <label key={c} className={`qf-chip${checked ? " checked" : ""}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCert(c)}
                        />
                        {c}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="qf-step-footer">
              <button type="button" className="qf-back" onClick={() => go(1)}>
                Back
              </button>
              <button type="button" className="cf-pill cf-pill--blue" onClick={() => go(3)}>
                Continue ›
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="qf-step-head">Step 3 of 4</div>
            <div className="qf-step-title">Upload your drawings.</div>
            <div className="qf-step-sub">
              Drawings, BOMs, spec sheets, past quotes — we&apos;ll take what you have. PDFs, DWGs,
              STEPs, images, spreadsheets.
            </div>
            <div
              className="qf-upload"
              role="button"
              tabIndex={0}
              onClick={fakeUpload}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fakeUpload();
                }
              }}
            >
              <div className="qf-upload-icon">↑</div>
              <strong>Drag files here, or click to browse</strong>
              <div className="muted">
                Up to 100 MB per file · PDF · DWG · DXF · STEP · STL · PNG · XLSX
              </div>
            </div>
            <div>
              {files.map((f, i) => (
                <div key={`${f.name}-${i}`} className="qf-file-row">
                  <div className="qf-file-ic">{fileExt(f.name)}</div>
                  <div className="qf-file-name">{f.name}</div>
                  <div className="qf-file-size">{formatSize(f.sizeKb)}</div>
                </div>
              ))}
            </div>
            <div className="qf-field" style={{ marginTop: 16 }}>
              <label htmlFor="qf-ship">Ship-to ZIP or project address</label>
              <input
                id="qf-ship"
                type="text"
                value={shipTo}
                onChange={(e) => setShipTo(e.target.value)}
                placeholder="94558"
              />
            </div>
            <div className="qf-step-footer">
              <button type="button" className="qf-back" onClick={() => go(2)}>
                Back
              </button>
              <button type="button" className="cf-pill cf-pill--blue" onClick={() => go(4)}>
                Continue ›
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="qf-step-head">Step 4 of 4</div>
            <div className="qf-step-title">Where should we send it?</div>
            <div className="qf-step-sub">
              We&apos;ll respond within 24 business hours — always from a real person on our team.
            </div>
            <div className="qf-form-row">
              <div className="qf-field">
                <label htmlFor="qf-name">Full name</label>
                <input
                  id="qf-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Ramirez"
                />
              </div>
              <div className="qf-field">
                <label htmlFor="qf-co">Company</label>
                <input
                  id="qf-co"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company"
                />
              </div>
              <div className="qf-field">
                <label htmlFor="qf-em">Email</label>
                <input
                  id="qf-em"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                />
              </div>
              <div className="qf-field">
                <label htmlFor="qf-ph">Phone (optional)</label>
                <input
                  id="qf-ph"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(415) 555-0199"
                />
              </div>
              <div className="qf-field qf-field--full">
                <label htmlFor="qf-role">Role</label>
                <select id="qf-role" value={role} onChange={(e) => setRole(e.target.value)}>
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="qf-review">
              <div className="qf-review-label">Your Request</div>
              <ReviewRow
                label="Product"
                value={product}
                onEdit={() => go(1)}
              />
              <ReviewRow
                label="Specs"
                value={`${grade} · ${finish} · ${diameter} × ${length} · Qty ${qty.toLocaleString("en-US")}`}
                onEdit={() => go(2)}
              />
              <ReviewRow
                label="Drawings"
                value={`${files.length} file${files.length === 1 ? "" : "s"} attached`}
                onEdit={() => go(3)}
              />
              <ReviewRow label="Needed by" value={`${neededBy} · Ship to ${shipTo}`} />
              {certs.size > 0 && (
                <ReviewRow label="Certs" value={Array.from(certs).join(" · ")} />
              )}
            </div>

            {submitError && (
              <div className="qf-submit-error" role="alert">
                {submitError}
              </div>
            )}

            <div className="qf-step-footer">
              <button
                type="button"
                className="qf-back"
                onClick={() => go(3)}
                disabled={submitting}
              >
                Back
              </button>
              <button
                type="button"
                className="cf-pill cf-pill--blue"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Submit Request ›"}
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <div className="qf-success">
            <div className="qf-success-mark" aria-hidden="true">
              ✓
            </div>
            <h2>We&apos;ve got your request.</h2>
            <p>
              A member of our team will be in touch within 24 business hours with pricing, lead
              time, and availability.
            </p>
            <div className="qf-confirm">
              <span className="qf-confirm-label">Confirmation</span>
              <span className="qf-confirm-val">{confirmationCode}</span>
            </div>
            <div className="qf-success-ctas">
              <Link href="/" className="cf-pill">
                Back to home
              </Link>
              <Link href="/spec-library" className="cf-link">
                Browse Spec Library
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Cell({
  cls,
  idx,
  label,
  done,
  last,
}: {
  cls: string;
  idx: 1 | 2 | 3 | 4;
  label: string;
  done: boolean;
  last: boolean;
}) {
  return (
    <>
      <div className={cls} data-step={idx}>
        <div className="qf-step-dot">{done ? "✓" : idx}</div>
        <div className="qf-step-label">{label}</div>
      </div>
      {!last && <div className="qf-step-divider" />}
    </>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
}) {
  return (
    <div className="qf-review-row">
      <div className="label">{label}</div>
      <div className="val">{value}</div>
      {onEdit ? (
        <button type="button" className="edit" onClick={onEdit}>
          Edit
        </button>
      ) : (
        <span style={{ width: 30 }} />
      )}
    </div>
  );
}

/* CF-2026-XXXXX confirmation. Generated once on submit and stored in state,
 * so re-renders show the same code and a fresh submission gets a fresh one. */
function makeConfirmationCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `CF-2026-${suffix}`;
}
