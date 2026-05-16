import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({
  projectId: projectId || "missing-project-id",
  dataset: dataset || "missing-dataset",
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
