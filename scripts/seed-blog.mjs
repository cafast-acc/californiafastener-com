#!/usr/bin/env node
/**
 * Seed the Sanity dataset with sample Field Notes content.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-blog.mjs           # idempotent upsert
 *   node --env-file=.env.local scripts/seed-blog.mjs --clear  # remove samples
 *
 * Requires SANITY_API_WRITE_TOKEN with Editor (or Developer) scope.
 * Viewer fails with "permission required". Contributor writes only drafts.
 *
 * Every doc this script creates ends in `.sample` so `--clear` only deletes
 * what we made — real editorial content is safe.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Did you forget --env-file=.env.local?");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (Editor scope required).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
const CLEAR = process.argv.includes("--clear");

const CATEGORIES = [
  { id: "cat-materials.sample", title: "Materials & Grades", slug: "materials-grades", accent: "blue", order: 10 },
  { id: "cat-anchor.sample", title: "Anchor Bolts", slug: "anchor-bolts", accent: "blue", order: 20 },
  { id: "cat-structural.sample", title: "Structural", slug: "structural", accent: "blue", order: 30 },
  { id: "cat-cnc.sample", title: "CNC Machining", slug: "cnc-machining", accent: "purple", order: 40 },
  { id: "cat-industry.sample", title: "Industry Insights", slug: "industry-insights", accent: "blue", order: 50 },
  { id: "cat-spec.sample", title: "Spec & Compliance", slug: "spec-compliance", accent: "purple", order: 60 },
  { id: "cat-case.sample", title: "Case Studies", slug: "case-studies", accent: "mid", order: 70 },
];

const AUTHOR = {
  id: "author-marco.sample",
  name: "Marco Reyes",
  slug: "marco-reyes",
  role: "Operations Lead, California Fastener",
  bio: "Marco runs operations and CNC at California Fastener. 12 years on the shop floor, two in field engineering, opinions on toolpaths.",
};

// Local cover images shipped with the design handoff — uploaded once, then
// reused across all 10 sample posts. Filenames are stable so subsequent
// re-runs don't re-upload.
const COVER_FILES = {
  lathe: "lathe.webp",
  anchor: "anchor-bolt.webp",
  hex: "hex-bolt.webp",
  turbine: "turbine.webp",
};

const POSTS = [
  {
    id: "post-cnc-distributors.sample",
    title: "Why most distributors can't make what they can't source.",
    slug: "cnc-distributors-cant-make",
    excerpt:
      "Bringing CNC in-house changed how we quote, how we deliver, and what 'non-standard' actually means. A technical deep-dive into the Haas UMC-750 and ST-28Y, and how they reshape lead times on exotic materials.",
    publishedAt: "2026-04-08T09:00:00Z",
    readingMinutes: 9,
    cover: "lathe",
    category: "cat-cnc.sample",
    featured: true,
  },
  {
    id: "post-f1554-grade.sample",
    title: "F1554 Grade 36 vs 55 vs 105: which grade does your baseplate actually need?",
    slug: "f1554-grade-decision",
    excerpt:
      "A decision guide for structural engineers, with common pitfalls and field examples from seismic zones.",
    publishedAt: "2026-04-12T09:00:00Z",
    readingMinutes: 7,
    cover: "anchor",
    category: "cat-anchor.sample",
  },
  {
    id: "post-316-marine.sample",
    title: "Why 316 isn't always the answer for marine service.",
    slug: "316-not-always-marine",
    excerpt:
      "When duplex, super duplex, or Monel beat 'just use 316' — and how to know before you spec.",
    publishedAt: "2026-04-05T09:00:00Z",
    readingMinutes: 11,
    cover: null,
    category: "cat-materials.sample",
  },
  {
    id: "post-a325-dead.sample",
    title: "A325 is dead. What A325 replaced itself with, and what actually shipped in 2025.",
    slug: "a325-is-dead-f3125",
    excerpt:
      "The F3125 consolidation, how to read the new grade designations, and where A325 still appears in specs.",
    publishedAt: "2026-03-28T09:00:00Z",
    readingMinutes: 6,
    cover: "hex",
    category: "cat-structural.sample",
  },
  {
    id: "post-as9102.sample",
    title: "AS9102 First Article: the five mistakes we see every week.",
    slug: "as9102-five-mistakes",
    excerpt:
      "From uncalibrated gauges to missing mill-test traceability, the issues that send FAIs back.",
    publishedAt: "2026-03-22T09:00:00Z",
    readingMinutes: 8,
    cover: null,
    category: "cat-spec.sample",
  },
  {
    id: "post-datacenter.sample",
    title: "What data-center buildouts are doing to fastener lead times in 2026.",
    slug: "data-center-fastener-lead-times",
    excerpt:
      "Surging power-gen and data-center demand is pulling heavy-hex A193 B7 off shelves nationwide. Here's where we are.",
    publishedAt: "2026-03-15T09:00:00Z",
    readingMinutes: 10,
    cover: "turbine",
    category: "cat-industry.sample",
  },
  {
    id: "post-five-axis.sample",
    title: "Five-axis vs 3+2: when the extra axes actually earn their keep.",
    slug: "five-axis-vs-three-plus-two",
    excerpt:
      "Not every part needs full 5-axis. A practical breakdown from 200+ jobs this year.",
    publishedAt: "2026-03-08T09:00:00Z",
    readingMinutes: 9,
    cover: null,
    category: "cat-cnc.sample",
  },
  {
    id: "post-ubolt-bend.sample",
    title: "Round vs square bend U-bolts: what pipe supports actually need.",
    slug: "round-vs-square-bend-ubolts",
    excerpt:
      "A short guide for the piping engineer who wants to stop over-specifying square bends.",
    publishedAt: "2026-03-01T09:00:00Z",
    readingMinutes: 5,
    cover: null,
    category: "cat-anchor.sample",
  },
  {
    id: "post-inconel.sample",
    title: "A prototype run of 14. Inconel. Four business days.",
    slug: "inconel-prototype-turbine-retrofit",
    excerpt:
      "A customer story on how in-house CNC plus stocked exotics turned around a turbine retrofit.",
    publishedAt: "2026-02-22T09:00:00Z",
    readingMinutes: 6,
    cover: null,
    category: "cat-case.sample",
  },
  {
    id: "post-silicon-bronze.sample",
    title: "Silicon bronze in architectural cladding: when galvanic really matters.",
    slug: "silicon-bronze-architectural-cladding",
    excerpt:
      "A short primer for architects spec'ing exposed fasteners on mixed-metal facades.",
    publishedAt: "2026-02-15T09:00:00Z",
    readingMinutes: 7,
    cover: null,
    category: "cat-materials.sample",
  },
];

const SAMPLE_BODY = [
  {
    _type: "block",
    _key: "lede",
    style: "normal",
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "Sample article — replace with real content. This paragraph exists so the index card excerpt and the article detail page have something to render. Once a real article ships in Studio it will overwrite this body.",
      },
    ],
  },
  {
    _type: "block",
    _key: "h2",
    style: "h2",
    children: [{ _type: "span", _key: "s2", text: "What goes here" }],
  },
  {
    _type: "block",
    _key: "p2",
    style: "normal",
    children: [
      {
        _type: "span",
        _key: "s3",
        text: "Two to four short sections, each with a heading, two paragraphs, and a callout or product link where relevant. Keep it scannable.",
      },
    ],
  },
];

async function uploadCover(slug, filename) {
  const id = `image-cover-${slug}.sample`;
  // Sanity de-dupes assets by SHA, but we still tag with a stable doc ID by
  // running an existence check first so re-runs are quick.
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id });
  if (existing) return id;

  const path = resolve(ROOT, "public", "blog", filename);
  let buffer;
  try {
    buffer = readFileSync(path);
  } catch {
    console.warn(`  Skipping ${filename} — file not found at ${path}`);
    return null;
  }
  const asset = await client.assets.upload("image", buffer, { filename });
  // Tag the asset doc with our stable .sample ID via a patch (Sanity won't let
  // us choose the asset _id at upload, so we just reference asset._id below).
  return asset._id;
}

async function clear() {
  console.log("Removing sample docs and image assets…");
  // Documents
  const docs = await client.fetch(`*[_id match "*.sample"]._id`);
  if (docs.length > 0) {
    await client.delete({ query: `*[_id match "*.sample"]` });
    console.log(`  Deleted ${docs.length} documents`);
  } else {
    console.log("  No sample documents found");
  }
  // Image assets — match by originalFilename so we don't touch real uploads.
  const assets = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename in $names]._id`,
    { names: Object.values(COVER_FILES) },
  );
  for (const id of assets) {
    try {
      await client.delete(id);
    } catch (err) {
      console.warn(`  Could not delete ${id}: ${err.message}`);
    }
  }
  if (assets.length > 0) console.log(`  Deleted ${assets.length} image assets`);
}

async function seed() {
  console.log("Upserting categories…");
  for (const c of CATEGORIES) {
    await client.createOrReplace({
      _id: c.id,
      _type: "category",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      accent: c.accent,
      order: c.order,
    });
  }

  console.log("Upserting author…");
  await client.createOrReplace({
    _id: AUTHOR.id,
    _type: "author",
    name: AUTHOR.name,
    slug: { _type: "slug", current: AUTHOR.slug },
    role: AUTHOR.role,
    bio: AUTHOR.bio,
  });

  console.log("Uploading cover images…");
  const coverAssetIds = {};
  for (const [key, file] of Object.entries(COVER_FILES)) {
    coverAssetIds[key] = await uploadCover(key, file);
  }

  console.log("Upserting posts…");
  for (const p of POSTS) {
    const assetId = p.cover ? coverAssetIds[p.cover] : null;
    const doc = {
      _id: p.id,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt,
      publishedAt: p.publishedAt,
      readingMinutes: p.readingMinutes,
      featured: p.featured ?? false,
      author: { _type: "reference", _ref: AUTHOR.id },
      category: { _type: "reference", _ref: p.category },
      body: SAMPLE_BODY,
    };
    if (assetId) {
      doc.coverImage = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: p.title,
      };
    }
    await client.createOrReplace(doc);
    process.stdout.write(".");
  }
  console.log("\nDone.");
}

(async () => {
  try {
    if (CLEAR) {
      await clear();
    } else {
      await seed();
    }
  } catch (err) {
    console.error("Seed failed:", err.message);
    if (err.message?.includes("permission")) {
      console.error("  → SANITY_API_WRITE_TOKEN likely lacks Editor scope.");
    }
    process.exit(1);
  }
})();
