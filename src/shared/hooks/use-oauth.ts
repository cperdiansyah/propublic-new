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
      console.log('Main window: Starting OAuth flow for provider:', provider)
      const oAuthResult: OAuthResult = await startOAuthLogin(provider)

      console.log('Main window: Received OAuth result:', {
        hasToken: !!oAuthResult.token,
        tokenLength: oAuthResult.token?.length,
        provider: oAuthResult.provider,
      })

      if (!oAuthResult.token) {
        throw new Error('No authentication token received')
      }

      console.log(
        'Main window: Popup completed OAuth with NextAuth, now populating Redux store',
      )

      // The popup already created a NextAuth session, now we need to populate Redux for components that use it
      const result = await dispatch(oauthLogin(oAuthResult.token))

      console.log('Main window: oauthLogin result:', {
        fulfilled: oauthLogin.fulfilled.match(result),
        rejected: oauthLogin.rejected.match(result),
        payload: result.payload,
      })

      if (oauthLogin.rejected.match(result)) {
        console.warn(
          'Main window: Redux OAuth failed, but NextAuth session should still work',
        )
        // Don't throw error since NextAuth session is already created
      } else {
        console.log('Main window: Redux state populated successfully')
      }

      // OAuth authentication successful - redirect to home
      console.log('Main window: Redirecting to home')
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
