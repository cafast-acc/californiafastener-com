/**
 * Diagnose why the /blog listing is empty on localhost.
 *
 * Queries the live Sanity dataset and reports:
 *   · What document types exist (raw, drafts included if a token is set)
 *   · For every `post`: slug.current, publishedAt, draft status
 *   · How many would pass the blog query filter
 *     (`defined(slug.current) && publishedAt <= now()`)
 *
 * Usage:
 *   npm run diagnose:blog
 *
 * Token is optional. Without one, only published documents are visible
 * (which is what the blog page sees) — if posts show up in Studio but the
 * unauthenticated query returns nothing, they're drafts.
 *
 * With a read token (SANITY_API_READ_TOKEN), the script switches to
 * `perspective: "raw"` so drafts surface too and the diagnosis is sharper.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "x5omyul2";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-01";
const token = process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  perspective: token ? "raw" : "published",
});

function fmt(value) {
  if (value === undefined || value === null) return "(missing)";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

async function run() {
  console.log(`\nProject ${projectId} · dataset ${dataset} · api ${apiVersion}`);
  console.log(`Perspective: ${token ? "raw (drafts visible)" : "published (drafts hidden — no token set)"}\n`);

  const typeCounts = await client.fetch(`
    *[!(_type in ["sanity.imageAsset", "sanity.fileAsset"])]
    | order(_type) {
      _type
    }
  `);
  const grouped = typeCounts.reduce((acc, d) => {
    acc[d._type] = (acc[d._type] ?? 0) + 1;
    return acc;
  }, {});
  console.log("Document types in dataset:");
  if (Object.keys(grouped).length === 0) {
    console.log("  (none — the dataset is empty)");
  } else {
    for (const [type, count] of Object.entries(grouped)) {
      console.log(`  · ${type}: ${count}`);
    }
  }
  console.log("");

  const posts = await client.fetch(`
    *[_type == "post"] | order(_createdAt desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      publishedAt,
      "hasHeroImage": defined(heroImage),
      "categoryRefs": categories[]._ref
    }
  `);

  console.log(`Found ${posts.length} document(s) with _type == "post":\n`);
  if (posts.length === 0) {
    console.log("  No documents of type \"post\" exist.");
    console.log("  If your Studio shows posts under a different type name (e.g. \"blogPost\"),");
    console.log("  the schema in src/sanity/schemas/post.ts doesn't match. Run:\n");
    console.log("    *[!(_type match \"sanity.*\")]{ _type } | order(_type)");
    console.log("  in your Studio's Vision tab to see the actual type names.\n");
    return;
  }

  const now = new Date();
  let visibleCount = 0;
  for (const p of posts) {
    const isDraft = p._id.startsWith("drafts.");
    const hasSlug = typeof p.slug === "string" && p.slug.length > 0;
    const pubDate = p.publishedAt ? new Date(p.publishedAt) : null;
    const pubInPast = pubDate ? pubDate <= now : false;
    const visible = !isDraft && hasSlug && pubInPast;
    if (visible) visibleCount++;

    console.log(`  ${visible ? "✓" : "✗"} ${fmt(p.title)}`);
    console.log(`      _id:         ${p._id}${isDraft ? "  ← DRAFT (won't show on the site)" : ""}`);
    console.log(`      slug:        ${fmt(p.slug)}${!hasSlug ? "  ← MISSING (filter rejects this post)" : ""}`);
    console.log(`      publishedAt: ${fmt(p.publishedAt)}${!pubInPast ? `  ← ${pubDate ? "in the future" : "missing"} (filter rejects this post)` : ""}`);
    console.log(`      heroImage:   ${p.hasHeroImage ? "yes" : "no"}`);
    console.log(`      categories:  ${(p.categoryRefs ?? []).length}`);
    console.log("");
  }

  console.log(`Summary: ${visibleCount} of ${posts.length} post(s) would render on /blog.`);
  if (visibleCount === 0) {
    console.log("\nMost likely fix:");
    if (posts.some((p) => p._id.startsWith("drafts."))) {
      console.log("  · Open each post in /studio and click \"Publish\" (top right).");
      console.log("    Drafts are excluded by perspective: \"published\" in src/sanity/client.ts.");
    }
    if (posts.some((p) => !p.publishedAt)) {
      console.log("  · Fill in the \"Published at\" field with a date in the past.");
    }
    if (posts.some((p) => p.publishedAt && new Date(p.publishedAt) > now)) {
      console.log("  · Some publishedAt dates are in the future — the query filter excludes them.");
    }
    if (posts.some((p) => !p.slug || (typeof p.slug !== "string"))) {
      console.log("  · Generate the slug for posts that are missing one (click \"Generate\" next to the slug field).");
    }
  }
}

run().catch((err) => {
  console.error("\n✗ Diagnose failed:");
  console.error(err);
  process.exit(1);
});
