import { COMMUNITIES, GAMELIST } from '@/config/exampleData'
import type { CarouselGameItem } from '@/types/home.types'
import { addGameSchema } from '@/validation/games'
import { useCallback, useMemo, useState } from 'react'

interface SavedGame extends CarouselGameItem {
  readonly dateAdded: string
}

export const useSavedGames = () => {
  const [savedGames, setSavedGames] = useState<SavedGame[]>([
    {
      id: 1,
      name: 'Valorant',
      slug: 'valorant',
      path: '/games/valorant',
      imageSrc: '/images/game-covers/valorant.jpg',
      dateAdded: '2024-01-15',
    },
    {
      id: 2,
      name: 'League of Legends',
      slug: 'league-of-legends',
      path: '/games/league-of-legends',
      imageSrc: '/images/game-covers/league-of-legends.jpg',
      dateAdded: '2024-01-10',
    },
    {
      id: 3,
      name: 'Fortnite',
      slug: 'fortnite',
      path: '/games/fortnite',
      imageSrc: '/images/game-covers/fortnite.jpg',
      dateAdded: '2024-01-08',
    },
    {
      id: 4,
      name: 'Tekken 8',
      slug: 'tekken-8',
      path: '/games/tekken-8',
      imageSrc: '/images/game-covers/tekken-8.jpg',
      dateAdded: '2024-01-05',
    },
    {
      id: 5,
      name: 'Dota 2',
      slug: 'dota-2',
      path: '/games/dota-2',
      imageSrc: '/images/game-covers/dota-2.jpg',
      dateAdded: '2024-01-05',
    },
  ])

  const addGame = useCallback(
    (game: CarouselGameItem) => {
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

  return {
    savedGames,
    addGame,
    removeGame,
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
