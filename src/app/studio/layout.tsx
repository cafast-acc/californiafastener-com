import type { Metadata, Viewport } from "next";

import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Studio · California Fastener",
  // Keep the CMS admin out of search-engine results. This only removes it
  // from the public index — the Studio is still reachable at /studio and is
  // protected by the Sanity login regardless.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: studioViewport.width,
  initialScale: studioViewport.initialScale,
  viewportFit: "cover",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
