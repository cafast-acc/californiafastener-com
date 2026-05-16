import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isConfigured } from "./env";

export const client = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // CDN is fine for published reads; on-demand revalidation flushes via
      // /api/revalidate when content changes in the Studio.
      useCdn: true,
      perspective: "published",
      stega: false,
    })
  : null;

/**
 * Run a GROQ query with Next.js cache tagging. Returns `fallback` if Sanity
 * isn't configured (no project ID), so build + render don't crash.
 *
 * `tags` are invalidated by the /api/revalidate webhook. Pass a per-document
 * tag like `post:my-slug` for detail routes and a collection tag like `post`
 * for list routes.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 60,
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
  fallback: T;
}): Promise<T> {
  if (!client) return fallback;
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: revalidate === false ? false : revalidate,
        tags,
      },
    });
  } catch (err) {
    console.error("[sanity] fetch failed:", err);
    return fallback;
  }
}
