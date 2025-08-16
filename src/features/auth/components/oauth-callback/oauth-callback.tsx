'use client'

import { useOAuthCallback } from '@/features/auth/hooks/use-oauth-callback'
import { CallbackLoading } from './callback-loading'
import { CallbackError } from './callback-error'
import type { OAuthCallbackProps } from '@/features/auth/types'

/**
 * OAuth Redirect Callback Component
 * Handles OAuth callback flow with clean separation of concerns
 *
 * @example
 * ```tsx
 * <OAuthCallback className="custom-styling" />
 * ```
 */
export const OAuthCallback = ({ className }: OAuthCallbackProps) => {
  const { state, actions } = useOAuthCallback()
  const { isProcessing, authError } = state
  const { handleRetry } = actions

  const isPopupWindow = typeof window !== 'undefined' && Boolean(window.opener)

  if (isProcessing) {
    return (
      <CallbackLoading isPopupWindow={isPopupWindow} className={className} />
    )
  }

  if (authError) {
    return (
      <CallbackError
        error={authError}
        onRetry={handleRetry}
        className={className}
      />
    )
  }

  return null
}
