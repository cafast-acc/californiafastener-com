"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="bl-newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <input type="email" placeholder="you@company.com" required aria-label="Email address" />
      <button type="submit">{submitted ? "Thanks ✓" : "Subscribe"}</button>
    </form>
  );
}
