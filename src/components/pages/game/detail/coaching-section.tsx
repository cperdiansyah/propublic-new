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
    <div className="enhanced-card border-radius-propublic p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Featured {game.name} Coaches</h2>
        <button
          onClick={onFindCoach}
          className="text-custom-accent hover:text-custom-accent/80 font-semibold transition-colors flex items-center gap-2"
        >
          View All Coaches
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {featuredCoaches.map((coach) => (
          <div
            key={coach.id}
            className="bg-dark-primary/50 border border-cream/10 border-radius-propublic p-6 hover:border-custom-primary/50 transition-all group cursor-pointer"
          >
            {/* Coach Header */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src={coach.avatar}
                alt={coach.name}
                className="w-16 h-16 rounded-full border-2 border-custom-primary"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{coach.name}</h3>
                <p className="text-custom-accent font-semibold">{coach.rank}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">
                      {coach.rating}
                    </span>
                  </div>
                  <span className="text-cream/60 text-sm">
                    ({coach.sessions} sessions)
                  </span>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <p className="text-cream/60 text-sm mb-2">Specializes in:</p>
              <div className="flex flex-wrap gap-2">
                {coach.specialties.map((specialty, i) => (
                  <span
                    key={i}
                    className="text-xs bg-custom-primary/20 text-custom-primary px-2 py-1 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-cream/60 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>1 hour</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>1-on-1</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>Certified</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold gradient-text">
                ${coach.price}/hr
              </div>
              <button className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 text-center p-6 bg-gradient-to-r from-custom-primary/10 to-custom-secondary/10 border border-custom-primary/30 border-radius-propublic">
        <h3 className="text-xl font-bold mb-2">
          Ready to Level Up Your {game.name} Skills?
        </h3>
        <p className="text-cream/70 mb-4">
          Find the perfect coach to help you climb ranks and dominate your games
        </p>
        <button
          onClick={onFindCoach}
          className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-8 py-3 border-radius-propublic font-bold hover:shadow-lg transition-all glow propublic-button"
        >
          <span className="font-teko">EXPLORE ALL COACHES</span>
        </button>
      </div>
    </div>
  )
}
