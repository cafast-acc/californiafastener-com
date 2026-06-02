import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Img } from "@/components/Img";
import "@/styles/cf-product-page.css";
import "@/styles/cf-stainless.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { QuoteFormPlaceholder } from "@/components/QuoteFormPlaceholder";

export const metadata: Metadata = {
  title: "Stainless Steel Fasteners — 304, 316, Duplex, 17-4 PH",
  description:
    "Stainless steel bolts, nuts, studs, and washers — A2 / A4, 304, 316, duplex 2205 / 2507, 17-4 PH. A193 B8 / B8M, F593, F594. Passivated, pickled, or electropolished. Full MTRs.",
};

export default function StainlessSteelFastenersPage() {
  return (
    <>
      <CfNav />

      {/* HERO */}
      <section className="pp-hero">
        <div className="pp-hero-inner">
          <div className="pp-hero-text">
            <div className="pp-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/products">Products</Link>
              <span>/</span>
              Stainless Steel Fasteners
            </div>
            <div className="pp-eyebrow">Stainless Steel Fasteners</div>
            <h1>
              Corrosion resistance,
              <br />
              specified by the <i>grade.</i>
            </h1>
            <p className="pp-hero-sub">
              304, 316, duplex, and PH grades — bolts, nuts, studs, and washers stocked to A2 / A4,
              ASTM F593 / F594, and A193 B8 / B8M. Passivated, pickled, or electropolished, with
              full MTRs.
            </p>
            <div className="pp-hero-ctas">
              <Link href="/quote" className="cf-pill cf-pill--blue">
                Request a Quote
              </Link>
              <a href="#chooser" className="cf-link">
                Choose a grade ↓
              </a>
            </div>
            <div className="pp-hero-stats">
              <HeroStat val="304" label="18-8 austenitic" />
              <HeroStat val="316" label="Molybdenum grade" />
              <HeroStat val="2205" label="Duplex" />
              <HeroStat val="17-4" label="PH — H900 / H1025" />
            </div>
          </div>
          <div className="pp-hero-image">
            <div className="pp-hero-image-tag">A193 B8M · 316 Stainless · Heavy Hex</div>
            <Image
              src="/assets/if-stamp-b8-rod.webp"
              alt="A193 B8M 316 stainless heavy hex bolt"
              width={916}
              height={750}
              priority
              quality={95}
              sizes="(max-width: 1000px) 100vw, 750px"
            />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="pp-intro">
        <div className="pp-intro-inner">
          <div className="pp-intro-lead">
            <h2>
              When the environment
              <br />
              won&apos;t let <i>carbon</i> survive.
            </h2>
          </div>
          <div className="pp-intro-body">
            <p>
              Stainless fasteners are what we reach for when the service environment — chloride,
              acid, moisture, food contact, or temperature — would chew through plated carbon in
              months instead of decades.
            </p>
            <p>
              We stock the austenitic workhorses (304 and 316) deep, and source duplex, PH, and
              A4-80 / A4-100 strain-hardened grades to the callouts your spec actually uses.
              <em>
                If your callout doesn&apos;t appear below, ask. Most of what&apos;s printed on a
                drawing we&apos;ve shipped before.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* GRADE CHOOSER */}
      <section className="ss-chooser" id="chooser">
        <div className="ss-chooser-inner">
          <div className="ss-chooser-header">
            <div className="eyebrow">Pick your grade</div>
            <h2>
              Six stainless families.
              <br />
              <i>Six</i> problems they solve.
            </h2>
            <p>
              Stainless isn&apos;t one material — it&apos;s a handful of alloy systems with very
              different strengths, corrosion behavior, and service limits. Start here and drill into
              the spec.
            </p>
          </div>
          <div className="ss-chooser-grid">
            <ChCard
              num="01 / Austenitic 18-8"
              chip="A2 · F593 G1"
              name="304 / 18-8"
              alt="UNS S30400 · 304L · 305"
              desc="General-purpose austenitic stainless. Good corrosion resistance in most atmospheric and mild chemical service, easy to cold-form, non-magnetic in the annealed condition."
              useWhen="Food, dairy, interior architectural, mild chemical, dry atmospheric."
              skipWhen="Chlorides, seawater, crevice-prone geometry."
            />
            <ChCard
              num="02 / Austenitic + Mo"
              chip="A4 · F593 G2"
              name="316 / 316L"
              alt="UNS S31600 · 2% Mo"
              desc="Molybdenum addition steps up pitting and crevice resistance in chloride environments. 316L's lower carbon resists sensitization in welded assemblies."
              useWhen="Marine, coastal, pulp & paper, chemical processing, pharma."
              skipWhen="Sustained hot seawater above 150°F · strong oxidizing acid."
            />
            <ChCard
              num="03 / Duplex"
              chip="UNS S32205 · S32750"
              name="2205 & 2507"
              alt="Austenitic + ferritic"
              desc="About twice the yield strength of 316 with markedly better chloride SCC resistance. 2507 super-duplex is the move for hot seawater, brine, and aggressive chloride service."
              useWhen="Offshore, desalination, chemical tankage, high-strength corrosive service."
              skipWhen="Sustained service above ~600°F (σ-phase)."
            />
            <ChCard
              num="04 / Precipitation-hardening"
              chip="17-4 · 15-5 · H900"
              name="17-4 PH"
              alt="UNS S17400"
              desc="Martensitic PH stainless. Heat-treated to condition (H900, H1025, H1150) for tensile from 135 to 190 ksi. The high-strength option when carbon alloy isn't corrosion-acceptable."
              useWhen="Aerospace, valves, shafts, high-load marine hardware."
              skipWhen="Chloride SCC risk in H900 condition — consider H1150 or 2205."
            />
            <ChCard
              num="05 / Strain-hardened"
              chip="A4-80 · A4-100"
              name="Strain-hardened A4"
              alt="ISO 3506 · F593 Cl. 2"
              desc="316 stainless cold-worked to property class 80 or 100 (800 / 1000 MPa min tensile). A practical way to get structural-grade strength while keeping 316's corrosion envelope."
              useWhen="Small-diameter assemblies that need both strength and 316-level corrosion."
              skipWhen={"Diameter over 3/4″ — strength class isn't certified at larger sizes."}
            />
            <ChCard
              num="06 / High-temp stainless"
              chip="A193 B8 Cl. 2"
              name="A193 B8 / B8M"
              alt="Cl. 1 annealed · Cl. 2 strain-hardened"
              desc="Pressure-bolting spec for stainless studs and bolts. B8 is 304, B8M is 316. Class 2 strain-hardened for higher strength at ≤1″ diameter. Standard on flange kits in corrosive process service."
              useWhen="Flanged piping, pressure vessels, valve bonnets in process service."
              skipWhen="Code calls for B7 carbon alloy — use the matching spec."
            />
          </div>
        </div>
      </section>

      {/* PRODUCT FAMILIES */}
      <section className="pp-products" id="products">
        <div className="pp-products-header">
          <div className="eyebrow">Stainless — what we stock</div>
          <h2>
            Every head style,
            <br />
            every <i>thread class.</i>
          </h2>
          <p>
            From M3 socket head to 1-1/4″ heavy hex — inch and metric, stocked deep in 304 and 316,
            sourced in duplex and PH.
          </p>
        </div>
        <div className="pp-products-grid">
          <ProductCard
            pnum="01 / Heavy hex"
            img="/assets/products/ss-threaded-stud-1.png"
            imgAlt="Stainless A193 B8 stud bolt"
            title="Heavy hex bolts & studs"
            desc="Thicker-pattern hex heads for flanged and high-load joints. Stud bolts cut to length with A194 stainless nuts paired."
            metaBold="A193 B8 / B8M"
            metaRest=" · Cl. 1 & 2 · 1/4″–1-1/2″"
          />
          <ProductCard
            pnum="02 / Hex cap"
            img="/assets/products/ss-hex-cap-1.png"
            imgAlt="Stainless hex cap screw"
            title="Hex cap screws"
            desc="Standard inch-pattern hex cap screws and tap bolts. The general-purpose bolt for non-pressure stainless work."
            metaBold="F593 G1 / G2"
            metaRest=" · 304 · 316 · #10 to 1-1/4″"
          />
          <ProductCard
            pnum="03 / Socket head"
            img="/assets/products/ss-socket-head-1.png"
            imgAlt="Stainless socket head cap screw"
            title="Socket head cap screws"
            desc="Precision-fit machine screws for tight head clearance and controlled torque. 18-8 and 316 stainless, inch and metric."
            metaBold="ASTM F837"
            metaRest=" · ISO 4762 · A2 / A4"
          />
          <ProductCard
            pnum="04 / Flat head"
            img="/assets/products/ss-flat-head-1.png"
            imgAlt="Stainless flat head socket screw"
            title="Flat & button head"
            desc="Flush-mount and low-profile architectural and equipment screws. 82° (inch) and 90° (metric) countersinks."
            metaBold="ISO 10642 / 7380"
            metaRest=" · A2 / A4"
          />
          <ProductCard
            pnum="05 / Hex nuts"
            img="/assets/products/ss-hex-nut-1.png"
            imgAlt="Stainless hex and heavy hex nut"
            title="Hex & heavy hex nuts"
            desc="Matched stainless nuts — A194 8 / 8M for pressure service, F594 for non-pressure. Nylon insert lock nuts stocked in 18-8."
            metaBold="A194 Gr 8 / 8M"
            metaRest=" · F594 · NE lock"
          />
          <ProductCard
            pnum="06 / Washers"
            img="/assets/products/ss-washer-1.png"
            imgAlt="Stainless flat washer"
            title="Washers — flat & spring"
            desc="Flat, fender, spring lock, and internal / external tooth — 304 and 316 stainless. Thicker pattern for structural work on request."
            metaBold="F844"
            metaRest=" · DIN 125 / 127 · 18-8 · 316"
          />
          <ProductCard
            pnum="07 / Threaded rod"
            img="/assets/products/ss-threaded-rod-1.png"
            imgAlt="Stainless threaded rod"
            title="Threaded rod & studs"
            desc="Full-length rod in 3- and 6-ft lengths. Cut-to-length studs, double-end and tap-end, in 304 and 316."
            metaBold="A193 B8 / B8M"
            metaRest=" · F593 · UNC / UNF / metric"
          />
          <ProductCard
            pnum="08 / Sheet metal"
            img="/assets/products/ss-self-tap-1.png"
            imgAlt="Stainless self-tapping sheet metal screw"
            title="Self-tap & sheet metal"
            desc="Type A, AB, and 17 self-tappers; machine screws and thread-cutting fasteners for stainless panel and enclosure work."
            metaBold="410 SS"
            metaRest=" · 18-8 · Phillips / Torx"
          />
          <ProductCard
            pnum="09 / Specialty"
            img="/assets/products/ss-specialty-1.png"
            imgAlt="Stainless specialty and custom fastener"
            title="Specialty & custom"
            desc="Shoulder bolts, eye bolts, weldless rings, hanger bolts — and anything to print from our CNC shop in 304, 316, or 17-4 PH."
            metaBold="CNC to print"
            metaRest=" · Duplex · 17-4 PH · Monel"
          />
        </div>
      </section>

      {/* SPEC COMPARE TABLE */}
      <section className="ss-compare">
        <div className="ss-compare-inner">
          <div className="ss-compare-header">
            <h2>
              Grades at a <i>glance.</i>
            </h2>
            <p>
              Strength and corrosion trade-offs are real — here&apos;s a quick compare of the
              stainless grades we stock most often. For the full spec sheet on any row, visit the
              spec library.
            </p>
          </div>
          <div className="ss-table-wrap">
            <table className="ss-table">
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>UNS / ISO</th>
                  <th>Min. tensile</th>
                  <th>Corrosion resistance</th>
                  <th>Temp service</th>
                  <th>Magnetic</th>
                  <th>Relative cost</th>
                </tr>
              </thead>
              <tbody>
                <CmpRow grade="304 / 18-8" gradeSub="F593 Group 1 · A2" uns="S30400" tensile="70 ksi" cr="Good" crClass="cr-good" temp="−325° to 800°F" mag="No (annealed)" cost="$" />
                <CmpRow grade="316 / 316L" gradeSub="F593 Group 2 · A4" uns="S31600" tensile="70 ksi" cr="Better" crClass="cr-better" temp="−325° to 800°F" mag="No (annealed)" cost="$$" />
                <CmpRow grade="A193 B8 Cl. 1" gradeSub="Annealed 304" uns="S30400" tensile="75 ksi" cr="Good" crClass="cr-good" temp="−325° to 800°F" mag="No (annealed)" cost="$" />
                <CmpRow grade="A193 B8M Cl. 1" gradeSub="Annealed 316" uns="S31600" tensile="75 ksi" cr="Better" crClass="cr-better" temp="−325° to 800°F" mag="No (annealed)" cost="$$" />
                <CmpRow grade="A193 B8 Cl. 2" gradeSub="Strain-hardened 304" uns="S30400" tensile="125 ksi ≤¾″" cr="Good" crClass="cr-good" temp="−20° to 800°F" mag="Slight (CW)" cost="$$" />
                <CmpRow grade="A193 B8M Cl. 2" gradeSub="Strain-hardened 316" uns="S31600" tensile="110 ksi ≤¾″" cr="Better" crClass="cr-better" temp="−20° to 800°F" mag="Slight (CW)" cost="$$" />
                <CmpRow grade="Duplex 2205" gradeSub="UNS S32205 · A182 F51" uns="S32205" tensile="95 ksi" cr="High" crClass="cr-high" temp="−50° to 600°F" mag="Yes" cost="$$$" />
                <CmpRow grade="Super-duplex 2507" gradeSub="UNS S32750 · A182 F53" uns="S32750" tensile="116 ksi" cr="Best" crClass="cr-best" temp="−50° to 550°F" mag="Yes" cost="$$$$" />
                <CmpRow grade="17-4 PH H1025" gradeSub="Precipitation-hardening" uns="S17400" tensile="155 ksi" cr="Good" crClass="cr-good" temp="−100° to 600°F" mag="Yes" cost="$$$" />
                <CmpRow grade="410 martensitic" gradeSub="Self-tappers, screws" uns="S41000" tensile="75 ksi" cr="Limited" crClass="cr-limited" temp="−20° to 1200°F" mag="Yes" cost="$" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FINISH / FABRICATION */}
      <section className="ss-finish">
        <div className="ss-finish-inner">
          <div className="ss-finish-text">
            <div className="eyebrow">Finish, passivation &amp; fabrication</div>
            <h2>
              What runs after
              <br />
              the <i>bolt ships.</i>
            </h2>
            <p>
              Stainless isn&apos;t finished on the forging line. Surface condition, passivation
              state, and thread lubrication change how the fastener behaves in service — and whether
              the joint holds the way the spec promises.
            </p>
            <p>
              Standard stock ships passivated per ASTM A967. If your project needs more — pickled,
              electropolished, Molykote-coated, or with a custom stamping — flag it on the RFQ.
            </p>
          </div>
          <ul className="ss-finish-list">
            <FinishRow tag="A967" title="Passivation — standard" desc="Nitric or citric acid passivation per ASTM A967 / AMS 2700 to remove free iron and restore the chromium oxide layer." />
            <FinishRow tag="Pickling" title="Pickled & passivated" desc="For welded assemblies — pickle removes heat tint and the chrome-depleted layer at the weld, then passivation re-establishes the oxide." />
            <FinishRow tag="E-polish" title="Electropolished finish" desc="Electrochemical surface polish for pharma, food, and high-purity service — reduces surface roughness and improves corrosion behavior." />
            <FinishRow tag="Anti-gall" title="Anti-seize & thread lubricant" desc="Stainless galls. We apply Molykote 1000, nickel-based anti-seize, or wax-based coatings to reduce installation torque and prevent seizing." />
            <FinishRow tag="Marking" title="Head stamps & traceability marks" desc="Grade marking per F593 / A193 with manufacturer identifier. Custom head stamps available on larger orders to your lot-tag program." />
          </ul>
        </div>
      </section>

      {/* GOTCHAS */}
      <section className="ss-gotchas">
        <div className="ss-gotchas-inner">
          <div className="ss-gotchas-header">
            <div className="eyebrow">Field notes</div>
            <h2>
              Stainless doesn&apos;t mean
              <br />
              <i>can&apos;t fail.</i>
            </h2>
            <p>
              Six failure modes are responsible for most of the stainless warranty calls we see. If
              your joint is at risk for any of them, a quick callout change — or a stop at the quote
              desk — is cheaper than a retrofit.
            </p>
          </div>
          <div className="ss-gotchas-grid">
            <Gotcha
              num="Gotcha 01 / Galling"
              title="Threads seizing on install"
              desc="Austenitic stainless galls under torque — the mating surfaces cold-weld. Most common on 18-8 fine threads at moderate clamp. Not a corrosion issue; an assembly issue."
              fix="Nickel anti-seize, wax-coated threads, or specify a harder nut (A194 8M with lubricant, or A563 DH for non-SS joints)."
            />
            <Gotcha
              num="Gotcha 02 / Pitting & crevice"
              title="304 in chlorides"
              desc="304 in coastal air, pool chemistry, or chloride-bearing process fluid pits — especially under gaskets and lap joints where the chromium oxide can't re-form."
              fix="Step up to 316 for mild chloride, 2205 for aggressive chloride / seawater, or eliminate the crevice geometry."
            />
            <Gotcha
              num="Gotcha 03 / Chloride SCC"
              title="Stress corrosion cracking"
              desc="Austenitic stainless cracks under sustained tensile stress plus chloride plus temperature (commonly above 140°F). The bolt can pass every visual and snap under load."
              fix="Duplex (2205 / 2507) or reduce operating stress. Ferritic and duplex grades are dramatically less SCC-prone than austenitic."
            />
            <Gotcha
              num="Gotcha 04 / Galvanic coupling"
              title="Stainless on carbon steel"
              desc="Stainless fasteners into mild steel or aluminum structure can drive galvanic corrosion of the base material in wet service — the bolt looks fine, the structure eats around it."
              fix="Isolation washers, dielectric sleeves, or coordinate the grade with the base structure — sometimes HDG carbon is the right answer."
            />
            <Gotcha
              num="Gotcha 05 / Hot temp sensitization"
              title="Weld HAZ carbide precipitation"
              desc="Standard 304 / 316 held at 800°–1500°F (including weld HAZ) precipitates chromium carbides at grain boundaries, locally stripping corrosion resistance."
              fix="Specify low-carbon L grades (304L / 316L) for anything welded, or stabilized grades (321 / 347)."
            />
            <Gotcha
              num="Gotcha 06 / H900 & chlorides"
              title="17-4 PH brittle fracture"
              desc="17-4 in the H900 condition is high-strength but susceptible to hydrogen embrittlement and chloride SCC. Plenty of marine-hardware failures trace back to H900 in saltwater."
              fix="Over-age to H1025 or H1150 for marine service, or specify duplex / 316 Cl. 2 instead."
            />
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="ss-industries">
        <div className="ss-industries-inner">
          <div className="ss-industries-header">
            <h2>
              Where stainless
              <br />
              actually <i>earns</i> it.
            </h2>
            <p>
              Stainless costs more than plated carbon. Here&apos;s where the corrosion math says
              it&apos;s worth it — and which grade to reach for.
            </p>
          </div>
          <div className="ss-industries-grid">
            <IndTile href="/industries/marine" tag="316 · 2205" eyebrow="01 — Marine & coastal" title={<>Chloride-heavy<br/>structural hardware.</>} desc="Docks, piers, offshore platforms, desalination skids. 316 minimum, duplex for submerged or seawater service." />
            <IndTile href="/industries/manufacturing" tag="304L · 316L · E-polish" eyebrow="02 — Food & pharma" title={<>Clean-in-place<br/>process equipment.</>} desc="Dairy, brewing, pharma, biotech. L-grades for welded skids; electropolished finish where residue and surface roughness matter." />
            <IndTile href="/industries/oil-gas" tag="B8 / B8M · A193" eyebrow="03 — Chemical process" title={<>Flanged piping<br/>& pressure vessels.</>} desc="Pulp & paper, petrochem, refinery. B8M Cl. 2 for chloride service; B8 for non-chloride acid and neutral process." />
            <IndTile href="/industries/infrastructure" tag="304 · 316" eyebrow="04 — Wastewater" title={<>Municipal<br/>treatment plants.</>} desc="Clarifiers, headworks, UV systems. 316 for anything chlorinated; 304 acceptable in non-contact structural." />
            <IndTile href="/industries/construction" tag="316 · 17-4 H1025" eyebrow="05 — Architectural" title={<>Exposed<br/>facade hardware.</>} desc="Handrails, cladding, curtain-wall anchors. Electropolished or #4 brushed finish; 316 mandatory near coastlines." />
            <IndTile href="/industries/aerospace" tag="17-4 PH · A286" eyebrow="06 — Aerospace & defense" title={<>High-strength<br/>corrosion-resistant.</>} desc="PH grades for landing gear, engine brackets, airframe hardware. AS9102 FAI reports standard on program work." />
            <IndTile href="/industries/power-generation" tag="316 · Duplex" eyebrow="07 — Renewables" title={<>Solar & offshore<br/>wind hardware.</>} desc="Module clamps, rail hardware, foundation kits. Duplex becoming standard on offshore monopile grout connections." />
            <IndTile href="/silicon-bronze" tag="Silicon bronze · 316" eyebrow="08 — Shipbuilding" title={<>Hull & deck<br/>fittings.</>} desc="Mixed-metal marine service. Silicon bronze sometimes the right answer — see the bronze page for hull-side work." />
          </div>
        </div>
      </section>

      {/* TRACEABILITY (8-card variant) */}
      <section className="pp-trace pp-trace--alt">
        <div className="pp-trace-inner">
          <div className="pp-trace-header">
            <div className="eyebrow">Traceability &amp; documentation</div>
            <h2>
              What <i>ships</i> with the stainless.
            </h2>
            <p>
              Every stainless fastener we ship is traceable to heat and lot. Standard with every
              order; extras available on request — most of what your QA program wants, we&apos;ve
              answered before.
            </p>
          </div>
          <div className="pp-trace-grid pp-trace-grid--eight">
            <TraceCard num="01" title="Material Test Reports" desc="MTRs / Mill Test Certificates tied to the heat and lot on every shipment, with chemistry and mechanical properties." />
            <TraceCard num="02" title="Certificate of Conformance" desc="Signed C of C confirming the parts were manufactured and tested to the called-out ASTM / ISO standards." />
            <TraceCard num="03" title="PMI on request" desc="Positive Material Identification by XRF or OES — per-lot verification that what's in the bag matches the MTR." />
            <TraceCard num="04" title="AS9102 FAI" desc="First Article Inspection for aerospace programs. We've run PH and A286 packages before — full dimensional + material traceability." />
            <TraceCard num="05" title="NACE MR0175 / ISO 15156" desc="Sour-service bolting for oil & gas. Callable on B8 / B8M, 2205, and 2507 — specify on the RFQ." />
            <TraceCard num="06" title="DFARS compliant" desc="Domestic-melt / domestic-pour options for defense work. Longer lead on PH grades — plan accordingly." />
            <TraceCard num="07" title="Passivation certs" desc="A967 or AMS 2700 passivation certification on request, with batch copper-sulfate or salt-spray verification." />
            <TraceCard num="08" title="Lot-tagged kits" desc="Bolt / nut / washer kits shipped together and tagged by heat and lot so your installer never mixes classes." />
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="pp-cross">
        <div className="pp-cross-inner">
          <div className="pp-cross-header">
            <h2>
              Is stainless
              <br />
              really the <i>right call?</i>
            </h2>
            <p>
              Stainless isn&apos;t the answer to every corrosion problem. If your project lives in
              one of these neighborhoods, start there.
            </p>
          </div>
          <div className="pp-cross-grid">
            <CrossLink href="/industrial-fasteners" question="Process or mechanical assembly at temperature?" title="Industrial Fasteners" spec="A193 B7 / B16 · A194 · SAE J429 · F436" />
            <CrossLink href="/structural-fasteners" question="Bolted building or bridge connection?" title="Structural Fasteners" spec="A325 · A490 · F3125 · TC bolts" />
            <CrossLink href="/anchor-bolts" question="Foundation anchorage?" title="Anchor Bolts" spec="F1554 · A193 B7 / B8 / B8M · F593" />
            <CrossLink href="/silicon-bronze" question="Marine hull & deck in mixed metals?" title="Silicon Bronze Hardware" spec="C651 · C655 — tinned & plain" />
            <CrossLink href="/stud-bolts-threaded-rod" question="Long threaded studs or rod stock?" title="Stud Bolts & Threaded Rod" spec="B7 · B8 · B8M · B16 · cut to length" />
            <CrossLink href="/cnc-machining" question="Custom machined or non-standard geometry?" title="CNC Machining" spec="In-house · DFARS · AS9102 · 17-4 PH" />
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="pp-quote pp-quote--alt">
        <div className="pp-quote-inner">
          <div className="pp-quote-text">
            <div className="eyebrow">Request a quote</div>
            <h2>
              Send the <i>spec.</i>
              <br />
              We&apos;ll match the grade.
            </h2>
            <p>
              Stainless callouts can get long — pickled, passivated, electropolished, or NACE.
              Paste the line item, attach the drawing, or just describe the service environment.
            </p>
            <div className="pp-quote-contact">
              Prefer to talk it through?
              <b>707.741.3277</b>
              <b>sales@californiafastener.com</b>
            </div>
          </div>
          <QuoteFormPlaceholder
            textareaLabel="Stainless needed"
            textareaPlaceholder="Grade, head style, diameter × length, finish, quantity — or paste a line item."
          />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="pp-cta">
        <div className="pp-cta-inner">
          <div className="pp-cta-eyebrow">Talk to a stainless specialist</div>
          <h2>
            Know the service.
            <br />
            Spec the <i>right grade.</i>
          </h2>
          <p>
            From a single 316 heavy hex to a full duplex flange kit with NACE certs — send the
            drawing and we&apos;ll come back with a quote, usually inside 24 hours.
          </p>
          <div className="pp-cta-ctas">
            <Link href="/quote" className="cf-pill cf-pill--blue-light">
              Request a Quote
            </Link>
            <a href="tel:7077413277" className="cf-pill cf-pill--ghost-dark">
              Call 707.741.3277
            </a>
          </div>
        </div>
      </section>

      <CfFooter />
    </>
  );
}

function HeroStat({ val, label }: { val: string; label: string }) {
  return (
    <div>
      <div className="pp-hero-stat-val">{val}</div>
      <div className="pp-hero-stat-label">{label}</div>
    </div>
  );
}

function ChCard({
  num,
  chip,
  name,
  alt,
  desc,
  useWhen,
  skipWhen,
}: {
  num: string;
  chip: string;
  name: string;
  alt: string;
  desc: string;
  useWhen: string;
  skipWhen: string;
}) {
  return (
    <div className="ss-ch-card">
      <div className="ch-head">
        <div className="ch-num">{num}</div>
        <div className="ch-chip">{chip}</div>
      </div>
      <h3>{name}</h3>
      <div className="ch-alt">{alt}</div>
      <p>{desc}</p>
      <div className="ch-props">
        <div>
          <b>Use when</b>
          <span>{useWhen}</span>
        </div>
        <div>
          <b>Skip when</b>
          <span>{skipWhen}</span>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  pnum,
  title,
  desc,
  metaBold,
  metaRest,
  img,
  imgAlt,
}: {
  pnum: string;
  title: string;
  desc: string;
  metaBold: string;
  metaRest: string;
  img?: string;
  imgAlt?: string;
}) {
  return (
    <div className="pp-product-card">
      <div className="pp-product-photo">
        <span className="pnum">{pnum}</span>
        {img ? (
          <Img src={img} alt={imgAlt ?? title} />
        ) : (
          <div className="pp-ph-placeholder">{title}</div>
        )}
      </div>
      <div className="pp-product-body">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="pp-product-meta">
          <b>{metaBold}</b>
          {metaRest}
        </div>
      </div>
    </div>
  );
}

function CmpRow({
  grade,
  gradeSub,
  uns,
  tensile,
  cr,
  crClass,
  temp,
  mag,
  cost,
}: {
  grade: string;
  gradeSub: string;
  uns: string;
  tensile: string;
  cr: string;
  crClass: string;
  temp: string;
  mag: string;
  cost: string;
}) {
  return (
    <tr>
      <td className="grade">
        {grade}
        <small>{gradeSub}</small>
      </td>
      <td className="mono">{uns}</td>
      <td className="mono">{tensile}</td>
      <td className="pill-cell">
        <span className={`tag cr ${crClass}`}>{cr}</span>
      </td>
      <td className="mono">{temp}</td>
      <td className="mono">{mag}</td>
      <td className="pill-cell">
        <span className="tag cost">{cost}</span>
      </td>
    </tr>
  );
}

function FinishRow({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <li>
      <b>{tag}</b>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </li>
  );
}

function Gotcha({
  num,
  title,
  desc,
  fix,
}: {
  num: string;
  title: string;
  desc: string;
  fix: string;
}) {
  return (
    <div className="ss-gotcha">
      <div className="num">{num}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className="fix">
        <b>Fix</b>
        {fix}
      </div>
    </div>
  );
}

function IndTile({
  href,
  tag,
  eyebrow,
  title,
  desc,
}: {
  href: string;
  tag: string;
  eyebrow: string;
  title: React.ReactNode;
  desc: string;
}) {
  return (
    <Link href={href} className="ss-ind-tile">
      <div className="ss-ind-ph" />
      <div className="ss-ind-tag">{tag}</div>
      <div className="ss-ind-body">
        <div className="ss-ind-eyebrow">{eyebrow}</div>
        <div className="ss-ind-title">{title}</div>
        <div className="ss-ind-desc">{desc}</div>
      </div>
    </Link>
  );
}

function TraceCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="pp-trace-card">
      <div className="num">{num}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function CrossLink({
  href,
  question,
  title,
  spec,
}: {
  href: string;
  question: string;
  title: string;
  spec: string;
}) {
  return (
    <Link href={href} className="pp-cross-card">
      <div className="question">{question}</div>
      <h4>{title}</h4>
      <div className="spec">{spec}</div>
    </Link>
  );
}
