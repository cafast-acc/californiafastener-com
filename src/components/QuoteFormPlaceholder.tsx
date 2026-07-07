"use client";

import { useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

import { labelForSourcePath } from "@/lib/sourcePage";

/**
 * Inline product-page quote form. Posts to the shared "Request a Quote"
 * Jotform (261747488304061) — the same form behind /quote — via the no-cors
 * fire-and-forget pattern used by RfqForm. Every submission stamps the hidden
 * "Source Page" field (q24_sourcePage) with this page's label, so the team can
 * tell which product page a request came from.
 *
 * The Jotform form requires First Name, Last Name, Company, and Email (and a
 * description); it rejects server-side if any are missing — and because the
 * POST is no-cors we can't read that failure. So we collect and require those
 * fields here, mirroring RfqForm, to guarantee submissions actually land.
 *
 * Layout classes (`pp-form-*`, `pp-quote-form`) live in cf-product-page.css.
 */

const JOTFORM_ID = "261747488304061";
const JOTFORM_SUBMIT_URL = `https://submit.jotform.com/submit/${JOTFORM_ID}`;

function sourcePageLabel(): string {
  if (typeof window === "undefined") return "";
  return labelForSourcePath(window.location.pathname);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const errBorder = { borderColor: "#c0392b" } as const;

type Props = {
  textareaLabel: string;
  textareaPlaceholder: string;
};

export function QuoteFormPlaceholder({ textareaLabel, textareaPlaceholder }: Props) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const emailValid = EMAIL_RE.test(email.trim());
  const ready =
    !!first.trim() && !!last.trim() && !!company.trim() && emailValid && !!message.trim();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);

    const fd = new FormData();
    fd.append("formID", JOTFORM_ID);
    fd.append("simple_spc", `${JOTFORM_ID}-${JOTFORM_ID}`);
    fd.append("submitSource", "californiafastener-com/product-page");
    fd.append("submitDate", new Date().toISOString());
    fd.append("eventObserver", "1");

    fd.append("q3_q3_textbox1", first.trim());
    fd.append("q4_q4_textbox2", last.trim());
    fd.append("q5_q5_email3", email.trim());
    fd.append("q6_q6_textbox4", company.trim());
    if (phone.trim()) fd.append("q7_q7_phone5[full]", phone.trim());
    fd.append("q9_q9_textarea7", message.trim());

    // Hidden "Source Page" field — which product page this came from.
    fd.append("q24_sourcePage", sourcePageLabel());

    // Honeypot — leave blank.
    fd.append("website", "");

    try {
      // no-cors: Jotform's submit endpoint doesn't return CORS headers, so the
      // response is opaque. The POST is still accepted; we confirm optimistically.
      await fetch(JOTFORM_SUBMIT_URL, { method: "POST", body: fd, mode: "no-cors" });
    } catch (err) {
      // Network failure (offline, blocked). Surface for debugging; still confirm
      // so the customer isn't left stuck — they can also call the number shown.
      console.error("Product-page quote submission to Jotform failed:", err);
    }
    setSubmitting(false);
    setSent(true);
    sendGTMEvent({ event: "form_submit", form_name: "product_quote" });
  }

  if (sent) {
    return (
      <div className="pp-quote-form">
        <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "8px 0 10px" }}>
          Request sent ✓
        </h3>
        <p style={{ color: "var(--mid)", lineHeight: 1.5, margin: 0 }}>
          Thanks — we&apos;ve got your request and a team member will follow up within one business
          day with pricing and lead time. Need it sooner? Call 707.741.3277.
        </p>
      </div>
    );
  }

  return (
    <form className="pp-quote-form" onSubmit={handleSubmit} noValidate>
      <div className="pp-form-row">
        <div className="pp-form-field">
          <label htmlFor="qfp-first">First name</label>
          <input
            type="text"
            id="qfp-first" name="first"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            style={showErrors && !first.trim() ? errBorder : undefined}
            aria-invalid={showErrors && !first.trim() ? true : undefined}
            required
          />
        </div>
        <div className="pp-form-field">
          <label htmlFor="qfp-last">Last name</label>
          <input
            type="text"
            id="qfp-last" name="last"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            style={showErrors && !last.trim() ? errBorder : undefined}
            aria-invalid={showErrors && !last.trim() ? true : undefined}
            required
          />
        </div>
      </div>
      <div className="pp-form-row">
        <div className="pp-form-field">
          <label htmlFor="qfp-email">Email</label>
          <input
            type="email"
            id="qfp-email" name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={showErrors && !emailValid ? errBorder : undefined}
            aria-invalid={showErrors && !emailValid ? true : undefined}
            required
          />
        </div>
        <div className="pp-form-field">
          <label htmlFor="qfp-company">Company</label>
          <input
            type="text"
            id="qfp-company" name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={showErrors && !company.trim() ? errBorder : undefined}
            aria-invalid={showErrors && !company.trim() ? true : undefined}
            required
          />
        </div>
      </div>
      <div className="pp-form-row">
        <div className="pp-form-field pp-form-field--full">
          <label htmlFor="qfp-phone">Phone</label>
          <input
            type="tel"
            id="qfp-phone" name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="pp-form-row">
        <div className="pp-form-field pp-form-field--full">
          <label>{textareaLabel}</label>
          <textarea
            name="message"
            placeholder={textareaPlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={showErrors && !message.trim() ? errBorder : undefined}
            aria-invalid={showErrors && !message.trim() ? true : undefined}
          />
        </div>
      </div>
      <button type="submit" className="cf-pill cf-pill--blue pp-form-submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send quote request"}
      </button>
      {showErrors && !ready && (
        <p style={{ color: "#c0392b", fontSize: 13, marginTop: 12 }}>
          Please add your first and last name, company, a valid email, and a short description.
        </p>
      )}
    </form>
  );
}
