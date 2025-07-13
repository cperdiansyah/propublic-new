'use client'

import { useCarouselContext } from '@/components/common/infinite-carousel/carousel-context'
import { useAutoplayControl } from '@/components/common/infinite-carousel/carousel-hooks'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import * as React from 'react'

// Content Component
interface InfiniteCarouselContentProps {
  children: React.ReactNode
  className?: string
}

export function InfiniteCarouselContent({
  children,
  className,
}: InfiniteCarouselContentProps) {
  const {
    setApi,
    autoplay,
    autoplayDelay,
    orientation,
    infiniteMultiplier,
    autoplayPlugin,
  } = useCarouselContext()

  const { handleMouseEnter, handleMouseLeave } = useAutoplayControl(
    autoplay,
    autoplayPlugin,
  )

  // Update autoplay delay if it changes
  React.useEffect(() => {
    if (autoplayPlugin?.current) {
      autoplayPlugin.current.reset()
    }
  }, [autoplayDelay, autoplayPlugin])

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

  const carouselPlugins = React.useMemo(() => {
    return autoplay && autoplayPlugin?.current ? [autoplayPlugin.current] : []
  }, [autoplay, autoplayPlugin])

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Carousel
        setApi={setApi}
        className={cn('w-full', className)}
        plugins={carouselPlugins}
        opts={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          axis: orientation === 'vertical' ? 'y' : 'x',
        }}
        orientation={orientation}
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
    </div>
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

  const basisClasses = React.useMemo(
    () =>
      cn(
        visibleItems.mobile && `basis-1/${visibleItems.mobile}`,
        visibleItems.tablet && `md:basis-1/${visibleItems.tablet}`,
        visibleItems.desktop && `lg:basis-1/${visibleItems.desktop}`,
      ),
    [visibleItems],
  )

  return (
    <CarouselItem
      className={cn(
        orientation === 'vertical' ? 'pt-2' : 'pl-2 md:pl-4',
        customBasis || basisClasses,
        className,
      )}
    >
      {children}
    </CarouselItem>
  )
}
