'use client'

// React & Next.js
import { useId } from 'react'
import Link from 'next/link'
import type { UseFormReturn } from 'react-hook-form'

// External libraries
import { Mail, ArrowRight, ArrowLeft, Shield, AlertCircle } from 'lucide-react'

// Shared modules
import ROUTE from '@shared/config/pages'

// Feature modules
import type { ForgotPasswordInput } from '@/features/auth/schema'

/**
 * Forgot Password Form Component
 * Handles the password reset form with validation and submission
 * Following Single Responsibility Principle
 */
interface ForgotPasswordFormProps {
  form: UseFormReturn<ForgotPasswordInput>
  onSubmit: (data: ForgotPasswordInput) => Promise<void>
}

export const ForgotPasswordForm = ({
  form,
  onSubmit,
}: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = form

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="enhanced-card border-radius-propublic p-8 md:p-10">
        <MobileLogo />
        <FormHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <EmailField register={register} error={errors.email?.message} />

          <SubmitButton isSubmitting={isSubmitting} isValid={isValid} />

          <SecurityNotice />
        </form>

        <BackToLogin />
        <HelpSection />
      </div>
    </div>
  )
}

/**
 * Mobile Logo Component
 * Shows logo on mobile devices
 */
const MobileLogo = () => (
  <div className="lg:hidden text-center mb-8">
    <Link
      href={ROUTE.PUBLIC.HOME}
      className="inline-flex items-center space-x-3"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-custom-primary to-custom-secondary border-radius-propublic flex items-center justify-center animate-glow">
        <span className="logo-p text-cream">P</span>
      </div>
      <span className="font-bold text-2xl text-cream">PROPUBLIC</span>
    </Link>
  </div>
)

/**
 * Form Header Component
 * Displays the form title and description
 */
const FormHeader = () => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
    <p className="text-cream/70">Enter your email to receive a reset link</p>
  </div>
)

/**
 * Email Field Component
 * Email input with validation
 */
interface EmailFieldProps {
  register: UseFormReturn<ForgotPasswordInput>['register']
  error?: string
}

const EmailField = ({ register, error }: EmailFieldProps) => {
  const emailId = useId()

  return (
    <div>
      <label htmlFor={emailId} className="block text-cream font-semibold mb-3">
        Email Address
      </label>
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
        <input
          {...register('email')}
          id={emailId}
          type="email"
          className={`input-field w-full pl-12 pr-4 py-4 border-radius-propublic text-cream placeholder-cream/50 focus:outline-none ${
            error ? 'border-red-500 focus:border-red-500' : ''
          }`}
          placeholder="your@email.com"
        />
        {error && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
        )}
      </div>

      {error ? (
        <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      ) : (
        <p className="text-cream/60 text-xs mt-2">
          We'll send a reset link to this email address
        </p>
      )}
    </div>
  )
}

/**
 * Submit Button Component
 * Form submission button with loading state
 */
interface SubmitButtonProps {
  isSubmitting: boolean
  isValid: boolean
}

const SubmitButton = ({ isSubmitting, isValid }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isSubmitting || !isValid}
    className="w-full bg-gradient-to-r from-custom-primary to-custom-secondary text-cream py-4 border-radius-propublic font-bold text-lg hover:shadow-lg transition-all glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 propublic-button"
  >
    {isSubmitting ? (
      <>
        <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin"></div>
        <span className="font-teko">Sending Reset Link...</span>
      </>
    ) : (
      <>
        <span className="font-teko">Send Reset Link</span>
        <ArrowRight className="w-5 h-5" />
      </>
    )}
  </button>
)

/**
 * Security Notice Component
 * Displays security information
 */
const SecurityNotice = () => (
  <div className="bg-custom-accent/10 border border-custom-accent/20 border-radius-propublic p-4">
    <div className="flex items-start space-x-3">
      <Shield className="w-5 h-5 text-custom-accent flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold text-custom-accent mb-1">
          Security Notice
        </h4>
        <p className="text-cream/70 text-sm">
          For your protection, reset links expire in 15 minutes and can only be
          used once.
        </p>
      </div>
    </div>
  </div>
)

/**
 * Back to Login Component
 * Link to return to login page
 */
const BackToLogin = () => (
  <div className="text-center mt-8">
    <Link
      href={ROUTE.PUBLIC.AUTH.LOGIN}
      className="inline-flex items-center space-x-2 text-cream/70 hover:text-custom-accent transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to Login</span>
    </Link>
  </div>
)

/**
 * Help Section Component
 * Links to register and support
 */
const HelpSection = () => (
  <div className="mt-8 pt-6 border-t border-cream/10 text-center">
    <p className="text-cream/60 text-sm mb-3">Don't have an account yet?</p>
    <Link
      href={ROUTE.PUBLIC.AUTH.REGISTER}
      className="text-custom-accent hover:text-custom-accent/80 font-semibold transition-colors"
    >
      Sign up for free
    </Link>
  </div>
)
