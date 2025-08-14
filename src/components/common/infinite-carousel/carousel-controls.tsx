'use client'

import * as React from 'react'
import { Button } from '@/shared/components/ui/button'
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

// Flying Controls Component (Netflix-style)
interface FlyingControlsProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function FlyingControls({
  className,
  variant = 'ghost',
  size = 'icon',
}: FlyingControlsProps) {
  const { scrollPrev, scrollNext, orientation } = useCarouselContext()
  const [isHovered, setIsHovered] = React.useState(false)

  const handlePrevClick = React.useCallback(() => {
    scrollPrev()
  }, [scrollPrev])

  const handleNextClick = React.useCallback(() => {
    scrollNext()
  }, [scrollNext])

  const prevIconComponent = React.useMemo(() => {
    return orientation === 'vertical' ? (
      <ChevronUp className="h-5 w-5" />
    ) : (
      <ChevronLeft className="h-5 w-5" />
    )
  }, [orientation])

  const nextIconComponent = React.useMemo(() => {
    return orientation === 'vertical' ? (
      <ChevronDown className="h-5 w-5" />
    ) : (
      <ChevronRight className="h-5 w-5" />
    )
  }, [orientation])

  return (
    <section
      className={cn('absolute inset-0 pointer-events-none', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Carousel navigation controls"
    >
      {/* Previous Button - Always visible for infinite carousel */}
      <Button
        variant={variant}
        size={size}
        className={cn(
          'absolute z-10 pointer-events-auto transition-all duration-300 ease-in-out',
          'w-10 h-10 rounded-full border backdrop-blur-sm flex items-center justify-center',
          'flying-button-carousel left',
          orientation === 'vertical'
            ? cn(
                'top-2 left-1/2 -translate-x-1/2',
                isHovered
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-70 translate-y-0',
              )
            : cn(
                'top-1/2 -translate-y-1/2 left-2',
                isHovered
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-70 translate-x-0',
              ),
        )}
        onClick={handlePrevClick}
      >
        {prevIconComponent}
        <span className="sr-only">Previous slide</span>
      </Button>

      {/* Next Button - Always visible for infinite carousel */}
      <Button
        variant={variant}
        size={size}
        className={cn(
          'absolute z-10 pointer-events-auto transition-all duration-300 ease-in-out',
          'w-10 h-10 rounded-full border backdrop-blur-sm flex items-center justify-center',
          ' flying-button-carousel right',
          orientation === 'vertical'
            ? cn(
                'bottom-2 left-1/2 -translate-x-1/2',
                isHovered
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-70 translate-y-0',
              )
            : cn(
                'top-1/2 -translate-y-1/2 right-2',
                isHovered
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-70 translate-x-0',
              ),
        )}
        onClick={handleNextClick}
      >
        {nextIconComponent}
        <span className="sr-only">Next slide</span>
      </Button>
    </section>
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
      {Array.from({ length: originalItemCount }, (_, index) => (
        <Button
          key={`indicator-item-${index}`}
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
