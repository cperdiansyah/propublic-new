'use client'

import { Loader2 } from 'lucide-react'

/**
 * Loading Spinner Component
 * Reusable loading indicator following Single Responsibility Principle
 */
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-24">
    <Loader2 className="w-8 h-8 text-white animate-spin" />
  </div>
)
