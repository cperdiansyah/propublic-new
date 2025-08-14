'use client'

import { ArrowRight } from 'lucide-react'

/**
 * Login Submit Button Component
 * Form submission button with loading state for login
 */
interface LoginSubmitButtonProps {
  isLoading: boolean
  isValid: boolean
}

export const LoginSubmitButton = ({
  isLoading,
  isValid,
}: LoginSubmitButtonProps) => (
  <button
    type="submit"
    disabled={isLoading || !isValid}
    className="w-full bg-gradient-to-r from-custom-primary to-custom-secondary text-cream py-4 border-radius-propublic font-bold text-lg hover:shadow-lg transition-all glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 propublic-button"
  >
    {isLoading ? (
      <>
        <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
        <span className="font-teko">Signing In...</span>
      </>
    ) : (
      <>
        <span className="font-teko">Sign In</span>
        <ArrowRight className="w-5 h-5" />
      </>
    )}
  </button>
)
