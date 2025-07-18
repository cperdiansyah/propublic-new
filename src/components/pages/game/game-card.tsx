'use client'
import { Card, CardContent } from '@/components/ui/card'
import type { SavedGame } from '@/types/game.types'
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

// My Game Card Component
interface MyGameCardProps {
  game: SavedGame
  onRemove: (gameId: number) => void
}

export function MyGameCard({ game, onRemove }: MyGameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onRemove(game.id)
    },
    [game.id, onRemove],
  )

  return (
    <Link href={`/game/${game.slug}`}>
      <Card
        className="relative bg-white/5 backdrop-blur-sm !border-white/10 p-2 group cursor-pointer border-2 hover:!border-custom-primary transition-all overflow-hidden border-radius-propublic"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="aspect-[3/4]  relative border-radius-propublic overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${game.imageSrc || `/images/placeholder.png`})`,
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className={`absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Game Name */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-lg truncate">{game.name}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

interface AddGamePlaceholderProps {
  onClick: () => void
  text?: string
}

export function AddGamePlaceholder({
  onClick,
  text = 'Add Game',
}: AddGamePlaceholderProps) {
  return (
    <Card
      onClick={onClick}
      className="h-full border-2 border-dashed  hover:border-custom-primary cursor-pointer transition-all group border-radius-propublic 
      bg-white/5 backdrop-blur-sm border-white/10"
    >
      <CardContent className="h-full flex flex-col items-center justify-center p-4">
        <Plus className="w-8 h-8 text-gray-400 group-hover:text-custom-primary mb-2 transition-colors" />
        <span className="text-gray-400 group-hover:text-custom-primary text-sm font-medium text-center transition-colors">
          {text}
        </span>
      </CardContent>
    </Card>
  )
}
