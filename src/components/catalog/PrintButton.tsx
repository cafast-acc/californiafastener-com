"use client";

/** "Save as PDF" trigger for the catalog document. Browser print → PDF. */
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()}>
      Save as PDF →
    </button>
  );
}
