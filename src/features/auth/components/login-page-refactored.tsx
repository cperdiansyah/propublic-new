'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail,
  Lock,
  ArrowRight,
  GamepadIcon,
  Trophy,
  Users,
} from 'lucide-react'

// Custom hooks and utilities
import { useForm } from '@shared/hooks/useForm'
import { useAuthNext } from '@shared/hooks/useAuthNext'

// OAuth service
import { startOAuthLogin } from '../services/oauth'

// Validation schema
import { loginSchema, type LoginInput } from '@shared/utils/validations/auth'

// Reusable components
import { AuthLayout } from './auth-layout'
import { FormField } from '@/shared/components/ui/form-field'
import { LoadingButton } from '@/shared/components/ui/loading-button'
import { ErrorMessage } from '@/shared/components/ui/error-message'
import { SocialButton } from '@/shared/components/ui/social-button'
import { PasswordToggle } from './password-toggle'
import { AuthStats } from '@shared/components/auth/auth-stats'
import { Testimonial } from '@shared/components/auth/testimonial'

// Config and constants
import ROUTE from '@shared/config/pages'

// Constants - easily maintainable and testable
const STATS_DATA = [
  {
    icon: Users,
    value: '28K+',
    label: 'Active Gamers',
    color: 'primary' as const,
  },
  {
    icon: Trophy,
    value: '1.2K+',
    label: 'Pro Coaches',
    color: 'accent' as const,
  },
  {
    icon: GamepadIcon,
    value: '50+',
    label: 'Games',
    color: 'secondary' as const,
  },
]

const TESTIMONIAL_DATA = {
  avatar: '🏆',
  name: 'ProGamer_2024',
  title: 'Radiant Player',
  message:
    'ProPublic helped me reach Radiant in just 3 months. The coaching is incredible!',
}

// Main component following SRP (Single Responsibility Principle)
export default function LoginPageRefactored() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error, clearError } = useAuthNext()

  // Custom form hook with enhanced error handling
  const {
    register,
    onSubmit,
    formState: { errors, isValid },
  } = useForm({
    schema: loginSchema,
    externalError: error,
    onErrorChange: clearError,
    onSubmit: async (data: LoginInput) => {
      await login(data)
    },
  })

  // Event handlers - separated for better testability
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)
  const handleSocialLogin = async (provider: 'google' | 'discord') => {
    try {
      await startOAuthLogin(provider)
    } catch (error) {
      console.error(`Social login error with ${provider}:`, error)
    }
  }

  return (
    <AuthLayout sidebar={<LoginSidebar />}>
      <LoginForm
        register={register}
        onSubmit={onSubmit}
        errors={errors}
        isValid={isValid}
        isLoading={isLoading}
        showPassword={showPassword}
        onTogglePassword={togglePasswordVisibility}
        onSocialLogin={handleSocialLogin}
        onClearError={clearError}
      />
    </AuthLayout>
  )
}

// Sidebar component - separated for better maintainability
const LoginSidebar = () => (
  <div className="space-y-8">
    <BrandingSection />
    <AuthStats stats={STATS_DATA} />
    <Testimonial {...TESTIMONIAL_DATA} />
  </div>
)

// Branding section - extracted for reusability
const BrandingSection = () => (
  <div className="space-y-6">
    <h1 className="text-4xl md:text-5xl font-black leading-tight">
      Welcome back to the
      <span className="gradient-text"> ultimate gaming</span> community
    </h1>
    <p className="text-xl text-cream/80 leading-relaxed">
      Connect with pro players, improve your skills, and dominate your favorite
      games.
    </p>
  </div>
)

// Form component - following SRP and proper props interface
interface LoginFormProps {
  register: ReturnType<typeof useForm<typeof loginSchema>>['register']
  onSubmit: () => void
  errors: ReturnType<typeof useForm<typeof loginSchema>>['formState']['errors']
  isValid: boolean
  isLoading: boolean
  showPassword: boolean
  onTogglePassword: () => void
  onSocialLogin: (provider: 'google' | 'discord') => void
  onClearError: () => void
}

const LoginForm = ({
  register,
  onSubmit,
  errors,
  isValid,
  isLoading,
  showPassword,
  onTogglePassword,
  onSocialLogin,
  onClearError,
}: LoginFormProps) => (
  <>
    <FormHeader />

    <form onSubmit={onSubmit} className="space-y-6">
      <EmailField register={register} error={errors.email?.message as string} />

      <PasswordField
        register={register}
        error={errors.password?.message as string}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
      />

      <FormOptions />

      <ErrorMessage
        message={errors.root?.message || ''}
        onDismiss={onClearError}
      />

      <SubmitButton isLoading={isLoading} isValid={isValid} />

      <FormDivider />

      <SocialLoginSection onSocialLogin={onSocialLogin} />
    </form>

    <SignUpPrompt />
  </>
)

// Atomic components for better composition and testing
const FormHeader = () => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
    <p className="text-cream/70">Sign in to continue your gaming journey</p>
  </div>
)

const EmailField = ({
  register,
  error,
}: {
  register: ReturnType<typeof useForm<typeof loginSchema>>['register']
  error?: string
}) => (
  <FormField
    label="Email Address"
    type="email"
    placeholder="your@email.com"
    icon={Mail}
    error={error}
    required
    {...register('email')}
  />
)

const PasswordField = ({
  register,
  error,
  showPassword,
  onTogglePassword,
}: {
  register: ReturnType<typeof useForm<typeof loginSchema>>['register']
  error?: string
  showPassword: boolean
  onTogglePassword: () => void
}) => (
  <FormField
    label="Password"
    type={showPassword ? 'text' : 'password'}
    placeholder="Enter your password"
    icon={Lock}
    rightElement={
      <PasswordToggle showPassword={showPassword} onToggle={onTogglePassword} />
    }
    error={error}
    required
    {...register('password')}
  />
)

const FormOptions = () => (
  <div className="flex items-center justify-between">
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        name="rememberMe"
        className="w-4 h-4 rounded border-cream/30 bg-dark-secondary text-custom-primary focus:ring-custom-primary focus:ring-2"
      />
      <span className="text-cream/70 text-sm">Remember me</span>
    </label>
    <Link
      href={ROUTE.PUBLIC.AUTH.FORGOT_PASSWORD}
      className="text-custom-accent hover:text-custom-accent/80 text-sm font-medium transition-colors"
    >
      Forgot password?
    </Link>
  </div>
)

const SubmitButton = ({
  isLoading,
  isValid,
}: {
  isLoading: boolean
  isValid: boolean
}) => (
  <LoadingButton
    type="submit"
    loading={isLoading}
    loadingText="Signing In..."
    icon={ArrowRight}
    disabled={!isValid}
    fullWidth
  >
    Sign In
  </LoadingButton>
)

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

const SocialLoginSection = ({
  onSocialLogin,
}: {
  onSocialLogin: (provider: 'google' | 'discord') => void
}) => (
  <div className="grid grid-cols-2 gap-4">
    <SocialButton provider="google" onClick={() => onSocialLogin('google')}>
      Google
    </SocialButton>
    <SocialButton provider="discord" onClick={() => onSocialLogin('discord')}>
      Discord
    </SocialButton>
  </div>
)

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
