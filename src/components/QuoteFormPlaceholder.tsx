"use client";

import { useState } from "react";

/**
 * Visual placeholder for the structural-fasteners quote form. Mirrors the
 * design's demo behavior — clicking submit just changes the button text.
 *
 * Real submission is deferred to Jotform per the project plan; when that's
 * wired up, replace this component with the Jotform embed (restyled with
 * .sf-form-* classes via Jotform's CSS hooks, with hidden fields).
 */
export function QuoteFormPlaceholder() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="sf-quote-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="sf-form-row">
        <div className="sf-form-field">
          <label>Name</label>
          <input type="text" name="name" required />
        </div>
        <div className="sf-form-field">
          <label>Company</label>
          <input type="text" name="company" />
        </div>
      </div>
      <div className="sf-form-row">
        <div className="sf-form-field">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="sf-form-field">
          <label>Phone</label>
          <input type="tel" name="phone" />
        </div>
      </div>
      <div className="sf-form-row">
        <div className="sf-form-field sf-form-field--full">
          <label>Project &amp; bolt schedule</label>
          <textarea
            name="message"
            placeholder="Project type, F3125 grade, sizes, finish, quantities — or paste the bolt schedule."
          />
        </div>
      </div>
      <button type="submit" className="cf-pill cf-pill--blue sf-form-submit" disabled={sent}>
        {sent ? "Sent ✓" : "Send quote request"}
      </button>
    </form>
  );
}
