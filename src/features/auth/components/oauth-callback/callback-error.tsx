import type { CallbackErrorProps } from '@/features/auth/types'

/**
 * Error state component for OAuth callback
 * Displays error message with retry functionality
 */
export const CallbackError = ({
  error,
  onRetry,
  className = '',
}: CallbackErrorProps) => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-dark-secondary ${className}`}
    >
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
          <p className="text-red-400 text-sm">{error}</p>
        </div>

        <button
          onClick={onRetry}
          className="w-full bg-custom-primary hover:bg-custom-primary/90 text-cream font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-custom-primary focus:ring-offset-2 focus:ring-offset-dark-secondary"
          type="button"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}
