'use client'
import { AddGamePlaceholder, MyGameCard } from './game-card'
import type { SavedGame } from '@shared/types/game.types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

// My Games Section Component with Slider
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const MAX_GAMES = 10
  const isMaxReached = savedGames.length >= MAX_GAMES
  const showAddButton = !isMaxReached

  // Check scroll position and update navigation states
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  // Initial check and scroll event listener
  useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      return () => container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [savedGames])

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 160 + 24 // card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth * 2, // Scroll 2 cards at a time
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 160 + 24 // card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth * 2, // Scroll 2 cards at a time
        behavior: 'smooth',
      })
    }
  }

  // Calculate if we need navigation (more items than visible)
  const needsNavigation =
    savedGames.length > 4 || (savedGames.length > 3 && showAddButton)

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-white flex items-center">
            My game
          </h2>
          {isMaxReached && (
            <span className="text-sm text-cream/60 bg-dark-secondary/50 px-3 py-1 rounded-full border border-custom-primary/30">
              Maximum {MAX_GAMES} games reached
            </span>
          )}
        </div>

        {/* Navigation Controls */}
        {/* {needsNavigation && (
        )} */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border border-custom-primary/30 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'text-custom-primary hover:bg-custom-primary hover:text-white'
                : 'text-cream/30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border border-custom-primary/30 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'text-custom-primary hover:bg-custom-primary hover:text-white'
                : 'text-cream/30 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Games Slider Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
          }}
        >
          {/* Game Cards */}
          {savedGames.map((game) => (
            <div
              key={game.id}
              className="flex-shrink-0 w-40"
              style={{ scrollSnapAlign: 'start' }}
            >
              <MyGameCard game={game} onRemove={onRemoveGame} />
            </div>
          ))}

          {/* Add Game Placeholder - Only show if not at maximum */}
          {showAddButton && (
            <div
              className="flex-shrink-0 w-40"
              style={{ scrollSnapAlign: 'start' }}
            >
              <AddGamePlaceholder onClick={onOpenModal} text={textAddGame} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
