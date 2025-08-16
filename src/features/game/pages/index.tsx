'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import RadialGradient from '@shared/components/effects/radialGradient'
import type { CarouselGameItem } from '@shared/types/home.types'

import AddGameModal from '@/features/game/components/game-modal'
import MyGamesSection from '@/features/game/components/my-games-section'
import CommunitiesSection from '@/features/game/components/community-section'
import { searchGameSchema, type SearchGameForm } from '@/features/game/schema'
import { useSavedGames } from '@/features/game/hooks/use-saved-games'
import { useFilteredCommunities } from '@/features/game/hooks/use-filtered-communities'
import { useAvailableGames } from '@/features/game/hooks/use-available-games'

// Main Component
export default function GameContent() {
  const {
    savedGames,
    addGame,
    removeGame,
    canAddMore,
    remainingSlots,
    maxGames,
  } = useSavedGames()
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
      if (!canAddMore) {
        // Optional: Show a toast notification
        console.warn(`Maximum ${maxGames} games allowed`)
        return
      }

      const success = addGame(game)
      if (success) {
        setIsModalOpen(false)
        searchForm.reset()
      }
    },
    [addGame, searchForm, canAddMore, maxGames],
  )

  const handleModalOpen = useCallback(() => {
    if (!canAddMore) {
      // Optional: Show a toast notification
      console.warn(`Maximum ${maxGames} games reached`)
      return
    }
    setIsModalOpen(true)
  }, [canAddMore, maxGames])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
    searchForm.reset()
  }, [searchForm])

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-black">
      <RadialGradient
        x={70}
        y={50}
        primaryOpacity={0.3}
        className="py-5 md:py-16 relative"
      >
        <div className="max-w-7xl mx-auto">
          <MyGamesSection
            savedGames={savedGames}
            onRemoveGame={removeGame}
            onOpenModal={handleModalOpen}
            textAddGame={
              canAddMore
                ? `Add Game (${remainingSlots} slots left)`
                : 'Maximum Reached'
            }
          />

          <CommunitiesSection
            communities={filteredCommunities}
            onOpenModal={handleModalOpen}
          />

          <AddGameModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            availableGames={availableGames}
            searchForm={searchForm}
            onAddGame={handleAddGame}
            title={
              canAddMore
                ? `Add New Game (${remainingSlots} remaining)`
                : 'Maximum Games Reached'
            }
          />
        </div>
      </RadialGradient>
    </div>
  )
}
