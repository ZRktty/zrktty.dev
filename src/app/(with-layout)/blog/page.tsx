import PostItem, { PostWithExcerpt } from '@/components/Blog/PostItem'
import { client } from '@/sanity/client'
import { POSTS_QUERY } from '@/sanity/queries'

const options = { next: { revalidate: 30 } }
export default async function BlogPage() {
  // @TODO: Implement pagination
  // @TODO: figure out how to generate types for the query
  const posts = await client.fetch<PostWithExcerpt[]>(POSTS_QUERY, {}, options)

  return (
    <main className="container mx-auto min-h-screen max-w-3xl px-4 py-6 md:p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostItem post={post} key={post._id} />)
        ) : (
          <p>No posts found :(</p>
        )}
      </div>
    </main>
  )
}
