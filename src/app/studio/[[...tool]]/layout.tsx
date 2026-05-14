// Server file. Exposes Studio metadata/viewport without forcing the Studio
// bundle through server-side evaluation. The page itself is a client
// component because the Studio tree calls React.createContext at module top.

export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
