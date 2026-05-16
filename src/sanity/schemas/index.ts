import type { SchemaTypeDefinition } from "sanity";

import { author } from "./author";
import { category } from "./category";
import { blockContent } from "./objects/blockContent";
import { callToAction } from "./objects/callToAction";
import { linkedProduct } from "./objects/linkedProduct";
import { seo } from "./objects/seo";
import { post } from "./post";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  blockContent,
  callToAction,
  linkedProduct,
  seo,
];
