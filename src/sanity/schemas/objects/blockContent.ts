import { defineArrayMember, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
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
            title: "External link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (r) =>
                  r.uri({
                    scheme: ["http", "https", "mailto"],
                    allowRelative: false,
                  }),
              },
              { name: "noFollow", type: "boolean", title: "nofollow" },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal link (to another post)",
            fields: [
              {
                name: "reference",
                type: "reference",
                to: [{ type: "post" }],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (r) => r.required(),
        },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
    defineArrayMember({ type: "callToAction" }),
  ],
});
