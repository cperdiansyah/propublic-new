import { z } from 'zod'

export const addGameSchema = z.object({
  gameId: z.number().min(1, 'Invalid game ID'),
  name: z
    .string()
    .min(1, 'Game name is required')
    .max(100, 'Game name too long'),
  slug: z.string().min(1, 'Game slug is required'),
  path: z.string().min(1, 'Game path is required'),
  imageSrc: z.string().optional(),
})

export const searchGameSchema = z.object({
  searchTerm: z.string().min(0).max(50, 'Search term too long'),
})
