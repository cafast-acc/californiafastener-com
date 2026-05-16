import { defineField, defineType } from "sanity";

export const linkedProduct = defineType({
  name: "linkedProduct",
  title: "Linked product",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "kicker", type: "string", description: "Short eyebrow line" }),
    defineField({ name: "blurb", type: "text", rows: 2 }),
    defineField({
      name: "href",
      type: "string",
      description: "Internal path like /anchor-bolts or /quote",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "href", media: "image" },
  },
});
