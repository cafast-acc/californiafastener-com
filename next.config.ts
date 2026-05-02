import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin Turbopack's workspace root to this project so it doesn't pick up
    // a parent-directory lockfile (e.g. C:\Users\aaron\package-lock.json).
    // import.meta.dirname is reliable in Node 20.11+ ESM; __dirname isn't.
    root: import.meta.dirname,
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
