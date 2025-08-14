// Environment variables configuration
// Next.js requires explicit access to process.env for static analysis

export const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
export const REDUX_PERSIST_KEY = process.env.REDUX_PERSIST_KEY || 'propublic'
export const NEXT_PUBLIC_APP_ENV =
  process.env.NEXT_PUBLIC_APP_ENV || 'development'

// Validation for required environment variables
if (!NEXT_PUBLIC_API_URL) {
  console.warn('⚠️ NEXT_PUBLIC_API_URL is not set, using default value')
}

// Debug logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Environment Variables:', {
    NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_ENV,
    NODE_ENV: process.env.NODE_ENV,
  })
}
