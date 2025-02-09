import {PortableText, type SanityDocument} from "next-sanity";
import {client} from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import {urlFor} from "@/sanity/utils";
import {POST_QUERY} from "@/sanity/queries";


const options = {next: {revalidate: 30}};

export default async function PostPage({
                                         params,
                                       }: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline">
        ← Back to posts
      </Link>
      <article>
        {postImageUrl && (
          <Image
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose">
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
          {Array.isArray(post.body) && <PortableText value={post.body}/>}
        </div>
      </article>
    </main>
  );
}