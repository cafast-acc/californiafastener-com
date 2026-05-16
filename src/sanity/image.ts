import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import { dataset, projectId } from "./env";

// `client` is null when Sanity isn't configured. Fall back to a no-op builder
// pointed at the env values (which may be empty strings). The result url will
// be unusable in that case, but components that call `urlFor` should guard on
// whether a real image asset exists before reaching this code path.
const builder = client
  ? createImageUrlBuilder(client)
  : createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
