import Link from "next/link";
import Image from "next/image";
import "@/styles/cf-homepage.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { SpecBuilderTrigger } from "@/components/SpecBuilderTrigger";
import { Img } from "@/components/Img";

export default function HomePage() {
  return (
    <>
      <CfNav />

      {/* HERO */}
      <section className="hero-v1">
        <div className="hero-v1-copy">
          <div className="hero-v1-eyebrow cf-rise">
            New. <i>Built to your print.</i>
          </div>
          <h1 className="cf-rise cf-rise--delay-1">
            Fasteners for the
            <br />
            next generation of <span className="accent-blue">building.</span>
          </h1>
          <p className="hero-v1-sub cf-rise cf-rise--delay-2">
            Industrial and structural fasteners engineered for construction, infrastructure, power
            generation, and heavy manufacturing — in stock, fully certified.
          </p>
          <div className="hero-v1-ctas cf-rise cf-rise--delay-3">
            <Link href="/quote" className="cf-pill cf-pill--blue">
              Request a Quote
            </Link>
            <Link href="/products" className="cf-link">
              Browse products
            </Link>
          </div>
        </div>
        <div className="hero-v1-image cf-rise cf-rise--delay-3">
          <Image
            src="/assets/hero-construction.jpg"
            alt="Tower crane and curtain-wall construction at dusk"
            width={2000}
            height={1333}
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="hero-v1-image-specs">
            <div>
              <strong>In stock</strong>Heavy hex · A325 · B7
            </div>
            <div>
              <strong>Cut to length</strong>Studs · rod · anchors
            </div>
            <div>
              <strong>Full traceability</strong>MTRs · heat lots
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-band">
        <div className="stat-cell">
          <div className="stat-num">
            24<span style={{ fontSize: "0.55em" }}>hr</span>
          </div>
          <div className="stat-label">Quote turnaround, every order.</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num stat-num-blue">±.0005″</div>
          <div className="stat-label">CNC tolerance capability.</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num">
            100<span style={{ fontSize: "0.55em" }}>%</span>
          </div>
          <div className="stat-label">Full traceability and certification.</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num stat-num-purple">USA</div>
          <div className="stat-label">Same-day domestic shipping.</div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="logos-strip">
        <div className="logos-track">
          {[1, 2].map((pass) => (
            <Logos key={pass} ariaHidden={pass === 2} />
          ))}
        </div>
      </section>

      {/* INDUSTRIAL FASTENERS — split (image left, alt bg) */}
      <section className="split split--alt">
        <div className="split-image">
          <Image
            src="/assets/product-industrial.png"
            alt="Industrial hex bolt and nut"
            width={1536}
            height={1016}
            quality={95}
            sizes="(max-width: 1000px) 90vw, 600px"
          />
        </div>
        <div className="split-text">
          <div className="feat-eyebrow">Industrial Fasteners</div>
          <h2>
            Every grade,
            <br />
            every environment.
          </h2>
          <p>
            The full catalog of industrial fasteners — heavy hex bolts, socket head cap screws,
            flange bolts, and ASTM A193 bolting for pressure, piping, and heavy equipment.
          </p>
          <ul>
            <li><strong>A193 B7, B16, B8, B8M</strong><span>Alloy / stainless</span></li>
            <li><strong>Heavy hex &amp; flange bolts</strong><span>Grade 5, 8, A490</span></li>
            <li><strong>Socket head cap screws</strong><span>1960-series alloy</span></li>
            <li><strong>Hot-dip galvanized</strong><span>F2329 &amp; mechanical</span></li>
          </ul>
          <div>
            <Link href="/industrial-fasteners" className="cf-link">Shop industrial fasteners</Link>
          </div>
        </div>
      </section>

      {/* STRUCTURAL — full-bleed feature */}
      <section className="feat">
        <div className="feat-eyebrow">Structural Fasteners</div>
        <h2>
          A325, A490, TC bolts.
          <br />
          Engineered for the moment.
        </h2>
        <p>
          Steel-to-steel connections, beam-column joints, and critical structural applications across
          construction and infrastructure — in stock and ready to ship.
        </p>
        <div className="feat-ctas">
          <Link href="/structural-fasteners" className="cf-link">Learn more</Link>
          <Link href="/spec-library" className="cf-link" style={{ color: "var(--ink)" }}>View specs</Link>
        </div>
        <div className="feat-image">
          <Image
            src="/assets/product-structural.png"
            alt="A325 hex bolt render"
            width={1469}
            height={889}
            quality={95}
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
        </div>
      </section>

      {/* ANCHOR BOLTS — split */}
      <section className="split split--anchor">
        <div className="split-image">
          <Image
            src="/assets/product-anchor.png"
            alt="Headed anchor bolt with nut and template plate"
            width={1587}
            height={1258}
            quality={95}
            sizes="(max-width: 1000px) 90vw, 600px"
          />
        </div>
        <div className="split-text">
          <div className="feat-eyebrow">Anchor Bolts</div>
          <h2>
            F1554. Headed. Bent.
            <br />
            Built right.
          </h2>
          <p>
            From F1554 Grade 36 to A193 B7 and B8M — full assemblies with nuts, washers, and template
            plates. Large-diameter and non-standard lengths in stock.
          </p>
          <ul>
            <li><strong>F1554 Grade 36, 55, 105</strong><span>Standard</span></li>
            <li><strong>A193 B7, B8M</strong><span>Alloy / stainless</span></li>
            <li><strong>Custom bends &amp; lengths</strong><span>Built to print</span></li>
          </ul>
          <div>
            <Link href="/anchor-bolts" className="cf-link">Shop anchor bolts</Link>
          </div>
        </div>
      </section>

      {/* STUD BOLTS & THREADED ROD — split reversed */}
      <section className="split split--reverse split--alt">
        <div className="split-image">
          <Image
            src="/assets/dbl-end-stud.png"
            alt="Double-end stud bolt render"
            width={678}
            height={443}
            quality={95}
            sizes="(max-width: 1000px) 90vw, 600px"
          />
        </div>
        <div className="split-text">
          <div className="feat-eyebrow">Stud Bolts &amp; Threaded Rod</div>
          <h2>
            Cut to length.
            <br />
            Specified to print.
          </h2>
          <p>
            Double-end stud bolts for flanged connections and threaded rod in every grade, length,
            and finish — from ASTM B7 studs for petrochem to B8M stainless for offshore service.
          </p>
          <ul>
            <li><strong>A193 B7 / B16 studs</strong><span>Alloy, heat-treated</span></li>
            <li><strong>A193 B8 / B8M studs</strong><span>304 / 316 stainless</span></li>
            <li><strong>Threaded rod</strong><span>A307, B7, stainless, coated</span></li>
            <li><strong>Custom lengths</strong><span>Cut &amp; chamfered in-house</span></li>
          </ul>
          <div>
            <Link href="/stud-bolts-threaded-rod" className="cf-link">Shop stud bolts &amp; rod</Link>
          </div>
        </div>
      </section>

      {/* LINDAPTER HOLLO-BOLT — specialty / partner product */}
      <section className="specialty">
        <div className="specialty-inner">
          <div className="specialty-text">
            <div className="specialty-partner">Lindapter · Authorized Distributor</div>
            <h2>
              Hollo-Bolt.
              <br />
              Structural steel,
              <br />
              fastened from <i>one side.</i>
            </h2>
            <p className="specialty-lede">
              The expansion bolt engineered for hollow structural sections and blind connections —
              where you can only reach one face of the steel. No welding, no through-holes, fully
              reversible.
            </p>
            <div className="specialty-specs">
              <div className="specialty-spec">
                <div className="specialty-spec-label">Sizes</div>
                <div className="specialty-spec-val">M8 – M20 · 5/16″ to 3/4″</div>
              </div>
              <div className="specialty-spec">
                <div className="specialty-spec-label">Finishes</div>
                <div className="specialty-spec-val">Zinc · HDG · 316SS</div>
              </div>
              <div className="specialty-spec">
                <div className="specialty-spec-label">Access</div>
                <div className="specialty-spec-val">One-side only</div>
              </div>
              <div className="specialty-spec">
                <div className="specialty-spec-label">Approvals</div>
                <div className="specialty-spec-val">ICC-ES · CE · LABC</div>
              </div>
            </div>
            <div className="specialty-ctas">
              <Link href="/quote" className="cf-pill cf-pill--blue">Request Hollo-Bolt quote</Link>
              <Link href="/hollo-bolt" className="cf-link">View Lindapter catalog</Link>
            </div>
          </div>
          <div className="specialty-image">
            <div className="specialty-image-tag">Lindapter Hollo-Bolt · Hex · Countersunk · Flush-fit</div>
            <Image
              src="/assets/products/hollo-bolt-trio.png"
              alt="Lindapter Hollo-Bolt hex, countersunk, and flush-fit expansion bolts"
              className="specialty-image-hero"
              width={3165}
              height={1899}
              quality={95}
              sizes="(max-width: 860px) 100vw, 600px"
            />
          </div>
        </div>
      </section>

      {/* CNC DARK HERO */}
      <section className="cnc-hero">
        <div className="cnc-hero-content">
          <div className="cnc-hero-eyebrow">CNC Machining</div>
          <h2>
            Precision parts.
            <br />
            Built to your <i>print.</i>
          </h2>
          <p>
            In-house five-axis milling, live-tooling lathes, and full CMM inspection. From one
            prototype to thousands of parts — you&apos;re working directly with the manufacturer.
          </p>
          <Link href="/cnc-machining" className="cf-pill cf-pill--purple">
            Explore CNC Machining
          </Link>
          <div className="cnc-hero-image">
            <Img
              src="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/ebb260c4-0354-4eba-85bf-9f171517486a/CNC-LIVETOOLING-LATHE-001.jpg"
              alt="CNC lathe"
            />
          </div>
          <div className="cnc-hero-spec-grid">
            <CncSpecCell label="Tolerance" value="±0.0005″" />
            <CncSpecCell label="Lead time" value="3–5 days" />
            <CncSpecCell label="Materials" value="Ti · Inconel · PEEK" />
            <CncSpecCell label="Inspection" value="CMM + Laser" />
          </div>
        </div>
      </section>

      {/* INDUSTRIES TILES */}
      <section className="industries">
        <div className="industries-header">
          <h2>Industries we keep moving.</h2>
          <p>
            From data centers to substations, we show up with the parts that critical projects
            actually need.
          </p>
        </div>
        <div className="industry-grid">
          <IndustryTile
            href="/industries/construction"
            num="01"
            name="Construction"
            title="High-rise steel and data-center framing."
            desc="Structural fasteners for commercial, industrial, and institutional steel erection — from moment connections to large-scale facilities."
            img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/1e76177d-d96a-4d9d-8931-3f7d049e12d7/construction.jpg"
          />
          <IndustryTile
            href="/industries/power-generation"
            num="02"
            name="Power Generation"
            title="Energy meeting tomorrow's demand."
            desc="High-temperature and high-pressure fasteners for gas turbines, steam systems, and renewable installations at unprecedented scale."
            img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/1df61635-d95e-47b3-ba2b-633da74f8021/AdobeStock_170240857.jpeg"
          />
          <IndustryTile
            href="/industries/infrastructure"
            num="03"
            name="Infrastructure"
            title="Bridges, rail, and long-service civil work."
            desc="Long-service-life fasteners for bridges, highways, rail systems, and the critical civil projects connecting everything together."
            img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/261f100b-3496-48f2-b1ee-245eca151e58/AdobeStock_753784784.jpeg"
          />
          <IndustryTile
            href="/industries/manufacturing"
            num="04"
            name="Manufacturing"
            title="High-output facilities, no downtime."
            desc="Precision-aligned fasteners for heavy machinery, production lines, and fabricated steel assemblies — the parts that keep production running."
            img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/606418c4-1057-49ac-821b-ce572774f5b9/AdobeStock_731342733.jpeg"
          />
          <IndustryTile
            href="/industries/power-transmission"
            num="05"
            name="Power Transmission"
            title="The grid, carrying increasing loads."
            desc="Fasteners for substations, transmission towers, and distribution networks being upgraded to meet surging capacity requirements."
            img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/79392af3-9542-4258-987d-76124ceec2f3/AdobeStock_182646517.jpeg"
          />
          <IndustryTile
            href="/industries/oil-gas"
            num="06"
            name="Oil, Gas & Chemical"
            title="Corrosion-resistant, high-pressure service."
            desc="Upstream, midstream, downstream, and chemical processing — engineered for extreme temperatures, pressures, and harsh service environments."
            img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/dcbe43bd-d8ab-4d13-afff-b45c323f0ade/AdobeStock_71932049.jpeg"
          />
        </div>
      </section>

      {/* SPEC BUILDER */}
      <section className="spec-feat">
        <div className="spec-feat-inner">
          <div className="spec-feat-text">
            <div className="feat-eyebrow">Material Spec Builder</div>
            <h2>
              Find your
              <br />
              material in
              <br />
              four steps.
            </h2>
            <p>
              Answer a few questions about your application, environment, and strength requirement.
              We&apos;ll narrow thousands of grades down to the handful that actually fit your project.
            </p>
            <SpecBuilderTrigger className="cf-pill cf-pill--purple">
              Open Spec Builder
            </SpecBuilderTrigger>
          </div>
          <div className="spec-feat-viz">
            <div className="spec-feat-viz-head">
              <span>
                <strong>Material Spec Builder</strong>
              </span>
              <span>Step 2 of 4</span>
            </div>
            <div className="spec-feat-step spec-feat-step--done">
              <div className="spec-step-num">✓</div>
              <div className="spec-step-label">Application</div>
              <div className="spec-step-value">Structural connection</div>
            </div>
            <div className="spec-feat-step spec-feat-step--active">
              <div className="spec-step-num">2</div>
              <div className="spec-step-label">Operating environment</div>
              <div className="spec-step-value">Marine, coastal…</div>
            </div>
            <div className="spec-feat-step">
              <div className="spec-step-num">3</div>
              <div className="spec-step-label">Strength requirement</div>
              <div className="spec-step-value" />
            </div>
            <div className="spec-feat-step">
              <div className="spec-step-num">4</div>
              <div className="spec-step-label">Material constraints</div>
              <div className="spec-step-value" />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL QUOTE CTA */}
      <section className="quote-cta">
        <div className="quote-cta-eyebrow">Get Started</div>
        <h2>
          Let&apos;s get you
          <br />
          a quote.
        </h2>
        <p>
          Every quote gets personal attention from our team. Upload your drawings and we&apos;ll
          respond within 24 hours.
        </p>
        <div className="quote-cta-ctas">
          <Link href="/quote" className="cf-pill cf-pill--blue">
            Request a Quote
          </Link>
          <a href="tel:7077413277" className="cf-link">
            Call 707.741.3277
          </a>
        </div>
        <div className="quote-cta-meta">
          No account required · 24-hour response · USA-manufactured
        </div>
      </section>

      <CfFooter />
    </>
  );
}

function Logos({ ariaHidden }: { ariaHidden: boolean }) {
  const items: Array<{ brand: string; src: string; alt: string; ext: string }> = [
    { brand: "spacex", src: "spacex", alt: "SpaceX", ext: "webp" },
    { brand: "chevron", src: "chevron", alt: "Chevron", ext: "webp" },
    { brand: "pge", src: "pge", alt: "PG&E", ext: "webp" },
    { brand: "rocketlab", src: "rocketlab", alt: "Rocket Lab", ext: "webp" },
    { brand: "emcor", src: "emcor", alt: "EMCOR", ext: "webp" },
    { brand: "primoris", src: "primoris", alt: "PSC Primoris", ext: "webp" },
    { brand: "bechtel", src: "bechtel", alt: "Bechtel", ext: "png" },
    { brand: "kiewit", src: "kiewit", alt: "Kiewit", ext: "png" },
  ];
  return (
    <>
      {items.map((logo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${logo.brand}-${ariaHidden ? "b" : "a"}`}
          className={`logo-mark logo-mark--${logo.brand}`}
          src={`/assets/logos/${logo.src}.${logo.ext}`}
          alt={ariaHidden ? "" : logo.alt}
          aria-hidden={ariaHidden || undefined}
        />
      ))}
    </>
  );
}

function CncSpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="cnc-spec-cell">
      <div className="cnc-spec-cell-label">{label}</div>
      <div className="cnc-spec-cell-val">{value}</div>
    </div>
  );
}

function IndustryTile({
  href,
  num,
  name,
  title,
  desc,
  img,
}: {
  href: string;
  num: string;
  name: string;
  title: string;
  desc: string;
  img: string;
}) {
  return (
    <Link href={href} className="industry-tile">
      <div className="industry-tile-img">
        <Img src={img} alt="" />
      </div>
      <div className="industry-tile-body">
        <div className="industry-tile-eyebrow">
          {num} — {name}
        </div>
        <div className="industry-tile-title">{title}</div>
        <div className="industry-tile-desc">{desc}</div>
      </div>
      <span className="industry-tile-link">Learn more</span>
    </Link>
  );
}
