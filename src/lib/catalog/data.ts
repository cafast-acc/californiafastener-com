/* ============================================================
   California Fastener — 2026 product catalog content.
   Single source of truth for the printable /catalog document.
   Ported from the "Contrast" design handoff. Reflects 2026
   redlines: Screws section cut · commodity lines trimmed ·
   sections renumbered · 28k SKUs · procurement-first language.
   HTML entities below are intentional — they render inside
   dangerouslySetInnerHTML spans that allow <em> and &Prime;.
   ============================================================ */

export type Brand = {
  name: string;
  addr: string;
  city: string;
  street: string;
  phone: string;
  web: string;
  vol: string;
  headline: string;
};

export type TocRow = { n: string; name: string; hint: string; pg: string };
export type OrderStep = { n: string; t: string; b: string };

export type Family = {
  /** Family name, e.g. "Hex Bolts". May contain &amp;. */
  n: string;
  /** Running index, e.g. "01.01". */
  i: string;
  /** Spec chips. First chip renders in blue. */
  s: string[];
  /** Bulleted stock items. */
  items: string[];
};

export type Section = {
  num: string;
  page: string;
  eyebrow: string;
  foot: string;
  /** Path to the seamless figure-band render, relative to /assets/catalog/. */
  render: string;
  title: string;
  lede: string;
  families: Family[];
};

export type AstmRow = { c: string; d: string };
export type Alloy = { n: string; brand: string; use: string };
export type ShopCap = { n: string; t: string; b: string };

export type Catalog = {
  brand: Brand;
  toc: TocRow[];
  order: OrderStep[];
  sections: Section[];
  astm: AstmRow[];
  f1554: AstmRow[];
  alloys: Alloy[];
  capabilities: { fasteners: [string, string][]; cnc: [string, string][] };
  shopCaps: ShopCap[];
  lindapter: {
    blurb1: string;
    blurb2: string;
    creds: string[];
    stock: string[];
  };
};

export const CATALOG: Catalog = {
  brand: {
    name: "California Fastener",
    addr: "465 Industrial Way · Benicia, CA 94510",
    city: "Benicia, California 94510",
    street: "465 Industrial Way, Ste A",
    phone: "(707) 741-3277",
    web: "californiafastener.com",
    vol: "Vol. 01 · 2026",
    headline: "Fasteners for the Next Generation of Building.",
  },

  toc: [
    { n: "01", name: "Bolts, <em>all twelve grades</em>", hint: "Hex · Heavy · Structural · Lag · Carriage", pg: "03" },
    { n: "02", name: "Threaded Rod, <em>cut to length</em>", hint: "A193 B7/B8/B8M/B16 · F1554 · A307", pg: "05" },
    { n: "03", name: "Nuts, <em>the whole drawer</em>", hint: "Hex · Heavy · Stainless · Lock · Specialty", pg: "06" },
    { n: "04", name: "Washers, <em>every callout</em>", hint: "Flat · Lock · Structural · Square", pg: "07" },
    { n: "05", name: "Socket Products &amp; <em>Set Screws</em>", hint: "Cap · Button · Flat · Cup · Square head", pg: "08" },
    { n: "06", name: "Anchors, <em>all hold-types</em>", hint: "Wedge · Sleeve · Drop-in · Anchor bolts", pg: "09" },
    { n: "07", name: "Materials &amp; <em>Specifications</em>", hint: "ASTM grades · Specialty alloys · Anchor rod", pg: "10" },
    { n: "08", name: "Machine Shop &amp; <em>Capabilities</em>", hint: "Threading · Cutting · Bending · CNC", pg: "11" },
    { n: "09", name: "Lindapter® <em>steelwork</em>", hint: "Hollo-Bolt® · Girder Clamps · no-weld", pg: "12" },
    { n: "10", name: "Contact &amp; <em>order desk</em>", hint: "Phone · Will-call · Hours · 24/7 line", pg: "14" },
  ],

  order: [
    { n: "01 · Send", t: "Spec, BOM, or just <em>the grade</em>", b: "Email, fax, or walk it in. PDF, drawing, scribble — all fine." },
    { n: "02 · Quote", t: "Stock check, <em>written quote</em>", b: "Size, grade, finish, lead time — confirmed before anything ships." },
    { n: "03 · Procure", t: "Sourced &amp; cut <em>in-house</em>", b: "Threading, cutting, bending, drilling — handled per job." },
    { n: "04 · Ship", t: "Same-day, <em>or pickup</em>", b: "Will-call 6 a.m.–4 p.m. · 24/7 emergency." },
  ],

  sections: [
    {
      num: "01", page: "03 / 14", eyebrow: "Section 01 · Bolts I", foot: "01 — Bolts I", render: "renders/render-bolt.png",
      title: "Hex, heavy hex, <em>tap.</em>",
      lede: "A307 through L9. Plain, zinc, hot-dip, yellow, black phos. Metric and imperial. USA &amp; import — both stocked.",
      families: [
        { n: "Hex Bolts", i: "01.01", s: ["A307", "GR. A", "PLAIN", "ZINC", "HDG"],
          items: ["A307 Grade A Plain", "A307 Grade A Zinc", "A307 Grade A HDG", "Square Lag A307 Gr. A Plain"] },
        { n: "Hex Tap Bolts", i: "01.02", s: ["A307 / GR. 5", "PLAIN", "ZINC"],
          items: ["A307 Gr. A Plain", "A307 Gr. A Zinc", "Grade 5 Plain", "Grade 5 Zinc"] },
        { n: "Heavy Hex Bolts", i: "01.03", s: ["A193 / A307", "B7", "GR. B", "HDG"],
          items: ["A193 Grade B7 Plain", "A307 Grade B Plain", "A307 Grade B Zinc", "A307 Grade B HDG"] },
        { n: "Hex Lag Screws", i: "01.04", s: ["PLAIN", "ZINC", "HDG", "18-8 SS"],
          items: ["Plain", "Zinc", "Hot-Dip Galvanized", "18-8 Stainless Steel"] },
        { n: "Grade 2 Cap Screw", i: "01.05", s: ["SAE J429", "GR. 2"],
          items: ["Grade 2 Plain", "Grade 2 Zinc"] },
        { n: "Grade 5 &amp; 8.8 Cap", i: "01.06", s: ["SAE / ISO", "GR. 5", "8.8"],
          items: ["Grade 5 Plain (TWN/CHN/USA)", "Grade 5 Zinc (TWN/USA)", "Grade 5 Zinc/Yel (IMP)", "Class 8.8 DIN 933/961 Plain", "Class 8.8 DIN 931/960 Plain", "Class 8.8 Zinc/Blue"] },
        { n: "Grade 8 &amp; 10.9 Cap", i: "01.07", s: ["SAE / ISO", "GR. 8", "10.9"],
          items: ["Grade 8 Plain (IMP/USA)", "Grade 8 Zinc/Yel (IMP/USA)", "Class 10.9 DIN 933/961 Plain", "Class 10.9 DIN 931/960 Plain", "Class 10.9 Zinc/Blue", "Class 10.9 Zinc/Yellow"] },
        { n: "L9® &amp; Grade 9", i: "01.08", s: ["USA-MADE", "180 KSI", "HIGH HEAD"],
          items: ["High Head Hex Cap Screw", "Zinc/Yel (USA)", "Hex Nuts Cad. Yellow + Wax", "L9 Collar Locknuts", "USS Tension Washers Zinc/Yel"] },
      ],
    },
    {
      num: "01", page: "04 / 14", eyebrow: "Section 01 · Bolts II", foot: "01 — Bolts II", render: "renders/render-structural.png",
      title: "Structural, stainless, <em>and the rest.</em>",
      lede: "A325 / A490 — TC and Type 1, USA &amp; import. F593 stainless. Plus carriage, square-head, step and timber.",
      families: [
        { n: "Structural Bolts", i: "01.09", s: ["A325 / A490", "TYPE 1", "TC", "HDG"],
          items: ["A325 TC Plain Assembly (IMP/USA)", "A325 Type 1 HDG (IMP/USA)", "A325 Type 1 Plain (IMP/USA)", "A490 TC Plain Assembly (IMP/USA)", "A490 Type 1 Plain (IMP/USA)"] },
        { n: "Stainless Bolts", i: "01.10", s: ["F593 / A193", "18-8", "316", "B8", "B8M"],
          items: ["18-8 / F593 Hex Cap Screws", "316 / F593 Hex Cap Screws A2", "Metric Hex Cap Screws", "18-8 / F593 Full Thread", "A193 B8 Heavy Hex", "A193 B8M Heavy Hex"] },
        { n: "Carriage Bolts", i: "01.11", s: ["A307 / GR. 5", "PLAIN", "ZINC", "HDG", "18-8"],
          items: ["A307 Gr. A Plain", "A307 Gr. A Zinc", "A307 Gr. A HDG", "Grade 5 Zinc", "18-8 Stainless", "Class 4.6 DIN 603 Zinc"] },
        { n: "Square Head Bolts", i: "01.12", s: ["A307", "GR. A", "PLAIN", "ZINC", "HDG"],
          items: ["A307 Gr. A HDG", "A307 Gr. A Plain", "A307 Gr. A Zinc"] },
        { n: "Step &amp; Timber Bolts", i: "01.13", s: ["FULL THREAD", "A307", "HDG"],
          items: ["Step Bolts Full Thread Plain", "Step Bolts Full Thread Zinc", "Timber Bolts A307 Gr. A HDG"] },
      ],
    },
    {
      num: "02", page: "05 / 14", eyebrow: "Section 02 · Threaded Rod", foot: "02 — Threaded Rod", render: "renders/render-stud.png",
      title: "Studs and rod, <em>cut to length.</em>",
      lede: "A193 B7, B8, B8M, B16. F1554 in 36 / 55 / 105. A307. Plain, PTFE/Xylan-coated, or HDG — cut, threaded, and bagged in-house, usually same-day.",
      families: [
        { n: "Alloy Threaded Rod", i: "02.01", s: ["A193 / F1554", "B7", "B16", "F1554-55", "F1554-105"],
          items: ["A193 Gr. B7 — AISI 4140/42 Q&amp;T", "A193 Gr. B7 PTFE / Xylan (TFL)", "A193 Gr. B16 — Cr-Mo-V heat treated", "F1554 Grade 55 — HSLA", "F1554 Grade 105 — alloy heat-treated"] },
        { n: "Stainless Threaded Rod", i: "02.02", s: ["AISI / F593", "304", "316", "B8 / B8M"],
          items: ["AISI 304 / F593", "AISI 316 / F593", "B8 Cl. 1 &amp; 2 — 304 carbide", "B8M Cl. 1 &amp; 2 — 316 carbide"] },
        { n: "Carbon Threaded Rod", i: "02.03", s: ["A307 / F1554-36", "NC", "NF", "HDG"],
          items: ["A307 All-Thread Plain", "A307 All-Thread Zinc (NC/NF)", "A307 All-Thread HDG", "F1554 Grade 36"] },
        { n: "Cut to Length", i: "02.04", s: ["IN-HOUSE", "SAW", "ROLL", "BEND"],
          items: ["Cut up to 12 ft", "Hot-bent J / L hooks", "Tagged + bagged by mark", "Mill certs on request"] },
        { n: "Anchor Bolt Kits", i: "02.05", s: ["ASSEMBLED", "HDG", "2H NUT", "F436"],
          items: ["Anchor Bolt + Nut + Washer HDG", "Headed anchors per drawing", "F1554 36/55/105 to print", "Stocked &amp; cut to 1-3/4&Prime; dia."] },
        { n: "Common Pulls", i: "02.06", s: ["STOCKED HOT", "1/4–1-3/4&Prime;", "METRIC"],
          items: ["3/8&Prime;–1-1/4&Prime; B7 — full racks", "1/2&Prime;–1&Prime; 304/316 — full racks", "5/8&Prime;–1-3/4&Prime; F1554 36 HDG", "Metric B7 / all-thread (M8–M72)"] },
      ],
    },
    {
      num: "03", page: "06 / 14", eyebrow: "Section 03 · Nuts", foot: "03 — Nuts", render: "renders/render-nut.png",
      title: "Nuts, <em>the whole drawer.</em>",
      lede: "Finished hex, heavy hex, jam, lock, stainless, and the assorted rest. A194, A563, DIN 934 — plain, zinc, hot-dip, silicon bronze.",
      families: [
        { n: "Finished Hex Nuts", i: "03.01", s: ["A563 / DIN 934", "CARBON", "SS", "SILICON BRONZE"],
          items: ["Carbon — Plain / Zinc / HDG", "Grade 5 · Grade 8", "Silicon Bronze (Everdur®)", "Silicon Bronze — Tin-plated", "Brass", "DIN 934 Class 8 / 10"] },
        { n: "Hex Jam Nuts", i: "03.02", s: ["FINISHED / THIN", "PLAIN", "ZINC", "HDG"],
          items: ["Finished Hex Jam Plain", "Finished Hex Jam Zinc · HDG", "Heavy Thin Gr. A Plain / Zinc", "Class 4 DIN 439B Zinc"] },
        { n: "Heavy Hex Nuts", i: "03.03", s: ["A194 / A563", "2H", "GR. C / DH", "HDG"],
          items: ["A194 2H Plain (USA)", "A194 2H HDG (USA)", "A194 2H Xylan Blue", "A563 Gr. C Plain / Zinc", "A563 Gr. DH HDG/Wax + Blue", "A563-A Plain/Zinc/Yel/HDG", "A563-A Gr. DH Plain / HDG"] },
        { n: "Alloy Heavy Nuts — Gr. 7", i: "03.04", s: ["A194", "GR. 7", "GR. 7M", "GR. 7L"],
          items: ["A194 Gr. 7 Heavy Hex (USA)", "A194 Gr. 7 HDG", "A194 Gr. 7M (metric)", "A194 Gr. 7L low-temp", "A194 Gr. 7 High Nut"] },
        { n: "Stainless Hex", i: "03.05", s: ["18-8 / 316", "HEAVY", "JAM", "METRIC"],
          items: ["18-8 Hex · 316 Hex", "18-8 Jam · Heavy Hex", "316 Heavy Hex", "Metric A2 · A4-80 DIN 934"] },
        { n: "Nylon Insert Locknuts", i: "03.06", s: ["SAE / ISO / SS", "GR. A", "CL. 10"],
          items: ["Gr. A Zinc (NE/NU/NM…)", "Gr. A NE Zinc/Yel", "DIN 982/985 · Class 10 DIN 985", "18-8 / 316 Nylon Insert", "DIN 985 A2 / A4-80"] },
        { n: "All-Metal Locknuts", i: "03.07", s: ["FLANGE / 980V", "GR. C", "CL. 8/10"],
          items: ["Gr. C Zinc/Wax · Cone (TWN)", "Serrated Flange Zinc", "Cl. 8 DIN 980V · 6923", "Cl. 10 DIN 980V Zinc/Wax"] },
        { n: "Assorted Nuts", i: "03.08", s: ["SPECIALTY", "CASTLE", "COUPLING", "SLOTTED"],
          items: ["Castle Nuts Plain", "Heavy Slotted Hex Coarse", "Hex Coupling A563-A Zinc", "Hex Coupling A563-A HDG"] },
      ],
    },
    {
      num: "04", page: "07 / 14", eyebrow: "Section 04 · Washers", foot: "04 — Washers", render: "renders/render-washer.png",
      title: "Washers, <em>every callout.</em>",
      lede: "USS, SAE, F436, square plate, fender. Plain, zinc, yellow, hot-dip, Xylan, Dacromet, stainless — by carton or by piece.",
      families: [
        { n: "Flat — Thru Hardened", i: "04.01", s: ["USS / SAE / MET", "PLAIN", "ZINC", "ZINC/YEL"],
          items: ["USS TH Plain / Zinc / Zinc-Yel (USA &amp; IMP)", "SAE TH Plain / Zinc / Zinc-Yel (USA &amp; IMP)", "SAE Extra Heavy Zinc/Yel", "ANSI B18.22M Metric Zinc/Blue"] },
        { n: "Flat — Stainless", i: "04.02", s: ["18-8 / 304", "T316", "A2"],
          items: ["18-8 / 304 SS — USS &amp; SAE", "T316 SS — USS &amp; SAE", "304 / 316 Fender", "MS15795 (mil-spec) 304", "A2 DIN 125A"] },
        { n: "Flat — Low Carbon", i: "04.03", s: ["50-LB CARTON", "USS", "SAE", "FENDER"],
          items: ["USS Plain / Zinc / Zinc-Yel / HDG", "SAE Plain / Zinc / Zinc-Yel / HDG", "Fender Plain / Zinc", "Cut plate &amp; OD specials"] },
        { n: "Split Lock Washers", i: "04.04", s: ["ALLOY / SS / HI-COLLAR", "T304", "T316"],
          items: ["Alloy — Plain / Zinc / Zinc-Yel / HDG", "T304 SS · T316 SS (domestic)", "Black Oxide", "Hi-Collar — Inch &amp; Metric"] },
        { n: "Structural Washers", i: "04.05", s: ["F436 / A325 DTI", "HDG", "XYLAN", "DACROMET"],
          items: ["F436 Plain / Zinc / Zinc-Yel", "F436 HDG (USA)", "F436 Xylan Blue · Dacromet", "A325 DTI Squirter Mech-Gal"] },
        { n: "Square &amp; Malleable", i: "04.06", s: ["F436 / MALLEABLE", "BEVELED", "PLATE"],
          items: ["Square Beveled F436 HDG / Plain", "Square Plate HDG / Plain", "Round Malleable HDG / Plain"] },
      ],
    },
    {
      num: "05", page: "08 / 14", eyebrow: "Section 05 · Socket Products", foot: "05 — Socket Products", render: "renders/render-socket.png",
      title: "Sockets, set screws, <em>square head.</em>",
      lede: "Cap, button, low-head, flat, shoulder. Set screws — every point. Alloy, 12.9, 14.9, stainless.",
      families: [
        { n: "Socket Cap Screws", i: "05.01", s: ["ALLOY / SS", "12.9"],
          items: ["Alloy Plain / Zinc Bake / Mech Zinc", "Alloy Plain Nylon Patch", "Alloy Cl. 12.9 DIN 912", "18-8 · 316 · A2", "Steel Alloy Plain (USA)"] },
        { n: "Flat / Low / Button", i: "05.02", s: ["12.9", "10.9", "ISO 7380"],
          items: ["Flat Alloy Plain/Zinc Bake/Mech", "Flat Cl. 12.9 DIN 7991", "Flat Cl. 10.9 ISO 10642", "Low Head Alloy / 10.9 DIN 7984", "Button Alloy / 12.9 ISO 7380", "Button 18-8 / A2"] },
        { n: "Shoulder &amp; Cup-Point", i: "05.03", s: ["ISO 7379", "DIN 916", "14.9"],
          items: ["Shoulder Alloy / 12.9 ISO 7379 / 18-8", "Cup Alloy Plain/Zinc/Mech", "Cup Locking Jam Plain", "Cup Cl. 14.9 DIN 916", "Cup 18-8 · 316 · A2"] },
        { n: "Set Screws — Points", i: "05.04", s: ["CONE", "OVAL", "DOG", "FLAT", "KNURL"],
          items: ["Cone Alloy / 14.9 DIN 914 / 18-8", "Oval Alloy / 18-8", "Half Dog Alloy / 18-8", "Full Dog Alloy / 14.9 DIN 915", "Flat Alloy / 14.9 DIN 913 / 18-8", "Knurled Alloy / 14.9"] },
        { n: "Square Head Set", i: "05.05", s: ["CASE HARD / ALLOY", "CUP", "FLAT"],
          items: ["Case Hard Cup Pt Plain / Fine", "Case Hard Half Dog / Flat / Cone / Oval", "Alloy Cup Pt Plain", "18-8 SS Cup Pt"] },
      ],
    },
    {
      num: "06", page: "09 / 14", eyebrow: "Section 06 · Anchors", foot: "06 — Anchors", render: "renders/render-anchor.png",
      title: "Anchors, <em>all hold-types.</em>",
      lede: "Wedge, sleeve, drop-in, and anchor-bolt assemblies — stocked and cut to 1-3/4&Prime; diameter. Steel, stainless, hot-dip.",
      families: [
        { n: "Wedge Anchors", i: "06.01", s: ["ZINC", "HDG", "304 / 316", "TO 1-3/4&Prime;"],
          items: ["Zinc-Plated", "Hot-Dip Galvanized", "T304 / 316 Stainless", "Hilti Kwik Bolt TZ / 3", "Stocked to 1-3/4&Prime; dia."] },
        { n: "Sleeve Anchors", i: "06.02", s: ["HEX", "ROUND", "FLAT", "ACORN"],
          items: ["Hex Nut — Zinc", "Hex Nut — 18-8 Stainless", "Round Head Zinc", "Flat Head Zinc", "Acorn Nut Zinc"] },
        { n: "Drop-In &amp; Expansion", i: "06.03", s: ["ZINC / SS", "SETTING TOOL"],
          items: ["Drop-In 18-8 Stainless", "Drop-In w/ Setting Tool Zinc", "Expansion Pin Drive Zinc Bake", "Expansion Shield Single / Double", "Lag Screw Expansion Long / Short"] },
        { n: "Anchor Bolt Assemblies", i: "06.04", s: ["HDG / KIT", "NUT + WASHER", "F1554"],
          items: ["Anchor Bolt + Nut + Washer HDG", "F1554 36 / 55 / 105 to print", "Hooked &amp; headed per drawing", "Cut &amp; bent to 1-3/4&Prime; dia."] },
      ],
    },
  ],

  astm: [
    { c: "A307", d: "Grades A &amp; B — carbon bolts &amp; studs · <b>SAE J429 (Gr. 2, 5, 8)</b>" },
    { c: "A36", d: "Carbon structural steel" },
    { c: "A193 / A194", d: "All grades — alloy &amp; stainless studs &amp; nuts (B7, B8, B8M, B16, 2H, Gr. 7)" },
    { c: "A276", d: "300 &amp; 400 Series Stainless" },
    { c: "A325", d: "Type I &amp; Type III structural bolts" },
    { c: "A354", d: "Grades BC &amp; BD — quenched &amp; tempered alloy" },
    { c: "A449", d: "Quenched &amp; tempered carbon &amp; alloy steel bolts" },
    { c: "A490", d: "Type I &amp; Type III high-strength structural" },
    { c: "A563", d: "All grades — heavy hex nuts (A, C, DH)" },
    { c: "F593 / F594", d: "18-8 &amp; 300 Series Stainless" },
  ],
  f1554: [
    { c: "Gr. 36", d: "<b>Low carbon, 36 ksi yield</b> — replaces A307 Gr. C" },
    { c: "Gr. 55", d: "<b>HSLA, 55 ksi yield</b>" },
    { c: "Gr. 105", d: "<b>Alloy, heat-treated, 105 ksi yield</b>" },
  ],
  alloys: [
    { n: "Alloy <em>20</em>", brand: "Carpenter® 20", use: "Sulfuric-acid service, chemical processing." },
    { n: "Alloy <em>C276</em>", brand: "Hastelloy® C276", use: "Severe corrosion, oxidizing &amp; reducing media." },
    { n: "Alloy <em>400 / K500</em>", brand: "Monel® 400 · K500", use: "Marine, brackish water, hydrofluoric acid." },
    { n: "Alloy <em>600–800</em>", brand: "Inconel® 600–800 Series", use: "High-temperature, oxidation-resistant service." },
    { n: "Silicon <em>Bronze</em>", brand: "Durium® · Everdur®", use: "Marine, electrical, architectural — non-magnetic." },
    { n: "<em>Aluminum</em>", brand: "6061 · 7075", use: "Lightweight, non-sparking, finishing-grade — per spec / mill cert." },
  ],

  capabilities: {
    fasteners: [
      ["Anchor bolts", "F1554 Gr 36/55/105 · A193 B7, B8M"],
      ["Structural bolts", "A325, A490, TC bolts"],
      ["Industrial / heavy hex", "Grade 5, 8 · A193 bolting"],
      ["Stud bolts &amp; threaded rod", "B7, B16, B8, B8M · cut to length"],
      ["U-bolts", "Standard &amp; custom profiles"],
      ["Stainless steel", "304, 316, duplex"],
      ["Silicon bronze", "Marine &amp; architectural"],
      ["Specialty / Lindapter", "Hollo-Bolt®, girder clamps"],
    ],
    cnc: [
      ["5-axis milling", "Tight as ±0.0005&Prime;"],
      ["Live-tooling lathes", "Bar &amp; chuck work"],
      ["Custom anchor bolt assemblies", "Headed, bent, with template plates"],
      ["Cut-to-length threaded rod", "Chamfered in-house"],
      ["Materials", "Carbon, alloy, stainless, Ti, Inconel, PEEK"],
      ["Inspection", "CMM + laser, full first-article"],
      ["Documentation", "MTRs, heat numbers, FAI on request"],
      ["Lead time", "Prototype: 3–5 days · production scheduled at quote"],
    ],
  },

  shopCaps: [
    { n: "8.1", t: "Thread<em>ing.</em>", b: "Roll &amp; cut, NC/NF/metric. Single-end, double-end, full thread to print. Up to 2&Prime;." },
    { n: "8.2", t: "Cut<em>ting.</em>", b: "Saw &amp; shear. Bar, rod, all-thread to length. Tagged, bagged, palletized." },
    { n: "8.3", t: "Bend<em>ing.</em>", b: "Hot &amp; cold bends — J, L, U hooks. Anchor bolts to drawing, by mark." },
    { n: "8.4", t: "Drill<em>ing.</em>", b: "Thru-holes, tapped holes, special-per-print mods. Mill certs on request." },
  ],
  lindapter: {
    blurb1:
      "Established 1934, Lindapter is the pioneer of steelwork clamping — the <em>Girder Clamp</em> and <em>Hollo-Bolt®</em>. No-weld, no-drill structural connections that save the hot-work permit.",
    blurb2:
      "Specified across airport baggage systems, service walkways, hangars, and terminal steel — anywhere fast structural fixings save days on the schedule.",
    creds: ["CE Mark", "Lloyds", "TÜV NORD", "DIBt"],
    stock: [
      "<b>Girder Clamps</b> — flange-to-flange &amp; flange-to-web, all sizes",
      "<b>Hollo-Bolt®</b> — expansion bolts for hollow structural section",
      "<b>Cavity Fixings</b> — Lindibolts &amp; rail-mount accessories",
      "<b>Specials</b> — sized to your detail with Lindapter engineering support",
    ],
  },
};

/** Parts-gallery items for page 13. [render-file, name, spec]. */
export const GALLERY: [string, string, string][] = [
  ["render-bolt", "Heavy Hex Bolt", "A193 B7"],
  ["render-structural", "Structural Bolt", "A325 / A490"],
  ["render-anchor", "Anchor Bolt Assembly", "F1554 · HDG"],
  ["render-stud", "Stud Bolt Kit", "B7 · PTFE / Xylan"],
  ["render-ubolt", "U-Bolt", "Custom profile"],
  ["render-socket", "Socket Head Cap Screw", "A574 · 12.9"],
  ["render-nut", "Heavy Hex Nut", "A194 2H"],
  ["render-washer", "Structural Flat Washer", "F436"],
  ["render-bronze-bolt", "Silicon Bronze Hex Bolt", "Everdur®"],
];
