/**
 * Studio layout. Inherits the root <html>/<body> from src/app/layout.tsx
 * but overrides the metadata + viewport so the Studio renders correctly
 * (full-bleed, no zooming) and isn't indexed.
 */
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

export const metadata = {
  ...studioMetadata,
  title: "Studio · California Fastener",
  robots: { index: false, follow: false },
};

export const viewport = studioViewport;

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
