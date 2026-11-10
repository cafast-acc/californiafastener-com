import Script from "next/script";

/**
 * WhatConverts lead-tracking snippet (profile 155044).
 *
 * Consent-gated: rendered only by <CookieConsent /> once the visitor has
 * accepted cookies, so it may mount on a later page than the one the visitor
 * landed on. To keep attribution correct, the initializer reads the landing
 * page's URL/referrer/query/hash from `window.__cfLanding`, which the
 * consent-default script in the root layout captures on the first hard load
 * (falling back to the current document if it's missing).
 *
 * Two scripts, and their order matters: the inline initializer populates
 * `$wc_leads` *before* the external tracking library reads it. We rely on
 * `next/script` firing sibling effects in placement order — the inline script
 * (which executes synchronously on append) runs first, so `$wc_leads` exists
 * by the time 155044.js loads.
 */
export function WhatConverts() {
  return (
    <>
      <Script id="wc-init" strategy="afterInteractive">
        {`var $wc_load=function(a){return JSON.parse(JSON.stringify(a))},$cf_l=window.__cfLanding||{url:document.URL,ref:document.referrer,search:location.search,hash:location.hash},$wc_leads=$wc_leads||{doc:{url:$wc_load($cf_l.url),ref:$wc_load($cf_l.ref),search:$wc_load($cf_l.search),hash:$wc_load($cf_l.hash)}};`}
      </Script>
      <Script
        id="wc-tracker"
        src="https://s.ksrndkehqnwntyxlhgto.com/155044.js"
        strategy="afterInteractive"
      />
    </>
  );
}
