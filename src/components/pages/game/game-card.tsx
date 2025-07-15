interface GameCardProps {
  game: {
    name: string
    icon: string
    coaches: string
    category: string
  }
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="game-card rounded-3xl p-8 animate-fadeIn">
      <div className="flex items-start space-x-6">
        <div className="w-16 h-16 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{game.icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
          <p className="text-cream/70 mb-4">{game.coaches} available coaches</p>
          <div className="flex items-center space-x-4">
            <span className="bg-custom-accent/20 text-custom-accent px-3 py-1 rounded-full text-sm font-medium">
              {game.category}
            </span>
            <button
              className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
              type="button"
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
