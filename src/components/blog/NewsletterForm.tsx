"use client";

// Visual-only newsletter form. Matches design/blog.html behavior: on submit
// the button text flips to "Thanks ✓" — nothing is sent anywhere. Wire to a
// real list service (ConvertKit / Beehiiv / Mailchimp / etc.) when ready.

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="bl-newsletter-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        placeholder="you@company.com"
        required
        aria-label="Email address"
      />
      <button type="submit" disabled={submitted}>
        {submitted ? "Thanks ✓" : "Subscribe"}
      </button>
    </form>
  );
}
