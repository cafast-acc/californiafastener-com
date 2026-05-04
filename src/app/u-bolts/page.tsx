import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-product-page.css";
import "@/styles/cf-u-bolts.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { QuoteFormPlaceholder } from "@/components/QuoteFormPlaceholder";

export const metadata: Metadata = {
  title: "U-Bolts — Round, Square, Long Tangent & Custom Profiles",
  description:
    "Standard and custom U-bolts for pipe, conduit, and structural support. Round and square bend, long-tangent, V-bolts, and made-to-print profiles. Carbon, alloy, 304, 316, hot-dip galvanized.",
};

export default function UBoltsPage() {
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
              U-Bolts
            </div>
            <div className="pp-eyebrow">U-Bolts</div>
            <h1>
              Two threads.
              <br />
              One <i>bend.</i>
              <br />
              Infinite shapes.
            </h1>
            <p className="pp-hero-sub">
              Round-bend, square-bend, long-tangent, and made-to-print U-bolts for pipe, conduit,
              exhaust, structural support, and equipment clamping. Carbon, alloy, 304, 316, hot-dip
              galvanized — stocked deep, bent in-house when stock won&apos;t fit.
            </p>
            <div className="pp-hero-ctas">
              <Link href="/quote" className="cf-pill cf-pill--blue">
                Request a Quote
              </Link>
              <a href="#products" className="cf-link">
                View profiles ↓
              </a>
            </div>
            <div className="pp-hero-stats">
              <HeroStat val="¼″–2½″" label="Stock diameters" />
              <HeroStat val="A36" label="A193 · F593 · 316" />
              <HeroStat val="HDG" label="Plain · zinc · stainless" />
              <HeroStat val="∞" label="Made-to-print profiles" />
            </div>
          </div>
          <div className="pp-hero-image">
            <div className="pp-hero-image-tag">Round-bend · 304 SS · 2″ NPS</div>
            <UBoltHeroSvg />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="pp-intro">
        <div className="pp-intro-inner">
          <div className="pp-intro-lead">
            <h2>
              The fastener that
              <br />
              wraps <i>around</i> something.
            </h2>
          </div>
          <div className="pp-intro-body">
            <p>
              A U-bolt is the simplest custom part on the truck — round bar, threaded both ends,
              bent into a U. The simplicity is the trick: change the diameter, the inside dimension,
              the bend radius, the leg length, or the profile, and you have a different part number
              every time.
            </p>
            <p>
              We stock the most common round-bend and square-bend sizes, and we bend the rest
              in-house from B7, A36, 304, and 316 stock. Send the pipe size and the application;
              we&apos;ll come back with a part to print.
              <em>
                Beam clamps and girder clamps are a different family — see Lindapter Hollo-Bolt.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="pp-products" id="products">
        <div className="pp-products-header">
          <div className="eyebrow">Profiles we run</div>
          <h2>
            Six bend profiles.
            <br />
            <i>One supplier.</i>
          </h2>
          <p>
            The standard catalog runs round-bend over square-bend, plus the long-tangent and V-bend
            variants the hangers and exhaust shops keep specifying.
          </p>
        </div>
        <div className="pp-products-grid">
          <ShapeCard
            pnum="01 / Round bend"
            shape={<RoundBend />}
            title="Round-bend U-bolt"
            desc="The default profile — semicircular bend that wraps a round pipe with no point loads. Pipe support, conduit, automotive exhaust, suspension."
            metaBold="Pipe NPS · OD-spec"
            metaRest=" · ¼″–2½″ rod"
          />
          <ShapeCard
            pnum="02 / Square bend"
            shape={<SquareBend />}
            title="Square-bend U-bolt"
            desc="Two 90° bends — for clamping square tube, channel, structural sections, and U-channel framing. Spec by inside dimensions, not pipe size."
            metaBold="ID-spec"
            metaRest=" · square & rectangular tube"
          />
          <ShapeCard
            pnum="03 / Long tangent"
            shape={<LongTangent />}
            title="Long-tangent U-bolt"
            desc="Round bend with extended thread length on the legs — for stacked saddles, multiple plates, insulated pipe, or where a longer reach is needed."
            metaBold="Custom leg length"
            metaRest=" · per drawing"
          />
          <ShapeCard
            pnum="04 / V-bolt"
            shape={<VBolt />}
            title="V-bend U-bolt"
            desc="Two-sided V profile that grips angle iron and tapered geometry. Common on guy-wire anchorages and angle-bracket assemblies."
            metaBold="Angle clamping"
            metaRest=" · grip stock per spec"
          />
          <ShapeCard
            pnum="05 / Muffler / exhaust"
            shape={<Muffler />}
            title="Muffler U-bolt"
            desc="Round-bend U-bolt with saddle clamp included — used on automotive and OEM exhaust, light-duty pipe joining, repair clamps."
            metaBold="U-bolt + saddle"
            metaRest=" · sold as set"
          />
          <ShapeCard
            pnum="06 / Made-to-print"
            shape={<MadeToPrint />}
            title="Made-to-print U-bolts"
            desc="Compound bends, oversized diameters, exotic material, weather-resistant coatings. If it can be drawn, we can quote it."
            metaBold="Quote-basis"
            metaRest=" · send a sketch or DXF"
          />
        </div>
      </section>

      {/* SIZING / GEOMETRY */}
      <section className="ub-sizing">
        <div className="ub-sizing-inner">
          <div className="ub-sizing-text">
            <div className="eyebrow">How to size a U-bolt</div>
            <h2>
              Five dimensions.
              <br />
              That&apos;s the <i>part.</i>
            </h2>
            <p>
              U-bolts get drawn five different ways depending on the trade. We need the same five
              measurements either way — give us these and we can pull stock or quote a bend.
            </p>
            <ul className="ub-sizing-attrs">
              <li>
                <b>D</b>
                <span>Rod diameter — ¼″, 5/16″, 3/8″, ½″, 5/8″, ¾″, 1″, up to 2½″.</span>
              </li>
              <li>
                <b>A</b>
                <span>Inside dimension between legs — for round bends, this is the pipe OD plus clearance.</span>
              </li>
              <li>
                <b>L</b>
                <span>Total leg length below bend tangent. Drives thread length and reach.</span>
              </li>
              <li>
                <b>T</b>
                <span>Thread length on each leg — usually 2× nut height plus saddle stack-up.</span>
              </li>
              <li>
                <b>R</b>
                <span>Bend radius (round) or inside radius at the corner (square). Default = 1.5× D.</span>
              </li>
            </ul>
          </div>
          <div className="ub-sizing-diagram">
            <SizingDiagram />
          </div>
        </div>
      </section>

      {/* GRADES */}
      <section className="pp-grades" id="grades">
        <div className="pp-grades-inner">
          <div className="pp-grades-header">
            <h2>
              Grades and specs,
              <br />
              grouped by <i>family.</i>
            </h2>
            <p>
              Most U-bolts ship in mild-carbon A36 round bar with rolled or cut threads. When the
              spec needs more — strength, corrosion, or temperature — we work in the same grades we
              run for studs and rod.
            </p>
          </div>

          <div className="pp-family">
            <div className="pp-family-label">
              <div className="num">Family 01</div>
              <h3>Carbon &amp; alloy</h3>
              <p>Mild and quenched-and-tempered carbon steel for general support, automotive, and machinery.</p>
            </div>
            <div className="pp-family-cards">
              <SpecCard tag="ASTM A36" name="Mild carbon" grades={["36 ksi", "Weldable"]}>
                The default U-bolt material — soft enough to bend cold without cracking, strong
                enough for the bulk of pipe support and clamping work. Plain, electro-zinc, or
                hot-dip galvanized.
              </SpecCard>
              <SpecCard tag="ASTM A307" name="Grade A · B" grades={["Grade A", "Grade B"]}>
                Low-carbon steel for general bolting service. Common on muffler U-bolts and OEM
                exhaust hardware. A307-B for moderate-load, moderate-temperature joints.
              </SpecCard>
              <SpecCard tag="SAE J429" name="Grade 5 · 8" grades={["Heat-treated", "Q & T"]}>
                Heat-treated U-bolts in SAE J429 Grade 5 and Grade 8 for higher-load, dynamic, or
                vibration-prone clamping — automotive suspension, leaf-spring, equipment mounts.
              </SpecCard>
            </div>
          </div>

          <div className="pp-family">
            <div className="pp-family-label">
              <div className="num">Family 02</div>
              <h3>Stainless steel</h3>
              <p>304 and 316 austenitic for chemical, food, marine, and outdoor architectural service. The default in coastal, sanitary, and process pipe support.</p>
            </div>
            <div className="pp-family-cards">
              <SpecCard tag="ASTM F593" name="18-8 (304)" grades={["Group 1", "304/305"]}>
                304 stainless U-bolts for outdoor, food, and pharma pipe support. Bends cleanly
                cold; threads roll well; passivated finish.
              </SpecCard>
              <SpecCard tag="ASTM F593" name="316" grades={["Group 2", "316/316L"]}>
                316 stainless for chloride-bearing service — coastal, marine, chemical, pulp &amp;
                paper, wastewater. The default upgrade when 304 surface-rusts.
              </SpecCard>
              <SpecCard tag="ASTM A193" name="Grade B8 · B8M" grades={["304 SS", "316 SS"]}>
                Stainless to A193 when the project requires the pressure-piping standard — even on a
                U-bolt. B8 for general stainless service; B8M for chloride and acid resistance.
              </SpecCard>
            </div>
          </div>

          <div className="pp-family">
            <div className="pp-family-label">
              <div className="num">Family 03</div>
              <h3>High-temp &amp; pressure</h3>
              <p>Alloy U-bolts for hot-pipe support and process plant pipe-rack hardware. Less common but spec&apos;d by name on refinery, power, and chemical work.</p>
            </div>
            <div className="pp-family-cards">
              <SpecCard tag="ASTM A193" name="Grade B7" grades={["4140 / 4142", "Q & T", "~900°F"]}>
                Chromium-molybdenum alloy U-bolts for hot pipe support and process pipe-rack
                clamping. Strong, but less ductile — bends are done at controlled temperature with
                post-bend stress relief.
              </SpecCard>
              <SpecCard tag="ASTM A320" name="Grade L7" grades={["4140 Q & T", "−150°F Charpy"]}>
                Low-temp alloy U-bolts for cold-side process — LNG, ammonia, refrigerated piping.
                Same chemistry as B7 with a Charpy impact requirement.
              </SpecCard>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM BENDS BAND */}
      <section className="ub-custom">
        <div className="ub-custom-inner">
          <div className="ub-custom-header">
            <div className="eyebrow">Custom bending</div>
            <h2>
              Stock won&apos;t always
              <br />
              fit. <i>That&apos;s fine.</i>
            </h2>
            <p>
              Most jobs end up with at least one made-to-print U-bolt — odd pipe size, structural
              section that won&apos;t take a stock bend, exotic material, or a profile we&apos;ve
              never seen. That&apos;s our day job.
            </p>
          </div>
          <div className="ub-custom-grid">
            <CustomCard
              ico={
                <svg viewBox="0 0 60 60">
                  <path d="M 8 52 L 8 28 A 22 22 0 0 1 52 28 L 52 52" />
                </svg>
              }
              title="Send a sketch"
              desc="A photo of the drawing on a clipboard, a DXF, a hand sketch with the five dimensions. Anything we can read into a CNC bender, we can run."
            />
            <CustomCard
              ico={
                <svg viewBox="0 0 60 60">
                  <path d="M 8 52 L 8 22 L 18 12 L 42 12 L 52 22 L 52 52" />
                </svg>
              }
              title="Compound profiles"
              desc="Z-bends, offset legs, asymmetric square bends, swedged legs, threaded inserts. We've made U-bolts with one welded foot and one nut — if it solves the joint, we'll quote it."
            />
            <CustomCard
              ico={
                <svg viewBox="0 0 60 60">
                  <path d="M 8 52 L 8 28 A 22 22 0 0 1 52 28 L 52 52" />
                  <line x1="20" y1="42" x2="40" y2="42" strokeDasharray="2 2" />
                </svg>
              }
              title="Saddles, plates, nuts"
              desc="U-bolts ship with whatever they pair with — formed saddles, hot-rolled plate clips, UV-resistant cushion liners, matched heavy hex or nylon-insert lock nuts."
            />
          </div>
        </div>
      </section>

      {/* COATINGS */}
      <section className="ub-coatings">
        <div className="ub-coatings-inner">
          <div className="ub-coatings-text">
            <div className="eyebrow">Coatings &amp; finishes</div>
            <h2>
              The <i>finish</i> outlasts
              <br />
              the bracket.
            </h2>
            <p>
              Most U-bolts live outdoors, in a roof-rack, or in a process-pipe environment. Pick the
              right finish up front — re-coating after install is rarely an option.
            </p>
          </div>
          <ul className="ub-coatings-list">
            <Coating
              title="Plain finish"
              spec="Default · oiled"
              desc="Uncoated, oiled, ships in mill condition. Fine for indoor or paint-over applications. Will surface-rust outdoors."
            />
            <Coating
              title="Electro-zinc plate"
              spec="ASTM B633 SC1 / SC3"
              desc="Bright zinc plate for indoor or light-duty outdoor service. Standard upgrade on muffler and HVAC U-bolts."
            />
            <Coating
              title="Hot-dip galvanized"
              spec="ASTM F2329 / A153"
              desc="Thick zinc layer for severe outdoor exposure. Standard on infrastructure and outdoor pipe-rack hardware. Nuts overtapped to fit."
            />
            <Coating
              title="Stainless 304 / 316"
              spec="F593 / A193 B8M"
              desc="The right answer when coating life is the limiting factor — coastal, marine, chemical, food / pharma. 316 for chloride."
            />
            <Coating
              title="Zinc / aluminum flake"
              spec="Geomet · Magni"
              desc="Inorganic zinc-rich topcoat applied as a dip-spin. Thin, even, embrittlement-friendly. Common on automotive, wind, and structural applications."
            />
            <Coating
              title="PTFE / Xylan"
              spec="Xylan 1424 / 1052"
              desc="Fluoropolymer topcoat — colored blue or gray — for chemical-process pipe support and refinery pipe-rack hardware. Galling and seizure resistance."
            />
          </ul>
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
              U-bolts solve &ldquo;wrap a fastener around something.&rdquo; If your project needs a
              different attachment method, start here instead.
            </p>
          </div>
          <div className="pp-cross-grid">
            <CrossLink href="/anchor-bolts" question="Foundation anchors, embed plates?" title="Anchor Bolts" spec="F1554 · A193 B7/B8/B8M · F593" />
            <CrossLink href="/stud-bolts-threaded-rod" question="Continuous threaded rod cut to length?" title="Stud Bolts & Threaded Rod" spec="B7 · B8 · B16 · A36 · F1554" />
            <CrossLink href="/hollo-bolt" question="Bolting onto a beam flange or HSS?" title="Lindapter Hollo-Bolt" spec="Beam clamps · blind expansion fasteners" />
            <CrossLink href="/industrial-fasteners" question="Heavy hex, socket cap, finished hardware?" title="Industrial Fasteners" spec="A193 · A574 · A194 · F436" />
            <CrossLink href="/stainless-steel-fasteners" question="Stainless-only, corrosion-driven spec?" title="Stainless Steel Fasteners" spec="304 · 316 · duplex · PH grades" />
            <CrossLink href="/cnc-machining" question="Custom geometry beyond a bend?" title="CNC Machining" spec="In-house · DFARS · AS9102" />
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="pp-quote pp-quote--alt">
        <div className="pp-quote-inner">
          <div className="pp-quote-text">
            <div className="eyebrow">Request a quote</div>
            <h2>
              Send the <i>five</i>
              <br />
              dimensions.
            </h2>
            <p>
              D, A, L, T, R — material, finish, quantity. A bolt specialist will come back with a
              quote, usually inside 24 hours. Or just send a sketch on the back of a napkin.
            </p>
            <div className="pp-quote-contact">
              Prefer to talk it through?
              <b>707.741.3277</b>
              <b>sales@californiafastener.com</b>
            </div>
          </div>
          <QuoteFormPlaceholder
            textareaLabel="U-bolt details"
            textareaPlaceholder="Profile (round / square / V), rod diameter, inside dimension, leg length, thread length, material, finish, quantity. Or attach a drawing."
          />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="pp-cta">
        <div className="pp-cta-inner">
          <div className="pp-cta-eyebrow">Talk to a bolt specialist</div>
          <h2>
            From the catalog
            <br />
            to the <i>napkin sketch.</i>
          </h2>
          <p>
            From a stock 1″ NPS 304 round-bend to a 1500-piece run of HDG square-bends with bonded
            saddle plates — we&apos;ve shipped the package before.
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

function ShapeCard({
  pnum,
  shape,
  title,
  desc,
  metaBold,
  metaRest,
}: {
  pnum: string;
  shape: React.ReactNode;
  title: string;
  desc: string;
  metaBold: string;
  metaRest: string;
}) {
  return (
    <div className="pp-product-card">
      <div className="ub-shape">
        <span className="pnum">{pnum}</span>
        {shape}
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

function SpecCard({
  tag,
  name,
  grades,
  children,
}: {
  tag: string;
  name: string;
  grades: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="pp-spec-card">
      <div className="pp-spec-tag">
        {tag}
        <span className="name">{name}</span>
        <ul className="pp-spec-grades">
          {grades.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
      <div className="pp-spec-body">
        <p>{children}</p>
      </div>
    </div>
  );
}

function CustomCard({
  ico,
  title,
  desc,
}: {
  ico: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="ub-custom-card">
      <div className="ico">{ico}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Coating({
  title,
  spec,
  desc,
}: {
  title: string;
  spec: string;
  desc: string;
}) {
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

/* ── SVG SHAPES ─────────────────────────────────────── */

function UBoltHeroSvg() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className="ub-hero-svg">
      <circle cx="200" cy="240" r="92" fill="#FFFFFF" stroke="#0B0B0D" strokeWidth="3" />
      <circle cx="200" cy="240" r="74" fill="none" stroke="#0B0B0D" strokeWidth="1.5" opacity="0.4" />
      <path d="M 110 360 L 110 240 A 90 90 0 0 1 290 240 L 290 360" fill="none" stroke="#0B0B0D" strokeWidth="14" strokeLinecap="round" />
      <path d="M 110 350 L 110 245 A 80 80 0 0 1 200 165" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <g stroke="#0B0B0D" strokeWidth="1.5" opacity="0.55">
        <line x1="98" y1="345" x2="122" y2="345" />
        <line x1="98" y1="357" x2="122" y2="357" />
        <line x1="98" y1="369" x2="122" y2="369" />
        <line x1="278" y1="345" x2="302" y2="345" />
        <line x1="278" y1="357" x2="302" y2="357" />
        <line x1="278" y1="369" x2="302" y2="369" />
      </g>
      <rect x="78" y="372" width="244" height="14" rx="3" fill="#FFFFFF" stroke="#0B0B0D" strokeWidth="3" />
      <g fill="#FFFFFF" stroke="#0B0B0D" strokeWidth="3">
        <polygon points="92,386 128,386 134,392 128,398 92,398 86,392" />
        <polygon points="272,386 308,386 314,392 308,398 272,398 266,392" />
      </g>
    </svg>
  );
}

function ThreadHash({ side }: { side: "left" | "right" }) {
  const x1 = side === "left" ? 32 : 152;
  const x2 = side === "left" ? 48 : 168;
  return (
    <g className="thread">
      <line x1={x1} y1="120" x2={x2} y2="120" />
      <line x1={x1} y1="130" x2={x2} y2="130" />
      <line x1={x1} y1="140" x2={x2} y2="140" />
    </g>
  );
}

function RoundBend() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <path d="M 40 150 L 40 80 A 60 60 0 0 1 160 80 L 160 150" />
      <ThreadHash side="left" />
      <ThreadHash side="right" />
    </svg>
  );
}

function SquareBend() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <path d="M 40 150 L 40 65 L 50 50 L 150 50 L 160 65 L 160 150" />
      <ThreadHash side="left" />
      <ThreadHash side="right" />
    </svg>
  );
}

function LongTangent() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <path d="M 40 150 L 40 70 A 50 50 0 0 1 160 70 L 160 150" />
      <g className="thread">
        <line x1="32" y1="115" x2="48" y2="115" />
        <line x1="32" y1="125" x2="48" y2="125" />
        <line x1="32" y1="135" x2="48" y2="135" />
        <line x1="32" y1="145" x2="48" y2="145" />
        <line x1="152" y1="115" x2="168" y2="115" />
        <line x1="152" y1="125" x2="168" y2="125" />
        <line x1="152" y1="135" x2="168" y2="135" />
        <line x1="152" y1="145" x2="168" y2="145" />
      </g>
    </svg>
  );
}

function VBolt() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <path d="M 40 150 L 40 80 L 100 50 L 160 80 L 160 150" />
      <ThreadHash side="left" />
      <ThreadHash side="right" />
    </svg>
  );
}

function Muffler() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <path d="M 40 150 L 40 90 A 60 60 0 0 1 160 90 L 160 150" />
      <rect x="60" y="100" width="80" height="20" rx="2" />
      <ThreadHash side="left" />
      <ThreadHash side="right" />
    </svg>
  );
}

function MadeToPrint() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <path d="M 40 150 L 40 100 L 60 80 L 80 95 L 100 60 L 120 95 L 140 80 L 160 100 L 160 150" />
      <g className="thread" strokeDasharray="3 3">
        <line x1="32" y1="120" x2="48" y2="120" />
        <line x1="32" y1="135" x2="48" y2="135" />
        <line x1="152" y1="120" x2="168" y2="120" />
        <line x1="152" y1="135" x2="168" y2="135" />
      </g>
    </svg>
  );
}

function SizingDiagram() {
  return (
    <svg viewBox="0 0 500 400" aria-hidden="true">
      <defs>
        <marker id="ub-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 z" fill="#1B5BA4" />
        </marker>
      </defs>
      <circle cx="250" cy="200" r="80" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M 150 380 L 150 200 A 100 100 0 0 1 350 200 L 350 380" fill="none" stroke="#0B0B0D" strokeWidth="10" strokeLinecap="round" />
      <line x1="120" y1="320" x2="180" y2="320" stroke="#1B5BA4" strokeWidth="1.5" markerEnd="url(#ub-arrow)" markerStart="url(#ub-arrow)" />
      <text x="100" y="324" fontFamily="var(--cf-font-mono)" fontSize="14" fill="#1B5BA4" fontWeight="600">D</text>
      <line x1="160" y1="190" x2="340" y2="190" stroke="#1B5BA4" strokeWidth="1.5" markerEnd="url(#ub-arrow)" markerStart="url(#ub-arrow)" />
      <text x="245" y="180" fontFamily="var(--cf-font-mono)" fontSize="14" fill="#1B5BA4" fontWeight="600">A</text>
      <line x1="380" y1="200" x2="380" y2="380" stroke="#1B5BA4" strokeWidth="1.5" markerEnd="url(#ub-arrow)" markerStart="url(#ub-arrow)" />
      <text x="390" y="294" fontFamily="var(--cf-font-mono)" fontSize="14" fill="#1B5BA4" fontWeight="600">L</text>
      <line x1="115" y1="320" x2="115" y2="380" stroke="#1B5BA4" strokeWidth="1.5" markerEnd="url(#ub-arrow)" markerStart="url(#ub-arrow)" />
      <text x="80" y="354" fontFamily="var(--cf-font-mono)" fontSize="14" fill="#1B5BA4" fontWeight="600">T</text>
      <line x1="250" y1="200" x2="320" y2="155" stroke="#1B5BA4" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="285" y="148" fontFamily="var(--cf-font-mono)" fontSize="14" fill="#1B5BA4" fontWeight="600">R</text>
      <g stroke="#0B0B0D" strokeWidth="1.5" opacity="0.55">
        <line x1="138" y1="332" x2="162" y2="332" />
        <line x1="138" y1="346" x2="162" y2="346" />
        <line x1="138" y1="360" x2="162" y2="360" />
        <line x1="338" y1="332" x2="362" y2="332" />
        <line x1="338" y1="346" x2="362" y2="346" />
        <line x1="338" y1="360" x2="362" y2="360" />
      </g>
    </svg>
  );
}
