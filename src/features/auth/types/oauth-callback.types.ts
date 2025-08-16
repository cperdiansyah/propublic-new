/**
 * OAuth Callback Component Props
 */
export interface OAuthCallbackProps {
  className?: string
}

/**
 * Callback Loading Component Props
 */
export interface CallbackLoadingProps {
  isPopupWindow: boolean
  className?: string
}

/**
 * Callback Error Component Props
 */
export interface CallbackErrorProps {
  error: string
  onRetry: () => void
  className?: string
}
