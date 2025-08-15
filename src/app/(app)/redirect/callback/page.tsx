'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@shared/store/hooks'
import { oauthLogin } from '@shared/store/reducers/authReducer'

/**
 * OAuth Redirect Callback Page
 * Handles the new OAuth flow: https://propublic.gg/redirect/callback?token=...&provider=...
 * Extracts token from URL params and notifies parent window (popup) or redirects
 */
export default function RedirectCallbackPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isProcessing, setIsProcessing] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Extract token and provider from URL params
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const provider = urlParams.get('provider')
        const error = urlParams.get('error')

        if (error) {
          throw new Error(`OAuth error: ${error}`)
        }

        if (!token || !provider) {
          throw new Error('Missing token or provider in callback URL')
        }

        console.log('Processing OAuth callback:', {
          provider,
          tokenLength: token.length,
        })

        // Use Redux OAuth login thunk to authenticate with token and fetch user data
        const result = await dispatch(oauthLogin(token))

        if (oauthLogin.rejected.match(result)) {
          throw new Error(
            (result.payload as string) ||
              'Failed to authenticate with OAuth token',
          )
        }

        console.log('OAuth authentication successful')

        // Authentication successful
        if (window.opener) {
          // Notify parent window of successful authentication
          window.opener.postMessage(
            {
              type: 'OAUTH_SUCCESS',
              token,
              provider,
            },
            window.location.origin,
          )
          window.close()
        } else {
          // Direct navigation - redirect to dashboard
          router.push('/dashboard')
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Authentication failed'

        console.error('OAuth callback error:', errorMessage)

        if (window.opener) {
          // Notify parent window of error
          window.opener.postMessage(
            {
              type: 'OAUTH_ERROR',
              error: errorMessage,
            },
            window.location.origin,
          )
          window.close()
        } else {
          // Direct navigation - show error
          setAuthError(errorMessage)
          setIsProcessing(false)
        }
      }
    }

    processCallback()
  }, [router])

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
            {window.opener
              ? 'Completing sign in...'
              : 'Please wait while we complete your sign in'}
          </p>
        </div>
      </div>
    )
  }

  const displayError = authError

  if (displayError) {
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

          <div className="bg-red-900/20 border border-red-500 rounded-md p-4">
            <p className="text-red-400 text-sm">{displayError}</p>
          </div>

          <button
            onClick={handleRetry}
            className="w-full bg-custom-primary hover:bg-custom-primary/90 text-cream font-medium py-2 px-4 rounded-md transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return null
}
