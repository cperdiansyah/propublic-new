import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '@shared/services/axios'
import API from '@shared/config/api'
import type { LoginInput } from '@/features/auth/schema'
import type { ApiResponse } from '@shared/types/api'

export interface User {
  id: number
  email: string
  username: string
  country: string | null
  language: string[]
  locale: string
  avatar_url: string | null
  slug: string
  first_name: string | null
  last_name: string | null
  phone_number: string | null
  bio: string | null
  timezone: string
  currency: string
  wallet_balance: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginInput, { rejectWithValue }) => {
    try {
      // Transform frontend data to match backend API format
      const requestData = {
        user: {
          email: credentials.email,
          password: credentials.password,
        },
      }

      const response = await api.post<ApiResponse<User>>(
        API.AUTH.V1.LOGIN,
        requestData,
      )

      const user = response.data.data
      const authHeader =
        response.headers.authorization || response.headers.Authorization
      const token = authHeader?.replace('Bearer ', '') || null

      if (!token) {
        throw new Error('No token received from server')
      }

      return {
        user,
        token,
      }
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: { data?: { message?: string } }
      }
      const message = errorResponse.response?.data?.message || 'Login failed'
      return rejectWithValue(message)
    }
  },
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<User>>(API.AUTH.V1.ME)
      return response.data.data
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: { data?: { message?: string } }
      }
      const message =
        errorResponse.response?.data?.message || 'Failed to get user data'
      return rejectWithValue(message)
    }
  },
)

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await api.post(API.AUTH.V1.LOGOUT)
    return true
  } catch (error: unknown) {
    console.warn('Logout API call failed:', error)
    return true
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, () => {
        return initialState
      })
      .addCase(logoutUser.rejected, () => {
        return initialState
      })
  },
})

export const { clearError, resetAuth } = authSlice.actions

export default authSlice.reducer
