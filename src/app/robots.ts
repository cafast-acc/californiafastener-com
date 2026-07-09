import type { MetadataRoute } from "next";

// Mirrors sitemap.ts so the two agree on the canonical host.
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://californiafastener.com";

/**
 * Front-door instructions for search-engine crawlers. Allows the whole public
 * site, points crawlers at the sitemap for fast/complete discovery, and keeps
 * the Sanity Studio admin (/studio) out of crawling + the public index. This
 * does not affect access — /studio is still reachable and login-protected.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
