import type { CarouselGameItem } from '@/types/home.types'
import type { z } from 'zod'

export interface SavedGame extends CarouselGameItem {
  readonly dateAdded: string
}
