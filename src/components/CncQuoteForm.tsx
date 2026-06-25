"use client";

import { useState } from "react";

/**
 * Inline RFQ form for /cnc-machining. Posts to the dedicated "CNC Machining
 * Quote Request" Jotform (separate from /quote and the Hollo-Bolt form) so the
 * team gets these in their own inbox. Drawings/STEP files ride along in the
 * multipart body. Uses mode: "no-cors" — the response is opaque (Jotform's
 * submit endpoint sends no CORS headers) but the POST is accepted, so we
 * confirm optimistically (same pattern as RfqForm.tsx).
 *
 * HTML field names follow Jotform's q{qid}_{name} convention; keep them in
 * sync if the form's fields are rebuilt.
 */
const CNC_JOTFORM_ID = "261757857130059";
const CNC_SUBMIT_URL = `https://submit.jotform.com/submit/${CNC_JOTFORM_ID}`;

export function CncQuoteForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || sent) return;

    const form = e.currentTarget;
    const get = (id: string) => {
      const el = form.querySelector(`#${id}`) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;
      return el?.value.trim() ?? "";
    };

    const first = get("cnc-fn");
    const last = get("cnc-ln");
    const company = get("cnc-co");
    const email = get("cnc-em");
    const phone = get("cnc-ph");
    const qty = get("cnc-qty");
    const need = get("cnc-need");
    const notes = get("cnc-notes");
    const files = form.querySelector<HTMLInputElement>("#cnc-file")?.files;

    const fd = new FormData();
    fd.append("formID", CNC_JOTFORM_ID);
    fd.append("simple_spc", `${CNC_JOTFORM_ID}-${CNC_JOTFORM_ID}`);
    fd.append("submitSource", "californiafastener-com/cnc-machining");
    fd.append("submitDate", new Date().toISOString());
    fd.append("eventObserver", "1");
    fd.append("q2_q2_textbox0", first); // First Name
    fd.append("q3_q3_textbox1", last); // Last Name
    fd.append("q4_q4_textbox2", company); // Company
    fd.append("q5_q5_email3", email); // Email
    fd.append("q6_q6_phone4[full]", phone); // Phone
    if (qty) fd.append("q7_q7_dropdown5", qty); // Estimated Quantity
    if (need) fd.append("q8_q8_dropdown6", need); // Needed By
    if (notes) fd.append("q9_q9_textarea7", notes); // Project Notes & Materials
    if (files) {
      for (const f of Array.from(files)) {
        fd.append("q10_q10_fileupload8[]", f, f.name); // Drawings & Files
      }
    }
    // Honeypot — leave blank.
    fd.append("website", "");

    setSubmitting(true);
    try {
      await fetch(CNC_SUBMIT_URL, { method: "POST", body: fd, mode: "no-cors" });
    } catch (err) {
      console.error("CNC quote submission to Jotform failed:", err);
    }
    setSubmitting(false);
    setSent(true);
  }

  return (
    <aside className="cnc-form" id="quote" aria-labelledby="cncFormH">
      <h2 className="cnc-form-h" id="cncFormH">
        Get your 24-hour quote.
      </h2>
      <div className="cnc-form-lede">Engineer-reviewed · Free · No obligation</div>

      <form onSubmit={handleSubmit}>
        <div className="cnc-form-row2">
          <div>
            <label htmlFor="cnc-fn">First name</label>
            <input id="cnc-fn" name="first_name" type="text" required />
          </div>
          <div>
            <label htmlFor="cnc-ln">Last name</label>
            <input id="cnc-ln" name="last_name" type="text" required />
          </div>
        </div>

        <label htmlFor="cnc-co">Company</label>
        <input id="cnc-co" name="company" type="text" required />

        <div className="cnc-form-row2">
          <div>
            <label htmlFor="cnc-em">Work email</label>
            <input id="cnc-em" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="cnc-ph">Phone</label>
            <input id="cnc-ph" name="phone" type="tel" required />
          </div>
        </div>

        <div className="cnc-form-row2">
          <div>
            <label htmlFor="cnc-qty">Est. quantity</label>
            <select id="cnc-qty" name="qty" defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              <option value="Prototype (1-10)">Prototype (1–10)</option>
              <option value="Low volume (11-100)">Low volume (11–100)</option>
              <option value="Mid volume (101-1,000)">Mid volume (101–1,000)</option>
              <option value="High volume (1,000+)">High volume (1,000+)</option>
            </select>
          </div>
          <div>
            <label htmlFor="cnc-need">Needed by</label>
            <select id="cnc-need" name="need" defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              <option value="ASAP (rush)">ASAP (rush)</option>
              <option value="1-2 weeks">1–2 weeks</option>
              <option value="3-4 weeks">3–4 weeks</option>
              <option value="1 month+">1 month+</option>
            </select>
          </div>
        </div>

        <label htmlFor="cnc-notes">Project notes &amp; materials</label>
        <textarea
          id="cnc-notes"
          name="notes"
          placeholder="Part name, material (e.g., A193 B7, Ti-6Al-4V, 316 SS), key tolerances, certs required (PPAP, MTRs), finish…"
        />

        <div className="cnc-form-file">
          <strong>Upload drawings / STEP files</strong>
          <input type="file" id="cnc-file" name="file" multiple />
          <div style={{ marginTop: 4 }}>STEP, IGES, DWG, DXF, PDF — up to 25 MB each</div>
        </div>

        <button type="submit" className="cnc-form-submit" disabled={submitting || sent}>
          {sent ? "Sent ✓ — we'll be in touch" : submitting ? "Sending…" : "Send RFQ ›"}
        </button>

        <div className="cnc-form-trust">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          NDAs available on request · Your files are confidential
        </div>

        <p className="cnc-form-fine">
          By submitting, you agree to be contacted about your RFQ. We do not sell or share your
          information. We typically reply in under 4 business hours.
        </p>
      </form>
    </aside>
  );
}
