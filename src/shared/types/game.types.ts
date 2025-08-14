import type { CarouselGameItem } from '@shared/types/home.types'
import type { z } from 'zod'

export interface SavedGame extends CarouselGameItem {
  readonly dateAdded: string
}
