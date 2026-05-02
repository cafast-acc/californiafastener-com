import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-anchor-bolts.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { Img } from "@/components/Img";

export const metadata: Metadata = {
  title: "Anchor Bolts",
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
              Durable, reliable anchor bolts in a range of materials, specifications, styles, and
              configurations — engineered to secure your project&apos;s foundation.
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
            <div className="ab-hero-image-tag">F1554 · Headed Anchor Assembly</div>
            <Img
              src="/assets/anchor-headed.webp"
              alt="F1554 headed anchor bolt with hex nut and washer"
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
              At California Fastener we provide high-quality anchor bolts with the service and
              support that make projects finish on schedule.
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
              desc="Nuts, washers, and template plates supplied with the bolts for a ready-to-install solution."
            />
            <Value
              num="03"
              title="Custom fabrication"
              desc="Tailored bolts for any unique application — custom threading, lengths, specialty materials, and coatings."
            />
            <Value
              num="04"
              title="Quick turnaround"
              desc="Fast and efficient delivery to meet your project deadlines. Most quotes turn around within 24 hours."
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
            img="/assets/anchor-headed.webp"
            imgAlt="Headed anchor bolt with hex nut and washer"
            title="Headed anchors"
            desc="Designed for structural connections. Forged hex head makes them reliable for heavy-duty applications where tension and pull-out are critical."
            metaBold="F1554 Gr 36 / 55 / 105"
            metaRest=" · A449 · A193 B7"
          />
          <TypeCard
            pnum="02 / Rods & assemblies"
            img="/assets/anchor-rods.webp"
            imgAlt="Anchor rod with double-end threading, nuts, and square plate washer"
            title="Anchor rods & assemblies"
            desc="Customizable rods and full assemblies to meet the specific needs of diverse structural projects — strength and versatility with every part shipped together."
            metaBold="F1554 Gr 55 / 105"
            metaRest=" · A193 B7 · Double-end & swedged"
          />
          <TypeCard
            pnum="03 / Bent"
            img="/assets/anchor-bent.webp"
            imgAlt="L-bent anchor bolt with hex nut"
            title="Bent anchors"
            desc="Ideal for foundational stability, our J-bolts and L-bolts are crafted for securing structural columns and equipment bases. Custom bend radius to your drawing."
            metaBold="F1554 Gr 36"
            metaRest=" · L-bend · J-bend · Custom"
          />
          <TypeCard
            pnum="04 / Post-install"
            img="/assets/anchor-postinstall.webp"
            imgAlt="Post-install anchor with wedge and threaded rod components"
            title="Post-install anchors"
            descNode={
              <>
                Suitable for retrofitting applications, post-install anchors are effective for use in
                hardened concrete or modern construction demands.
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
              A comprehensive selection designed to meet rigorous industry standards — ASTM F1554,
              A193, and F593 in every grade and configuration.
            </p>
          </div>
          <div className="ab-grades-cards">
            <GradeCard
              spec="ASTM F1554"
              img="/assets/stamp-105.webp"
              imgAlt="CA 105 head stamp on F1554 Grade 105 anchor bolt"
              title="Structural carbon"
              desc="Weldable low-carbon and heat-treated alloy anchor bar. The go-to spec for cast-in-place structural anchorage."
              grades={["Grade 36", "Grade 55", "Grade 105"]}
            />
            <GradeCard
              spec="ASTM A193"
              img="/assets/stamp-b8.webp"
              imgAlt="CA B8 stamp on A193 B8 stainless anchor rod"
              title="High-temp alloy & SS"
              desc="Chrome-moly and stainless bar for pressure equipment, turbine skids, and corrosion-critical anchorage."
              grades={["Grade B7", "Grade B8", "Grade B8M"]}
            />
            <GradeCard
              spec="ASTM F593"
              img="/assets/stamp-316.webp"
              imgAlt="CA 316 head stamp on F593 316 stainless anchor"
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
              A secure anchoring system requires more than just bolts. We supply every component as
              part of a complete assembly so your project is streamlined, efficient, and built to
              last.
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
              src="/assets/anchor-rods.webp"
              alt="Full anchor bolt assembly with rod, heavy hex nuts, and square plate washer"
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
              Trusted across industries where the foundation matters — structural steel, industrial
              equipment, critical infrastructure, and utility-scale renewables.
            </p>
          </div>
          <div className="ab-apps-grid">
            <AppTile
              href="/industries/construction"
              num="01"
              eyebrow="Construction"
              title="Structural steel columns, beams & framing."
              desc="Base plate anchorage for moment frames, braced frames, and gravity columns."
              img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/1e76177d-d96a-4d9d-8931-3f7d049e12d7/construction.jpg"
            />
            <AppTile
              href="/industries/manufacturing"
              num="02"
              eyebrow="Industrial machinery"
              title="Heavy equipment & machine bases."
              desc="Holding-down bolts for presses, mills, compressors, and production lines."
              img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/606418c4-1057-49ac-821b-ce572774f5b9/AdobeStock_731342733.jpeg"
            />
            <AppTile
              href="/industries/infrastructure"
              num="03"
              eyebrow="Infrastructure"
              title="Bridges, highways, tunnels."
              desc="Long-service-life HDG and stainless anchors for seismic and wind loading."
              img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/261f100b-3496-48f2-b1ee-245eca151e58/AdobeStock_753784784.jpeg"
            />
            <AppTile
              href="/industries/power-generation"
              num="04"
              eyebrow="Renewable energy"
              title="Wind turbines & solar foundations."
              desc="Large-diameter anchor assemblies engineered for utility-scale generation."
              img="https://images.squarespace-cdn.com/content/v1/5efbb68d03da3677c3455ba6/1df61635-d95e-47b3-ba2b-633da74f8021/AdobeStock_170240857.jpeg"
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
              Anchor bolt template plates ensure accurate bolt placement and easy installation. These
              plates maintain proper spacing and alignment, preventing installation errors and
              reducing setup time.
            </p>
            <p style={{ maxWidth: "440px" }}>
              Made from high-strength steel, built for durability and reliability on construction,
              industrial, and infrastructure projects.
            </p>
            <div style={{ display: "flex", gap: "18px", marginTop: "12px", flexWrap: "wrap" }}>
              <Link href="/quote" className="cf-pill cf-pill--blue-light">
                Talk to a person
              </Link>
              <a href="tel:7077413277" className="cf-pill cf-pill--ghost-dark">
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
              A comprehensive resource for fastener specifications across the industries we service —
              access standards, material guides, and technical resources.
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
            More than hardware.
            <br />A <i>building partner.</i>
          </h2>
          <p>
            You&apos;re not just purchasing hardware — you&apos;re gaining a partner dedicated to your
            project&apos;s success. Submit your quote request and secure the strength and reliability
            only California Fastener can deliver.
          </p>
          <div className="ab-cta-ctas">
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
