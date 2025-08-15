'use client'

import { forwardRef, type ReactNode } from 'react'
import { AlertCircle, type LucideIcon } from 'lucide-react'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  icon?: LucideIcon
  rightElement?: ReactNode
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      icon: Icon,
      rightElement,
      error,
      required = false,
      disabled = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(error)

    return (
      <div className="space-y-2">
        <label
          htmlFor={name}
          className="block text-cream font-semibold text-sm"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>

        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
          )}

          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              input-field w-full py-4 pr-4 text-cream placeholder-cream/50 
              focus:outline-none border-radius-propublic transition-colors
              ${Icon ? 'pl-12' : 'pl-4'}
              ${rightElement ? 'pr-12' : 'pr-4'}
              ${hasError ? 'border-red-500 focus:border-red-500' : 'focus:border-custom-accent'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${className}
            `}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {rightElement}
            </div>
          )}

          {hasError && !rightElement && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
          )}
        </div>

        {hasError && (
          <p className="text-red-400 text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  },
)

FormField.displayName = 'FormField'
