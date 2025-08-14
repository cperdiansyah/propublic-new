'use client'

import type { ReactNode } from 'react'
import BackgroundEffects from '@/components/blocks/effects/grid-glow'

interface AuthLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  className?: string
}

export const AuthLayout = ({
  children,
  sidebar,
  className = '',
}: AuthLayoutProps) => {
  return (
    <div
      className={`min-h-screen relative flex items-center justify-center px-4 py-12 mt-14 ${className}`}
    >
      <BackgroundEffects className="overflow-hidden" />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Sidebar Content */}
          {sidebar && <div className="hidden lg:block">{sidebar}</div>}

          {/* Main Content */}
          <div
            className={`w-full max-w-md mx-auto ${sidebar ? 'lg:mx-0' : 'lg:mx-auto max-w-lg'} border-radius-propublic`}
          >
            <div className="enhanced-card border-radius-propublic p-8 md:p-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
