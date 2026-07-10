/**
 * Regenerates the downloadable product catalog PDF at
 *   public/california-fastener-catalog-2026.pdf
 *
 * The /catalog page is a print-styled document (8.5x11in `.page` blocks). We
 * render it to a full-bleed PDF with a headless browser so the "Save as PDF"
 * button can serve a deterministic file — instead of window.print(), which
 * depends on the visitor's print dialog (margins, "Background graphics"
 * toggle) and produces white side-strips / dropped backgrounds.
 *
 * Run it whenever the catalog content (src/lib/catalog/data.ts) changes:
 *
 *   npm run dev                       # in one terminal
 *   npm i -D playwright               # once, if not already installed
 *   npx playwright install chromium   # once
 *   node scripts/generate-catalog-pdf.mjs
 *
 * Optionally point at a different origin: CATALOG_URL=https://... node scripts/...
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL = process.env.CATALOG_URL ?? "http://localhost:3000/catalog";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "california-fastener-catalog-2026.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "load", timeout: 60000 });

// Trigger any lazy-loaded product renders before printing.
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 800) {
  await page.evaluate((_y) => window.scrollTo(0, _y), y);
  await page.waitForTimeout(80);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll("img")].map((i) => (i.complete ? null : i.decode().catch(() => {}))),
  );
});

// Full-bleed letter pages: printBackground preserves the dark cover / panels;
// zero margins remove the side-strips the browser print dialog introduces.
await page.pdf({
  path: OUT,
  width: "8.5in",
  height: "11in",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log(`Wrote ${OUT}`);
