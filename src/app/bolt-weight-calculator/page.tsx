import type { Metadata } from "next";
import "@/styles/cf-bolt-weight-calculator.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { BoltWeightCalculator } from "@/components/BoltWeightCalculator";

export const metadata: Metadata = {
  title: "Bolt Weight Calculator",
  description:
    "Estimate fastener weight by type, size, material, and quantity. Hex bolts, heavy hex, socket head cap screws, threaded rod, nuts, and washers — imperial or metric — for shipping and quoting.",
};

export default function BoltWeightCalculatorPage() {
  return (
    <div className="bwc-page">
      <CfNav />

      <header className="bwc-hero">
        <div className="bwc-hero-eyebrow">Bolt Weight Calculator</div>
        <h1>
          Estimate fastener weight in <i>seconds</i>.
        </h1>
        <p>
          Pick a type, size, and material. We&apos;ll calculate per-piece and lot weight for{" "}
          <strong>shipping, freight class, and quoting</strong> — across 25+ materials, imperial or
          metric.
        </p>
      </header>

      <main className="bwc-main">
        <BoltWeightCalculator />
      </main>

      <CfFooter />
    </div>
  );
}
