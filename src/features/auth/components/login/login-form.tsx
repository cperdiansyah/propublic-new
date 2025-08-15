'use client'

// React & Next.js
import { useState } from 'react'
import Link from 'next/link'
import type { UseFormReturn, UseFormRegister } from 'react-hook-form'

// External libraries
import { AlertCircle } from 'lucide-react'

// Shared modules
import ROUTE from '@shared/config/pages'

// Feature modules
import type { LoginInput } from '@/features/auth/schema'

// Relative imports
import { EmailField } from '../shared-fields/email-field'
import { PasswordField } from '../shared-fields/password-field'
import { RememberMeCheckbox } from './form-fields/remember-me-checkbox'
import { SocialSignIn } from './social-signin'
import { LoginSubmitButton } from './submit-button'

/**
 * Login Form Component
 * Handles the login form with validation and submission
 * Following Single Responsibility Principle - only handles form logic
 */
interface LoginFormProps {
  form: UseFormReturn<LoginInput>
  isLoading: boolean
  onSubmit: (data: LoginInput) => Promise<void>
  onSocialLogin: (provider: 'google' | 'discord') => Promise<void>
}

export const LoginForm = ({
  form,
  isLoading,
  onSubmit,
  onSocialLogin,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form

  return (
    <div className="enhanced-card border-radius-propublic p-8 md:p-10">
      <FormHeader />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <EmailField
          register={register}
          error={errors.email?.message}
          placeholder="your@email.com"
        />

        <PasswordField
          register={register}
          error={errors.password?.message}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          placeholder="Enter your password"
          showRequirements={false}
        />

        <FormOptions register={register} />

        <ErrorDisplay error={errors.root?.message} />

        <LoginSubmitButton isLoading={isLoading} isValid={isValid} />

        <FormDivider />

        <SocialSignIn onSocialLogin={onSocialLogin} />
      </form>

      <SignUpPrompt />
    </div>
  )
}

/**
 * Form Header Component
 * Displays the login form title and description
 */
const FormHeader = () => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
    <p className="text-cream/70">Sign in to continue your gaming journey</p>
  </div>
)

/**
 * Form Options Component
 * Contains remember me checkbox and forgot password link
 */
interface FormOptionsProps {
  register: UseFormRegister<LoginInput>
}

const FormOptions = ({ register }: FormOptionsProps) => (
  <div className="flex items-center justify-between">
    <RememberMeCheckbox register={register} />
    <Link
      href={ROUTE.PUBLIC.AUTH.FORGOT_PASSWORD}
      className="text-custom-accent hover:text-custom-accent/80 text-sm font-medium transition-colors"
    >
      Forgot password?
    </Link>
  </div>
)

/**
 * Error Display Component
 * Shows form-level errors
 */
interface ErrorDisplayProps {
  error?: string
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (!error) return null

  return (
    <div className="bg-red-500/10 border border-red-500/20 border-radius-propublic p-4 flex items-center space-x-3">
      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  )
}

/**
 * Form Divider Component
 * Visual separator between form and social options
 */
const FormDivider = () => (
  <div className="relative my-8">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-cream/20" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-4 bg-dark-secondary text-cream/60">
        Or continue with
      </span>
    </div>
  </div>
)

/**
 * Sign Up Prompt Component
 * Link to register page for new users
 */
const SignUpPrompt = () => (
  <div className="text-center mt-8">
    <p className="text-cream/70">
      Don't have an account?{' '}
      <Link
        href={ROUTE.PUBLIC.AUTH.REGISTER}
        className="text-custom-accent hover:text-custom-accent/80 font-semibold transition-colors"
      >
        Sign up for free
      </Link>
    </p>
  </div>
)
