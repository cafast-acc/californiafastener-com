import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "@/styles/cf-product-page.css";
import "@/styles/cf-stud-bolts.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { Img } from "@/components/Img";
import { QuoteFormPlaceholder } from "@/components/QuoteFormPlaceholder";

export const metadata: Metadata = {
  title: "Stud Bolts & Threaded Rod",
  description:
    "Stud bolts and threaded rod cut to length — A193 B7 / B8 / B8M / B16, A320 L7, A36, F1554, B7 acme. Plain, PTFE / Xylan, hot-dip galvanized, cad. Same-day shipping; full MTRs and PMI on request.",
};

export default function StudBoltsThreadedRodPage() {
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
              Stud Bolts &amp; Threaded Rod
            </div>
            <div className="pp-eyebrow">Stud Bolts &amp; Threaded Rod</div>
            <h1>
              Studs and rod,
              <br />
              cut to <i>length.</i>
            </h1>
            <p className="pp-hero-sub">
              Fully-threaded studs, double-end studs, and threaded rod for flanged piping, hanger
              systems, anchorage, and machinery assembly. Carbon, alloy, stainless, and exotics —
              cut, chamfered, marked, and shipped.
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
              <HeroStat val="A193" label="B7 / B16 / B8 / B8M" />
              <HeroStat val="A320" label="Gr L7 — low temp" />
              <HeroStat val="A194" label="2H / 7 / 8 / 8M nuts" />
              <HeroStat val="MTR" label="Full lot traceability" />
            </div>
          </div>
          <div className="pp-hero-image">
            <div className="pp-hero-image-tag">A193 B7 · Double-end stud · Heavy hex</div>
            <Image
              src="/assets/if-stamp-b8-rod.webp"
              alt="A193 B8 304 stainless threaded rod stamped CA B8"
              width={916}
              height={750}
              priority
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
            title="High-temperature"
            desc="A193 B7 and B16 — heat-treated chrome-moly stud bolts for ASME flange and pressure-vessel service up to ~1100°F."
          />
          <Property
            num="02"
            title="Low-temperature"
            desc="A320 L7 and L43 are Charpy-tested at −150°F for cryogenic and cold-weather service — LNG, ammonia, refrigeration."
          />
          <Property
            num="03"
            title="Cut to length"
            desc="Threaded rod cut, deburred, and chamfered both ends — from short tap-end studs up through 12 ft anchor rod."
          />
          <Property
            num="04"
            title="Coatings & finishes"
            desc="Plain, hot-dip galvanized, mech zinc, PTFE / Xylan, cad. MTRs, PMI, and lot traceability furnished on request."
          />
        </div>
      </section>

      {/* POSITIONING */}
      <section className="pp-intro">
        <div className="pp-intro-inner">
          <div className="pp-intro-lead">
            <h2>
              Studs hold the <i>flange.</i>
              <br />
              Rod runs the <i>job.</i>
            </h2>
          </div>
          <div className="pp-intro-body">
            <p>
              Stud bolts and threaded rod are the long, fully-threaded fastener forms — used
              wherever a hex bolt would run out of grip length, where you need to grab a nut on each
              end, or where you&apos;d rather buy stock and cut to size on the job.
            </p>
            <p>
              The bulk of what we ship in this category is ASTM A193 stud bolts for flanged piping
              (B7, B8, B8M, B16) and threaded rod in everything from A36 mild steel up through 316
              stainless. Both cut to length, chamfered, head-stamped, and matched with their nuts.
              <em>
                Looking for foundation anchor rod with a hooked or headed end? See F1554 anchor
                bolts.
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
            Six product forms.
            <br />
            <i>Cut to length.</i>
          </h2>
          <p>
            Stocked in random and 12-foot lengths — cut, chamfered, marked, and shipped with
            matching nuts where the spec calls for them.
          </p>
        </div>
        <div className="pp-products-grid">
          <ProductCard
            pnum="01 / Stud bolt"
            img="/assets/stud-bolt.png"
            imgAlt="A193 B7 / B8 stud bolt"
            title="Flange stud bolts"
            desc="Fully-threaded, chamfered both ends, marked per ASME B16.5. The default flange-bolt form for ASME pressure piping."
            metaBold="A193 B7 · B16 · B8 · B8M"
            metaRest=" · A320 L7 · A453"
          />
          <ProductCard
            pnum="02 / Double-end"
            img="/assets/dbl-end-stud.png"
            imgAlt="Double-end stud with tap-end and nut-end"
            title="Double-end studs"
            desc="Threaded ends with an unthreaded body — tap-end and nut-end variants for blind-tapped flanges, valve bonnets, and machinery joints."
            metaBold="A193 B7 · B16"
            metaRest=" · custom thread length"
          />
          <ProductCard
            pnum="03 / Threaded rod"
            img="/assets/full-thrd-rod.png"
            imgAlt="Continuous fully threaded rod"
            title="Continuous threaded rod"
            desc="12-foot stock rod, fully threaded, in carbon, alloy, and stainless. Cut to any length on saws or with our shear; chamfered ends."
            metaBold="A36 · B7 · B8 · F1554"
            metaRest=" · UNC, UNF, metric"
          />
          <ProductCard
            pnum="04 / Acme rod"
            img="/assets/acme-thrd-rod.png"
            imgAlt="Acme threaded rod with trapezoidal threads"
            title="Acme threaded rod"
            desc="Trapezoidal-thread rod for jacks, screw conveyors, lead screws, vise spindles. Right-hand and left-hand thread, in C1018 and 304."
            metaBold="2G · 2C · 2E classes"
            metaRest=' · 1/4″ – 4″'
          />
          <ProductCard
            pnum="05 / Stud kits"
            img="/assets/stud-kit.png"
            imgAlt="Stud bolt assembly kit with heavy hex nuts"
            title="Stud bolt assemblies"
            desc="Joint-ready kits — studs, two A194 heavy hex nuts, and F436 washers per joint, bagged and banded by line item. Pull a flange off the trailer, grab a bag, make the joint."
            metaBold="A193 + A194 + F436"
            metaRest=" · per-joint bag · BOM-matched"
          />
          <ProductCard
            pnum="06 / CNC machined"
            img="/assets/custom-stud.png"
            imgAlt="Custom CNC machined stud with reduced shank"
            title="Custom CNC machined"
            desc="Specials cut to print on our in-house CNC — shoulder studs, stepped studs, drilled or cross-bored rod, custom thread reliefs, reduced shanks. Prototype runs to scheduled production."
            metaBold="To print · DFARS · AS9102"
            metaRest=" · carbon, alloy, SS, exotics"
          />
        </div>
      </section>

      {/* STUD VS ROD COMPARISON */}
      <section className="st-compare">
        <div className="st-compare-inner">
          <div className="st-compare-header">
            <div className="eyebrow">Stud bolt vs threaded rod</div>
            <h2>
              What&apos;s the <i>difference</i>
              <br />
              between a stud and rod?
            </h2>
            <p>
              Same shape on the bench. Different intent on the drawing. The distinction shows up in
              the chamfer, the marking, the length tolerance, and how it ships.
            </p>
          </div>
          <div className="st-compare-grid">
            <CompareCard
              num="Form A"
              title="Stud bolt"
              intro="A finished, headstamped fastener cut to a specific bolt length for a specific joint — most often a flanged piping connection sized per ASME B16.5."
              attrs={[
                { label: "Length", value: "Cut to drawing or B16.5 length, typically with a tight tolerance." },
                { label: "Ends", value: "Both ends chamfered to the first full thread; nuts run on smoothly." },
                { label: "Marking", value: "Headstamp on at least one end identifying grade and manufacturer." },
                { label: "Ships", value: "As a bolt — typically with two heavy hex nuts (A194) per stud." },
                { label: "Spec'd by", value: "ASTM A193, A320, A453 + ASME B16.5 length tables." },
              ]}
            />
            <CompareCard
              num="Form B"
              title="Threaded rod"
              intro="Continuous threaded stock — bought by the stick, cut on the job. The right form when the user is going to grab a length and trim it to fit."
              attrs={[
                { label: "Length", value: "Stock 12 ft (carbon) and 6 ft (stainless); cut to any length on demand." },
                { label: "Ends", value: "Stock saw-cut; we chamfer both ends on cut-to-length pieces." },
                { label: "Marking", value: "Color band or paint mark on the cut piece per the order; not headstamped." },
                { label: "Ships", value: "Loose, banded, or with matched nuts on request." },
                { label: "Spec'd by", value: "A307, A36, F1554, A193 (cl. 2A/2B), ASME B1.1 / B1.13M." },
              ]}
            />
          </div>
        </div>
      </section>

      {/* INVENTORY BAND (dark) */}
      <section className="st-inventory">
        <div className="st-inventory-inner">
          <div className="st-inventory-text">
            <div className="eyebrow">Inventory &amp; availability</div>
            <h2>
              Stocked, cut, and
              <br />
              ready to <i>ship.</i>
            </h2>
            <p>
              We keep an active inventory of stud bolts, threaded rod, and matching A194 nuts in the
              sizes and grades the petrochemical, power, and structural markets call out most. Cuts,
              finishes, and assemblies turn around quickly — most orders ship same week.
            </p>
            <div className="st-inventory-ctas">
              <Link href="/quote" className="cf-pill cf-pill--blue-light">
                Check availability
              </Link>
              <a href="tel:7077413277" className="cf-pill cf-pill--ghost-dark">
                707.741.3277
              </a>
            </div>
          </div>
          <div className="st-inventory-visual" aria-hidden="true">
            <div className="st-inv-grid">
              <InvRow spec="A193 B7" desc='Stud · 1/2-13 × 3½″ w/ 2H' qty="3,200" />
              <InvRow spec="A193 B7" desc='Stud · 3/4-10 × 4½″ w/ 2H' qty="2,400" />
              <InvRow spec="A193 B8M" desc='Stud · 5/8-11 × 4″ w/ 8M' qty="980" />
              <InvRow spec="A320 L7" desc='Stud · 7/8-9 × 5″ w/ Gr 7' qty="640" />
              <InvRow spec="A307" desc="Threaded rod · 1/2-13 × 12′" qty="1,800" />
              <InvRow spec="F1554 G36" desc='Anchor rod · 3/4-10 × 18″ HDG' qty="720" />
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="st-apps">
        <div className="st-apps-inner">
          <div className="st-apps-header">
            <div className="eyebrow">Where these get used</div>
            <h2>
              Three places these <i>show up</i> most.
            </h2>
            <p>
              Most of our stud and rod work falls into one of three areas. Tell us the industry and
              the line item, and we&apos;ll pull the right grade, finish, and length.
            </p>
          </div>
          <div className="st-apps-grid">
            <Link href="/industries/oil-gas" className="st-app-tile st-app-tile--oil">
              <div className="st-app-tile-bg" />
              <div className="st-app-tile-body">
                <div className="st-app-tile-eyebrow">01 — Oil, Gas &amp; Chemical</div>
                <div className="st-app-tile-title">Refineries, pipelines &amp; petrochemical.</div>
                <div className="st-app-tile-desc">
                  B7 and B16 flange studs for ANSI piping, B8M for sour service, A320 L7 for LNG.
                </div>
              </div>
            </Link>
            <Link href="/industries/power-generation" className="st-app-tile st-app-tile--power">
              <div className="st-app-tile-bg" />
              <div className="st-app-tile-body">
                <div className="st-app-tile-eyebrow">02 — Power Generation</div>
                <div className="st-app-tile-title">Pressure vessels &amp; turbine flanges.</div>
                <div className="st-app-tile-desc">
                  High-temperature studs and rod for boilers, turbine flanges, and balance-of-plant
                  piping.
                </div>
              </div>
            </Link>
            <Link href="/industries/construction" className="st-app-tile st-app-tile--const">
              <div className="st-app-tile-bg" />
              <div className="st-app-tile-body">
                <div className="st-app-tile-eyebrow">03 — Construction</div>
                <div className="st-app-tile-title">Anchor rod &amp; structural connections.</div>
                <div className="st-app-tile-desc">
                  F1554 anchor rod (Gr 36 / 55 / 105) and A307 threaded rod for foundations,
                  embeds, and hangers.
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CUT TO LENGTH (dark band) */}
      <section className="st-cut">
        <div className="st-cut-inner">
          <div className="st-cut-image">
            <Img
              src="/assets/if-factory.webp"
              alt="Industrial process plant with bolted flanged piping"
            />
          </div>
          <div className="st-cut-text">
            <div className="eyebrow">Cut, chamfer, mark</div>
            <h2>
              Send the BOM.
              <br />
              We&apos;ll <i>cut the kit.</i>
            </h2>
            <p>
              Most of what ships out of this category is cut to length on our saws. Cut, deburred,
              chamfered both ends, color-banded by lot, and packaged with the matching nuts.
            </p>
            <ul className="st-cut-attrs">
              <li>
                <b>Length tolerance</b>
                <span>±1/16″ standard, tighter on request. ASME B16.5 stud lengths held to spec.</span>
              </li>
              <li>
                <b>End prep</b>
                <span>Both ends chamfered to first full thread. Square-cut on rod stock by request.</span>
              </li>
              <li>
                <b>Marking</b>
                <span>Headstamp on stud bolts; paint band or color code on cut rod.</span>
              </li>
              <li>
                <b>Nut sets</b>
                <span>
                  Two A194 heavy hex nuts per stud, matched to grade and finish. F436 / F844 washers
                  on request.
                </span>
              </li>
              <li>
                <b>Packaging</b>
                <span>Bagged by line item, kits per joint, or bulk to drum — your call.</span>
              </li>
            </ul>
            <div>
              <Link href="/quote" className="cf-pill cf-pill--blue-light">
                Send your BOM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COATINGS */}
      <section className="st-coatings">
        <div className="st-coatings-inner">
          <div className="st-coatings-text">
            <div className="eyebrow">Coatings &amp; finishes</div>
            <h2>
              The <i>finish</i> matters
              <br />
              more than the bolt.
            </h2>
            <p>
              For a stud, the coating is half the spec. PTFE / Xylan resists thread galling and
              seizing; HDG buys you years of outdoor service; cad and zinc are general-purpose. Pick
              the wrong one and the next maintenance crew can&apos;t get the joint apart.
            </p>
          </div>
          <ul className="st-coatings-list">
            <Coating
              title="Plain finish"
              spec="Default · oiled"
              desc="Uncoated, oiled, ships in original mill condition. Indoor / dry / non-corrosive service or where a job-specific coating is applied later."
            />
            <Coating
              title="PTFE / Xylan fluoropolymer"
              spec="Xylan 1424 · 1052"
              desc="Blue or gray fluoropolymer coating — inhibits galling, eases breakout on flanges that get opened periodically. Standard on offshore and refinery flange studs."
            />
            <Coating
              title="Hot-dip galvanized"
              spec="F2329 / A153"
              desc={
                <>
                  Thicker zinc layer for severe outdoor exposure. Available on B7, A36, A307, F1554.
                  Nuts overtapped to fit. <strong>Not for B8 / B8M stainless or A490-class.</strong>
                </>
              }
            />
            <Coating
              title="Mechanical zinc"
              spec="B695 Cl. 55"
              desc="Zinc applied without thermal cycle — lower embrittlement risk than HDG, tighter dimensional control. Common on smaller-diameter B7 and A307."
            />
            <Coating
              title="Cadmium plate"
              spec="QQ-P-416"
              desc="Aerospace and military-spec cadmium plate. Excellent corrosion resistance and low galling on stainless mating threads. Restricted in commercial use; quote basis."
            />
            <Coating
              title="Zinc / aluminum flake"
              spec="Geomet · Magni"
              desc="Inorganic zinc-rich topcoat applied as a dip-spin. Thin, even, embrittlement-friendly. Common on automotive, wind, and structural applications."
            />
          </ul>
        </div>
      </section>

      {/* TRACEABILITY */}
      <section className="pp-trace pp-trace--alt">
        <div className="pp-trace-inner">
          <div className="pp-trace-header">
            <div className="eyebrow">Documentation</div>
            <h2>
              What <i>ships</i> with the studs.
            </h2>
            <p>
              Pressure-piping studs ship to a paper trail the inspector and code-stamp shop expect
              to see. Standard with every order where the spec calls for it.
            </p>
          </div>
          <div className="pp-trace-grid pp-trace-grid--five">
            <TraceCard
              num="01"
              title="Material Test Reports"
              desc="MTRs / Mill Test Certificates tied to the heat and lot on every shipment. Mechanical & chemistry per A193 / A320 / F593."
            />
            <TraceCard
              num="02"
              title="Hardness & tensile"
              desc="Lot-by-lot hardness (HRC, HBW) and tensile data on alloy and Q&T grades. Charpy impact data on A320 grades."
            />
            <TraceCard
              num="03"
              title="PMI on request"
              desc="Positive Material Identification by XRF or OES, ordered per-lot when your QA program calls for it. Common on B7 / B8M flange jobs."
            />
            <TraceCard
              num="04"
              title="NACE / sour service"
              desc="Hardness-controlled studs to NACE MR0175 / ISO 15156 for sour-service oil & gas — flag it on the RFQ."
            />
            <TraceCard
              num="05"
              title="DFARS / Buy America"
              desc="Domestic-melt / domestic-pour material with full documentation. Common on defense, AASHTO bridge, and Caltrans work."
            />
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="pp-cross">
        <div className="pp-cross-inner">
          <div className="pp-cross-header">
            <h2>
              Looking for something
              <br />a little <i>different?</i>
            </h2>
            <p>
              Stud Bolts &amp; Threaded Rod is the long-form, cut-to-length world. If your project
              lives one step over, start here instead.
            </p>
          </div>
          <div className="pp-cross-grid">
            <CrossLink
              href="/anchor-bolts"
              question="Foundation anchors with a hooked or headed end?"
              title="Anchor Bolts"
              spec="F1554 · A193 B7/B8/B8M · F593"
            />
            <CrossLink
              href="/industrial-fasteners"
              question="Heavy hex bolts, socket caps, finished hardware?"
              title="Industrial Fasteners"
              spec="A193 · A574 · A194 · F436"
            />
            <CrossLink
              href="/structural-fasteners"
              question="Bolted structural-steel connections?"
              title="Structural Fasteners"
              spec="A325 · A490 · F3125 · TC bolts"
            />
            <CrossLink
              href="/stainless-steel-fasteners"
              question="Stainless-only, corrosion-driven spec?"
              title="Stainless Steel Fasteners"
              spec="304 · 316 · duplex · PH grades"
            />
            <CrossLink
              href="/silicon-bronze"
              question="Marine or decorative non-ferrous?"
              title="Silicon Bronze Hardware"
              spec="651 / 655 · tinned & plain"
            />
            <CrossLink
              href="/cnc-machining"
              question="Custom geometry — bent, machined, drilled rod?"
              title="CNC Machining"
              spec="In-house · DFARS · AS9102"
            />
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="pp-quote">
        <div className="pp-quote-inner">
          <div className="pp-quote-text">
            <div className="eyebrow">Request a quote</div>
            <h2>
              Send the <i>BOM.</i>
              <br />
              We&apos;ll cut the kit.
            </h2>
            <p>
              Send the line list, the flange schedule, or just diameters and lengths. A bolt
              specialist will come back with a quote, usually inside 24 hours.
            </p>
            <div className="pp-quote-contact">
              Prefer to talk it through?
              <b>707.741.3277</b>
              <b>sales@californiafastener.com</b>
            </div>
          </div>
          <QuoteFormPlaceholder
            textareaLabel="Studs & rod needed"
            textareaPlaceholder="Grade, diameter, length, finish, quantity — or paste a flange schedule / cut list."
          />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="pp-cta">
        <div className="pp-cta-inner">
          <div className="pp-cta-eyebrow">Talk to a bolt specialist</div>
          <h2>
            Cut, chamfered,
            <br />
            and on the <i>truck.</i>
          </h2>
          <p>
            From a single B7 stud cut to length to a full flange package with PTFE and PMI —
            we&apos;ve shipped the package before.
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
  title,
  desc,
  metaBold,
  metaRest,
}: {
  pnum: string;
  img: string;
  imgAlt: string;
  title: string;
  desc: string;
  metaBold: string;
  metaRest: string;
}) {
  return (
    <div className="pp-product-card">
      <div className="pp-product-photo">
        <span className="pnum">{pnum}</span>
        <Img src={img} alt={imgAlt} />
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

function CompareCard({
  num,
  title,
  intro,
  attrs,
}: {
  num: string;
  title: string;
  intro: string;
  attrs: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="st-compare-card">
      <div className="num">{num}</div>
      <h3>{title}</h3>
      <p>{intro}</p>
      <ul className="st-compare-attrs">
        {attrs.map((a) => (
          <li key={a.label}>
            <b>{a.label}</b>
            <span>{a.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InvRow({ spec, desc, qty }: { spec: string; desc: string; qty: string }) {
  return (
    <div className="st-inv-row">
      <b>{spec}</b>
      <span>{desc}</span>
      <span className="qty">{qty}</span>
      <span className="stk">IN STOCK</span>
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
  desc: React.ReactNode;
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
