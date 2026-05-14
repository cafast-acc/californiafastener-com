import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: 'e.g. "Applications Engineer"',
    }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (r) => r.required(),
        },
      ],
    }),
    defineField({
      name: "expertise",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Topics this author is qualified to write about. Reinforces E-E-A-T.",
    }),
    defineField({ name: "linkedinUrl", type: "url" }),
  ],
});
