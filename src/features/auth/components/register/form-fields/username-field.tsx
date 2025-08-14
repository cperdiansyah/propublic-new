'use client'

import { User, AlertCircle } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { RegisterInput } from '@shared/utils/validations/auth'

/**
 * Username Field Component
 * Reusable username input with validation display
 */
interface UsernameFieldProps {
  register: UseFormReturn<RegisterInput>['register']
  error?: string
}

export const UsernameField = ({ register, error }: UsernameFieldProps) => (
  <div>
    <label className="block text-cream font-semibold mb-3">Username</label>
    <div className="relative">
      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
      <input
        {...register('username')}
        type="text"
        className={`input-field w-full pl-12 pr-4 py-4 border-radius-propublic text-cream placeholder-cream/50 focus:outline-none ${
          error ? 'border-red-500 focus:border-red-500' : ''
        }`}
        placeholder="Choose a username"
      />
      {error && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>
      )}
    </div>
    {error && (
      <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </p>
    )}
  </div>
)
