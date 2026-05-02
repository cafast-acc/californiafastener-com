/* ─────────────────────────────────────────────────────────
   California Fastener — Industry page renderer
   Each industries-*.html calls renderIndustryPage("<key>").
   Injects nav, hero, categories, specs, applications, and quote band.
   ───────────────────────────────────────────────────────── */
(function () {
  "use strict";

  const INDUSTRIES = {
    "oil-gas": {
      kicker: "Oil & Gas",
      h1: ["Bolting for the", "line, the head,", "and the flange."],
      sub: "API-spec bolting, NACE MR0175 compliance, and the alloy grades refineries actually specify. A193 B7M, A194 2HM, A320 L7/L7M, F593 stainless — stocked, certified, shipped.",
      stats: [
        { val: "API 20E", label: "BSL-1/2/3" },
        { val: "NACE",    label: "MR0175 / MR0103" },
        { val: "−50 °F",  label: "Low-temp impact" },
        { val: "MTRs",    label: "Every heat" },
      ],
      categories: [
        { tag: "Process", title: "Flange bolting", desc: "A193 B7/B7M studs with A194 2H/2HM nuts for refinery flanges and heat exchangers.", specs: ["A193 B7","A193 B7M","A194 2H","A194 2HM"] },
        { tag: "Sour service", title: "NACE MR0175", desc: "Controlled-hardness alloy for H₂S environments — downhole, wellhead, separators.", specs: ["A193 B7M","A194 2HM","A320 L7M"] },
        { tag: "Low temp", title: "Cryogenic / LNG", desc: "Charpy-tested A320 L7, L7M, L43 for cold-climate and LNG service.", specs: ["A320 L7","A320 L7M","A320 L43"] },
        { tag: "Subsea", title: "Offshore & subsea", desc: "Xylan-coated and stainless systems for splash-zone and immersed service.", specs: ["Xylan 1424","F593 316","Inconel 625"] },
      ],
      applications: [
        "Refinery & petrochemical flange bolting",
        "Wellhead, casing, and Christmas-tree hardware",
        "Heat exchangers, reactor vessels, and pressure piping",
        "LNG trains and cryogenic storage",
        "Offshore platforms, risers, subsea manifolds",
        "Pipeline, compressor stations, pig launchers",
      ],
    },
    "construction": {
      kicker: "Construction",
      h1: ["Anchor bolts,", "structural steel,", "shipped on time."],
      sub: "F1554 anchor rods, F3125 structural bolts (A325/A490), F436 washers, A563 DH nuts. Cut, bent, galvanized, and templated to your drawing — stocked in California for same-week shipment.",
      stats: [
        { val: "F1554",  label: "36/55/105" },
        { val: "F3125",  label: "A325/A490/144" },
        { val: "HDG",    label: "F2329 spec" },
        { val: "Same-day", label: "Shop quotes" },
      ],
      categories: [
        { tag: "Anchors", title: "Anchor bolts", desc: "F1554 headed, bent, and rod-assembly styles. Gr 36, 55, 105 — cut, bent, hot-dip galvanized.", specs: ["F1554 Gr 36","F1554 Gr 55","F1554 Gr 105"] },
        { tag: "Structural", title: "Structural bolts", desc: "F3125 A325 and A490 bolt assemblies — pretensioned or snug-tight per RCSC.", specs: ["F3125 A325","F3125 A490","F3125 Gr 144"] },
        { tag: "Washers & nuts", title: "Matching hardware", desc: "F436 hardened washers, A563 DH/DH3 nuts, F959 DTIs. The rest of the assembly.", specs: ["F436","A563 DH","F959"] },
        { tag: "Post-install", title: "Post-install anchors", desc: "Hilti and Simpson Strong-Tie wedge, screw, and adhesive anchors — stocked and cross-referenced.", specs: ["Wedge","Screw","Adhesive"] },
      ],
      applications: [
        "Column base plates and pier anchors",
        "Steel-to-steel connections (RCSC)",
        "Concrete embeds, rebar splices",
        "Bridge, highway, and DOT work",
        "Tilt-up concrete, seismic retrofit",
        "Stadiums, high-rises, industrial facilities",
      ],
    },
    "power-generation": {
      kicker: "Power Generation",
      h1: ["Turbines, boilers,", "heat exchangers —", "bolted to spec."],
      sub: "High-temperature A193 B16, A540 B21–B24 turbine studs, A453 Grade 660 superalloy. Hardness-controlled, Charpy-impact tested, and supplied with mill certs every power utility will accept.",
      stats: [
        { val: "1100 °F", label: "B16 / A540" },
        { val: "A453",    label: "Grade 660" },
        { val: "EPRI",    label: "Compliant" },
        { val: "MTRs",    label: "Traceable" },
      ],
      categories: [
        { tag: "Turbine", title: "Turbine bolting", desc: "A540 B21–B24 and A193 B16 for steam-turbine casings and rotors.", specs: ["A540 B21","A540 B22","A193 B16"] },
        { tag: "Superalloy", title: "Superalloy bolting", desc: "A453 Grade 660 (A286) for gas-turbine and high-temp superheater applications.", specs: ["A453 660","A453 651","A453 662"] },
        { tag: "HRSG / boiler", title: "Boiler & HRSG", desc: "A193 B7, B16, and A194 4/7 for boilers, feedwater, and heat-recovery.", specs: ["A193 B7","A193 B16","A194 4","A194 7"] },
        { tag: "Solar / wind", title: "Renewables", desc: "F3125 structural, A325, stainless, and zinc-flake systems for PV racking, wind hubs, and towers.", specs: ["F3125 A325","Zinc-flake","F593 316"] },
      ],
      applications: [
        "Steam and gas turbine casings",
        "Heat recovery steam generators (HRSG)",
        "Boiler drums, feedwater, superheaters",
        "Nuclear containment & piping",
        "Solar PV and concentrating solar",
        "Wind turbine hubs and towers",
      ],
    },
    "power-transmission": {
      kicker: "Power Transmission",
      h1: ["Towers, substations,", "and distribution —", "hardware that holds."],
      sub: "ASTM A394 tower bolts, F1554 anchor bolts, hot-dip galvanized structural hardware for 161 kV through 765 kV lattice and monopole towers. Shipped nationwide to utilities and EPCs.",
      stats: [
        { val: "A394",   label: "Tower bolts" },
        { val: "HDG",    label: "F2329" },
        { val: "IEEE",   label: "Compliant" },
        { val: "Utility", label: "Approved" },
      ],
      categories: [
        { tag: "Tower bolts", title: "ASTM A394", desc: "Single hot-dip galvanized tower bolts with locknut features — the transmission workhorse.", specs: ["A394 Type 0","Type 1","Type 3"] },
        { tag: "Anchor", title: "Foundation anchors", desc: "F1554 Gr 36/55/105 headed and bent anchors for monopole and lattice-tower bases.", specs: ["F1554 36","F1554 55","F1554 105"] },
        { tag: "Structural", title: "Substation structural", desc: "F3125 A325, A394, and galvanized A563 DH nuts for substation dead-end and bus structures.", specs: ["F3125 A325","A394","A563 DH"] },
        { tag: "Hardware", title: "Insulator & stringing", desc: "Eye bolts, U-bolts, shackles, and line hardware — galvanized and coded to utility standards.", specs: ["U-bolt","Eye bolt","Shackle"] },
      ],
      applications: [
        "HVAC transmission towers (lattice & monopole)",
        "Substation dead-ends and bus structures",
        "Distribution pole hardware",
        "Overhead conductor stringing hardware",
        "Grounding and guy-wire anchors",
        "Transformer and switchgear foundations",
      ],
    },
    "manufacturing": {
      kicker: "Manufacturing",
      h1: ["Production fasteners,", "same part, every", "release."],
      sub: "A574 socket heads, SAE J429 Grade 5/8, F593 stainless, metric 8.8/10.9/12.9. Kitted, bagged, bar-coded, and delivered to the line — with vendor-managed inventory if you want it.",
      stats: [
        { val: "SAE",    label: "J429 / J995" },
        { val: "ISO",    label: "898-1 metric" },
        { val: "VMI",    label: "Available" },
        { val: "FIFO",   label: "Lot control" },
      ],
      categories: [
        { tag: "Socket head", title: "A574 socket head cap screws", desc: "Alloy 170 ksi tensile — the go-to for machined assemblies and jigs/fixtures.", specs: ["A574 SHCS","Button","Flat"] },
        { tag: "Inch grade", title: "SAE J429 grades", desc: "Grade 5 and Grade 8 hex head, plated or plain — the most-shipped inch fastener in industry.", specs: ["J429 Gr 5","J429 Gr 8","J995 Gr 8"] },
        { tag: "Metric", title: "Metric property classes", desc: "8.8, 10.9, 12.9 to ISO 898-1 / ASTM F568M, DIN and JIS heads stocked.", specs: ["8.8","10.9","12.9"] },
        { tag: "Stainless", title: "Corrosion-resistant", desc: "F593 / F594 austenitic stainless — 304, 316, 18-8 — in most stocked head styles.", specs: ["F593 304","F593 316","F594"] },
      ],
      applications: [
        "OEM production line hardware",
        "Machined assemblies and tooling",
        "Food-grade & pharmaceutical equipment",
        "Packaging, material handling, conveyor",
        "Automotive and commercial vehicle",
        "Contract manufacturing & job shops",
      ],
    },
    "infrastructure": {
      kicker: "Infrastructure",
      h1: ["Bridges, highways,", "ports, and transit —", "built on bolts."],
      sub: "Heavy-hex A325 and A490 structural bolts, F1554 anchor rods, F436 washers, and F959 DTIs for bridge decks, girders, retaining walls, and transit structures. Caltrans/AASHTO compliant.",
      stats: [
        { val: "AASHTO", label: "Compliant" },
        { val: "DOT",    label: "Approved" },
        { val: "F3125",  label: "A325 / A490" },
        { val: "Buy America", label: "Available" },
      ],
      categories: [
        { tag: "Bridge", title: "Bridge bolting", desc: "F3125 A325/A490 with F436 washers and A563 DH nuts. RCSC turn-of-nut or DTI.", specs: ["F3125 A325","F3125 A490","F959"] },
        { tag: "Anchor", title: "Infrastructure anchors", desc: "F1554 Gr 55 with S1 weldability, Gr 105 for high-strength. Headed, bent, or assembled.", specs: ["F1554 55","F1554 105","F1554 S1"] },
        { tag: "Transit", title: "Rail & transit", desc: "Tie-plate, rail-anchor, and structural hardware for light rail, heavy rail, and guideway.", specs: ["Track bolts","Anchor","Clip"] },
        { tag: "Marine", title: "Ports & waterways", desc: "Silicon-bronze F467, Monel, and stainless for saltwater and splash-zone service.", specs: ["F467 C65100","Monel","F593"] },
      ],
      applications: [
        "Bridge girders, splice plates, crossframes",
        "Highway retaining walls, sound walls",
        "Tunnel liners and transit structures",
        "Airport runways, taxiways, terminals",
        "Ports, bulkheads, dock hardware",
        "Water and wastewater infrastructure",
      ],
    },
  };

  const ALL_INDUSTRIES = [
    { key: "oil-gas",           label: "Oil & Gas" },
    { key: "construction",      label: "Construction" },
    { key: "power-generation",  label: "Power Generation" },
    { key: "power-transmission",label: "Power Transmission" },
    { key: "manufacturing",     label: "Manufacturing" },
    { key: "infrastructure",    label: "Infrastructure" },
  ];

  function navHtml(activeKey) {
    return `
    <nav class="cf-nav">
      <a href="homepage.html" class="cf-nav-logo">
        <span class="cf-nav-logo-mark"></span> California Fastener
      </a>
      <ul class="cf-nav-center">
        <li><a href="industrial-fasteners.html" class="cf-nav-link">Industrial</a></li>
        <li><a href="anchor-bolts.html" class="cf-nav-link">Anchor Bolts</a></li>
        <li><a href="cnc-landing.html" class="cf-nav-link">CNC Machining</a></li>
        <li><a href="spec-library.html" class="cf-nav-link">Spec Library</a></li>
        <li><a href="#" class="cf-nav-link cf-nav-link--active">Industries</a></li>
      </ul>
      <div class="cf-nav-right">
        <a href="quote-flow.html" class="cf-btn cf-btn--pill">Request Quote</a>
      </div>
    </nav>`;
  }

  function heroHtml(ind) {
    const h1 = ind.h1.map((line, i) =>
      i === ind.h1.length - 1 ? `<i>${line}</i>` : line
    ).join("<br/>");
    return `
    <header class="ind-hero">
      <div class="ind-wrap">
        <div class="ind-crumbs">
          <a href="homepage.html">California Fastener</a>
          <span class="sep">/</span>
          <a href="#">Industries</a>
          <span class="sep">/</span>
          <span class="here">${ind.kicker}</span>
        </div>
        <div class="ind-hero-grid">
          <div class="ind-hero-text">
            <div class="ind-eyebrow">${ind.kicker}</div>
            <h1>${h1}</h1>
            <p class="ind-hero-sub">${ind.sub}</p>
            <div class="ind-hero-ctas">
              <a href="quote-flow.html" class="cf-btn cf-btn--pill">Request a Quote →</a>
              <a href="spec-library.html" class="cf-btn cf-btn--link">Browse Spec Library →</a>
            </div>
            <div class="ind-hero-stats">
              ${ind.stats.map(s => `
                <div class="ind-stat">
                  <div class="ind-stat-val">${s.val}</div>
                  <div class="ind-stat-label">${s.label}</div>
                </div>`).join("")}
            </div>
          </div>
          <div class="ind-hero-image">
            <div class="ind-placeholder">${ind.kicker} hero image<br/>1200 × 900</div>
          </div>
        </div>
      </div>
    </header>`;
  }

  function categoriesHtml(ind) {
    return `
    <section class="ind-categories">
      <div class="ind-wrap">
        <div class="ind-section-head">
          <div class="ind-section-kicker">§ What we stock</div>
          <h2>Grades and hardware families that matter for ${ind.kicker.toLowerCase()}.</h2>
        </div>
        <div class="ind-cat-grid">
          ${ind.categories.map(c => `
            <div class="ind-cat">
              <div class="ind-cat-tag">${c.tag}</div>
              <h3>${c.title}</h3>
              <p>${c.desc}</p>
              <div class="ind-cat-specs">
                ${c.specs.map(s => `<span>${s}</span>`).join("")}
              </div>
            </div>`).join("")}
        </div>
      </div>
    </section>`;
  }

  function applicationsHtml(ind) {
    return `
    <section class="ind-apps">
      <div class="ind-wrap">
        <div class="ind-section-head">
          <div class="ind-section-kicker">§ Applications</div>
          <h2>Where we ship.</h2>
        </div>
        <ul class="ind-apps-list">
          ${ind.applications.map((a, i) => `
            <li><span class="ind-apps-num">${String(i+1).padStart(2, "0")}</span>${a}</li>
          `).join("")}
        </ul>
      </div>
    </section>`;
  }

  function otherIndustriesHtml(activeKey) {
    const others = ALL_INDUSTRIES.filter(i => i.key !== activeKey);
    return `
    <section class="ind-others">
      <div class="ind-wrap">
        <div class="ind-section-head">
          <div class="ind-section-kicker">§ Other industries</div>
          <h2>Every vertical we serve.</h2>
        </div>
        <div class="ind-others-grid">
          ${others.map(o => `
            <a class="ind-other" href="industries-${o.key}.html">
              <span class="ind-other-label">${o.label}</span>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 11l6-6M11 5v5H6"/></svg>
            </a>`).join("")}
        </div>
      </div>
    </section>`;
  }

  function quoteBandHtml(ind) {
    return `
    <section class="ind-quote">
      <div class="ind-quote-bg">
        <div class="ind-placeholder" style="background:#0f1115; color:rgba(255,255,255,0.2);">${ind.kicker} photography</div>
      </div>
      <div class="ind-quote-inner">
        <div class="ind-quote-kicker">${ind.kicker}</div>
        <h2>Send us the spec.</h2>
        <p>PDF, drawing, BOM, or a sketch — we'll quote it. California Fastener has been stocking and shipping ${ind.kicker.toLowerCase()} hardware since 1970.</p>
        <a href="quote-flow.html" class="cf-btn cf-btn--pill cf-btn--inverse">Request a Quote →</a>
      </div>
    </section>`;
  }

  function footerHtml() {
    return `
    <footer class="cf-footer">
      <div class="cf-footer-inner">
        <span class="cf-footer-brand"><span class="cf-nav-logo-mark"></span>California Fastener</span>
        <span class="cf-footer-copyright">Since 1970 · Hayward, CA · info@californiafastener.com</span>
      </div>
    </footer>`;
  }

  // Inject extra styles for the industry pages (not in the page CSS)
  function injectStyles() {
    if (document.getElementById("ind-styles")) return;
    const css = `
    .ind-wrap { max-width: 1280px; margin: 0 auto; padding: 0 40px; }
    @media (max-width: 720px) { .ind-wrap { padding: 0 22px; } }
    .ind-crumbs { font-family: "SF Mono", ui-monospace, monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mid); padding: 28px 0 0; }
    .ind-crumbs a { color: var(--mid); text-decoration: none; }
    .ind-crumbs a:hover { color: var(--ink); }
    .ind-crumbs .sep { margin: 0 10px; color: var(--rule); }
    .ind-crumbs .here { color: var(--ink); }

    .ind-hero { padding-bottom: 80px; border-bottom: 1px solid var(--rule-soft); background: linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%); }
    .ind-hero-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 64px; padding: 48px 0 0; align-items: center; }
    @media (max-width: 980px) { .ind-hero-grid { grid-template-columns: 1fr; gap: 40px; } }
    .ind-eyebrow { font-family: "SF Mono", monospace; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue-dark); margin-bottom: 24px; font-weight: 500; }
    .ind-hero h1 { font-size: clamp(56px, 7vw, 112px); font-weight: 600; letter-spacing: -0.04em; line-height: 0.96; color: var(--ink); margin: 0 0 28px; }
    .ind-hero h1 i { font-style: normal; font-family: inherit; font-weight: inherit; color: var(--blue-dark); }
    .ind-hero-sub { font-size: 20px; line-height: 1.5; letter-spacing: -0.01em; color: var(--ink-soft); max-width: 580px; margin: 0 0 36px; }
    .ind-hero-ctas { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 48px; }
    .ind-hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding-top: 28px; border-top: 1px solid var(--rule-soft); max-width: 620px; }
    .ind-stat-val { font-size: 24px; font-weight: 600; letter-spacing: -0.02em; color: var(--ink); line-height: 1; margin-bottom: 6px; }
    .ind-stat-label { font-family: "SF Mono", monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mid); }
    .ind-hero-image { min-height: 540px; border-radius: 18px; overflow: hidden; background: var(--bg-alt); }

    .ind-section-head { display: grid; grid-template-columns: 200px 1fr; gap: 40px; align-items: baseline; margin-bottom: 40px; max-width: 960px; }
    @media (max-width: 720px) { .ind-section-head { grid-template-columns: 1fr; gap: 8px; } }
    .ind-section-kicker { font-family: "SF Mono", monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue-dark); font-weight: 500; }
    .ind-section-head h2 { font-size: clamp(36px, 4vw, 56px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.05; color: var(--ink); margin: 0; max-width: 760px; }

    .ind-categories { padding: 88px 0; border-bottom: 1px solid var(--rule-soft); }
    .ind-cat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--rule-soft); border: 1px solid var(--rule-soft); border-radius: 16px; overflow: hidden; }
    @media (max-width: 780px) { .ind-cat-grid { grid-template-columns: 1fr; } }
    .ind-cat { background: var(--white); padding: 34px 32px 30px; }
    .ind-cat-tag { font-family: "SF Mono", monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mid); margin-bottom: 12px; }
    .ind-cat h3 { font-size: 26px; font-weight: 600; letter-spacing: -0.02em; color: var(--ink); margin: 0 0 12px; line-height: 1.15; }
    .ind-cat p { font-size: 15px; line-height: 1.5; color: var(--ink-soft); margin: 0 0 20px; max-width: 440px; letter-spacing: -0.005em; }
    .ind-cat-specs { display: flex; flex-wrap: wrap; gap: 6px; }
    .ind-cat-specs span { font-family: "SF Mono", monospace; font-size: 11px; padding: 3px 8px; border: 1px solid var(--rule); border-radius: 4px; background: var(--bg); color: var(--ink); }

    .ind-apps { padding: 88px 0; border-bottom: 1px solid var(--rule-soft); }
    .ind-apps-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border-top: 1px solid var(--rule-soft); }
    @media (max-width: 780px) { .ind-apps-list { grid-template-columns: 1fr; } }
    .ind-apps-list li { padding: 22px 0; border-bottom: 1px solid var(--rule-soft); display: flex; align-items: baseline; gap: 18px; font-size: 18px; color: var(--ink); letter-spacing: -0.01em; }
    .ind-apps-list li:nth-child(odd) { padding-right: 24px; }
    .ind-apps-list li:nth-child(even) { padding-left: 24px; border-left: 1px solid var(--rule-soft); }
    @media (max-width: 780px) { .ind-apps-list li:nth-child(even) { padding-left: 0; border-left: none; } .ind-apps-list li:nth-child(odd) { padding-right: 0; } }
    .ind-apps-num { font-family: "SF Mono", monospace; font-size: 11px; color: var(--mid); letter-spacing: 0.12em; }

    .ind-others { padding: 80px 0; }
    .ind-others-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: var(--rule-soft); border: 1px solid var(--rule-soft); border-radius: 14px; overflow: hidden; }
    .ind-other { background: var(--white); padding: 22px 26px; display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: var(--ink); transition: background 140ms; }
    .ind-other:hover { background: var(--bg); }
    .ind-other-label { font-size: 17px; font-weight: 500; letter-spacing: -0.01em; }
    .ind-other svg { color: var(--mid-soft); transition: color 140ms, transform 140ms; }
    .ind-other:hover svg { color: var(--blue-dark); transform: translate(2px, -2px); }

    .ind-quote { position: relative; color: white; padding: 120px 40px; overflow: hidden; background: var(--dark-1); }
    .ind-quote-bg { position: absolute; inset: 0; z-index: 1; }
    .ind-quote-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,17,21,0.7) 0%, rgba(15,17,21,0.92) 100%); }
    .ind-quote-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; text-align: center; }
    .ind-quote-kicker { font-family: "SF Mono", monospace; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 18px; }
    .ind-quote h2 { font-size: clamp(56px, 7vw, 112px); font-weight: 600; line-height: 0.98; letter-spacing: -0.04em; color: white; margin: 0 0 24px; }
    .ind-quote p { font-size: 20px; color: rgba(255,255,255,0.82); line-height: 1.45; letter-spacing: -0.01em; max-width: 620px; margin: 0 auto 40px; }

    .cf-footer { border-top: 1px solid var(--rule-soft); padding: 28px 0; background: var(--bg); }
    .cf-footer-inner { max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--mid); flex-wrap: wrap; gap: 12px; }
    .cf-footer-brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 500; color: var(--ink); }
    `;
    const s = document.createElement("style");
    s.id = "ind-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  window.renderIndustryPage = function (key) {
    const ind = INDUSTRIES[key];
    if (!ind) {
      document.body.innerHTML = '<pre style="padding:40px;font-family:SF Mono,monospace;">Industry not found: ' + key + '</pre>';
      return;
    }
    document.title = ind.kicker + " — California Fastener";
    injectStyles();
    document.body.innerHTML =
      navHtml(key) +
      heroHtml(ind) +
      categoriesHtml(ind) +
      applicationsHtml(ind) +
      otherIndustriesHtml(key) +
      quoteBandHtml(ind) +
      footerHtml();
  };

})();
