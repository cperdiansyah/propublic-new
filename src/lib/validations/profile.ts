import { z } from 'zod'

const SUPPORTED_GAMES = [
  'valorant',
  'league-of-legends',
  'cs2',
  'rocket-league',
  'overwatch-2',
  'fortnite',
  'apex-legends',
  'tekken-8',
  'street-fighter-6',
  'dota-2',
  'call-of-duty',
  'teamfight-tactics',
] as const

const SKILL_LEVELS = [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
  'professional',
] as const

export const profileUpdateSchema = z.object({
  // Basic Information
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    )
    .refine(
      (username) => !username.toLowerCase().includes('admin'),
      'Username cannot contain "admin"',
    ),

  displayName: z
    .string()
    .min(1, 'Display name is required')
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name is too long')
    .regex(
      /^[a-zA-Z0-9\s_-]+$/,
      'Display name can only contain letters, numbers, spaces, underscores, and hyphens',
    ),

  bio: z.string().max(500, 'Bio is too long').optional(),

  location: z.string().max(100, 'Location is too long').optional(),

  timezone: z.string().max(50, 'Timezone is too long').optional(),

  // Gaming Information
  primaryGame: z.enum(SUPPORTED_GAMES, {
    required_error: 'Please select your primary game',
  }),

  gameProfiles: z
    .array(
      z.object({
        game: z.enum(SUPPORTED_GAMES),
        username: z
          .string()
          .min(1, 'Game username is required')
          .max(50, 'Game username is too long'),
        rank: z.string().max(50, 'Rank is too long').optional(),
        skillLevel: z.enum(SKILL_LEVELS),
        hoursPlayed: z
          .number()
          .min(0, 'Hours played must be positive')
          .max(50000, 'Hours played seems unrealistic')
          .optional(),
        achievements: z
          .array(z.string().max(100, 'Achievement is too long'))
          .max(10, 'Maximum 10 achievements')
          .optional(),
      }),
    )
    .max(5, 'Maximum 5 game profiles allowed')
    .optional(),

  // Preferences
  preferences: z
    .object({
      coachingAvailable: z.boolean().default(false),
      lookingForCoach: z.boolean().default(false),
      preferredCoachingStyle: z
        .enum(['casual', 'competitive', 'professional'])
        .optional(),
      availableHours: z.array(z.string()).max(7, 'Maximum 7 days').optional(),
      communicationPreference: z
        .enum(['voice', 'text', 'both'])
        .default('both'),
      publicProfile: z.boolean().default(true),
      showOnlineStatus: z.boolean().default(true),
      allowDirectMessages: z.boolean().default(true),
    })
    .optional(),

  // Social Links
  socialLinks: z
    .object({
      twitch: z.string().url('Invalid Twitch URL').optional().or(z.literal('')),
      youtube: z
        .string()
        .url('Invalid YouTube URL')
        .optional()
        .or(z.literal('')),
      twitter: z
        .string()
        .url('Invalid Twitter URL')
        .optional()
        .or(z.literal('')),
      discord: z.string().max(50, 'Discord tag is too long').optional(),
      steam: z.string().url('Invalid Steam URL').optional().or(z.literal('')),
    })
    .optional(),
})

export const avatarUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Please select an image file')
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB
      'Image size must be less than 5MB',
    )
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(
          file.type,
        ),
      'Only JPEG, PNG, WebP, and GIF images are supported',
    ),
})

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),

    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character',
      ),

    confirmNewPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: ['confirmNewPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  })

export const emailChangeSchema = z.object({
  newEmail: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),

  password: z.string().min(1, 'Password is required to change email'),
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
export type AvatarUploadInput = z.infer<typeof avatarUploadSchema>
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>
export type EmailChangeInput = z.infer<typeof emailChangeSchema>
