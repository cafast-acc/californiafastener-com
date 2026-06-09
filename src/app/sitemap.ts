import type { MetadataRoute } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostsForSitemapQuery } from "@/sanity/lib/queries";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://californiafastener.com";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "monthly", priority: 0.9 },
  { path: "/anchor-bolts", changeFrequency: "monthly", priority: 0.8 },
  { path: "/structural-fasteners", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industrial-fasteners", changeFrequency: "monthly", priority: 0.8 },
  { path: "/stud-bolts-threaded-rod", changeFrequency: "monthly", priority: 0.8 },
  { path: "/u-bolts", changeFrequency: "monthly", priority: 0.8 },
  { path: "/stainless-steel-fasteners", changeFrequency: "monthly", priority: 0.8 },
  { path: "/silicon-bronze", changeFrequency: "monthly", priority: 0.8 },
  { path: "/cnc-machining", changeFrequency: "monthly", priority: 0.8 },
  { path: "/hollo-bolt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/hollo-bolt-selector", changeFrequency: "monthly", priority: 0.7 },
  { path: "/spec-library", changeFrequency: "monthly", priority: 0.7 },
  { path: "/spec-builder", changeFrequency: "monthly", priority: 0.7 },
  { path: "/bolt-weight-calculator", changeFrequency: "monthly", priority: 0.7 },
  { path: "/quote", changeFrequency: "yearly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts =
    (await sanityFetch<{ slug: string; publishedAt: string; updatedAt?: string }[]>({
      query: allPostsForSitemapQuery,
      tags: ["post:slugs"],
    })) ?? [];

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticEntries, ...postEntries];
}
