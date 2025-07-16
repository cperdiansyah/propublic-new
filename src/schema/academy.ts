import { z } from 'zod'

// Validation Schemas
export const searchSchema = z.object({
  searchTerm: z.string().min(0).max(100, 'Search term too long'),
})

export const filterSchema = z.object({
  category: z.string(),
  searchTerm: z.string(),
})

export type SearchForm = z.infer<typeof searchSchema>
export type FilterForm = z.infer<typeof filterSchema>
