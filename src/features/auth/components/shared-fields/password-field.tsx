'use client'

import { Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react'

/**
 * Password Requirements Configuration
 * Defines the password validation rules
 */
const PASSWORD_REQUIREMENTS = [
  {
    id: 'length',
    text: 'At least 8 characters',
    test: (password: string) => password.length >= 8,
  },
  {
    id: 'uppercase',
    text: 'Contains uppercase letter',
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    text: 'Contains lowercase letter',
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    text: 'Contains number',
    test: (password: string) => /\d/.test(password),
  },
  {
    id: 'special',
    text: 'Contains special character',
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
] as const

/**
 * Shared Password Field Component
 * Password input with visibility toggle and optional requirements display
 * Can be used across login and register forms
 */
interface PasswordFieldProps {
  register: any // Generic register function from react-hook-form
  error?: string
  password?: string
  showPassword: boolean
  onTogglePassword: () => void
  placeholder?: string
  label?: string
  showRequirements?: boolean
  fieldName?: string
}

export const PasswordField = ({
  register,
  error,
  password = '',
  showPassword,
  onTogglePassword,
  placeholder = 'Enter your password',
  label = 'Password',
  showRequirements = false,
  fieldName = 'password',
}: PasswordFieldProps) => {
  const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
    ...req,
    met: req.test(password),
  }))

  return (
    <div>
      <label
        htmlFor={fieldName}
        className="block text-cream font-semibold mb-3"
      >
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
        <input
          id={fieldName}
          {...register(fieldName)}
          type={showPassword ? 'text' : 'password'}
          className={`input-field w-full pl-12 pr-12 py-4 border-radius-propublic text-cream placeholder-cream/50 focus:outline-none ${
            error ? 'border-red-500 focus:border-red-500' : ''
          }`}
          placeholder={placeholder}
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

      {showRequirements && password && (
        <PasswordRequirements requirements={requirements} />
      )}

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
  id: string
  text: string
  met: boolean
}

interface PasswordRequirementsProps {
  requirements: PasswordRequirement[]
}

const PasswordRequirements = ({ requirements }: PasswordRequirementsProps) => (
  <div className="mt-3 space-y-2">
    {requirements.map((req) => (
      <div key={req.id} className="flex items-center space-x-2">
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
