'use client'

import { Mail, AlertCircle } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

/**
 * Shared Email Field Component
 * Reusable email input with validation display
 * Can be used across login and register forms
 */
interface EmailFieldProps {
  register: any // Generic register function from react-hook-form
  error?: string
  placeholder?: string
  label?: string
}

export const EmailField = ({
  register,
  error,
  placeholder = 'your@email.com',
  label = 'Email Address',
}: EmailFieldProps) => (
  <div>
    <label htmlFor="email" className="block text-cream font-semibold mb-3">
      {label}
    </label>
    <div className="relative">
      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
      <input
        id="email"
        {...register('email')}
        type="email"
        className={`input-field w-full pl-12 pr-4 py-4 border-radius-propublic text-cream placeholder-cream/50 focus:outline-none ${
          error ? 'border-red-500 focus:border-red-500' : ''
        }`}
        placeholder={placeholder}
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
