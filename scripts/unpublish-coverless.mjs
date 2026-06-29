#!/usr/bin/env node
/**
 * Unpublish blog posts that have no cover image — move each to a draft so it
 * disappears from the live blog while keeping all of its content intact.
 *
 * Usage:
 *   node --env-file=.env.local scripts/unpublish-coverless.mjs            # dry run (default)
 *   node --env-file=.env.local scripts/unpublish-coverless.mjs --apply    # actually unpublish
 *
 * Requires SANITY_API_WRITE_TOKEN with Editor scope.
 *
 * What "unpublish" means here:
 *   A published doc lives at _id "<id>"; a draft lives at "drafts.<id>". The
 *   site's queries all filter `!(_id in path('drafts.**'))` and the read client
 *   uses perspective:"published", so a draft is invisible on the site. This
 *   script, per coverless post, copies the published doc to its drafts.<id>
 *   counterpart and deletes the published original — the standard Sanity
 *   "unpublish". It is fully reversible: re-publishing the draft in the Studio
 *   (or recreating the published doc) brings the post back unchanged.
 *
 * Safety:
 *   - Selects ONLY posts whose cover is missing OR is the shared placeholder
 *     asset (PLACEHOLDER_ASSET below) — i.e. posts with no real thumbnail.
 *   - Skips any post that already has a draft (won't clobber in-progress edits).
 *   - Dry run by default; prints the exact list it would affect.
 */
import { createClient } from "@sanity/client";

// The single 1200x630 navy "BLOGS" placeholder shared by every post that never
// got a real cover image. Posts pointing at this (or at no asset at all) are
// the ones with no genuine thumbnail.
const PLACEHOLDER_ASSET =
  "image-a43d725b5c37ac63e59ce53fbe0607caa0e2f074-1200x630-png";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

const APPLY = process.argv.includes("--apply");

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Forgot --env-file=.env.local?");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (Editor scope required).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// System fields we don't carry over when materializing the draft.
const SYSTEM_FIELDS = new Set(["_rev", "_createdAt", "_updatedAt"]);

function toDraft(doc) {
  const out = {};
  for (const [k, v] of Object.entries(doc)) {
    if (SYSTEM_FIELDS.has(k)) continue;
    out[k] = v;
  }
  out._id = `drafts.${doc._id}`;
  return out;
}

async function main() {
  // Published posts (not already drafts) with no real cover: either no asset at
  // all, or pointing at the shared placeholder.
  const coverless = await client.fetch(
    `*[_type == "post" && !(_id in path('drafts.**'))
        && (!defined(coverImage.asset) || coverImage.asset._ref == $placeholder)]
       | order(publishedAt desc){ _id, title, "slug": slug.current, publishedAt }`,
    { placeholder: PLACEHOLDER_ASSET },
  );

  if (coverless.length === 0) {
    console.log("No published posts without a real cover image — nothing to do.");
    return;
  }

  // Which of these already have a draft? Skip those to avoid clobbering edits.
  const draftIds = new Set(
    await client.fetch(`*[_id in $ids]._id`, {
      ids: coverless.map((p) => `drafts.${p._id}`),
    }),
  );

  const toUnpublish = coverless.filter((p) => !draftIds.has(`drafts.${p._id}`));
  const skipped = coverless.filter((p) => draftIds.has(`drafts.${p._id}`));

  console.log(`Found ${coverless.length} published post(s) without a cover image:\n`);
  for (const p of toUnpublish) {
    console.log(
      `  ${APPLY ? "[unpublish]" : "[plan]"} ${p.title}` +
        `\n        /blog/${p.slug ?? "(no slug)"}  ·  ${(p.publishedAt ?? "").slice(0, 10)}  ·  ${p._id}`,
    );
  }
  for (const p of skipped) {
    console.log(`  [skip — draft already exists] ${p.title}  ·  ${p._id}`);
  }

  if (!APPLY) {
    console.log(
      `\nDry run — nothing written. ${toUnpublish.length} post(s) would be unpublished` +
        (skipped.length ? `, ${skipped.length} skipped.` : ".") +
        `\nRe-run with --apply to perform the unpublish.`,
    );
    return;
  }

  let done = 0;
  for (const p of toUnpublish) {
    const doc = await client.getDocument(p._id);
    if (!doc) {
      console.warn(`  ! ${p._id} vanished before write; skipping.`);
      continue;
    }
    await client
      .transaction()
      .createOrReplace(toDraft(doc))
      .delete(p._id)
      .commit();
    done += 1;
    process.stdout.write(".");
  }
  console.log(`\nDone. Unpublished ${done} post(s) (now drafts). Re-publish in the Studio to restore.`);
}

main().catch((err) => {
  console.error("\nUnpublish failed:", err.message);
  if (err.message?.includes("permission")) {
    console.error("  -> token likely lacks Editor scope.");
  }
  process.exit(1);
});
