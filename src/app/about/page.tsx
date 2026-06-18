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
                  <pattern id="mapgrid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#E0DCD1" strokeWidth="0.5" opacity="0.6" />
                  </pattern>
                  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#E4F1F8" />
                    <stop offset="1" stopColor="#CCE4F2" />
                  </linearGradient>
                  <filter id="pinShadow" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1C52A3" floodOpacity="0.4" />
                  </filter>
                  <filter id="cardShadow" x="-30%" y="-30%" width="160%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1D1D1F" floodOpacity="0.14" />
                  </filter>
                </defs>

                {/* land base + faint blueprint grid */}
                <rect width="400" height="480" fill="#F3F0E8" />
                <rect width="400" height="480" fill="url(#mapgrid)" />

                {/* open space / parkland (Benicia Community Park, Jack London Park) */}
                <g fill="#E7EADC">
                  <path d="M 14 90 C 64 78 112 84 126 118 C 136 152 124 192 94 202 C 54 214 20 196 12 158 C 6 132 8 106 14 90 Z" />
                  <path d="M 288 110 C 322 102 352 110 362 136 C 368 160 356 186 328 190 C 302 194 284 178 282 152 C 281 134 282 118 288 110 Z" />
                </g>

                {/* water — Lake Herman (north), Carquinez Strait (south) + slough (east) */}
                <g stroke="#A6CFE8" strokeWidth="1">
                  <ellipse cx="248" cy="42" rx="34" ry="15" fill="url(#water)" />
                  <path d="M 0 432 C 52 420 100 428 152 421 C 208 413 252 426 302 417 C 342 410 372 416 400 410 L 400 480 L 0 480 Z" fill="url(#water)" />
                  <path d="M 400 240 C 358 260 344 296 355 340 C 362 374 380 400 400 414 L 400 240 Z" fill="url(#water)" />
                </g>
                <path d="M 0 432 C 52 420 100 428 152 421 C 208 413 252 426 302 417 C 342 410 372 416 400 410" fill="none" stroke="#F1F8FC" strokeWidth="1.4" opacity="0.8" />
                <g fill="#EAF4FB">
                  <ellipse cx="372" cy="300" rx="11" ry="18" />
                  <ellipse cx="150" cy="452" rx="16" ry="7" />
                </g>

                {/* roads — casings (under), then fills (over) for clean intersections */}
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <g stroke="#DCD7CC" strokeWidth="3">
                    <path d="M 150 206 C 178 199 208 204 236 214" />
                    <path d="M 160 252 C 190 247 220 251 248 261" />
                    <path d="M 236 214 C 240 262 235 312 226 352" />
                    <path d="M 86 300 L 168 286" />
                  </g>
                  <path d="M 138 74 C 132 150 142 222 158 296 C 166 332 176 350 186 366" stroke="#D4CEC1" strokeWidth="4" />
                  <path d="M 322 14 C 300 70 270 132 248 194 C 232 242 214 302 208 352 C 205 396 200 442 196 480" stroke="#ABBACE" strokeWidth="8" />
                  <path d="M 2 286 C 72 306 130 320 168 342 C 186 352 198 354 208 360" stroke="#ABBACE" strokeWidth="7.5" />
                </g>
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <g stroke="#FBFAF7" strokeWidth="1.5">
                    <path d="M 150 206 C 178 199 208 204 236 214" />
                    <path d="M 160 252 C 190 247 220 251 248 261" />
                    <path d="M 236 214 C 240 262 235 312 226 352" />
                    <path d="M 86 300 L 168 286" />
                  </g>
                  <path d="M 138 74 C 132 150 142 222 158 296 C 166 332 176 350 186 366" stroke="#FCFBF8" strokeWidth="2" />
                  <path d="M 322 14 C 300 70 270 132 248 194 C 232 242 214 302 208 352 C 205 396 200 442 196 480" stroke="#F4F8FC" strokeWidth="4.6" />
                  <path d="M 2 286 C 72 306 130 320 168 342 C 186 352 198 354 208 360" stroke="#F4F8FC" strokeWidth="4.2" />
                </g>

                {/* downtown Benicia street grid (SW waterfront) */}
                <g fill="none" stroke="#DCD7CC" strokeWidth="1.1" strokeLinecap="round">
                  <path d="M 30 392 L 118 376" />
                  <path d="M 36 408 L 120 392" />
                  <path d="M 44 424 L 122 408" />
                  <path d="M 54 388 L 60 420" />
                  <path d="M 78 384 L 84 416" />
                  <path d="M 102 380 L 108 412" />
                </g>

                {/* Benicia–Martinez bridge ticks where I-680 crosses the strait */}
                <g stroke="#ABBACE" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="200" y1="420" x2="212" y2="419" />
                  <line x1="197" y1="440" x2="209" y2="439" />
                  <line x1="195" y1="460" x2="207" y2="459" />
                </g>

                {/* interstate shields */}
                <g>
                  <g filter="url(#cardShadow)">
                    <rect x="213" y="136" width="27" height="19" rx="4" fill="#1C52A3" />
                    <rect x="213" y="136" width="27" height="6" rx="4" fill="#2C66BD" />
                  </g>
                  <text x="226.5" y="151" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fontWeight="700" fill="#fff">680</text>
                  <g filter="url(#cardShadow)">
                    <rect x="72" y="314" width="27" height="19" rx="4" fill="#1C52A3" />
                    <rect x="72" y="314" width="27" height="6" rx="4" fill="#2C66BD" />
                  </g>
                  <text x="85.5" y="329" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fontWeight="700" fill="#fff">780</text>
                </g>

                {/* place labels */}
                <g fontFamily="ui-monospace, Menlo, monospace" letterSpacing="0.5">
                  <text x="248" y="44" textAnchor="middle" fontSize="8" fill="#6B8FA6">LAKE HERMAN</text>
                  <text x="74" y="446" fontSize="9.5" fontWeight="700" fill="#6B6B70">BENICIA</text>
                  <text x="318" y="446" textAnchor="middle" fontSize="8" fill="#6B8FA6">CARQUINEZ STRAIT</text>
                  <text x="300" y="168" textAnchor="middle" fontSize="7.5" fill="#9A9A9F">VALERO REFINERY</text>
                </g>

                {/* compass, scale bar, corner crop marks (spec-sheet flavor) */}
                <g fontFamily="ui-monospace, Menlo, monospace">
                  <path d="M 372 16 L 376 29 L 372 26 L 368 29 Z" fill="#7E7E83" />
                  <text x="372" y="42" textAnchor="middle" fontSize="8" fill="#7E7E83">N</text>
                  <g stroke="#A4A09A" strokeWidth="1.5">
                    <line x1="24" y1="462" x2="74" y2="462" />
                    <line x1="24" y1="459" x2="24" y2="465" />
                    <line x1="74" y1="459" x2="74" y2="465" />
                  </g>
                  <text x="49" y="456" textAnchor="middle" fontSize="7.5" fill="#A4A09A">1 MI</text>
                </g>
                <g stroke="#B7B2A8" strokeWidth="1" strokeLinecap="round" fill="none">
                  <path d="M 12 24 L 12 12 L 24 12" />
                  <path d="M 388 24 L 388 12 L 376 12" />
                  <path d="M 12 456 L 12 468 L 24 468" />
                  <path d="M 388 456 L 388 468 L 376 468" />
                </g>

                {/* location pin — 465 Industrial Way */}
                <g>
                  <circle cx="190" cy="216" r="8" fill="none" stroke="#1C52A3" strokeWidth="1.5">
                    <animate attributeName="r" values="8;28" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.55;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="190" cy="216" r="7.5" fill="#1C52A3" stroke="#fff" strokeWidth="3" filter="url(#pinShadow)" />
                  <g filter="url(#cardShadow)">
                    <path d="M 184 231 L 196 231 L 190 224 Z" fill="#fff" />
                    <rect x="110" y="231" width="160" height="33" rx="6" fill="#fff" stroke="#EAE7E1" strokeWidth="1" />
                  </g>
                  <text x="190" y="246" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9.5" fontWeight="700" letterSpacing="0.4" fill="#1D1D1F">465 INDUSTRIAL WAY</text>
                  <text x="190" y="258" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="7.5" letterSpacing="0.6" fill="#8A8A8F">38.07° N · 122.13° W</text>
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
