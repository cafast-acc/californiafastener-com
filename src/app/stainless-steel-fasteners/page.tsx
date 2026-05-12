import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Stainless Steel Fasteners",
  description:
    "304, 316, and duplex stainless fasteners — anchors, studs, structural bolts, nuts, washers, and threaded rod for marine, chemical, food-grade, and architectural service.",
};

export default function StainlessSteelPage() {
  return (
    <SimplePage
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { label: "Stainless Steel Fasteners" },
      ]}
      eyebrow="Stainless Steel"
      title={
        <>
          Stainless steel for
          <br />
          <i>corrosive service.</i>
        </>
      }
      sub="304, 316, and duplex stainless fasteners for marine, chemical, food-grade, and architectural projects — full assemblies stocked with mill certs traceable to heat number."
      callouts={[
        { label: "Grades", val: "304 · 316 · Duplex", sub: "Per ASTM F593, F594, A193" },
        { label: "Forms", val: "Hex · Socket · Stud", sub: "Plus nuts, washers, threaded rod" },
        { label: "Finish", val: "Passivated", sub: "Per ASTM A380 on request" },
        { label: "Service", val: "−320°F to 1500°F", sub: "Grade-dependent" },
      ]}
      sections={[
        {
          head: "When carbon steel won't do.",
          body: "Stainless fasteners resist pitting, galvanic corrosion, and chemical attack in environments that destroy plated carbon steel. We stock the full range — from general-purpose 304 for indoor architectural to 316 for coastal and chemical service, to duplex grades for pressure vessels and offshore structures.",
        },
        {
          head: "Grades we stock.",
          body: "Send us the application and we'll match the grade. Common ones we ship daily:",
          list: [
            { strong: "304 / 304L", sub: "General service · architectural · food-grade" },
            { strong: "316 / 316L", sub: "Marine · chemical · coastal" },
            { strong: "A4-80 / A2-70", sub: "Metric strength classes" },
            { strong: "Duplex 2205", sub: "High-pressure · offshore · sour service" },
            { strong: "B8 / B8M studs", sub: "Per ASTM A193 for flanges" },
          ],
        },
      ]}
    />
  );
}
