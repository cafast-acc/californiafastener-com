/* ─────────────────────────────────────────────────────────
   California Fastener — Spec Builder · Materials DB
   Exposed as window.SB_MATERIALS.  Keep flat, not modularized,
   so the scoring engine stays simple and inspectable.
   ───────────────────────────────────────────────────────── */

window.SB_MATERIALS = [
  {
    id: 'a307',
    spec: 'ASTM A307',
    grade: 'Grades A & B',
    category: 'Carbon Steel',
    tensile: '60,000 PSI min',
    tempRating: 'Standard service',
    diamRange: '¼" – 4"',
    finish: 'Plain, Hot-Dip Galvanized',
    dfars: false, inStock: true, custom: false,
    isCarbonSteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [{ spec: 'ASTM A563', grade: 'Grade A Heavy Hex' }],
    washers: [{ spec: 'ASTM F436', grade: 'Flat Washer' }],
    apps: ['structural','piping','industrial','unsure'],
    envs: ['standard','outdoor'],
    strengths: ['standard'],
    why: {
      structural: 'A307 Grade B provides economical heavy hex bolts for light structural and piping connections where high strength is not required.',
      piping: 'Grade B heavy hex studs are specifically designed for flanged joints in cast iron piping systems — the most common low-pressure piping spec.',
      industrial: 'The go-to budget option for non-critical general industrial fastening where corrosion and high temperature are not concerns.',
      default: 'A307 is a reliable, cost-effective carbon steel fastener for standard service conditions where high strength and corrosion resistance are not requirements.'
    }
  },
  {
    id: 'f1554',
    spec: 'ASTM F1554',
    grade: 'Grades 36, 55 & 105',
    category: 'Anchor Bolts',
    tensile: 'Gr36: 58 ksi · Gr55: 75 ksi · Gr105: 125 ksi',
    tempRating: 'Standard to moderate',
    diamRange: 'Custom — any length',
    finish: 'Plain, Hot-Dip Galvanized, Mechanically Galvanized',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [
      { spec: 'ASTM A563', grade: 'Gr DH Heavy Hex (Gr 105)' },
      { spec: 'ASTM A563', grade: 'Gr A Heavy Hex (Gr 36/55)' }
    ],
    washers: [
      { spec: 'AISC Sq. Plate Washer', grade: 'Per table' },
      { spec: 'ASTM F436', grade: 'Hardened Flat Washer' }
    ],
    apps: ['anchor','structural','unsure'],
    envs: ['standard','outdoor','corrosive'],
    strengths: ['standard','high'],
    why: {
      anchor: 'F1554 is THE anchor bolt standard. Grades are designated by minimum yield — 36 ksi for light loads, 55 ksi for medium, 105 ksi for critical structural applications.',
      structural: 'When anchoring structural steel columns or equipment to concrete, F1554 provides the right grade, configuration, and traceability for engineered connections.',
      default: 'F1554 anchor bolts are available headed, bent (J/L bolt), or straight rod — with template plates and full assemblies for turnkey installation.'
    }
  },
  {
    id: 'a193b7',
    spec: 'ASTM A193 / A194',
    grade: 'B7 / 2H (most common)',
    category: 'High-Temp Alloy',
    tensile: '125,000 PSI',
    tempRating: 'Up to 1,100°F',
    diamRange: '¼" – 4"',
    finish: 'Plain, B7M (H2S service)',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isAlloySteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [
      { spec: 'ASTM A194', grade: 'Gr 2H Heavy Hex' },
      { spec: 'ASTM A194', grade: 'Gr 2HM (sour service)' }
    ],
    washers: [
      { spec: 'ASTM F436', grade: 'Hardened Flat Washer' }
    ],
    apps: ['pressure','piping','industrial','structural','custom','unsure'],
    envs: ['hightemp','highpressure','standard','outdoor'],
    strengths: ['high'],
    why: {
      pressure: 'A193 B7 is the most widely specified stud bolt material for pressure vessel and flange service — chromium-moly alloy steel with proven performance up to 1,100°F.',
      piping: 'The standard choice for high-pressure piping flanges. B7 studs with A194 2H nuts is the dominant bolting combination in ASME B16.5 flange design.',
      industrial: 'B7 threaded rod and stud bolts offer significantly higher strength than standard alloy steel at a moderate cost premium — ideal for demanding industrial applications.',
      structural: 'For high-temperature structural connections where standard A325/A490 can’t maintain design strength, B7 provides 125 ksi tensile with proven service to 1,000°F. For sustained service above 900°F, consider B16.',
      default: 'ASTM A193 B7 provides 125,000 PSI tensile with excellent high-temperature and high-pressure performance. Paired with A194 Gr 2H heavy hex nuts.'
    }
  },
  {
    id: 'a193b16',
    spec: 'ASTM A193 / A194',
    grade: 'B16 / Gr 7 (Cr-Mo-V)',
    category: 'High-Temp Alloy',
    tensile: '125,000 PSI',
    tempRating: 'Up to 1,100°F · superior creep',
    diamRange: '¼" – 4"',
    finish: 'Plain',
    dfars: true, inStock: false, custom: true,
    isCarbonSteel: false, isAlloySteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [
      { spec: 'ASTM A194', grade: 'Gr 7 Heavy Hex' },
      { spec: 'ASTM A194', grade: 'Gr 7M (sour service)' }
    ],
    washers: [{ spec: 'ASTM F436', grade: 'Hardened Flat Washer' }],
    apps: ['pressure','piping','industrial','structural','custom','unsure'],
    envs: ['hightemp','highpressure','outdoor','standard'],
    strengths: ['high'],
    why: {
      pressure: 'A193 B16 is a chromium-molybdenum-vanadium alloy engineered for sustained high-temperature service — superior creep resistance to B7 above 900°F.',
      piping: 'For high-temperature piping and steam service where B7 strength degradation is a concern, B16 maintains design strength at elevated temperatures.',
      structural: 'For high-temperature structural connections (furnace structures, refinery framing) B16 offers superior creep resistance to B7 with the same 125 ksi room-temperature tensile.',
      industrial: 'Specified when operating temperature pushes B7 beyond its comfort zone — vanadium addition dramatically improves long-term creep performance.',
      default: 'ASTM A193 B16 chromium-moly-vanadium stud bolts deliver 125 ksi tensile with markedly better creep resistance than B7 above 900°F. Paired with A194 Gr 7 nuts.'
    }
  },
  {
    id: 'a193b8m',
    spec: 'ASTM A193 / A194',
    grade: 'B8M Cl 1 / 8M (316SS, annealed)',
    category: 'Stainless Stud Bolt',
    tensile: '75,000 PSI (Cl 1)',
    tempRating: 'Up to 800°F',
    diamRange: '¼" – 4"',
    finish: 'Stainless — no coating needed',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isStainless: true, isNickelAlloy: false,
    nuts: [{ spec: 'ASTM A194', grade: 'Gr 8M Heavy Hex Nut' }],
    washers: [{ spec: '316 Stainless', grade: 'Type B Plain Washer' }],
    apps: ['pressure','piping','chemical','industrial','structural','unsure'],
    envs: ['corrosive','marine','hightemp','highpressure','outdoor'],
    strengths: ['standard'],
    why: {
      pressure: 'B8M Class 1 (316SS, solution annealed) for pressure vessel and flange service in corrosive environments — the stainless alternative to B7 where carbon steel is unsuitable.',
      piping: 'For piping with aggressive media or in marine environments, B8M Class 1 provides the corrosion resistance that carbon steel B7 cannot.',
      structural: 'For stainless structural connections in marine or corrosive environments where standard strength suffices. For high-strength stainless, see B8M Class 2.',
      marine: '316SS stud bolts via A193 B8M Class 1 are the workhorse stainless option for marine flanged applications — excellent chloride resistance at a cost advantage over Monel.',
      default: 'ASTM A193 B8M Class 1 uses solution-annealed 316 stainless for excellent corrosion resistance in chemical, marine, and elevated-temperature service. For high-strength applications, specify Class 2.'
    }
  },
  {
    id: 'a193b8cl2',
    spec: 'ASTM A193 / A194',
    grade: 'B8 Cl 2 / Gr 8 (304SS, strain-hardened)',
    category: 'High-Strength Stainless',
    tensile: '125 ksi (≤¾") · 100 ksi (1½")',
    tempRating: 'Up to 800°F',
    diamRange: '¼" – 1½"',
    finish: 'Stainless — no coating needed',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isStainless: true, isNickelAlloy: false,
    nuts: [
      { spec: 'ASTM A194', grade: 'Gr 8 Heavy Hex Nut' },
      { spec: 'ASTM A194', grade: 'Gr 8A (strain-hardened)' }
    ],
    washers: [{ spec: '304 Stainless', grade: 'Type B Plain Washer' }],
    apps: ['structural','pressure','piping','industrial','machinery','custom','unsure'],
    envs: ['corrosive','outdoor','standard','hightemp'],
    strengths: ['high'],
    why: {
      structural: 'B8 Class 2 provides 304 stainless stud bolts at 125 ksi — the high-strength stainless option for structural connections requiring corrosion resistance without sacrificing strength.',
      pressure: 'For pressure flange service requiring stainless corrosion resistance and B7-class strength, B8 Class 2 bridges the gap between Class 1 stainless and carbon steel B7.',
      piping: '304 stainless strain-hardened stud bolts for piping where standard B8M Class 1 cannot meet design strength. Cost-effective alternative to specialty alloys.',
      default: 'ASTM A193 B8 Class 2 is strain-hardened 304 stainless — 125 ksi tensile (in smaller diameters). Tensile derates with diameter; consult spec for sizes above ¾".'
    }
  },
  {
    id: 'a193b8mcl2',
    spec: 'ASTM A193 / A194',
    grade: 'B8M Cl 2 / Gr 8M (316SS, strain-hardened)',
    category: 'High-Strength Stainless',
    tensile: '110 ksi (≤¾") · 90 ksi (1½")',
    tempRating: 'Up to 800°F',
    diamRange: '¼" – 1½"',
    finish: 'Stainless — no coating needed',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isStainless: true, isNickelAlloy: false,
    nuts: [
      { spec: 'ASTM A194', grade: 'Gr 8M Heavy Hex Nut' },
      { spec: 'ASTM A194', grade: 'Gr 8MA (strain-hardened)' }
    ],
    washers: [{ spec: '316 Stainless', grade: 'Type B Plain Washer' }],
    apps: ['structural','pressure','piping','chemical','marine','industrial','custom','unsure'],
    envs: ['corrosive','marine','outdoor','standard','hightemp','highpressure'],
    strengths: ['high'],
    why: {
      structural: 'The premier choice for high-strength stainless structural connections in marine or corrosive environments — strain-hardened 316SS providing 110 ksi tensile with full chloride resistance.',
      marine: 'For marine and offshore structural connections needing both high strength and chloride resistance — significantly higher strength than B8M Cl 1 (75 ksi) without sacrificing corrosion performance.',
      pressure: 'B8M Class 2 provides high-strength stainless stud bolts for pressure flange service in aggressive media. Tensile derates with diameter above ¾".',
      chemical: 'For chemical service requiring both 316SS corrosion resistance and high tensile, B8M Class 2 is the standard answer.',
      default: 'ASTM A193 B8M Class 2 is strain-hardened 316 stainless — 110 ksi tensile (in smaller diameters). Combines marine-grade chloride resistance with high strength.'
    }
  },
  {
    id: 'a325',
    spec: 'ASTM F3125 Gr A325',
    grade: 'Type 1 & Type 3',
    category: 'Structural Bolt',
    tensile: '120 / 105 ksi',
    tempRating: 'Standard service',
    diamRange: '½" – 1½"',
    finish: 'Plain, HDG, Mechanically Galvanized',
    dfars: true, inStock: true, custom: false,
    isCarbonSteel: false, isAlloySteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [
      { spec: 'ASTM A563', grade: 'Gr DH Heavy Hex' },
      { spec: 'ASTM A563', grade: 'Gr C Heavy Hex' }
    ],
    washers: [{ spec: 'ASTM F436', grade: 'Hardened Flat Washer' }],
    apps: ['structural','infrastructure','unsure'],
    envs: ['standard','outdoor'],
    strengths: ['high'],
    why: {
      structural: 'A325 (now ASTM F3125 Gr A325) is the standard structural bolt for steel-to-steel connections in buildings and bridges. Shorter thread lengths prevent interference at the shear plane.',
      default: 'Heat-treated heavy hex structural bolt for steel connections. Type 3 (weathering steel) available for exposed applications without paint.'
    }
  },
  {
    id: 'a490',
    spec: 'ASTM F3125 Gr A490',
    grade: 'Type 1 & Type 3',
    category: 'High-Strength Structural',
    tensile: '150 / 130 ksi',
    tempRating: 'Standard service',
    diamRange: '½" – 1½"',
    finish: 'Plain only — no galvanizing',
    dfars: true, inStock: true, custom: false,
    isCarbonSteel: false, isAlloySteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [{ spec: 'ASTM A563', grade: 'Gr DH Heavy Hex (required)' }],
    washers: [{ spec: 'ASTM F436', grade: 'Hardened Flat Washer (required)' }],
    apps: ['structural','unsure'],
    envs: ['standard','outdoor'],
    strengths: ['high','ultra'],
    why: {
      structural: 'A490 (now ASTM F3125 Gr A490) is specified when A325 strength is insufficient — approximately 25% stronger. Note: A490 cannot be hot-dip galvanized due to hydrogen embrittlement risk.',
      default: 'The high-strength structural bolt for demanding connections. 150 ksi tensile for critical structural applications where A325 cannot meet design loads.'
    }
  },
  {
    id: 'a354',
    spec: 'ASTM A354',
    grade: 'Grades BC & BD',
    category: 'Alloy Steel',
    tensile: 'BC: 125 ksi · BD: 150 ksi',
    tempRating: 'Standard to moderate',
    diamRange: '¼" – 4"',
    finish: 'Plain, Zinc, Custom coating',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isAlloySteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [
      { spec: 'ASTM A563', grade: 'Gr DH Heavy Hex (BD)' },
      { spec: 'ASTM A563', grade: 'Gr C Heavy Hex (BC)' }
    ],
    washers: [{ spec: 'ASTM F436', grade: 'Hardened Flat Washer' }],
    apps: ['structural','industrial','custom','unsure'],
    envs: ['standard','outdoor','highpressure'],
    strengths: ['high','ultra'],
    why: {
      structural: 'A354 BD is similar to A490 in strength but unrestricted by configuration — available in diameters and configurations not possible with A490.',
      custom: 'When you need ultra-high strength in a custom configuration or diameter beyond 1½", A354 BD provides A490 performance without the structural bolt configuration restrictions.',
      default: 'A354 offers high to ultra-high strength in alloy steel with flexible configurations. Grade BD is preferred when A490 limitations are a constraint.'
    }
  },
  {
    id: 'a449',
    spec: 'ASTM A449',
    grade: 'Quenched & Tempered',
    category: 'Alloy Steel (legacy spec)',
    tensile: '120 / 105 / 90 ksi by dia.',
    tempRating: 'Standard service',
    diamRange: '¼" – 3"',
    finish: 'Plain, Galvanized',
    dfars: true, inStock: false, custom: true, legacySpec: true,
    isCarbonSteel: false, isAlloySteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [{ spec: 'ASTM A563', grade: 'Gr C or DH Heavy Hex' }],
    washers: [{ spec: 'ASTM F436', grade: 'Flat Washer' }],
    apps: ['structural','industrial','anchor','unsure'],
    envs: ['standard','outdoor'],
    strengths: ['standard','high'],
    why: {
      anchor: 'A449 was historically used for anchor bolts, but has been largely displaced by ASTM F1554 since 1994. For most anchor applications F1554 is the better choice.',
      structural: 'A449 is a legacy spec, largely displaced by F3125 (A325/A490) and F1554 for anchor rods. Available as a custom order when specifications specifically require it.',
      default: 'Legacy quenched-and-tempered bolt spec, chemically similar to A325/SAE Gr 5 but available in larger diameters.'
    }
  },
  {
    id: 'sae',
    spec: 'SAE J429',
    grade: 'Grades 2, 5 & 8',
    category: 'Carbon Steel',
    tensile: 'Gr5: 120 ksi · Gr8: 150 ksi',
    tempRating: 'Standard service',
    diamRange: '¼" – 1½" (Gr 5)',
    finish: 'Plain, Zinc, Chrome',
    dfars: false, inStock: true, custom: false,
    isCarbonSteel: true, isStainless: false, isNickelAlloy: false,
    nuts: [
      { spec: 'SAE J995', grade: 'Gr 5 or 8 Hex Nut' },
      { spec: 'ASTM A563', grade: 'Gr A Hex Nut (Gr 2/5)' }
    ],
    washers: [{ spec: 'SAE J432 / ASTM F436', grade: 'Hardened Flat Washer (Gr 8)' }],
    apps: ['machinery','industrial','unsure'],
    envs: ['standard'],
    strengths: ['standard','high','ultra'],
    why: {
      machinery: 'SAE J429 is the standard for automotive and machinery fasteners. Grade 5 for most applications, Grade 8 for high-load assemblies requiring 150 ksi.',
      industrial: 'The most common industrial hex bolt specification for equipment fastening where ASTM specs are not required.',
      default: 'Medium carbon steel hex cap screws for automotive and industrial use. Grade 8 provides 150 ksi tensile for high-load applications.'
    }
  },
  {
    id: 'f593',
    spec: 'ASTM F593 / F594',
    grade: '304SS & 316SS',
    category: 'Stainless Steel',
    tensile: '65,000–100,000 PSI',
    tempRating: 'Up to 800°F (304)',
    diamRange: '¼" – 1½"',
    finish: 'Stainless — naturally corrosion resistant',
    dfars: false, inStock: true, custom: true,
    isCarbonSteel: false, isStainless: true, isNickelAlloy: false,
    nuts: [
      { spec: 'ASTM F594', grade: '304SS Hex Nut' },
      { spec: 'ASTM F594', grade: '316SS Hex Nut' }
    ],
    washers: [{ spec: '18-8 Stainless', grade: 'Flat Washer' }],
    apps: ['structural','industrial','piping','chemical','machinery','unsure'],
    envs: ['corrosive','marine','outdoor','standard'],
    strengths: ['standard','high'],
    why: {
      chemical: '316SS (Group 2) provides superior resistance to chlorides and most chemical media. 304SS for less aggressive environments.',
      marine: '316 stainless is the marine standard — molybdenum content dramatically improves resistance to saltwater and chloride pitting versus 304.',
      structural: 'For structural connections in marine or coastal environments, 316SS (F593 Group 2) hex bolts provide corrosion resistance without the cost of specialty alloys.',
      industrial: 'Stainless fasteners where corrosion resistance is required but specialty alloys are not needed. 304 for standard service, 316 for more aggressive environments.',
      default: 'ASTM F593 covers 300-series stainless hex cap screws. 304SS for general corrosion resistance, 316SS for marine and chemical environments. F594 covers matching nuts.'
    }
  },
  {
    id: 'monel',
    spec: 'Monel® 400 / K500',
    grade: 'UNS N04400 / N05500',
    category: 'Nickel-Copper Alloy',
    tensile: '400: 70 ksi · K500: 160 ksi',
    tempRating: 'Up to 1,000°F',
    diamRange: 'Custom machined',
    finish: 'Natural — no coating required',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isStainless: false, isNickelAlloy: true,
    nuts: [{ spec: 'Monel 400', grade: 'Heavy Hex Nut (matching)' }],
    washers: [{ spec: 'Monel 400', grade: 'Flat Washer (matching)' }],
    apps: ['pressure','piping','marine','industrial','custom','unsure'],
    envs: ['marine','corrosive','hightemp'],
    strengths: ['standard','high','ultra'],
    why: {
      marine: 'Monel 400 is the premier alloy for seawater immersion service — exceptional resistance to saltwater corrosion and biofouling.',
      pressure: 'Monel K500 combines 400-series corrosion resistance with precipitation-hardened strength — ideal for valve stems and fasteners in corrosive pressure service.',
      default: 'Monel provides outstanding corrosion resistance to seawater, acids, and alkalis. K500 adds high strength through precipitation hardening.'
    }
  },
  {
    id: 'inconel',
    spec: 'Inconel® 625 / 718',
    grade: 'UNS N06625 / N07718',
    category: 'Superalloy',
    tensile: '625: 120 ksi · 718: 180 ksi',
    tempRating: 'Up to 2,000°F',
    diamRange: 'Custom machined',
    finish: 'Natural — no coating',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isStainless: false, isNickelAlloy: true,
    nuts: [{ spec: 'Inconel 625/718', grade: 'Custom Hex Nut (matching)' }],
    washers: [{ spec: 'Inconel', grade: 'Custom Flat Washer (matching)' }],
    apps: ['pressure','industrial','custom','unsure'],
    envs: ['hightemp','corrosive','highpressure'],
    strengths: ['high','ultra'],
    why: {
      pressure: 'Inconel is specified when temperature exceeds what A193 B7 or stainless can handle — oxidation and carburization resistance to 2,000°F.',
      industrial: 'For furnace components, heat exchangers, and petrochemical cracker applications where no other material meets the temperature and corrosion requirements.',
      default: 'Nickel-chromium superalloys for extreme temperature service. 625 and 718 are the dominant bolting grades.'
    }
  },
  {
    id: 'hastelloy',
    spec: 'Hastelloy® C276',
    grade: 'UNS N10276',
    category: 'Nickel Alloy',
    tensile: '100,000 PSI',
    tempRating: 'Up to 1,900°F',
    diamRange: 'Custom machined',
    finish: 'Natural — no coating',
    dfars: true, inStock: false, custom: true,
    isCarbonSteel: false, isStainless: false, isNickelAlloy: true,
    nuts: [{ spec: 'C276 Nickel Alloy', grade: 'Custom Hex Nut (matching)' }],
    washers: [{ spec: 'C276', grade: 'Custom Flat Washer (matching)' }],
    apps: ['chemical','industrial','custom','unsure'],
    envs: ['corrosive','hightemp'],
    strengths: ['standard','high'],
    why: {
      chemical: 'Hastelloy C276 is the most broadly corrosion-resistant alloy available — specified for sulfuric acid, hydrochloric acid, FGD, and sour gas where all other alloys fail.',
      default: 'Nickel-chromium-molybdenum alloy with extraordinary resistance to oxidizing and reducing media. The material of last resort for the most aggressive chemical environments.'
    }
  },
  {
    id: 'alloy20',
    spec: 'Alloy 20 (Carpenter® 20)',
    grade: 'UNS N08020',
    category: 'Super-Austenitic Stainless',
    tensile: '80,000 PSI',
    tempRating: 'Up to 1,000°F',
    diamRange: 'Custom machined',
    finish: 'Natural — no coating',
    dfars: false, inStock: false, custom: true,
    isCarbonSteel: false, isStainless: true, isNickelAlloy: false,
    nuts: [{ spec: 'Alloy 20', grade: 'Custom Hex Nut (matching)' }],
    washers: [{ spec: 'Alloy 20', grade: 'Custom Flat Washer (matching)' }],
    apps: ['chemical','industrial','custom','unsure'],
    envs: ['corrosive'],
    strengths: ['standard'],
    why: {
      chemical: 'Designed specifically for sulfuric acid service. Also used in pharmaceutical, chemical processing, and plastics manufacturing where 316SS is insufficient.',
      default: 'An iron-nickel-chromium alloy with copper and molybdenum additions, engineered for sulfuric acid resistance. The preferred upgrade from 316SS in sulfuric acid service.'
    }
  },
  {
    id: 'a286',
    spec: 'A286 (AMS 5726 / 5737)',
    grade: 'Iron-Nickel Superalloy',
    category: 'Aerospace Alloy',
    tensile: '130,000–185,000 PSI',
    tempRating: 'Up to 1,300°F',
    diamRange: 'Custom machined',
    finish: 'Passivated',
    dfars: true, inStock: false, custom: true,
    isCarbonSteel: false, isStainless: false, isNickelAlloy: true,
    nuts: [{ spec: 'A286', grade: 'Custom Hex Nut (matching)' }],
    washers: [{ spec: 'A286', grade: 'Custom Flat Washer (matching)' }],
    apps: ['custom','pressure','industrial','unsure'],
    envs: ['hightemp','corrosive','highpressure'],
    strengths: ['high','ultra'],
    why: {
      custom: 'A286 provides ultra-high strength at elevated temperatures — used in aerospace turbine fasteners, jet engines, and high-performance pressure equipment.',
      default: 'Iron-nickel-chromium precipitation-hardened superalloy for aerospace and high-temperature structural applications requiring both high strength and corrosion resistance above 1,000°F.'
    }
  },
  {
    id: 'a453-660',
    spec: 'ASTM A453 Gr 660',
    grade: 'Classes A / B / C / D',
    category: 'High-Temp Bolting Alloy',
    tensile: '130,000 PSI min',
    tempRating: 'Up to 1,200°F',
    diamRange: 'Custom machined',
    finish: 'Passivated',
    dfars: true, inStock: false, custom: true,
    isCarbonSteel: false, isStainless: false, isNickelAlloy: true,
    nuts: [
      { spec: 'ASTM A453', grade: 'Gr 660 Heavy Hex Nut' },
      { spec: 'ASTM A437', grade: 'Gr B4B Heavy Hex' }
    ],
    washers: [{ spec: 'A453 660', grade: 'Custom Flat Washer (matching)' }],
    apps: ['pressure','industrial','custom','unsure'],
    envs: ['hightemp','highpressure','corrosive'],
    strengths: ['high','ultra'],
    why: {
      pressure: 'A453 Grade 660 is the ASTM bolting spec for the same alloy as A286 (UNS S66286) — written specifically for high-temperature pressure and turbine bolting to 1,200°F.',
      industrial: 'The standard bolting spec for steam turbine, gas turbine, and high-temperature pressure equipment. Maintains design strength where B7 and B16 reach their limits.',
      custom: 'When your engineering spec calls out an ASTM bolting standard rather than an aerospace AMS callout, A453 Grade 660 is the right choice.',
      default: 'Precipitation-hardened iron-nickel-chromium bolting alloy (same as A286, under ASTM bolting spec) for sustained high-temperature service to 1,200°F.'
    }
  },
  {
    id: 'titanium',
    spec: 'Titanium Gr 2 / Gr 5',
    grade: 'Ti-CP2 / Ti-6Al-4V',
    category: 'Titanium',
    tensile: 'Gr2: 50 ksi · Gr5: 130 ksi',
    tempRating: 'Up to 800°F',
    diamRange: 'Custom machined',
    finish: 'Natural — naturally passive',
    dfars: true, inStock: false, custom: true,
    isCarbonSteel: false, isStainless: false, isNickelAlloy: false,
    nuts: [{ spec: 'Titanium Gr 2/5', grade: 'Custom Hex Nut (matching)' }],
    washers: [{ spec: 'Titanium', grade: 'Custom Flat Washer (matching)' }],
    apps: ['custom','industrial','unsure'],
    envs: ['marine','corrosive','hightemp'],
    strengths: ['standard','high','ultra'],
    why: {
      custom: 'Titanium Grade 5 (Ti-6Al-4V) provides aerospace-grade strength at roughly 56% the weight of steel — premier material for weight-critical structural fasteners in aerospace and defense.',
      marine: 'Grade 2 titanium offers exceptional corrosion resistance in seawater — superior to 316SS and Monel in some environments, at significant weight savings.',
      default: 'Titanium fasteners for applications needing corrosion resistance, light weight, and high strength. DFARS-compliant material available. Full cert packages standard.'
    }
  },
  {
    id: '17-4',
    spec: '17-4 PH Stainless',
    grade: 'UNS S17400 / AMS 5643',
    category: 'PH Stainless',
    tensile: '155,000–190,000 PSI',
    tempRating: 'Up to 900°F',
    diamRange: 'Custom machined',
    finish: 'Passivated',
    dfars: true, inStock: false, custom: true,
    isCarbonSteel: false, isStainless: true, isNickelAlloy: false,
    nuts: [{ spec: '17-4 PH', grade: 'Custom Hex Nut (matching)' }],
    washers: [{ spec: '17-4 PH', grade: 'Custom Flat Washer (matching)' }],
    apps: ['custom','industrial','pressure','unsure'],
    envs: ['corrosive','marine','hightemp'],
    strengths: ['ultra'],
    why: {
      custom: '17-4 PH is specified when you need the corrosion resistance of stainless combined with ultra-high strength — common in aerospace, defense, and medical applications.',
      default: 'Precipitation-hardened stainless with ultra-high tensile. Combines 300-series corrosion resistance with strength exceeding carbon alloy steels like A490.'
    }
  },
  {
    id: 'silicon-bronze',
    spec: 'Silicon Bronze',
    grade: 'Alloy 651 & 655 (Everdur®)',
    category: 'Non-Ferrous',
    tensile: '70,000 PSI',
    tempRating: 'Standard service',
    diamRange: 'Standard sizes',
    finish: 'Natural bronze finish',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isStainless: false, isNickelAlloy: false,
    nuts: [{ spec: 'Silicon Bronze', grade: 'Hex Nut (matching alloy)' }],
    washers: [{ spec: 'Silicon Bronze', grade: 'Flat Washer (matching)' }],
    apps: ['electrical','marine','structural','industrial','custom','unsure'],
    envs: ['marine','corrosive','outdoor','standard'],
    strengths: ['standard'],
    why: {
      electrical: 'Silicon bronze is specified for electrical power distribution to match the thermal expansion of copper busbar — prevents connection fatigue from thermal cycling.',
      marine: 'Silicon bronze offers excellent resistance to seawater corrosion and biofouling — a traditional marine hardware material with centuries of proven performance.',
      structural: 'For marine structural hardware where galvanic compatibility with bronze or copper fittings is required, silicon bronze prevents galvanic corrosion at the joint.',
      default: 'Copper-silicon alloy for electrical, marine, and corrosive applications. Matching alloy nuts essential to prevent galvanic corrosion and thermal mismatch.'
    }
  },
  {
    id: 'silicon-bronze-tinned',
    spec: 'Silicon Bronze — Tinned',
    grade: '651/655 + Tin Plating',
    category: 'Non-Ferrous',
    tensile: '70,000 PSI',
    tempRating: 'Standard service',
    diamRange: 'Standard sizes',
    finish: 'Electrolytic tin plating over silicon bronze',
    dfars: true, inStock: true, custom: true,
    isCarbonSteel: false, isStainless: false, isNickelAlloy: false,
    nuts: [{ spec: 'Silicon Bronze', grade: 'Hex Nut (matching alloy)' }],
    washers: [{ spec: 'Silicon Bronze', grade: 'Flat Washer (matching)' }],
    apps: ['electrical','industrial','custom','unsure'],
    envs: ['standard','corrosive'],
    strengths: ['standard'],
    why: {
      electrical: 'Tinned silicon bronze is the premium choice for high-current electrical connections — the tin plating significantly reduces contact resistance at busbar joints.',
      default: 'Electrolytic tin-plated silicon bronze fasteners for electrical power distribution. Reduces contact resistance and prevents oxidation while silicon bronze base ensures thermal compatibility with copper busbar.'
    }
  }
];
