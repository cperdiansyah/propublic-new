'use client'

import type { UseFormReturn } from 'react-hook-form'
import type { RegisterInput } from '@/features/auth/schema'

/**
 * Newsletter Checkbox Component
 * Optional checkbox for newsletter subscription
 */
interface NewsletterCheckboxProps {
  register: UseFormReturn<RegisterInput>['register']
}

export const NewsletterCheckbox = ({ register }: NewsletterCheckboxProps) => (
  <label className="flex items-start space-x-3 cursor-pointer">
    <input
      {...register('subscribeNewsletter')}
      type="checkbox"
      className="w-4 h-4 mt-1 rounded border-cream/30 bg-dark-custom-secondary text-custom-primary focus:ring-custom-primary focus:ring-2"
    />
    <span className="text-cream/70 text-sm">
      Subscribe to our newsletter for gaming tips and updates
    </span>
  </label>
)
