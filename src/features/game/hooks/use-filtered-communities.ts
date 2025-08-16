'use client'

import { COMMUNITIES } from '@shared/config/exampleData'
import type { SavedGame } from '@shared/types/game.types'
import { useMemo } from 'react'

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
