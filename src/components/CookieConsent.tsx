"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { WhatConverts } from "@/components/WhatConverts";
import {
  CONSENT_CHANGE_EVENT,
  GTM_ID,
  OPEN_SETTINGS_EVENT,
  clearTrackingCookies,
  discardPreConsentEvents,
  readConsent,
  updateGoogleConsent,
  writeConsent,
  type ConsentValue,
} from "@/lib/consent";

/**
 * Opt-in cookie banner. Until the visitor clicks Accept, none of the
 * tracking tools load at all:
 *  - Google Tag Manager isn't loaded, so Google Analytics, Google Ads and
 *    Microsoft Clarity (all GTM tags) never run and nothing is sent to them;
 *  - WhatConverts isn't loaded.
 * Both are rendered below only when consent is granted. Vercel Analytics /
 * Speed Insights are cookieless, don't identify visitors, and run regardless.
 */
export function CookieConsent() {
  // null until mounted: the banner is client-only so it never flashes for
  // visitors who already chose.
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    setOpen(saved === null);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  function choose(value: ConsentValue) {
    const previous = consent;
    writeConsent(value);
    setOpen(false);
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));

    if (value === "granted") {
      if (previous !== "granted") discardPreConsentEvents();
      updateGoogleConsent("granted");
      setConsent("granted"); // mounts GTM + WhatConverts below
      return;
    }

    setConsent("denied");
    // Withdrawing consent: delete the tools' cookies, and reload because
    // scripts already running on this page can't be unloaded.
    if (previous === "granted") {
      updateGoogleConsent("denied");
      clearTrackingCookies();
      window.location.reload();
    }
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <GoogleTagManager gtmId={GTM_ID} />
          <WhatConverts />
        </>
      )}

      {open && (
        <section className="cf-consent" role="region" aria-label="Cookie consent">
          <h2 className="cf-consent-title">Cookies on this site</h2>
          <p className="cf-consent-text">
            With your permission, we use cookies and similar tools to understand how our site is
            used and to measure our marketing. These include Google Analytics, Google Ads,
            Microsoft Clarity session recordings, and WhatConverts call and form tracking. None of
            them run unless you accept. You can change your choice anytime under &ldquo;Cookie
            settings&rdquo; at the bottom of any page. See our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
          <div className="cf-consent-actions">
            <button type="button" className="cf-consent-btn" onClick={() => choose("denied")}>
              Decline
            </button>
            <button
              type="button"
              className="cf-consent-btn cf-consent-btn--primary"
              onClick={() => choose("granted")}
            >
              Accept
            </button>
          </div>
        </section>
      )}
    </>
  );
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="cf-footer-linkbtn"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      Cookie settings
    </button>
  );
}
