#!/usr/bin/env node
/**
 * Import the full blog from the WXR-derived NDJSON (scripts/wxr_to_ndjson.py).
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-wxr.mjs --dry-run content/blog-source/wxr-posts.ndjson
 *   node --env-file=.env.local scripts/import-wxr.mjs           content/blog-source/wxr-posts.ndjson
 *
 * Per post:
 *   - _id:        post.import.<slug>  (deterministic; re-running updates in place)
 *   - author:     the "California Fastener" author (falls back to any author)
 *   - category:   resolved from categoryTitle against real category docs
 *   - publishedAt:real Squarespace publish date
 *   - coverImage: featured image downloaded from the CDN and uploaded to Sanity
 *                 (cached per URL); posts with no source image get the shared
 *                 branded placeholder.
 *
 * After writing, it reports ORPHANS to delete: any post.import.* not in this set
 * (e.g. the earlier per-.docx imports) plus pre-existing live posts that this
 * migration now supersedes. Deletion is gated behind --delete-orphans.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

const DRY = process.argv.includes("--dry-run");
const DO_DELETE = process.argv.includes("--delete-orphans");
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));

const PLACEHOLDER_ASSET = "image-a43d725b5c37ac63e59ce53fbe0607caa0e2f074-1200x630-png";

if (!projectId || !token) {
  console.error("Missing project id / write token. Forgot --env-file=.env.local?");
  process.exit(1);
}
if (!files.length) {
  console.error("No NDJSON file given.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function readRecords(paths) {
  const out = [];
  for (const p of paths) {
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const t = line.trim();
      if (t) out.push(JSON.parse(t));
    }
  }
  return out;
}

const uploadCache = new Map(); // url -> asset _id
async function resolveCover(url, alt) {
  if (!url) return { _type: "image", alt, asset: { _type: "reference", _ref: PLACEHOLDER_ASSET } };
  if (uploadCache.has(url)) {
    return { _type: "image", alt, asset: { _type: "reference", _ref: uploadCache.get(url) } };
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = decodeURIComponent(url.split("/").pop().split("?")[0]) || "cover";
    const asset = await client.assets.upload("image", buf, { filename });
    uploadCache.set(url, asset._id);
    return { _type: "image", alt, asset: { _type: "reference", _ref: asset._id } };
  } catch (e) {
    console.warn(`  ! cover download failed (${e.message}) for ${url} — using placeholder`);
    return { _type: "image", alt, asset: { _type: "reference", _ref: PLACEHOLDER_ASSET } };
  }
}

async function main() {
  const records = readRecords(files);
  console.log(`Loaded ${records.length} post(s) from ${files.join(", ")}`);

  const authorRef =
    (await client.fetch(`*[_type=="author" && name=="California Fastener"][0]._id`)) ??
    (await client.fetch(`*[_type=="author"] | order(_createdAt asc)[0]._id`));
  if (!authorRef) {
    console.error("No author found. Create an author first.");
    process.exit(1);
  }

  const cats = await client.fetch(`*[_type=="category"]{_id, title}`);
  const catByTitle = new Map(cats.map((c) => [c.title, c._id]));

  const newIds = new Set(records.map((r) => `post.import.${r.slug}`));

  // Orphans: existing post.import.* not in the new set + pre-existing live posts
  // this migration supersedes (matched by slug).
  const existingImports = await client.fetch(
    `*[_type=="post" && _id in path("post.import.**")]._id`,
  );
  const orphanImports = existingImports.filter((id) => !newIds.has(id));
  const newSlugs = new Set(records.map((r) => r.slug));
  const supersededLive = await client.fetch(
    `*[_type=="post" && !(_id in path("post.import.**")) && !(_id in path("drafts.**")) && slug.current in $slugs]{_id, title, "slug": slug.current}`,
    { slugs: [...newSlugs] },
  );

  console.log(`Author ref: ${authorRef}`);
  console.log(`Categories: ${[...catByTitle.keys()].join(", ")}`);
  console.log(`\nWill write ${records.length} posts (post.import.<slug>).`);
  console.log(`Orphan post.import.* to delete: ${orphanImports.length}`);
  orphanImports.forEach((id) => console.log(`   - ${id}`));
  console.log(`Pre-existing live posts superseded (same slug): ${supersededLive.length}`);
  supersededLive.forEach((p) => console.log(`   - ${p._id}  "${p.title}"`));

  let missingCat = records.filter((r) => !catByTitle.has(r.categoryTitle));
  if (missingCat.length) {
    console.warn(`\n! ${missingCat.length} post(s) have an unmapped category:`);
    missingCat.forEach((r) => console.warn(`   - "${r.title}" -> ${r.categoryTitle}`));
  }

  if (DRY) {
    const noCover = records.filter((r) => !r.coverImageUrl).length;
    console.log(`\nDry run — nothing written. ${noCover} post(s) would use the placeholder cover.`);
    return;
  }

  let n = 0;
  for (const r of records) {
    const categoryId = catByTitle.get(r.categoryTitle);
    if (!categoryId) {
      console.warn(`  ! skipping "${r.title}" — no category`);
      continue;
    }
    const coverImage = await resolveCover(r.coverImageUrl, r.title);
    const doc = {
      _id: `post.import.${r.slug}`,
      _type: "post",
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      excerpt: r.excerpt,
      body: r.body,
      readingMinutes: r.readingMinutes,
      featured: false,
      publishedAt: r.publishedAt,
      author: { _type: "reference", _ref: authorRef },
      category: { _type: "reference", _ref: categoryId },
      coverImage,
    };
    await client.createOrReplace(doc);
    n++;
    process.stdout.write(".");
  }
  console.log(`\nWrote ${n} post(s). Uploaded ${uploadCache.size} unique cover image(s).`);

  if (DO_DELETE) {
    const toDelete = [...orphanImports, ...supersededLive.map((p) => p._id)];
    if (toDelete.length) {
      const tx = toDelete.reduce((t, id) => t.delete(id), client.transaction());
      await tx.commit();
      console.log(`Deleted ${toDelete.length} superseded/orphan doc(s).`);
    } else {
      console.log("No orphans to delete.");
    }
  } else {
    console.log("\n(Orphans NOT deleted. Re-run with --delete-orphans to remove them.)");
  }
}

main().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
