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
      rows: 3,
      group: "content",
      description: "Shown on the index card and as the dek under the title.",
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "readingMinutes",
      type: "number",
      group: "meta",
      description: "Estimated read time in minutes.",
      validation: (r) => r.min(1).max(60),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "meta",
      description: "Pin to the featured slot on the index.",
      initialValue: false,
    }),
    defineField({
      name: "relatedProducts",
      title: "Linked products",
      type: "array",
      of: [{ type: "linkedProduct" }],
      group: "meta",
      description: "Renders the \"Shop the article\" rail at the bottom of the post.",
    }),
    defineField({
      name: "seo",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      const date = subtitle ? new Date(subtitle as string).toLocaleDateString() : "Unpublished";
      return { title: title as string, subtitle: date, media };
    },
  },
});
