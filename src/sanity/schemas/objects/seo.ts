import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "50–60 chars. Falls back to post title.",
      validation: (r) => r.max(60).warning("Keep under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "140–160 chars. Falls back to excerpt.",
      validation: (r) => r.max(160).warning("Keep under 160 characters"),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image (Open Graph)",
      type: "image",
      options: { hotspot: true },
      description: "1200×630 recommended. Falls back to cover image.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Only set if this content is republished from elsewhere.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "focusKeyword",
      title: "Primary keyword/phrase",
      type: "string",
      description: "Editor reference only. Not output on the page.",
    }),
  ],
});
