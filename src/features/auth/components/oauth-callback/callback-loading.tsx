import type { CallbackLoadingProps } from '@/features/auth/types'

/**
 * Loading state component for OAuth callback
 * Displays appropriate messaging based on popup vs direct navigation context
 */
export const CallbackLoading = ({
  isPopupWindow,
  className = '',
}: CallbackLoadingProps) => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-dark-secondary ${className}`}
    >
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-primary mx-auto" />
        <h2 className="text-xl font-semibold text-cream">
          Processing Authentication...
        </h2>
        <p className="text-cream/60">
          {isPopupWindow
            ? 'Completing sign in...'
            : 'Please wait while we complete your sign in'}
        </p>
      </div>
    </div>
  )
}
