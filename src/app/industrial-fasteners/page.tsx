import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-industrial-fasteners.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { Img } from "@/components/Img";
import { QuoteFormPlaceholder } from "@/components/QuoteFormPlaceholder";

export const metadata: Metadata = {
  title: "Industrial Fasteners",
  description:
    "ASTM A193 (B7 / B16 / B8 / B8M), A194 (2H / 4 / 7 / 8 / 8M), A574 socket head, A307, F436 hardened washers. Carbon, alloy, and stainless — stocked deep with full MTRs.",
};

export default function IndustrialFastenersPage() {
  return (
    <>
      <CfNav />

      {/* HERO */}
      <section className="if-hero">
        <div className="if-hero-inner">
          <div className="if-hero-text">
            <div className="if-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/products">Products</Link>
              <span>/</span>
              Industrial Fasteners
            </div>
            <div className="if-eyebrow">Industrial Fasteners</div>
            <h1>
              Bolts, nuts &amp; washers
              <br />
              for <i>industrial</i>
              <br />
              assembly.
            </h1>
            <p className="if-hero-sub">
              Socket head, heavy hex, and the nuts and washers that go with them. Carbon, alloy, and
              stainless grades — stocked deep, shipped same day, and backed with full MTRs.
            </p>
            <div className="if-hero-ctas">
              <Link href="/quote" className="cf-pill cf-pill--blue">
                Request a Quote
              </Link>
              <a href="#products" className="cf-link">
                View products ↓
              </a>
            </div>
            <div className="if-hero-stats">
              <HeroStat val="A193" label="B7 / B16 / B8 / B8M" />
              <HeroStat val="A194" label="2H / 4 / 7 / 8 / 8M" />
              <HeroStat val="F436" label="Hardened washers" />
              <HeroStat val="MTRs" label="With every shipment" />
            </div>
          </div>
          <div className="if-hero-image">
            <div className="if-hero-image-tag">A193 B8M · 316 Stainless · Heavy Hex</div>
            <Img
              src="/assets/if-stamp-316.webp"
              alt="Heavy hex bolt head stamped CA 316, A193 B8M 316 stainless"
            />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="if-trustbar" aria-hidden="true">
        <div className="if-trustbar-track">
          <TrustItems />
          <TrustItems />
        </div>
      </div>

      {/* POSITIONING */}
      <section className="if-intro">
        <div className="if-intro-inner">
          <div className="if-intro-lead">
            <h2>
              The hardware that runs through
              <br />
              almost <i>every project.</i>
            </h2>
          </div>
          <div className="if-intro-body">
            <p>
              Industrial Fasteners is our catch-all for the mechanical and process assembly hardware
              that runs through almost every project we quote — socket head cap screws, heavy hex
              bolts, heavy hex nuts, hardened washers, set screws, and the specs that back them.
            </p>
            <p>
              If you&apos;re specifying for pressure vessels, flanged piping, rotating equipment,
              machinery builds, or general structural assembly — this is the category.
              <em>
                Looking for anchor bolts, structural bolts, or stud bolts as a standalone? See the
                cross-links below.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="if-products" id="products">
        <div className="if-products-header">
          <div className="eyebrow">What we stock</div>
          <h2>
            Six product families.
            <br />
            <i>One supplier.</i>
          </h2>
          <p>
            Stocked deep in the grades you actually call out — metric and inch, plain and coated,
            standard and heavy pattern.
          </p>
        </div>
        <div className="if-products-grid">
          <ProductCard
            pnum="01 / SHCS"
            placeholder={["Product shot", "Socket head cap screw"]}
            title="Socket head cap screws"
            desc="High-strength machine screws for precision assembly — tight head clearance and torque control. Metric and inch."
            metaBold="ASTM A574"
            metaRest=" · 18-8 · 316 stainless"
          />
          <ProductCard
            pnum="02 / FHSCS"
            placeholder={["Product shot", "Flat head socket cap"]}
            title="Flat head socket screws"
            desc="Flush-mount screws for surfaces that need to stay smooth. Countersunk 82° (inch) or 90° (metric). Alloy and stainless."
            metaBold="ASTM F837"
            metaRest=" · Alloy steel · Stainless"
          />
          <ProductCard
            pnum="03 / Heavy hex bolt"
            img="/assets/if-stamp-316.webp"
            imgAlt="Heavy hex bolt stamped CA 316"
            title="Heavy hex bolts"
            desc="Heavier-pattern hex head bolts for flanged, bolted, and high-load assemblies. Galvanized, plain, PTFE, and Xylan coatings available."
            metaBold="A307 · A193 B7/B16/B8/B8M"
            metaRest=" · A449"
          />
          <ProductCard
            pnum="04 / Heavy hex nut"
            img="/assets/if-stamp-105.webp"
            imgAlt="Heavy hex nut stamped CA 105"
            title="Heavy hex nuts"
            desc="Thicker, higher-strength nuts matched to heavy hex bolts and stud assemblies. Specified to pair with their mating bolt grade."
            metaBold="ASTM A194"
            metaRest=" · Grades 2H, 2HM, 4, 7, 7M, 8, 8M"
          />
          <ProductCard
            pnum="05 / F436 washer"
            placeholder={["Product shot", "F436 hardened washer"]}
            title="Hardened flat washers"
            desc="Through-hardened flat washers for high-strength bolted joints. Matched to A325, A490, and A193 B7 assemblies."
            metaBold="ASTM F436"
            metaRest=" · Type 1 standard · Type 3 weathering"
          />
          <ProductCard
            pnum="06 / Set screw"
            img="/assets/if-stamp-b8-rod.webp"
            imgAlt="Threaded rod stamped CA B8 stainless"
            title="Set screws"
            desc="Shaft and collar positioning screws in cup, cone, flat, dog, and oval points. Metric and inch."
            metaBold="ASTM A574"
            metaRest=" · 18-8 · 316 stainless"
          />
        </div>
      </section>

      {/* GRADES — grouped by family */}
      <section className="if-grades" id="grades">
        <div className="if-grades-inner">
          <div className="if-grades-header">
            <h2>
              Grades and specs,
              <br />
              grouped by <i>family.</i>
            </h2>
            <p>
              Industrial fasteners cover a wide range of service conditions. Below is how we organize
              the specs we work in most often — if your drawing calls out a grade not listed, ask.
              Most of what you&apos;d pull from a standard isn&apos;t far from what we stock or can
              bring in.
            </p>
          </div>

          <Family
            num="Family 01"
            title="Carbon & alloy steel"
            blurb="General-purpose and machinery-grade bolts. Inch-series workhorses through SAE J429 and ASTM A307 / A449."
            specs={[
              {
                family: "ASTM A307",
                name: "Grade A · Grade B",
                tags: ["Grade A", "Grade B"],
                body:
                  "Low-carbon steel bolts for general-purpose assembly. Grade A for non-critical applications; Grade B for flanged joints at moderate loads and limited temperature.",
              },
              {
                family: "SAE J429",
                name: "Grade 2 · 5 · 8",
                tags: ["Grade 2", "Grade 5", "Grade 8"],
                body:
                  "Inch-series hex cap screws. Grade 2 for light-duty, Grade 5 medium-carbon for general machinery, Grade 8 alloy steel quenched and tempered for higher-tensile assemblies.",
              },
              {
                family: "ASTM A449",
                name: "Q&T hex bolt",
                tags: ["Up to 3″"],
                body:
                  "Quenched and tempered hex bolts with properties similar to SAE Grade 5, extended to larger diameters (up to 3″) not covered by J429. Common in heavy equipment and machinery.",
              },
            ]}
          />

          <Family
            num="Family 02"
            title="High-temperature alloy steel"
            blurb="Chromium-moly (and chromium-moly-vanadium) alloys for pressure vessels, flanged piping, and high-temperature, high-pressure service."
            specs={[
              {
                family: "ASTM A193",
                name: "Grade B7",
                tags: ["4140 / 4142", "Q & T"],
                body:
                  "Chromium-molybdenum (4140/4142) alloy steel, quenched and tempered. The workhorse stud and bolt for pressure vessels, flanged piping, and high-temperature, high-pressure service. Refineries, power plants, petrochemical.",
              },
              {
                family: "ASTM A193",
                name: "Grade B16",
                tags: ["Cr-Mo-V", "~1100°F"],
                body:
                  "Chromium-moly-vanadium alloy, quenched and tempered. Runs above B7's service range — superheated steam piping, high-temperature turbine connections, service up to approximately 1100°F.",
              },
            ]}
          />

          {/* Stainless family — same Family component, but with a hero photo card injected at the top */}
          <div className="if-family if-family--stainless">
            <div className="if-family-label">
              <div className="num">Family 03</div>
              <h3>Stainless steel</h3>
              <p>
                304 and 316 austenitic grades plus strain-hardened classes — food, pharma, chemical,
                marine, pulp &amp; paper, wastewater.
              </p>
            </div>
            <div className="if-family-cards">
              <div className="if-spec-card if-spec-card--hero">
                <div className="if-spec-photo">
                  <Img src="/assets/if-stamp-316.webp" alt="CA 316 head stamp — A193 B8M" />
                  <Img src="/assets/if-stamp-b8-rod.webp" alt="CA B8 rod stamp — A193 B8" />
                </div>
              </div>
              <SpecCard
                family="ASTM A193"
                name="Grade B8 · B8M"
                tags={["304 SS", "316 SS", "Cl. 1 & 2"]}
                body="B8 is 304 stainless for general corrosion service — food, pharmaceutical, chemical at moderate temperatures. B8M upgrades to 316 for chloride and acid resistance — marine, chemical processing, pulp & paper, wastewater. Class 2 is strain-hardened for higher strength at smaller diameters."
              />
              <SpecCard
                family="ASTM F593"
                name="Group 1, 2, 3"
                tags={["304/305", "316", "Strain-hard."]}
                body="Stainless steel bolts, screws, and studs in 18-8 (304/305), 316, and strain-hardened alloys. Covers non-pressure service where A193 isn't required."
              />
            </div>
          </div>
        </div>
      </section>

      {/* COMPANION HARDWARE */}
      <section className="if-companion">
        <div className="if-companion-inner">
          <div className="if-companion-text">
            <div className="eyebrow">Nuts, washers &amp; companion hardware</div>
            <h2>
              Bolts alone won&apos;t
              <br />
              make the <i>joint.</i>
            </h2>
            <p>
              Match the nut and washer to the bolt grade, or the joint won&apos;t hold the way the
              spec promises. Here&apos;s what we stock to pair with the families above.
            </p>
            <ul className="if-companion-checks">
              <li data-tag="A194">
                Heavy hex nuts — grades 2H, 2HM, 4, 7, 7M, 8, 8M. 2H pairs with B7; 8M with B8M.
              </li>
              <li data-tag="F436">
                Through-hardened flat washers — Type 1 plain, Type 3 weathering steel. Matched to
                A325, A490, A193 B7.
              </li>
              <li data-tag="A563">
                Carbon &amp; alloy hex nuts — Grades A, B, C, DH. Grade DH heavy hex matched to A325 /
                A490 structural bolts.
              </li>
              <li data-tag="Kits">
                Bolt / nut / washer kits shipped together, tagged by heat and lot.
              </li>
            </ul>
          </div>
          <div className="if-companion-visual">
            <div className="big">
              <Img src="/assets/if-stamp-105.webp" alt="Heavy hex head stamped CA 105" />
              <span className="tag">A194 2H · Heavy hex</span>
            </div>
            <div className="ph">
              F436
              <br />
              hardened washer
            </div>
            <div className="ph">
              A563 DH
              <br />
              heavy hex nut
            </div>
          </div>
        </div>
      </section>

      {/* EXOTIC ALLOYS — dark band */}
      <section className="if-exotic">
        <div className="if-exotic-inner">
          <div className="if-exotic-image">
            <Img src="/assets/if-factory.webp" alt="Industrial process plant with piping and valves" />
          </div>
          <div className="if-exotic-text">
            <div className="eyebrow">Specialty &amp; exotic · quote basis</div>
            <h2>
              Exotic grades when
              <br />
              the <i>spec calls</i> for it.
            </h2>
            <p>
              When your application needs more than standard carbon or stainless, we source and —
              where needed — machine to print.
            </p>
            <ul className="if-exotic-alloys">
              <li>
                <b>Nickel alloys</b>
                <span>Inconel 625, 718 · Monel 400, K500 · Hastelloy C-276</span>
              </li>
              <li>
                <b>PH stainless</b>
                <span>17-4 PH — H900, H1025, H1150</span>
              </li>
              <li>
                <b>Duplex stainless</b>
                <span>2205 · 2507</span>
              </li>
              <li>
                <b>Titanium</b>
                <span>Grade 2 (CP) · Grade 5 (Ti-6Al-4V)</span>
              </li>
              <li>
                <b>Silicon bronze</b>
                <span>651 / 655 — tinned and plain</span>
              </li>
            </ul>
            <div>
              <Link href="/quote" className="cf-pill cf-pill--blue-light">
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRACEABILITY */}
      <section className="if-trace">
        <div className="if-trace-inner">
          <div className="if-trace-header">
            <div className="eyebrow">Traceability &amp; documentation</div>
            <h2>
              What <i>ships</i> with the bolts.
            </h2>
            <p>
              Every industrial fastener we ship is traceable to heat and lot. Standard with every
              order where the spec calls for it — and if your QA program needs something we
              haven&apos;t listed, ask. Most documentation asks we get are ones we&apos;ve answered
              before.
            </p>
          </div>
          <div className="if-trace-grid">
            <TraceCard
              num="01"
              title="Material Test Reports"
              desc="MTRs / Mill Test Certificates tied to the heat and lot on every shipment where the spec requires."
            />
            <TraceCard
              num="02"
              title="Certificate of Conformance"
              desc="Signed C of C confirming the parts were manufactured and tested to the called-out standards."
            />
            <TraceCard
              num="03"
              title="DFARS compliant"
              desc="Domestic-melt / domestic-pour options for defense work — flag it on the RFQ and we'll source accordingly."
            />
            <TraceCard
              num="04"
              title="AS9102 FAI"
              desc="First Article Inspection reports for aerospace programs — we've run these packages before."
            />
            <TraceCard
              num="05"
              title="PMI on request"
              desc="Positive Material Identification with XRF or OES, ordered per-lot when your program calls for it."
            />
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="if-cross">
        <div className="if-cross-inner">
          <div className="if-cross-header">
            <h2>
              Not sure this is
              <br />
              the right <i>category?</i>
            </h2>
            <p>
              Industrial Fasteners is a catch-all. If your project lives in one of these more specific
              worlds, start there instead.
            </p>
          </div>
          <div className="if-cross-grid">
            <CrossLink
              href="/structural-fasteners"
              question="Building or bridge construction?"
              title="Structural Fasteners"
              spec="A325 · A490 · F1554 · TC bolts"
            />
            <CrossLink
              href="/anchor-bolts"
              question="Foundation anchors?"
              title="Anchor Bolts"
              spec="F1554 Gr 36/55/105 · A193 B7/B8/B8M · F593"
            />
            <CrossLink
              href="/stud-bolts-threaded-rod"
              question="Long threaded studs or rod stock?"
              title="Stud Bolts & Threaded Rod"
              spec="B7 · B8 · B16 · cut to length"
            />
            <CrossLink
              href="/stainless-steel-fasteners"
              question="Corrosion-driven, stainless-only spec?"
              title="Stainless Steel Fasteners"
              spec="304 · 316 · duplex · PH grades"
            />
            <CrossLink
              href="/silicon-bronze"
              question="Marine or decorative bronze?"
              title="Silicon Bronze Hardware"
              spec="651 / 655 · tinned & plain"
            />
            <CrossLink
              href="/cnc-machining"
              question="Custom machined or non-standard geometry?"
              title="CNC Machining"
              spec="In-house · DFARS · AS9102"
            />
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="if-quote">
        <div className="if-quote-inner">
          <div className="if-quote-text">
            <div className="eyebrow">Request a quote</div>
            <h2>
              Send the <i>drawing.</i>
              <br />
              We&apos;ll do the rest.
            </h2>
            <p>
              Send the drawing, the spec callouts, or just a rough description of the job. A bolt
              specialist will come back with a quote, usually inside 24 hours.
            </p>
            <div className="if-quote-contact">
              Prefer to talk it through?
              <b>707.741.3277</b>
              <b>sales@californiafastener.com</b>
            </div>
          </div>
          <QuoteFormPlaceholder
            classPrefix="if"
            textareaLabel="How can we help?"
            textareaPlaceholder="Spec callouts, grades, quantities, drawing notes — or paste a BOM."
          />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="if-cta">
        <div className="if-cta-inner">
          <div className="if-cta-eyebrow">Talk to a bolt specialist</div>
          <h2>
            Know the spec.
            <br />
            Know the <i>service.</i>
          </h2>
          <p>
            From a single heavy hex to a full bolted joint kit with MTRs, First Article, and PMI —
            we&apos;ve shipped the package before.
          </p>
          <div className="if-cta-ctas">
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
      <div className="if-hero-stat-val">{val}</div>
      <div className="if-hero-stat-label">{label}</div>
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
    <div className="if-product-card">
      <div className="if-product-photo">
        <span className="pnum">{pnum}</span>
        {img ? (
          <Img src={img} alt={imgAlt ?? ""} />
        ) : placeholder ? (
          <div className="if-ph-placeholder">
            {placeholder[0]}
            <br />
            {placeholder[1]}
          </div>
        ) : null}
      </div>
      <div className="if-product-body">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="if-product-meta">
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
    <div className="if-family">
      <div className="if-family-label">
        <div className="num">{num}</div>
        <h3>{title}</h3>
        <p>{blurb}</p>
      </div>
      <div className="if-family-cards">
        {specs.map((s) => (
          <SpecCard key={s.name} family={s.family} name={s.name} tags={s.tags} body={s.body} />
        ))}
      </div>
    </div>
  );
}

function SpecCard({
  family,
  name,
  tags,
  body,
}: {
  family: string;
  name: string;
  tags: string[];
  body: string;
}) {
  return (
    <div className="if-spec-card">
      <div className="if-spec-tag">
        {family}
        <span className="name">{name}</span>
        <ul className="if-spec-grades">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="if-spec-body">
        <p>{body}</p>
      </div>
    </div>
  );
}

function TraceCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="if-trace-card">
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
    <Link href={href} className="if-cross-card">
      <div className="question">{question}</div>
      <h4>{title}</h4>
      <div className="spec">{spec}</div>
    </Link>
  );
}

/** Trust-bar marquee items rendered twice for the seamless loop. */
function TrustItems() {
  const items: Array<{ label: string; svg: React.ReactNode }> = [
    { label: "Fast Quotes", svg: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /> },
    {
      label: "Full Traceability",
      svg: (
        <>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </>
      ),
    },
    {
      label: "Exotic Grades",
      svg: (
        <>
          <path d="M6 3h12l4 6-10 13L2 9Z" />
          <path d="M11 3 8 9l4 13 4-13-3-6" />
          <path d="M2 9h20" />
        </>
      ),
    },
    {
      label: "Same Day Shipping",
      svg: (
        <>
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </>
      ),
    },
    {
      label: "Bolt Specialists",
      svg: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),
    },
    {
      label: "In-House CNC",
      svg: (
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      ),
    },
  ];
  return (
    <>
      {items.map((it) => (
        <div key={it.label} className="if-trust-item">
          <svg viewBox="0 0 24 24">{it.svg}</svg>
          <span>{it.label}</span>
        </div>
      ))}
    </>
  );
}
