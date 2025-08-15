'use client'

import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { RegisterInput } from '@/features/auth/schema'

/**
 * Confirm Password Field Component
 * Password confirmation input with visibility toggle
 */
interface ConfirmPasswordFieldProps {
  register: UseFormReturn<RegisterInput>['register']
  error?: string
  showPassword: boolean
  onTogglePassword: () => void
}

export const ConfirmPasswordField = ({
  register,
  error,
  showPassword,
  onTogglePassword,
}: ConfirmPasswordFieldProps) => (
  <div>
    <label className="block text-cream font-semibold mb-3">
      Confirm Password
    </label>
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
      <input
        {...register('confirmPassword')}
        type={showPassword ? 'text' : 'password'}
        className={`input-field w-full pl-12 pr-12 py-4 border-radius-propublic text-cream placeholder-cream/50 focus:outline-none ${
          error ? 'border-red-500 focus:border-red-500' : ''
        }`}
        placeholder="Confirm your password"
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
    {error && (
      <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </p>
    )}
  </div>
)
