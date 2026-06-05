/* Industry-page content. One entry per slug; the dynamic route at
   /industries/[slug] picks the matching record. Adding a new industry
   means adding a new entry below — no template changes needed.

   Sourced 1:1 from design_handoff_industries/industry.js so the visual
   port matches what the content team signed off on. */

export type IndustrySlug =
  | "oil-gas"
  | "power-generation"
  | "construction"
  | "power-transmission"
  | "manufacturing"
  | "infrastructure"
  | "marine"
  | "aerospace";

export type ProductCardKey =
  | "industrial"
  | "studbolt"
  | "anchor"
  | "custom"
  | "structural"
  | "precision"
  | "inserts"
  | "stainless"
  | "bronze"
  | "aerospace"
  | "superalloy";

export type Case = {
  title: string;
  problem: string;
  solution: string;
  results: string;
  quote: string;
  attr: string;
};

export type Industry = {
  /** SEO slug for the URL — currently informational; the route param
   *  uses the short key (e.g. "oil-gas"). Switch to this when canonical
   *  URLs change. */
  seoSlug: string;
  metaTitle: string;
  navLabel: string;
  eyebrow: string;
  h1: string;
  /** Substring of h1 to wrap with .accent (case-insensitive). Empty = no accent. */
  h1Accent: string;
  h2: string;
  lead: string;
  heroImg: string;
  heroImgAlt: string;
  heroTag: string;

  contextH2: string;
  contextBody: string[];

  bulletsH3: string;
  /** Five [term, description] tuples. */
  bullets: [string, string][];

  /** Four product card keys into PRODUCT_CARDS. */
  products: ProductCardKey[];

  casesH2: string;
  cases: Case[];

  whyH2: string;
  whyBody: string;

  quoteBody: string;
  quoteBg: string;
};

export type ProductCard = {
  title: string;
  sub: string;
  placeholder: string;
};

export const PRODUCT_CARDS: Record<ProductCardKey, ProductCard> = {
  industrial: { title: "Industrial Fasteners", sub: "A193, Gr 5/8, heavy hex", placeholder: "Industrial Hex" },
  studbolt: { title: "Stud Bolts & Threaded Rod", sub: "B7, B8, B16 · cut to length", placeholder: "Stud Bolt" },
  anchor: { title: "Anchor Bolts", sub: "F1554 · headed, bent, rod", placeholder: "Anchor Bolt" },
  custom: { title: "Custom Products", sub: "Built to your print", placeholder: "Custom Part" },
  structural: { title: "Structural Bolts", sub: "A325, A490, TC bolts", placeholder: "Structural Bolt" },
  precision: { title: "Precision Screws", sub: "Electronics & fine mech.", placeholder: "Precision Screw" },
  inserts: { title: "Threaded Inserts", sub: "For plastics and soft material", placeholder: "Threaded Insert" },
  stainless: { title: "Stainless Steel Fasteners", sub: "304, 316, duplex", placeholder: "Stainless Bolt" },
  bronze: { title: "Silicon Bronze Hardware", sub: "Marine & architectural", placeholder: "Bronze Bolt" },
  aerospace: { title: "Aerospace Hardware", sub: "NAS, MS, AN · Hi-Lok, lockbolts", placeholder: "Aero Bolt" },
  superalloy: { title: "Titanium & Superalloy", sub: "Ti, A286, Inconel 718", placeholder: "Titanium Bolt" },
};

export const INDUSTRIES: Record<IndustrySlug, Industry> = {
  "oil-gas": {
    seoSlug: "fasteners-for-oil-gas",
    metaTitle: "High-Quality Fasteners for the Oil and Gas Industry — California Fastener",
    navLabel: "Oil, Gas & Chemical",
    eyebrow: "Industries · Oil and Gas",
    h1: "Bolting for the pressure envelope.",
    h1Accent: "pressure envelope",
    h2: "Certified A193 and A320 bolting for upstream, midstream, and downstream service.",
    lead: "From sour-service wellheads to refinery flange kits, oil and gas demands traceable metallurgy and tight torque discipline. We stock the grades, cut the studs, and ship the paperwork — so your turnaround stays on the clock.",
    heroImg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/dcbe43bd-d8ab-4d13-afff-b45c323f0ade/AdobeStock_71932049.jpeg",
    heroImgAlt: "Offshore drilling platform at sea",
    heroTag: "Offshore · Upstream · Midstream · Downstream",
    contextH2: "NACE-compliant bolting, stocked for turnaround schedules.",
    contextBody: [
      "Flange kits for high-pressure piping, anchor bolts for compressor skids, and custom alloy studs for exchanger heads — every connection in an oil and gas facility carries a test-procedure number and an MTR trail.",
      "We run B7/B7M, B8/B8M, and L7/L7M bolting through the same line, with hot-dip galvanizing, Xylan, and PTFE coating in-house. When your turnaround schedule compresses, we ship kitted and tagged to the valve number.",
    ],
    bulletsH3: "Products engineered for oil and gas service.",
    bullets: [
      ["B7 & B7M Stud Bolts", "Standard alloy bolting for flanges rated to 800°F; B7M for sour service per NACE MR0175."],
      ["B8/B8M Stainless Studs", "304 and 316 stainless bolting for cryogenic, chloride, and chemical-exposure flanges."],
      ["L7 Low-Temp Studs", "Impact-tested alloy bolting for LNG, ethylene, and cold-climate pipeline service."],
      ["Heavy Hex Head Bolts", "A193 B7/B8M heavy hex for structural pipe supports, pig traps, and vessel skirts."],
      ["Custom Alloy & Coated", "Inconel 625/718, Monel K500, and Xylan 1424-coated fasteners — built to print."],
    ],
    products: ["studbolt", "industrial", "anchor", "custom"],
    casesH2: "Oil and gas fasteners at work.",
    cases: [
      {
        title: "Offshore platform flange replacement.",
        problem: "A Gulf operator needed 800 sets of B8M stud bolts for an exchanger retrofit — fully tagged, MTR-matched, and aboard the supply vessel in nine days.",
        solution: "We pulled 316 stainless from stock, cut and chamfered to exact stack-up lengths, and kit-bagged per flange tag number with MTRs and NACE certification per set.",
        results: "All 800 kits arrived on the vessel with zero discrepancies. The turnaround finished 14 hours ahead of the critical-path window.",
        quote: "They kitted to our valve list, not a PO line. That alone saved us two days of sorting on the platform.",
        attr: "Turnaround Manager, Gulf of Mexico operator",
      },
      {
        title: "Refinery FCC unit expansion.",
        problem: "An FCC unit expansion required L7 low-temp studs and Inconel 625 bolting across 40 custom lengths, with a shared delivery date for all 40 line items.",
        solution: "We consolidated alloy sourcing, ran the cuts in two parallel batches, and Xylan-coated the carbon bolting before kit assembly at our Vacaville facility.",
        results: "All 40 lengths shipped on one truck, one BOL. The fabricator rolled the kits directly to the pipe rack without re-inspection.",
        quote: "One call, one truck, one set of certs. That’s how refinery work should feel.",
        attr: "Procurement Lead, Gulf Coast refinery",
      },
    ],
    whyH2: "Why California Fastener for oil and gas.",
    whyBody: "We’ve supplied bolting to Gulf Coast refineries, West Texas midstream, and offshore operators for over three decades. That experience shows up in the small stuff — MTRs that match the heat stamps, NACE hardness testing on B7M, kitting by flange tag, and a phone that’s answered by someone who knows the difference between a raised-face and a ring-type joint.",
    quoteBody: "Turnaround clock ticking? Send us your valve list or flange schedule. We’ll pull grades from stock, cut to your stack-ups, and kit to your tag numbers — MTRs and NACE certs in the box, ready to bolt up.",
    quoteBg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/dcbe43bd-d8ab-4d13-afff-b45c323f0ade/AdobeStock_71932049.jpeg",
  },

  "power-generation": {
    seoSlug: "fasteners-for-power-generation",
    metaTitle: "High-Quality Fasteners for Power Generation — California Fastener",
    navLabel: "Power Generation",
    eyebrow: "Industries · Power Generation",
    h1: "Bolting that holds when the turbine spins up.",
    h1Accent: "turbine",
    h2: "High-temperature, creep-resistant fasteners for combined-cycle, nuclear, and renewable plants.",
    lead: "Generator foundation bolts, turbine casing studs, boiler manhole bolting, and blade-root fasteners — power plants live and die by the integrity of a few thousand threaded connections operating at temperature and under cyclic load.",
    heroImg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/1df61635-d95e-47b3-ba2b-633da74f8021/AdobeStock_170240857.jpeg",
    heroImgAlt: "Steam turbine and power plant generator hall",
    heroTag: "Combined-cycle · Nuclear · Hydro · Wind · Solar",
    contextH2: "From casing studs to foundation anchors.",
    contextBody: [
      "Combined-cycle gas turbines run bolting at 1050°F. Nuclear containment uses ASME III Section Q fasteners with full CMTR chains. Wind turbine flanges see a billion fatigue cycles in a 20-year life. Each application wants something different from a bolt, and we stock for all of them.",
      "B16 chrome-moly, Nimonic 80A for casing bolts, A354 BD for wind towers, F1554 55 for foundation anchors — plus Level 3 nuclear traceability when the application calls for it.",
    ],
    bulletsH3: "Products engineered for power generation.",
    bullets: [
      ["B16 Chrome-Moly Studs", "Creep-resistant alloy bolting for steam turbine casings and HP piping up to 1100°F."],
      ["Nimonic 80A & Inconel", "High-temp superalloy studs for gas turbine hot sections and transition pieces."],
      ["A354 BD Wind Bolts", "Pretensioned tower and flange bolting qualified for 20-year fatigue life."],
      ["F1554 Anchor Bolts", "Generator skid and transformer pad anchor assemblies, Grade 55 and 105."],
      ["Nuclear-Grade Fasteners", "ASME III / Level 3 traceable bolting with full CMTR chain of custody."],
    ],
    products: ["studbolt", "structural", "anchor", "custom"],
    casesH2: "Power generation fasteners at work.",
    cases: [
      {
        title: "Gas turbine major outage.",
        problem: "A 560MW combined-cycle plant needed Nimonic 80A casing studs for a 7FA hot-gas-path outage, with a 21-day window between shutdown and first fire.",
        solution: "We pulled certified Nimonic stock, cut to exact casing specs, rolled threads per OEM print, and shipped with full CMTR stack on day 6.",
        results: "Casing reassembly started on schedule. The unit returned to service 18 hours ahead of the dispatched outage plan.",
        quote: "Nimonic stock on the ground in California saved us an air freight from Europe. That one call paid for itself.",
        attr: "Outage Director, West Coast IPP",
      },
      {
        title: "Offshore wind tower flange bolting.",
        problem: "A developer needed A354 BD tower-flange bolts with HDG coating and matched heat lots across 48 turbines — all delivered to a staging port on a single day.",
        solution: "We ran the entire order on sequential heats, hot-dip galvanized in-house, and consolidated the shipment with load plans by turbine number.",
        results: "Every tower saw matched-heat bolting. Installation torqued through all 48 machines without a single retorque or rejection.",
        quote: "Matched heats across 48 machines isn’t a spec you can usually buy. They made it happen.",
        attr: "QA Manager, offshore wind EPC",
      },
    ],
    whyH2: "Why California Fastener for power generation.",
    whyBody: "Power plants don’t tolerate a bolt that’s almost right. We keep the alloy families most power work actually needs — B16, Nimonic, Inconel, A354 — on the shelf, with the mill-test reports, hardness traces, and ASME III documentation ready before you ask. When the outage window closes, we’re already in the truck.",
    quoteBody: "Outage planning? Send us the work-scope list. We’ll price the alloys, cut lengths, and prove the documentation package — so the bolting never becomes the long-lead item on the schedule.",
    quoteBg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/1df61635-d95e-47b3-ba2b-633da74f8021/AdobeStock_170240857.jpeg",
  },

  construction: {
    seoSlug: "fasteners-for-construction",
    metaTitle: "High-Quality Fasteners for Construction Projects — California Fastener",
    navLabel: "Construction",
    eyebrow: "Industries · Construction",
    h1: "Structural steel, fastened to the drawing.",
    h1Accent: "drawing",
    h2: "A325, A490, and TC bolts — on the shelf, on the truck, on the crane.",
    lead: "Data-center framing, hospital seismic bracing, tilt-up anchor templates, high-rise moment connections. When the erector is at the shake-out pile at 6am, the fasteners need to already be there — in the right grade, the right finish, and the right quantity.",
    heroImg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/1e76177d-d96a-4d9d-8931-3f7d049e12d7/construction.jpg",
    heroImgAlt: "Steel structural erection on a commercial project",
    heroTag: "High-rise · Data center · Commercial · Seismic",
    contextH2: "Structural fasteners kitted to the erection sequence.",
    contextBody: [
      "Structural steel is a sequencing business. The bolts don’t just need to arrive — they need to arrive in the same order the iron ships, bagged by connection type, so the bolt-up crew isn’t picking through a pile at elevation.",
      "We kit A325-N, A490-X, and TC bolts to your shop drawings, in galvanized, plain, and weathering finishes. For seismic work, we supply ASTM F3125-qualified bolting with the OCBC/SMF paperwork that the inspector of record is going to ask for.",
    ],
    bulletsH3: "Products engineered for structural construction.",
    bullets: [
      ["A325 Heavy Hex", "Standard structural bolting for bearing-type connections; plain, HDG, mechanically galvanized."],
      ["A490 Heavy Hex", "High-strength bolting for slip-critical and seismic moment connections."],
      ["TC (Tension-Control)", "Twist-off bolts for inspector-friendly pretensioning without calibrated wrenches."],
      ["F1554 Anchor Rods", "Grade 36, 55, and 105 anchor rods with nuts, washers, and templates."],
      ["Custom Embed Plates", "Weldable studs, anchor bolt assemblies, and tilt-up lifting inserts built to print."],
    ],
    products: ["structural", "anchor", "industrial", "custom"],
    casesH2: "Construction fasteners in action.",
    cases: [
      {
        title: "Downtown high-rise moment frame.",
        problem: "A 42-story steel high-rise needed A490-X bolting for moment connections across 18 sequenced erection lifts, with each lift on a different critical-path date.",
        solution: "We broke the order into 18 release tags, kit-bagged by column line and connection type, and held stock at our dock for call-off as the erector opened each pick.",
        results: "Zero bolt shortages across the frame. The erector hit every crane pick window from grade to penthouse.",
        quote: "They held our bolts like a bank holds cash. Pulled exactly what we needed, exactly when we called.",
        attr: "Project Manager, steel erector",
      },
      {
        title: "Hyperscale data center foundation.",
        problem: "A 2.4-million-square-foot data center needed F1554 Gr 55 anchor bolt assemblies, templates, and leveling nuts for 1,800 column locations on a 14-week pour schedule.",
        solution: "We built 1,800 kits with templates, heavy hex nuts, plate washers, and jam nuts — released by pour sequence to match the concrete contractor’s foundation plan.",
        results: "No hold-ups at any foundation pour. Anchor bolt templates were on site the morning each grid line was scheduled.",
        quote: "Anchor bolt coordination usually bleeds the schedule. This was the cleanest pour sequence we’ve run.",
        attr: "Superintendent, concrete contractor",
      },
    ],
    whyH2: "Why California Fastener for construction.",
    whyBody: "Structural work rewards companies who understand sequencing. We hold tag-based inventory against your erection drawings, release to the dock by lift or pour, and back every shipment with the F3125 mill paperwork your SI and IOR will ask to see. Thirty-plus years of shop-drawing kitting and we’ve never missed a crane pick because of the bolts.",
    quoteBody: "Send us your shop drawings and we’ll kit to your sequence — A325, A490, TC, or F1554 anchor assemblies, released to match your erection or pour schedule. Zero bolt shortages. Zero schedule surprises.",
    quoteBg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/1e76177d-d96a-4d9d-8931-3f7d049e12d7/construction.jpg",
  },

  "power-transmission": {
    seoSlug: "fasteners-for-power-transmission",
    metaTitle: "High-Quality Fasteners for Power Transmission — California Fastener",
    navLabel: "Power Transmission",
    eyebrow: "Industries · Power Transmission",
    h1: "The grid, bolted together.",
    h1Accent: "bolted together",
    h2: "Tower steel, substation hardware, and transmission pole bolting — galvanized and ready to string.",
    lead: "Every mile of 500kV line sits on thousands of galvanized bolts, shackles, and insulator hardware. Every substation A-frame is bolted, not welded. We supply the hardware that carries the load — plus the pole-line accessories you’re tired of sourcing from three different vendors.",
    heroImg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/79392af3-9542-4258-987d-76124ceec2f3/AdobeStock_182646517.jpeg",
    heroImgAlt: "High-voltage transmission tower against dusk sky",
    heroTag: "Transmission towers · Substations · Distribution",
    contextH2: "Hot-dip galvanized, from foundation to conductor.",
    contextBody: [
      "Transmission hardware lives outside for 50 years. That means G185 or 2.5oz/ft² hot-dip, ASTM F2329 processing, and strict control of hydrogen embrittlement on the high-strength stuff — the kind of detail that shows up in a RUS spec or a utility-approved materials list.",
      "We run A394 tower bolts, F3125 A325/A490 substation hardware, and full pole-line inventory — shackles, thimble-eyes, step bolts, guy hardware — all HDG to utility spec and test-documented.",
    ],
    bulletsH3: "Products engineered for power transmission.",
    bullets: [
      ["A394 Tower Bolts", "Type 0, 1, and 3 transmission tower bolting with locknuts and step nuts, G185 galvanized."],
      ["Substation Hardware", "A325/A490 bolting for dead-end A-frames, switch structures, and bus support stands."],
      ["Pole-Line Accessories", "Step bolts, guy hooks, thimble-eyes, shackles, and anchor rods — RUS-compliant."],
      ["Transmission Anchors", "F1554 Gr 55/105 anchor cages and stub angles for lattice tower foundations."],
      ["Custom Utility Hardware", "Obsolete pattern bolts, replacement cross-arm hardware, and specialty substation connectors."],
    ],
    products: ["structural", "anchor", "industrial", "custom"],
    casesH2: "Power transmission fasteners in action.",
    cases: [
      {
        title: "230kV line rebuild.",
        problem: "A utility rebuilding a 42-mile 230kV line needed 60,000+ A394 tower bolts across 210 lattice structures, staged to regional assembly yards on a rolling schedule.",
        solution: "We ran the galvanizing in four production lots to match the construction sequence and shipped to three regional yards by tower-structure number.",
        results: "All 210 structures kitted to assembly crews with the right bolt counts. No yard ran short, no truck ran back.",
        quote: "Staging 60,000 bolts to three yards by tower number is exactly the work most suppliers won’t do. They just did it.",
        attr: "Construction Manager, transmission utility",
      },
      {
        title: "Coastal substation rebuild.",
        problem: "A coastal substation needed A325 bolting with HDG + Xylan duplex coating to survive salt fog exposure and meet a utility-specific 75-year corrosion spec.",
        solution: "We hot-dip galvanized to F2329, then Xylan-topcoated in-house, with salt-spray test certs on each lot against the utility MAL.",
        results: "Project closed out with all bolting accepted on first inspection. The utility added the duplex coating to their approved spec.",
        quote: "Duplex coating on A325 isn’t off-the-shelf. They built the process and got it through our corrosion review.",
        attr: "Standards Engineer, West Coast utility",
      },
    ],
    whyH2: "Why California Fastener for power transmission.",
    whyBody: "Utility work is a paperwork business as much as a hardware business. We stock to the major utility MALs, test-document every HDG lot, and know the difference between a Type 1 and Type 3 A394 bolt without having to look it up. Transmission and distribution crews have been calling us for obsolete cross-arm hardware since the 1990s — and we still find it.",
    quoteBody: "Line rebuild, substation expansion, or just a cross-arm hardware replenishment? Send the BOM and the utility spec. We’ll match the MAL, stage to your yards, and ship with the test docs your compliance team needs.",
    quoteBg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/79392af3-9542-4258-987d-76124ceec2f3/AdobeStock_182646517.jpeg",
  },

  manufacturing: {
    seoSlug: "fasteners-for-manufacturing",
    metaTitle: "High-Quality Fasteners for the Manufacturing Industry — California Fastener",
    navLabel: "Manufacturing",
    eyebrow: "Industries · Manufacturing",
    h1: "Production-line fasteners that keep the takt time.",
    h1Accent: "takt time",
    h2: "Released to your schedule, binned to your line, torqued to your spec.",
    lead: "OEM assembly lines don’t stop for a bolt shortage. We run blanket orders, min/max bin programs, and VMI stocking for manufacturers of industrial machinery, agricultural equipment, and heavy-duty consumer product. Your kanban card — our problem.",
    heroImg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/606418c4-1057-49ac-821b-ce572774f5b9/AdobeStock_731342733.jpeg",
    heroImgAlt: "Industrial manufacturing assembly line",
    heroTag: "OEM · Ag equipment · Industrial machinery · Kitting",
    contextH2: "Blanket orders, bin stock, and custom prints.",
    contextBody: [
      "A manufacturing BOM doesn’t care about catalog minimums. It cares about the right 37,400 pieces hitting the stockroom the day before they’re scheduled on the line. That’s what a blanket order is supposed to do — and what most suppliers can’t actually execute.",
      "We run blanket-release PPAP-documented fasteners for OEM programs, custom-print parts from our in-house CNC department for the items you can’t buy, and VMI bin programs with barcode replenishment for the consumables.",
    ],
    bulletsH3: "Products engineered for manufacturing.",
    bullets: [
      ["Socket Head Cap Screws", "Alloy and stainless SHCS in inch and metric, packaged to your bin count."],
      ["Flange & Frame Bolts", "Grade 5, 8, 10.9, and 12.9 hex and flange bolts for equipment and frame assembly."],
      ["Threaded Inserts", "Heli-Coil, key-locking, and press-in inserts for aluminum castings and soft material."],
      ["PPAP / PPM Programs", "First-article AS9102/PPAP documented parts for automotive and industrial OEMs."],
      ["Custom CNC Parts", "In-house five-axis machining for proprietary fasteners, bushings, and pins."],
    ],
    products: ["precision", "industrial", "inserts", "custom"],
    casesH2: "Manufacturing fasteners in action.",
    cases: [
      {
        title: "Ag equipment OEM blanket program.",
        problem: "A tractor-implement OEM was running out of fasteners twice a month on a line producing 280 units per week — from six different suppliers with inconsistent lead times.",
        solution: "We consolidated 184 part numbers into a single blanket release, set min/max bin levels to daily production, and took over barcode replenishment.",
        results: "Zero line-down events in 14 months. The OEM reduced fastener inventory carrying cost by 31%.",
        quote: "We used to spend an hour a week chasing bolt shortages. Now I don’t think about it at all.",
        attr: "Materials Planner, ag equipment OEM",
      },
      {
        title: "Custom pin and bushing for CNC builder.",
        problem: 'A CNC machine tool builder needed a proprietary locating pin in 17-4 PH H1025, with a 0.0005" shoulder tolerance and no existing supplier willing to run 400/month.',
        solution: "We quoted, first-articled, and cut the pin on our in-house Swiss CNC — running 400-piece monthly releases with CMM inspection to the print.",
        results: "Two years of 100% on-time delivery with zero rejects. The pin became a catalog item for the builder.",
        quote: "Most fastener houses would have sent us to a machine shop. California Fastener is the machine shop.",
        attr: "Design Engineer, machine tool builder",
      },
    ],
    whyH2: "Why California Fastener for manufacturing.",
    whyBody: "We’re a fastener distributor with an in-house CNC department. That combination matters more than it sounds: when your BOM has one oddball part nobody stocks, we don’t kick it back — we machine it, document it, and release it against the same blanket order as the commodity bolts. One supplier, one purchase order, every part on the print.",
    quoteBody: "Send us your BOM — commodity fasteners and the custom stuff both. We’ll consolidate the release schedule, machine the oddballs in-house, and run the whole program off one purchase order against your production plan.",
    quoteBg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/606418c4-1057-49ac-821b-ce572774f5b9/AdobeStock_731342733.jpeg",
  },

  infrastructure: {
    seoSlug: "fasteners-for-infrastructure",
    metaTitle: "High-Quality Fasteners for the Infrastructure Industry — California Fastener",
    navLabel: "Infrastructure",
    eyebrow: "Industries · Infrastructure",
    h1: "Built for 75-year service lives.",
    h1Accent: "75-year",
    h2: "Bridge bolts, highway anchors, and Buy America-compliant hardware for public civil works.",
    lead: "DOT bridge decks, light-rail overpasses, tunnel segment liners, seismic retrofits. Infrastructure bolting has to survive 75 winters, meet Buy America provenance, and clear a federal inspection trail — and still show up when the contractor’s bar schedule says it should.",
    heroImg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/261f100b-3496-48f2-b1ee-245eca151e58/AdobeStock_753784784.jpeg",
    heroImgAlt: "Highway overpass and bridge infrastructure",
    heroTag: "Bridges · Highways · Transit · Civil",
    contextH2: "Buy America bolting with the paperwork to prove it.",
    contextBody: [
      "Federal infrastructure money comes with 23 CFR 635.410 provenance — melted and manufactured in the US, mill-test reports on file, and a domestic-content certification on every shipment. That’s not optional, and it’s not easy to source.",
      "We run a Buy America-qualified inventory: A325 Type 1 from US mills, F1554 anchor rods from US bar, and weathering-steel A709 hardware where the corrosion environment calls for it. Certifications ship with the bolts, not a week later by email.",
    ],
    bulletsH3: "Products engineered for infrastructure service.",
    bullets: [
      ["A325 Type 1 Domestic", "Buy America-compliant structural bolting for DOT bridge connections."],
      ["F3125 Weathering", "A325 Type 3 weathering-steel bolting for exposed bridge steel and Cor-Ten structures."],
      ["F1554 Anchor Assemblies", "Domestic-melt anchor rods, headed or bent, with templates for bridge bearing plates."],
      ["Galvanized Rebar Couplers", "HDG mechanical splices and dowels for cast-in-place bridge deck work."],
      ["Seismic Retrofit Hardware", "Post-tensioned and epoxy-anchor hardware for bridge column jacketing and retrofits."],
    ],
    products: ["structural", "anchor", "industrial", "custom"],
    casesH2: "Infrastructure fasteners in action.",
    cases: [
      {
        title: "DOT bridge deck replacement.",
        problem: "A state DOT project replacing a 1,400-ft river crossing needed 24,000 A325 Type 3 weathering-steel bolts with Buy America documentation on each heat lot.",
        solution: "We sourced from a domestic mill with melted-and-manufactured certification, organized the order into five sequenced lots by erection span, and shipped each lot with matched CMTRs.",
        results: "Every lot cleared DOT materials inspection on first submittal. The bridge deck closed out with zero fastener-related non-conformances.",
        quote: "Buy America paperwork that’s actually complete on the first try — that’s the difference. Everyone else plays email tag.",
        attr: "Resident Engineer, state DOT",
      },
      {
        title: "Light-rail seismic retrofit.",
        problem: "A seismic retrofit of a light-rail viaduct needed post-tensioned column jacket bolting in galvanized high-strength alloy, with field-modifiable lengths for as-built variation.",
        solution: "We supplied F3125 A490 rods with extra thread engagement and HDG per F2329, plus cut-to-length service at our facility for field re-orders within 48 hours.",
        results: "Field cut-to-length kept the retrofit moving through dozens of as-built variations without schedule impact.",
        quote: "They re-cut rods for us in 48 hours, three times. On a seismic retrofit, that’s gold.",
        attr: "Structural Engineer, transit authority",
      },
    ],
    whyH2: "Why California Fastener for infrastructure.",
    whyBody: "Public civil work has two masters: the engineer of record, and the federal compliance trail. We supply to both. US-melted steel on the shelf, CMTRs indexed by heat and lot, domestic-content certifications on letterhead, and a team that’s been reading DOT spec books since before Buy America was a political fight. The bolts are the easy part — the paperwork is the product.",
    quoteBody: "Federal-aid project, state DOT bridge, or transit retrofit? Send us the spec section and bar schedule. We’ll match the Buy America requirements, cut to your stack-ups, and ship with compliance documentation that clears first-round inspection.",
    quoteBg: "https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/261f100b-3496-48f2-b1ee-245eca151e58/AdobeStock_753784784.jpeg",
  },

  marine: {
    seoSlug: "fasteners-for-marine-shipbuilding",
    metaTitle: "Marine & Shipbuilding Fasteners — California Fastener",
    navLabel: "Marine & Shipbuilding",
    eyebrow: "Industries · Marine & Shipbuilding",
    h1: "Where the dock meets the deep.",
    h1Accent: "the deep",
    h2: "Hot-dip galvanized and duplex hardware for piers, moorings, and offshore structures.",
    lead: "Container terminals, ferry berths, fuel piers, mooring dolphins, and offshore platforms. Marine infrastructure stands in the splash zone for fifty years — where coating thickness, duplex steel, and corrosion allowance decide whether the structure makes its service life.",
    heroImg: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80",
    heroImgAlt: "Port cranes and pier infrastructure at the waterline",
    heroTag: "Ports · Piers · Moorings · Offshore",
    contextH2: "Splash-zone hardware, specified to survive the tide line.",
    contextBody: [
      "The splash zone is the most corrosive place on the planet for steel — wet, oxygenated, and loaded with chloride on every tide. Pier piles, fender systems, mooring hardware, and crane rails all live there, and the bolting has to last as long as the concrete around it.",
      "We supply heavy hot-dip galvanized A325 and F1554 anchorage, 2205 duplex hardware for the worst exposure, and field-modifiable mooring and fender bolting — coated to spec, test-documented, and staged to the marine contractor’s pour and pile schedule.",
    ],
    bulletsH3: "Fasteners engineered for marine infrastructure.",
    bullets: [
      ["HDG Anchor Systems", "F1554 Gr 55/105 anchor rods and templates for pier caps, bollards, and crane rails."],
      ["Duplex 2205 Hardware", "High-strength corrosion-resistant bolting for splash-zone and submerged connections."],
      ["Mooring & Fender Bolting", "Heavy galvanized hardware for dolphins, fenders, bollards, and quick-release hooks."],
      ["Structural Pier Bolts", "A325 HDG bolting for steel pile caps, walkways, and load-bearing marine framing."],
      ["Custom Marine Anchorage", "Long anchor bolts, tie rods, and embedment assemblies cut and coated to your drawing."],
    ],
    products: ["anchor", "structural", "stainless", "custom"],
    casesH2: "Marine infrastructure fasteners at work.",
    cases: [
      {
        title: "Container terminal crane rail.",
        problem: "A port expansion needed 4,000 hot-dip galvanized anchor bolts for ship-to-shore crane rails, with embedment templates staged to a tight pile-cap pour schedule.",
        solution: "We galvanized to F2329, built 4,000 anchor kits with templates and leveling nuts, and released them by pour sequence to match the marine contractor’s plan.",
        results: "Every crane-rail pour landed on schedule with templates on site the morning each cap was poured.",
        quote: "Anchor coordination usually sinks a marine pour schedule. This one never slipped.",
        attr: "Superintendent, marine contractor",
      },
      {
        title: "Ferry berth fender replacement.",
        problem: "A ferry terminal fender replacement needed duplex 2205 mooring hardware able to survive the splash zone, with field-adjustable lengths for as-built pile variation.",
        solution: "We supplied 2205 bolting with extra thread engagement and cut-to-length service at our facility for field re-orders inside 48 hours.",
        results: "The berth stayed in service through the replacement, with field re-cuts keeping the schedule through every as-built surprise.",
        quote: "Duplex hardware, cut to length in two days, twice. That kept the ferries running.",
        attr: "Facilities Engineer, transit ferry authority",
      },
    ],
    whyH2: "Why California Fastener for marine infrastructure.",
    whyBody: "Marine civil work answers to the engineer of record and a fifty-year corrosion clock. We hot-dip to F2329, stock duplex for the splash zone, document every coating lot, and cut anchor rods to your stack-ups in-house when the field never matches the drawing. Decades of pier, port, and offshore anchorage work means the bolting clears inspection and the pour schedule keeps moving.",
    quoteBody: "Port, pier, mooring, or offshore structure? Send us the anchorage schedule and corrosion spec. We’ll match the coating, stage to your pile and pour sequence, and cut to length in-house when the field moves — with the test docs your inspector needs.",
    quoteBg: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80",
  },

  aerospace: {
    seoSlug: "fasteners-for-aerospace-defense",
    metaTitle: "Aerospace & Defense Fasteners — California Fastener",
    navLabel: "Aerospace & Defense",
    eyebrow: "Industries · Aerospace & Defense",
    h1: "Traceable to the heat, every time.",
    h1Accent: "every time",
    h2: "AS9100 and NADCAP-backed fasteners with full chain-of-custody documentation.",
    lead: "Airframe assembly, engine build-up, satellite structures, and defense platforms run on hardware that can be traced from the flight line back to the melt. We stock the grades, hold the certs, and ship the paperwork that clears receiving inspection on the first pass.",
    heroImg: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?auto=format&fit=crop&w=1600&q=80",
    heroImgAlt: "Rocket launch for defense and space programs",
    heroTag: "Airframe · Engine · Space · Defense",
    contextH2: "The paperwork flies with the part.",
    contextBody: [
      "In aerospace, a fastener without a traceable pedigree is scrap. Receiving inspection wants the C of C, the chemical and physical test reports, the DFARS melt origin, and a heat-lot number that matches every box — before the hardware ever reaches the floor.",
      "We supply AS9100-controlled, NADCAP-processed fasteners with full chain-of-custody: NAS, MS, and AN hardware, A286 and titanium bolts, and lockbolt and Hi-Lok systems — each lot documented and segregated so the trace never breaks.",
    ],
    bulletsH3: "Fasteners engineered for aerospace and defense.",
    bullets: [
      ["NAS / MS / AN Hardware", "Standard aerospace bolts, screws, and nuts to National Aerospace and Military Standards."],
      ["A286 & Titanium Bolts", "High-strength, heat- and corrosion-resistant fasteners for airframe and engine structure."],
      ["Hi-Lok & Lockbolt Systems", "Pin-and-collar fastening systems for primary and secondary airframe structure."],
      ["Inconel 718 Fasteners", "Superalloy bolting for hot-section, exhaust, and high-temperature engine assemblies."],
      ["Full Traceability Lots", "AS9100 / NADCAP documentation, DFARS melt origin, and C of C with every shipment."],
    ],
    products: ["aerospace", "superalloy", "precision", "custom"],
    casesH2: "Aerospace fasteners at work.",
    cases: [
      {
        title: "Airframe line, zero-defect receiving.",
        problem: "A Tier 1 airframe builder was losing line hours to fastener lots held at receiving for incomplete or mismatched paperwork from a previous supplier.",
        solution: "We moved the program to AS9100-controlled lots with C of C, chem/phys reports, and DFARS melt origin pre-matched to each heat, segregated and barcoded by part number.",
        results: "Receiving holds dropped to zero across a full year of releases. The line stopped budgeting time for fastener paperwork rework.",
        quote: "For the first time, the certs matched the boxes every single time. Receiving stopped being a bottleneck.",
        attr: "Quality Manager, Tier 1 airframe builder",
      },
      {
        title: "Satellite structure build.",
        problem: "A spacecraft integrator needed A286 and titanium hardware in dozens of small lots, each with full traceability and no mixed heats, on a tight integration calendar.",
        solution: "We pulled certified A286 and Ti from stock, kept each lot heat-segregated, and shipped with complete documentation packages matched to the integrator’s traveler.",
        results: "Every lot cleared incoming inspection on first submittal. The integration schedule held through structure close-out.",
        quote: "Heat-segregated small lots with complete paper is exactly what space work needs and rarely gets.",
        attr: "Integration Engineer, satellite manufacturer",
      },
    ],
    whyH2: "Why California Fastener for aerospace and defense.",
    whyBody: "Aerospace is a documentation discipline wearing a fastener disguise. We run AS9100-controlled inventory, source NADCAP-processed hardware, hold DFARS-compliant domestic melt, and keep the certs indexed to the heat so the trace never breaks between the mill and the flight line. Three decades of quality-system rigor means the paperwork is as airworthy as the part.",
    quoteBody: "Airframe, engine, space, or defense program? Send us the AML and quality clauses. We’ll match the grades, hold the heats segregated, and ship the C of C, test reports, and DFARS documentation that clears receiving on the first pass.",
    quoteBg: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?auto=format&fit=crop&w=1600&q=80",
  },
};

/** Canonical display order — matches the design's INDUSTRY_ORDER. */
export const INDUSTRY_ORDER: IndustrySlug[] = [
  "oil-gas",
  "power-generation",
  "construction",
  "power-transmission",
  "manufacturing",
  "infrastructure",
  "marine",
  "aerospace",
];

/** Maps product card keys to product page hrefs. Used by the Shop by
 *  Product card grid. */
export const PRODUCT_CARD_HREFS: Record<ProductCardKey, string> = {
  industrial: "/industrial-fasteners",
  studbolt: "/stud-bolts-threaded-rod",
  anchor: "/anchor-bolts",
  custom: "/cnc-machining",
  structural: "/structural-fasteners",
  precision: "/cnc-machining",
  inserts: "/cnc-machining",
  stainless: "/stainless-steel-fasteners",
  bronze: "/silicon-bronze",
  aerospace: "/cnc-machining",
  superalloy: "/cnc-machining",
};

/** Legacy export kept for any callers that still import ALL_INDUSTRIES. */
export const ALL_INDUSTRIES: { key: IndustrySlug; label: string }[] = INDUSTRY_ORDER.map(
  (key) => ({ key, label: INDUSTRIES[key].navLabel })
);
