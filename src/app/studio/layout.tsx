import type { Metadata, Viewport } from "next";

import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Studio · California Fastener",
};

export const viewport: Viewport = {
  width: studioViewport.width,
  initialScale: studioViewport.initialScale,
  viewportFit: "cover",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
