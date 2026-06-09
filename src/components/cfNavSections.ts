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
            sub: "F1554, A193, F593 · headed, bent, rod assemblies",
          },
          {
            href: "/stud-bolts-threaded-rod",
            label: "Stud Bolts & Threaded Rod",
            sub: "B7, B8, B16 · cut to length",
          },
          {
            href: "/structural-fasteners",
            label: "Structural Fasteners",
            sub: "A325, A490, TC bolts",
          },
          {
            href: "/industrial-fasteners",
            label: "Industrial Fasteners",
            sub: "Hex, socket, flange, grade 5 / 8",
          },
          {
            href: "/u-bolts",
            label: "U-Bolts",
            sub: "Standard & custom profiles",
          },
          {
            href: "/stainless-steel-fasteners",
            label: "Stainless Steel Fasteners",
            sub: "304, 316, duplex",
          },
          {
            href: "/silicon-bronze",
            label: "Silicon Bronze Hardware",
            sub: "Marine & architectural",
          },
          {
            href: "/hollo-bolt",
            label: "Specialty & Lindapter",
            sub: "Hollo-Bolt, Girder clamps, blind bolts",
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
          { href: "/industries/manufacturing", label: "Industrial Machinery" },
          { href: "/industries/infrastructure", label: "Infrastructure" },
          { href: "/industries/power-generation", label: "Renewable Energy" },
          { href: "/industries/power-transmission", label: "Power & Utilities" },
          { href: "/industries/oil-gas", label: "Oil, Gas & Petrochemical" },
          { href: "/industries/marine", label: "Marine & Shipbuilding" },
          { href: "/industries/aerospace", label: "Aerospace & Defense" },
        ],
      },
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
        ],
      },
      {
        heading: "Tools",
        items: [
          { href: "/quote", label: "Request a Quote" },
          { href: "/contact", label: "Contact Engineering" },
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
