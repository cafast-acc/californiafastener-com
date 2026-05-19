import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
};

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

  const body = parsed.body;
  if (!body?._type) {
    return NextResponse.json({ ok: false, error: "Missing _type" }, { status: 400 });
  }

  const tags = new Set<string>(["sanity", body._type, "blog:index"]);
  const paths = new Set<string>(["/blog"]);
  if (body._type === "post") {
    const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;
    if (slug) {
      tags.add(`post:${slug}`);
      paths.add(`/blog/${slug}`);
    }
    tags.add("post");
    tags.add("post:slugs");
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
  for (const path of paths) {
    revalidatePath(path, "page");
  }

  return NextResponse.json({
    ok: true,
    revalidated: Array.from(tags),
    paths: Array.from(paths),
  });
}
