'use client'

// React & Next.js
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Shared modules
import BackgroundEffects from '@shared/components/effects/grid-glow'

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

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  })

  // Event handlers - separated for better testability
  const handlePasswordReset = async (data: ForgotPasswordInput) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // TODO: Replace with actual API call
      // const response = await passwordResetService.sendResetEmail(data.email)

      setSentEmail(data.email)
      setIsEmailSent(true)
    } catch (error) {
      form.setError('email', {
        type: 'manual',
        message: 'Failed to send reset email. Please try again.',
      })
    }
  }

  const handleResendEmail = async () => {
    setIsResending(true)
    try {
      // Simulate API call for resending
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // TODO: Replace with actual API call
      // await passwordResetService.sendResetEmail(sentEmail)
    } catch (error) {
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
          <ForgotPasswordForm form={form} onSubmit={handlePasswordReset} />
        </div>
      </div>
    </div>
  )
}
