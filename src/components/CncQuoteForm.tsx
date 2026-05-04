"use client";

import { useState } from "react";

/**
 * Inline RFQ form for /cnc-machining. Visual placeholder that mirrors the
 * design's demo behavior — clicking submit reveals the thank-you panel.
 *
 * Real submission deferred to Jotform per the project plan; when wired,
 * swap to the same hidden-iframe pattern used by spec-builder's QuoteModal.
 */
export function CncQuoteForm() {
  const [sent, setSent] = useState(false);

  return (
    <aside className="cnc-form" id="quote" aria-labelledby="cncFormH">
      <h2 className="cnc-form-h" id="cncFormH">
        Get your 24-hour quote.
      </h2>
      <div className="cnc-form-lede">Engineer-reviewed · Free · No obligation</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
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
              <option>Prototype (1–10)</option>
              <option>Low volume (11–100)</option>
              <option>Mid volume (101–1,000)</option>
              <option>High volume (1,000+)</option>
            </select>
          </div>
          <div>
            <label htmlFor="cnc-need">Needed by</label>
            <select id="cnc-need" name="need" defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              <option>ASAP (rush)</option>
              <option>1–2 weeks</option>
              <option>3–4 weeks</option>
              <option>1 month+</option>
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

        <button type="submit" className="cnc-form-submit" disabled={sent}>
          {sent ? "Sent ✓ — we'll be in touch" : "Send RFQ ›"}
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
