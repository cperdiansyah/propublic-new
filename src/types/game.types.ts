import type { CarouselGameItem } from '@/types/home.types'
import type { addGameSchema, searchGameSchema } from '@/validation/games'
import type { z } from 'zod'

export interface SavedGame extends CarouselGameItem {
  readonly dateAdded: string
}

export type SearchGameForm = z.infer<typeof searchGameSchema>
export type AddGameForm = z.infer<typeof addGameSchema>
