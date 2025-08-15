import {
  useInfiniteCarousel,
  type UseInfiniteCarouselProps,
} from '@shared/hooks/useInfiniteCarousel'
import Autoplay, { type AutoplayType } from 'embla-carousel-autoplay'

import React from 'react'

// Context for carousel state
interface CarouselContextValue extends ReturnType<typeof useInfiniteCarousel> {
  orientation?: 'horizontal' | 'vertical'
  autoplayPlugin?: React.RefObject<AutoplayType>
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

export function useCarouselContext() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('Carousel components must be used within CarouselProvider')
  }
  return context
}

export interface CarouselProviderProps extends UseInfiniteCarouselProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
}
export function CarouselProvider({
  children,
  orientation = 'horizontal',
  ...carouselProps
}: CarouselProviderProps) {
  const carousel = useInfiniteCarousel(carouselProps)

  // Create autoplay plugin ref at provider level for better control
  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: carousel.autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  )

  const contextValue = React.useMemo(
    () => ({
      ...carousel,
      orientation,
      autoplayPlugin,
    }),
    [carousel, orientation],
  )

  return (
    <CarouselContext.Provider value={contextValue}>
      {children}
    </CarouselContext.Provider>
  )
}
