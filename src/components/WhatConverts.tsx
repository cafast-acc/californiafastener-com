import Script from "next/script";

/**
 * WhatConverts lead-tracking snippet (profile 155044).
 *
 * Two scripts, and their order matters: the inline initializer captures the
 * landing document's URL/referrer/query/hash into `$wc_leads` *before* the
 * external tracking library reads it. We rely on `next/script` firing sibling
 * effects in placement order — the inline script (which executes synchronously
 * on append) runs first, so `$wc_leads` exists by the time 155044.js loads.
 *
 * `afterInteractive` is Next's recommended strategy for analytics/tag-manager
 * scripts and matches how GoogleTagManager is loaded in the root layout. On a
 * hard page load `document.referrer` is still the true external referrer, so
 * attribution is captured correctly. Rendered once in the root layout.
 */
export function WhatConverts() {
  return (
    <>
      <Script id="wc-init" strategy="afterInteractive">
        {`var $wc_load=function(a){return JSON.parse(JSON.stringify(a))},$wc_leads=$wc_leads||{doc:{url:$wc_load(document.URL),ref:$wc_load(document.referrer),search:$wc_load(location.search),hash:$wc_load(location.hash)}};`}
      </Script>
      <Script
        id="wc-tracker"
        src="https://s.ksrndkehqnwntyxlhgto.com/155044.js"
        strategy="afterInteractive"
      />
    </>
  );
}
