# Launch-Readiness Handoff — 2026-07-01

Context for continuing the pre-launch site audit in a new session.

## How to continue
- **Branch:** `claude/blog-redirect-links-m8djqp` — start the new session on this branch (it holds all the work below; it is **not** merged to `master`).
- **New site (preview):** https://cafastdotcom2026-2.vercel.app — this is where the new Next.js/Sanity site is live.
- **Production domain:** `californiafastener.com` / `www.californiafastener.com` still points at the **old Squarespace site**. The domain has **not** cut over yet.
- Branch commits are pushed but **not deployed** to the preview; the preview reflects what's merged/built.

## Jotform form IDs (used across the site)
- General "Request a Quote" (`/quote`, `RfqForm`): **261747488304061**
- CNC Machining (`/cnc-machining`, `CncQuoteForm`): **261757857130059**
- Hollo-Bolt selector (`HolloBoltSelector`, popup + `/hollo-bolt-selector`): **261756818395068**
- Spec Builder modal (`QuoteModal`): **260995842557069**

---

## Done this session (committed to the branch)
1. **Blog redirects** added to `CA_Fastener_Sitemap_Redirect_Map.xlsx` (repo root): 18 old Squarespace `/blog/` URLs → closest new post; 38 posts kept identical slugs (no redirect). Both the "Redirect Map" sheet and the "vercel.json Redirects" block updated.
2. **Home Hollo-Bolt CTA** now opens the selector in a popup (`HolloBoltSelectorTrigger`) instead of linking to `/quote`.
3. **Removed dead `/resources` breadcrumb** from the Spec Library.
4. **Footer products** now list all 8 (added Industrial Fasteners + Hollo-Bolt) to match the header nav.
5. **Spec Library "Start here" links** (6) now point to their real spec pages; **"Request a revision"** now opens `mailto:info@californiafastener.com`.

## Done off-repo (NOT in git — important)
- **Jotform CAD-extension fix**: both upload forms (261747488304061 and 261757857130059) had their file-upload fields expanded to allow CAD types (`stp, step, igs, iges, dwg, dxf, stl, sldprt, sldasm, prt, asm, ipt, iam, x_t, x_b, sat`) + `xlsx, tiff, bmp`, at 25 MB. This fixed a real bug: the CNC form was **rejecting the STEP/DWG files it advertised**, and the site's `no-cors` submit showed "Sent ✓" anyway, so those RFQs were silently lost. Verified fixed with a live STEP submission.

## Verified working
- Navigation: all internal links resolve (24 routes).
- Quote flow + **source-page tagging** (confirmed "Silicon Bronze" tagged on a live submission).
- **File uploads** on `/quote` and `/cnc-machining`: PDF, PNG, and STEP all confirmed stored (post-fix). These are the only two pages with an upload field.
- Bolt Weight Calculator: math + densities correct. Catalog: images resolve, print-to-PDF works. Spec Builder: works (iframe submit).
- Spec Library: 35 catalog entries ↔ 35 content files, filters/TOC/prev-next all sound.

---

## Open items / punch list
### Pending decisions (owner: user + boss)
- **Newsletter form** (`/blog`, `NewsletterForm.tsx`): currently a **no-op** — shows "Thanks ✓" but sends nowhere; every signup is discarded. Needs a destination (Jotform / Mailchimp). Decision pending.
- **Privacy policy / terms**: none exist; forms collect PII + uploads. Being discussed with boss.
- **"Request a revision"** link: set to `mailto:info@` for now; boss to confirm keep / change / remove.

### Not yet done (code/infra)
- **Redirects not wired in**: the entire redirect map (products, industries, blog) is still only a spreadsheet — no `vercel.json` / `next.config` redirects. Must go live **before** the domain cutover or old URLs 404. (User deferred this.)
- **No `robots.txt`** (sitemap.ts exists): add one; allow crawl, reference sitemap, disallow `/studio`.
- **No analytics** (GA/Vercel/Plausible) installed.
- **Contact-info inconsistency**: phone appears as `707.741.3277`, `+17077413277`, `17077413277`, plus toll-free `833-707-3278`; emails split `info@` / `sales@`. Normalize.
- **Upload silent-failure hardening**: `/quote` + `/cnc-machining` still show "Sent ✓" via `no-cors` even if a >25 MB or unlisted file fails. Recommend client-side size/type checks and/or switching to the iframe-submit method the Spec Builder uses.

### Verification not fully done
- Spec Library **accuracy**: only 2 of 35 standards deep-checked (A193, F3125 — both correct/current). Full pass not done.
- Spec Builder recommendation logic: high-level checked only.
- **Large-file upload** (~20 MB against the 25 MB limit): not tested.

## Housekeeping
- **Delete 6 test submissions** (all from `robot@californiafastener.com`, marked "please ignore"):
  - Quote form: "Claude UploadTest", "UploadTest2-VIEWABLE", "StepFileTest"
  - CNC form: "Claude UploadTest", "UploadTest2-VIEWABLE", "StepFileRetest"
  - (The Quote form's 2 *original* submissions predate testing — keep those.)
- **Merge the branch** (6 commits) when ready; open a PR if desired.
