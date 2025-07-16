'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { CarouselGameItem } from '@/types/home.types'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'

// Add Game Modal Component
interface AddGameModalProps {
  title?: string
  isOpen: boolean
  onClose: () => void
  availableGames: CarouselGameItem[]
  searchForm: any
  onAddGame: (game: CarouselGameItem) => void
}

export function AddGameModal({
  isOpen,
  onClose,
  availableGames,
  searchForm,
  onAddGame,
  title = 'Add New Game',
}: AddGameModalProps) {
  const {
    register,
    formState: { errors },
  } = searchForm

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-dark-secondary/90 rounded-sm backdrop-blur-sm border-custom-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {title}
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
          <div className="grid grid-cols-2 md:grid-cols-3  gap-4 overflow-y-auto max-h-96 px-3">
            {availableGames.map((game) => (
              <GameOption key={game.id} game={game} onSelect={onAddGame} />
            ))}
          </div>

          {availableGames.length === 0 && (
            <Card className="border-dashed bg-white/5 backdrop-blur-sm border-white/10 rounded-sm">
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
      className="cursor-pointer border-2  hover:border-custom-primary transition-all group overflow-hidden p-0 rounded-sm relative gap-0 bg-white/5 backdrop-blur-sm border-white/10 "
    >
      <CardContent className="p-0 overflow-hidden">
        <div className="aspect-[3/4] relative">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${game.imageSrc || `/images/placeholder.png`})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h4 className="font-bold text-sm truncate">{game.name}</h4>
          </div>
        </div>
      </CardContent>
      <div className="button-wrapper pt-1">
        <Link href="/auth/login" className="">
          <button className="w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold  transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-500/30 border-radius-propublic propublic-button  !px-2 !py-1">
            Join
          </button>
        </Link>
      </div>
    </Card>
  )
}
