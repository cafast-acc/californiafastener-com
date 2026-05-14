import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Metadata" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      group: "content",
      rows: 3,
      description:
        "One- to two-sentence summary shown in listings and used as default meta description.",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
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
    defineField({ name: "body", type: "blockContent", group: "content" }),

    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      group: "meta",
      validation: (r) => r.min(1).max(3),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "meta",
    }),
    defineField({
      name: "relatedProducts",
      type: "array",
      of: [{ type: "linkedProduct" }],
      group: "meta",
      description: 'Renders as a "Shop the article" rail at the bottom of the post.',
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "coverImage" },
    prepare: ({ title, author, media }) => ({
      title,
      subtitle: author ? `by ${author}` : undefined,
      media,
    }),
  },
});
