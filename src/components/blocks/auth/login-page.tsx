'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  GamepadIcon,
  Trophy,
  Users,
  AlertCircle,
} from 'lucide-react'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import BackgroundEffects from '@/components/blocks/effects/grid-glow'

export default function LoginContent() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would make the actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error('Invalid credentials');
      // }

      // Handle successful login (redirect, etc.)
      console.log('Login successful:', data)
    } catch (error) {
      // Handle API errors
      setError('email', {
        type: 'manual',
        message: 'Invalid email or password. Please try again.',
      })
    }
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
                Welcome back to the
                <span className="gradient-text"> ultimate gaming</span>{' '}
                community
              </h1>

              <p className="text-xl text-cream/80 leading-relaxed">
                Connect with pro players, improve your skills, and dominate your
                favorite games.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-custom-primary/20 border-radius-propublic flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-custom-primary" />
                </div>
                <div className="text-2xl font-bold gradient-text">28K+</div>
                <div className="text-cream/60 text-sm">Active Gamers</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-custom-accent/20 border-radius-propublic flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-custom-accent" />
                </div>
                <div className="text-2xl font-bold gradient-text">1.2K+</div>
                <div className="text-cream/60 text-sm">Pro Coaches</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-custom-secondary/20 border-radius-propublic flex items-center justify-center mx-auto mb-3">
                  <GamepadIcon className="w-6 h-6 text-custom-secondary" />
                </div>
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-cream/60 text-sm">Games</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="testimonial-card border-radius-propublic p-6 border border-custom-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-custom-accent rounded-full flex items-center justify-center">
                  <span className="text-dark-primary font-bold">🏆</span>
                </div>
                <div>
                  <h3 className="font-bold">ProGamer_2024</h3>
                  <p className="text-cream/60 text-sm">Radiant Player</p>
                </div>
              </div>
              <p className="text-cream/80 italic">
                "ProPublic helped me reach Radiant in just 3 months. The
                coaching is incredible!"
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 border-radius-propublic">
            <div className="enhanced-card border-radius-propublic p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-cream/70">
                  Sign in to continue your gaming journey
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
                      className={`input-field w-full pl-12 pr-4 py-4  text-cream placeholder-cream/50 focus:outline-none border-radius-propublic ${
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
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email.message}</span>
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-cream font-semibold mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className={`input-field w-full pl-12 pr-12 py-4 border-radius-propublic text-cream placeholder-cream/50 focus:outline-none ${
                        errors.password
                          ? 'border-red-500 focus:border-red-500'
                          : ''
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cream/40 hover:text-cream transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password.message}</span>
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      {...register('rememberMe')}
                      type="checkbox"
                      className="w-4 h-4 rounded border-cream/30 bg-dark-secondary text-custom-primary focus:ring-custom-primary focus:ring-2"
                    />
                    <span className="text-cream/70 text-sm">Remember me</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-custom-accent hover:text-custom-accent/80 text-sm font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-custom-primary to-custom-secondary text-cream py-4 border-radius-propublic font-bold text-lg hover:shadow-lg transition-all glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-cream/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-dark-secondary text-cream/60">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 border border-cream/20 hover:border-custom-accent text-cream/80 hover:text-custom-accent py-3 border-radius-propublic transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 border border-cream/20 hover:border-custom-accent text-cream/80 hover:text-custom-accent py-3 border-radius-propublic transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span>Discord</span>
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="text-center mt-8">
                <p className="text-cream/70">
                  Don't have an account?{' '}
                  <Link
                    href="/auth/register"
                    className="text-custom-accent hover:text-custom-accent/80 font-semibold transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
