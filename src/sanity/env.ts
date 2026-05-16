/**
 * Sanity environment configuration.
 *
 * Missing vars don't crash the build — the blog routes detect an unconfigured
 * project and render an empty state. This keeps `npm run build` green on
 * fresh clones without Vercel env vars set.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Pin the API version. Bump deliberately when you start using a new feature
// from a newer date. Don't auto-track `new Date()` — that would silently
// change query semantics on every deploy.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-01";

// Optional. Required for draft-mode previews and any server-only reads
// (e.g. unpublished posts in the Studio's "View on site" preview).
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

// HMAC secret used by the /api/revalidate webhook to verify Sanity payloads.
// Configure under Sanity → Manage → GROQ-powered Webhooks.
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET ?? "";

export const isConfigured = projectId.length > 0;
