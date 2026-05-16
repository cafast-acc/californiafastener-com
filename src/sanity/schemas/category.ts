import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "accent",
      title: "Accent color",
      type: "string",
      description: "Controls the category eyebrow tint on the index.",
      options: {
        list: [
          { title: "Blue (default)", value: "blue" },
          { title: "Purple (CNC)", value: "purple" },
          { title: "Mid (neutral)", value: "mid" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first in the pill bar.",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "accent" },
  },
});
