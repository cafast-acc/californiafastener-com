import type { SchemaTypeDefinition } from "sanity";

import { post } from "./post";
import { author } from "./author";
import { category } from "./category";
import { seo } from "./objects/seo";
import { blockContent } from "./objects/blockContent";
import { callToAction } from "./objects/callToAction";
import { linkedProduct } from "./objects/linkedProduct";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  post,
  author,
  category,
  // Objects (referenced from documents above)
  seo,
  blockContent,
  callToAction,
  linkedProduct,
];
