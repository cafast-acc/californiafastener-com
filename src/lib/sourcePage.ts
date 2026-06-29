/**
 * Shared "where did this quote come from" labelling, used by both the inline
 * product-page quote form (QuoteFormPlaceholder) and the /quote page form
 * (RfqForm) so they tag the Jotform "Source Page" field identically.
 *
 * The inline forms tag their own page directly. The /quote form tags the page
 * the visitor was on immediately before landing on /quote — recorded by
 * RouteTracker into sessionStorage under LAST_PAGE_KEY (browser referrer is
 * useless here because the site navigates client-side).
 */

// sessionStorage key holding the most recent non-/quote path the user visited.
export const LAST_PAGE_KEY = "cf:lastPage";

const SOURCE_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/products": "Products",
  "/catalog": "Catalog",
  "/blog": "Blog",
  "/quote": "Quote Page",
  "/anchor-bolts": "Anchor Bolts",
  "/structural-fasteners": "Structural Fasteners",
  "/stud-bolts-threaded-rod": "Stud Bolts & Threaded Rod",
  "/stainless-steel-fasteners": "Stainless Steel Fasteners",
  "/industrial-fasteners": "Industrial Fasteners",
  "/u-bolts": "U-Bolts",
  "/silicon-bronze": "Silicon Bronze",
  "/hollo-bolt": "Hollo-Bolt",
  "/hollo-bolt-selector": "Hollo-Bolt Selector",
  "/cnc-machining": "CNC Machining",
  "/industries": "Industries",
  "/spec-library": "Spec Library",
  "/spec-builder": "Spec Builder",
  "/bolt-weight-calculator": "Bolt Weight Calculator",
};

function titleizeSlug(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Map a pathname to a human-readable source label. Always returns a non-empty
 * string for a non-empty path — falls back to the raw path so a page that
 * isn't explicitly listed is still identifiable, never blank.
 */
export function labelForSourcePath(path: string | null | undefined): string {
  if (!path) return "";
  const clean = path.replace(/[?#].*$/, "").replace(/\/+$/, "") || "/";
  if (SOURCE_LABELS[clean]) return SOURCE_LABELS[clean];

  // Dynamic routes: keep the section + a readable slug.
  const seg = clean.split("/").filter(Boolean);
  if (seg.length >= 2) {
    if (seg[0] === "industries") return `Industries: ${titleizeSlug(seg[1])}`;
    if (seg[0] === "blog") return `Blog: ${titleizeSlug(seg[1])}`;
    if (seg[0] === "spec-library") return `Spec Library: ${titleizeSlug(seg[1])}`;
  }
  return clean;
}
