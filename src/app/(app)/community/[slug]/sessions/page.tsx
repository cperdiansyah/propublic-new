import SessionsContent from '@features/community/components/detail/posts/sessions/sessions-content'

export default async function SessionsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Sessions</h1>
      <SessionsContent />
    </>
  )
}
