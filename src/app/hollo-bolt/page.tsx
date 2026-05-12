import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Lindapter Hollo-Bolt & Specialty",
  description:
    "Authorized Lindapter distributor — Hollo-Bolt expansion fasteners, girder clamps, and blind bolts for hollow structural sections and one-side-access steel connections.",
};

export default function HolloBoltPage() {
  return (
    <SimplePage
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { label: "Specialty &amp; Lindapter" },
      ]}
      eyebrow="Lindapter · Authorized Distributor"
      title={
        <>
          Hollo-Bolt.
          <br />
          Fastened from <i>one side.</i>
        </>
      }
      sub="The expansion bolt engineered for hollow structural sections and blind connections — where you can only reach one face of the steel. No welding, no through-holes, fully reversible."
      callouts={[
        { label: "Access", val: "One-side", sub: "Blind connection capable" },
        { label: "Finishes", val: "Zinc · HDG · 316SS", sub: "Plus weatherproof variants" },
        { label: "Sizes", val: "M8 – M20", sub: "And 3/8″ – 3/4″ imperial" },
        { label: "Approvals", val: "ICC-ES · CE · LABC", sub: "Plus AISC-compliant" },
      ]}
      sections={[
        {
          head: "Why Hollo-Bolt.",
          body: "Hollow structural sections — square tubing, rectangular tubing, round pipe — are tough to connect because you can only reach one side. Welding works but it's slow, permanent, and removes any future flexibility. Hollo-Bolt sets in seconds with hand tools, fully reversible, with structural-grade capacity.",
        },
        {
          head: "The Lindapter range.",
          body: "We carry the full Lindapter catalog as an authorized distributor — same-day shipping on common sizes, with technical support from our team for design and substitution.",
          list: [
            { strong: "Hollo-Bolt HB1", sub: "Standard expansion bolt for HSS" },
            { strong: "Hollo-Bolt HB2", sub: "Higher capacity, heavy-duty variant" },
            { strong: "Girder clamps", sub: "Steel-to-steel without drilling" },
            { strong: "Blind bolts", sub: "For closed sections and rebar" },
            { strong: "Floor fixings", sub: "Concrete-to-steel applications" },
          ],
        },
      ]}
    />
  );
}
