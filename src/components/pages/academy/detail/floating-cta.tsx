// src/components/pages/academy-detail/floating-cta.tsx
'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, X } from 'lucide-react'

interface FloatingCTAProps {
  price: string
  onBookCourse: () => void
}

export default function FloatingCTA({ price, onBookCourse }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 600
      setIsVisible(scrolled && !isDismissed)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="bg-dark-secondary/95 backdrop-blur-lg border-t border-custom-primary/30 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-cream/60">Get instant access</div>
            <div className="text-xl font-bold gradient-text">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(Number(price))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBookCourse}
              className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-6 py-3 border-radius-propublic font-bold hover:shadow-lg transition-all glow flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-teko">BOOK NOW</span>
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-2 text-cream/60 hover:text-cream transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
