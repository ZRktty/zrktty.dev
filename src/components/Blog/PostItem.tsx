import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import {Post} from "@/sanity/types";
import {urlFor} from "@/sanity/utils";
import Link from "next/link";


// Type for the fetched data with the excerpt field
export interface PostWithExcerpt extends Post {
  excerpt: string;
}

interface BlogPostItemProps {
  post: PostWithExcerpt
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ post }) => {
  // @TODO: Fix adding excerpt prop to posts query line 30

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;

  return (
    <Card className="mb-4">
      <CardHeader>
        {post.mainImage && (
          <Image
            src={postImageUrl || ''}
            alt={post.title || `Post cover image`}
            width={550}
            height={310}
            className="rounded-t-lg"
          />
        )}
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p>{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        {post.slug && (
          <Link href={`/blog/${post.slug.current}`} className="text-blue-500 hover:underline">
            Read more
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogPostItem;