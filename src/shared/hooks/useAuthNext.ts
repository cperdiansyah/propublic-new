import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import type { LoginInput, RegisterInput } from '@/features/auth/schema'
import { signupUser, logoutUser } from '@shared/services/auth'
import {
  type ApiError,
  getUserErrorMessage,
  shouldShowErrorToUser,
} from '@shared/services/error-handler'
import ROUTE from '@/shared/config/pages'

export const useAuthNext = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: LoginInput) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials. Please try again.')
        throw new Error(result.error)
      }

      if (result?.ok) {
        toast.success('Welcome back!', {
          description: 'You have been logged in successfully.',
        })
        router.push(ROUTE.PUBLIC.HOME)
      }
    } catch (error) {
      console.error('Login failed:', error)

      // Show user-friendly error message
      if (error instanceof Error) {
        toast.error('Login failed', {
          description:
            error.message || 'Please check your credentials and try again',
        })
      }

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)

      // Call backend logout first if we have a token
      if (session?.accessToken) {
        await logoutUser(session.accessToken)
      }

      // Then clear NextAuth session
      await signOut({ redirect: false })
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: RegisterInput) => {
    try {
      setIsLoading(true)
      setError(null)

      // First, create the user account
      await signupUser(userData)

      // Then automatically log them in using NextAuth
      const result = await signIn('credentials', {
        email: userData.email,
        password: userData.password,
        redirect: false,
      })

      if (result?.error) {
        setError(
          'Account created but login failed. Please try logging in manually.',
        )
        throw new Error(result.error)
      }

      if (result?.ok) {
        toast.success('Welcome!', {
          description: 'Your account has been created successfully.',
        })
        router.push(ROUTE.PUBLIC.HOME)
      }
    } catch (error) {
      console.error('Signup failed:', error)

      // Handle ApiError from our custom error handler
      if (error && typeof error === 'object' && 'isUserError' in error) {
        const apiError = error as ApiError

        if (shouldShowErrorToUser(apiError)) {
          const userMessage = getUserErrorMessage(apiError)
          toast.error('Registration failed', {
            description: userMessage,
          })
          setError(userMessage)
        } else {
          toast.error('Registration failed', {
            description:
              'An unexpected error occurred. Please try again later.',
          })
          setError('An unexpected error occurred. Please try again later.')
        }
      } else if (error instanceof Error) {
        // Fallback for other error types
        const errorMessage = error.message || 'Registration failed'

        // Try to parse validation errors (legacy support)
        try {
          const errors = JSON.parse(errorMessage)
          const formattedErrors = Object.values(errors).flat().join(', ')
          toast.error('Registration failed', {
            description: formattedErrors,
          })
          setError(formattedErrors)
        } catch {
          toast.error('Registration failed', {
            description: errorMessage,
          })
          setError(errorMessage)
        }
      } else {
        toast.error('Registration failed', {
          description: 'An unexpected error occurred. Please try again later.',
        })
        setError('An unexpected error occurred. Please try again later.')
      }

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    // Session data
    session,
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === 'loading' || isLoading,
    error,

    // Actions
    login,
    signup,
    logout,
    clearError,

    // Status
    status,
  }
}
