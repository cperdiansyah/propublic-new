'use client'

import { Eye, EyeOff } from 'lucide-react'

interface PasswordToggleProps {
  showPassword: boolean
  onToggle: () => void
  className?: string
}

export const PasswordToggle = ({
  showPassword,
  onToggle,
  className = '',
}: PasswordToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`
        text-cream/40 hover:text-cream transition-colors 
        focus:outline-none focus:text-cream
        ${className}
      `}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
    </button>
  )
}
