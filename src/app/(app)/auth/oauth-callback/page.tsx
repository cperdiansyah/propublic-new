'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Legacy OAuth Callback Page
 * @deprecated This page is deprecated. Use /redirect/callback instead.
 * Redirects to the new callback handler automatically.
 */
export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if this is the new redirect format with token
    const token = searchParams.get('token')
    const provider = searchParams.get('provider')

    if (token && provider) {
      // Redirect to new callback handler
      router.replace(`/redirect/callback?token=${token}&provider=${provider}`)
    } else {
      // No valid parameters, redirect to login
      router.replace('/auth/login')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-secondary">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-primary mx-auto"></div>
        <h2 className="text-xl font-semibold text-cream">Redirecting...</h2>
        <p className="text-cream/60">
          Please wait while we redirect you to the updated authentication flow
        </p>
      </div>
    </div>
  )
}
