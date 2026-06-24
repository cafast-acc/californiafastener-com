import type { Metadata } from "next";
import "@/styles/cf-quote.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { RfqJotformEmbed } from "@/components/RfqJotformEmbed";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Same-day quotes on most stocked items, 24 business hours on fabrication. Paste your RFQ, attach drawings, or just tell us what you're after — we'll take it from there.",
};

export default function QuotePage() {
  return (
    <div className="qf-page">
      <CfNav />
      <RfqJotformEmbed />
      <CfFooter />
    </div>
  );
}
