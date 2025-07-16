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
import type { CarouselGameItem } from '@/types/home.types'
import { searchGameSchema, type SearchGameForm } from '@/schema/games'
import { CommunitiesSection } from '@/components/pages/game/community-section'
import RadialGradient from '@/components/blocks/background/radialGradient'

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
        primaryOpacity={0.2}
        className=" py-16 relative"
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
