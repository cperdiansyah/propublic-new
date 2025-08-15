'use client'

import * as React from 'react'
import type { CarouselApi } from '@/shared/components/ui/carousel'

export interface UseInfiniteCarouselProps {
  itemCount: number
  autoplay?: boolean
  autoplayDelay?: number
  visibleItems?: {
    mobile?: number | 'full'
    tablet?: number
    desktop?: number
    desktopExtraLarge?: number
  }
}

export function useInfiniteCarousel({
  itemCount,
  autoplay = false,
  autoplayDelay = 3000,
  visibleItems = { mobile: 'full', tablet: 2, desktop: 4 },
}: UseInfiniteCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  // Calculate infinite data multiplier
  const infiniteMultiplier = React.useMemo(() => {
    return Math.max(3, Math.ceil(20 / itemCount))
  }, [itemCount])

  const totalItems = itemCount * infiniteMultiplier

  React.useEffect(() => {
    if (!api) return

    // Set initial position to middle section
    const initialIndex = Math.floor(totalItems / 3)
    api.scrollTo(initialIndex, true)

    const updateSelection = () => {
      setCurrent(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateSelection()
    api.on('select', updateSelection)

    return () => {
      api.off('select', updateSelection)
    }
  }, [api, totalItems])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api],
  )
  return {
    api,
    setApi,
    current,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    infiniteMultiplier,
    totalItems,
    visibleItems,
    autoplay,
    autoplayDelay,
  }
}
