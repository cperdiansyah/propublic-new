'use client'

import { useCarouselContext } from '@/components/common/infinite-carousel/carousel-context'
import { useAutoplayControl } from '@/components/common/infinite-carousel/carousel-hooks'
import { FlyingControls } from '@/components/common/infinite-carousel/carousel-controls'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import * as React from 'react'

// Content Component
interface InfiniteCarouselContentProps {
  children: React.ReactNode
  className?: string
  showFlyingControls?: boolean
}

export function InfiniteCarouselContent({
  children,
  className,
  showFlyingControls = true,
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
        {showFlyingControls && <FlyingControls />}
      </Carousel>
    </div>
  )
}
