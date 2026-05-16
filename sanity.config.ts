/**
 * Sanity Studio configuration — embedded at /studio.
 *
 * The Studio is loaded by `src/app/studio/[[...tool]]/page.tsx` via
 * NextStudio. Schemas live under `src/sanity/schemas`. To add a new
 * document type, drop a file in there and register it in `schemas/index.ts`.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  basePath: "/studio",
  name: "californiafastener-studio",
  title: "California Fastener · Field Notes",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Posts")
              .child(S.documentTypeList("post").title("Posts")),
            S.listItem()
              .title("Categories")
              .child(S.documentTypeList("category").title("Categories")),
            S.listItem()
              .title("Authors")
              .child(S.documentTypeList("author").title("Authors")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
