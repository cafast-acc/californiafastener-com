import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-anchor-bolts.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { Img } from "@/components/Img";

export const metadata: Metadata = {
  title: "Anchor Bolts — F1554, A193, F593",
  description:
    "F1554 Gr 36/55/105, A193 B7/B8/B8M, F593. Headed, bent, rod assemblies, post-install. Custom cut, bent, and assembled with template plates — stocked and shipped.",
};

export default function AnchorBoltsPage() {
  return (
    <>
      <CfNav />

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-inner">
          <div className="ab-hero-text">
            <div className="ab-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/products">Products</Link>
              <span>/</span>
              Anchor Bolts
            </div>
            <div className="ab-eyebrow">Anchor Bolts</div>
            <h1>
              Anchor bolts for
              <br />
              <i>every foundation.</i>
            </h1>
            <p className="ab-hero-sub">
              F1554, A193, A36, and F593 anchor bolts in every grade, length, and configuration —
              headed, bent, straight rod, and full assemblies with nuts, washers, and template plates.
            </p>
            <div className="ab-hero-ctas">
              <Link href="/quote" className="cf-pill cf-pill--blue">
                Request a Quote
              </Link>
              <a href="#configurations" className="cf-link">
                View configurations ↓
              </a>
            </div>
            <div className="ab-hero-stats">
              <HeroStat val="24 hr" label="Quote turnaround" />
              <HeroStat val="Custom" label="Cut-to-length" />
              <HeroStat val="Full" label="Assemblies & kits" />
              <HeroStat val="USA" label="Stocked & shipped" />
            </div>
          </div>
          <div className="ab-hero-image">
            <div className="ab-hero-image-tag">F1554 · Anchor Rod Assembly</div>
            <Img
              src="/assets/products/anchor-rod-render.png"
              alt="F1554 anchor rod assembly with heavy hex nuts and square plate washers"
            />
          </div>
        </div>
      </section>

      {/* VALUE / WHY CF */}
      <section className="ab-values">
        <div className="ab-values-inner">
          <div className="ab-values-lead">
            <h2>
              Hardware is only
              <br />
              half the <i>job.</i>
            </h2>
            <p>
              Most anchor jobs go sideways on the soft stuff — the wrong bend radius, a missing
              template plate, a delivery that misses the pour date. We sort that out.
            </p>
          </div>
          <div className="ab-values-grid">
            <Value
              num="01"
              title="Extensive inventory"
              desc="From F1554 to A193, we stock a wide range of anchor bolt grades, styles, and diameters — ready to ship."
            />
            <Value
              num="02"
              title="Complete assemblies"
              desc="Nuts, washers, and template plates banded with the bolts — one kit per anchor location, not a parts puzzle."
            />
            <Value
              num="03"
              title="Custom fabrication"
              desc="Custom threading, lengths, materials, and coatings — bent rod, drilled rod, swedged ends, oversize diameters."
            />
            <Value
              num="04"
              title="Quick turnaround"
              desc="Most quotes turn around within 24 hours. Stock items ship same day; cut and bent assemblies in days, not weeks."
            />
          </div>
        </div>
      </section>

      {/* CONFIGURATIONS */}
      <section className="ab-types" id="configurations">
        <div className="ab-types-header">
          <div className="eyebrow">Multiple configurations &amp; head styles</div>
          <h2>
            Multiple anchor types.
            <br />
            <i>One supplier.</i>
          </h2>
          <p>
            From forged headed anchors for heavy structural connections to post-install retrofits in
            hardened concrete — every configuration stocked or fabricated to your print.
          </p>
        </div>
        <div className="ab-types-grid">
          <TypeCard
            pnum="01 / Headed"
            img="/assets/anchor-headed-hires.png"
            imgAlt="Headed anchor bolt with hex nut and washer"
            title="Headed anchors"
            desc="Forged hex head with a full body for tension and pull-out loads. The default anchor for column bases and equipment skids."
            metaBold="F1554 Gr 36 / 55 / 105"
            metaRest=" · A449 · A193 B7"
          />
          <TypeCard
            pnum="02 / Rods & assemblies"
            img="/assets/products/anchor-rod-render.png"
            imgAlt="F1554 anchor rod assembly with hex nuts and square plate washers"
            title="Anchor rods & assemblies"
            desc="Anchor rod assemblies with the heavy hex nut, plate washer, and matched coatings shipped together — banded per location so the crew grabs one bag, not five."
            metaBold="F1554 Gr 55 / 105"
            metaRest=" · A193 B7 · Double-end & swedged"
          />
          <TypeCard
            pnum="03 / Bent"
            img="/assets/products/anchor-bent-render.png"
            imgAlt="L-bent anchor rod with heavy hex nut and washer"
            title="Bent anchors"
            desc="J-bolts and L-bolts for column anchorage and equipment bases. Standard 4D bend radius or custom to your drawing."
            metaBold="F1554 Gr 36"
            metaRest=" · L-bend · J-bend · Custom"
          />
          <TypeCard
            pnum="04 / Post-install"
            img="/assets/anchor-postinstall-hires.png"
            imgAlt="Post-install anchor with wedge and threaded rod components"
            title="Post-install anchors"
            descNode={
              <>
                Wedge, sleeve, and epoxy anchors for hardened concrete — retrofits, base-plate
                repairs, equipment additions to existing pads.
              </>
            }
            metaNode={
              <>
                <b>Hilti</b> · <b>Simpson Strong-Tie</b> · Wedge, sleeve, epoxy
              </>
            }
          />
        </div>
      </section>

      {/* GRADES */}
      <section className="ab-grades" id="grades">
        <div className="ab-grades-inner">
          <div className="ab-grades-header">
            <h2>
              All material grades,
              <br />
              one <i>catalog.</i>
            </h2>
            <p>
              ASTM F1554, A193, and F593 in every grade and configuration — carbon, alloy, and
              stainless covered.
            </p>
          </div>
          <div className="ab-grades-cards">
            <GradeCard
              spec="ASTM F1554"
              img="/assets/products/anchor-f1554-carbon-render.png"
              imgAlt="F1554 structural carbon anchor rod with heavy hex nut and square plate washer"
              title="Structural carbon"
              desc="Weldable low-carbon and heat-treated alloy anchor bar. The go-to spec for cast-in-place structural anchorage."
              grades={["Grade 36", "Grade 55", "Grade 105"]}
            />
            <GradeCard
              spec="ASTM A193"
              img="/assets/products/anchor-a193-b8-render.png"
              imgAlt="A193 B8 stainless anchor rod render"
              title="High-temp alloy & SS"
              desc="Chrome-moly and stainless bar for pressure equipment, turbine skids, and corrosion-critical anchorage."
              grades={["Grade B7", "Grade B8", "Grade B8M"]}
            />
            <GradeCard
              spec="ASTM F593"
              img="/assets/products/anchor-f593-render.png"
              imgAlt="F593 stainless steel anchor bolt render"
              title="Stainless anchors"
              desc="304 and 316 stainless anchor bolts for food-grade, marine, wastewater, and architectural applications."
              grades={["304 SS", "316 SS"]}
            />
          </div>
        </div>
      </section>

      {/* FULL ASSEMBLIES */}
      <section className="ab-bend">
        <div className="ab-bend-inner">
          <div className="ab-bend-text">
            <div className="eyebrow">Full anchor bolt assemblies</div>
            <h2>
              More than bolts.
              <br />
              <i>Complete</i> assemblies.
            </h2>
            <p>
              Nuts, washers, and template plates supplied with the bolts. Show up to the pour with
              one banded kit per location, not a parts puzzle.
            </p>
            <ul className="ab-bend-checks">
              <li>Nuts &amp; washers — standard or heavy-duty</li>
              <li>Square plate washers for pull-out resistance &amp; load distribution</li>
              <li>Pre-drilled template plates for precise alignment</li>
              <li>Custom threading, lengths, and specialty coatings</li>
              <li>Hot-dip galvanized after fabrication, no thread damage</li>
            </ul>
            <Link href="/quote" className="cf-pill cf-pill--purple">
              Request an assembly
            </Link>
          </div>
          <div className="ab-bend-visual">
            <Img
              src="/assets/products/anchor-f1554-render.png"
              alt="F1554 anchor rod with heavy hex nut and square plate washer, head end"
            />
            <div className="ab-bend-visual-tag">Full assembly · Rod + hex nuts + plate washer</div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="ab-apps">
        <div className="ab-apps-inner">
          <div className="ab-apps-header">
            <h2>Applications of anchor bolts.</h2>
            <p>
              Where the foundation has to hold — structural steel, industrial equipment, civil
              infrastructure, and utility-scale renewables.
            </p>
          </div>
          <div className="ab-apps-grid">
            <AppTile
              href="/industries/construction"
              num="01"
              eyebrow="Construction"
              title="Structural steel columns, beams & framing."
              desc="Base plate anchorage for moment frames, braced frames, and gravity columns."
              img="/assets/ind-construction-facade.jpg"
            />
            <AppTile
              href="/industries/manufacturing"
              num="02"
              eyebrow="Industrial machinery"
              title="Heavy equipment & machine bases."
              desc="Holding-down bolts for presses, mills, compressors, and production lines."
              img="/assets/ind-manufacturing.jpg"
            />
            <AppTile
              href="/industries/infrastructure"
              num="03"
              eyebrow="Infrastructure"
              title="Bridges, highways, tunnels."
              desc="Long-service-life HDG and stainless anchors for seismic and wind loading."
              img="/assets/ind-infrastructure.webp"
            />
            <AppTile
              href="/industries/power-generation"
              num="04"
              eyebrow="Renewable energy"
              title="Wind turbines & solar foundations."
              desc="Large-diameter anchor assemblies engineered for utility-scale generation."
              img="/assets/ind-power-generation.webp"
            />
          </div>
        </div>
      </section>

      {/* TEMPLATE PLATES — full-bleed dark */}
      <section className="ab-plates">
        <div className="ab-plates-inner">
          <div className="ab-plates-text">
            <div className="eyebrow">Don&apos;t forget your…</div>
            <h2>
              Template <i>plates.</i>
            </h2>
            <p>
              Template plates hold the bolt pattern in position during the pour — spacing, alignment,
              and elevation locked in before concrete goes down.
            </p>
            <p style={{ maxWidth: "480px" }}>
              Hot-rolled or laser-cut to your bolt pattern. Reusable on repeat-pattern jobs, one-off
              for custom layouts.
            </p>
            <div style={{ display: "flex", gap: "18px", marginTop: "12px", flexWrap: "wrap" }}>
              <Link href="/quote" className="cf-pill cf-pill--blue-light">
                Talk to a person
              </Link>
              <a href="tel:+17077413277" className="cf-pill cf-pill--ghost-dark">
                707.741.3277
              </a>
            </div>
          </div>
          <div className="ab-plates-image">
            <Img
              src="/assets/template-plate.webp"
              alt="Steel anchor bolt template plate with pre-drilled pattern"
            />
          </div>
        </div>
      </section>

      {/* SPEC LIBRARY */}
      <section className="ab-spec-lib">
        <div className="ab-spec-lib-inner">
          <div>
            <h2>Visit our specification library.</h2>
            <p>
              Plain-English reference for the ASTM, SAE, and ISO standards the trade actually calls
              out — material chemistry, mechanical properties, finish callouts.
            </p>
            <Link href="/spec-library" className="cf-pill cf-pill--blue">
              Learn more
            </Link>
          </div>
          <div className="ab-spec-lib-visual">
            <div>
              <b>A193</b>High-temp bolting material
            </div>
            <div>
              <b>A307</b>Carbon steel bolts
            </div>
            <div>
              <b>A320</b>Low-temp bolting
            </div>
            <div>
              <b>A449</b>Quenched &amp; tempered
            </div>
            <div>
              <b>F1554</b>Anchor bolt spec
            </div>
            <div>
              <b>F3125</b>Structural bolts
            </div>
            <div>
              <b>F593</b>Stainless fasteners
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="ab-partners">
        <div className="ab-partners-inner">
          <div className="ab-partners-label">Authorized distributor</div>
          <div className="ab-partners-logos">
            <span className="ab-partner ab-partner--hilti">HILTI</span>
            <span className="ab-partner ab-partner--simpson">
              <span>SIMPSON</span>
              <span>Strong-Tie</span>
            </span>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <div className="ab-cta-eyebrow">Request a quote</div>
          <h2>
            Send the bolt schedule.
            <br />
            We&apos;ll send the <i>kit.</i>
          </h2>
          <p>
            From one F1554 Gr 36 to a thousand-piece HDG assembly run with template plates —
            we&apos;ve shipped the package before.
          </p>
          <div className="ab-cta-ctas">
            <Link href="/quote" className="cf-pill cf-pill--blue-light">
              Request a Quote
            </Link>
            <a href="tel:+17077413277" className="cf-pill cf-pill--ghost-dark">
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
      <div className="ab-hero-stat-val">{val}</div>
      <div className="ab-hero-stat-label">{label}</div>
    </div>
  );
}

function Value({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="ab-value">
      <h3 data-num={num}>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function TypeCard({
  pnum,
  img,
  imgAlt,
  title,
  desc,
  descNode,
  metaBold,
  metaRest,
  metaNode,
}: {
  pnum: string;
  img: string;
  imgAlt: string;
  title: string;
  desc?: string;
  descNode?: React.ReactNode;
  metaBold?: string;
  metaRest?: string;
  metaNode?: React.ReactNode;
}) {
  return (
    <div className="ab-type-card">
      <div className="ab-type-card-photo">
        <span className="pnum">{pnum}</span>
        <Img src={img} alt={imgAlt} />
      </div>
      <div className="ab-type-card-body">
        <h3>{title}</h3>
        <p>{descNode ?? desc}</p>
        <div className="ab-type-meta">
          {metaNode ?? (
            <>
              <b>{metaBold}</b>
              {metaRest}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function GradeCard({
  spec,
  img,
  imgAlt,
  title,
  desc,
  grades,
}: {
  spec: string;
  img: string;
  imgAlt: string;
  title: string;
  desc: string;
  grades: string[];
}) {
  return (
    <div className="ab-grade-card">
      <div className="ab-grade-card-img">
        <Img src={img} alt={imgAlt} />
      </div>
      <div className="ab-grade-card-body">
        <div className="ab-grade-card-spec">{spec}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <ul className="ab-grade-list">
          {grades.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AppTile({
  href,
  num,
  eyebrow,
  title,
  desc,
  img,
}: {
  href: string;
  num: string;
  eyebrow: string;
  title: string;
  desc: string;
  img: string;
}) {
  return (
    <Link href={href} className="ab-app-tile">
      <Img src={img} alt="" />
      <div className="ab-app-tile-body">
        <div className="ab-app-tile-eyebrow">
          {num} — {eyebrow}
        </div>
        <div className="ab-app-tile-title">{title}</div>
        <div className="ab-app-tile-desc">{desc}</div>
      </div>
    </Link>
  );
}
