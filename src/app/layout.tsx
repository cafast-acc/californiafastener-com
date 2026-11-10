import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { RouteTracker } from "@/components/RouteTracker";
import { ClickTracker } from "@/components/ClickTracker";
import { CookieConsent } from "@/components/CookieConsent";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";

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
  // Social share defaults. Per-page `title`/`description` flow into og:/twitter:
  // titles automatically; the shared card image comes from the
  // src/app/opengraph-image.png file convention. Blog posts set their own.
  openGraph: {
    type: "website",
    siteName: "California Fastener",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
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
      <body>
        {/* Consent Mode defaults + landing-page snapshot, set before anything
            else runs. See src/lib/consent.ts. Google Tag Manager itself is
            loaded by <CookieConsent /> only after the visitor accepts, so
            there's deliberately no GTM <noscript> fallback here — a visitor
            without JavaScript can't consent. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {CONSENT_DEFAULT_SCRIPT}
        </Script>
        <RouteTracker />
        <ClickTracker />
        {children}
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
