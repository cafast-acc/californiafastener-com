import { defineField, defineType } from "sanity";

// Lightweight pointer to a product page that already lives on the main site
// as a Next.js route. We deliberately don't model products as Sanity documents
// — the catalog source of truth is in code, and a parallel doc store would
// drift. The editor types the on-site path manually (e.g. "/anchor-bolts").
export const linkedProduct = defineType({
  name: "linkedProduct",
  title: "Linked product",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "path",
      title: "On-site path",
      type: "string",
      description:
        'Path on californiafastener.com, e.g. "/anchor-bolts". Must start with "/".',
      validation: (r) =>
        r.required().custom((value) =>
          !value || value.startsWith("/")
            ? true
            : 'Path must start with "/"',
        ),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "path", media: "image" },
  },
});
