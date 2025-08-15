'use client'

// React & Next.js
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Shared modules
import BackgroundEffects from '@shared/components/effects/grid-glow'
import { useAuthNext } from '@shared/hooks/useAuthNext'

// Feature modules
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from '@/features/auth/schema'

// Relative imports
import { ForgotPasswordForm } from './forgot-password/forgot-password-form'
import { EmailSentSuccess } from './forgot-password/email-sent-success'
import { ForgotPasswordSidebar } from './forgot-password/forgot-password-sidebar'

/**
 * Forgot Password Page Component
 * Main page orchestrating password reset flow
 * Following Single Responsibility Principle
 */
export default function ForgotPasswordContent() {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [sentEmail, setSentEmail] = useState('')

  const { resetPassword, isLoading, error, clearError } = useAuthNext()

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  })

  // Event handlers - separated for better testability
  const handlePasswordReset = async (data: ForgotPasswordInput) => {
    try {
      // Clear any previous errors
      clearError()

      // Call actual API through useAuthNext hook
      await resetPassword(data.email)

      // Success toast will be shown automatically by useAuthNext
      setSentEmail(data.email)
      setIsEmailSent(true)
    } catch (apiError) {
      // Error toasts will be shown automatically by useAuthNext
      // Set form-specific error if needed
      if (error) {
        form.setError('email', {
          type: 'manual',
          message: error,
        })
      }
      console.error('Password reset failed:', apiError)
    }
  }

  const handleResendEmail = async () => {
    setIsResending(true)
    try {
      // Call actual API through useAuthNext hook for resending
      await resetPassword(sentEmail)

      // Success toast will be shown automatically by useAuthNext
    } catch (error) {
      // Error toasts will be shown automatically by useAuthNext
      console.error('Failed to resend email:', error)
    } finally {
      setIsResending(false)
    }
  }

  if (isEmailSent) {
    return (
      <EmailSentSuccess
        email={sentEmail}
        isResending={isResending}
        onResendEmail={handleResendEmail}
      />
    )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 mt-14">
      <BackgroundEffects className="overflow-hidden" />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ForgotPasswordSidebar />
          <ForgotPasswordForm
            form={form}
            onSubmit={handlePasswordReset}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
