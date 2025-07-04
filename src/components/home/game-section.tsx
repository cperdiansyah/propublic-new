'use client'
import {
  CarouselNext,
  CarouselPrevious,
  CarouselProvider,
  InfiniteCarouselContent,
  InfiniteCarouselItem,
} from '@/components/common/infinite-carousel'
import SectionTitle from '@/components/common/section-title'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StepBack, StepForward } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'

interface IGameSection {
  games: CarouselGameItem[]
}
const GameSection: React.FC<IGameSection> = ({ games }) => {
  return (
    <div className="container mx-auto py-[7rem] text-center">
      <SectionTitle
        title={
          <>
            Choose Your Game.{' '}
            <span className="section-title-underline">
              Level Up Starts Here.
            </span>
          </>
        }
        subTitle={
          <>
            Ready to take your game to the next level?
            <br />
            Pick the title you want to master — whether you’re climbing ranked,
            sharpening your mechanics, or preparing for tournaments, we’ve got
            the right coach for you.
          </>
        }
        center
      />
      <CarouselProvider
        itemCount={games.length}
        autoplay={false}
        autoplayDelay={4000}
        visibleItems={{ mobile: 2, desktop: 4 }}
      >
        <InfiniteCarouselContent className="px-3">
          {games.map((game) => (
            <InfiniteCarouselItem
              key={game.id}
              customBasis="basis-1/2 lg:basis-1/5"
            >
              <GameCard game={game} />
            </InfiniteCarouselItem>
          ))}
        </InfiniteCarouselContent>

        {/* Controls */}
        <div className="flex justify-center items-center mb-4 mt-5">
          {/* <CarouselInfo /> */}
          <div className="flex items-center gap-5">
            <CarouselPrevious variant="default" size="sm">
              <StepBack />
            </CarouselPrevious>

            <Link href="/games" className="">
              <button
                className={`w-full py-2 px-3 rounded-xl font-semibold transition-all hover:shadow-lg border border-custom-accent hover:bg-custom-accent hover:text-dark-primary text-custom-accent`}
                type="button"
              >
                Explore More
              </button>
            </Link>

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
  game: CarouselGameItem
}
const GameCard: React.FC<IGameCard> = ({ game }) => {
  return (
    <Card className="overflow-hidden group cursor-pointer  hover:shadow-lg transition-shadow p-0 border-radius-propublic outline-card">
      <div className="relative border-none ">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 "
          style={{
            backgroundImage: `url(${game.imageSrc || `/placeholder.svg?height=320&width=280&text=${encodeURIComponent(game.name)}`})`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />

        {/* Blur Overlay on Hover */}
        <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-xs transition-all duration-300" />

        <CardContent className="py-10 md:py-15 bg-transparent  border-none">
          <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {game.name.charAt(0)}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Always visible - Product name */}

            {/* Hover visible - Additional content */}
            <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              <p className="text-xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-0">
                {game.name}
              </p>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default GameSection
