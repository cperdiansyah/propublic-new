import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes',
    ),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),

  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject is too long'),

  category: z.enum(
    ['general', 'technical', 'billing', 'coaching', 'partnership', 'other'],
    {
      required_error: 'Please select a category',
    },
  ),

  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),

  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),

  attachments: z
    .array(z.instanceof(File))
    .max(5, 'Maximum 5 attachments allowed')
    .refine(
      (files) => files.every((file) => file.size <= 10 * 1024 * 1024), // 10MB per file
      'Each file must be less than 10MB',
    )
    .optional(),
})

export const newsletterSubscriptionSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),

  preferences: z
    .object({
      gameUpdates: z.boolean().default(true),
      coachingTips: z.boolean().default(true),
      communityNews: z.boolean().default(false),
      promotions: z.boolean().default(false),
    })
    .optional(),

  source: z
    .enum(['website', 'social', 'referral', 'advertisement', 'other'])
    .optional(),
})

export const feedbackSchema = z.object({
  rating: z
    .number()
    .min(1, 'Please provide a rating')
    .max(5, 'Rating must be between 1 and 5')
    .int('Rating must be a whole number'),

  category: z.enum(
    ['website', 'coaching', 'community', 'courses', 'support', 'other'],
    {
      required_error: 'Please select a feedback category',
    },
  ),

  title: z
    .string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title is too long'),

  feedback: z
    .string()
    .min(1, 'Feedback is required')
    .min(10, 'Feedback must be at least 10 characters')
    .max(1000, 'Feedback is too long'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long')
    .optional(),

  allowContact: z.boolean().default(false),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
export type NewsletterSubscriptionInput = z.infer<
  typeof newsletterSubscriptionSchema
>
export type FeedbackInput = z.infer<typeof feedbackSchema>
