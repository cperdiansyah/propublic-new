'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from '@/lib/validations/auth'
import BackgroundEffects from '@/components/blocks/effects/grid-glow'

export default function ForgotPasswordContent() {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [sentEmail, setSentEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    getValues,
    setError,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would make the actual API call
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to send reset email');
      // }

      setSentEmail(data.email)
      setIsEmailSent(true)
    } catch (error) {
      // Handle API errors
      setError('email', {
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

      // Here you would make the actual API call to resend
      // await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: sentEmail }),
      // });
    } catch (error) {
      console.error('Failed to resend email:', error)
    } finally {
      setIsResending(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
        <BackgroundEffects className="overflow-hidden" />

        <div className="max-w-md mx-auto w-full relative">
          <div className="enhanced-card border-radius-propublic p-8 md:p-10 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-fadeIn">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>

            <h2 className="text-3xl font-bold mb-4">Check Your Email</h2>
            <p className="text-cream/70 mb-6 leading-relaxed">
              We've sent a password reset link to{' '}
              <span className="text-custom-accent font-semibold">
                {sentEmail}
              </span>
            </p>

            {/* Instructions */}
            <div className="bg-dark-primary/50 border-radius-propublic p-6 mb-8 text-left">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Shield className="w-5 h-5 text-custom-accent mr-2" />
                Next Steps:
              </h3>
              <ol className="space-y-3 text-cream/80">
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-custom-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-custom-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Click the "Reset Password" link</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-custom-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Create your new password</span>
                </li>
              </ol>
            </div>

            {/* Timer and Resend */}
            <div className="bg-custom-accent/10 border border-custom-accent/20 border-radius-propublic p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-custom-accent mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Link expires in 15 minutes
                </span>
              </div>
              <p className="text-cream/60 text-xs">
                Didn't receive the email? Check your spam folder or request a
                new one.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full border border-custom-accent hover:bg-custom-accent hover:text-dark-primary text-custom-accent py-3 border-radius-propublic font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isResending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-custom-accent/30 border-t-custom-accent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Resend Email</span>
                  </>
                )}
              </button>

              <Link
                href="/auth/login"
                className="w-full bg-gradient-to-r from-custom-primary to-custom-secondary text-cream py-3 border-radius-propublic font-semibold hover:shadow-lg transition-all glow flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-8 pt-6 border-t border-cream/10">
              <p className="text-cream/60 text-sm">
                Still having trouble?{' '}
                <Link
                  href="/support"
                  className="text-custom-accent hover:text-custom-accent/80 underline"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 mt-14">
      <BackgroundEffects className="overflow-hidden" />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Forgot your
                <span className="gradient-text"> password?</span>
              </h1>

              <p className="text-xl text-cream/80 leading-relaxed">
                No worries! We'll help you reset it and get you back to
                dominating your games.
              </p>
            </div>

            {/* Security Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Secure Reset Process</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-custom-primary/20 border-radius-propublic flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-custom-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Encrypted Email Link</h4>
                    <p className="text-cream/70 text-sm">
                      Secure, time-limited reset link sent to your email
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-custom-accent/20 border-radius-propublic flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-custom-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold">15-Minute Expiry</h4>
                    <p className="text-cream/70 text-sm">
                      Links expire quickly for maximum security
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-custom-secondary/20 border-radius-propublic flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-custom-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Account Protection</h4>
                    <p className="text-cream/70 text-sm">
                      Your gaming progress and data stay safe
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gaming Motivation */}
            <div className="testimonial-card border-radius-propublic p-6 border border-custom-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-custom-accent rounded-full flex items-center justify-center">
                  <span className="text-dark-primary font-bold">🎮</span>
                </div>
                <div>
                  <h3 className="font-bold">Quick Tip</h3>
                  <p className="text-cream/60 text-sm">Pro Player</p>
                </div>
              </div>
              <p className="text-cream/80 italic">
                "Use a strong, unique password for your gaming accounts. Your
                rank depends on it!"
              </p>
            </div>
          </div>

          {/* Right Side - Reset Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="enhanced-card border-radius-propublic p-8 md:p-10">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-8">
                <Link href="/" className="inline-flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-custom-primary to-custom-secondary border-radius-propublic flex items-center justify-center animate-glow">
                    <span className="logo-p text-cream">P</span>
                  </div>
                  <span className="font-bold text-2xl text-cream">
                    PROPUBLIC
                  </span>
                </Link>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
                <p className="text-cream/70">
                  Enter your email to receive a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-cream font-semibold mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
                    <input
                      {...register('email')}
                      type="email"
                      className={`input-field w-full pl-12 pr-4 py-4 border-radius-propublic text-cream placeholder-cream/50 focus:outline-none ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : ''
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      </div>
                    )}
                  </div>

                  {errors.email ? (
                    <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email.message}</span>
                    </p>
                  ) : (
                    <p className="text-cream/60 text-xs mt-2">
                      We'll send a reset link to this email address
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full bg-gradient-to-r from-custom-primary to-custom-secondary text-cream py-4 border-radius-propublic font-bold text-lg hover:shadow-lg transition-all glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin"></div>
                      <span>Sending Reset Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Security Notice */}
                <div className="bg-custom-accent/10 border border-custom-accent/20 border-radius-propublic p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-custom-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-custom-accent mb-1">
                        Security Notice
                      </h4>
                      <p className="text-cream/70 text-sm">
                        For your protection, reset links expire in 15 minutes
                        and can only be used once.
                      </p>
                    </div>
                  </div>
                </div>
              </form>

              {/* Back to Login */}
              <div className="text-center mt-8">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center space-x-2 text-cream/70 hover:text-custom-accent transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </Link>
              </div>

              {/* Help Section */}
              <div className="mt-8 pt-6 border-t border-cream/10 text-center">
                <p className="text-cream/60 text-sm mb-3">
                  Don't have an account yet?
                </p>
                <Link
                  href="/auth/register"
                  className="text-custom-accent hover:text-custom-accent/80 font-semibold transition-colors"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
