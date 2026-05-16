import { defineField, defineType } from "sanity";

export const callToAction = defineType({
  name: "callToAction",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", type: "string" }),
    defineField({ name: "ctaHref", type: "string" }),
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Default (light)", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "Inline rule", value: "rule" },
        ],
        layout: "radio",
      },
      initialValue: "light",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "ctaLabel" },
  },
});
