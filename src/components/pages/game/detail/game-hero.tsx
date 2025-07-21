import type { CarouselGameItem } from '@/types/home.types'
import { Users, Trophy, Star, Gamepad2, Home, Gamepad } from 'lucide-react'
import {
  Breadcrumb,
  type BreadcrumbItemData,
} from '@/components/common/breadcrumb'

interface GameDetailHeroProps {
  game: CarouselGameItem
  onFindCoach: () => void
}

export default function GameDetailHero({
  game,
  onFindCoach,
}: GameDetailHeroProps) {
  // Mock data - in real app, this would come from API
  const gameStats = {
    activePlayers: '2.3M',
    proCoaches: 156,
    avgRating: 4.8,
    totalCommunities: 24,
  }

  const breadcrumbItems: BreadcrumbItemData[] = [
    {
      href: '/',
      icon: <Home className="h-full w-full" />,
      label: 'Home',
    },
    {
      href: '/game',
      icon: <Gamepad className="h-full w-full" />,
      label: 'Games',
    },
    {
      icon: <Gamepad2 className="h-full w-full" />,
      label: game.name,
      isActive: true,
    },
  ]

  return (
    <div className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={game.imageSrc}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 uppercase">
            {game.name}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-custom-accent" />
              <span>{gameStats.activePlayers} Active Players</span>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-custom-accent" />
              <span>{gameStats.proCoaches} Pro Coaches</span>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-custom-accent" />
              <span>{gameStats.avgRating} Avg Rating</span>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-custom-accent" />
              <span>{gameStats.totalCommunities} Communities</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <button
              onClick={onFindCoach}
              className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-6 sm:px-8 py-3 sm:py-4 border-radius-propublic font-bold text-base sm:text-lg hover:shadow-lg transition-all glow propublic-button w-full sm:w-auto"
            >
              <span className="font-teko text-lg sm:text-xl">FIND A COACH</span>
            </button>

            <button className="border border-cream/30 text-cream px-6 sm:px-8 py-3 sm:py-4 border-radius-propublic font-bold text-base sm:text-lg hover:bg-cream/10 transition-all w-full sm:w-auto">
              <span className="font-teko text-lg sm:text-xl">
                FIND COMMUNITIES
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
