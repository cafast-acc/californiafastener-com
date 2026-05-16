# Field Notes Blog — Implementation Handoff

Pick this up to continue work on the Field Notes blog without prior context.
This file is self-contained: read it, then you can edit, deploy, and onboard
new editors.

## What's live

- **Public blog**: https://cafastdotcom2026-2.vercel.app/blog
- **Studio (CMS editor)**: https://cafastdotcom2026-2.vercel.app/studio
- **Production branch**: `main` (Vercel deploys this on every push)
- **Frozen rollback branch**: `master` — pre-blog snapshot, untouched. To revert
  the live site, point Vercel → Settings → Environments → Production →
  Branch Tracking back to `master`.

## Architecture in one paragraph

Sanity (cloud CMS) holds the content. A Next.js 16 App Router app on Vercel
reads from Sanity at request time (SSR + ISR, revalidate=3600s). The same
Next.js app also embeds Sanity Studio at `/studio` via `next-sanity/studio` —
the editor and the public site are the same deployment, on the same domain.
Three document types: `post`, `author`, `category`.

## File map

| Path | What |
|---|---|
| `src/app/blog/page.tsx` | Blog index (server component, fetches via `homeQuery`) |
| `src/app/blog/[slug]/page.tsx` | Post detail page |
| `src/app/studio/[[...tool]]/page.tsx` | Embedded Studio entry — `"use client"` |
| `sanity.config.ts` | Studio config (schemas + plugins + basePath `/studio`) |
| `src/sanity/env.ts` | Reads `NEXT_PUBLIC_SANITY_*` from env, throws if absent |
| `src/sanity/lib/client.ts` | Server-side read client — uses `SANITY_API_READ_TOKEN` |
| `src/sanity/lib/queries.ts` | GROQ queries (homeQuery, postBySlugQuery, postSlugsQuery, allPostsForSitemapQuery) |
| `src/sanity/lib/fetch.ts` | `sanityFetch()` wrapper that applies Next cache tags |
| `src/sanity/schemas/post.ts` | Post document schema |
| `src/sanity/schemas/author.ts` | Author schema |
| `src/sanity/schemas/category.ts` | Category schema |
| `src/sanity/schemas/objects/*.ts` | blockContent (rich text), callToAction, linkedProduct, seo |
| `src/components/blog/BlogContent.tsx` | Client-side pill bar + grid (reads `?category=`) |
| `src/components/blog/ArticleCard.tsx` | Card on the index |
| `src/components/blog/ArticleHeader.tsx` | Detail page hero |
| `src/components/blog/PortableText.tsx` | Renders body content + inline images, CTAs, links |
| `src/components/blog/AuthorBio.tsx` | Author block at end of post |
| `src/components/blog/LinkedProductCard.tsx` | "Shop the article" rail card |
| `src/components/blog/NewsletterForm.tsx` | Visual-only — no real subscription wired up yet |
| `src/styles/cf-blog.css` | All blog CSS, `.bl-*` prefix, imported via `src/app/globals.css` |
| `scripts/seed-blog.mjs` | One-shot seed: 1 author, 7 categories, 10 sample posts, 4 cover images |
| `public/blog/*.webp` | The 4 cover images shipped with the design handoff |
| `design/blog.html` | Static design reference — single source of visual truth |
| `design_handoff_blog/HANDOFF.md` | Original design handoff (visual spec) |

## Environment variables

Required at build + runtime. Set in **`.env.local`** locally AND in Vercel →
Settings → Environments → (each env) → Environment Variables.

| Name | Example | Used by | Required where |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `x5omyul2` | `src/sanity/env.ts` | local + Vercel |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | `src/sanity/env.ts` | local + Vercel |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` | `src/sanity/env.ts` | local + Vercel |
| `SANITY_API_READ_TOKEN` | `sk...` (Viewer+) | `src/sanity/lib/client.ts` | local + Vercel |
| `SANITY_API_WRITE_TOKEN` | `sk...` (Editor) | `scripts/seed-blog.mjs` | local only |
| `SANITY_WEBHOOK_SECRET` | shared secret | `src/app/api/revalidate/route.ts` | local + Vercel (when wiring webhook) |

`env.ts` hard-throws on missing values, so a missing `NEXT_PUBLIC_*` crashes
the build with `Missing NEXT_PUBLIC_SANITY_DATASET`.

## Project facts (the values another agent needs)

- Sanity project ID: `x5omyul2`
- Sanity dataset: `production`
- Sanity API version: `2024-10-01`
- Vercel team slug: `california-fastener`
- Vercel project: `cafastdotcom2026-2`
- GitHub repo: `cafast-acc/californiafastener-com`

## Common workflows

### Add a post (editor flow)
1. `https://cafastdotcom2026-2.vercel.app/studio` → sign in
2. Sidebar → **Blog post** → **Create**
3. Fill: Title, Slug (auto), Excerpt, Cover image (+ alt text), Body
4. Switch to **Metadata** tab: Author, Categories, Published at
5. **Publish** (bottom right). Live within ~60s.

### Invite a new editor
sanity.io/manage → project `x5omyul2` → **Members** → Invite → role **Editor**.

### Local development
```bash
npm install
npm run dev       # /blog and /studio on localhost:3001 (or :3002 if 3001 is occupied)
```
First-time-on-localhost: Sanity will prompt to "Add development host" for
`localhost:3001` (top option). Click that.

### Re-seed sample content
```bash
node --env-file=.env.local scripts/seed-blog.mjs           # idempotent upsert
node --env-file=.env.local scripts/seed-blog.mjs --clear  # remove samples
```
All sample docs have `_id` ending in `.sample`; clear deletes only those.

### Force a fresh Vercel build (after env-var changes)
```bash
git checkout main && git commit --allow-empty -m "redeploy" && git push
```

### Rollback to pre-blog site
Vercel → Settings → Environments → Production → Branch Tracking: `main` → `master` → Save → Redeploy from Deployments tab.

## Gotchas (each of these bit us during initial setup)

1. **Anonymous reads return 0 documents** despite the dataset being marked
   "Public". This project uses Sanity's per-role permissions model where the
   `public` role only sees `sanity.imageAsset` docs, not user content. Fix
   already applied: `client.ts` passes `SANITY_API_READ_TOKEN` to the server
   client. The CDN caches per-token, so this is fine.

2. **Token scopes matter for the seed.** Use **Editor** (or Developer) scope
   for `SANITY_API_WRITE_TOKEN`. *Viewer* fails with `Insufficient permissions;
   permission "create" required`. *Contributor* writes only drafts, which
   don't show on the public site.

3. **Studio at a new origin requires registration.** First visit to
   `https://cafastdotcom2026-2.vercel.app/studio` shows a "Connect this studio
   to your project" screen. For the Vercel URL: click **Register studio** (top
   option). For localhost: click **Add development host**.

4. **CORS must include the deployed domain.** sanity.io/manage → API → CORS
   Origins. We have `https://cafastdotcom2026-2.vercel.app` and
   `https://*.vercel.app` both with Allow credentials.

5. **`NEXT_PUBLIC_*` vars must be set BEFORE the Vercel build runs.** They're
   inlined at build time, not runtime. Adding them after a failed build and
   re-using cache won't help — must redeploy without cache, OR push a new
   commit.

6. **Turbopack stale-chunk errors locally.** If `npm run dev` throws
   `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`, do
   `rm -rf .next node_modules/.cache && npm run dev`.

7. **The seed creates posts dated April/March/Feb 2026.** Pre-dated relative
   to "today" so the index shows recent content. Real publish dates will of
   course move with real posts.

## What's done

- Full visual implementation of `design/blog.html` (`/blog`)
- Article detail pages (`/blog/[slug]`) with PortableText body, author bio,
  related products rail, breadcrumbs
- Embedded Studio at `/studio`, registered for the Vercel host
- Sanity schemas: post, author, category, plus shared objects (blockContent,
  callToAction, linkedProduct, seo)
- Sample content: 1 author (Marco Reyes), 7 categories, 10 posts, 4 real
  cover images (lathe, anchor bolt, hex bolt, turbine); 6 placeholder cards
  by design
- Client-side category filter via `?category=<slug>`
- Static-export of post pages (`generateStaticParams`) — fast cold loads
- Sitemap entry for posts (`src/app/sitemap.ts`)
- Revalidation route at `src/app/api/revalidate/route.ts` (webhook not yet
  wired to Sanity — see TODO below)
- Deployed to production on `main`, env vars set in Vercel for Production +
  Preview, CORS open for both Vercel host and *.vercel.app

## What's NOT done (the next agent's likely backlog)

- **Wire the revalidate webhook.** sanity.io/manage → API → Webhooks → add
  webhook pointing at `https://cafastdotcom2026-2.vercel.app/api/revalidate`,
  Trigger on create/update/delete, Filter `_type in ["post","category"]`,
  Secret = `SANITY_WEBHOOK_SECRET` (also set on Vercel). After this, publishes
  invalidate cache instantly rather than waiting up to 1hr for ISR.
- **Newsletter form is visual-only.** `NewsletterForm.tsx` just flips the
  button text. Wire to Mailchimp / Beehiiv / ConvertKit / whatever.
- **Draft preview.** No editor-side preview before publish. To add: enable
  draft mode in a `/api/draft` route, switch the client to `useCdn:false` +
  `perspective:"previewDrafts"` when in draft mode, set up Studio "Preview"
  pane plugin.
- **Real cover images for the 6 placeholder cards.** The seed posts that
  intentionally have no cover (per design): stainless 316, AS9102, five-axis,
  u-bolt, Inconel case study, silicon bronze. As soon as the team shoots
  those, upload via Studio and attach to the matching slugs.
- **Real author bios + photos.** Sample author has no image; schema field
  exists (`image`). Add the team's real authors via Studio → Author → Create.
- **Linked products on posts.** `relatedProducts` schema field is populated
  empty on samples. Filling it renders the "Shop the article" rail at the
  bottom of a post.
- **Sort dropdown** on `/blog` is a label-only div. Wire to a real `<select>`
  if needed.
- **Replace sample seed content** before going public. The 10 sample posts
  read "Sample article — replace with real content." in each body. Either
  unpublish or rewrite. The seed deliberately marks them with `.sample`
  suffix so cleanup is one command: `node scripts/seed-blog.mjs --clear`.

## Useful diagnostic commands

```bash
# Post count in Sanity (uses your read token; without it returns 0 due to
# per-role permissions on this project):
curl -s -H "Authorization: Bearer $SANITY_API_READ_TOKEN" \
  "https://x5omyul2.api.sanity.io/v2024-10-01/data/query/production?query=count(*%5B_type%3D%3D%22post%22%5D)"

# List all docs (with auth, includes drafts/system docs):
curl -s -H "Authorization: Bearer $SANITY_API_READ_TOKEN" \
  "https://x5omyul2.api.sanity.io/v2024-10-01/data/query/production?query=*%5B%5D%7B_id%2C_type%7D"

# Verify env vars made it to Vercel build (look at first 20 lines of build log
# in Vercel deployment view).
```

## Branch hygiene

- `main` — production. Vercel auto-deploys every push.
- `master` — pre-blog snapshot. Frozen rollback target. Do not push to it
  unless intentionally syncing.
- `claude/build-blog-QzrJV` — original feature branch. Now superseded by
  `main`. Can be deleted, or kept as a record of the build session.

## Tokens & secrets

Tokens live in `.env.local` (gitignored) locally and Vercel env vars in
production. **Never** commit either to git. If a token leaks, rotate it at
sanity.io/manage → API → Tokens (delete + recreate). Then update `.env.local`
and Vercel.

The seed write token in particular is high-risk (full create/delete on the
dataset) — keep it scoped to the dev who runs the seed, and revoke it once
real editorial replaces the samples.
