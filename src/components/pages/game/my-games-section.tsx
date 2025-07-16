'use client'
import {
  AddGamePlaceholder,
  MyGameCard,
} from '@/components/pages/game/game-card'
import type { SavedGame } from '@/types/game.types'

// My Games Section Component
interface MyGamesSectionProps {
  savedGames: SavedGame[]
  onRemoveGame: (gameId: number) => void
  onOpenModal: () => void
  textAddGame?: string
}

export function MyGamesSection({
  savedGames,
  onRemoveGame,
  onOpenModal,
  textAddGame,
}: MyGamesSectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center">
          Find your game
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {/* Condition for not login */}
        {savedGames.map((game) => (
          <MyGameCard key={game.id} game={game} onRemove={onRemoveGame} />
        ))}

        <AddGamePlaceholder onClick={onOpenModal} text={textAddGame} />
      </div>
    </section>
  )
}
