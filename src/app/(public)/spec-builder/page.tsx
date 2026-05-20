import type { Metadata } from "next";
import "@/styles/cf-spec-builder.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { SpecBuilder } from "@/components/spec-builder/SpecBuilder";

export const metadata: Metadata = {
  title: "Spec Builder",
  description:
    "Find the right fastener spec, grade, and finish for your application. Walks through use, environment, criticality, and special requirements — recommends matching ASTM/AMS specs in seconds.",
};

export default function SpecBuilderPage() {
  return (
    <div className="sb-page">
      <CfNav />

      <header className="sb-hero">
        <div className="sb-hero-eyebrow">Spec Builder</div>
        <h1>
          Find the <i>right</i> fastener spec.
        </h1>
        <p>
          Answer four short questions about your application, environment, and requirements.
          We&apos;ll recommend matching ASTM and AMS grades, with compatible nuts, washers, and the
          reasoning behind the pick.
        </p>
      </header>

      <SpecBuilder />

      <CfFooter />
    </div>
  );
}
