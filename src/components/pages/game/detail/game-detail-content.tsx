'use client'

import { useState } from 'react'
import type { CarouselGameItem } from '@/types/home.types'
import GameDetailHero from '@/components/pages/game/detail/game-hero'
import RelatedCommunities from '@/components/pages/game/detail/related-communities'
import GameInfo from '@/components/pages/game/detail/game-info'
import CoachingSection from '@/components/pages/game/detail/coaching-section'
import BackgroundEffects from '@/components/blocks/effects/grid-glow'
import AcademyBackgroundEffects from '@/components/blocks/background/academy-bacground'

interface GameDetailContentProps {
  game: CarouselGameItem
}

export default function GameDetailContent({ game }: GameDetailContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFindCoach = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* <BackgroundEffects /> */}
      <AcademyBackgroundEffects />

      <div className="relative z-10 pt-20">
        <GameDetailHero game={game} onFindCoach={handleFindCoach} />

        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="space-y-16 mt-12">
            {/* <GameInfo game={game} /> */}
            <CoachingSection game={game} onFindCoach={handleFindCoach} />
            <RelatedCommunities game={game} />
          </div>
        </div>
      </div>
    </div>
  )
}
