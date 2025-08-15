'use client'

// React & Next.js
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'

// Shared modules
import BackgroundEffects from '@shared/components/effects/grid-glow'
import { useAuthNext } from '@shared/hooks/useAuthNext'

// Feature modules
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from '@/features/auth/schema'

// Relative imports
import { ResetPasswordForm } from './reset-password/reset-password-form'
import { ResetPasswordSuccess } from './reset-password/reset-password-success'
import { ResetPasswordSidebar } from './reset-password/reset-password-sidebar'

/**
 * Reset Password Page Component
 * Main page for password reset confirmation
 * Following Single Responsibility Principle
 */
export default function ResetPasswordContent() {
  const [isPasswordReset, setIsPasswordReset] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { confirmResetPassword, isLoading, error, clearError } = useAuthNext()

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      token: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Extract token from URL params on component mount
  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      router.push('/auth/forgot-password')
      return
    }

    form.setValue('token', token)
  }, [searchParams, router, form])

  // Event handlers - separated for better testability
  const handlePasswordReset = async (data: ResetPasswordInput) => {
    try {
      // Clear any previous errors
      clearError()

      // Call actual API through useAuthNext hook
      await confirmResetPassword(data)

      // Success - show success state
      setIsPasswordReset(true)
    } catch (apiError) {
      // Error toasts will be shown automatically by useAuthNext
      // Set form-specific error if needed
      if (error) {
        form.setError('password', {
          type: 'manual',
          message: error,
        })
      }
      console.error('Password reset failed:', apiError)
    }
  }

  const handleBackToLogin = () => {
    router.push('/auth/login')
  }

  if (isPasswordReset) {
    return <ResetPasswordSuccess onBackToLogin={handleBackToLogin} />
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 mt-14">
      <BackgroundEffects className="overflow-hidden" />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ResetPasswordSidebar />
          <ResetPasswordForm
            form={form}
            onSubmit={handlePasswordReset}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
