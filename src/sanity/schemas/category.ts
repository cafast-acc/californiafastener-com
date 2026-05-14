import { defineField, defineType } from "sanity";

// Categories exist as a document type so posts can be classified from day one,
// but the /blog/category/[slug] archive page is deferred to v2.
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});
