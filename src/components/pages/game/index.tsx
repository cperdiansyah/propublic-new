'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import PopularGames from '@/components/pages/game/popular-games'
import GameCard from '@/components/pages/game/game-card'
// import GameCard from './game-card'
// import PopularGames from './popular-games'

const gamesData = [
  { name: 'Valorant', icon: '🎮', coaches: '2,500+', category: 'FPS' },
  { name: 'League of Legends', icon: '⚔️', coaches: '3,200+', category: 'MOBA' },
  { name: 'Rocket League', icon: '🚗', coaches: '1,800+', category: 'Sports' },
  { name: 'CS2', icon: '🎯', coaches: '2,100+', category: 'FPS' },
  { name: 'Tekken 8', icon: '🥊', coaches: '890+', category: 'Fighting' },
  {
    name: 'Fortnite',
    icon: '🏰',
    coaches: '1,500+',
    category: 'Battle Royale',
  },
  {
    name: 'Apex Legends',
    icon: '⚡',
    coaches: '1,200+',
    category: 'Battle Royale',
  },
  { name: 'Overwatch 2', icon: '🌟', coaches: '1,600+', category: 'FPS' },
  { name: 'Call of Duty', icon: '💀', coaches: '2,000+', category: 'FPS' },
  { name: 'Dota 2', icon: '🛡️', coaches: '1,400+', category: 'MOBA' },
  {
    name: 'Street Fighter 6',
    icon: '👊',
    coaches: '750+',
    category: 'Fighting',
  },
  {
    name: 'Teamfight Tactics',
    icon: '♟️',
    coaches: '600+',
    category: 'Auto Battler',
  },
]

export default function GameContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [displayedGames, setDisplayedGames] = useState<typeof gamesData>([])
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All Games')

  const gamesPerPage = 6
  const filters = ['All Games', 'FPS', 'MOBA', 'Battle Royale', 'Fighting']

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = () => {
    const startIndex = (currentPage - 1) * gamesPerPage
    const endIndex = startIndex + gamesPerPage
    const newGames = gamesData.slice(startIndex, endIndex)

    setDisplayedGames((prev) => [...prev, ...newGames])
    setCurrentPage((prev) => prev + 1)
  }

  const loadMoreGames = () => {
    if (loading) return

    setLoading(true)
    setTimeout(() => {
      loadGames()
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find your <span className="gradient-text">game</span>
          </h1>
          <p className="text-xl text-cream/70 max-w-2xl mx-auto">
            Discover communities, sessions, and events for your favorite games
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-dark-secondary/50 rounded-3xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
                <input
                  type="text"
                  placeholder="Search games, coaches, or events..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl search-input text-cream placeholder-cream/40 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-btn px-6 py-3 rounded-xl text-cream/80 font-medium ${
                    activeFilter === filter ? 'active' : ''
                  }`}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Games */}
        <PopularGames />

        {/* All Games Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">All Games</h2>
            <span className="text-cream/60">
              Showing 1-{displayedGames.length} of {gamesData.length}+ games
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedGames.map((game, index) => (
              <GameCard key={`${game.name}-${index}`} game={game} />
            ))}
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-2">
                <div className="w-4 h-4 bg-custom-primary rounded-full animate-pulse"></div>
                <div
                  className="w-4 h-4 bg-accent rounded-full animate-pulse"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="w-4 h-4 bg-secondary rounded-full animate-pulse"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
              <p className="text-cream/60 mt-4">Loading more games...</p>
            </div>
          )}

          {displayedGames.length < gamesData.length && !loading && (
            <div className="text-center mt-12">
              <button
                onClick={loadMoreGames}
                className="border border-accent hover:bg-accent hover:text-dark-primary text-accent px-8 py-4 rounded-xl font-semibold transition-all"
                type="button"
              >
                Load More Games
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
