import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostsForSitemapQuery } from "@/sanity/lib/queries";
import type { SitemapPost } from "@/sanity/lib/types";

// Static top-level routes that exist on the site today. Update as routes ship.
const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/anchor-bolts", changeFrequency: "monthly", priority: 0.8 },
  { path: "/structural-fasteners", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industrial-fasteners", changeFrequency: "monthly", priority: 0.8 },
  { path: "/stud-bolts-threaded-rod", changeFrequency: "monthly", priority: 0.8 },
  { path: "/spec-library", changeFrequency: "monthly", priority: 0.7 },
  { path: "/spec-builder", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // If Sanity isn't configured yet (e.g. preview deploys without env vars),
  // fall back to static routes only — don't crash sitemap generation.
  let posts: SitemapPost[] = [];
  try {
    posts = await sanityFetch<SitemapPost[]>(
      allPostsForSitemapQuery,
      {},
      { tags: ["posts"] },
    );
  } catch {
    posts = [];
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p._updatedAt ?? p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
