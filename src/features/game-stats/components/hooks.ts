import { COMMUNITIES, GAMELIST } from '@shared/config/exampleData'
import type { CarouselGameItem } from '@shared/types/home.types'
import { addGameSchema } from '@/schema/games'
import { useCallback, useMemo, useState } from 'react'

interface SavedGame extends CarouselGameItem {
  readonly dateAdded: string
}

const MAX_GAMES = 10

export const useSavedGames = () => {
  const [savedGames, setSavedGames] = useState<SavedGame[]>([
    {
      id: 1,
      name: 'Valorant',
      slug: 'valorant',
      path: '/game/valorant',
      imageSrc: '/images/game-covers/valorant.jpg',
      dateAdded: '2024-01-15',
    },
    {
      id: 3,
      name: 'Mobile Legends',
      slug: 'mobile-legends',
      path: '/game/mobile-legends',
      imageSrc: '/images/game-covers/mobile-legends.jpg',
      dateAdded: '2024-01-15',
    },
    {
      id: 4,
      name: 'PUBG Mobile',
      slug: 'pubgm',
      path: '/game/pubgm',
      imageSrc: '/images/game-covers/pubg.jpg',
      dateAdded: '2024-01-15',
    },
    {
      id: 5,
      name: 'Honor of Kings',
      slug: 'hok',
      path: '/game/hok',
      imageSrc: '/images/game-covers/hok.jpg',
      dateAdded: '2024-01-15',
    },
  ])

  const addGame = useCallback(
    (game: CarouselGameItem) => {
      // Check if maximum games reached
      if (savedGames.length >= MAX_GAMES) {
        console.warn(`Maximum ${MAX_GAMES} games allowed`)
        return false
      }

      // Validate game data
      const result = addGameSchema.safeParse({
        gameId: game.id,
        name: game.name,
        slug: game.slug,
        path: game.path,
        imageSrc: game.imageSrc,
      })

      if (!result.success) {
        console.error('Invalid game data:', result.error.errors)
        return false
      }

      // Check for duplicates
      const isDuplicate = savedGames.some(
        (savedGame) => savedGame.id === game.id,
      )
      if (isDuplicate) {
        console.warn('Game already exists in saved games')
        return false
      }

      const newSavedGame: SavedGame = {
        ...game,
        dateAdded: new Date().toISOString().split('T')[0],
      }

      setSavedGames((prev) => [...prev, newSavedGame])
      return true
    },
    [savedGames],
  )

  const removeGame = useCallback((gameId: number) => {
    setSavedGames((prev) => prev.filter((game) => game.id !== gameId))
  }, [])

  // Additional helper functions
  const canAddMore = useMemo(
    () => savedGames.length < MAX_GAMES,
    [savedGames.length],
  )
  const remainingSlots = useMemo(
    () => MAX_GAMES - savedGames.length,
    [savedGames.length],
  )

  return {
    savedGames,
    addGame,
    removeGame,
    canAddMore,
    remainingSlots,
    maxGames: MAX_GAMES,
  }
}

export const useFilteredCommunities = (savedGames: SavedGame[]) => {
  return useMemo(() => {
    if (savedGames.length === 0) return []

    const gameNames = savedGames.map((game) => game.name.toLowerCase())
    return COMMUNITIES.filter((community) =>
      gameNames.some(
        (gameName) =>
          community.description.toLowerCase().includes(gameName) ||
          community.name.toLowerCase().includes(gameName) ||
          community.category.toLowerCase().includes('gaming'),
      ),
    )
  }, [savedGames])
}

export const useAvailableGames = (
  savedGames: SavedGame[],
  searchTerm: string,
) => {
  return useMemo(() => {
    const available = GAMELIST.filter(
      (game) => !savedGames.some((savedGame) => savedGame.id === game.id),
    )
    if (!searchTerm.trim()) return available

    return available.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [savedGames, searchTerm])
}
