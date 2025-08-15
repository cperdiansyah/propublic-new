'use client'

import { Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { RegisterInput } from '@/features/auth/schema'

/**
 * Password Requirements Configuration
 * Defines the password validation rules
 */
const PASSWORD_REQUIREMENTS = [
  {
    text: 'At least 8 characters',
    test: (password: string) => password.length >= 8,
  },
  {
    text: 'Contains uppercase letter',
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    text: 'Contains lowercase letter',
    test: (password: string) => /[a-z]/.test(password),
  },
  { text: 'Contains number', test: (password: string) => /\d/.test(password) },
  {
    text: 'Contains special character',
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
] as const

/**
 * Password Field Component
 * Password input with visibility toggle and requirements display
 */
interface PasswordFieldProps {
  register: UseFormReturn<RegisterInput>['register']
  error?: string
  password: string
  showPassword: boolean
  onTogglePassword: () => void
}

export const PasswordField = ({
  register,
  error,
  password,
  showPassword,
  onTogglePassword,
}: PasswordFieldProps) => {
  const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
    ...req,
    met: req.test(password),
  }))

  return (
    <div>
      <label className="block text-cream font-semibold mb-3">Password</label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
        <input
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          className={`input-field w-full pl-12 pr-12 py-4 border-radius-propublic text-cream placeholder-cream/50 focus:outline-none ${
            error ? 'border-red-500 focus:border-red-500' : ''
          }`}
          placeholder="Create a strong password"
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cream/40 hover:text-cream transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {password && <PasswordRequirements requirements={requirements} />}

      {error && (
        <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

/**
 * Password Requirements Component
 * Displays password validation requirements
 */
interface PasswordRequirement {
  text: string
  met: boolean
}

interface PasswordRequirementsProps {
  requirements: PasswordRequirement[]
}

const PasswordRequirements = ({ requirements }: PasswordRequirementsProps) => (
  <div className="mt-3 space-y-2">
    {requirements.map((req, index) => (
      <div key={index} className="flex items-center space-x-2">
        <div
          className={`w-4 h-4 rounded-full flex items-center justify-center ${
            req.met ? 'bg-green-500' : 'bg-cream/20'
          }`}
        >
          {req.met && <Check className="w-2.5 h-2.5 text-white" />}
        </div>
        <span
          className={`text-xs ${req.met ? 'text-green-400' : 'text-cream/60'}`}
        >
          {req.text}
        </span>
      </div>
    ))}
  </div>
)
