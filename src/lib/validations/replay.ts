import { z } from 'zod'

// Supported file types for replay uploads
const SUPPORTED_REPLAY_TYPES = [
  'application/octet-stream', // .dem, .replay, .rec files
  'application/x-binary',
  'application/x-rofl',
] as const

const SUPPORTED_REPLAY_EXTENSIONS = [
  '.dem',
  '.rofl',
  '.replay',
  '.rec',
  '.w3g',
  '.SC2Replay',
] as const

export const replayUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Please select a replay file')
    .refine(
      (file) => file.size <= 500 * 1024 * 1024, // 500MB
      'File size must be less than 500MB',
    )
    .refine(
      (file) => {
        const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
        return SUPPORTED_REPLAY_EXTENSIONS.some(
          (ext) => ext.toLowerCase() === extension,
        )
      },
      `Supported formats: ${SUPPORTED_REPLAY_EXTENSIONS.join(', ')}`,
    ),
})

export const replayAnalysisSchema = z.object({
  // Step 1: File upload
  file: replayUploadSchema.shape.file.optional(),

  // Step 2: Package selection
  package: z.enum(['basic', 'pro', 'elite'], {
    required_error: 'Please select an analysis package',
  }),

  // Step 3: Customer information
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Full name can only contain letters, spaces, hyphens, and apostrophes',
    ),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),

  game: z
    .string()
    .min(1, 'Please select your game')
    .refine(
      (game) =>
        ['valorant', 'league', 'csgo', 'rocket', 'overwatch', 'other'].includes(
          game,
        ),
      'Please select a valid game',
    ),

  currentRank: z.string().max(50, 'Rank description is too long').optional(),

  focusAreas: z
    .string()
    .max(1000, 'Focus areas description is too long')
    .optional(),

  // Additional metadata
  gameMode: z.string().optional(),
  matchDuration: z.string().optional(),
  specialRequests: z
    .string()
    .max(500, 'Special requests are too long')
    .optional(),
})

export const packageDetailsSchema = z.object({
  basic: z.object({
    name: z.literal('Basic Review Package'),
    price: z.literal(15),
    features: z.array(z.string()),
    deliveryTime: z.string(),
  }),
  pro: z.object({
    name: z.literal('Pro Review Package'),
    price: z.literal(35),
    features: z.array(z.string()),
    deliveryTime: z.string(),
  }),
  elite: z.object({
    name: z.literal('Elite Review Package'),
    price: z.literal(75),
    features: z.array(z.string()),
    deliveryTime: z.string(),
  }),
})

export type ReplayUploadInput = z.infer<typeof replayUploadSchema>
export type ReplayAnalysisInput = z.infer<typeof replayAnalysisSchema>
export type PackageDetails = z.infer<typeof packageDetailsSchema>
