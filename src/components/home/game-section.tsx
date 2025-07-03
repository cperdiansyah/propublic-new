'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import type React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

// Configuration with proper typing
const config: CarouselConfig = {
  autoScrollInterval: 3000,
  responsiveItems: {
    mobile: 1, // Mobile: 1 card
    tablet: 2, // Tablet: 2 cards
    desktop: 3, // Desktop: 3 cards
    large: 4, // Large screens: 4 cards
  },
  dataMultiplier: 3,
} as const

interface IGameSection {
  games: any
}
const GameSection: React.FC<IGameSection> = ({ games }) => {
  // Create extended data for infinite scrolling with proper typing
  const extendedData: readonly CarouselGameItem[] = Array.from(
    { length: config.dataMultiplier },
    () => [...games],
  ).flat()
  // State management with proper typing
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(games.length)
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true)
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true)
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(true)
  const [viewportSize, setViewportSize] = useState<ViewportSize>('large')

  // Refs with proper typing
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isTransitioning = useRef<boolean>(false)

  // Viewport breakpoints with proper typing
  const getViewportSize = (width: number): ViewportSize => {
    if (width < 640) return 'mobile'
    if (width < 1024) return 'tablet'
    if (width < 1280) return 'desktop'
    return 'large'
  }

  // Detect viewport size for responsive behavior
  useEffect(() => {
    const updateViewportSize = (): void => {
      const width = window.innerWidth
      const newViewportSize = getViewportSize(width)
      setViewportSize(newViewportSize)
    }

    updateViewportSize()
    window.addEventListener('resize', updateViewportSize)

    return () => window.removeEventListener('resize', updateViewportSize)
  }, [])

  // Get current items per view based on viewport
  const getCurrentItemsPerView = useCallback((): number => {
    return config.responsiveItems[viewportSize]
  }, [viewportSize, config.responsiveItems])

  // Initialize carousel API and set starting position
  useEffect(() => {
    if (!api) return

    // Set initial position to middle section
    api.scrollTo(games.length, false)

    // Update state based on carousel events
    const handleSelect = (): void => {
      if (isTransitioning.current) return

      const selectedIndex = api.selectedScrollSnap()
      setCurrentIndex(selectedIndex)
      setCanScrollNext(api.canScrollNext())
      setCanScrollPrev(api.canScrollPrev())

      // Handle infinite loop reset
      handleInfiniteLoop(selectedIndex)
    }

    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api, games.length])

  // Handle infinite loop logic with proper typing
  const handleInfiniteLoop = useCallback(
    (selectedIndex: number): void => {
      if (!api) return

      const totalItems = extendedData.length
      const dataLength = games.length

      // If we're at the end of the extended data, jump to the beginning of second set
      if (selectedIndex >= totalItems - dataLength) {
        setTimeout(() => {
          isTransitioning.current = true
          api.scrollTo(dataLength, false)
          setTimeout(() => {
            isTransitioning.current = false
          }, 100)
        }, 100)
      }

      // If we're at the beginning of the extended data, jump to the end of second set
      if (selectedIndex < dataLength) {
        setTimeout(() => {
          isTransitioning.current = true
          api.scrollTo(dataLength * 2 - 1, false)
          setTimeout(() => {
            isTransitioning.current = false
          }, 100)
        }, 100)
      }
    },
    [api, extendedData.length, games.length],
  )

  // Auto-scroll functionality with proper cleanup
  useEffect(() => {
    if (!isAutoScrolling || !api) return

    const startAutoScroll = (): void => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      intervalRef.current = setInterval(() => {
        if (!isTransitioning.current && api.canScrollNext()) {
          api.scrollNext()
        }
      }, config.autoScrollInterval)
    }

    startAutoScroll()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isAutoScrolling, api, config.autoScrollInterval])

  // Mouse interaction handlers with proper typing
  const handleMouseEnter = useCallback((): void => {
    setIsAutoScrolling(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const handleMouseLeave = useCallback((): void => {
    setIsAutoScrolling(true)
  }, [])

  // Toggle auto-scroll with proper typing
  const toggleAutoScroll = useCallback((): void => {
    setIsAutoScrolling((prev) => !prev)
  }, [])

  // Get current slide number with proper typing
  const getCurrentSlideNumber = useCallback((): number => {
    if (!api) return 0
    const adjustedIndex =
      (((currentIndex - games.length) % games.length) + games.length) %
      games.length
    return adjustedIndex + 1
  }, [api, currentIndex, games.length])

  // Dot click handler with proper typing
  const handleDotClick = useCallback(
    (index: number): void => {
      if (api && !isTransitioning.current) {
        api.scrollTo(games.length + index)
      }
    },
    [api, games.length],
  )

  // Generate unique key for carousel items
  const generateItemKey = (item: CarouselGameItem, index: number): string => {
    const setIndex = Math.floor(index / games.length)
    return `${item.id}-${setIndex}`
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        // opts={{
        //   align: 'start',
        // }}
        // className="w-full max-w-sm"
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false, // We handle infinite loop manually
          skipSnaps: false,
          dragFree: false,
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <GameCard key={index} game={index} />
          ))}
          {/* Navigation Buttons */}
          <CarouselPrevious
            className="hidden md:flex"
            disabled={!canScrollPrev}
          />
          <CarouselNext className="hidden md:flex" disabled={!canScrollNext} />
        </CarouselContent>
      </Carousel>

      {/* Controls and Indicators */}
      {/* <CarouselControls
        isAutoScrolling={isAutoScrolling}
        onToggleAutoScroll={toggleAutoScroll}
        currentItemsPerView={getCurrentItemsPerView()}
        totalItems={originalData.length}
        currentSlideNumber={getCurrentSlideNumber()}
        originalData={originalData}
        onDotClick={handleDotClick}
      /> */}
    </div>
  )
}

interface IGameCard {
  game: any
}
const GameCard: React.FC<IGameCard> = ({ game }) => {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-3xl font-semibold">{Math.random() + 1}</span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  )
}

export default GameSection
