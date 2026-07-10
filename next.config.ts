import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin Turbopack's workspace root to this project so it doesn't pick up
    // a parent-directory lockfile (e.g. C:\Users\aaron\package-lock.json).
    // import.meta.dirname is reliable in Node 20.11+ ESM; __dirname isn't.
    root: import.meta.dirname,
  },
  images: {
    // Next 15+ requires non-default quality values to be allowlisted here.
    // 95 = visually lossless for the product CAD renders; 90 = the homepage
    // hero and the About storefront/CNC photography; 75 stays available for
    // any future placeholder / thumbnail use. A quality used by a <Image>
    // but missing from this list makes the optimizer 400 in production —
    // dev only warns, so it slips through until the deployed image breaks.
    qualities: [75, 90, 95],
  },
  async headers() {
    // /public/assets/* gets a long browser cache. Vercel's defaults send
    // `Cache-Control: public, max-age=0, must-revalidate` for everything in
    // /public, which forces every page view to re-fetch our brand mark and
    // every product render. Brand assets and product photography don't
    // change often — when they do we can cache-bust by renaming the file.
    //
    // 1 day fresh + 30 days stale-while-revalidate: subsequent navigations
    // within a day skip the network entirely; within 30 days the browser
    // serves stale instantly while a background fetch updates the cache.
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
  async redirects() {
    // 301/308 map from the old Squarespace site (californiafastener.com) to
    // this rebuild, so inbound links and search rankings survive cut-over.
    // Sources were taken from the live old sitemap.xml; every destination was
    // verified to return 200 on production. permanent:true emits a 308
    // (SEO-equivalent to 301, preserves method).
    //
    // Deliberately NOT redirected: /industries (real page here — a redirect
    // would shadow it), the 36 blog posts migrated with identical slugs (they
    // resolve directly), and the old test pages /test and /jotform-test-page
    // (junk — left to 404 so they drop out of the index).
    return [
      // ── Core slug changes ─────────────────────────────
      { source: "/request-a-quote", destination: "/quote", permanent: true },
      { source: "/request-a-quote-1", destination: "/quote", permanent: true },
      { source: "/lindapter-hollo-bolt", destination: "/hollo-bolt", permanent: true },

      // ── Products: flattened out of /products/ (incl. Squarespace dupes) ──
      { source: "/products/anchor-bolts", destination: "/anchor-bolts", permanent: true },
      { source: "/products/anchor-bolts-2", destination: "/anchor-bolts", permanent: true },
      { source: "/products/anchor-bolts-3", destination: "/anchor-bolts", permanent: true },
      { source: "/products/anchor-bolts-v2", destination: "/anchor-bolts", permanent: true },
      { source: "/products/industrial-fasteners", destination: "/industrial-fasteners", permanent: true },
      { source: "/products/industrial-fasteners-v2", destination: "/industrial-fasteners", permanent: true },
      { source: "/products/stainless-steel-fasteners", destination: "/stainless-steel-fasteners", permanent: true },
      { source: "/products/structural-fasteners", destination: "/structural-fasteners", permanent: true },
      { source: "/products/stud-bolts-threaded-rod", destination: "/stud-bolts-threaded-rod", permanent: true },
      { source: "/products/ubolts", destination: "/u-bolts", permanent: true },
      { source: "/products/silicon-bronze", destination: "/silicon-bronze", permanent: true },

      // ── Industries: slug shortened (fasteners-for-X → X) ──
      { source: "/industries/fasteners-for-oil-gas", destination: "/industries/oil-gas", permanent: true },
      { source: "/industries/fasteners-for-power-generation", destination: "/industries/power-generation", permanent: true },
      { source: "/industries/fasteners-for-construction", destination: "/industries/construction", permanent: true },
      { source: "/industries/fasteners-for-power-transmission", destination: "/industries/power-transmission", permanent: true },
      { source: "/industries/fasteners-for-manufacturing", destination: "/industries/manufacturing", permanent: true },
      { source: "/industries/fasteners-for-infrastructure", destination: "/industries/infrastructure", permanent: true },

      // ── Resources ─────────────────────────────────────
      { source: "/specifications", destination: "/spec-library", permanent: true },
      { source: "/material-spec-builder", destination: "/spec-builder", permanent: true },
      { source: "/material-selection-guide", destination: "/spec-library", permanent: true },
      { source: "/thank-you-material-selection-guide", destination: "/spec-library", permanent: true },
      { source: "/product-catalog", destination: "/catalog", permanent: true },
      { source: "/product-catalog/thank-you", destination: "/catalog", permanent: true },

      // ── Spec detail pages → /spec-library (slug normalized) ──
      { source: "/specifications/astma193", destination: "/spec-library/astm-a193", permanent: true },
      { source: "/specifications/astma194", destination: "/spec-library/astm-a194", permanent: true },
      { source: "/specifications/astma307", destination: "/spec-library/astm-a307", permanent: true },
      { source: "/specifications/astma320", destination: "/spec-library/astm-a320", permanent: true },
      { source: "/specifications/astma449", destination: "/spec-library/astm-a449", permanent: true },
      { source: "/specifications/astma563", destination: "/spec-library/astm-a563", permanent: true },
      { source: "/specifications/astm-f593", destination: "/spec-library/astm-f593", permanent: true },
      { source: "/specifications/astmf1554", destination: "/spec-library/astm-f1554", permanent: true },
      { source: "/specifications/astmf3125", destination: "/spec-library/astm-f3125", permanent: true },
      { source: "/specifications/astmf436", destination: "/spec-library/astm-f436", permanent: true },
      { source: "/specifications/astmf844", destination: "/spec-library/astm-f844", permanent: true },
      { source: "/specifications/astmf959", destination: "/spec-library/astm-f959", permanent: true },
      // No astm-a325 page — F3125 superseded A325/A490.
      { source: "/specifications/astma325", destination: "/spec-library/astm-f3125", permanent: true },

      // ── Contact + privacy ─────────────────────────────
      { source: "/contact", destination: "/about", permanent: true },
      { source: "/contact-1", destination: "/about", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },

      // ── Home / about Squarespace variants ─────────────
      { source: "/home", destination: "/", permanent: true },
      { source: "/home-1", destination: "/", permanent: true },
      { source: "/home-v2", destination: "/", permanent: true },
      { source: "/about-2", destination: "/about", permanent: true },

      // ── Retired blog posts → closest surviving match ──
      { source: "/blog/guide-to-astm-a193-fasteners", destination: "/blog/the-comprehensive-guide-to-astm-a193-understanding-each-grade", permanent: true },
      { source: "/blog/high-strength-connections-a-guide-to-astm-a490-bolts", destination: "/blog/astm-a490-heavy-hex-bolts-specs-uses", permanent: true },
      { source: "/blog/comparing-astm-a563-grade-dh-and-astm-a194-grade-2h-nuts", destination: "/blog/astm-a194-grade-2h-vs-astm-a563-grade-dh-nuts", permanent: true },
      { source: "/blog/the-essential-guide-to-astm-a194-nuts", destination: "/blog/deep-dive-astm-a194-2h-nuts", permanent: true },
      { source: "/blog/the-essential-guide-to-astm-a194-nuts-l6hkp", destination: "/blog/deep-dive-astm-a194-2h-nuts", permanent: true },
      { source: "/blog/the-ultimate-guide-to-industrial-anchor-bolts-understanding-astm-f1554", destination: "/blog/the-ultimate-guide-to-industrial-anchor-bolts", permanent: true },
      { source: "/blog/understanding-astm-standards-for-industrial-fasteners", destination: "/blog/a-comprehensive-guide-to-industrial-fasteners", permanent: true },
      { source: "/blog/custom-cnc-fasteners-industrial-manufacturing", destination: "/blog/how-custom-cnc-fasteners-help-engineers-break-design-barriers", permanent: true },
      { source: "/blog/custom-cnc-fasteners-industrial-manufacturing-27mxb", destination: "/blog/how-custom-cnc-fasteners-help-engineers-break-design-barriers", permanent: true },
      { source: "/blog/corrosion-resistance-in-aerospace-fasteners", destination: "/blog/choosing-the-right-fasteners-for-extreme-environments", permanent: true },
      { source: "/blog/anchoring-growth-how-fasteners-power-prologis-scale-warehouse-expansion", destination: "/blog/anchor-bolts-supporting-mercks-new-pharmaceutical-manufacturing-facility-in-virginia", permanent: true },
      { source: "/blog/astm-a320-bolts-reliable-performance-in-low-temperature-environments", destination: "/spec-library/astm-a320", permanent: true },
      { source: "/blog/astm-a354-bolts-high-strength-solutions-for-critical-applications", destination: "/spec-library/astm-a354", permanent: true },
      { source: "/blog/astm-a449-bolts-versatile-fasteners-for-general-engineering", destination: "/spec-library/astm-a449", permanent: true },
      { source: "/blog/exploring-astm-a325-structural-bolts-for-construction", destination: "/spec-library/astm-f3125", permanent: true },
      { source: "/blog/understanding-astm-f3125-high-strength-structural-bolts", destination: "/spec-library/astm-f3125", permanent: true },
      { source: "/blog/aerospace-vs-commercial-fasteners", destination: "/industries/aerospace", permanent: true },
      { source: "/blog/from-engines-to-airframes-aerospace-fasteners-explained", destination: "/industries/aerospace", permanent: true },
      { source: "/blog/how-aerospace-fasteners-resist-fatigue-vibration", destination: "/industries/aerospace", permanent: true },

      // ── Old blog category archives → blog index ───────
      { source: "/blog/category/:slug*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
