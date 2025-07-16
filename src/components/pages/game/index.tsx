'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

// shadcn/ui components

// Existing components
import { AddGameModal } from '@/components/pages/game/game-modal'
import {
  useAvailableGames,
  useFilteredCommunities,
  useSavedGames,
} from '@/components/pages/game/hooks'
import { MyGamesSection } from '@/components/pages/game/my-games-section'
import type { SearchGameForm } from '@/types/game.types'
import type { CarouselGameItem } from '@/types/home.types'
import { searchGameSchema } from '@/validation/games'
import { CommunitiesSection } from '@/components/pages/game/community-section'

// Main Component
export default function GameContent() {
  const { savedGames, addGame, removeGame } = useSavedGames()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form for search functionality
  const searchForm = useForm<SearchGameForm>({
    resolver: zodResolver(searchGameSchema),
    defaultValues: {
      searchTerm: '',
    },
  })

  const searchTerm = searchForm.watch('searchTerm')
  const filteredCommunities = useFilteredCommunities(savedGames)
  const availableGames = useAvailableGames(savedGames, searchTerm)

  const handleAddGame = useCallback(
    (game: CarouselGameItem) => {
      const success = addGame(game)
      if (success) {
        setIsModalOpen(false)
        searchForm.reset()
      }
    },
    [addGame, searchForm],
  )

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
    searchForm.reset()
  }, [searchForm])

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <MyGamesSection
          savedGames={savedGames}
          onRemoveGame={removeGame}
          onOpenModal={() => setIsModalOpen(true)}
          textAddGame="Search Game"
        />

        <CommunitiesSection
          communities={filteredCommunities}
          onOpenModal={() => setIsModalOpen(true)}
        />

        <AddGameModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          availableGames={availableGames}
          searchForm={searchForm}
          onAddGame={handleAddGame}
          title="Search Game"
        />
      </div>
    </div>
  )
}
