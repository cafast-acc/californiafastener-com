import { defineType, defineField, defineArrayMember } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (r) => r.required().max(110),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "1–2 sentence dek shown on the listing and at the top of the post.",
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (r) =>
                      r.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
        defineArrayMember({
          name: "callout",
          type: "object",
          title: "Callout",
          fields: [
            defineField({
              name: "tone",
              type: "string",
              options: {
                list: [
                  { title: "Note", value: "note" },
                  { title: "Spec", value: "spec" },
                  { title: "Warning", value: "warning" },
                ],
                layout: "radio",
              },
              initialValue: "note",
            }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "tone" },
          },
        }),
      ],
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
    }),
    defineField({
      name: "categories",
      type: "array",
      group: "meta",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "meta",
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "meta",
      description: "Pin to the top of the listing.",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      type: "string",
      group: "seo",
      description: "Optional. Falls back to title.",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      group: "seo",
      rows: 2,
      description: "Optional. Falls back to summary.",
      validation: (r) => r.max(180),
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "heroImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "Unpublished",
        media,
      };
    },
  },
});
