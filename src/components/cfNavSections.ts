export type CfNavLink = {
  href: string;
  label: string;
  sub?: string;
};

export type CfNavSection = {
  id: "products" | "industries" | "resources";
  label: string;
  groups: { heading?: string; items: CfNavLink[] }[];
  footer?: CfNavLink[];
};

export const CF_NAV_SECTIONS: CfNavSection[] = [
  {
    id: "products",
    label: "Products",
    groups: [
      {
        heading: "Fasteners",
        items: [
          {
            href: "/anchor-bolts",
            label: "Anchor Bolts",
            sub: "F1554, A193, A36...",
          },
          {
            href: "/stud-bolts-threaded-rod",
            label: "Stud Bolts & Threaded Rod",
            sub: "A193 B7, B8, B16, A320 L7...",
          },
          {
            href: "/structural-fasteners",
            label: "Structural Fasteners",
            sub: "F3125 A325, A490, TC bolts...",
          },
          {
            href: "/industrial-fasteners",
            label: "Industrial Fasteners",
            sub: "A193 B7, A574, A194, F436...",
          },
          {
            href: "/u-bolts",
            label: "U-Bolts",
            sub: "A36, A193, 304, 316...",
          },
          {
            href: "/stainless-steel-fasteners",
            label: "Stainless Steel Fasteners",
            sub: "304, 316, duplex, 17-4 PH...",
          },
          {
            href: "/silicon-bronze",
            label: "Silicon Bronze Hardware",
            sub: "C651 bolts, nuts, washers...",
          },
          {
            href: "/hollo-bolt",
            label: "Specialty & Lindapter",
            sub: "Hollo-Bolt, girder clamps...",
          },
        ],
      },
    ],
    footer: [
      { href: "/products", label: "View all products →" },
      { href: "/quote", label: "Request a quote →" },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    groups: [
      {
        items: [
          { href: "/industries/construction", label: "Construction" },
          { href: "/industries/manufacturing", label: "Manufacturing" },
          { href: "/industries/infrastructure", label: "Infrastructure" },
          { href: "/industries/power-generation", label: "Power Generation" },
          { href: "/industries/power-transmission", label: "Power Transmission" },
          { href: "/industries/oil-gas", label: "Oil, Gas & Chemical" },
          { href: "/industries/marine", label: "Marine & Shipbuilding" },
          { href: "/industries/aerospace", label: "Aerospace & Defense" },
        ],
      },
    ],
    footer: [
      { href: "/industries", label: "View all industries →" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      {
        heading: "Technical",
        items: [
          {
            href: "/spec-library",
            label: "Specification Library",
            sub: "ASTM, SAE, ISO standards",
          },
          {
            href: "/spec-builder",
            label: "Spec Builder",
            sub: "Find the right material & grade",
          },
          {
            href: "/bolt-weight-calculator",
            label: "Bolt Weight Calculator",
            sub: "Estimate weight for shipping & quoting",
          },
          { href: "/catalog", label: "Product Catalog (PDF)" },
          { href: "/quote", label: "Request a Quote" },
        ],
      },
    ],
  },
];

export const CF_NAV_FLAT_LINKS: CfNavLink[] = [
  { href: "/cnc-machining", label: "CNC Machining" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];
