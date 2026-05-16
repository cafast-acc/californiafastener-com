import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, readToken } from "../env";

// Server-side read client. Sanity's per-role permissions on this project
// mean anonymous reads return 0 docs even though the dataset is "Public" —
// so we always send the read token. The CDN caches per token so this is fine.
export const client = createClient({
  projectId: projectId || "missing-project-id",
  dataset: dataset || "missing-dataset",
  apiVersion,
  useCdn: true,
  token: readToken || undefined,
  perspective: "published",
});
