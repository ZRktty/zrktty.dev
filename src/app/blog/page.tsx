import PostItem, {PostWithExcerpt} from "@/components/Blog/PostItem";
import {client} from "@/sanity/client";
import {POSTS_QUERY} from "@/sanity/queries";
import {Post} from "@/sanity/types";


const options = {next: {revalidate: 30}};
export default async function BlogPage() {
  // @TODO: Implement pagination
  // @TODO: figure out how to generate types for the query
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options) as PostWithExcerpt[];

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
          posts.length > 0 ? (
            posts.map((post) => (
              <PostItem post={post} key={post._id}/>
            ))) : (
            <p>No posts found :(</p>
          )
        }
      </ul>
    </main>
  );
};

