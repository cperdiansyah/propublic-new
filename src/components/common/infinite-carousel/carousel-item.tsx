'use client'

import type * as React from 'react'
import { CarouselItem } from '@/components/ui/carousel'
import { useCarouselContext } from './carousel-context'
import { cn } from '@/lib/utils'

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
