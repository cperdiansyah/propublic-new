'use client'

import GameCard from '@/components/blocks/gaming/game-card'
import { InfiniteCarouselContent } from '@/components/common/infinite-carousel/carousel-content'
import {
  CarouselProvider,
  type CarouselProviderProps,
} from '@/components/common/infinite-carousel/carousel-context'
import {
  CarouselNext,
  CarouselPrevious,
} from '@/components/common/infinite-carousel/carousel-controls'
import { InfiniteCarouselItem } from '@/components/common/infinite-carousel/carousel-item'
import { DELAY_AUTOPLAY_MS } from '@/config/const'
import type { CarouselGameItem } from '@/types/home.types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface IGameSlider {
  games?: CarouselGameItem[]
  showControlButton?: boolean
  autoPlay?: CarouselProviderProps['autoplay']
  autoplayDelay?: CarouselProviderProps['autoplayDelay']
  className?: string
}
const GameSlider = ({
  games,
  showControlButton = false,
  autoPlay = true,
  autoplayDelay = DELAY_AUTOPLAY_MS,
  className,
}: IGameSlider) => {
  if (games?.length === 0 || !games) return
  return (
    <CarouselProvider
      itemCount={games.length}
      autoplay={autoPlay}
      autoplayDelay={autoplayDelay}
      visibleItems={{ mobile: 2, tablet: 3, desktop: 5, desktopExtraLarge: 6 }}
    >
      <div className={`carousel-container ${className}`}>
        {/* Controls */}
        {showControlButton && (
          <div className="relative flex justify-end items-center mb-4 mt-5 z-10">
            <div className="flex items-center gap-2">
              <CarouselPrevious
                className="text-black hover:bg-custom-accent"
                size="sm"
              >
                <ChevronLeft />
              </CarouselPrevious>

              <CarouselNext
                className="text-black hover:bg-custom-accent"
                size="sm"
              >
                <ChevronRight />
              </CarouselNext>
            </div>
          </div>
        )}
        <InfiniteCarouselContent>
          {games.map((game) => (
            <InfiniteCarouselItem
              key={game.id}
              // customBasis="basis-1/2 md:basis-1/4 lg:basis-1/6"
            >
              <GameCard game={game} />
            </InfiniteCarouselItem>
          ))}
        </InfiniteCarouselContent>
      </div>
    </CarouselProvider>
  )
}

export default GameSlider
