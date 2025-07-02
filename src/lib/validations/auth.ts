import { z } from 'zod'

// Common validation patterns
const passwordRegex = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  special: /[^A-Za-z0-9]/,
}

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long')
    .refine((email) => {
      const domain = email.split('@')[1]
      return domain && domain.length > 0
    }, 'Please enter a valid email address'),
})

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores',
      )
      .refine(
        (username) => !username.toLowerCase().includes('admin'),
        'Username cannot contain "admin"',
      )
      .refine(
        (username) => !username.toLowerCase().includes('propublic'),
        'Username cannot contain "propublic"',
      ),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address')
      .max(255, 'Email is too long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(
        passwordRegex.uppercase,
        'Password must contain at least one uppercase letter',
      )
      .regex(
        passwordRegex.lowercase,
        'Password must contain at least one lowercase letter',
      )
      .regex(passwordRegex.number, 'Password must contain at least one number')
      .regex(
        passwordRegex.special,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must agree to the terms and conditions',
      ),
    subscribeNewsletter: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(
        passwordRegex.uppercase,
        'Password must contain at least one uppercase letter',
      )
      .regex(
        passwordRegex.lowercase,
        'Password must contain at least one lowercase letter',
      )
      .regex(passwordRegex.number, 'Password must contain at least one number')
      .regex(
        passwordRegex.special,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
