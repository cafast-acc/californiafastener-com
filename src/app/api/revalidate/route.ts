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

  // Next 16 requires a cache-life profile as the second arg. "max" applies
  // long-lived caching to the *next* fetch after the purge — exactly what we
  // want for blog content that only changes on the next publish webhook.
  // Plural collection tag — every listing query uses this. e.g. "posts".
  const collectionTag = `${body._type}s`;
  revalidateTag(collectionTag, "max");

  // Per-document tag for fast invalidation of the detail page.
  if (body.slug?.current) {
    revalidateTag(`${body._type}:${body.slug.current}`, "max");
  }

  return NextResponse.json({
    revalidated: true,
    type: body._type,
    slug: body.slug?.current ?? null,
  });
}
