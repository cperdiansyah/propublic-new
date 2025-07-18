import type { CarouselGameItem } from '@/types/home.types'
import { Target, Users, Trophy, TrendingUp } from 'lucide-react'

interface GameInfoProps {
  game: CarouselGameItem
}

export default function GameInfo({ game }: GameInfoProps) {
  // Mock data - in real app, this would come from API based on game
  const gameDetails = {
    description: `Master ${game.name} with ProPublic's comprehensive training programs. Whether you're climbing ranks or preparing for tournaments, our professional coaches and vibrant community will help you reach your goals.`,
    genres: ['FPS', 'Tactical Shooter', 'Competitive'],
    platforms: ['PC', 'Console'],
    rankSystem: [
      'Iron',
      'Bronze',
      'Silver',
      'Gold',
      'Platinum',
      'Diamond',
      'Immortal',
      'Radiant',
    ],
  }

  return (
    <div className="enhanced-card border-radius-propublic p-8">
      <h2 className="text-3xl font-bold mb-6">About {game.name}</h2>

      {/* Game Description */}
      <p className="text-cream/80 text-lg mb-8 leading-relaxed">
        {gameDetails.description}
      </p>

      {/* Key Features */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-custom-accent" />
          Why Train {game.name} with ProPublic?
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Professional coaching from top-ranked players',
            'Custom training programs for all skill levels',
            'Active community with daily scrims and tournaments',
            'VOD reviews and personalized improvement plans',
            'Exclusive strategies and meta insights',
            'Regular workshops and masterclasses',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-custom-accent mt-1">✓</span>
              <span className="text-cream/80">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-cream/10">
        <div className="text-center">
          <Users className="w-8 h-8 text-custom-accent mx-auto mb-2" />
          <div className="font-bold text-lg">50K+</div>
          <div className="text-cream/60 text-sm">Active Players</div>
        </div>
        <div className="text-center">
          <Trophy className="w-8 h-8 text-custom-accent mx-auto mb-2" />
          <div className="font-bold text-lg">200+</div>
          <div className="text-cream/60 text-sm">Tournaments</div>
        </div>
        <div className="text-center">
          <TrendingUp className="w-8 h-8 text-custom-accent mx-auto mb-2" />
          <div className="font-bold text-lg">85%</div>
          <div className="text-cream/60 text-sm">Rank Up Rate</div>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 text-custom-accent mx-auto mb-2 text-2xl">
            ⭐
          </div>
          <div className="font-bold text-lg">4.9/5</div>
          <div className="text-cream/60 text-sm">Coach Rating</div>
        </div>
      </div>
    </div>
  )
}
