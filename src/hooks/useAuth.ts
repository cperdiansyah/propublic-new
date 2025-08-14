import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import {
  loginUser,
  logoutUser,
  getCurrentUser,
  clearError,
} from '@/redux/reducers/authReducer'
import type { LoginInput } from '@/lib/validations/auth'
import { useRouter } from 'next/navigation'

export const AUTH_QUERY_KEYS = {
  USER: ['auth', 'user'],
  LOGIN: ['auth', 'login'],
  LOGOUT: ['auth', 'logout'],
} as const

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { user, token, isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  )

  const userQuery = useQuery({
    queryKey: AUTH_QUERY_KEYS.USER,
    queryFn: async () => {
      if (!token) return null
      const result = await dispatch(getCurrentUser())
      if (getCurrentUser.fulfilled.match(result)) {
        return result.payload
      }
      throw new Error('Failed to get user')
    },
    enabled: !!token && !user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })

  const loginMutation = useMutation({
    mutationKey: AUTH_QUERY_KEYS.LOGIN,
    mutationFn: async (credentials: LoginInput) => {
      const result = await dispatch(loginUser(credentials))
      if (loginUser.fulfilled.match(result)) {
        return result.payload
      }
      throw new Error(result.payload as string)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.USER })
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })

  const logoutMutation = useMutation({
    mutationKey: AUTH_QUERY_KEYS.LOGOUT,
    mutationFn: async () => {
      await dispatch(logoutUser())
    },
    onSuccess: () => {
      queryClient.clear()
      router.push('/auth/login')
    },
  })

  const clearAuthError = () => {
    dispatch(clearError())
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
    error:
      error || loginMutation.error?.message || logoutMutation.error?.message,

    // Actions
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    clearError: clearAuthError,

    // Mutation states
    loginMutation,
    logoutMutation,
    userQuery,
  }
}
