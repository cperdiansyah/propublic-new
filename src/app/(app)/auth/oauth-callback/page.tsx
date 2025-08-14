'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { handleGoogleCallback, handleDiscordCallback } from '@/services/oauth'
import { LoadingButton } from '@/shared/components/ui/loading-button'
import { ErrorMessage } from '@/shared/components/ui/error-message'

export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const provider = searchParams.get('provider') // Assume provider is passed in state or separate param

        if (!code) {
          throw new Error('No authorization code received')
        }

        let result: any

        // Determine provider and handle callback accordingly
        if (provider === 'google') {
          result = await handleGoogleCallback({
            code,
            state: state || undefined,
          })
        } else if (provider === 'discord') {
          result = await handleDiscordCallback({
            code,
            state: state || undefined,
          })
        } else {
          throw new Error('Unknown OAuth provider')
        }

        if (!result.token) {
          throw new Error('No token received from OAuth callback')
        }

        // Create a temporary credentials provider session using the OAuth token and user data
        const signInResult = await signIn('credentials', {
          email: `oauth_${provider}_${result.user.email}`, // Unique identifier for OAuth
          password: result.token, // Pass token as password
          redirect: false,
        })

        if (signInResult?.error) {
          throw new Error('Failed to create session')
        }

        // Redirect to dashboard or home page
        router.push('/')
      } catch (error) {
        console.error('OAuth callback error:', error)
        setError(
          error instanceof Error
            ? error.message
            : 'OAuth authentication failed',
        )
      } finally {
        setIsProcessing(false)
      }
    }

    processCallback()
  }, [searchParams, router])

  const handleRetry = () => {
    router.push('/auth/login')
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-secondary">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-primary mx-auto"></div>
          <h2 className="text-xl font-semibold text-cream">
            Processing Authentication...
          </h2>
          <p className="text-cream/60">
            Please wait while we complete your sign in
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-secondary">
        <div className="max-w-md w-full space-y-6 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cream mb-2">
              Authentication Failed
            </h2>
            <p className="text-cream/60 mb-6">
              There was an error processing your login
            </p>
          </div>

          <ErrorMessage message={error} onDismiss={() => setError(null)} />

          <LoadingButton onClick={handleRetry} fullWidth variant="primary">
            Back to Login
          </LoadingButton>
        </div>
      </div>
    )
  }

  return null
}
