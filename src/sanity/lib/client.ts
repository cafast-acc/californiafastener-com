import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Server-side read client. Only ever instantiated in server components and
// route handlers, never shipped to the browser.
//
// Token is required because this Sanity project's `public` role has no read
// access to user-defined document types (image assets work, but `post`,
// `author`, `category` return empty to anonymous queries). The token lifts
// that restriction. CDN caching still works — Sanity keys the CDN per token.
//
// Add a SANITY_API_READ_TOKEN (Viewer scope is enough) to .env.local and to
// Vercel → Settings → Environment Variables for all three scopes.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});
