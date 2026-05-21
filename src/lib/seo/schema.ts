import type { ParsedSpec } from "@/lib/specLibrary/markdown";
import type { Spec } from "@/lib/specLibrary/data";

const SITE_URL = "https://californiafastener.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "California Fastener",
    legalName: "CA Fast LLC",
    url: SITE_URL,
    description:
      "Bay Area industrial-fastener distributor and CNC machining shop since 1970.",
    foundingDate: "1970",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+1-707-741-3277",
      email: "info@californiafastener.com",
      areaServed: "US",
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Benicia",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };
}

export function getSpecArticleSchema(slug: string, parsed: ParsedSpec, spec: Spec) {
  const url = `${SITE_URL}/spec-library/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: parsed.h1 || spec.code,
    name: spec.code,
    description: spec.note,
    url,
    mainEntityOfPage: url,
    about: {
      "@type": "Thing",
      name: spec.code,
    },
    keywords: [spec.code, ...spec.grades, ...spec.industries].filter(Boolean).join(", "),
    publisher: {
      "@type": "Organization",
      name: "California Fastener",
      url: SITE_URL,
    },
  };
}

export function jsonLdSafeStringify(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
