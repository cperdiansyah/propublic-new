import type { CarouselGameItem } from '@/types/home.types'
import { Users, Trophy, Star, Gamepad2 } from 'lucide-react'

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

  return (
    <div className="relative min-h-[60vh] flex items-center">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-cream/60 mb-6">
            <a href="/" className="hover:text-cream transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/game" className="hover:text-cream transition-colors">
              Games
            </a>
            <span>/</span>
            <span className="text-cream">{game.name}</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase">
            {game.name}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-custom-accent" />
              <span>{gameStats.activePlayers} Active Players</span>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-custom-accent" />
              <span>{gameStats.proCoaches} Pro Coaches</span>
            </div>

            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-custom-accent" />
              <span>{gameStats.avgRating} Avg Rating</span>
            </div>

            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-custom-accent" />
              <span>{gameStats.totalCommunities} Communities</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onFindCoach}
              className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-8 py-4 border-radius-propublic font-bold text-lg hover:shadow-lg transition-all glow propublic-button"
            >
              <span className="font-teko text-xl">FIND A COACH</span>
            </button>

            <button className="border border-cream/30 text-cream px-8 py-4 border-radius-propublic font-bold text-lg hover:bg-cream/10 transition-all">
              <span className="font-teko text-xl">JOIN COMMUNITY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
