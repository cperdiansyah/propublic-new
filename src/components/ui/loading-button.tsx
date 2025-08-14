'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { type LucideIcon, Loader2 } from 'lucide-react'

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: ReactNode
}

const variants = {
  primary:
    'bg-gradient-to-r from-custom-primary to-custom-secondary text-cream hover:shadow-lg glow',
  secondary: 'bg-custom-secondary text-cream hover:bg-custom-secondary/80',
  outline:
    'border border-cream/20 hover:border-custom-accent text-cream/80 hover:text-custom-accent bg-transparent',
  ghost: 'text-cream/80 hover:text-cream hover:bg-cream/5',
}

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      loading = false,
      loadingText,
      icon: Icon,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          border-radius-propublic font-bold transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center space-x-2 propublic-button
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-teko">{loadingText || 'Loading...'}</span>
          </>
        ) : (
          <>
            <span className="font-teko">{children}</span>
            {Icon && <Icon className="w-5 h-5" />}
          </>
        )}
      </button>
    )
  },
)

LoadingButton.displayName = 'LoadingButton'
