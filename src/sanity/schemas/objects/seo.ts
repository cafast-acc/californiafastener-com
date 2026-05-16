import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Falls back to post title if empty.",
      validation: (r) => r.max(70).warning("Keep under 70 characters."),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Falls back to excerpt if empty.",
      validation: (r) => r.max(165).warning("Keep under 165 characters."),
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Open Graph image",
      description: "Defaults to cover image when blank.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      type: "boolean",
      title: "Hide from search engines",
      initialValue: false,
    }),
  ],
});
