'use client'

import * as React from 'react'
import { CarouselItem } from '@/components/ui/carousel'
import { useCarouselContext } from './carousel-context'
import { cn } from '@/lib/utils'

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
        visibleItems.desktopExtraLarge &&
          `2xl:basis-1/${visibleItems.desktopExtraLarge}`,
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
