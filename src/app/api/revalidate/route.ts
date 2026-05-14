// POST /api/revalidate — Sanity webhook target.
//
// Configure in Sanity Manage → API → Webhooks:
//   URL:        https://californiafastener.com/api/revalidate
//   Trigger:    Create, Update, Delete
//   Filter:     _type in ["post", "category", "author"]
//   Projection: { _type, slug }
//   Secret:     value of SANITY_WEBHOOK_SECRET
//   HTTP:       POST
//
// parseBody() reads + buffers the body, verifies the HMAC signature against
// our shared secret, and waits for Content Lake eventual consistency so the
// follow-up revalidation pulls fresh data.

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type Payload = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  let parsed: Awaited<ReturnType<typeof parseBody<Payload>>>;
  try {
    parsed = await parseBody<Payload>(req, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(`Webhook parse error: ${message}`, { status: 400 });
  }

  if (!parsed.isValidSignature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }
  const body = parsed.body;
  if (!body?._type) {
    return new NextResponse("Bad payload", { status: 400 });
  }

  // Map document type → collection tag used by listing queries. Explicit
  // rather than blindly suffixing "s" so "category" doesn't turn into
  // "categorys". The per-document tag is `${_type}:${slug}` for the detail
  // page. "max" is the cache-life profile (Next 16's revalidateTag now
  // requires one) — pin tagged data to the longest profile so it survives
  // until the next publish webhook fires.
  const COLLECTION_TAG: Record<string, string> = {
    post: "posts",
    category: "categories",
    author: "authors",
  };
  const collectionTag = COLLECTION_TAG[body._type];
  if (collectionTag) {
    revalidateTag(collectionTag, "max");
  }

  if (body.slug?.current) {
    revalidateTag(`${body._type}:${body.slug.current}`, "max");
  }

  return NextResponse.json({
    revalidated: true,
    type: body._type,
    slug: body.slug?.current ?? null,
  });
}
