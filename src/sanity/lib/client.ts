import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Public read-only client. CDN-cached, only returns *published* documents,
// no token. Safe to invoke from server components reachable by any visitor.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
