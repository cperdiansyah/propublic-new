// src/pages/Game/index.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

// shadcn/ui components
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

// Existing components
import ComunitiesCard from '@/components/blocks/community/community-card'
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

// Add Game Modal Component
interface AddGameModalProps {
  isOpen: boolean
  onClose: () => void
  availableGames: CarouselGameItem[]
  searchForm: any
  onAddGame: (game: CarouselGameItem) => void
}

function AddGameModal({
  isOpen,
  onClose,
  availableGames,
  searchForm,
  onAddGame,
}: AddGameModalProps) {
  const {
    register,
    formState: { errors },
  } = searchForm

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-dark-secondary/90 backdrop-blur-sm border-custom-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Add New Game
          </DialogTitle>
          <DialogDescription className="text-cream/70">
            Search and add games to your collection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cream/40" />
            <Input
              {...register('searchTerm')}
              placeholder="Search games..."
              className="pl-10 search-input"
              autoFocus
            />
            {errors.searchTerm && (
              <p className="text-red-400 text-sm mt-1">
                {errors.searchTerm.message}
              </p>
            )}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-96">
            {availableGames.map((game) => (
              <GameOption key={game.id} game={game} onSelect={onAddGame} />
            ))}
          </div>

          {availableGames.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="text-center py-8">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-cream/70">
                  {searchForm.watch('searchTerm')
                    ? `No games found matching "${searchForm.watch('searchTerm')}"`
                    : 'All available games have been added'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Game Option Component
interface GameOptionProps {
  game: CarouselGameItem
  onSelect: (game: CarouselGameItem) => void
}

function GameOption({ game, onSelect }: GameOptionProps) {
  const handleSelect = useCallback(() => {
    onSelect(game)
  }, [game, onSelect])

  return (
    <Card
      onClick={handleSelect}
      className="cursor-pointer border-2 border-transparent hover:border-custom-primary transition-all group overflow-hidden"
    >
      <CardContent className="p-0">
        <div className="aspect-[9/16] relative">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${game.imageSrc || `/placeholder.svg?height=320&width=280&text=${encodeURIComponent(game.name)}`})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h4 className="font-bold text-sm truncate">{game.name}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
