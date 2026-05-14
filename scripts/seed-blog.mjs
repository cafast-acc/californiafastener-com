// Seed the Sanity dataset with sample Field Notes content matching the
// design template at design/blog.html. Creates 1 author, 7 categories, and
// 10 sample blog posts. Safe to re-run: each doc has a deterministic _id so
// upserts replace existing copies rather than duplicating.
//
// Setup (one time):
//   1. Generate a Sanity API token at https://sanity.io/manage:
//        Your project → API → Tokens → Add API token
//        Name: "blog seed"
//        Permissions: Editor (write)
//        Copy the token.
//   2. Append to .env.local in the repo root:
//        SANITY_API_WRITE_TOKEN=sk...
//
// Run:
//   node --env-file=.env.local scripts/seed-blog.mjs
//
// To remove the sample content later, run with `--clear`:
//   node --env-file=.env.local scripts/seed-blog.mjs --clear

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("✗ NEXT_PUBLIC_SANITY_PROJECT_ID missing in env");
  process.exit(1);
}
if (!token) {
  console.error(
    "✗ SANITY_API_WRITE_TOKEN missing in env — generate one at sanity.io/manage → API → Tokens (Editor scope) and add it to .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const AUTHOR_ID = "author.marco-reyes.sample";

const CATEGORIES = [
  { slug: "materials-grades", title: "Materials & Grades" },
  { slug: "anchor-bolts", title: "Anchor Bolts" },
  { slug: "structural", title: "Structural" },
  { slug: "cnc-machining", title: "CNC Machining" },
  { slug: "industry-insights", title: "Industry Insights" },
  { slug: "spec-compliance", title: "Spec & Compliance" },
  { slug: "case-studies", title: "Case Studies" },
];

// Build a simple Portable Text body from a list of paragraphs.
function body(paragraphs) {
  return paragraphs.map((text, i) => ({
    _key: `b${i}`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `s${i}`, _type: "span", text, marks: [] }],
  }));
}

const POSTS = [
  {
    slug: "why-distributors-cant-make-what-they-cant-source",
    title: "Why most distributors can't make what they can't source.",
    excerpt:
      "Bringing CNC in-house changed how we quote, how we deliver, and what \"non-standard\" actually means. A technical deep-dive into the Haas UMC-750 and ST-28Y, and how they reshape lead times on exotic materials.",
    publishedAt: "2026-04-08T08:00:00.000Z",
    categorySlugs: ["cnc-machining"],
    body: body([
      "Sample article — replace with real content. The thesis: a fastener distributor that can also machine its own parts isn't limited by what mills are shipping that week. We can quote on Tuesday, ship on Friday, even for grades that don't move off the shelf often.",
      "The Haas UMC-750 handles 5-axis work for shorter runs; the ST-28Y covers high-mix turning. Together they cover most of the exotic material requests we used to push to subcontractors.",
      "This intro placeholder keeps the page populated until real editorial is published.",
    ]),
  },
  {
    slug: "f1554-grade-36-vs-55-vs-105",
    title:
      "F1554 Grade 36 vs 55 vs 105: which grade does your baseplate actually need?",
    excerpt:
      "A decision guide for structural engineers, with common pitfalls and field examples from seismic zones.",
    publishedAt: "2026-04-12T08:00:00.000Z",
    categorySlugs: ["anchor-bolts"],
    body: body([
      "Sample article — replace with real content. Grade selection on anchor bolts is the most common over-spec we see. Grade 105 sounds safer; it's often slower to source, more expensive, and brings ductility tradeoffs you didn't ask for.",
      "Grade 36 covers most light-frame embeds. Grade 55 is the workhorse for moment-frame baseplates. Grade 105 is for moment connections and pre-tensioned applications — not the default.",
    ]),
  },
  {
    slug: "why-316-isnt-always-the-answer-marine",
    title: "Why 316 isn't always the answer for marine service.",
    excerpt:
      "When duplex, super duplex, or Monel beat \"just use 316\" — and how to know before you spec.",
    publishedAt: "2026-04-05T08:00:00.000Z",
    categorySlugs: ["materials-grades"],
    body: body([
      "Sample article — replace with real content. 316L is a fine default, but it pits in warm seawater, fails under stress-corrosion cracking above ~140°F, and crevice-corrodes anywhere two surfaces touch under saline.",
      "When the application sees splash zone, elevated temperature, or galvanic mixing, duplex 2205 or super-duplex 2507 are usually a better-cost-per-year-of-service answer than 316.",
    ]),
  },
  {
    slug: "a325-is-dead-what-replaced-it",
    title:
      "A325 is dead. What A325 replaced itself with, and what actually shipped in 2025.",
    excerpt:
      "The F3125 consolidation, how to read the new grade designations, and where A325 still appears in specs.",
    publishedAt: "2026-03-28T08:00:00.000Z",
    categorySlugs: ["structural"],
    body: body([
      "Sample article — replace with real content. A325 and A490 were withdrawn and folded into ASTM F3125 in 2015. Most specs have caught up; some legacy drawings still call out A325.",
      "Grade A in F3125 maps to old A325; Grade C maps to old A490. Hot-dip galv is now its own grade family within F3125 to handle hydrogen-embrittlement concerns explicitly.",
    ]),
  },
  {
    slug: "as9102-first-article-five-mistakes",
    title: "AS9102 First Article: the five mistakes we see every week.",
    excerpt:
      "From uncalibrated gauges to missing mill-test traceability, the issues that send FAIs back.",
    publishedAt: "2026-03-22T08:00:00.000Z",
    categorySlugs: ["spec-compliance"],
    body: body([
      "Sample article — replace with real content. The top reason FAIs come back: gauge calibration certs don't match the part's measurement date, or are missing entirely. Form 3 needs the cert ID, cal date, due date, and standard.",
      "Other recurring issues: untraceable raw stock, wrong revision on the print, missing heat-treat data, and balloon numbers that don't match between Form 2 and Form 3.",
    ]),
  },
  {
    slug: "data-center-buildouts-fastener-lead-times-2026",
    title:
      "What data-center buildouts are doing to fastener lead times in 2026.",
    excerpt:
      "Surging power-gen and data-center demand is pulling heavy-hex A193 B7 off shelves nationwide. Here's where we are.",
    publishedAt: "2026-03-15T08:00:00.000Z",
    categorySlugs: ["industry-insights"],
    body: body([
      "Sample article — replace with real content. Hyperscale demand is reshaping the heavy-hex and stud-bolt market. B7 in larger diameters (1-1/8\" and up) is on extended lead times across most mills.",
      "Substations, switchyards, and turbine-deck retrofits are pulling B7M and B16 too. If your project is in 2026 and the BOM has heavy-hex, get it on order now.",
    ]),
  },
  {
    slug: "five-axis-vs-three-plus-two",
    title: "Five-axis vs 3+2: when the extra axes actually earn their keep.",
    excerpt:
      "Not every part needs full 5-axis. A practical breakdown from 200+ jobs this year.",
    publishedAt: "2026-03-08T08:00:00.000Z",
    categorySlugs: ["cnc-machining"],
    body: body([
      "Sample article — replace with real content. True 5-axis simultaneous is the right tool for impellers, blades, and complex contours. Most of the parts that come through our shop don't need it — 3+2 indexing is faster and easier to program.",
      "Rule of thumb: if the toolpath can be broken into ≤6 flat orientations, 3+2 wins. If the surface is a single continuous curve, go full 5-axis.",
    ]),
  },
  {
    slug: "round-vs-square-bend-u-bolts",
    title: "Round vs square bend U-bolts: what pipe supports actually need.",
    excerpt:
      "A short guide for the piping engineer who wants to stop over-specifying square bends.",
    publishedAt: "2026-03-01T08:00:00.000Z",
    categorySlugs: ["anchor-bolts"],
    body: body([
      "Sample article — replace with real content. Round-bend U-bolts work for most cylindrical pipe; the contact load distributes across the bend. Square bends are for square or rectangular tube — using them on pipe wastes contact area.",
      "The exception: heavy structural pipe supports where you need the U-bolt to seat against a flat saddle. Then square is correct. Otherwise default to round.",
    ]),
  },
  {
    slug: "inconel-prototype-fourteen-units-four-days",
    title: "A prototype run of 14. Inconel. Four business days.",
    excerpt:
      "A customer story on how in-house CNC plus stocked exotics turned around a turbine retrofit.",
    publishedAt: "2026-02-22T08:00:00.000Z",
    categorySlugs: ["case-studies"],
    body: body([
      "Sample article — replace with real content. A gas-turbine OEM called Monday with a retrofit need: 14 custom fasteners in Inconel 718, drawing changes pending. They had a Friday install window.",
      "We had the bar stock on hand and CNC capacity open. First articles Wednesday, full run Friday morning, on the truck by noon. The story isn't speed — it's that we didn't have to wait for material.",
    ]),
  },
  {
    slug: "silicon-bronze-architectural-galvanic",
    title:
      "Silicon bronze in architectural cladding: when galvanic really matters.",
    excerpt:
      "A short primer for architects spec'ing exposed fasteners on mixed-metal facades.",
    publishedAt: "2026-02-15T08:00:00.000Z",
    categorySlugs: ["materials-grades"],
    body: body([
      "Sample article — replace with real content. Silicon bronze is the right call for exposed fasteners on copper, bronze, or terracotta cladding — galvanic compatibility plus the visual match.",
      "On aluminum or weathering-steel facades, silicon bronze is OK in dry climates and risky in coastal or freeze-thaw zones. Stainless is usually safer there even though the color is wrong.",
    ]),
  },
];

function categoryRef(slug) {
  return { _type: "reference", _ref: `category.${slug}.sample` };
}

function authorRef() {
  return { _type: "reference", _ref: AUTHOR_ID };
}

async function clearSample() {
  console.log("✂  Clearing sample content (docs with _id ending in .sample)…");
  const docs = await client.fetch(`*[_id match "*.sample"]._id`);
  if (docs.length === 0) {
    console.log("   nothing to clear.");
    return;
  }
  const tx = client.transaction();
  docs.forEach((id) => tx.delete(id));
  await tx.commit();
  console.log(`   deleted ${docs.length} docs.`);
}

async function seed() {
  console.log("→ Seeding author");
  await client.createOrReplace({
    _id: AUTHOR_ID,
    _type: "author",
    name: "Marco Reyes",
    slug: { _type: "slug", current: "marco-reyes" },
    role: "Operations Lead",
    bio: "Sample author for the seed dataset. Replace or remove when real authors are added.",
  });

  console.log("→ Seeding categories");
  const catTx = client.transaction();
  for (const c of CATEGORIES) {
    catTx.createOrReplace({
      _id: `category.${c.slug}.sample`,
      _type: "category",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
    });
  }
  await catTx.commit();

  console.log("→ Seeding posts");
  const postTx = client.transaction();
  for (const p of POSTS) {
    postTx.createOrReplace({
      _id: `post.${p.slug}.sample`,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt,
      body: p.body,
      author: authorRef(),
      categories: p.categorySlugs.map(categoryRef),
      publishedAt: p.publishedAt,
    });
  }
  await postTx.commit();

  console.log(
    `✓ Seeded 1 author, ${CATEGORIES.length} categories, ${POSTS.length} posts.`,
  );
  console.log("  Refresh /blog to see them.");
  console.log(
    "  To remove later: node --env-file=.env.local scripts/seed-blog.mjs --clear",
  );
}

const mode = process.argv.includes("--clear") ? "clear" : "seed";
try {
  if (mode === "clear") await clearSample();
  else await seed();
} catch (err) {
  console.error("✗ Seed failed:", err.message ?? err);
  process.exit(1);
}
