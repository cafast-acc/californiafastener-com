import type { Metadata } from "next";
import "@/styles/cf-quote.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { QuoteWizard } from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Build a quote in four steps — pick a product category, share specs, attach drawings, and we'll respond within 24 business hours with pricing, lead times, and availability.",
};

export default function QuotePage() {
  return (
    <div className="qf-page">
      <CfNav />
      <QuoteWizard />
      <CfFooter />
    </div>
  );
}
