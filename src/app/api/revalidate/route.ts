/**
 * Sanity → Next.js cache revalidation webhook.
 *
 * Configure in Sanity → Manage → API → GROQ-powered Webhooks:
 *   URL:    https://<your-domain>/api/revalidate
 *   Trigger: Create, Update, Delete (on `post`, `category`, `author`)
 *   Filter:  _type in ["post", "category", "author"]
 *   Projection: { _type, "slug": slug.current }
 *   Secret:  same value as SANITY_REVALIDATE_SECRET env var
 *
 * Tag invalidation strategy:
 *   - `post`            → flushes the listing and detail pages
 *   - `post:<slug>`     → flushes a single post
 *   - `category`        → flushes category routes
 *   - `category:<slug>` → flushes one category route
 */
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/sanity/env";

type Payload = {
  _type?: string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  if (!revalidateSecret) {
    return new Response(
      "SANITY_REVALIDATE_SECRET is not configured. Set it in your environment.",
      { status: 500 },
    );
  }

  const { isValidSignature, body } = await parseBody<Payload>(req, revalidateSecret);
  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }
  if (!body?._type) {
    return new Response("Missing _type in webhook payload", { status: 400 });
  }

  const tags = [body._type];
  if (body.slug) tags.push(`${body._type}:${body.slug}`);
  // 'max' = longest stale-while-revalidate window so the response stays fast
  // while fresh content is regenerated in the background.
  for (const tag of tags) revalidateTag(tag, "max");

  return Response.json({ revalidated: true, tags });
}
