import type { Metadata } from "next";
import Image from "next/image";
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
        <Image
          src="/assets/about-storefront.png"
          alt="California Fastener headquarters at 465 Industrial Way, Benicia"
          fill
          preload
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
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
              <Image
                src="/assets/about-cnc.webp"
                alt="Precision CNC-machined bolts on the shop floor at California Fastener"
                fill
                quality={90}
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
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
            <div
              className="visit-map"
              aria-label="Map of Benicia, California showing California Fastener at 465 Industrial Way, just off Interstate 680"
            >
              <svg
                className="visit-map-svg"
                viewBox="0 0 400 480"
                preserveAspectRatio="xMidYMid slice"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>California Fastener — 465 Industrial Way, Benicia, CA, off I-680</title>
                <defs>
                  <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DEDACF" strokeWidth="0.5" opacity="0.5" />
                  </pattern>
                  <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1C52A3" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* land base + faint blueprint grid */}
                <rect width="400" height="480" fill="#F3F0E8" />
                <rect width="400" height="480" fill="url(#mapgrid)" />

                {/* open space / parkland (Benicia Community Park, Jack London Park) */}
                <path
                  d="M 14 92 C 62 80 110 86 124 118 C 134 150 124 190 96 200 C 56 212 22 196 14 160 C 8 134 8 108 14 92 Z"
                  fill="#E6E9DC"
                />
                <path
                  d="M 286 112 C 320 104 350 112 360 138 C 366 162 354 188 326 192 C 300 196 282 180 280 154 C 279 136 280 120 286 112 Z"
                  fill="#E6E9DC"
                />

                {/* water — Lake Herman (north), Carquinez Strait (south) + slough (east) */}
                <ellipse cx="248" cy="44" rx="34" ry="15" fill="#D7E9F4" stroke="#A8D0EA" strokeWidth="1" />
                <path
                  d="M 0 432 C 52 420 100 428 152 421 C 208 413 252 426 302 417 C 342 410 372 416 400 410 L 400 480 L 0 480 Z"
                  fill="#D7E9F4"
                  stroke="#A8D0EA"
                  strokeWidth="1"
                />
                <path
                  d="M 400 244 C 360 262 346 296 356 338 C 363 372 380 398 400 412 L 400 244 Z"
                  fill="#D7E9F4"
                  stroke="#A8D0EA"
                  strokeWidth="1"
                />
                <ellipse cx="364" cy="318" rx="14" ry="22" fill="#E9F3FA" />

                {/* secondary streets */}
                <g fill="none" stroke="#D3CFC3" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M 138 74 C 132 150 142 222 158 296 C 166 332 176 350 186 366" />
                  <path d="M 150 206 C 178 199 208 204 236 214" />
                  <path d="M 160 252 C 190 247 220 251 248 261" />
                  <path d="M 236 214 C 240 262 235 312 226 352" />
                  <path d="M 86 300 L 168 286" />
                </g>

                {/* downtown Benicia street grid (SW waterfront) */}
                <g fill="none" stroke="#D3CFC3" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M 30 392 L 118 376" />
                  <path d="M 36 408 L 120 392" />
                  <path d="M 44 424 L 122 408" />
                  <path d="M 54 388 L 60 420" />
                  <path d="M 78 384 L 84 416" />
                  <path d="M 102 380 L 108 412" />
                </g>

                {/* Interstate 680 (NE → Benicia–Martinez Bridge) */}
                <path
                  d="M 322 14 C 300 70 270 132 248 194 C 232 242 214 302 208 352 C 205 396 200 442 196 480"
                  fill="none"
                  stroke="#9DB2CC"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                {/* Interstate 780 (W → interchange) */}
                <path
                  d="M 2 286 C 72 306 130 320 168 342 C 186 352 198 354 208 360"
                  fill="none"
                  stroke="#9DB2CC"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* highway shields */}
                <g>
                  <rect x="214" y="138" width="26" height="17" rx="3.5" fill="#1C52A3" />
                  <text x="227" y="150.5" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fontWeight="700" fill="#fff">680</text>
                  <rect x="74" y="316" width="26" height="17" rx="3.5" fill="#1C52A3" />
                  <text x="87" y="328.5" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fontWeight="700" fill="#fff">780</text>
                </g>

                {/* place labels */}
                <g fontFamily="ui-monospace, Menlo, monospace" letterSpacing="0.5">
                  <text x="248" y="46" textAnchor="middle" fontSize="8" fill="#6E91A8">LAKE HERMAN</text>
                  <text x="74" y="448" fontSize="9" fill="#77777C" fontWeight="700">BENICIA</text>
                  <text x="318" y="448" textAnchor="middle" fontSize="8" fill="#6E91A8">CARQUINEZ STRAIT</text>
                  <text x="300" y="170" textAnchor="middle" fontSize="7.5" fill="#9A9A9F">VALERO REFINERY</text>
                </g>

                {/* compass + scale bar (spec-sheet flavor) */}
                <g fontFamily="ui-monospace, Menlo, monospace" fill="#A4A09A">
                  <path d="M 372 18 L 376 30 L 372 27 L 368 30 Z" fill="#86868B" />
                  <text x="372" y="42" textAnchor="middle" fontSize="8" fill="#86868B">N</text>
                  <line x1="24" y1="462" x2="74" y2="462" stroke="#A4A09A" strokeWidth="1.5" />
                  <line x1="24" y1="459" x2="24" y2="465" stroke="#A4A09A" strokeWidth="1.5" />
                  <line x1="74" y1="459" x2="74" y2="465" stroke="#A4A09A" strokeWidth="1.5" />
                  <text x="49" y="456" textAnchor="middle" fontSize="7.5">1 MI</text>
                </g>

                {/* location pin — 465 Industrial Way */}
                <g>
                  <circle cx="190" cy="216" r="8" fill="none" stroke="#1C52A3" strokeWidth="1.5">
                    <animate attributeName="r" values="8;28" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.55;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="190" cy="216" r="7.5" fill="#1C52A3" stroke="#fff" strokeWidth="3" filter="url(#pinShadow)" />
                  <rect x="113" y="232" width="154" height="22" rx="5" fill="#fff" stroke="#E6E4DF" strokeWidth="1" />
                  <text x="190" y="246.5" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9.5" fontWeight="700" letterSpacing="0.4" fill="#1D1D1F">465 INDUSTRIAL WAY</text>
                  <text x="190" y="272" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" letterSpacing="0.6" fill="#86868B">38.07° N · 122.13° W</text>
                </g>
              </svg>
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
