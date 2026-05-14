import { client } from "./client";

// Thin wrapper around client.fetch that applies Next.js cache tags so the
// /api/revalidate webhook can invalidate precisely on publish.
//
// v1 has no draft preview, so this always uses the public published-only
// client. The branching for draftMode() will be added with the preview flow.

type FetchOpts = {
  tags?: string[];
  revalidate?: number | false;
};

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  opts: FetchOpts = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags: opts.tags ?? [],
      ...(opts.revalidate !== undefined ? { revalidate: opts.revalidate } : {}),
    },
  });
}
