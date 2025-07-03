'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { useCarouselContext } from '@/components/common/infinite-carousel/carousel-context'

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
        )}
      >
        {infiniteChildren}
      </CarouselContent>
    </Carousel>
  )
}
