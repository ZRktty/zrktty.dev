export const POSTS_QUERY = `*[
  _type == "post" 
  && defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "excerpt": array::join(
    string::split(pt::text(body), "")[0..255], 
    ""
  ) + "..."
}`

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`

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

export const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)] | order(order asc) {
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
  body,
  featured,
  highlighted,
  order
}`

export const NEXT_PROJECT_QUERY = `*[_type == "project" && defined(slug.current) && order > $order] | order(order asc)[0] {
  title,
  slug
}`
