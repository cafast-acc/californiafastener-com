/**
 * Cookie-consent state shared by the banner, the footer "Cookie settings"
 * button, and the consent-gated trackers.
 *
 * The visitor's choice lives in a first-party cookie (`cf_consent`) so the
 * inline consent-default script in the root layout can read it synchronously
 * before Google Tag Manager loads. No cookie = no choice yet = everything
 * that needs consent stays off.
 */

export type ConsentValue = "granted" | "denied";

export const CONSENT_COOKIE = "cf_consent";

/** Fired on window whenever the visitor makes or changes a choice. */
export const CONSENT_CHANGE_EVENT = "cf-consent-change";

/** Fired on window to reopen the banner (footer "Cookie settings"). */
export const OPEN_SETTINGS_EVENT = "cf-open-cookie-settings";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function readConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  const value = match?.[1];
  return value === "granted" || value === "denied" ? value : null;
}

export function writeConsent(value: ConsentValue) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

/**
 * Google Consent Mode v2 update. Google's own tags in GTM react to this
 * directly; the Microsoft Clarity tag is set in GTM to require
 * `analytics_storage`, so it fires the moment this grants it.
 */
export function updateGoogleConsent(value: ConsentValue) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // Consent commands must be pushed as an `arguments` object, the same shape
  // gtag() produces — a plain array is ignored by GTM.
  const gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  } as (...args: unknown[]) => void;
  gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
  w.dataLayer.push({ event: "cookie_consent_update", consent_state: value });
}

/**
 * Runs before GTM (beforeInteractive in the root layout). Sets Consent Mode
 * defaults from the saved choice — denied unless the visitor already
 * accepted — and snapshots the landing page URL/referrer so WhatConverts can
 * still attribute the visit correctly if it only loads after a later Accept.
 */
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);
var g=m&&m[1]==='granted'?'granted':'denied';
gtag('consent','default',{ad_storage:g,ad_user_data:g,ad_personalization:g,analytics_storage:g});
if(g==='denied'){gtag('set','ads_data_redaction',true);}
window.__cfLanding=window.__cfLanding||{url:document.URL,ref:document.referrer,search:location.search,hash:location.hash};
`;
