import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

import { RouteTracker } from "@/components/RouteTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "California Fastener — Structural & Industrial Fasteners — CNC Machining",
    template: "%s · California Fastener",
  },
  description:
    "California-based industrial fastener distributor and CNC machining shop. Heavy hex, A325, F1554 anchor bolts, A193 stud bolts, stainless, and Lindapter Hollo-Bolt — 24-hour quotes, full traceability.",
  metadataBase: new URL("https://californiafastener.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <GoogleTagManager gtmId="GTM-NDRT3DJ5" />
      <body>
        {/* Google Tag Manager (noscript) fallback for visitors without JS */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDRT3DJ5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <RouteTracker />
        {children}
      </body>
    </html>
  );
}
