import type { CarouselGameItem } from '@/types/home.types'
import { Star, Clock, Users, Award, ArrowRight } from 'lucide-react'

interface CoachingSectionProps {
  game: CarouselGameItem
  onFindCoach: () => void
}

export default function CoachingSection({
  game,
  onFindCoach,
}: CoachingSectionProps) {
  // Mock featured coaches - in real app, this would come from API
  const featuredCoaches = [
    {
      id: 1,
      name: 'ProPlayer_X',
      avatar: 'https://avatar.iran.liara.run/public/15',
      rank: 'Radiant #1',
      rating: 4.9,
      sessions: 500,
      specialties: ['Aim Training', 'Game Sense', 'Clutch Situations'],
      price: 35,
    },
    {
      id: 2,
      name: 'TacticalMaster',
      avatar: 'https://avatar.iran.liara.run/public/23',
      rank: 'Immortal 3',
      rating: 4.8,
      sessions: 320,
      specialties: ['Strategy', 'Team Coordination', 'Map Control'],
      price: 30,
    },
    {
      id: 3,
      name: 'AimGod_2024',
      avatar: 'https://avatar.iran.liara.run/public/8',
      rank: 'Radiant',
      rating: 5.0,
      sessions: 280,
      specialties: ['Mechanics', 'Movement', 'Crosshair Placement'],
      price: 40,
    },
  ]

  return (
    <div className="enhanced-card border-radius-propublic p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Featured {game.name} Coaches
        </h2>
        <button
          onClick={onFindCoach}
          className="text-custom-accent hover:text-custom-accent/80 font-semibold text-sm sm:text-base transition-colors flex items-center gap-2"
        >
          View All Coaches
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {featuredCoaches.map((coach) => (
          <div
            key={coach.id}
            className="bg-dark-primary/50 border border-cream/10 border-radius-propublic p-4 sm:p-6 hover:border-custom-primary/50 transition-all group cursor-pointer"
          >
            {/* Coach Header */}
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img
                src={coach.avatar}
                alt={coach.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-custom-primary flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg">{coach.name}</h3>
                <p className="text-custom-accent font-semibold text-sm sm:text-base">
                  {coach.rank}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-semibold">
                      {coach.rating}
                    </span>
                  </div>
                  <span className="text-cream/60 text-xs sm:text-sm">
                    ({coach.sessions} sessions)
                  </span>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-3 sm:mb-4">
              <p className="text-cream/60 text-xs sm:text-sm mb-2">
                Specializes in:
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {coach.specialties.map((specialty, i) => (
                  <span
                    key={i}
                    className="text-xs bg-custom-primary/20 text-custom-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-cream/60 mb-3 sm:mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>1 hour</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>1-on-1</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Certified</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text">
                ${coach.price}/hr
              </div>
              <button className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm hover:shadow-lg transition-all group-hover:scale-105">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 sm:mt-8 text-center p-4 sm:p-6 bg-gradient-to-r from-custom-primary/10 to-custom-secondary/10 border border-custom-primary/30 border-radius-propublic">
        <h3 className="text-lg sm:text-xl font-bold mb-2">
          Ready to Level Up Your {game.name} Skills?
        </h3>
        <p className="text-cream/70 text-sm sm:text-base mb-3 sm:mb-4">
          Find the perfect coach to help you climb ranks and dominate your games
        </p>
        <button
          onClick={onFindCoach}
          className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-6 sm:px-8 py-2.5 sm:py-3 border-radius-propublic font-bold text-sm sm:text-base hover:shadow-lg transition-all glow propublic-button"
        >
          <span className="font-teko text-sm sm:text-base">
            EXPLORE ALL COACHES
          </span>
        </button>
      </div>
    </div>
  )
}
