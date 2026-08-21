import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { POST_COVER_IMAGE_HEIGHT, POST_COVER_IMAGE_WIDTH } from '@/constants'
import type { Post } from '@/sanity/types'
import { urlFor } from '@/sanity/utils'

// Type for the fetched data with the excerpt field
export interface PostWithExcerpt extends Post {
  excerpt: string
}

interface BlogPostItemProps {
  post: PostWithExcerpt
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ post }) => {
  // @TODO: Fix adding excerpt prop to posts query line 30

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(POST_COVER_IMAGE_WIDTH).height(POST_COVER_IMAGE_HEIGHT).url()
    : null

  return (
    <Card className="mb-4 ">
      <CardHeader>
        {postImageUrl && (
          <Image
            src={postImageUrl}
            alt={post.title || `Post cover image`}
            width={POST_COVER_IMAGE_WIDTH}
            height={POST_COVER_IMAGE_HEIGHT}
            className="rounded-t-lg"
          />
        )}
      </CardHeader>
      <CardContent className="prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p>{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        {post.slug && (
          <Link href={`/blog/${post.slug.current}`} className="line-grow text-foreground">
            Read more
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

export default BlogPostItem
