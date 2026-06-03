import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "@/styles/cf-product-page.css";
import "@/styles/cf-structural-fasteners.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { Img } from "@/components/Img";
import { QuoteFormPlaceholder } from "@/components/QuoteFormPlaceholder";

export const metadata: Metadata = {
  title: "Structural Fasteners",
  description:
    "F3125 (A325 / A490 / F1852 / F2280), F1554 anchor rod, A563 heavy hex nuts, F436 hardened washers, F959 DTIs. RCSC-tested kits, full traceability, Buy America documentation.",
};

export default function StructuralFastenersPage() {
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
              Structural Fasteners
            </div>
            <div className="pp-eyebrow">Structural Fasteners</div>
            <h1>
              Structural bolting
              <br />
              for <i>steel-frame</i>
              <br />
              connections.
            </h1>
            <p className="pp-hero-sub">
              High-strength structural bolts, nuts, washers, and anchor rod for steel-frame
              buildings, bridges, and heavy infrastructure. F3125 (A325 / A490), TC bolts, and F1554
              — galvanized or plain, with full traceability on every shipment.
            </p>
            <div className="pp-hero-ctas">
              <Link href="/quote" className="cf-pill cf-pill--blue">
                Request a Quote
              </Link>
              <a href="#products" className="cf-link">
                View products ↓
              </a>
            </div>
            <div className="pp-hero-stats">
              <HeroStat val="F3125" label="A325 / A490 bolts" />
              <HeroStat val="A563" label="Heavy hex nuts" />
              <HeroStat val="F436" label="Washers" />
              <HeroStat val="Full" label="Heat & lot traceability" />
            </div>
          </div>
          <div className="pp-hero-image">
            <div className="pp-hero-image-tag">F3125 Gr A325 · Type 1 · Hot-dip galvanized</div>
            <Image
              src="/assets/structural-hero-bolt.png"
              alt="Structural heavy hex bolt"
              width={1478}
              height={1021}
              priority
              quality={95}
              sizes="(max-width: 1000px) 100vw, 750px"
            />
          </div>
        </div>
      </section>

      {/* PROPERTY STRIP */}
      <section className="pp-props">
        <div className="pp-props-inner">
          <Property
            num="01"
            title="High-strength"
            desc="F3125 quenched-and-tempered structural bolts at 120 ksi (A325) and 150 ksi (A490) — the standard fasteners for steel-to-steel connections."
          />
          <Property
            num="02"
            title="Tested assemblies"
            desc="Bolt, nut, and washer shipped together as matched kits. Lot-by-lot rotational-capacity testing per F3125 Annex A2 on every shipment."
          />
          <Property
            num="03"
            title="Galvanized or plain"
            desc="Hot-dip galvanized, mechanically galvanized, weathering Type 3, or plain finish — matched coatings across the bolt, nut, and washer."
          />
          <Property
            num="04"
            title="Full traceability"
            desc="MTRs and heat / lot traceability on every shipment. Domestic-melt and Buy America documentation available for DOT and bridge work."
          />
        </div>
      </section>

      {/* POSITIONING */}
      <section className="pp-intro">
        <div className="pp-intro-inner">
          <div className="pp-intro-lead">
            <h2>
              The bolts that connect
              <br />
              steel to <i>steel.</i>
            </h2>
          </div>
          <div className="pp-intro-body">
            <p>
              Structural Fasteners is the family of high-strength bolts, heavy hex nuts, hardened
              washers, and anchor rod that show up on bolted steel connections — beam-to-column,
              splice plates, base plates, bridge girders, moment frames, and braces.
            </p>
            <p>
              Spec&apos;d through the F3125 umbrella standard (which now consolidates A325, A490,
              F1852, and F2280), and detailed at the joint level by the RCSC&apos;s Specification for
              Structural Joints. Stocked in plain, mechanically galvanized, and hot-dip galvanized —
              assembled and tested as bolt / nut / washer kits.
              <em>
                Looking for foundation anchors, stud bolts, or general industrial hex? See cross-links
                at the bottom.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="pp-products" id="products">
        <div className="pp-products-header">
          <div className="eyebrow">What we stock</div>
          <h2>
            Six product families.
            <br />
            <i>One supplier.</i>
          </h2>
          <p>
            The full bolted joint — bolts, nuts, washers, and anchor rod — stocked deep and shipped
            together as tested assemblies.
          </p>
        </div>
        <div className="pp-products-grid">
          <ProductCard
            pnum="01 / Heavy hex structural"
            img="/assets/products/industrial-heavy-hex-bolt-1.png"
            imgAlt="Heavy hex structural bolt — F3125 A325"
            title="Heavy hex structural bolts"
            desc="The workhorse structural bolt — short, fully-threaded heavy hex pattern for steel-to-steel connections. Plain or galvanized."
            metaBold="F3125 Gr A325 · A490"
            metaRest=" · Type 1 / Type 3"
          />
          <ProductCard
            pnum="02 / TC bolt"
            placeholder={["Product shot", "Tension-control bolt assembly"]}
            title="Tension-control (TC) bolts"
            desc="Splined-end bolts that snap off at proper pretension. Faster, more consistent installation on slip-critical joints. Pre-assembled with nut and washer."
            metaBold="F3125 Gr F1852 · F2280"
            metaRest=" · 120 / 150 ksi"
          />
          <ProductCard
            pnum="03 / Heavy hex nut"
            img="/assets/products/industrial-heavy-hex-nut-1.png"
            imgAlt="A563 Grade DH heavy hex nut"
            title="Heavy hex nuts"
            desc="A563 Grade DH heavy hex matched to A325 and A490 structural bolts. Coatings matched to bolt — galv on galv, plain on plain."
            metaBold="ASTM A563"
            metaRest=" · Grade DH · DH3"
          />
          <ProductCard
            pnum="04 / F436 washer"
            img="/assets/products/structural-f436-washer-1.png"
            imgAlt="F436 through-hardened structural washer"
            title="Hardened flat washers"
            desc="Through-hardened structural washers for the bolt head and / or nut side of high-strength joints. Type 1 plain, Type 3 weathering."
            metaBold="ASTM F436"
            metaRest=" · Type 1 · Type 3 · circular & clipped"
          />
          <ProductCard
            pnum="05 / DTI washer"
            img="/assets/products/structural-dti-washer-1.png"
            imgAlt="F959 direct-tension indicator (DTI) washer"
            title="Direct-tension indicators"
            desc='Load-indicating washers (DTIs / "squirters") that compress visibly when the bolt reaches pretension. Inspector-friendly verification.'
            metaBold="ASTM F959"
            metaRest=" · Type 325 / Type 490 · plain & galvanized"
          />
          <ProductCard
            pnum="06 / Anchor rod"
            img="/assets/products/structural-f1554-anchor-rod-5.png"
            imgAlt="F1554 anchor rod assemblies"
            title="F1554 anchor rod"
            desc="Headed, bent, and straight anchor rod for column bases and embed plates. Cut to length, with matching nuts and plate washers."
            metaBold="ASTM F1554"
            metaRest=" · Gr 36 · 55 · 105 · Wpd / S1"
          />
        </div>
      </section>

      {/* GRADES — grouped by family */}
      <section className="pp-grades" id="grades">
        <div className="pp-grades-inner">
          <div className="pp-grades-header">
            <h2>
              Specs and grades,
              <br />
              grouped by <i>family.</i>
            </h2>
            <p>
              Structural connections are governed by F3125 for the bolts themselves and the RCSC
              Specification for the joint. Below is how we organize the specs we work in most often
              — if your detail calls something we haven&apos;t listed, ask.
            </p>
          </div>

          <Family
            num="Family 01"
            title="High-strength structural bolts"
            blurb="The F3125 umbrella consolidates the four legacy structural bolt standards. Same product names you've always used — A325, A490, F1852, F2280 — now grades within F3125."
            specs={[
              {
                family: "F3125",
                name: "Grade A325",
                tags: ["Type 1", "Type 3", "120 ksi"],
                body:
                  "Medium-carbon, quenched and tempered heavy hex structural bolt — 120 ksi tensile up through 1″, 105 ksi above. Type 1 is plain or galvanized; Type 3 is weathering steel for unpainted exposed connections (think bridges, parking decks).",
              },
              {
                family: "F3125",
                name: "Grade A490",
                tags: ["Type 1", "Type 3", "150 ksi"],
                body:
                  "Alloy steel, quenched and tempered — 150 ksi tensile. Used where geometry or capacity calls for the higher-strength fastener. A490 must not be hot-dip galvanized; if you need a corrosion-resistant 150 ksi assembly, talk to us about alternatives.",
              },
              {
                family: "F3125",
                name: "Grade F1852 · F2280",
                tags: ["TC bolt", "120 ksi", "150 ksi"],
                body:
                  "Tension-control (TC / twist-off) bolts — A325 equivalent at F1852 (120 ksi), A490 equivalent at F2280 (150 ksi). Splined end snaps off at proper pretension. Shipped pre-assembled with nut and washer; lubricant pre-applied.",
              },
            ]}
          />

          <Family
            num="Family 02"
            title="Anchor rod"
            blurb="F1554 covers anchor rod for cast-in-place foundations — column bases, equipment skids, embed plates, and signpost foundations."
            specs={[
              {
                family: "ASTM F1554",
                name: "Grade 36",
                tags: ["36 ksi", "Mild carbon"],
                body:
                  "Mild carbon, weldable anchor rod — the default for low-to-moderate column loads, sign and light pole bases, and most non-seismic building anchorages. Available headed, bent (J / L), or straight with nut and plate washer.",
              },
              {
                family: "ASTM F1554",
                name: "Grade 55",
                tags: ["55 ksi", "S1 weldable"],
                body:
                  "Higher-strength carbon steel anchor rod with controlled chemistry. Spec the supplemental S1 requirement when the rod will be welded — common for tied-in column bases and bridge anchorages.",
              },
              {
                family: "ASTM F1554",
                name: "Grade 105",
                tags: ["105 ksi", "Q & T alloy"],
                body:
                  "Quenched and tempered alloy anchor rod for high-uplift, seismic, and heavy-equipment anchorages. Wpd (weldable) supplement available; verify hydrogen-embrittlement procedures if hot-dip galvanizing.",
              },
            ]}
          />

          <Family
            num="Family 03"
            title="Nuts & washers"
            blurb="The companion hardware that the joint won't perform without. We ship matched assemblies — bolt, nut, and washer from compatible heat lots, tagged together."
            specs={[
              {
                family: "ASTM A563",
                name: "Grade DH · DH3",
                tags: ["Heavy hex", "Type 1", "Type 3"],
                body:
                  "Carbon & alloy heavy hex nut. Grade DH (Type 1) for plain and galvanized A325 / A490; Grade DH3 (Type 3) for weathering steel. Coatings always matched to the bolt.",
              },
              {
                family: "ASTM F436",
                name: "Hardened washer",
                tags: ["Type 1", "Type 3", "Circular · clipped"],
                body:
                  "Through-hardened flat washer used under turned element when geometry calls for one — slotted holes, oversized holes, or A490 assemblies. Clipped pattern available where edge clearance is tight.",
              },
              {
                family: "ASTM F959",
                name: "DTI washer",
                tags: ["Type 325", "Type 490", "Plain · galv."],
                body:
                  "Direct-tension indicator — load-indicating washer with raised protrusions that compress at proper pretension. Squirter (HRC) variant ejects orange silicone for visual confirmation. Pairs with installer-friendly inspection.",
              },
            ]}
          />
        </div>
      </section>

      {/* JOINT TYPES — dark band */}
      <section className="sf-joint">
        <div className="sf-joint-inner">
          <div className="sf-joint-header">
            <div className="eyebrow">RCSC joint classification</div>
            <h2>
              Three joint types.
              <br />
              Three <i>installation</i> stories.
            </h2>
            <p>
              The RCSC Specification recognizes three joint types — and the right pretension method
              depends on which one you&apos;re detailing. Snug-tight is fine for most bearing joints;
              pretensioned and slip-critical require verified installation.
            </p>
          </div>
          <div className="sf-joint-grid">
            <JointCard
              num="Type 01"
              title="Snug-tight bearing"
              desc="The most common joint. Bolts brought to the snug-tight condition — full effort of an ironworker on an ordinary spud wrench, or a few hits of an impact. Adequate for static, non-fatigue, non-A490 conditions."
              tag="Most A325 connections"
            />
            <JointCard
              num="Type 02"
              title="Pretensioned"
              desc="Bolt is installed to a verified minimum pretension (~70% of tensile strength). Required for fatigue-loaded connections, dynamic load reversal, A490 in tension applications, and long slip-resistant connections."
              tag="Turn-of-nut · DTI · TC bolts · calibrated wrench"
            />
            <JointCard
              num="Type 03"
              title="Slip-critical"
              desc="Same pretension as a pretensioned joint, plus a verified faying-surface condition (Class A, B, or C). Required where slip would be a serviceability or fatigue concern — bridge splices, crane runways, oversized / slotted holes."
              tag="Pretension + faying surface class"
            />
          </div>
        </div>
      </section>

      {/* COATINGS */}
      <section className="sf-coatings">
        <div className="sf-coatings-inner">
          <div className="sf-coatings-text">
            <div className="eyebrow">Coatings &amp; corrosion</div>
            <h2>
              Match the coating
              <br />
              to the <i>exposure.</i>
            </h2>
            <p>
              Plain bolts inside a heated building. Hot-dip galvanized A325 on the bridge deck.
              Weathering Type 3 on the unpainted plate girder. Pick the right finish up front —
              re-coating high-strength bolts in the field isn&apos;t a thing.
            </p>
            <Link href="/quote" className="cf-pill cf-pill--blue">
              Talk through finish options
            </Link>
          </div>
          <ul className="sf-coatings-list">
            <Coating
              title="Plain finish"
              spec="F3125 default"
              desc="Uncoated, oil-quenched. Suitable for interior, dry, or painted-over service. Ships with a light protective oil — not a long-term corrosion coating."
            />
            <Coating
              title="Hot-dip galvanized"
              spec="F2329 · A325 only"
              desc={
                <>
                  Thicker zinc layer for severe outdoor exposure. Bolt, nut, and washer all
                  galvanized; nut overtapped. <strong>Not permitted on A490 / F2280</strong> due to
                  hydrogen embrittlement risk.
                </>
              }
            />
            <Coating
              title="Mechanically galvanized"
              spec="F1136 / B695 Cl. 55"
              desc="Zinc applied without thermal cycle — lower embrittlement risk and tighter dimensional control than HDG. An option where HDG isn't preferred."
            />
            <Coating
              title="Weathering steel (Type 3)"
              spec="F3125 Type 3"
              desc="Atmospheric-corrosion-resistant steel that develops a protective oxide patina. Used on unpainted weathering-steel bridges and architectural exposed connections."
            />
            <Coating
              title="Zinc / aluminum flake"
              spec="Geomet · Magni"
              desc="Inorganic zinc-rich topcoat applied as a dip-spin. Thin, even, and well-suited to slip-critical joints where coating thickness affects faying-surface class."
            />
          </ul>
        </div>
      </section>

      {/* TRACEABILITY */}
      <section className="pp-trace">
        <div className="pp-trace-inner">
          <div className="pp-trace-header">
            <div className="eyebrow">Documentation</div>
            <h2>
              What <i>ships</i> with the bolts.
            </h2>
            <p>
              Structural bolts are inspected hardware. Every assembly we ship is traceable to heat
              and lot, with the documentation a structural inspector or DOT engineer expects to see.
            </p>
          </div>
          <div className="pp-trace-grid">
            <TraceCard
              num="01"
              title="Material Test Reports"
              desc="MTRs / Mill Test Certificates tied to the heat and lot on every shipment. Mechanical & chemistry per F3125, A563, F436."
            />
            <TraceCard
              num="02"
              title="Rotational-capacity (RoCap)"
              desc="Lot-by-lot rotational-capacity test on assembled bolt / nut / washer kits per F3125 Annex A2. Documents the assembly's behavior under installation tension."
            />
            <TraceCard
              num="03"
              title="Buy America / DOT"
              desc="Domestic-melt / domestic-pour material with full state-DOT documentation. Common asks: Caltrans, AASHTO, Buy America bridge work — flag it on the RFQ."
            />
            <TraceCard
              num="04"
              title="DTI & TC test data"
              desc="F959 calibration test results and F1852 / F2280 lubrication and elongation test data shipped with the kits for the inspector's file."
            />
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="pp-cross pp-cross--alt">
        <div className="pp-cross-inner">
          <div className="pp-cross-header">
            <h2>
              Looking for something
              <br />a little <i>different?</i>
            </h2>
            <p>
              Structural Fasteners is the steel-frame bolted-joint world. If your project lives one
              step over, start here instead.
            </p>
          </div>
          <div className="pp-cross-grid">
            <CrossLink
              href="/anchor-bolts"
              question="Foundation anchors, embed plates, signposts?"
              title="Anchor Bolts"
              spec="F1554 · A193 B7/B8/B8M · F593"
            />
            <CrossLink
              href="/industrial-fasteners"
              question="Process piping, machinery, pressure flanges?"
              title="Industrial Fasteners"
              spec="A193 B7/B8/B8M · A194 · A574"
            />
            <CrossLink
              href="/stud-bolts-threaded-rod"
              question="Long studs or rod stock cut to length?"
              title="Stud Bolts & Threaded Rod"
              spec="B7 · B8 · B16 · A36"
            />
            <CrossLink
              href="/hollo-bolt"
              question="Bolting into a hollow section from one side?"
              title="Lindapter Hollo-Bolt"
              spec="Blind expansion fastener · HSS"
            />
            <CrossLink
              href="/stainless-steel-fasteners"
              question="Stainless-only, corrosion-driven spec?"
              title="Stainless Steel Fasteners"
              spec="304 · 316 · duplex · PH grades"
            />
            <CrossLink
              href="/cnc-machining"
              question="Custom geometry or non-standard part?"
              title="CNC Machining"
              spec="In-house · DFARS · AS9102"
            />
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="pp-quote pp-quote--alt">
        <div className="pp-quote-inner">
          <div className="pp-quote-text">
            <div className="eyebrow">Request a quote</div>
            <h2>
              Send the <i>BOM.</i>
              <br />
              We&apos;ll size the kit.
            </h2>
            <p>
              Send the structural drawing, the bolt schedule, or the shop&apos;s BOM. A bolt
              specialist will come back with priced, packaged-per-connection kits — usually inside
              24 hours.
            </p>
            <div className="pp-quote-contact">
              Prefer to talk it through?
              <b>707.741.3277</b>
              <b>sales@californiafastener.com</b>
            </div>
          </div>
          <QuoteFormPlaceholder
            textareaLabel="Project & bolt schedule"
            textareaPlaceholder="Project type, F3125 grade, sizes, finish, quantities — or paste the bolt schedule."
          />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="pp-cta">
        <div className="pp-cta-inner">
          <div className="pp-cta-eyebrow">Talk to a bolt specialist</div>
          <h2>
            Hold the steel.
            <br />
            Hold the <i>schedule.</i>
          </h2>
          <p>
            From a single heavy hex kit to a full bridge-deck package with RoCap, DTI test data, and
            Buy America documentation — we&apos;ve shipped the package before.
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

function Property({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="pp-prop">
      <div className="pn">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function ProductCard({
  pnum,
  img,
  imgAlt,
  placeholder,
  title,
  desc,
  metaBold,
  metaRest,
}: {
  pnum: string;
  img?: string;
  imgAlt?: string;
  placeholder?: [string, string];
  title: string;
  desc: string;
  metaBold: string;
  metaRest: string;
}) {
  return (
    <div className="pp-product-card">
      <div className="pp-product-photo">
        <span className="pnum">{pnum}</span>
        {img ? (
          <Img src={img} alt={imgAlt ?? ""} />
        ) : placeholder ? (
          <div className="pp-ph-placeholder">
            {placeholder[0]}
            <br />
            {placeholder[1]}
          </div>
        ) : null}
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

type Spec = { family: string; name: string; tags: string[]; body: string };

function Family({
  num,
  title,
  blurb,
  specs,
}: {
  num: string;
  title: string;
  blurb: string;
  specs: Spec[];
}) {
  return (
    <div className="pp-family">
      <div className="pp-family-label">
        <div className="num">{num}</div>
        <h3>{title}</h3>
        <p>{blurb}</p>
      </div>
      <div className="pp-family-cards">
        {specs.map((s) => (
          <div key={s.name} className="pp-spec-card">
            <div className="pp-spec-tag">
              {s.family}
              <span className="name">{s.name}</span>
              <ul className="pp-spec-grades">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="pp-spec-body">
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JointCard({ num, title, desc, tag }: { num: string; title: string; desc: string; tag: string }) {
  return (
    <div className="sf-joint-card">
      <div className="num">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="tag">{tag}</div>
    </div>
  );
}

function Coating({ title, spec, desc }: { title: string; spec: string; desc: React.ReactNode }) {
  return (
    <li>
      <b>
        {title}
        <small>{spec}</small>
      </b>
      <span>{desc}</span>
    </li>
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

