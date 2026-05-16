import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Shown on /blog/category/[slug] above the post list.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
