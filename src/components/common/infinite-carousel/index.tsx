'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UseInfiniteCarouselProps } from '@/hooks/useInfiniteCarousel'
import { useInfiniteCarousel } from '@/hooks/useInfiniteCarousel'

// Context for carousel state
interface CarouselContextValue extends ReturnType<typeof useInfiniteCarousel> {
  orientation?: 'horizontal' | 'vertical'
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

export function useCarouselContext() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('Carousel components must be used within CarouselProvider')
  }
  return context
}

// Provider Component
interface CarouselProviderProps extends UseInfiniteCarouselProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
}

export function CarouselProvider({
  children,
  orientation = 'horizontal',
  ...carouselProps
}: CarouselProviderProps) {
  const carousel = useInfiniteCarousel(carouselProps)

  return (
    <CarouselContext.Provider value={{ ...carousel, orientation }}>
      {children}
    </CarouselContext.Provider>
  )
}

// Content Component
interface InfiniteCarouselContentProps {
  children: React.ReactNode
  className?: string
}

export function InfiniteCarouselContent({
  children,
  className,
}: InfiniteCarouselContentProps) {
  const { setApi, autoplay, autoplayDelay, orientation, infiniteMultiplier } =
    useCarouselContext()

  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  )

  // Duplicate children for infinite effect
  const infiniteChildren = React.useMemo(() => {
    const childrenArray = React.Children.toArray(children)
    return Array.from({ length: infiniteMultiplier }, (_, i) =>
      childrenArray.map((child, j) =>
        React.cloneElement(child as React.ReactElement, {
          key: `${i}-${j}`,
        }),
      ),
    ).flat()
  }, [children, infiniteMultiplier])

  return (
    <Carousel
      setApi={setApi}
      className={cn('w-full', className)}
      plugins={autoplay ? [autoplayPlugin.current] : []}
      opts={{
        align: 'start',
        loop: true,
        skipSnaps: false,
        axis: orientation === 'vertical' ? 'y' : 'x',
      }}
      orientation={orientation}
      onMouseEnter={autoplay ? autoplayPlugin.current.stop : undefined}
      onMouseLeave={autoplay ? autoplayPlugin.current.reset : undefined}
    >
      <CarouselContent
        className={cn(
          orientation === 'vertical' ? '-mt-2 flex-col' : '-ml-2 md:-ml-4',
          'p-3',
        )}
      >
        {infiniteChildren}
      </CarouselContent>
    </Carousel>
  )
}

// Item Component
interface InfiniteCarouselItemProps {
  children: React.ReactNode
  className?: string
  customBasis?: string
}

export function InfiniteCarouselItem({
  children,
  className,
  customBasis,
}: InfiniteCarouselItemProps) {
  const { visibleItems, orientation } = useCarouselContext()
  console.log(visibleItems)
  const basisClasses =
    customBasis ||
    cn(
      'basis-full',
      visibleItems.tablet && `sm:basis-1/${visibleItems.tablet}`,
      visibleItems.desktop && `lg:basis-1/${visibleItems.desktop}`,
    )

  return (
    <CarouselItem
      className={cn(
        orientation === 'vertical' ? 'pt-2' : 'pl-2 md:pl-4',
        basisClasses,
        className,
      )}
    >
      {children}
    </CarouselItem>
  )
}

// Control Components
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

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('shrink-0', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      {children ||
        (orientation === 'vertical' ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        ))}
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

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('shrink-0', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
    >
      {children ||
        (orientation === 'vertical' ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        ))}
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
  const originalItemCount = totalItems / infiniteMultiplier
  const currentOriginal = current % originalItemCount

  return (
    <div className={cn('flex justify-center gap-2 mt-4', className)}>
      {Array.from({ length: originalItemCount }).map((_, index) => (
        <Button
          key={index}
          variant={currentOriginal === index ? 'default' : 'outline'}
          size="sm"
          className={cn('w-8 h-8 rounded-full p-0', !showNumbers && 'w-2 h-2')}
          onClick={() => scrollTo(index + Math.floor(totalItems / 3))}
        >
          {showNumbers ? index + 1 : ''}
        </Button>
      ))}
    </div>
  )
}
