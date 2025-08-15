'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/features/auth/schema'
import BackgroundEffects from '@shared/components/effects/grid-glow'
import { useAuthNext } from '@shared/hooks/useAuthNext'

import { RegisterForm } from './register/register-form'
import { RegisterSidebar } from './register/register-sidebar'

/**
 * Register Page Component
 * Main registration page following clean architecture principles:
 * - Single Responsibility: Each component has one clear purpose
 * - Separation of Concerns: Form logic, validation, and UI are separated
 * - Dependency Inversion: Components depend on abstractions
 * - Open/Closed: Easy to extend without modifying existing code
 */
export default function RegisterContent() {
  const { signup, isLoading, error, clearError } = useAuthNext()

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: navigator.language || 'en',
    },
  })

  const { setError, clearErrors } = form

  // Handle external authentication errors
  useEffect(() => {
    if (error) {
      setError('root', {
        type: 'manual',
        message: error,
      })
    }
  }, [error, setError])

  // Form submission handler
  const handleSubmit = async (data: RegisterInput) => {
    try {
      clearErrors()
      clearError()
      await signup(data)
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex relative items-center justify-center px-4 py-12 mt-14">
      <BackgroundEffects className="overflow-hidden" />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center md:items-start">
          {/* Registration Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 order-2 lg:order-1">
            <RegisterForm
              form={form}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Branding & Benefits Sidebar */}
          <RegisterSidebar />
        </div>
      </div>
    </div>
  )
}
