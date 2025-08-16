import { Suspense } from 'react'
import ResetPasswordContent from '@/features/auth/pages/reset-password'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
