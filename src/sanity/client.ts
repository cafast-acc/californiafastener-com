import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isConfigured, readToken } from "./env";

export const client = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Server-only read token. Lets the app read documents that anonymous
      // requests don't return (e.g. when the dataset has finer-grained access
      // control beyond the public/private toggle). Token is never exposed
      // client-side — this module is only imported from server components and
      // the env var has no NEXT_PUBLIC_ prefix.
      token: readToken || undefined,
      // CDN can't be used when a token is set (Sanity bypasses it for
      // authenticated reads). Next.js cache tags handle invalidation via
      // /api/revalidate when content changes in the Studio.
      useCdn: readToken ? false : true,
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
