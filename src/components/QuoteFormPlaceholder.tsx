"use client";

import { useState } from "react";

/**
 * Visual placeholder for inline product-page quote forms. Mirrors the
 * design's demo behavior — clicking submit just changes the button text.
 *
 * Real submission is deferred to Jotform per the project plan; when that's
 * wired up, replace this with a restyled Jotform embed (hidden fields,
 * Jotform's CSS hooks pointed at `.pp-form-*`).
 *
 * Layout classes (`pp-form-*`, `pp-quote-form`) live in cf-product-page.css
 * and adapt automatically to the section's `.pp-quote--alt` modifier when
 * the parent section uses an inverted background.
 */
type Props = {
  textareaLabel: string;
  textareaPlaceholder: string;
};

export function QuoteFormPlaceholder({ textareaLabel, textareaPlaceholder }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="pp-quote-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="pp-form-row">
        <div className="pp-form-field">
          <label>Name</label>
          <input type="text" name="name" required />
        </div>
        <div className="pp-form-field">
          <label>Company</label>
          <input type="text" name="company" />
        </div>
      </div>
      <div className="pp-form-row">
        <div className="pp-form-field">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="pp-form-field">
          <label>Phone</label>
          <input type="tel" name="phone" />
        </div>
      </div>
      <div className="pp-form-row">
        <div className="pp-form-field pp-form-field--full">
          <label>{textareaLabel}</label>
          <textarea name="message" placeholder={textareaPlaceholder} />
        </div>
      </div>
      <button type="submit" className="cf-pill cf-pill--blue pp-form-submit" disabled={sent}>
        {sent ? "Sent ✓" : "Send quote request"}
      </button>
    </form>
  );
}
