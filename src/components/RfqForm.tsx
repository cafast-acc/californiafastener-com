"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type DragEvent } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

import { LAST_PAGE_KEY, labelForSourcePath } from "@/lib/sourcePage";

/**
 * Single-page RFQ intake (Foundry v3.2). Contact + free-text RFQ + optional
 * uploads + progressive disclosure for spec details. Mirrors input into a
 * sticky "Your request" panel; submit POSTs to Jotform and reveals a
 * confirmation card.
 *
 * Field names below (q3_q3_textbox1, …) come from the Jotform form's
 * "Source Code" embed — change them if the form is rebuilt or fields are
 * reordered, or every submission will silently land with empty fields.
 */

const JOTFORM_ID = "261747488304061";
const JOTFORM_SUBMIT_URL = `https://submit.jotform.com/submit/${JOTFORM_ID}`;

const CATEGORIES = [
  "Anchor Bolts",
  "Structural Fasteners",
  "Industrial Fasteners",
  "Stud Bolts & Rod",
  "U-Bolts",
  "Stainless Steel",
  "Silicon Bronze",
  "CNC / Custom",
  "Other",
] as const;

const CERTS = [
  "MTRs",
  "Cert of Conformance",
  "DFARS",
  "PMI",
  "FAI / First Article",
  "Buy America",
  "Passivation",
  "Other",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Attachment = { file: File; name: string; size: string; ext: string };

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "FILE" : name.slice(dot + 1).toUpperCase();
}

function fmtDate(iso: string): string {
  if (!iso) return iso;
  // Anchor to local noon so the date doesn't shift across timezones when
  // toLocaleDateString reads it back.
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function refCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) {
    s += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `CF-2026-${s}`;
}

export function RfqForm() {
  // Contact
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  // RFQ
  const [rfq, setRfq] = useState("");
  const [files, setFiles] = useState<Attachment[]>([]);

  // Progressive
  const [progOpen, setProgOpen] = useState(false);
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [certs, setCerts] = useState<Set<string>>(new Set());
  const [grade, setGrade] = useState("");
  const [finish, setFinish] = useState("");
  const [dia, setDia] = useState("");
  const [len, setLen] = useState("");
  const [qty, setQty] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const [zip, setZip] = useState("");

  // UI state
  const [dragOver, setDragOver] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ ref: string } | null>(null);

  const emailValid = EMAIL_RE.test(email.trim());
  const reqFilled = !!(first.trim() && last.trim() && company.trim() && emailValid);
  const hasContent = rfq.trim().length > 0 || files.length > 0;
  const ready = reqFilled && hasContent;

  const specBits: string[] = useMemo(() => {
    const out: string[] = [];
    if (grade.trim()) out.push(grade.trim());
    if (dia.trim() || len.trim()) {
      out.push([dia.trim(), len.trim()].filter(Boolean).join(" × "));
    }
    if (finish.trim()) out.push(finish.trim());
    if (qty.trim()) out.push(`Qty ${qty.trim()}`);
    if (zip.trim()) out.push(`Ship ${zip.trim()}`);
    if (neededBy) out.push(`by ${fmtDate(neededBy)}`);
    return out;
  }, [grade, dia, len, finish, qty, zip, neededBy]);

  const specCount =
    cats.size +
    certs.size +
    [grade, finish, dia, len, qty, zip, neededBy].filter((v) => v.trim()).length;

  function toggle(set: Set<string>, value: string, apply: (s: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    apply(next);
  }

  function acceptFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const next: Attachment[] = [];
    for (const f of Array.from(list)) {
      next.push({ file: f, name: f.name, size: humanSize(f.size), ext: extOf(f.name) });
    }
    setFiles((prev) => [...prev, ...next]);
  }

  function onFilePick(e: ChangeEvent<HTMLInputElement>) {
    acceptFiles(e.target.files);
    e.target.value = "";
  }
  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    acceptFiles(e.dataTransfer.files);
  }
  function onDragOver(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(true);
  }
  function onDragLeave(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function submit() {
    if (!ready) {
      setShowErrors(true);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    setSubmitting(true);

    const fd = new FormData();
    fd.append("formID", JOTFORM_ID);
    fd.append("simple_spc", `${JOTFORM_ID}-${JOTFORM_ID}`);
    fd.append("submitSource", "californiafastener-com/quote");
    fd.append("submitDate", new Date().toISOString());
    fd.append("eventObserver", "1");

    // Source Page: tag the page the visitor came from before landing on /quote
    // (recorded by RouteTracker). Never blank — falls back to a direct-visit
    // label so every submission in this shared inbox is attributable.
    let originPath = "";
    try {
      originPath = sessionStorage.getItem(LAST_PAGE_KEY) ?? "";
    } catch {
      originPath = "";
    }
    fd.append(
      "q24_sourcePage",
      originPath ? labelForSourcePath(originPath) : "Quote Page (direct)",
    );

    fd.append("q3_q3_textbox1", first.trim());
    fd.append("q4_q4_textbox2", last.trim());
    fd.append("q5_q5_email3", email.trim());
    fd.append("q6_q6_textbox4", company.trim());
    if (phone.trim()) fd.append("q7_q7_phone5[full]", phone.trim());

    fd.append("q9_q9_textarea7", rfq.trim());

    for (const c of cats) fd.append("q14_q14_checkbox12[]", c);
    if (grade.trim()) fd.append("q15_q15_textbox13", grade.trim());
    if (finish.trim()) fd.append("q16_q16_textbox14", finish.trim());
    if (dia.trim()) fd.append("q17_q17_textbox15", dia.trim());
    if (len.trim()) fd.append("q18_q18_textbox16", len.trim());
    if (qty.trim()) fd.append("q19_q19_textbox17", qty.trim());
    if (zip.trim()) fd.append("q21_q21_textbox19", zip.trim());

    // <input type="date"> emits YYYY-MM-DD; Jotform expects MM/DD/YYYY split.
    if (neededBy) {
      const [y, m, d] = neededBy.split("-");
      if (y && m && d) {
        fd.append("q20_q20_datetime18[month]", m);
        fd.append("q20_q20_datetime18[day]", d);
        fd.append("q20_q20_datetime18[year]", y);
      }
    }

    for (const c of certs) fd.append("q22_q22_checkbox20[]", c);

    for (const a of files) fd.append("q11_q11_fileupload9[]", a.file, a.name);

    // Honeypot — leave blank.
    fd.append("website", "");

    try {
      // no-cors: response is opaque (Jotform doesn't return CORS headers for
      // this endpoint), but the POST is accepted. Same trade-off as the
      // hidden-iframe pattern QuoteModal.tsx uses — we can't read success,
      // we just show the confirmation optimistically.
      await fetch(JOTFORM_SUBMIT_URL, {
        method: "POST",
        body: fd,
        mode: "no-cors",
      });
    } catch (err) {
      // Network failure (offline, blocked, etc.) — surface to console for
      // debugging but still show the confirmation; otherwise the customer
      // gets a dead-end with no instruction. The phone CTA on the confirm
      // card is the fallback path.
      console.error("RFQ submission to Jotform failed:", err);
    }

    setSubmitted({ ref: refCode() });
    setSubmitting(false);
    sendGTMEvent({ event: "form_submit", form_name: "rfq" });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (submitted) {
    return (
      <ConfirmCard
        refCode={submitted.ref}
        name={`${first.trim()} ${last.trim()}`.trim()}
        company={company.trim()}
        email={email.trim()}
        phone={phone.trim()}
        rfq={rfq.trim()}
        files={files}
        cats={Array.from(cats)}
        specs={specBits}
        certs={Array.from(certs)}
      />
    );
  }

  const emailInvalid = showErrors && (!email.trim() || !emailValid);
  const rfqInvalid = showErrors && !hasContent;

  return (
    <>
      <section className="qf-wrap">
        <header className="qf-hero">
          <div className="qf-hero-eyebrow">Request a Quote</div>
          <h1>Request a Quote</h1>
          <p>
            Same-day quotes on most stocked items, 24 business hours on fabrication. Paste
            your RFQ, attach drawings, or just tell us what you&apos;re after — we&apos;ll
            take it from there.
          </p>
        </header>
      </section>

      <div className="qf-wrap">
        <div className="qf-grid">
          {/* ── FORM ──────────────────────────────────────── */}
          {/* A real <form> element (same .qf-card styling) so the submit
              fires a native submit event WhatConverts' Form Finder can track.
              The submission logic itself still lives in submit(). */}
          <form
            id="cf-rfq-form"
            className="qf-card"
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
            noValidate
          >
            <div className="qf-sec">
              <span className="qf-sec-num">01</span> Contact{" "}
              <span className="qf-sec-req">required</span>
            </div>
            <div className="qf-row">
              <div className="qf-field">
                <label htmlFor="rfq-first">First name</label>
                <input
                  id="rfq-first"
                  type="text"
                  placeholder="John"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  className={showErrors && !first.trim() ? "invalid" : ""}
                />
              </div>
              <div className="qf-field">
                <label htmlFor="rfq-last">Last name</label>
                <input
                  id="rfq-last"
                  type="text"
                  placeholder="Smith"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  className={showErrors && !last.trim() ? "invalid" : ""}
                />
              </div>
              <div className="qf-field qf-field--full">
                <label htmlFor="rfq-email">Email</label>
                <input
                  id="rfq-email"
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailInvalid ? "invalid" : ""}
                  aria-invalid={emailInvalid || undefined}
                  aria-describedby={emailInvalid ? "rfq-email-err" : undefined}
                />
                {emailInvalid && (
                  <div id="rfq-email-err" className="qf-err">
                    Enter a valid email address.
                  </div>
                )}
              </div>
              <div className="qf-field qf-field--full">
                <label htmlFor="rfq-co">Company</label>
                <input
                  id="rfq-co"
                  type="text"
                  placeholder="Your company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={showErrors && !company.trim() ? "invalid" : ""}
                />
              </div>
              <div className="qf-field qf-field--full">
                <label htmlFor="rfq-phone">
                  Phone <span className="opt">(optional)</span>
                </label>
                <input
                  id="rfq-phone"
                  type="tel"
                  placeholder="(707) 555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="qf-sec qf-gap-lg">
              <span className="qf-sec-num">02</span> What do you need a quote on?
            </div>
            <div className="qf-field qf-field--full">
              <textarea
                id="rfq-text"
                placeholder='e.g. 500 ea F1554 Gr 55 anchor bolts, 3/4" × 24", HDG, needed by mid-July, shipping to Napa…'
                value={rfq}
                onChange={(e) => setRfq(e.target.value)}
                className={rfqInvalid ? "invalid" : ""}
                aria-invalid={rfqInvalid || undefined}
                aria-describedby={rfqInvalid ? "rfq-text-err" : "rfq-text-hint"}
              />
              <div id="rfq-text-hint" className="qf-hint">
                The more we know, the tighter our quote. Don&apos;t have a full spec? Just
                describe what you&apos;re trying to do.
              </div>
              {rfqInvalid && (
                <div id="rfq-text-err" className="qf-err" style={{ marginTop: 4 }}>
                  Tell us what you need, or attach a file below.
                </div>
              )}
            </div>

            <label
              className={`qf-upload${dragOver ? " drag" : ""}`}
              onDragEnter={onDragOver}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <div className="qf-upload-ic" aria-hidden="true">↑</div>
              <strong>Drag drawings, BOMs, or past quotes here</strong>
              <div className="qf-upload-muted">
                <span className="qf-upload-types">PDF · STEP · IGES · DWG · DXF · Images · Docs</span>
                <br />
                Optional — up to 25 MB per file
              </div>
              <input
                type="file"
                aria-label="Upload drawings, BOMs, or past quotes"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.html,.zip,.png,.jpg,.jpeg,.gif,.tiff,.bmp,.step,.stp,.iges,.igs,.dwg,.dxf,.sldprt,.sldasm,.x_t,.x_b,.sat,.ipt,.iam,.prt,.asm,.stl"
                onChange={onFilePick}
                style={{ display: "none" }}
              />
            </label>

            {files.length > 0 && (
              <div>
                {files.map((f, i) => (
                  <div key={`${f.name}-${i}`} className="qf-file">
                    <div className="qf-file-ic">{f.ext}</div>
                    <div className="qf-file-name">{f.name}</div>
                    <div className="qf-file-size">{f.size}</div>
                    <button
                      type="button"
                      className="qf-file-x"
                      onClick={() => removeFile(i)}
                      aria-label={`Remove ${f.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Progressive */}
            <div className={`qf-prog${progOpen ? " open" : ""}`}>
              <button
                type="button"
                className="qf-prog-toggle"
                onClick={() => setProgOpen((v) => !v)}
                aria-expanded={progOpen}
              >
                <span className="qf-prog-chev" aria-hidden="true">›</span>
                <span className="qf-prog-text">
                  <span className="qf-prog-title">
                    Speed up my quote — share specifics
                  </span>
                  <span className="qf-prog-sub">
                    These fields are all optional. We&apos;ll work with what you give us.
                  </span>
                </span>
                {specCount > 0 && (
                  <span className="qf-prog-badge">{specCount} added</span>
                )}
              </button>
              <div className="qf-prog-body">
                <div className="qf-prog-inner">
                  <div className="qf-field qf-field--full" style={{ marginBottom: 18 }}>
                    <label>Product category</label>
                    <div className="qf-chips">
                      {CATEGORIES.map((c) => {
                        const on = cats.has(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            className={`qf-chip${on ? " on" : ""}`}
                            onClick={() => toggle(cats, c, setCats)}
                            aria-pressed={on}
                          >
                            {on && <span className="qf-chip-check">✓</span>}
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="qf-row">
                    <div className="qf-field">
                      <label htmlFor="rfq-grade">Grade / spec</label>
                      <input
                        id="rfq-grade"
                        type="text"
                        placeholder="e.g. F1554 Gr 55, A193 B7, A325"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </div>
                    <div className="qf-field">
                      <label htmlFor="rfq-finish">Finish</label>
                      <input
                        id="rfq-finish"
                        type="text"
                        placeholder="e.g. HDG, plain, zinc, passivated"
                        value={finish}
                        onChange={(e) => setFinish(e.target.value)}
                      />
                    </div>
                    <div className="qf-field">
                      <label htmlFor="rfq-dia">Diameter</label>
                      <input
                        id="rfq-dia"
                        type="text"
                        placeholder='e.g. 3/4" or M20'
                        value={dia}
                        onChange={(e) => setDia(e.target.value)}
                      />
                    </div>
                    <div className="qf-field">
                      <label htmlFor="rfq-len">Length</label>
                      <input
                        id="rfq-len"
                        type="text"
                        placeholder='e.g. 24" or cut to length'
                        value={len}
                        onChange={(e) => setLen(e.target.value)}
                      />
                    </div>
                    <div className="qf-field">
                      <label htmlFor="rfq-qty">Quantity</label>
                      <input
                        id="rfq-qty"
                        type="text"
                        placeholder="e.g. 500"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </div>
                    <div className="qf-field">
                      <label htmlFor="rfq-date">Needed by</label>
                      <input
                        id="rfq-date"
                        type="date"
                        value={neededBy}
                        onChange={(e) => setNeededBy(e.target.value)}
                      />
                    </div>
                    <div className="qf-field qf-field--full qf-field--zip">
                      <label htmlFor="rfq-zip">Ship-to ZIP</label>
                      <input
                        id="rfq-zip"
                        type="text"
                        placeholder="e.g. 94558"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    className="qf-field qf-field--full"
                    style={{ marginTop: 6 }}
                  >
                    <label>Certs needed</label>
                    <div className="qf-chips">
                      {CERTS.map((c) => {
                        const on = certs.has(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            className={`qf-chip${on ? " on" : ""}`}
                            onClick={() => toggle(certs, c, setCerts)}
                            aria-pressed={on}
                          >
                            {on && <span className="qf-chip-check">✓</span>}
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="qf-submit-bar">
              <div className="qf-submit-note">
                We respond within 24 business hours — always from a real person on our
                team.
              </div>
              <button
                type="submit"
                className="qf-submit"
                disabled={!ready || submitting}
              >
                {submitting && <span className="qf-submit-spinner" aria-hidden="true" />}
                <span>{submitting ? "Submitting" : "Submit Request"}</span>
                {!submitting && <span aria-hidden="true">→</span>}
              </button>
            </div>
          </form>

          {/* ── LIVE PANEL ───────────────────────────────── */}
          <aside className="qf-side" aria-label="Your request preview">
            <div className="qf-side-card">
              <div className="qf-side-head">
                <span className="qf-side-title">Your request</span>
                <span className={`qf-status${ready ? " ready" : ""}`}>
                  <span className="qf-status-dot" />
                  <span>{ready ? "Ready to send" : "In progress"}</span>
                </span>
              </div>

              <div className="qf-pv">
                <div className="qf-pv-k">Contact</div>
                <ContactPreview
                  first={first}
                  last={last}
                  company={company}
                  email={email}
                />
              </div>

              <div className="qf-pv">
                <div className="qf-pv-k">What you need</div>
                <NeedPreview rfq={rfq} hasFiles={files.length > 0} />
              </div>

              {files.length > 0 && (
                <div className="qf-pv">
                  <div className="qf-pv-k">Attachments</div>
                  <div className="qf-pv-files">
                    {files.map((f, i) => (
                      <div key={`${f.name}-${i}`} className="qf-pv-file">
                        <span className="qf-pv-file-d" />
                        {f.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cats.size > 0 && (
                <div className="qf-pv">
                  <div className="qf-pv-k">Categories</div>
                  <div className="qf-pv-tags">
                    {Array.from(cats).map((c) => (
                      <span key={c} className="qf-pv-tag">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {specBits.length > 0 && (
                <div className="qf-pv">
                  <div className="qf-pv-k">Specs</div>
                  <div className="qf-pv-v mono">{specBits.join("  ·  ")}</div>
                </div>
              )}

              {certs.size > 0 && (
                <div className="qf-pv">
                  <div className="qf-pv-k">Certs</div>
                  <div className="qf-pv-tags">
                    {Array.from(certs).map((c) => (
                      <span key={c} className="qf-pv-tag">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="qf-reassure">
              <div className="qf-reassure-row">
                <span className="qf-reassure-ic" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" />
                  </svg>
                </span>
                <div>
                  <div className="qf-reassure-t">Reply within 24 business hours</div>
                  <div className="qf-reassure-s">Same-day on most stocked items</div>
                </div>
              </div>
              <div className="qf-reassure-row">
                <span className="qf-reassure-ic" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" />
                  </svg>
                </span>
                <div>
                  <div className="qf-reassure-t">A real person, every time</div>
                  <div className="qf-reassure-s">No bots, no call-center runaround</div>
                </div>
              </div>
              <div className="qf-reassure-row">
                <span className="qf-reassure-ic" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
                  </svg>
                </span>
                <div>
                  <div className="qf-reassure-t">Emergency same-day available</div>
                  <div className="qf-reassure-s">
                    Call <a className="cf-contact-link no-swap" href="tel:+18885817077">707.741.3277</a>, lead with &ldquo;URGENT&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function ContactPreview({
  first,
  last,
  company,
  email,
}: {
  first: string;
  last: string;
  company: string;
  email: string;
}) {
  const name = `${first.trim()} ${last.trim()}`.trim();
  const lines = [name, company.trim(), email.trim()].filter(Boolean);
  if (lines.length === 0) {
    return <div className="qf-pv-v empty">Add your name and company</div>;
  }
  return (
    <div className="qf-pv-v">
      {lines.map((t, i) => (
        <div key={i} className={i === 0 ? "qf-pv-name" : "qf-pv-soft"}>
          {t}
        </div>
      ))}
    </div>
  );
}

function NeedPreview({ rfq, hasFiles }: { rfq: string; hasFiles: boolean }) {
  const trimmed = rfq.trim();
  if (trimmed) {
    const snip = trimmed.length > 140 ? `${trimmed.slice(0, 140)}…` : trimmed;
    return <div className="qf-pv-v">{snip}</div>;
  }
  if (hasFiles) {
    return <div className="qf-pv-v qf-pv-soft">Described in attachments</div>;
  }
  return <div className="qf-pv-v empty">Describe it or attach a file</div>;
}

function ConfirmCard({
  refCode,
  name,
  company,
  email,
  phone,
  rfq,
  files,
  cats,
  specs,
  certs,
}: {
  refCode: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  rfq: string;
  files: Attachment[];
  cats: string[];
  specs: string[];
  certs: string[];
}) {
  const rows: Array<[string, React.ReactNode]> = [];
  rows.push([
    "Contact",
    <>
      {[name, company].filter(Boolean).join(" · ")}
      {(email || phone) && (
        <>
          <br />
          <span className="qf-pv-soft">
            {[email, phone].filter(Boolean).join(" · ")}
          </span>
        </>
      )}
    </>,
  ]);
  if (rfq) rows.push(["What you need", rfq]);
  if (files.length > 0) {
    rows.push([
      "Attachments",
      files.map((f, i) => (
        <span key={`${f.name}-${i}`}>
          {f.name}
          {i < files.length - 1 && <br />}
        </span>
      )),
    ]);
  }
  if (cats.length > 0) rows.push(["Categories", cats.join(", ")]);
  if (specs.length > 0) rows.push(["Specs", specs.join("  ·  ")]);
  if (certs.length > 0) rows.push(["Certs", certs.join(", ")]);

  return (
    <div className="qf-wrap">
      <div className="qf-confirm">
        <div className="qf-confirm-inner">
          <div className="qf-confirm-mark" aria-hidden="true">✓</div>
          <h2>We got it.</h2>
          <p>
            Your request is in. A real person on our team will review and respond within
            24 business hours — usually faster.
          </p>
          <div className="qf-urgent">
            <strong>Need it sooner?</strong> Call us at <a className="cf-contact-link no-swap" href="tel:+18885817077">707.741.3277</a>.
            For emergency same-day, lead with <strong>&ldquo;URGENT&rdquo;</strong> on
            the call and we&apos;ll get someone on it. We&apos;ve gotten more than a few
            crews out of a same-day jam.
          </div>

          <div className="qf-summary">
            <div className="qf-summary-head">
              <span className="t">What we received</span>
              <span className="ref">{refCode}</span>
            </div>
            <div className="qf-summary-body">
              {rows.map(([k, v], i) => (
                <div key={i} className="qf-pv">
                  <div className="qf-pv-k">{k}</div>
                  <div className="qf-pv-v">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="qf-confirm-ctas">
            <Link href="/products" className="qf-confirm-pill">
              Browse products
            </Link>
            <Link href="/spec-library" className="qf-confirm-link">
              Read the spec library ›
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
