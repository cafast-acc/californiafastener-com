import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-hollo-bolt-selector.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { HolloBoltSelector } from "@/components/HolloBoltSelector";

export const metadata: Metadata = {
  title: "Hollo-Bolt Selector — Specify Your Connection",
  description:
    "Specify the correct Lindapter Hollo-Bolt for your connection. Filter by head type, diameter, finish, and fixing thickness — request a quote from California Fastener.",
};

export default function HolloBoltSelectorPage() {
  return (
    <>
      <CfNav />

      <section className="hbsel-hero">
        <div className="hbsel-hero-inner">
          <div className="hbsel-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/hollo-bolt">Lindapter Hollo-Bolt</Link>
            <span>/</span>
            Selector
          </div>
          <div className="hbsel-eyebrow">Configure &amp; quote</div>
        </div>
      </section>

      <HolloBoltSelector />

      <CfFooter />
    </>
  );
}
