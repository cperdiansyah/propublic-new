import PostsContent from '@/components/pages/community/detail/posts/posts-content'

export default async function PostsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Posts</h1>
      <PostsContent />
    </>
  )
}
