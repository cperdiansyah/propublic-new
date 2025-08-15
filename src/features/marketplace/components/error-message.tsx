'use client'

/**
 * Error Message Component
 * Reusable error display component following Single Responsibility Principle
 */
interface ErrorMessageProps {
  message: string
  className?: string
}

export const ErrorMessage = ({
  message,
  className = 'text-red-400',
}: ErrorMessageProps) => <p className={className}>{message}</p>
