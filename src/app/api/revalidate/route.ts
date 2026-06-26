import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
};

// Immediate, blocking invalidation (read-your-writes). `{ expire: 0 }` marks the
// tag expired right now, so the next visit fetches fresh data. The "max" profile
// instead serves the stale copy on the next visit (stale-while-revalidate), which
// makes deletes/new posts look like they "didn't come down" until a second load.
const IMMEDIATE = { expire: 0 };

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Webhook secret not configured" }, { status: 500 });
  }

  let parsed: Awaited<ReturnType<typeof parseBody<WebhookBody>>>;
  try {
    parsed = await parseBody<WebhookBody>(req, secret, true);
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to parse body" }, { status: 400 });
  }

  if (!parsed.isValidSignature) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  const body = parsed.body ?? {};
  const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;

  // Refresh the blog list slices on every valid hit. A create, update, OR delete
  // all change what /blog shows, and delete payloads can arrive without a _type
  // or slug — so don't gate the list refresh on those being present.
  const tags = new Set<string>(["sanity", "post", "category", "blog:index", "post:slugs"]);
  if (body._type) tags.add(body._type);

  // Page-level invalidation. The /blog index plus the whole post route pattern,
  // so a deleted post's own URL re-renders to a 404 even when the webhook payload
  // doesn't include its slug. The exact path is added too when we do have it.
  const paths = new Set<string>(["/blog"]);
  const layoutPaths: Array<[string, "page" | "layout"]> = [["/blog/[slug]", "page"]];
  if (slug) {
    tags.add(`post:${slug}`);
    paths.add(`/blog/${slug}`);
  }

  for (const tag of tags) revalidateTag(tag, IMMEDIATE);
  for (const path of paths) revalidatePath(path, "page");
  for (const [path, type] of layoutPaths) revalidatePath(path, type);

  return NextResponse.json({
    ok: true,
    revalidated: Array.from(tags),
    paths: [...paths, ...layoutPaths.map(([p]) => p)],
  });
}
