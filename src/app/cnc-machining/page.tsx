import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-cnc.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { CncQuoteForm } from "@/components/CncQuoteForm";

export const metadata: Metadata = {
  title: "Custom CNC Machining — 24-Hour Quote",
  description:
    "Custom CNC machining for fasteners and components. Tight tolerances to ±0.0005″, 5-axis turning and milling, full in-house inspection. Upload your drawing for a 24-hour quote.",
};

export default function CncMachiningPage() {
  return (
    <>
      {/* Utility bar */}
      <div className="cnc-util">
        <div className="cnc-util-inner">
          <div className="cnc-util-left">
            USA-made · <i>24-hour quotes</i> · Prototype in 3–5 days · ISO-ready documentation
          </div>
          <a className="cnc-util-phone" href="tel:+17077413277">
            (707) 741-3277
          </a>
        </div>
      </div>

      <CfNav />

      {/* HERO */}
      <section className="cnc-h">
        <div className="cnc-h-inner">
          <div>
            <div className="cnc-h-eyebrow">
              Precision CNC. <i>Prototype to production.</i>
            </div>
            <h1>
              Custom CNC machining
              <br />
              for fasteners &amp; <span className="accent">components.</span>
            </h1>
            <p className="cnc-h-sub">
              Tight tolerances to ±0.0005″, 5-axis turning and milling, full in-house inspection.
              Upload your drawing and get a quote back within one business day.
            </p>

            <ul className="cnc-h-bullets">
              <BulletRow>
                <strong>24-hour quotes.</strong> Every RFQ gets personal engineering review — not an
                auto-reply.
              </BulletRow>
              <BulletRow>
                <strong>±0.0005″ tolerances</strong> with full CMM + 3D laser scan inspection and
                GD&amp;T support.
              </BulletRow>
              <BulletRow>
                <strong>USA-made.</strong> Full traceability from raw material to finished part;
                ITAR-aware workflows.
              </BulletRow>
              <BulletRow>
                Alloy &amp; stainless steel, aluminum, titanium, Inconel, Delrin, PEEK,
                brass/copper.
              </BulletRow>
            </ul>

            <div className="cnc-h-ctas">
              <a href="#quote" className="cf-pill cf-pill--purple-deep">
                Upload drawing &amp; get quote
              </a>
              <a href="tel:+17077413277" className="cf-link">
                Or call (707) 741-3277
              </a>
            </div>
            <div className="cnc-h-assure">
              Typical response: under 4 business hours · Accepts STEP, IGES, PDF, DWG, DXF
            </div>
          </div>

          <CncQuoteForm />
        </div>
      </section>

      {/* Trust strip */}
      <section className="cnc-trust">
        <div className="cnc-trust-label">Trusted by global leaders</div>
        <div className="cnc-trust-logos">
          <span className="cnc-logo">SpaceX</span>
          <span className="cnc-logo">Chevron</span>
          <span className="cnc-logo">PG&amp;E</span>
          <span className="cnc-logo">Rocket Lab</span>
          <span className="cnc-logo">EMCOR</span>
          <span className="cnc-logo">Primoris</span>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="cnc-section">
        <div className="cnc-section-head">
          <div className="cnc-section-eyebrow">Why engineers &amp; buyers choose us</div>
          <h2 className="cnc-section-h">
            Precision parts. <i>Built to your print.</i>
          </h2>
          <p className="cnc-section-sub">
            We specialize in precision CNC machined fasteners and components — built to your print,
            with in-house inspection and supply chain transparency.
          </p>
        </div>
        <div className="cnc-values">
          <Value
            num={
              <>
                24<span className="sm">hr</span>
              </>
            }
            title="24-hour quotes"
            desc="Every RFQ gets personal engineering review. Response typically in under 4 business hours."
          />
          <Value
            num="±.0005″"
            numClass="cnc-value-num--purple"
            title="Tight tolerances"
            desc="GD&T support. Full CMM + 3D laser scan inspection on every critical feature."
          />
          <Value
            num="USA"
            title="Made & traceable"
            desc="Full material traceability from mill to finished part. ITAR-aware workflows, MTRs on request."
          />
          <Value
            num={
              <>
                3–5<span className="sm">days</span>
              </>
            }
            numClass="cnc-value-num--blue"
            title="Prototype → production"
            desc="Prototypes fast, then scale on the same equipment and tooling — no retooling risk."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cnc-section cnc-section--alt">
        <div className="cnc-section-inner">
          <div className="cnc-section-head">
            <div className="cnc-section-eyebrow">How it works</div>
            <h2 className="cnc-section-h">
              Drawing to delivered,
              <br />
              in <i>four steps.</i>
            </h2>
            <p className="cnc-section-sub">
              Most first-time buyers see a quote within one business day, and parts in hand inside
              three weeks.
            </p>
          </div>
          <div className="cnc-steps">
            <Step num="STEP 01" title="Upload your print." desc="Drop in a STEP, IGES, DWG, DXF, or PDF. Include tolerances, material, and quantity." />
            <Step num="STEP 02" title="Engineer reviews." desc="A CNC engineer checks machinability, suggests DFM tweaks, and prices the run." />
            <Step num="STEP 03" title="Prototype in 3–5 days." desc="First article inspection with CMM and 3D laser scan report, delivered with the parts." />
            <Step num="STEP 04" title="Scale to production." desc="Repeat orders on the same tooling with locked-in pricing and lead times." />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="cnc-section">
        <div className="cnc-section-head">
          <div className="cnc-section-eyebrow">Capabilities</div>
          <h2 className="cnc-section-h">
            Built for <i>precision.</i>
          </h2>
          <p className="cnc-section-sub">
            Multi-axis turning and milling, live tooling, and in-house metrology under one roof.
          </p>
        </div>
        <div className="cnc-caps">
          <Cap
            tag="CNC Turning"
            title="High-speed precision for cylindrical parts."
            items={[
              "Multi-axis lathes with live tooling",
              "Shafts, bushings, custom fasteners & studs",
              "Tight concentricity & surface finishes",
            ]}
          />
          <Cap
            tag="CNC Milling"
            title="5-axis milling for complex geometries."
            items={[
              "Micron-level accuracy, complex 3D contours",
              "Single-setup parts reduce stack-up error",
              "Prototype through high-volume production",
            ]}
          />
          <Cap
            tag="Inspection"
            title="CMM + 3D laser scan, in-house."
            items={[
              "Full GD&T verification and reporting",
              "Reverse engineering & legacy duplication",
              "First-article inspection on every prototype",
            ]}
          />
        </div>

        <div className="cnc-materials-wrap">
          <div className="cnc-materials-head">Materials we machine every day</div>
          <div className="cnc-chips">
            <span className="cnc-chip">Alloy Steel (B7, B16)</span>
            <span className="cnc-chip">Stainless (304 / 316 / 17-4 PH)</span>
            <span className="cnc-chip">Aluminum (6061 / 7075)</span>
            <span className="cnc-chip">Titanium (Gr 2, Ti-6Al-4V)</span>
            <span className="cnc-chip">Inconel 625 / 718</span>
            <span className="cnc-chip">Brass &amp; Copper</span>
            <span className="cnc-chip">Delrin</span>
            <span className="cnc-chip">PEEK</span>
            <span className="cnc-chip">ABS</span>
          </div>
        </div>
      </section>

      {/* HELPER + TESTIMONIAL */}
      <section className="cnc-section cnc-section--alt">
        <div className="cnc-section-inner">
          <div className="cnc-split">
            <div className="cnc-helper">
              <h3>What to include in your RFQ.</h3>
              <p className="cnc-helper-lede">
                The more of these you include, the faster and tighter your quote comes back.
              </p>
              <ul className="cnc-helper-grid">
                <li>Part drawing or STEP / IGES file</li>
                <li>Material grade &amp; specification</li>
                <li>Critical tolerances &amp; GD&amp;T callouts</li>
                <li>Target quantity</li>
                <li>Needed-by date / rush flag</li>
                <li>Finishing (plating, anodize, passivation)</li>
                <li>Required certs (MTRs, PPAP, ITAR)</li>
                <li>Packaging or kitting requirements</li>
              </ul>
            </div>
            <aside className="cnc-testi">
              <div className="cnc-testi-mark">&ldquo;</div>
              <p>
                California Fastener turned our drawings into prototypes in under a week, then
                scaled to production without a hiccup. Their inspection reports saved us a full
                round of engineering review.
              </p>
              <cite>
                <strong>Mechanical Design Lead</strong>
                Aerospace program · customer reference available on request
              </cite>
            </aside>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cnc-cta">
        <div className="cnc-cta-inner">
          <div className="cnc-cta-eyebrow">Get Started</div>
          <h2>
            Ready for a <i>24-hour quote?</i>
          </h2>
          <p>Upload your drawing now, or call and talk to an engineer in under five minutes.</p>
          <div className="cnc-cta-ctas">
            <a href="#quote" className="cf-pill cf-pill--blue-light">
              Get my quote
            </a>
            <a href="tel:+17077413277" className="cf-pill cf-pill--ghost-dark">
              Call (707) 741-3277
            </a>
          </div>
          <div className="cnc-cta-meta">
            No account required · Typical reply in under 4 business hours · USA-manufactured
          </div>
        </div>
      </section>

      <CfFooter />
    </>
  );
}

function BulletRow({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function Value({
  num,
  numClass,
  title,
  desc,
}: {
  num: React.ReactNode;
  numClass?: string;
  title: string;
  desc: string;
}) {
  const cls = numClass ? `cnc-value-num ${numClass}` : "cnc-value-num";
  return (
    <div className="cnc-value">
      <div className={cls}>{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="cnc-step">
      <div className="cnc-step-num">{num}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function Cap({ tag, title, items }: { tag: string; title: string; items: string[] }) {
  return (
    <div className="cnc-cap">
      <div className="cnc-cap-tag">{tag}</div>
      <h3>{title}</h3>
      <ul>
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
