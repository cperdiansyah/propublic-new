// src/pages/Game/index.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

// shadcn/ui components
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Existing components
import ComunitiesCard from '@/components/blocks/community/community-card'
import { AddGameModal } from '@/components/pages/game/game-modal'
import {
  useAvailableGames,
  useFilteredCommunities,
  useSavedGames,
} from '@/components/pages/game/hooks'
import { MyGamesSection } from '@/components/pages/game/my-games-section'
import type { SearchGameForm } from '@/types/game.types'
import type { CarouselGameItem, TypeCommunityItem } from '@/types/home.types'
import { searchGameSchema } from '@/validation/games'

// Custom Hooks
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

        {/* <CommunitiesSection
          communities={filteredCommunities}
          onOpenModal={() => setIsModalOpen(true)}
        /> */}

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

interface CommunitiesSectionProps {
  communities: TypeCommunityItem[]
  onOpenModal: () => void
}

function CommunitiesSection({
  communities,
  onOpenModal,
}: CommunitiesSectionProps) {
  if (communities.length === 0) {
    return <EmptyCommunitiesState onOpenModal={onOpenModal} />
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <span className="mr-3">👥</span>
          Related Communities
          <Badge variant="secondary" className="ml-3">
            {communities.length}
          </Badge>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community, index) => (
          <ComunitiesCard
            key={community.id}
            community={community}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

// Empty Communities State Component
interface EmptyCommunitiesStateProps {
  onOpenModal: () => void
}

function EmptyCommunitiesState({ onOpenModal }: EmptyCommunitiesStateProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white flex items-center mb-8">
        <span className="mr-3">👥</span>
        Related Communities
      </h2>

      <Card className="border-dashed border-2 border-gray-600">
        <CardContent className="text-center py-16">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No Communities Yet
          </h3>
          <p className="text-cream/70 mb-6">
            Add some games to discover related communities
          </p>
          <Button
            onClick={onOpenModal}
            className="bg-gradient-to-r from-custom-primary to-custom-secondary hover:shadow-lg glow"
          >
            Add Your First Game
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
