'use client'

import AcademyBackgroundEffects from '@shared/components/effects/academy-bacground'
import type { CarouselGameItem } from '@shared/types/home.types'

import GameDetailHero from '@/features/game/components/detail/game-hero'
import CoachingSection from '@/features/game/components/detail/coaching-section'
import RelatedCommunities from '@/features/game/components/detail/related-communities'

interface GameDetailContentProps {
  game: CarouselGameItem
}

export default function GameDetailContent({ game }: GameDetailContentProps) {
  const handleFindCoach = () => {
    // TODO: Implement find coach modal
    console.log('Find coach clicked for:', game.name)
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* <BackgroundEffects /> */}
      <AcademyBackgroundEffects />

      <div className="relative z-10 pt-16 sm:pt-20">
        <GameDetailHero game={game} onFindCoach={handleFindCoach} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
          <div className="space-y-8 sm:space-y-12 lg:space-y-16 mt-8 sm:mt-12">
            {/* <GameInfo game={game} /> */}
            <CoachingSection game={game} onFindCoach={handleFindCoach} />
            <RelatedCommunities game={game} />
          </div>
        </div>
      </div>
    </div>
  )
}
