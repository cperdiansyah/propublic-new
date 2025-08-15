'use client'

// React & Next.js
import { useForm as useHookForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// External libraries
import { GamepadIcon, Trophy, Users } from 'lucide-react'

// Shared modules
import { useAuthNext } from '@shared/hooks/useAuthNext'

// Feature modules
import { startOAuthLogin } from '../services/oauth'
import { loginSchema, type LoginInput } from '@/features/auth/schema'

// Relative imports
import AuthLayout from './auth-layout'
import { LoginForm } from './login/login-form'
import { AuthStats } from './auth-stats'
import { Testimonial } from './testimonial'

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

/**
 * Login Page Component
 * Main login page orchestrating authentication flow
 * Following Single Responsibility Principle
 */
export default function LoginPage() {
  const { login, isLoading } = useAuthNext()

  // React Hook Form with Zod validation
  const form = useHookForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Event handlers - separated for better testability
  const handleLogin = async (data: LoginInput) => {
    try {
      await login(data)
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : 'Login failed',
      })
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'discord') => {
    try {
      await startOAuthLogin(provider)
    } catch (error) {
      console.error(`Social login error with ${provider}:`, error)
      form.setError('root', {
        message: `Failed to sign in with ${provider}`,
      })
    }
  }

  return (
    <AuthLayout sidebar={<LoginSidebar />}>
      <LoginForm
        form={form}
        isLoading={isLoading}
        onSubmit={handleLogin}
        onSocialLogin={handleSocialLogin}
      />
    </AuthLayout>
  )
}

/**
 * Login Sidebar Component
 * Sidebar content for login page with branding and stats
 * Following Single Responsibility Principle
 */
const LoginSidebar = () => (
  <div className="space-y-8">
    <BrandingSection />
    <AuthStats stats={STATS_DATA} />
    <Testimonial {...TESTIMONIAL_DATA} />
  </div>
)

/**
 * Branding Section Component
 * Hero content for login sidebar
 */
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
