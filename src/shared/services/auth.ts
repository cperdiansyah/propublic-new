import { api } from '@shared/services/axios'
import API from '@shared/config/api'
import type { ApiResponse } from '@shared/types/api'
import type { User } from '@shared/store/reducers/authReducer'
import type { RegisterInput } from '@/features/auth/schema'

export interface SignupResponse {
  user: User
  token: string
}

export const signupUser = async (
  userData: RegisterInput,
): Promise<SignupResponse> => {
  try {
    // Transform frontend data to match backend API format
    const requestData = {
      user: {
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.confirmPassword,
        username: userData.username,
        timezone: userData.timezone || 'UTC',
        locale: userData.locale || 'en',
        // Backend might expect these as metadata, adjust if needed
        agree_to_terms: userData.agreeToTerms,
        subscribe_newsletter: userData.subscribeNewsletter || false,
      },
    }

    const response = await api.post<ApiResponse<User>>(
      API.AUTH.V1.REGISTER,
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
      response?: {
        data?: { message?: string; errors?: Record<string, string[]> }
      }
    }
    const message = errorResponse.response?.data?.message || 'Signup failed'
    const errors = errorResponse.response?.data?.errors

    throw new Error(errors ? JSON.stringify(errors) : message)
  }
}
