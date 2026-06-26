import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, IBM_Plex_Mono } from "next/font/google";

import "@/styles/cf-catalog.css";
import { CATALOG, GALLERY, type Section } from "@/lib/catalog/data";
import { PrintButton } from "@/components/catalog/PrintButton";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product Catalog — 2026",
  description:
    "The full California Fastener line, by section — bolts, threaded rod, nuts, washers, sockets, anchors, materials, machine shop, and Lindapter. 28,000+ SKUs, cut in-house. Save as PDF.",
  alternates: { canonical: "/catalog" },
};

const B = CATALOG.brand;

/** Render a content string that may contain inline <em>/<b> and HTML entities. */
function html(s: string) {
  return { dangerouslySetInnerHTML: { __html: s } };
}

function Foot({ left, right }: { left: string; right: string }) {
  return (
    <div className="foot">
      <span {...html(left)} />
      <span>{right}</span>
    </div>
  );
}

function ProductPage({ s }: { s: Section }) {
  return (
    <article className="page">
      <div className="frame">
        <div className="top">
          <span>
            <b>{s.eyebrow}</b>
          </span>
          <span>{s.page}</span>
        </div>
        <div className="sect-head">
          <div className="sect-l">
            <h1 className="sect-h" {...html(s.title)} />
            <p className="sect-lede" {...html(s.lede)} />
          </div>
        </div>
        <div className="cards">
          {s.families.map((f) => (
            <div className="card" key={f.i}>
              <div className="card-top">
                <h3 className="card-n" {...html(f.n)} />
                <span className="card-i">{f.i}</span>
              </div>
              <div className="card-tags">
                {f.s.map((t, i) => (
                  <span className="ctag" key={i} {...html(t)} />
                ))}
              </div>
              <ul className="card-items">
                {f.items.map((it, i) => (
                  <li key={i} {...html(it)} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        {s.render ? (
          <figure className="fig-band">
            {/* Seamless baked render — render as-is, object-fit: contain. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/catalog/${s.render}`} alt="" />
          </figure>
        ) : null}
        <Foot left={`California Fastener · <b>${s.foot}</b>`} right={s.page} />
      </div>
    </article>
  );
}

export default function CatalogPage() {
  return (
    <div className={`cat-doc ${manrope.variable} ${plexMono.variable}`}>
      <div className="cat-toolbar">
        <Link href="/" className="cat-toolbar__brand">
          California Fastener · <em>Contrast</em> · 14 pp.
        </Link>
        <div className="cat-toolbar__actions">
          <Link href="/" className="cat-toolbar__back">
            ← Back to site
          </Link>
          <PrintButton />
        </div>
      </div>

      <main className="cat-book">
        {/* 01 COVER */}
        <article className="page cv">
          <div className="frame">
            <div className="top" style={{ alignItems: "center" }}>
              <span>
                <b>●</b> {B.name}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cv-logo" src="/assets/catalog/logo-white.png" alt="California Fastener" />
            </div>
            <h1 className="cv-h">
              Fasteners for the <em>Next Generation</em> of Building.
            </h1>
            <p className="cv-sub">
              Bolts, nuts, washers, threaded rod — and the answers to your spec sheet. Out of
              Benicia, California.
            </p>
            <div className="cv-chips">
              <span className="cv-chip">28,000+ SKUs</span>
              <span className="cv-chip">Cut in-house</span>
              <span className="cv-chip">24/7 Emergency</span>
            </div>
            <div className="cv-foot">
              <b>California Fastener</b>
              <span>
                {B.street} · Benicia CA · {B.vol}
              </span>
            </div>
          </div>
        </article>

        {/* 02 CONTENTS + HOW TO ORDER */}
        <article className="page">
          <div className="frame">
            <div className="top">
              <span>
                <b>Contents</b> · How to order
              </span>
              <span>02 / 14</span>
            </div>
            <h1 className="toc-h">
              The full line, <em>by section.</em>
            </h1>
            <p className="op-lede" style={{ marginTop: 14, maxWidth: "88%" }}>
              Every fastener we stock and machine — bolts through anchors, plus in-house threading,
              cutting, and bending. Send a drawing, a BOM, or a part number; we quote, source, and
              ship. Stock moves same-day.
            </p>
            <div className="toc" style={{ marginTop: 18 }}>
              {CATALOG.toc.map((t) => (
                <div className="toc-row" key={t.n}>
                  <span className="toc-n">{t.n}</span>
                  <span className="toc-name" {...html(t.name)} />
                  <span className="toc-hint">{t.hint}</span>
                  <span className="toc-pg">{t.pg}</span>
                </div>
              ))}
            </div>
            <div className="ord">
              {CATALOG.order.map((o) => (
                <div className="ord-c" key={o.n}>
                  <div className="ord-n">{o.n}</div>
                  <div className="ord-t" {...html(o.t)} />
                  <div className="ord-b" {...html(o.b)} />
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* 03–09 PRODUCT SECTIONS */}
        {CATALOG.sections.map((s) => (
          <ProductPage s={s} key={s.page} />
        ))}

        {/* 10 MATERIALS */}
        <article className="page">
          <div className="frame">
            <div className="top">
              <span>
                <b>Section 07</b> · Materials
              </span>
              <span>10 / 14</span>
            </div>
            <div className="sect-head">
              <div className="sect-l">
                <h1 className="sect-h">
                  Materials, <em>spec&rsquo;d to standard.</em>
                </h1>
                <p className="sect-lede">
                  ASTM grades we stock by the rack, plus specialty alloys on request.
                </p>
              </div>
            </div>
            <div className="mat-body">
              <div className="mat-card">
                <div className="mat-k">ASTM &amp; SAE — Stocked</div>
                {CATALOG.astm.map((a) => (
                  <div className="astm-row" key={a.c}>
                    <div className="astm-c" {...html(a.c)} />
                    <div className="astm-d" {...html(a.d)} />
                  </div>
                ))}
                <div className="mat-k" style={{ margin: "16px 0 12px" }}>
                  F1554 — Anchor Rod &amp; Bolts
                </div>
                {CATALOG.f1554.map((a) => (
                  <div className="astm-row" key={a.c}>
                    <div className="astm-c" {...html(a.c)} />
                    <div className="astm-d" {...html(a.d)} />
                  </div>
                ))}
              </div>
              <div className="mat-card">
                <div className="mat-k">Specialty Alloys — On Request</div>
                {CATALOG.alloys.map((a) => (
                  <div className="alloy" key={a.brand}>
                    <div className="alloy-n" {...html(a.n)} />
                    <div className="alloy-br" {...html(a.brand)} />
                    <div className="alloy-u" {...html(a.use)} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mat-hero-cap">
              <span>A193 B7</span>
              <span>A325 Structural</span>
              <span>Silicon Bronze</span>
              <span>A194 2H Nut</span>
              <span>F436 Washer</span>
            </div>
            <figure className="mat-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/catalog/renders/render-materials-float.png"
                alt="A193 B7, A325, silicon bronze hex bolts with heavy hex nut and structural washer"
              />
            </figure>
            <Foot left="California Fastener · <b>07 — Materials</b>" right="10 / 14" />
          </div>
        </article>

        {/* 11 MACHINE SHOP + CAPABILITIES */}
        <article className="page">
          <div className="frame">
            <div className="top">
              <span>
                <b>Section 08</b> · Machine Shop
              </span>
              <span>11 / 14</span>
            </div>
            <div className="sect-head">
              <div className="sect-l">
                <h1 className="sect-h">
                  Threading, cutting, <em>bending, drilling.</em>
                </h1>
                <p className="sect-lede">
                  Special per print, in-house. A working summary of what we make and what we stock —
                  for the long form, ask the order desk.
                </p>
              </div>
            </div>
            <div className="shop-caps">
              {CATALOG.shopCaps.map((c) => (
                <div className="cap" key={c.n}>
                  <div className="cap-n">{c.n}</div>
                  <div className="cap-t" {...html(c.t)} />
                  <div className="cap-b" {...html(c.b)} />
                </div>
              ))}
            </div>
            <div className="cap-cols">
              <div className="cap-col">
                <h4>Fasteners</h4>
                {CATALOG.capabilities.fasteners.map((r, i) => (
                  <div className="cap-row" key={i}>
                    <span className="l" {...html(r[0])} />
                    <span className="v" {...html(r[1])} />
                  </div>
                ))}
              </div>
              <div className="cap-col">
                <h4>In-house manufacturing</h4>
                {CATALOG.capabilities.cnc.map((r, i) => (
                  <div className="cap-row" key={i}>
                    <span className="l" {...html(r[0])} />
                    <span className="v" {...html(r[1])} />
                  </div>
                ))}
              </div>
            </div>
            <Foot left="California Fastener · <b>08 — Machine Shop</b>" right="11 / 14" />
          </div>
        </article>

        {/* 12 LINDAPTER */}
        <article className="page">
          <div className="frame">
            <div className="top">
              <span>
                <b>Section 09</b> · Lindapter®
              </span>
              <span>12 / 14</span>
            </div>
            <div className="sect-head">
              <div className="sect-l">
                <h1 className="sect-h">
                  Steelwork connections, <em>without the welder.</em>
                </h1>
                <p className="sect-lede">
                  California Fastener is a stocking distributor of Lindapter® — no-weld, no-drill
                  structural steel fixings.
                </p>
              </div>
            </div>
            <div className="lind-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/catalog/renders/render-hollobolt.png"
                alt="Lindapter Hollo-Bolt® — HBCSK12, HBFF12-1, HB12-1"
              />
            </div>
            <div className="lind-grid">
              <div className="lind-card lind-card--dark">
                <div className="lind-k">Lindapter® · since 1934</div>
                <h3 className="lind-h">The original girder clamp.</h3>
                <p {...html(CATALOG.lindapter.blurb1)} />
                <p {...html(CATALOG.lindapter.blurb2)} />
                <div className="creds">
                  {CATALOG.lindapter.creds.map((c) => (
                    <span className="cred" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lind-card">
                <div className="lind-k" style={{ color: "var(--blue)" }}>
                  What we stock
                </div>
                <ul className="lind-list">
                  {CATALOG.lindapter.stock.map((st, i) => (
                    <li key={i}>
                      <span {...html(st)} />
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "9.5px",
                    letterSpacing: ".06em",
                    color: "var(--ink-3)",
                    marginTop: 12,
                    borderTop: "1px solid var(--line)",
                    paddingTop: 11,
                  }}
                >
                  Learn more · {B.web}/lindapter
                </p>
              </div>
            </div>
            <Foot left="California Fastener · <b>09 — Lindapter®</b>" right="12 / 14" />
          </div>
        </article>

        {/* 13 PARTS GALLERY */}
        <article className="page">
          <div className="frame">
            <div className="top">
              <span>
                <b>The Parts</b> · At a glance
              </span>
              <span>13 / 14</span>
            </div>
            <div className="sect-head">
              <div className="sect-l">
                <h1 className="sect-h">
                  The parts, <em>at a glance.</em>
                </h1>
                <p className="sect-lede">
                  A working sample of what ships from Benicia — grades, finishes, and assemblies cut
                  to print.
                </p>
              </div>
            </div>
            <div className="gal">
              {GALLERY.map((g) => (
                <div className="gal-item" key={g[0]}>
                  <div className="gal-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/assets/catalog/renders/${g[0]}.png`} alt="" />
                  </div>
                  <div className="gal-cap">
                    <div className="gal-n">{g[1]}</div>
                    <div className="gal-s">{g[2]}</div>
                  </div>
                </div>
              ))}
            </div>
            <Foot left="California Fastener · <b>The Parts</b>" right="13 / 14" />
          </div>
        </article>

        {/* 14 BACK */}
        <article className="page back">
          <div className="frame">
            <div className="top" style={{ alignItems: "center" }}>
              <span>
                <b>{B.name} Co.</b> · 2026
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="back-logo" src="/assets/catalog/logo-white.png" alt="California Fastener" />
            </div>
            <h1 className="back-h">
              Send the BOM.
              <br />
              We&rsquo;ll <em>handle procurement.</em>
            </h1>
            <div className="back-plate">
              <div className="back-c">
                <div className="back-ck">Order desk</div>
                <div className="back-cv">
                  {B.phone}
                  <small>Mon–Fri · 6 a.m.–4 p.m.</small>
                </div>
              </div>
              <div className="back-c">
                <div className="back-ck">
                  <em>24/7 Emergency</em>
                </div>
                <div className="back-cv">
                  Call the line
                  <small>Refinery, plant, weekend fails — answered.</small>
                </div>
              </div>
              <div className="back-c">
                <div className="back-ck">Will-call &amp; ship</div>
                <div className="back-cv">
                  {B.street}
                  <small>{B.city}</small>
                </div>
              </div>
              <div className="back-c">
                <div className="back-ck">Online</div>
                <div className="back-cv">
                  {B.web}
                  <small>BOM upload · stock check · quote</small>
                </div>
              </div>
            </div>
            <div className="back-foot">
              <span>
                {B.vol} · <em>California Fastener Co.</em>
              </span>
              <span>
                Specs honored. <em>Cut to length.</em>
              </span>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
