import { defineField, defineType } from "sanity";

export const callToAction = defineType({
  name: "callToAction",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", type: "text", rows: 2 }),
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Quote request", value: "quote-request" },
          { title: "Product link", value: "product-link" },
          { title: "Contact", value: "contact" },
        ],
        layout: "radio",
      },
      initialValue: "quote-request",
    }),
    defineField({ name: "buttonLabel", type: "string" }),
    defineField({
      name: "buttonHref",
      type: "string",
      description: 'Internal path (starts with "/") or full https URL.',
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "variant" },
  },
});
