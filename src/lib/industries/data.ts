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
  | "stainless"
  | "bronze";

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
  /** Optional per-card title/sub overrides for the Shop-by-Product grid,
   *  letting one industry show industry-specific grades on a shared card. */
  cardOverrides?: Partial<Record<ProductCardKey, Partial<Pick<ProductCard, "title" | "sub">>>>;

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
  /** Striped-bed label shown when no `img` is set (or when it fails to load). */
  placeholder: string;
  /** Product render shown in the card image bed. Falls back to `placeholder`. */
  img?: string;
};

export const PRODUCT_CARDS: Record<ProductCardKey, ProductCard> = {
  industrial: { title: "Industrial Fasteners", sub: "A193, Gr 5/8, heavy hex", placeholder: "Industrial Hex", img: "/assets/products/industrial-heavy-hex-bolt-b7-4.png" },
  studbolt: { title: "Stud Bolts & Threaded Rod", sub: "B7, B8, B16 · cut to length", placeholder: "Stud Bolt", img: "/assets/products/stud-threaded-rod-1.png" },
  anchor: { title: "Anchor Bolts", sub: "F1554 · headed, bent, rod", placeholder: "Anchor Bolt", img: "/assets/products/anchor-rod-render.png" },
  custom: { title: "Custom Products", sub: "Built to your print", placeholder: "Custom Part", img: "/assets/custom-stud.png" },
  structural: { title: "Structural Bolts", sub: "A325, A490, TC bolts", placeholder: "Structural Bolt", img: "/assets/products/structural-heavy-hex-a325-1.png" },
  precision: { title: "Precision Screws", sub: "Electronics & fine mech.", placeholder: "Precision Screw", img: "/assets/products/ss-socket-head-1.png" },
  stainless: { title: "Stainless Steel Fasteners", sub: "304, 316, duplex", placeholder: "Stainless Bolt", img: "/assets/products/ss-hex-cap-1.png" },
  bronze: { title: "Silicon Bronze Hardware", sub: "Marine & architectural", placeholder: "Bronze Bolt", img: "/assets/products/bronze-hex-bolt-v2.png" },
};

export const INDUSTRIES: Record<IndustrySlug, Industry> = {
  "oil-gas": {
    seoSlug: "fasteners-for-oil-gas",
    metaTitle: "Oil & Gas Fasteners — B7, B8M, F1554",
    navLabel: "Oil, Gas & Chemical",
    eyebrow: "Industries · Oil and Gas",
    h1: "Bolting for the pressure envelope.",
    h1Accent: "pressure envelope",
    h2: "Certified A193 and A320 bolting for upstream, midstream, and downstream service.",
    lead: "From refinery flange bolting to high-pressure process piping, oil and gas demands traceable metallurgy and tight torque discipline. We stock the grades, cut the studs, and ship the paperwork — so your turnaround stays on the clock.",
    heroImg: "/assets/photos/oilgas-71932049.webp",
    heroImgAlt: "Offshore drilling platform at sea",
    heroTag: "Offshore · Upstream · Midstream · Downstream",
    contextH2: "Refinery and process bolting, stocked for turnaround schedules.",
    contextBody: [
      "Flange bolting for high-pressure piping, anchor bolts for compressor skids, and custom alloy studs for exchanger heads — every connection in an oil and gas facility carries a test-procedure number and an MTR trail.",
      "We run B7/B7M, B8/B8M, and L7/L7M bolting through the same line, with hot-dip galvanizing, Xylan, and PTFE coating in-house. When your turnaround schedule compresses, we ship bagged and tagged to the valve number.",
    ],
    bulletsH3: "Products engineered for oil and gas service.",
    bullets: [
      ["B7 & B7M Stud Bolts", "Standard alloy bolting for flanges rated to 800°F; B7M when the spec calls for hardness control."],
      ["B8/B8M Stainless Studs", "304 and 316 stainless bolting for cryogenic, chloride, and chemical-exposure flanges."],
      ["L7 Low-Temp Studs", "Impact-tested alloy bolting for LNG, ethylene, and cold-climate pipeline service."],
      ["Heavy Hex Head Bolts", "A193 B7/B8M heavy hex for structural pipe supports, pig traps, and vessel skirts."],
      ["Custom Alloy & Coated", "Inconel 625/718, Monel K500, and Xylan 1424-coated fasteners — built to print."],
    ],
    products: ["studbolt", "industrial", "anchor", "custom"],
    casesH2: "Oil and gas fasteners at work.",
    cases: [
      {
        title: "California refinery exchanger turnaround.",
        problem: "A California refinery needed 240 sets of B8M stud bolts for an exchanger retrofit — fully tagged, MTR-matched, and on the dock in seven days.",
        solution: "We pulled 316 stainless from stock, cut and chamfered to length per the flange schedule, and bagged per flange tag number with MTRs and Cert of Conformance per set.",
        results: "All 240 sets arrived ready to bolt up with zero discrepancies. The turnaround finished on the dispatched schedule.",
        quote: "Tagged to our valve list, not a PO line. That saved us a day of sorting on the deck.",
        attr: "Turnaround Planner, California refinery",
      },
      {
        title: "California petrochemical unit expansion.",
        problem: "A California petrochemical expansion required L7 low-temp studs and Inconel 625 bolting across 18 custom lengths, all on a shared delivery date.",
        solution: "We consolidated alloy sourcing, ran the cuts in two parallel batches, and Xylan-coated the carbon bolting before final assembly at our Benicia facility.",
        results: "All 18 lengths shipped on one truck, one BOL. The fabricator rolled the sets directly to the pipe rack without re-inspection.",
        quote: "One call, one truck, one set of certs. That's how refinery work should feel.",
        attr: "Procurement Lead, California petrochemical operator",
      },
    ],
    whyH2: "Why California Fastener for oil and gas.",
    whyBody: "Bay Area refineries have been our bread and butter for decades — Richmond, Martinez, Rodeo, Benicia, all within an hour of our dock. That experience shows up in the small stuff: MTRs that match the heat stamps, B7M on the shelf when the spec calls for sour service, bagging by flange tag, and a phone that's answered by someone who's bolted up a refinery before.",
    quoteBody: "Send us your BOM and we'll do the rest.",
    quoteBg: "/assets/photos/oilgas-71932049.webp",
  },

  "power-generation": {
    seoSlug: "fasteners-for-power-generation",
    metaTitle: "Power Generation Bolting — B16, B7",
    navLabel: "Power Generation",
    eyebrow: "Industries · Power Generation",
    h1: "Bolting that holds when the turbine spins up.",
    h1Accent: "turbine",
    h2: "High-temperature, creep-resistant fasteners for combined-cycle, nuclear, and renewable plants.",
    lead: "Generator foundation bolts, turbine casing studs, boiler manhole bolting, and blade-root fasteners — power plants live and die by the integrity of a few thousand threaded connections operating at temperature and under cyclic load.",
    heroImg: "/assets/photos/industrial-170240857.webp",
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
        title: "California gas-turbine outage.",
        problem: "A 350MW combined-cycle plant needed B16 chrome-moly casing studs for a planned hot-gas-path outage, with a 14-day window between shutdown and first fire.",
        solution: "We pulled certified B16 stock, cut to exact casing specs, rolled threads per OEM print, and shipped with full CMTR stack on day 4.",
        results: "Casing reassembly started on schedule. The unit returned to service on the dispatched outage plan.",
        quote: "Alloy stud stock on the ground in California saved us a transcontinental air freight. That one call paid for itself.",
        attr: "Outage Director, California IPP",
      },
      {
        title: "Utility-scale solar tracker anchors.",
        problem: "A California solar farm needed F1554 Gr 55 anchor assemblies for tracker piles across 1,200 driven locations, with matched HDG lots and just-in-time delivery to a desert staging yard.",
        solution: "We ran the order on sequential heats, hot-dip galvanized to F2329, and consolidated shipments by row block to match the install crew's daily progress.",
        results: "Every row block saw matched-coating hardware. Install torqued through without a single rejection.",
        quote: "Matched coating lots across a solar farm is the kind of detail you don't usually get from a distributor.",
        attr: "QA Manager, West Coast solar EPC",
      },
    ],
    whyH2: "Why California Fastener for power generation.",
    whyBody: "Power plants don’t tolerate a bolt that’s almost right. We keep the alloy families most power work actually needs — B16, Nimonic, Inconel, A354 — on the shelf, with the mill-test reports, hardness traces, and ASME III documentation ready before you ask. When the outage window closes, we’re already in the truck.",
    quoteBody: "Outage planning? Send us the work-scope list. We’ll price the alloys, cut lengths, and prove the documentation package — so the bolting never becomes the long-lead item on the schedule.",
    quoteBg: "/assets/photos/industrial-170240857.webp",
  },

  construction: {
    seoSlug: "fasteners-for-construction",
    metaTitle: "Construction Fasteners — A325, F1554",
    navLabel: "Construction",
    eyebrow: "Industries · Construction",
    h1: "Structural steel, fastened to the drawing.",
    h1Accent: "drawing",
    h2: "A325, A490, and TC bolts — on the shelf, on the truck, on the crane.",
    lead: "Data-center framing, hospital seismic bracing, tilt-up anchor templates, high-rise moment connections. When the crew shows up at 6am, the fasteners need to already be there — in the right grade, the right finish, and the right quantity.",
    heroImg: "/assets/photos/construction.webp",
    heroImgAlt: "Steel structural erection on a commercial project",
    heroTag: "High-rise · Data center · Commercial · Seismic",
    contextH2: "Structural fasteners staged to the erection sequence.",
    contextBody: [
      "Structural steel is a sequencing business. The bolts don’t just need to arrive — they need to arrive in the same order the iron ships, bagged by connection type, so the bolt-up crew isn’t picking through a pile at elevation.",
      "We stage A325-N, A490-X, and TC bolts to your shop drawings, in galvanized, plain, and weathering finishes. For seismic work, we supply ASTM F3125-qualified bolting with the seismic paperwork your inspector is going to ask for.",
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
        title: "Hyperscale data-center anchor pour, Fremont.",
        problem: "A hyperscale data-center build in Fremont needed F1554 Gr 55 anchor bolt assemblies, templates, and leveling nuts for several hundred column locations on a tight pour schedule.",
        solution: "We assembled the anchor sets with templates, heavy hex nuts, and plate washers — released by pour sequence to match the concrete contractor's grid.",
        results: "No hold-ups at any foundation pour. Anchor templates were on site the morning each grid line was scheduled.",
        quote: "Anchor coordination usually bleeds the schedule. This was the cleanest pour sequence we've run.",
        attr: "Superintendent, data-center concrete contractor",
      },
      {
        title: "East Coast pharma facility, Maryland.",
        problem: "A major pharmaceutical manufacturing facility build in Maryland needed F1554 anchor bolt assemblies for process-equipment foundations — full domestic-melt documentation, freighted East-Coast on schedule.",
        solution: "We sourced US-melted anchor stock, cut and bent to drawing, hot-dip galvanized in-house, and consolidated freight to a single shipment from Benicia to Maryland.",
        results: "All anchor assemblies landed at the East Coast site with matched documentation and zero rejects at receiving inspection.",
        quote: "California Fastener shipped Maryland-bound anchor bolts that landed cleaner than any local source we'd tried.",
        attr: "Project Manager, pharma facility contractor",
      },
    ],
    whyH2: "Why California Fastener for construction.",
    whyBody: "Structural work rewards companies who understand sequencing. We hold tag-based inventory against your erection drawings, release to the dock by lift or pour, and back every shipment with the F3125 mill paperwork your engineer and inspector will ask to see. Decades of shop-drawing staging and we've never been why a crew waited.",
    quoteBody: "Send us your shop drawings and we'll stage to your sequence — A325, A490, TC, or F1554 anchor assemblies, released to match your erection or pour schedule. Zero bolt shortages. Zero schedule surprises.",
    quoteBg: "/assets/photos/construction.webp",
  },

  "power-transmission": {
    seoSlug: "fasteners-for-power-transmission",
    metaTitle: "Power Transmission Bolting — A394",
    navLabel: "Power Transmission",
    eyebrow: "Industries · Power Transmission",
    h1: "The grid, bolted together.",
    h1Accent: "bolted together",
    h2: "Tower steel, substation hardware, and transmission pole bolting — galvanized and ready to string.",
    lead: "Every mile of 500kV line sits on thousands of galvanized bolts, shackles, and insulator hardware. Every substation A-frame is bolted, not welded. We supply the hardware that carries the load — plus the pole-line accessories you’re tired of sourcing from three different vendors.",
    heroImg: "/assets/photos/marine-182646517.webp",
    heroImgAlt: "High-voltage transmission tower against dusk sky",
    heroTag: "Transmission towers · Substations · Distribution",
    contextH2: "Hot-dip galvanized, from foundation to conductor.",
    contextBody: [
      "Transmission hardware lives outside for 50 years. That means G185 or 2.5oz/ft² hot-dip, ASTM F2329 processing, and strict control of hydrogen embrittlement on the high-strength stuff — the kind of detail that shows up in a utility spec book or approved materials list.",
      "We run A394 tower bolts, F3125 A325/A490 substation hardware, and full pole-line inventory — shackles, thimble-eyes, step bolts, guy hardware — all HDG to utility spec and test-documented.",
    ],
    bulletsH3: "Products engineered for power transmission.",
    bullets: [
      ["A394 Tower Bolts", "Type 0, 1, and 3 transmission tower bolting with locknuts and step nuts, G185 galvanized."],
      ["Substation Hardware", "A325/A490 bolting for dead-end A-frames, switch structures, and bus support stands."],
      ["Pole-Line Accessories", "Step bolts, guy hooks, thimble-eyes, shackles, and anchor rods — utility-spec galvanized."],
      ["Transmission Anchors", "F1554 Gr 55/105 anchor cages and stub angles for lattice tower foundations."],
      ["Custom Utility Hardware", "Obsolete pattern bolts, replacement cross-arm hardware, and specialty substation connectors."],
    ],
    products: ["structural", "anchor", "industrial", "custom"],
    casesH2: "Power transmission fasteners in action.",
    cases: [
      {
        title: "California utility line rebuild.",
        problem: "A California utility rebuilding a wildfire-affected transmission line needed A394 tower bolts across 38 lattice structures, staged to a regional assembly yard on a rolling schedule.",
        solution: "We ran the galvanizing in two production lots to match the construction sequence and shipped to the yard by tower-structure number.",
        results: "All 38 structures released to assembly crews with the right bolt counts. No yard ran short, no truck ran back.",
        quote: "Staging tower bolts by structure number is the work most suppliers won't do. They just did it.",
        attr: "Construction Manager, California transmission utility",
      },
      {
        title: "California coastal substation rebuild.",
        problem: "A California coastal substation needed A325 bolting with HDG + Xylan duplex coating to survive salt-fog exposure and meet a utility-specific corrosion spec.",
        solution: "We hot-dip galvanized to F2329, then Xylan-topcoated in-house, with salt-spray test certs on each lot against the utility approved-materials list.",
        results: "Project closed out with all bolting accepted on first inspection. The utility added the duplex coating to their approved spec.",
        quote: "Duplex coating on A325 isn't off-the-shelf. They built the process and got it through our corrosion review.",
        attr: "Standards Engineer, California utility",
      },
    ],
    whyH2: "Why California Fastener for power transmission.",
    whyBody: "Utility work is a paperwork business as much as a hardware business. We stock to the major utility MALs, test-document every HDG lot, and know the difference between a Type 1 and Type 3 A394 bolt without having to look it up. Transmission and distribution crews have been calling us for obsolete cross-arm hardware for decades — and we still find it.",
    quoteBody: "Line rebuild, substation expansion, or just a cross-arm hardware replenishment? Send the BOM and the utility spec. We’ll match the MAL, stage to your yards, and ship with the test docs your compliance team needs.",
    quoteBg: "/assets/photos/marine-182646517.webp",
  },

  manufacturing: {
    seoSlug: "fasteners-for-manufacturing",
    metaTitle: "Manufacturing Fasteners — OEM & VMI",
    navLabel: "Manufacturing",
    eyebrow: "Industries · Manufacturing",
    h1: "Production-line fasteners that keep the line moving.",
    h1Accent: "takt time",
    h2: "Released to your schedule, binned to your line, torqued to your spec.",
    lead: "OEM assembly lines don’t stop for a bolt shortage. We run blanket orders, min/max bin programs, and VMI stocking for manufacturers of industrial machinery, agricultural equipment, and heavy-duty consumer product. Your kanban card — our problem.",
    heroImg: "/assets/photos/manufacturing-731342733.jpg",
    heroImgAlt: "Industrial manufacturing assembly line",
    heroTag: "OEM · Ag equipment · Industrial machinery · Food & pharma",
    contextH2: "Blanket orders, bin stock, and custom prints.",
    contextBody: [
      "A manufacturing BOM doesn’t care about catalog minimums. It cares about the right 37,400 pieces hitting the stockroom the day before they’re scheduled on the line. That’s what a blanket order is supposed to do — and what most suppliers can’t actually execute.",
      "We run blanket-release programs for OEM production lines, custom-print parts from our in-house CNC department for the items you can't buy, and VMI bin programs with barcode replenishment for the consumables.",
    ],
    bulletsH3: "Products engineered for manufacturing.",
    bullets: [
      ["Socket Head Cap Screws", "Alloy and stainless SHCS in inch and metric, packaged to your bin count."],
      ["Flange & Frame Bolts", "Grade 5, 8, 10.9, and 12.9 hex and flange bolts for equipment and frame assembly."],
      ["Stainless Steel Hardware", "304 and 316 fasteners for food, pharma, and washdown equipment lines."],
      ["PPAP / PPM Programs", "4. VMI & Blanket Programs — Vendor-managed inventory and blanket-release contracts for high-volume production lines."],
      ["Custom CNC Parts", "In-house five-axis machining for proprietary fasteners, bushings, and pins."],
    ],
    products: ["studbolt", "industrial", "stainless", "custom"],
    cardOverrides: { studbolt: { title: "Stud Bolts & Rod", sub: "B7, B16, B8 · cut to length" } },
    casesH2: "Manufacturing fasteners in action.",
    cases: [
      {
        title: "Pharmaceutical plant install, Stockton area.",
        problem: "A California mechanical contractor needed anchor bolts and stud bolt assemblies for process-equipment installation at a Stockton-area pharmaceutical plant, on a phased install schedule.",
        solution: "We coordinated F1554 anchor assemblies, A193 B7 stud bolting, and stainless companion hardware — released by install phase to match the mechanical schedule.",
        results: "Each install phase had its bolting on site when the equipment landed. No phase delayed for fastener shortages.",
        quote: "Pharma equipment install runs on the schedule of the slowest part. California Fastener wasn't the slow part.",
        attr: "Project Manager, California mechanical contractor",
      },
      {
        title: "Custom pin for semiconductor toolmaker.",
        problem: 'A California semiconductor equipment OEM needed a proprietary locating pin in 17-4 PH H1025, with a 0.001" shoulder tolerance and no existing supplier willing to run 50/month.',
        solution: "We quoted, first-articled, and cut the pin on our in-house Haas live-tool lathe — running 50-piece monthly releases with CMM inspection to the print.",
        results: "Eighteen months of 100% on-time delivery with zero rejects. The pin became a recurring catalog item for the toolmaker.",
        quote: "Most fastener houses would have sent us to a machine shop. California Fastener is the machine shop.",
        attr: "Design Engineer, semiconductor equipment OEM",
      },
    ],
    whyH2: "Why California Fastener for manufacturing.",
    whyBody: "We’re a fastener distributor with an in-house CNC department. That combination matters more than it sounds: when your BOM has one oddball part nobody stocks, we don’t kick it back — we machine it, document it, and release it against the same blanket order as the commodity bolts. One supplier, one purchase order, every part on the print.",
    quoteBody: "Send us your BOM — commodity fasteners and the custom stuff both. We’ll consolidate the release schedule, machine the oddballs in-house, and run the whole program off one purchase order against your production plan.",
    quoteBg: "/assets/photos/manufacturing-731342733.jpg",
  },

  infrastructure: {
    seoSlug: "fasteners-for-infrastructure",
    metaTitle: "Infrastructure Bolting — Buy America",
    navLabel: "Infrastructure",
    eyebrow: "Industries · Infrastructure",
    h1: "Built for 75-year service lives.",
    h1Accent: "75-year",
    h2: "Bridge bolts, highway anchors, and Buy America-compliant hardware for public civil works.",
    lead: "DOT bridge decks, light-rail overpasses, tunnel segment liners, seismic retrofits. Infrastructure bolting has to survive 75 winters, meet Buy America provenance, and clear a federal inspection trail — and still show up when the contractor’s bar schedule says it should.",
    heroImg: "/assets/photos/infrastructure-753784784.webp",
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
        title: "California bridge deck replacement.",
        problem: "A Caltrans bridge deck replacement needed 6,400 A325 Type 3 weathering-steel bolts with Buy America documentation on each heat lot.",
        solution: "We sourced from a domestic mill with melted-and-manufactured certification, organized the order into three sequenced lots by erection span, and shipped each lot with matched CMTRs.",
        results: "Every lot cleared Caltrans materials inspection on first submittal. The bridge deck closed out with zero fastener-related non-conformances.",
        quote: "Buy America paperwork that's actually complete on the first try — that's the difference. Everyone else plays email tag.",
        attr: "Resident Engineer, Caltrans",
      },
      {
        title: "Industrial water treatment, Idaho data center.",
        problem: "An industrial water-treatment system for a data-center build in Idaho needed anchor bolts and process bolting for skid foundations and piping connections, on a tight commissioning schedule.",
        solution: "We supplied F1554 anchor assemblies for the skid pads, A193 B7 flange bolting for the process piping, and HDG hardware throughout — freight-consolidated to the Idaho site to match the install crew.",
        results: "The water-treatment system commissioned on schedule. All bolting cleared inspection without callback.",
        quote: "California to Idaho on a tight schedule with the right bolts and the right paperwork. Not many distributors pull that off.",
        attr: "Project Engineer, industrial mechanical contractor",
      },
    ],
    whyH2: "Why California Fastener for infrastructure.",
    whyBody: "Public civil work has two masters: the engineer of record, and the federal compliance trail. We supply to both. US-melted steel on the shelf, CMTRs indexed by heat and lot, domestic-content certifications on letterhead, and a team that’s been reading DOT spec books since before Buy America was a political fight. The bolts are the easy part — the paperwork is the product.",
    quoteBody: "Federal-aid project, state DOT bridge, or transit retrofit? Send us the spec section and bar schedule. We'll match the Buy America requirements, cut to length, and ship with compliance documentation that clears first-round inspection.",
    quoteBg: "/assets/photos/infrastructure-753784784.webp",
  },

  marine: {
    seoSlug: "fasteners-for-marine-shipbuilding",
    metaTitle: "Marine & Shipbuilding Fasteners",
    navLabel: "Marine & Shipbuilding",
    eyebrow: "Industries · Marine & Shipbuilding",
    h1: "Where the dock meets the deep.",
    h1Accent: "the deep",
    h2: "Hot-dip galvanized and duplex hardware for piers, moorings, and offshore structures.",
    lead: "Container terminals, ferry berths, fuel piers, mooring dolphins, and offshore platforms. Marine infrastructure stands in the splash zone for fifty years — where coating thickness, duplex steel, and corrosion allowance decide whether the structure makes its service life.",
    heroImg: "/assets/photos/silicon-bronze-hero.jpg",
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
        title: "California port crane-rail anchor pour.",
        problem: "A California port expansion needed 800 hot-dip galvanized anchor bolts for ship-to-shore crane rails, with embedment templates staged to a tight pile-cap pour schedule.",
        solution: "We galvanized to F2329, assembled 800 anchor sets with templates and leveling nuts, and released them by pour sequence to match the marine contractor's plan.",
        results: "Every crane-rail pour landed on schedule with templates on site the morning each cap was poured.",
        quote: "Anchor coordination usually sinks a marine pour schedule. This one never slipped.",
        attr: "Superintendent, California marine contractor",
      },
      {
        title: "California ferry-terminal fender replacement.",
        problem: "A California ferry terminal fender replacement needed duplex 2205 mooring hardware able to survive the splash zone, with field-adjustable lengths for as-built pile variation.",
        solution: "We supplied 2205 bolting with extra thread engagement and cut-to-length service at our facility for field re-orders inside 48 hours.",
        results: "The berth stayed in service through the replacement, with field re-cuts keeping the schedule through every as-built surprise.",
        quote: "Duplex hardware, cut to length in two days, twice. That kept the ferries running.",
        attr: "Facilities Engineer, California ferry authority",
      },
    ],
    whyH2: "Why California Fastener for marine infrastructure.",
    whyBody: "Marine civil work answers to the engineer of record and a fifty-year corrosion clock. We hot-dip to F2329, stock duplex for the splash zone, document every coating lot, and cut anchor rods to length in-house when the field never matches the drawing. Decades of pier, port, and offshore anchorage work means the bolting clears inspection and the pour schedule keeps moving.",
    quoteBody: "Port, pier, mooring, or offshore structure? Send us the anchorage schedule and corrosion spec. We’ll match the coating, stage to your pile and pour sequence, and cut to length in-house when the field moves — with the test docs your inspector needs.",
    quoteBg: "/assets/photos/silicon-bronze-hero.jpg",
  },

  aerospace: {
    seoSlug: "fasteners-for-aerospace-defense",
    metaTitle: "Aerospace Fasteners — NAS, MS, A286",
    navLabel: "Aerospace & Defense",
    eyebrow: "Industries · Aerospace & Defense",
    h1: "Traceable to the heat, every time.",
    h1Accent: "every time",
    h2: "Heat-traceable fasteners with full chain-of-custody documentation.",
    lead: "Airframe assembly, engine build-up, satellite structures, and defense platforms run on hardware that can be traced from the flight line back to the melt. We stock the grades, hold the certs, and ship the paperwork that clears receiving inspection on the first pass.",
    heroImg: "/assets/photos/aerospace.jpg",
    heroImgAlt: "Rocket launch for defense and space programs",
    heroTag: "Airframe · Engine · Space · Defense",
    contextH2: "The paperwork flies with the part.",
    contextBody: [
      "In aerospace, a fastener without a traceable pedigree is scrap. Receiving inspection wants the Certificate of Conformance, the chemical and physical test reports, the DFARS melt origin, and a heat-lot number that matches every box — before the hardware ever reaches the floor.",
      "We supply heat-segregated, fully-traceable fasteners with full chain-of-custody: NAS, MS, and AN hardware, A286 and titanium bolts, and pin-and-collar fastening systems — each lot documented and segregated so the trace never breaks.",
    ],
    bulletsH3: "Fasteners engineered for aerospace and defense.",
    bullets: [
      ["NAS / MS / AN Hardware", "Standard aerospace bolts, screws, and nuts to National Aerospace and Military Standards."],
      ["A286 & Titanium Bolts", "High-strength, heat- and corrosion-resistant fasteners for airframe and engine structure."],
      ["Hi-Lok & Lockbolt Systems", "Pin-and-collar fastening systems for primary and secondary airframe structure."],
      ["Inconel 718 Fasteners", "Superalloy bolting for hot-section, exhaust, and high-temperature engine assemblies."],
      ["Full Traceability Lots", "5. Full Traceability Lots — Heat-segregated documentation, DFARS melt origin, and C of C with every shipment."],
    ],
    products: ["custom", "studbolt", "stainless", "industrial"],
    cardOverrides: { studbolt: { title: "Stud Bolts & Rod", sub: "A286, Ti, B7 · cut to length" } },
    casesH2: "Aerospace fasteners at work.",
    cases: [
      {
        title: "West Coast airframe build, zero-defect receiving.",
        problem: "A West Coast airframe builder was losing line hours to fastener lots held at receiving for incomplete or mismatched paperwork from a previous supplier.",
        solution: "We moved the program to controlled lots with Certificate of Conformance, chemical and physical test reports, and DFARS melt origin pre-matched to each heat, segregated and barcoded by part number.",
        results: "Receiving holds dropped to zero across a full year of releases. The line stopped budgeting time for fastener paperwork rework.",
        quote: "For the first time, the certs matched the boxes every single time. Receiving stopped being a bottleneck.",
        attr: "Quality Manager, West Coast airframe builder",
      },
      {
        title: "Custom wing-strut bolt program.",
        problem: "An electric aviation program needed 15-5 PH custom wing-strut shoulder bolts in small lots, each heat-segregated with full traceability and tight dimensional tolerances.",
        solution: "We CNC-machined the bolts on our in-house Haas live-tool lathe, kept each lot heat-segregated, and shipped with documentation packages matched to the program's traveler.",
        results: "Every lot cleared incoming inspection on first submittal. The program ran through ground-test article close-out without a fastener-related deviation.",
        quote: "Heat-segregated small lots with complete paper is exactly what airframe work needs and rarely gets.",
        attr: "Integration Engineer, electric aviation program",
      },
    ],
    whyH2: "Why California Fastener for aerospace and defense.",
    whyBody: "Aerospace is a documentation discipline wearing a fastener disguise. We run aerospace-grade traceability: lots controlled and segregated by heat, DFARS-compliant domestic melt, and certs indexed back to the mill so the trace never breaks between the foundry and the flight line. Decades of West Coast quality work means the paperwork is as airworthy as the part.",
    quoteBody: "Airframe, engine, space, or defense program? Send us the spec list and quality requirements. We'll match the grades, keep the heats segregated, and ship the certs, test reports, and DFARS documentation that clears receiving on the first pass.",
    quoteBg: "/assets/photos/aerospace.jpg",
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
  stainless: "/stainless-steel-fasteners",
  bronze: "/silicon-bronze",
};

/** Legacy export kept for any callers that still import ALL_INDUSTRIES. */
export const ALL_INDUSTRIES: { key: IndustrySlug; label: string }[] = INDUSTRY_ORDER.map(
  (key) => ({ key, label: INDUSTRIES[key].navLabel })
);
