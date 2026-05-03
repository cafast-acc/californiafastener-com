/* California Fastener — Technical Library data */
/* Sections, specs, facets. Plain-English copy; engineering-first ordering. */

window.LIB_SECTIONS = [
  {
    id: "bolt",
    num: "01",
    tag: "BOLT",
    title: "Bolt Specifications",
    lede: "Carbon, alloy, stainless, and specialty bolts — from general-purpose A307 through heavy-duty A540 turbine bolting. Ordered by how often we ship them.",
    starthere: {code: "ASTM F3125", why: "A325 & A490 live here. Most structural drawings call this out without realizing it." }
  },
  {
    id: "nut",
    num: "02",
    tag: "NUT",
    title: "Nut Specifications",
    lede: "Structural, pressure, stainless, and nonferrous nuts. Every bolt grade in this library has a matching nut grade in this section.",
    starthere: {code: "ASTM A194", why: "2H, 7, 7M, 8M — the workhorse matches for A193/A320 bolting." }
  },
  {
    id: "washer",
    num: "03",
    tag: "WASHER",
    title: "Washer Specifications",
    lede: "Hardened, plain, and direct-tension-indicating washers. F844 where F436 is required is the most common field error — we'll tell you how to avoid it.",
    starthere: {code: "ASTM F436", why: "Hardened. Required for every A325/A490 structural connection." }
  },
  {
    id: "thread",
    num: "04",
    tag: "THREAD",
    title: "Thread Standards",
    lede: "Inch, metric, pipe, and fit class. Every thread callout decoded — from 1/2-13 UNC-2A to M10×1.5-6g.",
    starthere: {code: "ASME B1.1", why: "UN / UNR / UNJ. The baseline for every inch-series fastener." }
  },
  {
    id: "coating",
    num: "05",
    tag: "COATING",
    title: "Coatings & Finishes",
    lede: "Zinc, fluoropolymer, cadmium. How each works, what it's approved for, and what it will and won't protect against.",
    starthere: {code: "ASTM F2329", why: "Hot-dip galvanizing. Covers 80% of outdoor structural work." }
  },
  {
    id: "metric",
    num: "06",
    tag: "METRIC",
    title: "Metric Reference",
    lede: "ISO property classes and their inch-spec equivalents. The bridge between drawings in M and parts on the shelf in inches.",
    starthere: {code: "ASTM F568M", why: "Property classes 8.8, 10.9, 12.9 — and their SAE equivalents." }
  }
];

window.LIB_SPECS = [
  /* ── BOLTS ─────────────────────────────────────── */
  {code:"ASTM F3125", file:"astm-f3125", section:"bolt",
   title:"High-strength structural bolts & assemblies",
   grades:["A325","A490","F1852","F2280","144"],
   industries:["structural","infrastructure"],
   service:["ambient"],
   popularity: 1,
   note:"Consolidates A325, A490, F1852, F2280. If you read a structural drawing this decade, you're reading F3125."},

  {code:"ASTM A193", file:"astm-a193", section:"bolt",
   title:"High-temp / high-pressure alloy & stainless bolting",
   grades:["B7","B7M","B8","B8M","B16"],
   industries:["oil-gas","power","process"],
   service:["high-temp","sour","corrosive"],
   popularity: 1,
   note:"The workhorse of pressure flanges, ASME B16.5 connections, and valve bonnets."},

  {code:"ASTM F1554", file:"astm-f1554", section:"bolt",
   title:"Anchor bolts — 36, 55, 105 ksi yield",
   grades:["36","55","105"],
   industries:["structural","infrastructure"],
   service:["ambient","outdoor"],
   popularity: 1,
   note:"Straight, bent, or headed. The AISC-referenced spec for cast-in-place anchors."},

  {code:"ASTM A307", file:"astm-a307", section:"bolt",
   title:"General-purpose carbon steel bolts, 60 ksi tensile",
   grades:["A","B"],
   industries:["general","manufacturing"],
   service:["ambient"],
   note:"Grade A for general mechanical. Grade B for pressure flanges below 500°F."},

  {code:"ASTM A320", file:"astm-a320", section:"bolt",
   title:"Low-temperature alloy & stainless bolting",
   grades:["L7","L7M","B8 Cl 2","B8M Cl 2"],
   industries:["oil-gas","process","cryogenic"],
   service:["low-temp","sour"],
   popularity: 1,
   note:"Charpy-tested down to −150°F. L7M is NACE MR0175 for sour service."},

  {code:"ASTM A354", file:"astm-a354", section:"bolt",
   title:"Quenched & tempered alloy bolts, 125 / 150 ksi",
   grades:["BC","BD"],
   industries:["structural","marine","heavy-equipment"],
   service:["ambient"],
   note:"Used when you need more than A449 but structural F3125 isn't a fit."},

  {code:"ASTM A449", file:"astm-a449", section:"bolt",
   title:"Heat-treated bolts — Grade 5 class, wider diameters",
   grades:["Type 1","Type 3"],
   industries:["structural","manufacturing"],
   service:["ambient","outdoor"],
   note:"Think SAE Grade 5, but available above 1-1/2″ diameter. Type 3 is weathering steel."},

  {code:"ASTM A453", file:"astm-a453", section:"bolt",
   title:"High-temperature superalloy bolting (A286)",
   grades:["660","651","662"],
   industries:["power","aerospace"],
   service:["very-high-temp"],
   note:"Jet engines, gas turbines. A286 at 1200°F+ where B7 and B16 fall off."},

  {code:"ASTM A540", file:"astm-a540", section:"bolt",
   title:"Heavy-duty turbine-grade alloy bolting",
   grades:["B21","B22","B23","B24"],
   industries:["power"],
   service:["high-temp","high-pressure"],
   note:"Specifically for steam turbines. Heat-treat ranges chosen for creep resistance."},

  {code:"ASTM A574", file:"astm-a574", section:"bolt",
   title:"Alloy steel socket head cap screws, 170 ksi",
   grades:["SHCS"],
   industries:["manufacturing","heavy-equipment"],
   service:["ambient"],
   note:"The highest strength in common inch-series fasteners. Allen-drive."},

  {code:"ASTM F593", file:"astm-f593", section:"bolt",
   title:"Stainless steel bolts, hex cap screws, studs",
   grades:["Group 1","Group 2","Group 3"],
   industries:["marine","food-pharma","water"],
   service:["corrosive","marine"],
   popularity: 1,
   note:"Group 1 = 304-class, Group 2 = 316-class, Group 3 = duplex & precipitation-hardening."},

  {code:"SAE J429", file:"sae-j429", section:"bolt",
   title:"SAE inch-series bolt grades",
   grades:["2","5","8"],
   industries:["general","manufacturing","automotive"],
   service:["ambient"],
   note:"The grade you pick up at any hardware store. Grade 5 and 8 are the auto-industry standards."},

  /* ── NUTS ──────────────────────────────────────── */
  {code:"ASTM A194", file:"astm-a194", section:"nut",
   title:"High-temp / high-pressure nuts",
   grades:["2H","2HM","4","7","7M","8","8M","16"],
   industries:["oil-gas","power","process"],
   service:["high-temp","sour","corrosive"],
   popularity: 1,
   note:"The definitive match for A193 studs. 2H pairs with B7; 7M with L7M; 8M with B8M."},

  {code:"ASTM A563", file:"astm-a563", section:"nut",
   title:"Carbon & alloy structural nuts",
   grades:["A","DH","DH3"],
   industries:["structural","infrastructure"],
   service:["ambient","outdoor"],
   popularity: 1,
   note:"DH is the heavy-hex structural nut. DH3 is atmospheric-corrosion-resistant (weathering)."},

  {code:"ASTM F594", file:"astm-f594", section:"nut",
   title:"Stainless steel nuts",
   grades:["Group 1","Group 2"],
   industries:["marine","food-pharma","water"],
   service:["corrosive","marine"],
   note:"The F593 counterpart. Groups align with the bolt spec for matched galvanic behavior."},

  {code:"ASTM F467", file:"astm-f467", section:"nut",
   title:"Nonferrous nuts — silicon bronze, Monel, aluminum",
   grades:["C65100","N04400","2024","6061"],
   industries:["marine","electrical","custom"],
   service:["corrosive","marine"],
   note:"When galvanic compatibility matters more than strength. Silicon bronze for marine hardware."},

  {code:"SAE J995", file:"sae-j995", section:"nut",
   title:"SAE inch-series nut grades",
   grades:["2","5","8"],
   industries:["general","manufacturing","automotive"],
   service:["ambient"],
   note:"Matched proof-load ratings for SAE J429 bolts."},

  /* ── WASHERS ───────────────────────────────────── */
  {code:"ASTM F436", file:"astm-f436", section:"washer",
   title:"Hardened steel washers for structural fasteners",
   grades:["Type 1","Type 3"],
   industries:["structural","infrastructure"],
   service:["ambient","outdoor"],
   popularity: 1,
   note:"Required under every A325/A490 bolt head and nut. Type 3 is weathering-steel compatible."},

  {code:"ASTM F844", file:"astm-f844", section:"washer",
   title:"Plain unhardened flat washers for general use",
   grades:["Plain","Zn","HDG"],
   industries:["general","manufacturing"],
   service:["ambient"],
   note:"General-purpose only. Never substitute where F436 is specified — common field error."},

  {code:"ASTM F959", file:"astm-f959", section:"washer",
   title:"Direct tension indicators (DTI / “squirters”)",
   grades:["Type 325","Type 490"],
   industries:["structural"],
   service:["ambient","outdoor"],
   note:"Protrusions that crush at target tension. The inspector's friend; the installer's headache."},

  /* ── THREADS ───────────────────────────────────── */
  {code:"ASME B1.1", file:"asme-b1-1", section:"thread",
   title:"Unified inch screw threads — UN, UNR, UNJ",
   grades:["UNC","UNF","UNEF"],
   industries:["general","manufacturing"],
   service:["ambient"],
   popularity: 1,
   note:"UNC is coarse. UNF is fine. UNJ has a controlled root radius — high-fatigue applications."},

  {code:"ASME B1.13M", file:"asme-b1-13m", section:"thread",
   title:"Metric screw threads, M profile",
   grades:["M coarse","M fine"],
   industries:["manufacturing","automotive","export"],
   service:["ambient"],
   note:"The M series. Pitch is called out in millimeters (e.g. M10×1.5)."},

  {code:"ASME B1.20.1", file:"asme-b1-20-1", section:"thread",
   title:"NPT pipe threads, general purpose",
   grades:["NPT","NPSM","NPTF"],
   industries:["process","oil-gas","water"],
   service:["ambient","corrosive"],
   note:"Tapered. Seals on the threads. NPTF is dryseal — no sealant needed."},

  {code:"Thread Fit Classes", file:"thread-fit-classes", section:"thread",
   title:"Choosing 1A/1B, 2A/2B, 3A/3B — the fit class reference",
   grades:["1A/1B","2A/2B","3A/3B"],
   industries:["general","manufacturing"],
   service:["ambient"],
   note:"2A/2B is the default for 95% of inch fasteners. 3A/3B for aerospace and tight tolerances."},

  /* ── COATINGS ──────────────────────────────────── */
  {code:"ASTM F2329", file:"astm-f2329", section:"coating",
   title:"Hot-dip galvanizing of fasteners",
   grades:["HDG"],
   industries:["structural","infrastructure","outdoor"],
   service:["outdoor","corrosive"],
   popularity: 1,
   note:"Zinc-iron alloy. Most durable outdoor coating for carbon steel. Supersedes A153 Class C."},

  {code:"ASTM F1941", file:"astm-f1941", section:"coating",
   title:"Electrodeposited zinc coatings on fasteners",
   grades:["Fe/Zn 3","Fe/Zn 8","Fe/Zn 25"],
   industries:["general","manufacturing"],
   service:["ambient","indoor"],
   note:"Thin, bright, cheap. Indoor and mild outdoor use only."},

  {code:"ASTM B695", file:"astm-b695", section:"coating",
   title:"Mechanical zinc galvanizing (A490-approved)",
   grades:["Class 50","Class 55"],
   industries:["structural"],
   service:["outdoor"],
   note:"Only zinc coating process approved for A490 high-strength bolts. No hydrogen embrittlement risk."},

  {code:"Zinc-Flake", file:"zinc-flake-coatings", section:"coating",
   title:"Engineered zinc-flake systems — F3019, F1136, F2833",
   grades:["F3019","F1136","F2833"],
   industries:["automotive","wind","marine"],
   service:["outdoor","corrosive"],
   note:"The modern cadmium replacement. Thin, friction-controlled, salt-spray resistant."},

  {code:"Xylan", file:"xylan-fluoropolymer-coatings", section:"coating",
   title:"Xylan & fluoropolymer coatings — subsea, offshore",
   grades:["1424","1070","1052"],
   industries:["oil-gas","marine","subsea"],
   service:["corrosive","marine"],
   note:"Color-coded PTFE-based coatings. Controlled torque, deep-sea corrosion resistance."},

  {code:"Cadmium Plating", file:"cadmium-plating", section:"coating",
   title:"QQ-P-416 legacy cadmium reference & phase-out",
   grades:["Type I","Type II","Type III"],
   industries:["aerospace","legacy"],
   service:["corrosive"],
   note:"Restricted under REACH/RoHS. Included for legacy drawings; see Zinc-Flake for replacements."},

  /* ── METRIC ────────────────────────────────────── */
  {code:"ASTM F568M", file:"astm-f568m", section:"metric",
   title:"Metric property classes — ISO 898-1 / 8.8, 10.9, 12.9",
   grades:["4.6","8.8","10.9","12.9"],
   industries:["manufacturing","automotive","export"],
   service:["ambient"],
   popularity: 1,
   note:"Class 8.8 ≈ SAE Grade 5. Class 10.9 ≈ Grade 8. Class 12.9 has no common inch equivalent."},

  {code:"ISO 898-1", file:"iso-898-1", section:"metric",
   title:"Mechanical properties of carbon & alloy steel fasteners",
   grades:["4.6","5.8","8.8","10.9","12.9"],
   industries:["manufacturing","automotive","export"],
   service:["ambient"],
   note:"The source document behind every M-class callout. F568M is the US adaptation."},

  {code:"ISO 3506", file:"iso-3506", section:"metric",
   title:"Mechanical properties of corrosion-resistant stainless fasteners",
   grades:["A2-70","A4-70","A4-80","A5"],
   industries:["manufacturing","marine","food-pharma"],
   service:["corrosive","marine"],
   note:"A2 ≈ 304. A4 ≈ 316. The metric counterpart to F593."},

  {code:"DIN 931 / ISO 4014", file:"din-931", section:"metric",
   title:"Metric hex head bolts, partial thread — dimensional standard",
   grades:["M6–M64"],
   industries:["manufacturing","export"],
   service:["ambient"],
   note:"Dimensions only — pair with ISO 898-1 or ISO 3506 for the material properties."},

  {code:"DIN 934 / ISO 4032", file:"din-934", section:"metric",
   title:"Metric hex nuts, standard pattern — dimensional standard",
   grades:["M1.6–M64"],
   industries:["manufacturing","export"],
   service:["ambient"],
   note:"The metric equivalent of ANSI B18.2.2 hex nuts. Pair with 8.8 or 10.9 bolts."}
];

/* Facet labels. Ordered by usefulness to a specifying engineer. */
window.LIB_FACETS = {
  category: [
    {id:"bolt",   label:"Bolts"},
    {id:"nut",    label:"Nuts"},
    {id:"washer", label:"Washers"},
    {id:"thread", label:"Threads"},
    {id:"coating",label:"Coatings"},
    {id:"metric", label:"Metric"}
  ],
  industry: [
    {id:"structural",    label:"Structural"},
    {id:"oil-gas",       label:"Oil & Gas"},
    {id:"power",         label:"Power Gen"},
    {id:"infrastructure",label:"Infrastructure"},
    {id:"marine",        label:"Marine"},
    {id:"process",       label:"Process"},
    {id:"manufacturing", label:"Manufacturing"},
    {id:"aerospace",     label:"Aerospace"}
  ],
  service: [
    {id:"high-temp",      label:"High temp"},
    {id:"low-temp",       label:"Low temp"},
    {id:"sour",           label:"Sour / NACE"},
    {id:"corrosive",      label:"Corrosive"},
    {id:"marine",         label:"Marine"},
    {id:"outdoor",        label:"Outdoor"},
    {id:"high-pressure",  label:"High pressure"},
    {id:"ambient",        label:"Ambient"}
  ]
};
