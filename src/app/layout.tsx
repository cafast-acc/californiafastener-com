import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { AnalyticsRouteEvents } from "@/components/analytics/AnalyticsRouteEvents";
import "./globals.css";

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
    default: "California Fastener — Industrial fasteners & precision CNC machining",
    template: "%s · California Fastener",
  },
  description:
    "Bay Area industrial-fastener distributor and CNC machining shop since 1970. Heavy hex, A325, F1554 anchor bolts, A193 stud bolts, stainless and Lindapter Hollo-Bolt. 24-hour quotes, full traceability.",
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        <Suspense fallback={null}>
          <AnalyticsRouteEvents />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
