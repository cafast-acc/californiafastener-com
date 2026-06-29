#!/usr/bin/env node
/**
 * Import converted blog posts (NDJSON from scripts/docx_to_ndjson.py) into Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-blog.mjs content/blog-source/posts.ndjson
 *   node --env-file=.env.local scripts/import-blog.mjs --dry-run content/blog-source/posts.ndjson
 *
 * Requires SANITY_API_WRITE_TOKEN with Editor scope (Viewer/Contributor won't
 * write published docs).
 *
 * What it does, per post:
 *   - author:   reuses the author of the most recent REAL (non-.sample) post
 *               already in the dataset — i.e. the same author as the posts you
 *               already published. Falls back to any author if none found.
 *   - category: maps the `categoryKeyword` (anchor|materials|spec|...) to a real
 *               category doc by title. Skips the post with a warning if no match.
 *   - publishedAt: spread one per week, newest first (NDJSON order), ending today.
 *   - _id:      deterministic `post.import.<slug>` so re-running UPDATES rather
 *               than duplicating. Written as a published doc (no `drafts.` prefix).
 *
 * It never touches existing docs other than the ones it owns (post.import.*).
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

const DRY = process.argv.includes("--dry-run");
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Forgot --env-file=.env.local?");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (Editor scope required).");
  process.exit(1);
}
if (files.length === 0) {
  console.error("No NDJSON file given. Usage: import-blog.mjs [--dry-run] posts.ndjson");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// Map a categoryKeyword to a substring we expect in the real category title.
const CATEGORY_TITLE_MATCH = {
  anchor: "anchor",
  materials: "material",
  structural: "structural",
  cnc: "cnc",
  industry: "industry",
  spec: "spec",
  case: "case",
};

function readRecords(paths) {
  const out = [];
  for (const p of paths) {
    const text = readFileSync(p, "utf8");
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (t) out.push(JSON.parse(t));
    }
  }
  return out;
}

// Dates: newest first in NDJSON order, one week apart, last one = today.
function spreadDates(n) {
  const dates = [];
  const base = new Date();
  base.setUTCHours(9, 0, 0, 0);
  for (let i = 0; i < n; i++) {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() - i * 7);
    dates.push(d.toISOString());
  }
  return dates;
}

async function resolveAuthor() {
  // Prefer the author used by real (non-sample) published posts — the ones you
  // already posted on the live site.
  const ref = await client.fetch(
    `*[_type=="post" && !(_id match "*.sample") && !(_id in path("drafts.**")) && defined(author)]
       | order(publishedAt desc)[0].author._ref`,
  );
  if (ref) return ref;
  const any = await client.fetch(`*[_type=="author"] | order(_createdAt asc)[0]._id`);
  return any ?? null;
}

async function resolveCategories() {
  const cats = await client.fetch(`*[_type=="category"]{_id, title}`);
  return cats;
}

function matchCategory(keyword, cats) {
  const needle = CATEGORY_TITLE_MATCH[keyword] ?? keyword;
  const hit = cats.find((c) => (c.title ?? "").toLowerCase().includes(needle));
  return hit?._id ?? null;
}

async function main() {
  const records = readRecords(files);
  console.log(`Loaded ${records.length} post(s) from ${files.join(", ")}`);

  const authorRef = await resolveAuthor();
  if (!authorRef) {
    console.error("No author found in dataset and none to fall back to. Create an author first.");
    process.exit(1);
  }
  const authorDoc = await client.fetch(`*[_id==$id][0]{name, role}`, { id: authorRef });
  console.log(`Author: ${authorDoc?.name ?? authorRef} (${authorRef})`);

  const cats = await resolveCategories();
  console.log(`Categories in dataset: ${cats.map((c) => c.title).join(", ") || "(none)"}`);

  const dates = spreadDates(records.length);

  const planned = [];
  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    const categoryId = matchCategory(r.categoryKeyword, cats);
    if (!categoryId) {
      console.warn(`  ! "${r.title}" — no category matches keyword "${r.categoryKeyword}"; SKIPPING.`);
      continue;
    }
    const doc = {
      _id: `post.import.${r.slug}`,
      _type: "post",
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      excerpt: r.excerpt,
      body: r.body,
      readingMinutes: r.readingMinutes,
      featured: false,
      publishedAt: dates[i],
      author: { _type: "reference", _ref: authorRef },
      category: { _type: "reference", _ref: categoryId },
    };
    planned.push({ doc, oldSlug: r.oldSlug });
    console.log(
      `  ${DRY ? "[plan]" : "[write]"} ${r.title}\n` +
        `        -> /blog/${r.slug}  · ${dates[i].slice(0, 10)} · cat=${r.categoryKeyword}` +
        (r.oldSlug ? `  · 301 from /blog/${r.oldSlug}` : ""),
    );
  }

  if (DRY) {
    console.log(`\nDry run — nothing written. ${planned.length} post(s) would be imported.`);
    const redirects = planned.filter((p) => p.oldSlug);
    if (redirects.length) {
      console.log("Redirects still to add to next.config.ts:");
      for (const p of redirects) {
        console.log(`  /blog/${p.oldSlug}  ->  /blog/${p.doc.slug.current}`);
      }
    }
    return;
  }

  for (const p of planned) {
    await client.createOrReplace(p.doc);
    process.stdout.write(".");
  }
  console.log(`\nDone. Imported ${planned.length} post(s).`);
  const redirects = planned.filter((p) => p.oldSlug);
  if (redirects.length) {
    console.log("\nNOTE: add these 301s to next.config.ts redirects():");
    for (const p of redirects) {
      console.log(`  /blog/${p.oldSlug}  ->  /blog/${p.doc.slug.current}`);
    }
  }
}

main().catch((err) => {
  console.error("Import failed:", err.message);
  if (err.message?.includes("permission")) {
    console.error("  -> token likely lacks Editor scope.");
  }
  process.exit(1);
});
