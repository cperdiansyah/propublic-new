'use client'
import {
  CarouselNext,
  CarouselPrevious,
  CarouselProvider,
  InfiniteCarouselContent,
  InfiniteCarouselItem,
} from '@/components/common/infinite-carousel'
import { CarouselInfo } from '@/components/common/infinite-carousel/example'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, StepBack, StepForward } from 'lucide-react'
import type React from 'react'

interface IGameSection {
  games: CarouselGameItem[]
}
const GameSection: React.FC<IGameSection> = ({ games }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">External Controls</h2>
      <CarouselProvider
        itemCount={games.length}
        autoplay={false}
        autoplayDelay={4000}
        visibleItems={{ mobile: 1, tablet: 2, desktop: 4 }}
      >
        <InfiniteCarouselContent>
          {games.map((game) => (
            <InfiniteCarouselItem
              key={game.id}
              customBasis="basis-full sm:basis-1/3 lg:basis-1/5"
            >
              <GameCard game={game} />
            </InfiniteCarouselItem>
          ))}
        </InfiniteCarouselContent>

        {/* Top Controls */}
        <div className="flex justify-center items-center mb-4 mt-5">
          {/* <CarouselInfo /> */}
          <div className="flex  gap-2">
            <CarouselPrevious variant="default" size="sm">
              <StepBack />
            </CarouselPrevious>
            <CarouselNext variant="default" size="sm">
              <StepForward />
            </CarouselNext>
          </div>
        </div>
      </CarouselProvider>
    </div>
  )
}

interface IGameCard {
  game: any
}
const GameCard: React.FC<IGameCard> = ({ game }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">
            {game.name.charAt(0)}
          </span>
        </div>
        <h3 className="font-semibold mb-1">{game.name}</h3>
      </CardContent>
    </Card>
  )
}

export default GameSection
