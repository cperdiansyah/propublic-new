import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { LoginInput, RegisterInput } from '@/features/auth/schema'
import { signupUser, logoutUser } from '@shared/services/auth'
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
        router.push(ROUTE.PUBLIC.HOME)
      }
    } catch (error) {
      console.error('Login failed:', error)
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
        router.push(ROUTE.PUBLIC.HOME)
      }
    } catch (error) {
      console.error('Signup failed:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Signup failed'

      // Try to parse validation errors
      try {
        const errors = JSON.parse(errorMessage)
        setError(Object.values(errors).flat().join(', '))
      } catch {
        setError(errorMessage)
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
