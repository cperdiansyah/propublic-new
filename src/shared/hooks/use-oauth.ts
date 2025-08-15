'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@shared/store/hooks'
import { store } from '@shared/store/store'
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
        success: oAuthResult.success,
        provider: oAuthResult.provider,
        error: oAuthResult.error,
      })

      if (!oAuthResult.success) {
        throw new Error(oAuthResult.error || 'OAuth authentication failed')
      }

      // Popup already completed OAuth flow and saved to localStorage
      // Wait for Redux Persist to rehydrate the main window
      console.log(
        'Main window: Waiting for Redux rehydration from localStorage',
      )

      // Set up listener for auth state changes
      const checkAuthState = () => {
        return new Promise<void>((resolve) => {
          const maxAttempts = 10
          let attempts = 0

          const checkInterval = setInterval(() => {
            attempts++
            console.log(
              `Main window: Checking auth state (attempt ${attempts})`,
            )

            // Check if user is now authenticated in Redux store
            const state = store.getState()
            if (state.auth.isAuthenticated && state.auth.user) {
              console.log('Main window: Auth state rehydrated successfully!')
              clearInterval(checkInterval)
              resolve()
            } else if (attempts >= maxAttempts) {
              console.log('Main window: Auth state rehydration timeout')
              clearInterval(checkInterval)
              resolve() // Continue anyway, maybe it will work
            }
          }, 200)
        })
      }

      await checkAuthState()

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
