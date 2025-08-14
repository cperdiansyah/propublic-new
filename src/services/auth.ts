import axiosInstance from '@/lib/axios'
import API from '@/config/api'
import type { ApiResponse } from '@/types/api'
import type { User } from '@/redux/reducers/authReducer'
import type { RegisterInput } from '@/lib/validations/auth'

export interface SignupResponse {
  user: User
  token: string
}

export const signupUser = async (
  userData: RegisterInput,
): Promise<SignupResponse> => {
  try {
    const response = await axiosInstance.post<ApiResponse<User>>(
      API.AUTH.V1.REGISTER,
      {
        email: userData.email,
        password: userData.password,
        username: userData.username,
        agreeToTerms: userData.agreeToTerms,
        subscribeNewsletter: userData.subscribeNewsletter,
      },
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
