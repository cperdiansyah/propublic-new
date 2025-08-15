'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { startOAuthLogin, type OAuthResult } from '@shared/services/oauth'

export interface UseOAuthReturn {
  isLoading: boolean
  error: string | null
  authenticateWithOAuth: (provider: 'google' | 'discord') => Promise<void>
  clearError: () => void
}

/**
 * Custom hook for OAuth authentication
 * Handles the popup-based OAuth flow with social link endpoints
 */
export const useOAuth = (): UseOAuthReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  /**
   * Initiates OAuth flow by opening popup to social link endpoint
   * Waits for token from popup and creates user session
   */
  const authenticateWithOAuth = async (provider: 'google' | 'discord') => {
    setIsLoading(true)
    setError(null)

    try {
      // Start OAuth flow with popup
      const oAuthResult: OAuthResult = await startOAuthLogin(provider)

      if (!oAuthResult.token) {
        throw new Error('No authentication token received')
      }

      // Create NextAuth session using credentials provider
      const signInResult = await signIn('credentials', {
        email: `oauth_${provider}_user`,
        password: oAuthResult.token,
        redirect: false,
      })

      if (signInResult?.error) {
        throw new Error('Failed to create authentication session')
      }

      // OAuth authentication successful
      return
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'OAuth authentication failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    authenticateWithOAuth,
    clearError,
  }
}
