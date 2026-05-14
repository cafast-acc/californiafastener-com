"use client";

// Embedded Sanity Studio. Must be a client component because the Studio tree
// evaluates React.createContext at module top, which Turbopack rejects when
// loading from a server module. Metadata + viewport are exported from the
// sibling server layout.tsx.

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
