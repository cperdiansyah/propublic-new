'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'
import { useCarouselContext } from './carousel-context'
import { cn } from '@/lib/utils'
interface CarouselButtonProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children?: React.ReactNode
}

export function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  children,
}: CarouselButtonProps) {
  const { scrollPrev, canScrollPrev, orientation } = useCarouselContext()

  const handleClick = React.useCallback(() => {
    scrollPrev()
  }, [scrollPrev])

  const iconComponent = React.useMemo(() => {
    return orientation === 'vertical' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronLeft className="h-4 w-4" />
    )
  }, [orientation])

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('shrink-0', className)}
      disabled={!canScrollPrev}
      onClick={handleClick}
    >
      {children || iconComponent}
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

export function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  children,
}: CarouselButtonProps) {
  const { scrollNext, canScrollNext, orientation } = useCarouselContext()

  const handleClick = React.useCallback(() => {
    scrollNext()
  }, [scrollNext])

  const iconComponent = React.useMemo(() => {
    return orientation === 'vertical' ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronRight className="h-4 w-4" />
    )
  }, [orientation])

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('shrink-0', className)}
      disabled={!canScrollNext}
      onClick={handleClick}
    >
      {children || iconComponent}
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

// Indicators Component
interface CarouselIndicatorsProps {
  className?: string
  showNumbers?: boolean
}

export function CarouselIndicators({
  className,
  showNumbers = false,
}: CarouselIndicatorsProps) {
  const { current, scrollTo, totalItems, infiniteMultiplier } =
    useCarouselContext()

  // Show indicators for original items only
  const originalItemCount = React.useMemo(
    () => totalItems / infiniteMultiplier,
    [totalItems, infiniteMultiplier],
  )

  const currentOriginal = React.useMemo(
    () => current % originalItemCount,
    [current, originalItemCount],
  )

  const handleIndicatorClick = React.useCallback(
    (index: number) => {
      scrollTo(index + Math.floor(totalItems / 3))
    },
    [scrollTo, totalItems],
  )

  return (
    <div className={cn('flex justify-center gap-2 mt-4', className)}>
      {Array.from({ length: originalItemCount }).map((_, index) => (
        <Button
          key={index}
          variant={currentOriginal === index ? 'default' : 'outline'}
          size="sm"
          className={cn(
            'w-8 h-8 rounded-full p-0 transition-all duration-200',
            !showNumbers && 'w-2 h-2',
          )}
          onClick={() => handleIndicatorClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        >
          {showNumbers ? index + 1 : ''}
        </Button>
      ))}
    </div>
  )
}
