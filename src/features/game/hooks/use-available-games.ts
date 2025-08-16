'use client'

import { GAMELIST } from '@shared/config/exampleData'
import type { SavedGame } from '@shared/types/game.types'
import { useMemo } from 'react'

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
