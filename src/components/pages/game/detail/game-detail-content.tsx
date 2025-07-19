'use client'

import AcademyBackgroundEffects from '@/components/blocks/background/academy-bacground'
import CoachingSection from '@/components/pages/game/detail/coaching-section'
import GameDetailHero from '@/components/pages/game/detail/game-hero'
import RelatedCommunities from '@/components/pages/game/detail/related-communities'
import type { CarouselGameItem } from '@/types/home.types'
import { useState } from 'react'

interface GameDetailContentProps {
  game: CarouselGameItem
}

export default function GameDetailContent({ game }: GameDetailContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFindCoach = () => {
    setIsModalOpen(true)
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
