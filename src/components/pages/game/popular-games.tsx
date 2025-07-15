import { Star } from 'lucide-react'

export default function PopularGames() {
  const popularGames = [
    { name: 'Valorant', icon: '🎮', coaches: '2.5K+' },
    { name: 'League of Legends', icon: '⚔️', coaches: '3.2K+' },
    { name: 'Rocket League', icon: '🚗', coaches: '1.8K+' },
    { name: 'CS2', icon: '🎯', coaches: '2.1K+' },
    { name: 'Tekken 8', icon: '🥊', coaches: '890+' },
    { name: 'Fortnite', icon: '🏰', coaches: '1.5K+' },
  ]

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 flex items-center">
        <Star className="w-8 h-8 text-custom-accent mr-3" fill="currentColor" />
        Most Popular Games
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {popularGames.map((game, index) => {
          const gradients = [
            'from-custom-primary to-custom-secondary',
            'from-custom-accent to-custom-primary',
            'from-custom-secondary to-custom-accent',
            'from-custom-primary to-custom-accent',
            'from-custom-accent to-custom-secondary',
            'from-custom-secondary to-custom-primary',
          ]

          return (
            <div key={index} className="game-card rounded-2xl p-6 text-center">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-xl mx-auto mb-4 flex items-center justify-center`}
              >
                <span className="text-2xl">{game.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{game.name}</h3>
              <p className="text-cream/60 text-sm">{game.coaches} coaches</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
