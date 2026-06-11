import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "@/styles/cf-hollo-bolt.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { QuoteFormPlaceholder } from "@/components/QuoteFormPlaceholder";

export const metadata: Metadata = {
  title: "Lindapter Hollo-Bolt — Expansion Bolt for Structural Steel",
  description:
    "The Lindapter Hollo-Bolt is a high-strength expansion bolt for fixing to structural steel sections and hollow sections from one side. Hex, countersunk, and flush-fit heads. Stocked and shipped nationwide.",
};

export default function HolloBoltPage() {
  return (
    <>
      <CfNav />

      {/* HERO */}
      <section className="hb-hero">
        <div className="hb-hero-inner">
          <div className="hb-hero-text">
            <div className="hb-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/products">Products</Link>
              <span>/</span>
              Lindapter Hollo-Bolt
            </div>
            <div className="hb-eyebrow">Lindapter · Hollo-Bolt</div>
            <h1>
              A structural
              <br />
              expansion bolt
              <br />
              for <i>one-sided</i> access.
            </h1>
            <p className="hb-hero-sub">
              The Hollo-Bolt fixes to hollow and open steel sections from one side — no welding, no
              drilling a matching hole on the blind face. Stocked in five diameters, three head
              styles, and multiple finishes.
            </p>
            <div className="hb-hero-ctas">
              <Link href="/hollo-bolt-selector" className="cf-pill cf-pill--blue">
                Open the Selector →
              </Link>
              <a href="#quote" className="cf-link">
                Or request a quote ↓
              </a>
            </div>
            <div className="hb-hero-stats">
              <HeroStat val="5/16″–3/4″" label="Diameter range" />
              <HeroStat val="3" label="Head styles" />
              <HeroStat val="Cl. 8.8" label="Bolt grade" />
              <HeroStat val="24 hr" label="Quote turnaround" />
            </div>
          </div>
          <div className="hb-hero-visual">
            <div className="hb-hero-grid" />
            <div className="hb-hero-tag">Hex · Countersunk · Flush-fit</div>
            <div className="hb-hero-photo">
              <Image
                src="/assets/products/hollo-bolt-trio-hero.png"
                alt="Lindapter Hollo-Bolt hex, countersunk, and flush-fit expansion bolts"
                width={3481}
                height={2486}
                priority
                quality={95}
                sizes="(max-width: 1100px) 100vw, 700px"
              />
            </div>
            <div className="hb-hero-spec">
              <div>
                <b>DIA</b> &nbsp; 1/2″
              </div>
              <div>
                <b>GRP</b> &nbsp; 8.8 bolt
              </div>
              <div>
                <b>STD</b> &nbsp; ICC-ES ESR-3330
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="hb-props">
        <div className="hb-props-inner">
          <Property num="01" title="One-sided access" desc="Installs through a single clearance hole. Ideal for closed sections, beams, and places you can't reach the back of." />
          <Property num="02" title="High clamping load" desc="Grade 8.8 bolt torqued against a four-segment expansion sleeve — higher performance than most blind fasteners." />
          <Property num="03" title="Removable" desc="Can be unbolted and re-used, unlike welded studs or structural rivets — good for modules designed to come apart." />
          <Property num="04" title="ICC-ES approved" desc="Third-party evaluated under ICC-ES ESR-3330 for load, fire, and seismic applications in the US." />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hb-how">
        <div className="hb-how-inner">
          <div className="hb-how-header">
            <div className="eyebrow">How it works</div>
            <h2>
              Drill, insert, tighten, <i>done.</i>
            </h2>
            <p>
              A single clearance hole through both faces of the steel section. The Hollo-Bolt goes
              in, the bolt is torqued, and a four-segment sleeve expands behind the blind face to
              form a secure connection.
            </p>
          </div>
          <div className="hb-how-steps">
            <HowStep num="01 / DRILL" title="Drill a clearance hole." desc="One clean hole through both walls of the section, sized per the published fixture hole chart.">
              <DrillSvg />
            </HowStep>
            <HowStep num="02 / INSERT" title="Insert the Hollo-Bolt." desc="The assembly — bolt, sleeve, cone, and head — drops in as one piece. No back-side access required.">
              <InsertSvg />
            </HowStep>
            <HowStep num="03 / TORQUE" title="Tighten to spec." desc="Apply the specified torque. The cone draws up inside the sleeve, splaying its four segments against the blind face.">
              <TorqueSvg />
            </HowStep>
            <HowStep num="04 / CLAMPED" title="Secured both sides." desc="The fixture is clamped against the exposed face; the expanded sleeve holds it from behind. Removable, re-usable.">
              <ClampedSvg />
            </HowStep>
          </div>
        </div>
      </section>

      {/* HEAD STYLES */}
      <section className="hb-heads" id="range">
        <div className="hb-heads-inner">
          <div className="hb-heads-header">
            <div className="eyebrow">Head styles</div>
            <h2>
              Three heads, <i>one system.</i>
            </h2>
            <p>
              All three share the same expansion body — choose the head that suits your fixture. Hex
              for general structural work, countersunk where a flush finish matters, flush-fit for a
              recessed pocket.
            </p>
          </div>
          <div className="hb-heads-grid">
            <HeadCard
              pnum="HB / STANDARD"
              title="Hex head"
              desc="The standard Hollo-Bolt. Hex head with captive washer, installed with a standard wrench or socket. Specified on most structural connections."
              spec="HB · Cl. 8.8 · 5/16″ → 3/4″"
              phLabel="Hex head"
              img="/assets/products/hollo-bolt-hex-head-2.png"
              imgAlt="Lindapter Hollo-Bolt hex head expansion bolt"
            />
            <HeadCard
              pnum="HBCSK / COUNTERSUNK"
              title="Countersunk"
              desc="Flat, 82° countersunk head with internal hex drive. Sits flush with the fixture face for applications where a low profile is required."
              spec="HBCSK · Cl. 8.8 · 5/16″ → 3/4″"
              phLabel="Countersunk"
              img="/assets/products/hollo-bolt-countersunk-2.png"
              imgAlt="Lindapter Hollo-Bolt countersunk head expansion bolt"
            />
            <HeadCard
              pnum="HBFF / FLUSH-FIT"
              title="Flush-fit"
              desc="Recessed head that sits below the face of the steel when installed in a counterbored pocket. Clean appearance for exposed architectural work."
              spec="HBFF · Cl. 8.8 · 3/8″ → 3/4″"
              phLabel="Flush-fit"
              img="/assets/products/hollo-bolt-flush-fit-2.png"
              imgAlt="Lindapter Hollo-Bolt flush-fit head expansion bolt"
            />
          </div>
        </div>
      </section>

      {/* SIZES */}
      <section className="hb-sizes">
        <div className="hb-sizes-inner">
          <div className="hb-sizes-text">
            <div className="eyebrow">Diameters</div>
            <h2>
              Five diameters, <i>imperial &amp; metric.</i>
            </h2>
            <p>
              The Hollo-Bolt is stocked in five imperial diameters with metric equivalents on
              request. Each diameter is offered across all three head styles and the full range of
              finishes.
            </p>
            <div className="hb-sizes-table">
              <SizeRow size="5/16″" desc="Light gauge · brackets" metric="M8 eq." />
              <SizeRow size="3/8″" desc="General structural" metric="M10 eq." />
              <SizeRow size="1/2″" desc="Beam & column splices" metric="M12 eq." />
              <SizeRow size="5/8″" desc="Heavy structural" metric="M16 eq." />
              <SizeRow size="3/4″" desc="High-load connections" metric="M20 eq." />
            </div>
          </div>
          <div className="hb-sizes-photo">
            <span className="tag">Every diameter</span>
            <div className="hb-sizes-ph">
              [ Hollo-Bolt diameter range
              <br />
              5/16″ → 3/4″ ]
            </div>
          </div>
        </div>
      </section>

      {/* SELECTOR CTA */}
      <section className="hb-specs" style={{ paddingBottom: 0 }}>
        <div className="hb-specs-inner">
          <Link href="/hollo-bolt-selector" className="hb-selector-cta">
            <div className="hb-selector-cta-text">
              <div className="hb-selector-cta-eyebrow">Configure &amp; quote</div>
              <h3>
                Use the <i>Hollo-Bolt Selector</i> to spec your connection.
              </h3>
              <p>
                Pick head type, diameter, finish, and fixing thickness. We&apos;ll match the right
                SKU, show published load data, and build a quote cart you can send to our desk.
              </p>
              <span className="cf-pill cf-pill--blue">Open the Selector →</span>
            </div>
            <div className="hb-selector-cta-summary">
              <div className="label">Filters</div>
              <div className="row">
                HEAD &nbsp; <span>Hex / Countersunk / Flush-fit</span>
              </div>
              <div className="row">
                DIA &nbsp;&nbsp; <span>5/16″ → 3/4″</span>
              </div>
              <div className="row">
                FIN &nbsp;&nbsp; <span>ZN / HDG / Sheraplex / SS316</span>
              </div>
              <div className="row">
                GRIP &nbsp; <span>Outer + inner ply</span>
              </div>
              <div className="footer">→ Load data, SKU, quote cart</div>
            </div>
          </Link>
        </div>
      </section>

      {/* SPEC TABLE */}
      <section className="hb-specs">
        <div className="hb-specs-inner">
          <div className="hb-specs-header">
            <div>
              <div className="eyebrow">Performance data</div>
              <h2>
                Published <i>load capacity.</i>
              </h2>
            </div>
            <p>
              Indicative working and ultimate load values per diameter, based on the manufacturer&apos;s
              published test data for a grade 8.8 bolt into structural steel. Confirm
              application-specific values against the current Lindapter technical datasheet and
              ICC-ES ESR-3330.
            </p>
          </div>
          <div className="hb-spec-table">
            <div className="hb-spec-grid">
              <div className="hb-spec-h">Size</div>
              <div className="hb-spec-h">Bolt dia</div>
              <div className="hb-spec-h">Fixture hole</div>
              <div className="hb-spec-h">Install torque</div>
              <div className="hb-spec-h">Tension (wkg.)</div>
              <div className="hb-spec-h">Shear (wkg.)</div>

              <SpecRow size="HB08" cells={["5/16″", "13 mm", "20 ft·lb", "1,800 lbf", "2,400 lbf"]} />
              <SpecRow size="HB10" cells={["3/8″", "16 mm", "40 ft·lb", "2,700 lbf", "3,600 lbf"]} />
              <SpecRow size="HB12" cells={["1/2″", "20 mm", "70 ft·lb", "4,400 lbf", "5,800 lbf"]} />
              <SpecRow size="HB16" cells={["5/8″", "24 mm", "140 ft·lb", "7,800 lbf", "10,500 lbf"]} />
              <SpecRow size="HB20" cells={["3/4″", "30 mm", "280 ft·lb", "12,800 lbf", "16,800 lbf"]} />
            </div>
            <div className="hb-spec-foot">
              Values shown are representative only. Final design values must be taken from the
              current Lindapter technical datasheet and the ICC-ES ESR-3330 evaluation report.
              Substrate condition, edge distance, spacing, and fire/seismic requirements affect
              allowable load.
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="hb-case">
        <div className="hb-case-inner">
          <div className="hb-case-photo">
            <div className="hb-case-ph">[ St Pancras Station — Barlow Shed refurbishment photo ]</div>
            <div className="ov" />
            <span className="hb-case-photo-tag">Case study</span>
            <div className="hb-case-photo-caption">
              <b>St Pancras International Station</b>
              London · Barlow Shed refurbishment
            </div>
          </div>
          <div className="hb-case-body">
            <div>
              <div className="eyebrow">Case study</div>
              <h2>
                Fixing into heritage structural <i>steel.</i>
              </h2>
            </div>
            <div>
              <p>
                During the refurbishment of the Barlow Shed train shed, a large quantity of
                connections had to be made into existing structural steel without drilling from the
                far face or welding to heritage members.
              </p>
              <p>
                Hollo-Bolts were specified for new walkway and service fixings across the structure.
                The one-sided installation kept the original steel untouched on the hidden face,
                while the published ICC-ES data satisfied the structural engineer&apos;s load
                calculations.
              </p>
              <div className="hb-case-metrics">
                <CaseMetric v="10,000+" l="Hollo-Bolts installed" />
                <CaseMetric v="Zero" l="Welds to heritage steel" />
                <CaseMetric v="HDG" l="Finish specified" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="hb-apps">
        <div className="hb-apps-inner">
          <div className="hb-apps-header">
            <div className="eyebrow">Where they&apos;re specified</div>
            <h2>
              Common <i>applications.</i>
            </h2>
            <p>
              Anywhere the back side of a beam, column, or tube section isn&apos;t accessible — and
              welding isn&apos;t acceptable.
            </p>
          </div>
          <div className="hb-apps-grid">
            <Link href="/structural-fasteners" className="hb-app-tile hb-app-tile--steel">
              <div className="hb-app-tile-bg" />
              <div className="hb-app-tile-body">
                <div className="hb-app-tile-eyebrow">01 — Structural steel</div>
                <div className="hb-app-tile-title">HSS, beams &amp; columns.</div>
                <div className="hb-app-tile-desc">
                  Secondary steel, walkway brackets, and fixture attachments on closed sections
                  where the back face is inaccessible.
                </div>
              </div>
            </Link>
            <Link href="/industries/infrastructure" className="hb-app-tile hb-app-tile--offshore">
              <div className="hb-app-tile-bg" />
              <div className="hb-app-tile-body">
                <div className="hb-app-tile-eyebrow">02 — Infrastructure</div>
                <div className="hb-app-tile-title">Bridges, transit &amp; platforms.</div>
                <div className="hb-app-tile-desc">
                  Retrofits and refurbishments where welding to existing members is restricted —
                  stations, bridges, tunnels.
                </div>
              </div>
            </Link>
            <Link href="/industries/manufacturing" className="hb-app-tile hb-app-tile--mod">
              <div className="hb-app-tile-bg" />
              <div className="hb-app-tile-body">
                <div className="hb-app-tile-eyebrow">03 — Modular &amp; plant</div>
                <div className="hb-app-tile-title">Modules, racks &amp; skids.</div>
                <div className="hb-app-tile-desc">
                  Fabricated skids, process modules, and plant racks that may need to be
                  disassembled for transport or service.
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FINISHES */}
      <section className="hb-finish">
        <div className="hb-finish-inner">
          <div className="hb-finish-text">
            <div className="eyebrow">Finishes</div>
            <h2>
              Matched to the <i>environment.</i>
            </h2>
            <p>
              Hollo-Bolts are supplied in four finishes covering most interior and exterior steel
              work. We&apos;ll help match the finish to the service environment — saltwater, buried,
              coated, or exposed.
            </p>
            <div className="hb-finish-list">
              <FinishItem swatch="hb-finish-sw--zinc" title="Zinc electroplated" desc="Indoor and dry service. Cost-effective general-purpose finish." code="ZN" />
              <FinishItem swatch="hb-finish-sw--hdg" title="Hot-dip galvanized" desc="Outdoor and atmospheric service. Standard on most structural work." code="HDG" />
              <FinishItem swatch="hb-finish-sw--sherardized" title="Sherardized" desc="Diffusion-bonded zinc for threaded parts; tight tolerance protection." code="SH" />
              <FinishItem swatch="hb-finish-sw--ss" title="316 Stainless" desc="Marine, chemical, and food-process environments. Non-magnetic." code="SS316" />
            </div>
          </div>
          <div className="hb-finish-visual">
            <div className="hb-finish-visual-ph">
              [ Every finish badge —
              <br />
              ZN · HDG · SH · SS316 ]
            </div>
          </div>
        </div>
      </section>

      {/* INVENTORY BAND */}
      <section className="hb-inventory">
        <div className="hb-inventory-inner">
          <div className="hb-inventory-text">
            <div className="eyebrow">Inventory &amp; availability</div>
            <h2>
              Stocked and ready
              <br />
              to <i>ship.</i>
            </h2>
            <p>
              We carry an inventory of Lindapter Hollo-Bolts across the most-called diameters,
              heads, and finishes. Less common combinations ship direct from Lindapter on short
              lead times.
            </p>
            <div className="hb-inventory-ctas">
              <a href="#quote" className="cf-pill cf-pill--hb-soft">
                Check availability
              </a>
              <a href="tel:7077413277" className="cf-pill cf-pill--ghost-dark">
                707.741.3277
              </a>
            </div>
          </div>
          <div className="hb-inventory-visual" aria-hidden="true">
            <div className="hb-inv-grid">
              <InvRow code="HB10" desc="Hex · 3/8″ × std · HDG" qty="1,400" />
              <InvRow code="HB12" desc="Hex · 1/2″ × std · HDG" qty="2,200" />
              <InvRow code="HB12" desc="Countersunk · 1/2″ · ZN" qty="640" />
              <InvRow code="HB16" desc="Hex · 5/8″ × std · HDG" qty="1,100" />
              <InvRow code="HB16" desc="Flush-fit · 5/8″ · SS316" qty="180" />
              <InvRow code="HB20" desc="Hex · 3/4″ × std · HDG" qty="420" />
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="hb-quote-section" id="quote" style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div className="eyebrow" style={{ fontSize: 13, color: "var(--hb-accent-deep)", fontWeight: 500, marginBottom: 14, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Request a quote
            </div>
            <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 18 }}>
              Tell us what you <i style={{ color: "var(--hb-accent)" }}>need.</i>
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.55, maxWidth: 420, marginBottom: 22 }}>
              Head style, diameter, finish, and quantity — or paste the line items from your BOM.
              Most quotes turn around within 24 hours.
            </p>
            <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.55, maxWidth: 420, marginBottom: 22 }}>
              Unsure which diameter fits your load case? Our team can walk you through the published
              capacity tables and fixture-hole chart.
            </p>
            <div style={{ paddingTop: 20, borderTop: "1px solid var(--rule-soft)", fontSize: 13, color: "var(--mid)", lineHeight: 1.8 }}>
              Talk to a person
              <b style={{ display: "block", color: "var(--ink)", fontWeight: 500, fontSize: 14, marginTop: 4 }}>707.741.3277</b>
              <b style={{ display: "block", color: "var(--ink)", fontWeight: 500, fontSize: 14 }}>sales@californiafastener.com</b>
            </div>
          </div>
          <QuoteFormPlaceholder
            textareaLabel="Hollo-Bolts needed"
            textareaPlaceholder="Diameter, head style, finish, quantity, need-by date — or paste a BOM line item."
          />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="hb-cta-band" style={{ padding: "120px 40px", background: "var(--dark-1)", color: "var(--dark-text)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(28,82,163,0.22), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 100%, rgba(95,168,255,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, color: "var(--hb-accent-soft)", fontWeight: 500, marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Get in touch
          </div>
          <h2 style={{ fontSize: "clamp(44px, 5.5vw, 80px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, marginBottom: 22 }}>
            Ready when <i style={{ color: "var(--hb-accent)" }}>you are.</i>
          </h2>
          <p style={{ fontSize: 20, color: "var(--dark-mid)", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.4 }}>
            Send us the diameter, head, and finish — or just the line item from your BOM. We&apos;ll
            get a quote back, usually within 24 hours.
          </p>
          <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#quote" className="cf-pill cf-pill--blue">
              Request a Quote
            </a>
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
      <div className="hb-hero-stat-val">{val}</div>
      <div className="hb-hero-stat-label">{label}</div>
    </div>
  );
}

function Property({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="hb-prop">
      <div className="pn">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function HowStep({
  num,
  title,
  desc,
  children,
}: {
  num: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="hb-how-step">
      <div className="hb-how-svg-box">{children}</div>
      <div className="hb-how-step-num">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function HeadCard({
  pnum,
  title,
  desc,
  spec,
  phLabel,
  img,
  imgAlt,
}: {
  pnum: string;
  title: string;
  desc: string;
  spec: string;
  phLabel: string;
  img?: string;
  imgAlt?: string;
}) {
  return (
    <div className="hb-head-card">
      <div className="hb-head-photo">
        <span className="pnum">{pnum}</span>
        {img ? (
          <Image src={img} alt={imgAlt ?? ""} fill sizes="(max-width: 900px) 100vw, 360px" />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(14,20,24,0.5)", fontFamily: "var(--cf-font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center", padding: 24, zIndex: 1 }}>
            [ {phLabel} product photo ]
          </div>
        )}
      </div>
      <div className="hb-head-body">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="hb-head-spec">{spec}</div>
      </div>
    </div>
  );
}

function SizeRow({ size, desc, metric }: { size: string; desc: string; metric: string }) {
  return (
    <div className="hb-sizes-row">
      <b>{size}</b>
      <span>{desc}</span>
      <em>{metric}</em>
    </div>
  );
}

function SpecRow({ size, cells }: { size: string; cells: string[] }) {
  return (
    <>
      <div className="hb-spec-size">{size}</div>
      {cells.map((c, i) => (
        <div key={i} className="hb-spec-val">
          {c}
        </div>
      ))}
    </>
  );
}

function CaseMetric({ v, l }: { v: string; l: string }) {
  return (
    <div className="hb-case-metric">
      <div className="v">{v}</div>
      <div className="l">{l}</div>
    </div>
  );
}

function FinishItem({
  swatch,
  title,
  desc,
  code,
}: {
  swatch: string;
  title: string;
  desc: string;
  code: string;
}) {
  return (
    <div className="hb-finish-item">
      <div className={`hb-finish-sw ${swatch}`} />
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
      <em>{code}</em>
    </div>
  );
}

function InvRow({ code, desc, qty }: { code: string; desc: string; qty: string }) {
  return (
    <div className="hb-inv-row">
      <b>{code}</b>
      <span>{desc}</span>
      <span className="qty">{qty}</span>
      <span className="stk">IN STOCK</span>
    </div>
  );
}

/* ── Diagram SVGs ──────────────────────────────────── */

function DrillSvg() {
  return (
    <svg className="hb-diagram" viewBox="0 0 120 120">
      <rect x="18" y="30" width="84" height="60" rx="2" className="hb-d-steel" />
      <rect x="18" y="30" width="84" height="8" className="hb-d-steel-dark" />
      <rect x="18" y="82" width="84" height="8" className="hb-d-steel-dark" />
      <rect x="57" y="8" width="6" height="36" fill="#888" />
      <polygon points="54,40 66,40 60,56" fill="#444" />
      <line x1="60" y1="42" x2="60" y2="92" className="hb-d-dim" />
    </svg>
  );
}

function InsertSvg() {
  return (
    <svg className="hb-diagram" viewBox="0 0 120 120">
      <rect x="18" y="30" width="84" height="60" rx="2" className="hb-d-steel" />
      <rect x="18" y="30" width="84" height="8" className="hb-d-steel-dark" />
      <rect x="18" y="82" width="84" height="8" className="hb-d-steel-dark" />
      <rect x="55" y="18" width="10" height="8" className="hb-d-bolt" />
      <polygon points="48,26 72,26 70,34 50,34" className="hb-d-bolt" />
      <rect x="54" y="34" width="12" height="56" className="hb-d-bolt" />
      <line x1="60" y1="40" x2="60" y2="90" stroke="#5A6976" strokeWidth="0.8" />
      <polygon points="56,88 64,88 62,94 58,94" className="hb-d-bolt-dark" />
    </svg>
  );
}

function TorqueSvg() {
  return (
    <svg className="hb-diagram" viewBox="0 0 120 120">
      <rect x="18" y="30" width="84" height="60" rx="2" className="hb-d-steel" />
      <rect x="18" y="30" width="84" height="8" className="hb-d-steel-dark" />
      <rect x="18" y="82" width="84" height="8" className="hb-d-steel-dark" />
      <path d="M 38 20 A 22 22 0 1 1 82 20" className="hb-d-line" />
      <polygon points="78,16 86,18 82,26" className="hb-d-accent" />
      <polygon points="50,14 70,14 74,22 70,30 50,30 46,22" className="hb-d-bolt" />
      <rect x="54" y="30" width="12" height="56" className="hb-d-bolt" />
      <polygon points="50,86 70,86 66,96 54,96" className="hb-d-bolt-dark" />
      <line x1="60" y1="86" x2="60" y2="96" stroke="#2A3742" strokeWidth="0.8" />
    </svg>
  );
}

function ClampedSvg() {
  return (
    <svg className="hb-diagram" viewBox="0 0 120 120">
      <rect x="18" y="30" width="84" height="60" rx="2" className="hb-d-steel" />
      <rect x="18" y="30" width="84" height="8" className="hb-d-steel-dark" />
      <rect x="18" y="82" width="84" height="8" className="hb-d-steel-dark" />
      <polygon points="50,14 70,14 74,22 70,30 50,30 46,22" className="hb-d-bolt" />
      <rect x="54" y="30" width="12" height="56" className="hb-d-bolt" />
      <polygon points="48,86 72,86 66,100 54,100" className="hb-d-bolt-dark" />
      <rect x="30" y="28" width="60" height="4" fill="#1C52A3" />
      <line x1="40" y1="20" x2="40" y2="28" className="hb-d-line" />
      <polygon points="37,26 43,26 40,32" className="hb-d-accent" />
      <line x1="80" y1="20" x2="80" y2="28" className="hb-d-line" />
      <polygon points="77,26 83,26 80,32" className="hb-d-accent" />
    </svg>
  );
}
