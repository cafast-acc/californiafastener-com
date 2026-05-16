/**
 * Seed the Field Notes blog with placeholder content.
 *
 * Run locally — never on Vercel — to push authors, categories, and 5 sample
 * posts into the configured Sanity dataset. Idempotent: re-running it
 * replaces the same documents by `_id` rather than duplicating them.
 *
 * Prerequisites:
 *   1. .env.local has NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET
 *   2. Generate a write token at sanity.io/manage → API → Tokens
 *      (role: Editor is enough), and add it as SANITY_WRITE_TOKEN
 *
 * Usage:
 *   npm run seed:blog
 *   (which is `node --env-file=.env.local scripts/seed-blog.mjs`)
 */
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

// Project ID falls back to the value committed in src/sanity/env.ts so the
// seed runs with just SANITY_WRITE_TOKEN in .env.local — matches how the app
// resolves the project ID.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "x5omyul2";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-01";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error("✗ NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
  console.error("  Add it to .env.local. See .env.example.");
  process.exit(1);
}
if (!token) {
  console.error("✗ SANITY_WRITE_TOKEN is not set.");
  console.error("  Generate one at sanity.io/manage → API → Tokens (Editor role).");
  console.error("  Add it to .env.local as SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// ─── Portable Text helpers ───────────────────────────────────────────
const key = () => randomUUID().slice(0, 12);
const span = (text, marks = []) => ({ _type: "span", _key: key(), marks, text });
const block = (style, children, extras = {}) => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children,
  ...extras,
});
const p = (text) => block("normal", [span(text)]);
const h2 = (text) => block("h2", [span(text)]);
const h3 = (text) => block("h3", [span(text)]);
const quote = (text) => block("blockquote", [span(text)]);
const bullet = (text) =>
  block("normal", [span(text)], { listItem: "bullet", level: 1 });
const callout = (tone, title, body) => ({
  _type: "callout",
  _key: key(),
  tone,
  title,
  body,
});
const refTo = (id) => ({ _type: "reference", _ref: id });
const refToKeyed = (id) => ({ _type: "reference", _key: key(), _ref: id });

// ─── Authors ─────────────────────────────────────────────────────────
const authors = [
  {
    _id: "author.cf-engineering",
    _type: "author",
    name: "California Fastener Engineering",
    slug: { _type: "slug", current: "cf-engineering" },
    role: "House byline · Vacaville, CA",
    bio: "Notes from the shop floor and the sales engineers on the phone. Rename or replace this author in the Studio with your own.",
  },
];

// ─── Categories ──────────────────────────────────────────────────────
const categories = [
  {
    _id: "category.engineering",
    _type: "category",
    title: "Engineering",
    slug: { _type: "slug", current: "engineering" },
    description:
      "Material choice, specs, grades — what to specify and why.",
  },
  {
    _id: "category.field-notes",
    _type: "category",
    title: "Field notes",
    slug: { _type: "slug", current: "field-notes" },
    description:
      "What we learned solving real fastener problems for Bay Area shops, EPCs, and OEMs.",
  },
  {
    _id: "category.industry",
    _type: "category",
    title: "Industry",
    slug: { _type: "slug", current: "industry" },
    description:
      "Standards updates, market shifts, and what's changing upstream of our stock.",
  },
];

// ─── Posts ───────────────────────────────────────────────────────────
const posts = [
  {
    _id: "post.f1554-grades-chart",
    _type: "post",
    title: "F1554 Grade 36, 55, and 105: the only chart you need",
    slug: { _type: "slug", current: "f1554-grades-chart" },
    summary:
      "Three F1554 anchor bolt grades, three yield strengths, three different ways they show up on a drawing. Here's how to pick — and what to watch for when the spec is ambiguous.",
    publishedAt: "2026-05-10T12:00:00Z",
    featured: true,
    author: refTo("author.cf-engineering"),
    categories: [refToKeyed("category.engineering")],
    body: [
      p(
        "ASTM F1554 is the umbrella standard for anchor bolts used to anchor structural supports — column base plates, equipment skids, light poles. It defines three grades by minimum yield: Grade 36, Grade 55, and Grade 105. Most of the confusion on incoming drawings comes from not specifying which grade, or assuming Grade 55 is dual-certified when it isn't.",
      ),
      h2("Grade 36"),
      p(
        "Plain carbon steel, 36 ksi minimum yield. The workhorse for light to moderate loads — sign posts, light standards, small base plates. Weldable. Mark end: no color (or stamped grade designation only).",
      ),
      h2("Grade 55"),
      p(
        "Higher strength, 55 ksi minimum yield, also weldable. The common ask for structural base plates in commercial construction. Mark end: yellow paint. Often supplied dual-certified to A572 Grade 55, but you have to specify supplemental requirement S1 on the order if you need the dual cert — it's not automatic.",
      ),
      callout(
        "spec",
        "Dual certification ≠ default",
        "Grade 55 is dual-certifiable to A572 Gr 55, but the mill won't run the extra chemistry/charpy tests unless you call out S1 on the PO. If your structural engineer relied on A572 properties, that supplementary line matters.",
      ),
      h2("Grade 105"),
      p(
        "Quenched-and-tempered alloy steel, 105 ksi minimum yield. Used for heavy equipment anchors, transmission structures, and any case where the engineer needs the load without the bolt diameter. Mark end: red paint. Not weldable; threads must be rolled or cut before quench.",
      ),
      h3("When the drawing just says 'F1554'"),
      p(
        "Default to Grade 36 unless context says otherwise — but call the engineer. We've seen jobs where 'F1554' on the title block meant Grade 105, and the difference between 36 and 105 in 1-1/4\" diameter is the difference between an installer carrying the anchor and needing a forklift.",
      ),
    ],
  },

  {
    _id: "post.why-spec-library",
    _type: "post",
    title: "Why we built a 35-spec library nobody asked for",
    slug: { _type: "slug", current: "why-spec-library" },
    summary:
      "Customers don't ask for a spec library. They ask why their B7 stud bolts came with 2H nuts instead of grade 8. The library is the answer to that question, written before the question gets asked again.",
    publishedAt: "2026-05-03T12:00:00Z",
    author: refTo("author.cf-engineering"),
    categories: [refToKeyed("category.field-notes")],
    body: [
      p(
        "We track every phone call that starts with 'is this the right…'. Over the last five years the same fifteen specifications come up over and over — F1554, A325/F3125, A193 B7, A194 2H, F593, A574, A307. We could keep answering them on the phone, or we could write the answers down once and link to them from every product page.",
      ),
      p(
        "The Spec Library is the second option. Thirty-five standards in plain English. Each one opens with an 'at-a-glance' for engineers who are diving in cold from a drawing, then expands into grades stocked, typical pairings, and the industries where it shows up.",
      ),
      h2("What it's not"),
      p(
        "It's not a replacement for the standard itself. We don't reproduce charts that ASTM, ASME, or ISO sell — that would be a copyright issue. If you need exact dimensional tables, you still buy the standard or use a vetted handbook. The library is for the question 'what is this and when do I use it?', not 'what's the minor diameter tolerance class on a 1-3/4 UNC-2A thread?'",
      ),
      h2("What it is"),
      bullet("A landing page for every spec we stock against, with a kicker that explains what the standard covers in one paragraph."),
      bullet("A 'common grades stocked' field, so a procurement engineer can confirm at a glance that we actually have the grade they need."),
      bullet("Cross-references — when one standard mentions another (A325 → F3125, A193 → A194), the link is automatic."),
      h2("Why it shipped before the rest of the rebuild"),
      p(
        "Because it doesn't depend on anything else. The spec library is content — it doesn't need a quote form, an interactive sizer, or a shopping cart. We could ship it the day we had thirty-five drafts in place, and start collecting search referrals while the product pages caught up.",
      ),
      callout(
        "note",
        "We're at 35 specs, but 4 are stubs",
        "DIN 931, DIN 934, ISO 898-1, and ISO 3506 ship marked as work-in-progress. The slugs are stable — when proper copy lands, the URLs don't change.",
      ),
    ],
  },

  {
    _id: "post.field-cut-vs-shop-cut",
    _type: "post",
    title: "Field-cut vs shop-cut threaded rod: when it pays to send the saw out",
    slug: { _type: "slug", current: "field-cut-vs-shop-cut" },
    summary:
      "Cut-to-length B7 rod in 50-foot bundles is cheap. Job-site cutting is slow, dirty, and ruins thread starts. Here's how we decide which way to ship.",
    publishedAt: "2026-04-22T12:00:00Z",
    author: refTo("author.cf-engineering"),
    categories: [refToKeyed("category.engineering"), refToKeyed("category.field-notes")],
    body: [
      p(
        "Every week or two a contractor calls and asks for 50-foot bundles of 1\" B7 because they want to cut on site. About half the time, that's the right answer. The other half, we ship pre-cut at the same delivered cost and save them three hours per crew per day.",
      ),
      h2("When field-cut wins"),
      bullet("The job is genuinely uncertain on lengths. New construction with surveyor changes, or a retrofit where embed depths are TBD until demo opens the slab."),
      bullet("The shop has good thread-restoration tooling — a die-grinder pass on a freshly-sawn end can recover a thread start, but only if someone on site knows the trick and has the right die."),
      bullet("Volumes are small. Sending us forty individual cut lengths to ship + label + pack costs more than handing the field a band saw."),
      h2("When shop-cut wins"),
      bullet("The schedule is fixed. If a cut list is in the bid package, send it to us. We cut on horizontal cold saws, deburr both ends, and re-chamfer threads. The crew never touches a die-grinder."),
      bullet("Galvanized rod. Once you saw it on site, the cut end is bare steel. We can dip-recoat or seal in the shop; the contractor usually can't."),
      bullet("Stainless. Sawing 316 with a portable abrasive wheel embeds carbon steel in the cut face. Field shops rarely have a wheel dedicated to stainless. Shop-cut, deburred, passivated is a different surface."),
      callout(
        "warning",
        "Field-cut threaded rod is not free thread",
        "A clean saw cut isn't a starting thread. If the rod is going through a tapped plate or a hex coupling nut, the first turn won't engage cleanly unless someone chamfers or restarts the thread. We've taken calls from crews trying to hammer rod into couplers — that's a re-order.",
      ),
      h3("Our default"),
      p(
        "Stainless, galvanized, anything over Grade 7 — shop-cut. Plain B7 in standard lengths to a known cut list — shop-cut. Everything else, ask the field what they want. The phone is faster than a wrong order.",
      ),
    ],
  },

  {
    _id: "post.reading-mill-certs",
    _type: "post",
    title: "Reading mill certs: what 'heat number traceable' actually buys you",
    slug: { _type: "slug", current: "reading-mill-certs" },
    summary:
      "A mill cert is one page of numbers most procurement teams file without reading. When a part fails — or when an auditor asks why you trusted the part to begin with — that page is the only thing that matters.",
    publishedAt: "2026-04-08T12:00:00Z",
    author: refTo("author.cf-engineering"),
    categories: [refToKeyed("category.engineering")],
    body: [
      p(
        "When we ship A193 B7 stud bolts on a critical job, every box ships with a Material Test Report — the mill cert. The cert is one page. Three things on it matter, and the rest is good housekeeping.",
      ),
      h2("1. The heat number"),
      p(
        "The heat number is the molten batch ID. Every bolt physically stamped with that heat number was forged from the same pour. If a single bolt in the bag fails laboratory testing later, you can trace back which other bags came from the same heat — and pull them off your shelves before they go in a flange.",
      ),
      h2("2. Chemistry"),
      p(
        "Eight to twelve element percentages — C, Mn, P, S, Si, Cr, Mo, Ni, V, Cu, sometimes B and Ti. Each one has a min/max from the standard (in B7's case, A193). If the cert chemistry violates the standard, the bolt isn't B7. We see this maybe twice a year on imported product — it's why we sample-test incoming lots from any mill we haven't audited.",
      ),
      h2("3. Mechanicals"),
      p(
        "Tensile strength, yield, elongation, reduction of area, and — for B7 over a certain size — impact (Charpy) at low temperature. These are the numbers the structural engineer relied on when they specified the bolt. If the cert says tensile 132 ksi and the standard requires 125 ksi minimum, you're inside the envelope. If it says 120, the part is non-conforming regardless of what's stamped on the head.",
      ),
      callout(
        "spec",
        "3.1 vs 2.2 certs",
        "EN 10204 3.1 = mill-issued cert with per-batch test results, signed by the mill's authorized inspector. 2.2 = type test report, declaring the lot conforms but without per-batch data. For ASME-code work, B31.3 piping, and most nuclear / pressure-vessel applications, 3.1 is the minimum. Confirm what your customer is contracted to require before ordering.",
      ),
      h3("Where we keep them"),
      p(
        "Every cert we issue is filed under the customer's PO number and the heat number for ten years. Auditors come around — sometimes from the customer, sometimes from a downstream insurer — and the question is always the same: can you produce this for batch 4471-A from 2019? Yes. That's what 'full traceability' means when it's on a marketing page.",
      ),
    ],
  },

  {
    _id: "post.a325-to-f3125",
    _type: "post",
    title: "A325 is gone — what F3125 changed, and what stayed the same",
    slug: { _type: "slug", current: "a325-to-f3125" },
    summary:
      "ASTM withdrew A325 (and A490) in 2016 and folded them into F3125. The grade names live on, the chemistry didn't change, but the marking and procurement language did. Here's the short version.",
    publishedAt: "2026-03-19T12:00:00Z",
    author: refTo("author.cf-engineering"),
    categories: [refToKeyed("category.industry")],
    body: [
      p(
        "If you specify high-strength structural bolts you've already noticed that 'A325' shows up on drawings but not on most current ASTM listings. That's because ASTM consolidated four separate high-strength bolt specs — A325, A490, F1852, and F2280 — into one umbrella in 2016: F3125.",
      ),
      h2("What F3125 is"),
      p(
        "F3125 / F3125M is a single spec covering high-strength structural bolts in four grade designations: A325, F1852 (twist-off A325), A490, F2280 (twist-off A490). Each grade keeps its own chemistry, mechanical, and marking requirements — those didn't change. The umbrella just unifies the procurement and acceptance criteria.",
      ),
      h2("What stayed the same"),
      bullet("Grade A325 still means 120 ksi tensile minimum (sizes ≤ 1\")."),
      bullet("Grade A490 still means 150 ksi tensile, with the same restriction against galvanizing."),
      bullet("Head markings carry the grade designation, not 'F3125'."),
      bullet("AISC's structural bolt specifications reference F3125 grades and the rest of the joint behavior (RCSC bolt spec) is unchanged."),
      h2("What changed"),
      bullet("Drawings and POs ideally now read 'F3125 Grade A325' instead of just 'A325' — though most engineers still write the legacy form, and that's fine."),
      bullet("The withdrawn specs (A325, A490, F1852, F2280) shouldn't be cited as if they were active standards in new procurement language. They aren't — they've been incorporated."),
      bullet("Quality programs that audit your supplier's documentation should look for F3125 acceptance criteria, not the withdrawn spec's."),
      callout(
        "note",
        "You can still write 'A325' on a drawing",
        "The grade designation A325 is preserved inside F3125. Engineers and steel fabricators routinely call them A325 bolts. We stock them with mill certs that reference F3125 Grade A325, which is the correct current language.",
      ),
    ],
  },
];

// ─── Push ────────────────────────────────────────────────────────────
async function run() {
  console.log(
    `\nSeeding into project=${projectId} dataset=${dataset}\n` +
      `  authors:    ${authors.length}\n` +
      `  categories: ${categories.length}\n` +
      `  posts:      ${posts.length}\n`,
  );

  const tx = client.transaction();
  for (const doc of [...authors, ...categories, ...posts]) {
    tx.createOrReplace(doc);
  }
  await tx.commit();

  console.log("✓ Seed committed.");
  console.log("\nNext:");
  console.log("  · Open /studio to verify the documents arrived.");
  console.log("  · Visit /blog to see the listing render.");
  console.log("  · Run this script again to overwrite — it's idempotent.\n");
}

run().catch((err) => {
  console.error("\n✗ Seed failed:");
  console.error(err);
  process.exit(1);
});
