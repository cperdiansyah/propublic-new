'use client'

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { RegisterInput } from '@shared/utils/validations/auth'

/**
 * Terms Checkbox Component
 * Checkbox for agreeing to terms of service and privacy policy
 */
interface TermsCheckboxProps {
  register: UseFormReturn<RegisterInput>['register']
  error?: string
}

export const TermsCheckbox = ({ register, error }: TermsCheckboxProps) => (
  <div>
    <label className="flex items-start space-x-3 cursor-pointer">
      <input
        {...register('agreeToTerms')}
        type="checkbox"
        className="w-4 h-4 mt-1 rounded border-cream/30 bg-dark-custom-secondary text-custom-primary focus:ring-custom-primary focus:ring-2"
      />
      <span className="text-cream/70 text-sm">
        I agree to the{' '}
        <Link
          href="/terms"
          className="text-custom-accent hover:text-custom-accent/80 underline"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="text-custom-accent hover:text-custom-accent/80 underline"
        >
          Privacy Policy
        </Link>
      </span>
    </label>
    {error && (
      <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </p>
    )}
  </div>
)
