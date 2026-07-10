"use client";

import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Catalog PDF actions. Both point at a pre-rendered, full-bleed PDF asset
 * rather than window.print() — the browser print path depends on the
 * visitor's dialog settings (margins, "Background graphics" toggle), which
 * drop the dark backgrounds and add white side-strips.
 *
 * "View" opens the PDF in a new tab so it can be previewed page-by-page
 * before saving; "Download" saves the file directly. Regenerate the asset
 * with scripts/generate-catalog-pdf.mjs when catalog content changes.
 */
const CATALOG_PDF = "/california-fastener-catalog-2026.pdf";

export function PrintButton() {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          sendGTMEvent({ event: "catalog_view" });
          window.open(CATALOG_PDF, "_blank", "noopener,noreferrer");
        }}
      >
        View PDF →
      </button>
      <button
        type="button"
        className="cat-toolbar__download"
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
        Download
      </button>
    </>
  );
}
