"use client";

/**
 * Embedded Sanity Studio at /studio. The catch-all segment is required —
 * Studio handles its own client-side routing under this prefix.
 *
 * 'use client' is required: Studio depends on styled-components and a
 * handful of browser-only APIs.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
