"use client";

import { useEffect } from "react";

const FORM_ID = "261747488304061";
const IFRAME_ID = `JotFormIFrame-${FORM_ID}`;

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, origin: string) => void;
  }
}

export function RfqJotformEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotform.com/s/umd/latest/for-form-embed-handler.js";
    script.async = true;
    script.onload = () => {
      window.jotformEmbedHandler?.(
        `iframe[id='${IFRAME_ID}']`,
        "https://form.jotform.com/",
      );
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

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

      <div className="qf-wrap" style={{ paddingBottom: 96 }}>
        <iframe
          id={IFRAME_ID}
          title="Request a Quote"
          allow="geolocation; microphone; camera; fullscreen"
          src={`https://form.jotform.com/${FORM_ID}`}
          style={{
            minWidth: "100%",
            maxWidth: "100%",
            width: "1px",
            height: 1800,
            border: "none",
            background: "transparent",
            display: "block",
          }}
          scrolling="no"
        />
      </div>
    </>
  );
}
