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
    // 95 = visually lossless for the product CAD renders; 75 stays available
    // for any future placeholder / thumbnail use.
    qualities: [75, 95],
  },
  async redirects() {
    // Phase 10 — starter set of 301s for old Squarespace URLs.
    // Full migration map is TBD pending the Squarespace sitemap; these are
    // the seven examples from the original plan doc. The three pointing at
    // pages that don't exist yet (/about, /contact, /products) fall back to
    // the closest live page; update destinations when those pages are built.
    return [
      // /products doesn't exist yet — homepage is the best fallback
      { source: "/product-catalog", destination: "/", permanent: true },
      // The four industry pages exist as dynamic [slug] routes
      {
        source: "/industries/fasteners-for-construction",
        destination: "/industries/construction",
        permanent: true,
      },
      {
        source: "/industries/fasteners-for-manufacturing",
        destination: "/industries/manufacturing",
        permanent: true,
      },
      {
        source: "/industries/fasteners-for-infrastructure",
        destination: "/industries/infrastructure",
        permanent: true,
      },
      {
        source: "/industries/fasteners-for-power-transmission",
        destination: "/industries/power-transmission",
        permanent: true,
      },
      // /about and /contact aren't built yet — point at the closest live pages
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/quote", permanent: true },
    ];
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
};

export default nextConfig;
