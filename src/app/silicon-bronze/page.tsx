import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-product-page.css";
import "@/styles/cf-silicon-bronze.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { QuoteFormPlaceholder } from "@/components/QuoteFormPlaceholder";
import { Img } from "@/components/Img";

export const metadata: Metadata = {
  title: "Silicon Bronze Hardware — Marine & Electrical Fasteners",
  description:
    "Silicon Bronze (C651) fasteners for marine, electrical, and architectural applications. Exceptional conductivity, saltwater corrosion resistance, plain or tinned finish. Stocked and shipped nationwide.",
};

export default function SiliconBronzePage() {
  return (
    <div className="sb-page">
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
              Silicon Bronze
            </div>
            <div className="pp-eyebrow">Silicon Bronze Hardware</div>
            <h1>
              Silicon bronze
              <br />
              fasteners for <i>electrical</i>
              <br />
              &amp; <i>marine</i> work.
            </h1>
            <p className="pp-hero-sub">
              Bolts, nuts, and washers in C651 silicon bronze. Conductive for electrical connections,
              corrosion-resistant for saltwater service. Plain or tinned finish, stocked and shipped
              nationwide.
            </p>
            <div className="pp-hero-ctas">
              <Link href="/quote" className="cf-pill cf-pill--bronze">
                Request a Quote
              </Link>
              <a href="#range" className="cf-link">
                View the range ↓
              </a>
            </div>
            <div className="pp-hero-stats">
              <HeroStat val="C651" label="Silicon bronze alloy" />
              <HeroStat val="F468" label="Bolts & screws" />
              <HeroStat val="F467" label="Nuts" />
              <HeroStat val="24 hr" label="Quote turnaround" />
            </div>
          </div>
          <div className="pp-hero-image">
            <div className="pp-hero-image-tag">C651 · Hex Head · Plain Finish</div>
          </div>
        </div>
      </section>

      {/* PROPERTY STRIP */}
      <section className="pp-props">
        <div className="pp-props-inner">
          <Property
            num="01"
            title="Conductive"
            desc="Much higher electrical and thermal conductivity than stainless — suited to current-carrying joints and grounding hardware."
          />
          <Property
            num="02"
            title="Corrosion-resistant"
            desc="Holds up in saltwater, chlorides, and most industrial atmospheres. Weathers to a stable patina rather than pitting."
          />
          <Property
            num="03"
            title="Non-magnetic"
            desc="A practical choice near instrumentation and equipment sensitive to magnetic interference."
          />
          <Property
            num="04"
            title="Plain or tinned"
            desc="Plain bronze for most work; tinned finish available for soldered and terminal-lug connections."
          />
        </div>
      </section>

      {/* PRODUCT RANGE */}
      <section className="pp-products" id="range">
        <div className="pp-products-header">
          <div className="eyebrow">What we stock</div>
          <h2>
            Bolts, nuts, and the
            <br />
            <i>washers that go with them.</i>
          </h2>
          <p>
            Hex bolts, hex nuts, flat washers, and lock washers — all in C651 silicon bronze.
            Standard sizes stocked; cut-to-length and custom fabrication available on request.
          </p>
        </div>
        <div className="pp-products-grid">
          <RangeCard
            pnum="01 / Hex bolt"
            title="Hex head bolts"
            desc="Forged hex head, full or partial thread, plain or tinned finish. The standard bronze bolt for marine and electrical use."
            spec="ASTM F468 · C651"
            img="/assets/products/bronze-hex-bolt-1.png"
            imgAlt="Silicon bronze hex head bolt"
          />
          <RangeCard
            pnum="02 / Hex nut"
            title="Hex nuts"
            desc="Finished and heavy hex nuts machined from bronze bar. Sized to pair with our bolt inventory."
            spec="ASTM F467 · C651"
            img="/assets/products/bronze-hex-nut-1.png"
            imgAlt="Silicon bronze hex nut"
          />
          <RangeCard
            pnum="03 / Flat washer"
            title="Flat washers"
            desc="Flat washers in standard and fender patterns to distribute load and protect mating surfaces."
            spec="ASME B18.22.1 · C651"
            img="/assets/products/bronze-washer-1.png"
            imgAlt="Silicon bronze flat washer"
          />
          <RangeCard
            pnum="04 / Lock washer"
            title="Lock washers"
            desc="Split-ring lock washers for connections subject to vibration — electrical buswork, marine fittings, terminal lugs."
            spec="ASME B18.21.1 · C651"
            img="/assets/products/bronze-lock-washer-1.png"
            imgAlt="Silicon bronze split-ring lock washer"
          />
        </div>
      </section>

      {/* CONDUCTIVITY SPLIT */}
      <section className="sb-split">
        <div className="sb-split-inner">
          <div className="sb-split-text">
            <div className="eyebrow">Electrical applications</div>
            <h2>
              A sensible choice for <i>current-carrying</i> connections.
            </h2>
            <p>
              Silicon bronze conducts electricity and heat far better than stainless while holding
              similar mechanical strength. It&apos;s commonly specified for buswork, grounding
              hardware, and terminal connections.
            </p>
            <p>
              Tinned finish is available where low contact resistance matters, such as soldered
              joints and terminal lugs.
            </p>
            <Link href="/quote" className="cf-pill cf-pill--bronze">
              Request a quote
            </Link>
          </div>
          <div className="sb-data-card">
            <div className="sb-data-head">
              <div className="label">Electrical conductivity · % IACS</div>
              <h3>Bronze vs. the alternatives</h3>
            </div>
            <div className="sb-data-bars">
              <ConductivityBar name="C651 Si Bronze" pct={12} val="12%" />
              <ConductivityBar name="316 Stainless" pct={2.5} val="2.3%" muted />
              <ConductivityBar name="Plain Steel" pct={8} val="7–9%" muted />
              <ConductivityBar name="Copper (ref.)" pct={100} val="100%" muted />
            </div>
            <div className="sb-data-foot">
              Approximate values — silicon bronze delivers roughly 5–7× the electrical conductivity
              of stainless at similar mechanical strength.
            </div>
          </div>
        </div>
      </section>

      {/* MARINE SECTION */}
      <section className="sb-marine">
        <div className="sb-marine-inner">
          <div className="sb-marine-visual">
            <div className="sb-marine-visual-box">
              <div className="sb-marine-ph">
                [ Bronze hardware on
                <br />
                weathered hull timbers ]
              </div>
              <div className="sb-marine-tag">Marine &amp; shipbuilding</div>
            </div>
          </div>
          <div className="sb-marine-text">
            <div className="eyebrow">Marine applications</div>
            <h2>
              The traditional fastener for <i>saltwater service.</i>
            </h2>
            <p>
              Silicon bronze has been used in boatbuilding for generations. It resists the corrosive
              effects of seawater, doesn&apos;t gall against other bronze hardware, and weathers to a
              stable patina instead of pitting.
            </p>
            <ul className="sb-marine-checks">
              <li>Shipbuilding, repair, and restoration</li>
              <li>Dock, pier, and marina hardware</li>
              <li>Deck and through-hull fittings</li>
              <li>Galvanic compatibility with bronze and copper alloys</li>
              <li>Plain or tinned finish</li>
            </ul>
            <Link href="/quote" className="cf-pill cf-pill--bronze">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="sb-apps">
        <div className="sb-apps-inner">
          <div className="sb-apps-header">
            <h2>
              Common <i>applications.</i>
            </h2>
            <p>
              Most of our silicon bronze work falls into one of three areas. Let us know what
              you&apos;re specifying and we&apos;ll pull the right size and finish.
            </p>
          </div>
          <div className="sb-apps-grid">
            <Link href="/industries/marine" className="sb-app-tile sb-app-tile--marine">
              <div className="sb-app-tile-bg" />
              <div className="sb-app-tile-body">
                <div className="sb-app-tile-eyebrow">01 — Marine</div>
                <div className="sb-app-tile-title">Shipbuilding &amp; dock hardware.</div>
                <div className="sb-app-tile-desc">
                  Hull, deck, and pier hardware for saltwater service.
                </div>
              </div>
            </Link>
            <Link href="/industries/power-transmission" className="sb-app-tile sb-app-tile--electrical">
              <div className="sb-app-tile-bg" />
              <div className="sb-app-tile-body">
                <div className="sb-app-tile-eyebrow">02 — Electrical</div>
                <div className="sb-app-tile-title">Buswork, grounding &amp; terminations.</div>
                <div className="sb-app-tile-desc">
                  Current-carrying connections, terminal lugs, and grounding hardware. Tinned finish
                  available.
                </div>
              </div>
            </Link>
            <Link href="/industries/construction" className="sb-app-tile sb-app-tile--arch">
              <div className="sb-app-tile-bg" />
              <div className="sb-app-tile-body">
                <div className="sb-app-tile-eyebrow">03 — Architectural</div>
                <div className="sb-app-tile-title">Exposed architectural hardware.</div>
                <div className="sb-app-tile-desc">
                  Restoration, heritage, and exposed fixtures where bronze is specified for finish
                  and longevity.
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* INVENTORY BAND */}
      <section className="sb-inventory">
        <div className="sb-inventory-inner">
          <div className="sb-inventory-text">
            <div className="eyebrow">Inventory &amp; availability</div>
            <h2>
              Stocked and ready
              <br />
              to <i>ship.</i>
            </h2>
            <p>
              We keep an inventory of silicon bronze hardware across common sizes and finishes,
              ready to ship from stock. For sizes we don&apos;t stock, custom fabrication is
              available on a short lead time.
            </p>
            <div className="sb-inventory-ctas">
              <Link href="/quote" className="cf-pill cf-pill--bronze-light">
                Check availability
              </Link>
              <a href="tel:7077413277" className="cf-pill cf-pill--ghost-dark">
                707.741.3277
              </a>
            </div>
          </div>
          <div className="sb-inventory-visual" aria-hidden="true">
            <div className="sb-inv-grid">
              <InvRow spec="C651" desc='Hex bolt · 1/4-20 × 1"' qty="2,400" />
              <InvRow spec="C651" desc='Hex bolt · 3/8-16 × 2"' qty="1,800" />
              <InvRow spec="C651" desc="Hex nut · 1/2-13 finished" qty="3,600" />
              <InvRow spec="C651" desc="Flat washer · 5/8 std" qty="4,100" />
              <InvRow spec="C651" desc="Lock washer · 1/2 split" qty="2,950" />
              <InvRow spec="C651T" desc='Hex bolt · 3/8-16 × 1½" tinned' qty="900" />
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="pp-cross">
        <div className="pp-cross-inner">
          <div className="pp-cross-header">
            <h2>
              Looking for something
              <br />
              a little <i>different?</i>
            </h2>
            <p>
              Bronze sits in a narrow lane — marine, electrical, and architectural. If your job
              calls for a different metal, start here.
            </p>
          </div>
          <div className="pp-cross-grid">
            <CrossLink
              href="/stainless-steel-fasteners"
              question="Corrosion-resistant but not bronze?"
              title="Stainless Steel Fasteners"
              spec="304 · 316 · duplex · PH"
            />
            <CrossLink
              href="/structural-fasteners"
              question="Steel-to-steel structural connections?"
              title="Structural Fasteners"
              spec="A325 · A490 · F3125 · TC bolts"
            />
            <CrossLink
              href="/industrial-fasteners"
              question="Heavy hex, socket caps, finished hardware?"
              title="Industrial Fasteners"
              spec="A193 · A574 · A194 · F436"
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
              Tell us what you <i>need.</i>
            </h2>
            <p>
              Diameter, length, quantity, and finish — or just paste the line item from your BOM.
              Most quotes turn around within 24 hours.
            </p>
            <div className="pp-quote-contact">
              Talk to a person
              <b>707.741.3277</b>
              <b>sales@californiafastener.com</b>
            </div>
          </div>
          <QuoteFormPlaceholder
            textareaLabel="How can we help?"
            textareaPlaceholder="Part number, diameter × length, quantity, finish, need-by date…"
          />
        </div>
      </section>

      {/* SPEC LIBRARY CTA */}
      <section className="sb-spec-lib">
        <div className="sb-spec-lib-inner">
          <div>
            <h2>Visit our Specification Library.</h2>
            <p>
              Standards, material guides, and technical references for the industries we serve —
              bronze, stainless, carbon, and alloy.
            </p>
            <Link href="/spec-library" className="cf-pill cf-pill--bronze">
              Browse the library
            </Link>
          </div>
          <div className="sb-spec-lib-visual">
            <div>
              <b>F468</b>Nonferrous bolts &amp; screws
            </div>
            <div>
              <b>F467</b>Nonferrous hex nuts
            </div>
            <div>
              <b>B98</b>Silicon bronze rod &amp; bar
            </div>
            <div>
              <b>B584</b>Copper alloy castings
            </div>
            <div>
              <b>B18.22</b>Flat washers
            </div>
            <div>
              <b>B18.21</b>Lock washers
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="pp-cta">
        <div className="pp-cta-inner">
          <div className="pp-cta-eyebrow">Get in touch</div>
          <h2>
            Ready when <i>you are.</i>
          </h2>
          <p>
            Send over your spec and we&apos;ll get a quote back, usually within 24 hours. Or pick up
            the phone — we&apos;re happy to talk through the job.
          </p>
          <div className="pp-cta-ctas">
            <Link href="/quote" className="cf-pill cf-pill--bronze-light">
              Request a Quote
            </Link>
            <a href="tel:7077413277" className="cf-pill cf-pill--ghost-dark">
              Call 707.741.3277
            </a>
          </div>
        </div>
      </section>

      <CfFooter />
    </div>
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

function RangeCard({
  pnum,
  title,
  desc,
  spec,
  img,
  imgAlt,
}: {
  pnum: string;
  title: string;
  desc: string;
  spec: string;
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
          <b>{spec}</b>
        </div>
      </div>
    </div>
  );
}

function ConductivityBar({
  name,
  pct,
  val,
  muted,
}: {
  name: string;
  pct: number;
  val: string;
  muted?: boolean;
}) {
  return (
    <div className={muted ? "sb-bar sb-bar--muted" : "sb-bar"}>
      <div className="sb-bar-name">{name}</div>
      <div className="sb-bar-track">
        <div className="sb-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="sb-bar-val">{val}</div>
    </div>
  );
}

function InvRow({ spec, desc, qty }: { spec: string; desc: string; qty: string }) {
  return (
    <div className="sb-inv-row">
      <b>{spec}</b>
      <span>{desc}</span>
      <span className="qty">{qty}</span>
      <span className="stk">IN STOCK</span>
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
