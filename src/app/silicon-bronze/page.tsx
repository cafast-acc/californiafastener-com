import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Silicon Bronze Hardware",
  description:
    "Silicon bronze fasteners — bolts, nuts, washers, and lag screws for marine, architectural, and exposed-finish applications. Saltwater-grade corrosion resistance with a warm finish.",
};

export default function SiliconBronzePage() {
  return (
    <SimplePage
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { label: "Silicon Bronze Hardware" },
      ]}
      eyebrow="Silicon Bronze"
      title={
        <>
          Silicon bronze for
          <br />
          <i>saltwater &amp; sight.</i>
        </>
      }
      sub="Marine and architectural silicon bronze hardware — bolts, nuts, washers, lag screws, and rod stock for projects where corrosion resistance and finish both matter."
      callouts={[
        { label: "Alloy", val: "C65100 · C65500", sub: "Silicon bronze, 96% Cu" },
        { label: "Service", val: "Saltwater", sub: "Above- and below-waterline" },
        { label: "Forms", val: "Hex · Carriage · Lag", sub: "Plus nuts, washers, rod" },
        { label: "Finish", val: "Mill", sub: "Patinas naturally over time" },
      ]}
      sections={[
        {
          head: "Built for boats and visible joints.",
          body: "Silicon bronze offers near-stainless saltwater resistance with a warm, natural finish that doesn't require painting or plating. The bronze develops a stable patina that protects the metal underneath — making it the standard for wooden boat construction, dock hardware, and exposed architectural fastening.",
        },
        {
          head: "Forms in stock.",
          body: "We carry silicon bronze across the typical fastener forms, with custom lengths and configurations on request.",
          list: [
            { strong: "Hex head bolts", sub: "1/4″ – 1″ diameters" },
            { strong: "Carriage bolts", sub: "Standard and custom lengths" },
            { strong: "Lag screws", sub: "For timber framing and dock hardware" },
            { strong: "Hex nuts &amp; washers", sub: "Matching alloy" },
            { strong: "Threaded rod", sub: "Cut to length" },
          ],
        },
      ]}
    />
  );
}
