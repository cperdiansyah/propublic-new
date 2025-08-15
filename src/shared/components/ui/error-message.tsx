'use client'

import { AlertCircle, X } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onDismiss?: () => void
  className?: string
}

export const ErrorMessage = ({
  message,
  onDismiss,
  className = '',
}: ErrorMessageProps) => {
  if (!message) return null

  return (
    <div
      className={`
      bg-red-500/10 border border-red-500/20 border-radius-propublic p-4 
      flex items-center justify-between ${className}
    `}
    >
      <div className="flex items-center space-x-3">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
        <p className="text-red-400 text-sm">{message}</p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-300 transition-colors p-1"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
