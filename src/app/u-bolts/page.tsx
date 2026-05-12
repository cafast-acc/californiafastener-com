import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "U-Bolts",
  description:
    "Standard and custom U-bolt profiles — square, round, and semi-round bends in carbon and stainless across every common pipe size. Built to print and stocked for fast turnaround.",
};

export default function UBoltsPage() {
  return (
    <SimplePage
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { label: "U-Bolts" },
      ]}
      eyebrow="U-Bolts"
      title={
        <>
          U-bolts for pipe, conduit,
          <br />
          and <i>structural rigging.</i>
        </>
      }
      sub="Standard and custom U-bolt profiles in carbon steel and stainless — round, square, and semi-round bends sized to every common pipe and tube. Stocked, plated, and ready to ship."
      callouts={[
        { label: "Profile", val: "Round · Square · Semi", sub: "Standard and custom bend radii" },
        { label: "Material", val: "Carbon · 304 · 316", sub: "Plain, zinc, HDG, stainless" },
        { label: "Sizes", val: "1/4″ – 1-1/4″", sub: "Pipe sizes 1/4″ NPS through 12″" },
        { label: "Custom", val: "Built to print", sub: "Non-standard ID, length, thread" },
      ]}
      sections={[
        {
          head: "Standard profiles, in stock.",
          body: "We stock zinc-plated and hot-dip galvanized U-bolts in every common pipe size. Round-bend for pipe and conduit; square-bend for tubing and angle iron; semi-round for cable trays, ductwork, and rigging. Stainless variants in 304 and 316 ship from inventory for marine and chemical service.",
        },
        {
          head: "Custom U-bolts to your print.",
          body: "Send us a drawing and we'll match the inside diameter, leg length, thread length, and thread pitch you need. Non-standard bend radii, oversized rod, and dual-thread variants are all routine.",
          list: [
            { strong: "Rod diameter", sub: "1/4″ – 1-1/4″ standard, larger on request" },
            { strong: "Inside diameter", sub: "Any pipe size or custom dimension" },
            { strong: "Finish", sub: "Plain, zinc, HDG, mechanical, stainless" },
            { strong: "Thread", sub: "UNC, UNF, metric, fine-pitch" },
          ],
        },
      ]}
    />
  );
}
