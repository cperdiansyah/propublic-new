'use client'

import { Mail, AlertCircle } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { RegisterInput } from '@/features/auth/schema'

/**
 * Email Field Component
 * Reusable email input with validation display
 */
interface EmailFieldProps {
  register: UseFormReturn<RegisterInput>['register']
  error?: string
}

export const EmailField = ({ register, error }: EmailFieldProps) => (
  <div>
    <label className="block text-cream font-semibold mb-3">Email Address</label>
    <div className="relative">
      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
      <input
        {...register('email')}
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
    {error && (
      <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </p>
    )}
  </div>
)
