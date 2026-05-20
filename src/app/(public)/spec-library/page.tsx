import type { Metadata } from "next";
import "@/styles/cf-spec-library.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { SpecLibrary } from "@/components/spec-library/SpecLibrary";

export const metadata: Metadata = {
  title: "Spec Library",
  description:
    "Thirty-five ASTM, SAE, ASME, ISO, and DIN fastener standards in plain English. Bolts, nuts, washers, threads, coatings, and metric reference — every spec opens with an at-a-glance for non-specialists.",
};

export default function SpecLibraryPage() {
  return (
    <>
      <CfNav />
      <SpecLibrary />

      {/* QUOTE BAND */}
      <section className="lib-quote" id="quote">
        <div className="lib-wrap">
          <div className="lib-quote-inner">
            <div>
              <div className="lib-quote-kicker">§ Next step</div>
              <h2 className="lib-quote-head">Have a spec in hand? Send it.</h2>
              <p className="lib-quote-sub">
                PDF, drawing, BOM, or a sketch on a napkin — we&apos;ll quote it. California Fastener
                stocks every spec in this library with mill certificates traceable to heat number.
              </p>
            </div>
            <div className="lib-quote-actions">
              <a href="/quote" className="cf-pill cf-pill--blue-light">
                Request a Quote →
              </a>
              <a href="mailto:info@californiafastener.com" className="lib-quote-email">
                info@californiafastener.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <CfFooter />
    </>
  );
}
