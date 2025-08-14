'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { RegisterInput } from '@shared/utils/validations/auth'
import ROUTE from '@shared/config/pages'

import { UsernameField } from './form-fields/username-field'
import { EmailField } from './form-fields/email-field'
import { PasswordField } from './form-fields/password-field'
import { ConfirmPasswordField } from './form-fields/confirm-password-field'
import { TermsCheckbox } from './form-fields/terms-checkbox'
import { NewsletterCheckbox } from './form-fields/newsletter-checkbox'
import { SocialSignUp } from './social-signup'
import { SubmitButton } from './submit-button'

/**
 * Register Form Component
 * Handles the registration form with validation and submission
 * Following Single Responsibility Principle - only handles form logic
 */
interface RegisterFormProps {
  form: UseFormReturn<RegisterInput>
  isLoading: boolean
  onSubmit: (data: RegisterInput) => Promise<void>
}

export const RegisterForm = ({
  form,
  isLoading,
  onSubmit,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form

  const password = watch('password', '')

  return (
    <div className="enhanced-card border-radius-propublic p-8 md:p-10">
      <FormHeader />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <UsernameField register={register} error={errors.username?.message} />

        <EmailField register={register} error={errors.email?.message} />

        <PasswordField
          register={register}
          error={errors.password?.message}
          password={password}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <ConfirmPasswordField
          register={register}
          error={errors.confirmPassword?.message}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <FormCheckboxes register={register} errors={errors} />

        <ErrorDisplay error={errors.root?.message} />

        <SubmitButton isLoading={isLoading} isValid={isValid} />

        <FormDivider />

        <SocialSignUp />
      </form>

      <SignInPrompt />
    </div>
  )
}

/**
 * Form Header Component
 * Displays the form title and description
 */
const FormHeader = () => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold mb-2">Join ProPublic</h2>
    <p className="text-cream/70">Start your journey to gaming excellence</p>
  </div>
)

/**
 * Form Checkboxes Component
 * Groups terms and newsletter checkboxes
 */
interface FormCheckboxesProps {
  register: UseFormReturn<RegisterInput>['register']
  errors: UseFormReturn<RegisterInput>['formState']['errors']
}

const FormCheckboxes = ({ register, errors }: FormCheckboxesProps) => (
  <div className="space-y-4">
    <TermsCheckbox register={register} error={errors.agreeToTerms?.message} />
    <NewsletterCheckbox register={register} />
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
        Or sign up with
      </span>
    </div>
  </div>
)

/**
 * Sign In Prompt Component
 * Link to login page for existing users
 */
const SignInPrompt = () => (
  <div className="text-center mt-8">
    <p className="text-cream/70">
      Already have an account?{' '}
      <Link
        href={ROUTE.PUBLIC.AUTH.LOGIN}
        className="text-custom-accent hover:text-custom-accent/80 font-semibold transition-colors"
      >
        Sign in
      </Link>
    </p>
  </div>
)
