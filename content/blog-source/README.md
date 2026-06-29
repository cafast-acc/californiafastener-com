# Blog migration — source docs & import pipeline

Bulk-imports the old Squarespace blog posts (supplied as `.docx`) into Sanity so
they publish to `/blog` on the live site.

## Status

| Batch | Posts | State |
|-------|-------|-------|
| 1     | 5 (the `.docx` in this folder) | Converted → `posts.ndjson`. **Not yet imported** (needs a session with network access to Sanity). |

The two posts already live on the new site (per the migration spreadsheet) are
untouched — the importer only writes docs it owns (`post.import.*`).

## How it works (two steps)

1. **Convert** `.docx` → Sanity-ready NDJSON (offline, no deps):
   ```bash
   python3 scripts/docx_to_ndjson.py content/blog-source/*.docx > content/blog-source/posts.ndjson
   ```
   Handles inline bold/italic, hyperlinks, Word tables → bullet lists, the
   "every paragraph styled Heading 3" docs, and strips SEO scaffolding lines.
   Per-post title/category/old-slug overrides live in `OVERRIDES` at the top of
   the script.

2. **Import** NDJSON → Sanity (needs `SANITY_API_WRITE_TOKEN`, Editor scope):
   ```bash
   node --env-file=.env.local scripts/import-blog.mjs --dry-run content/blog-source/posts.ndjson  # preview
   node --env-file=.env.local scripts/import-blog.mjs           content/blog-source/posts.ndjson  # write
   ```
   - **Author**: reuses the author of the most recent real (non-`.sample`) post
     already published — i.e. the same author as the existing live posts.
   - **Category**: maps each post's `categoryKeyword` to a real category doc by
     title. If a keyword matches no category, that post is skipped with a warning
     (run `--dry-run` first to catch this).
   - **Dates**: spread one per week, newest last = today.
   - **IDs**: deterministic `post.import.<slug>` → re-running updates in place,
     never duplicates. Written published (visible on `/blog` immediately).

### `.env.local` (not committed — git-ignored)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=x5omyul2
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_WRITE_TOKEN=<editor token>
```

## Decisions captured (batch 1)

- Publish **live immediately** (not drafts).
- Author = **same as the two already-posted blogs** (resolved at import time).
- Publish dates **spread over recent weeks**.
- Category mapping: B5/B8 → Materials & Grades; A193 guide / A194 → Spec &
  Compliance; Anchor Bolts → Anchor Bolts.

## 301 redirects still to add (after import is confirmed live)

The retired Squarespace URLs that map to a new post need 301s in
`next.config.ts` `redirects()`:

| Old | New |
|-----|-----|
| `/blog/guide-to-astm-a193-fasteners` | `/blog/the-comprehensive-guide-to-astm-a193-fasteners` |
| `/blog/the-essential-guide-to-astm-a194-nuts-l6hkp` | `/blog/the-essential-guide-to-astm-a194-nuts` |

## Adding the rest of the posts

Drop the next batch of `.docx` into this folder, re-run step 1 (it overwrites
`posts.ndjson`), eyeball `PREVIEW.md`, then run step 2. Add any per-post
title/category/old-slug tweaks to `OVERRIDES` in `scripts/docx_to_ndjson.py`.

`PREVIEW.md` is a human-readable render of the converted posts for spot-checking.
