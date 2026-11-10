"use client";

import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/consent";

/**
 * Google Maps embed that only loads with permission. The embed is served by
 * Google and can set Google cookies, so — like the other third-party tools —
 * it waits until the visitor has accepted cookies. Everyone else sees a
 * placeholder with a "Show map" button that loads it on request for this
 * page view only (it doesn't change their cookie choice).
 */
export function ConsentMap({
  src,
  title,
  label,
}: {
  src: string;
  title: string;
  /** Short location line shown on the placeholder. */
  label: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (readConsent() === "granted") setShow(true);
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail === "granted") setShow(true);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (show) {
    return (
      <iframe
        className="visit-map-frame"
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="visit-map-placeholder">
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="visit-map-placeholder-pin"
      >
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
      <div className="visit-map-placeholder-label">{label}</div>
      <button type="button" className="visit-map-placeholder-btn" onClick={() => setShow(true)}>
        Show map
      </button>
      <div className="visit-map-placeholder-note">
        Map provided by Google, which may set cookies when it loads.
      </div>
    </div>
  );
}
