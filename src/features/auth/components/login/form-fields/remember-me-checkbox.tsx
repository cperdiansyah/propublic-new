'use client'

import type { UseFormRegister } from 'react-hook-form'
import type { LoginInput } from '@/features/auth/schema'

/**
 * Remember Me Checkbox Component
 * Checkbox for persistent login session connected to React Hook Form
 */
interface RememberMeCheckboxProps {
  register: UseFormRegister<LoginInput>
}

export const RememberMeCheckbox = ({ register }: RememberMeCheckboxProps) => (
  <label
    htmlFor="rememberMe"
    className="flex items-center space-x-2 cursor-pointer"
  >
    <input
      id="rememberMe"
      type="checkbox"
      {...register('rememberMe')}
      className="w-4 h-4 rounded border-cream/30 bg-dark-secondary text-custom-primary focus:ring-custom-primary focus:ring-2"
    />
    <span className="text-cream/70 text-sm">Remember me</span>
  </label>
)
