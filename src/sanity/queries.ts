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
