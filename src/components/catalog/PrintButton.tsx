"use client";

import { sendGTMEvent } from "@next/third-parties/google";

/**
 * "Save as PDF" for the catalog. Downloads a pre-rendered, full-bleed PDF
 * asset rather than calling window.print() — the browser print path depends
 * on the visitor's dialog settings (margins, "Background graphics" toggle),
 * which drop the dark backgrounds and add white side-strips. Regenerate the
 * asset with scripts/generate-catalog-pdf.mjs when catalog content changes.
 */
const CATALOG_PDF = "/california-fastener-catalog-2026.pdf";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        sendGTMEvent({ event: "catalog_download" });
        const a = document.createElement("a");
        a.href = CATALOG_PDF;
        a.download = "California-Fastener-Catalog-2026.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }}
    >
      Save as PDF →
    </button>
  );
}
