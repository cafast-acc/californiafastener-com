// Sanity environment configuration.
//
// Project ID and dataset are public (they appear in every API URL) and live in
// NEXT_PUBLIC_ vars. API version is pinned per docs — bump intentionally.
//
// No read token in v1: the public client uses useCdn + perspective: 'published'
// and never hits a token-protected endpoint. Add SANITY_API_READ_TOKEN when we
// implement draft preview in v2.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}
