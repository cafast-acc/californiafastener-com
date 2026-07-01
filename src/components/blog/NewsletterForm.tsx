"use client";

import { useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="bl-newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        sendGTMEvent({ event: "form_submit", form_name: "newsletter" });
      }}
    >
      <input type="email" placeholder="you@company.com" required aria-label="Email address" />
      <button type="submit">{submitted ? "Thanks ✓" : "Subscribe"}</button>
    </form>
  );
}
