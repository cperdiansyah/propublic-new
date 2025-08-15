'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@shared/store/hooks'
import { oauthLogin } from '@shared/store/reducers/authReducer'
import { startOAuthLogin, type OAuthResult } from '@shared/services/oauth'
import ROUTE from '@shared/config/pages'

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
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading: authLoading, error: authError } = useAppSelector(
    (state) => state.auth,
  )

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

      // Use Redux OAuth login thunk to authenticate with token and fetch user data
      const result = await dispatch(oauthLogin(oAuthResult.token))

      if (oauthLogin.rejected.match(result)) {
        throw new Error(
          (result.payload as string) ||
            'Failed to authenticate with OAuth token',
        )
      }

      // OAuth authentication successful - redirect to home
      router.push(ROUTE.PUBLIC.HOME)
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
    isLoading: isLoading || authLoading,
    error: error || authError,
    authenticateWithOAuth,
    clearError,
  }
}
