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

      <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 lg:grid-cols-6 md:overflow-x-visible md:pb-0">
        {/* Condition for not login */}
        {savedGames.map((game) => (
          <div key={game.id} className="flex-shrink-0 w-40 md:w-auto">
            <MyGameCard game={game} onRemove={onRemoveGame} />
          </div>
        ))}

        <div className="flex-shrink-0 w-40 md:w-auto">
          <AddGamePlaceholder onClick={onOpenModal} text={textAddGame} />
        </div>
      </div>
    </section>
  )
}
