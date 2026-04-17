import {client} from "@/sanity/client";
import {createImageUrlBuilder, type SanityImageSource} from "@sanity/image-url";

const { projectId, dataset } = client.config();
const builder = projectId && dataset
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export const urlFor = (source: SanityImageSource) =>
  builder ? builder.image(source) : null;