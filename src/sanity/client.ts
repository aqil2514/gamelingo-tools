import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { projectId, dataset, apiVersion, token } from "./env";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  token,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

const builder = imageUrlBuilder(sanityClient);

export const getSanityImage = (source: SanityImageSource) => {
  return builder.image(source);
};
