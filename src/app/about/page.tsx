import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-about.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";

export const metadata: Metadata = {
  title: "About — California Fastener",
  description:
    "California Fastener is a family-owned California fastener and industrial supply company — anchor bolts, structural and industrial fasteners, CNC machined parts, and the everyday hardware your projects run on.",
};

export default function AboutPage() {
  return (
    <>
      <CfNav active="about" />

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div>
            <div className="about-hero-eyebrow">About California Fastener</div>
            <h1>
              Built to spec.
              <br />
              Shipped on time.
              <br />
              Made <i>here.</i>
            </h1>
            <p className="about-hero-lede">
              A family-owned California fastener and industrial supply company — anchor bolts,
              structural and industrial fasteners, CNC machined parts, and the everyday hardware your
              projects run on.
            </p>
          </div>
        </div>
      </section>

      {/* FACILITY MARQUEE */}
      <section className="facility-marquee">
        <div className="facility-marquee-placeholder">
          [ shop floor / facility hero photo — 21:9 ]
        </div>
        <div className="facility-marquee-caption">
          <div>
            <strong>Benicia, California</strong> — manufacturing &amp; distribution
          </div>
          <div>38°02′N · 122°08′W</div>
        </div>
      </section>

      {/* STORY */}
      <section className="about-section">
        <div className="about-section-inner">
          <div className="story-grid">
            <div className="story-text">
              <div className="about-section-eyebrow">Our Story</div>
              <h2>A fastener company that picks up the phone.</h2>
              <p>
                California Fastener is a family-owned and operated fastener and industrial supply
                company in the Bay Area. For more than a decade we’ve supplied the screws, bolts,
                nuts, washers, anchors, and specialty hardware that a wide range of industries depend
                on.
              </p>
              <p>
                We built the business on long-term relationships, not one-off transactions — the best
                products, honest pricing, and service that actually picks up the phone. We stock
                current, dependable hardware from leading manufacturers, and back it with in-house
                CNC machining for the custom parts a catalog can’t cover.
              </p>
              <p>
                Need it fast? Orders placed before 3 PM PST ship the same day. And whether it’s one
                specialty bolt or a full bill of materials, you’re working with knowledgeable people
                who know the inventory and stand behind it.
              </p>
            </div>
            <div className="story-image">
              <div className="ph-stripes">
                [ founder / floor portrait
                <br />
                4:5 placeholder ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="about-section about-section--alt">
        <div className="about-section-inner">
          <div className="about-section-eyebrow">How we work</div>
          <div className="pillars-head">
            <h2>
              Four commitments
              <br />
              we keep <i>every order.</i>
            </h2>
            <p>
              The basics are simple, and we hold ourselves to them on every line item — whether it’s
              one Hollo-Bolt or a thousand-piece anchor assembly run.
            </p>
          </div>
          <div className="pillars-grid">
            <div className="pillar">
              <div className="pillar-num">01 / Stocked</div>
              <h3>If we list it, we have it.</h3>
              <p>
                Real inventory of the grades and sizes critical projects actually use — not a virtual
                catalog of someone else’s stock.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar-num">02 / Certified</div>
              <h3>Full traceability, every order.</h3>
              <p>
                Mill test reports, heat numbers, and lot traceability included by default.
                Domestic-only certs available on request.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar-num">03 / Direct</div>
              <h3>You’re talking to the maker.</h3>
              <p>
                The CNC shop is in our building. The person quoting your job is the one routing it
                through the floor.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar-num">04 / On time</div>
              <h3>24-hour quote. Honest lead times.</h3>
              <p>
                We don’t pad our dates and we don’t promise what we can’t ship. If a job is tight,
                we’ll tell you up front.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="about-section about-section--dark">
        <div className="about-section-inner">
          <div className="about-section-eyebrow">By the numbers</div>
          <div className="numbers-head">
            <h2>
              The shop, in <i>round numbers.</i>
            </h2>
            <p>
              A snapshot of what’s in the building, what we ship, and what we hold to. We’ll keep
              this honest as we grow.
            </p>
          </div>
          <div className="numbers-grid">
            <div className="number-cell">
              <div className="number-num">
                24<span>hr</span>
              </div>
              <div className="number-label">Average quote turnaround on a standard request.</div>
            </div>
            <div className="number-cell">
              <div className="number-num">
                <i>±.0005</i>
                <span>″</span>
              </div>
              <div className="number-label">CNC tolerance capability — production, not best-case.</div>
            </div>
            <div className="number-cell">
              <div className="number-num">
                100<span>%</span>
              </div>
              <div className="number-label">
                Orders shipped with mill test reports and traceability.
              </div>
            </div>
            <div className="number-cell">
              <div className="number-num">
                3<span>pm</span>
              </div>
              <div className="number-label">Order cutoff for same-day shipping, Monday–Friday.</div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDARDS & COMPLIANCE */}
      <section className="about-section about-section--alt">
        <div className="about-section-inner">
          <div className="about-section-eyebrow">Standards &amp; Compliance</div>
          <div className="cap-head">
            <h2>
              We supply to the spec —
              <br />
              and prove it on paper.
            </h2>
            <p>
              Across every industry we serve, hardware ships to a recognized standard with the
              documentation to match. A working list of the specifications and provenance
              requirements we routinely supply and certify to.
            </p>
          </div>
          <div className="certs-grid">
            <div className="cert-col">
              <h3>Structural &amp; Industrial</h3>
              <ul>
                <li>ASTM A325 / A490 / F3125</li>
                <li>ASTM F1554 Gr 36/55/105</li>
                <li>ASTM A193 B7/B8M · A194</li>
                <li>SAE J429 Grade 5 &amp; 8</li>
              </ul>
            </div>
            <div className="cert-col">
              <h3>Stainless, Alloy &amp; Specialty</h3>
              <ul>
                <li>ASTM F593 / F594 stainless</li>
                <li>ASTM A320 L7 low-temp</li>
                <li>ISO 898-1 metric properties</li>
                <li>Silicon bronze · duplex 2205</li>
              </ul>
            </div>
            <div className="cert-col">
              <h3>Aerospace &amp; Defense</h3>
              <ul>
                <li>NAS · MS · AN standards</li>
                <li>AMS material specifications</li>
                <li>A286 · Titanium · Inconel 718</li>
                <li>Hi-Lok / lockbolt systems</li>
              </ul>
            </div>
            <div className="cert-col">
              <h3>Provenance &amp; Documentation</h3>
              <ul>
                <li>DFARS 252.225 domestic melt</li>
                <li>Buy America (23 CFR 635.410)</li>
                <li>NACE MR0175 sour service</li>
                <li>Full MTRs · heat &amp; lot trace</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="about-section">
        <div className="about-section-inner">
          <div className="about-section-eyebrow">Capabilities</div>
          <div className="cap-head">
            <h2>
              What we make
              <br />
              and what we stock.
            </h2>
            <p>
              A working summary — for the long form, see the products and CNC pages. If you need
              something that isn’t here, ask. Most “custom” jobs are routine for us.
            </p>
          </div>
          <div className="cap-grid">
            <div className="cap-col">
              <h3>Fasteners</h3>
              <ul>
                <li>
                  <strong>Anchor bolts</strong>
                  <span>F1554 Gr 36/55/105 · A193 B7, B8M</span>
                </li>
                <li>
                  <strong>Structural bolts</strong>
                  <span>A325, A490, TC bolts</span>
                </li>
                <li>
                  <strong>Industrial / heavy hex</strong>
                  <span>Grade 5, 8 · A193 bolting</span>
                </li>
                <li>
                  <strong>Stud bolts &amp; threaded rod</strong>
                  <span>B7, B16, B8, B8M · cut to length</span>
                </li>
                <li>
                  <strong>U-bolts</strong>
                  <span>Standard &amp; custom profiles</span>
                </li>
                <li>
                  <strong>Stainless steel</strong>
                  <span>304, 316, duplex</span>
                </li>
                <li>
                  <strong>Silicon bronze</strong>
                  <span>Marine &amp; architectural</span>
                </li>
                <li>
                  <strong>Specialty / Lindapter</strong>
                  <span>Hollo-Bolt, girder clamps</span>
                </li>
              </ul>
            </div>
            <div className="cap-col">
              <h3>CNC &amp; In-House Manufacturing</h3>
              <ul>
                <li>
                  <strong>5-axis milling</strong>
                  <span>±0.0005″ tolerance</span>
                </li>
                <li>
                  <strong>Live-tooling lathes</strong>
                  <span>Bar &amp; chuck work</span>
                </li>
                <li>
                  <strong>Custom anchor bolt assemblies</strong>
                  <span>Headed, bent, with template plates</span>
                </li>
                <li>
                  <strong>Cut-to-length threaded rod</strong>
                  <span>Chamfered in-house</span>
                </li>
                <li>
                  <strong>Materials</strong>
                  <span>Carbon, alloy, stainless, Ti, Inconel, PEEK</span>
                </li>
                <li>
                  <strong>Inspection</strong>
                  <span>CMM + laser, full first-article</span>
                </li>
                <li>
                  <strong>Documentation</strong>
                  <span>MTRs, heat numbers, PPAP on request</span>
                </li>
                <li>
                  <strong>Lead time</strong>
                  <span>Standard CNC: 3–5 days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section className="about-section about-section--alt">
        <div className="about-section-inner">
          <div className="about-section-eyebrow">Visit / Contact</div>
          <div className="cap-head">
            <h2>
              Drop by the shop
              <br />
              or pick up the phone.
            </h2>
            <p>
              We’re a real address with real hours. Walk-ins welcome — call ahead if you’re driving
              more than an hour and we’ll have someone meet you.
            </p>
          </div>
          <div className="visit-grid">
            <div className="visit-text">
              <h2 style={{ fontSize: 32 }}>California Fastener — Benicia HQ</h2>
              <p>
                Manufacturing, distribution, and CNC machining under one roof. Twenty minutes from
                the Bay Bridge, one block off I-680.
              </p>
              <div className="visit-info">
                <div className="visit-info-row">
                  <div className="visit-info-label">Address</div>
                  <div className="visit-info-val">
                    465 Industrial Way, Ste A
                    <br />
                    Benicia, CA 94510
                  </div>
                </div>
                <div className="visit-info-row">
                  <div className="visit-info-label">Toll-free</div>
                  <div className="visit-info-val">
                    <a href="tel:18337073278">833.707.FAST</a>
                  </div>
                </div>
                <div className="visit-info-row">
                  <div className="visit-info-label">Local</div>
                  <div className="visit-info-val">
                    <a href="tel:17077413277">707.741.3277</a>
                  </div>
                </div>
                <div className="visit-info-row">
                  <div className="visit-info-label">Email</div>
                  <div className="visit-info-val">
                    <a href="mailto:info@californiafastener.com">info@californiafastener.com</a>
                  </div>
                </div>
                <div className="visit-info-row">
                  <div className="visit-info-label">Hours</div>
                  <div className="visit-info-val">Mon–Fri · 8:30 AM – 4:30 PM PT</div>
                </div>
              </div>
            </div>
            <div className="visit-map" aria-label="Map of California showing Benicia">
              <svg
                className="visit-map-svg"
                viewBox="0 0 400 480"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="mapgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#DCD9D0" strokeWidth="0.5" opacity="0.6" />
                  </pattern>
                </defs>
                <rect width="400" height="480" fill="#EFECE2" />
                <rect width="400" height="480" fill="url(#mapgrid)" />
                {/* stylized California outline (simplified) */}
                <path
                  d="M 130 30 L 175 35 L 200 60 L 215 90 L 230 130 L 260 165 L 280 200 L 290 235 L 305 275 L 320 320 L 335 360 L 340 400 L 320 440 L 290 460 L 250 455 L 220 430 L 195 395 L 175 360 L 160 320 L 150 280 L 140 240 L 120 210 L 105 180 L 95 145 L 100 100 L 115 60 Z"
                  fill="#FBFAF7"
                  stroke="#DCD9D0"
                  strokeWidth="1.5"
                />
                {/* coastline shading */}
                <path
                  d="M 130 30 L 115 60 L 100 100 L 95 145 L 105 180 L 120 210 L 140 240 L 150 280 L 160 320 L 175 360 L 195 395 L 220 430 L 250 455"
                  fill="none"
                  stroke="#5FA8FF"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                {/* bay area / inland */}
                <circle cx="208" cy="220" r="5" fill="#A4A4A9" opacity="0.5" />
                <text x="216" y="224" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#77777C" letterSpacing="0.5">SF</text>
                <circle cx="245" cy="240" r="4" fill="#A4A4A9" opacity="0.5" />
                <text x="252" y="244" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#77777C" letterSpacing="0.5">SAC</text>
                <circle cx="268" cy="350" r="4" fill="#A4A4A9" opacity="0.5" />
                <text x="275" y="354" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#77777C" letterSpacing="0.5">FRESNO</text>
                <circle cx="225" cy="430" r="4" fill="#A4A4A9" opacity="0.5" />
                <text x="180" y="447" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#77777C" letterSpacing="0.5">LOS ANGELES</text>
                {/* coordinate ticks */}
                <text x="12" y="20" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill="#A4A4A9" letterSpacing="0.5">42°N</text>
                <text x="12" y="240" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill="#A4A4A9" letterSpacing="0.5">38°N</text>
                <text x="12" y="465" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill="#A4A4A9" letterSpacing="0.5">33°N</text>
              </svg>
              <div className="visit-map-pin" style={{ top: "46%", left: "55%" }}>
                <div className="visit-map-pin-dot" />
                <div className="visit-map-pin-label">Benicia, CA · 465 Industrial Way</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-section-eyebrow" style={{ marginBottom: 24 }}>
          Get in touch
        </div>
        <h2>
          Send us a print.
          <br />
          We’ll send you a quote.
        </h2>
        <p>
          Every quote gets a real person. Drawings, specs, even a back-of-napkin sketch — we’ll work
          with what you have.
        </p>
        <div className="about-cta-ctas">
          <Link href="/quote" className="cf-pill cf-pill--blue">
            Request a Quote
          </Link>
          <a href="tel:18337073278" className="cf-pill about-cta-ghost">
            Call 833.707.FAST
          </a>
        </div>
        <div className="about-cta-meta">
          <strong>24-hour response</strong> · No account required · USA-manufactured
        </div>
      </section>

      <CfFooter />
    </>
  );
}
