'use client'

import {
  useInfiniteCarousel,
  type UseInfiniteCarouselProps,
} from '@/hooks/useInfiniteCarousel'
import * as React from 'react'

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
