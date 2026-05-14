export const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  "categories": categories[]->{ _id, title },
  "excerpt": array::join(
    string::split(pt::text(body), "")[0..200],
    ""
  ) + "..."
}`

export const BLOG_CATEGORIES_QUERY = `*[
  _type == "category"
  && _id in *[_type == "post" && defined(slug.current)].categories[]._ref
] | order(title asc) { _id, title }`

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)] { "slug": slug.current }`

export const POST_DETAIL_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "body": body[] {
    ...,
    _type == "image" => {
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  },
  "author": author->{ name, image { asset->{ url } } },
  "categories": categories[]->{ _id, title },
  "similarPost": select(
    defined(similarPost->slug.current) => similarPost->{ title, "slug": slug.current, publishedAt, "categories": categories[]->{ _id, title }, mainImage }
  )
}`

export const SIMILAR_POSTS_BY_CATEGORY_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && _id != $excludeId
  && count((categories[]->_id)[@ in $categoryIds]) > 0
] | order(publishedAt desc)[0] {
  title,
  "slug": slug.current,
  publishedAt,
  "categories": categories[]->{ _id, title },
  mainImage
}`

export const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc) {
  _id,
  company,
  role,
  webUrl,
  type,
  startDate,
  endDate,
  description,
  techStack,
  logo { asset->{ url }, alt },
  order
}`

export const PROJECTS_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)] { "slug": slug.current }`

export const HOMEPAGE_PROJECTS_QUERY = `*[_type == "project" && defined(slug.current) && (featured == true || highlighted == true)] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  thumbnail,
  techStack,
  featured,
  highlighted,
  order,
  liveUrl,
  githubUrl
}`

export const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)] | order(featured desc, order asc, _createdAt desc) [$offset...$offset + $limit] {
  _id,
  title,
  slug,
  shortDescription,
  thumbnail,
  techStack,
  featured,
  highlighted,
  order,
  liveUrl,
  githubUrl
}`

export const PROJECTS_COUNT_QUERY = `count(*[_type == "project" && defined(slug.current)])`

export const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  thumbnail,
  liveUrl,
  githubUrl,
  client,
  timeline,
  role,
  techStack,
  "body": body[] {
    ...,
    _type == "image" => {
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  },
  featured,
  highlighted,
  order
}`

export const NEXT_PROJECT_QUERY = `*[_type == "project" && defined(slug.current) && order > $order] | order(order asc)[0] {
  title,
  slug
}`

export const AVAILABILITY_QUERY = `*[_type == "aboutMe"][0] { availability, socialLinks[]{ platform, url } }`

export const BOOKING_QUERY = `*[_type == "aboutMe"][0] { bookingUrl }`

export const ABOUT_QUERY = `*[_type == "aboutMe"][0] {
  name,
  metaStrip,
  photo { asset->{ url }, alt },
  availability,
  bookingUrl,
  cvFile { asset->{ url, originalFilename } },
  socialLinks[]{ platform, url },
  "authorBio": *[_type == "author"][0].bio[_type == "block"] {
    "text": pt::text(@)
  },
  beliefs[]{ claim, body },
  toolkitRows[]{ category, tools },
  testimonials[]{ text, attribution, role, year },
  outsideBlocks[]{ title, body },
  externalLinks[]{ label, url }
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  category,
  title,
  description,
  bullets,
  stack,
  steps,
  isE2E,
  order
}`
