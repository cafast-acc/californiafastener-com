import type { QueryParams } from "next-sanity";

import { isConfigured } from "../env";
import { client } from "./client";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number;
};

// Thin wrapper that applies Next cache tags so the /api/revalidate webhook
// can invalidate the right slices instead of busting the whole site.
export async function sanityFetch<T>({
  query,
  params,
  tags = ["sanity"],
  revalidate = 3600,
}: FetchOptions): Promise<T | null> {
  if (!isConfigured) return null;
  try {
    return await client.fetch<T>(query, params ?? {}, {
      next: { revalidate, tags },
    });
  } catch (err) {
    console.error("sanityFetch failed:", err);
    return null;
  }
}
