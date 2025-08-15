'use client'

import { api } from '@shared/services/axios'
import API from '@shared/config/api'
import type { ApiResponse } from '@shared/types/api'

export interface OAuthInitResponse {
  authorization_url: string
  state?: string
}

export interface OAuthCallbackData {
  code: string
  state?: string
}

/**
 * Initiate Google OAuth login
 * Returns the Google authorization URL to redirect user to
 */
export const initiateGoogleLogin = async (): Promise<string> => {
  try {
    const response = await api.get<ApiResponse<OAuthInitResponse>>(
      API.AUTH.V1.GOOGLE_LOGIN,
    )
    return response.data.data.authorization_url
  } catch (error) {
    console.error('Google OAuth initiation error:', error)
    throw new Error('Failed to initiate Google login')
  }
}

/**
 * Handle Google OAuth callback
 * Process the authorization code and get user token
 */
export const handleGoogleCallback = async (callbackData: OAuthCallbackData) => {
  try {
    const response = await api.post(
      API.AUTH.V1.GOOGLE_LOGIN_CALLBACK,
      callbackData,
    )

    // Extract token from response headers (same pattern as login/signup)
    const authHeader =
      response.headers.authorization || response.headers.Authorization
    const token = authHeader?.replace('Bearer ', '') || null

    return {
      user: response.data.data,
      token,
    }
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    throw new Error('Failed to complete Google login')
  }
}

/**
 * Initiate Discord OAuth login
 * Returns the Discord authorization URL to redirect user to
 */
export const initiateDiscordLogin = async (): Promise<string> => {
  try {
    const response = await api.get<ApiResponse<OAuthInitResponse>>(
      API.AUTH.V1.DISCORD_LOGIN,
    )
    return response.data.data.authorization_url
  } catch (error) {
    console.error('Discord OAuth initiation error:', error)
    throw new Error('Failed to initiate Discord login')
  }
}

/**
 * Handle Discord OAuth callback
 * Process the authorization code and get user token
 */
export const handleDiscordCallback = async (
  callbackData: OAuthCallbackData,
) => {
  try {
    const response = await api.post(
      API.AUTH.V1.DISCORD_LOGIN_CALLBACK,
      callbackData,
    )

    // Extract token from response headers (same pattern as login/signup)
    const authHeader =
      response.headers.authorization || response.headers.Authorization
    const token = authHeader?.replace('Bearer ', '') || null

    return {
      user: response.data.data,
      token,
    }
  } catch (error) {
    console.error('Discord OAuth callback error:', error)
    throw new Error('Failed to complete Discord login')
  }
}

/**
 * Generic OAuth login handler
 * Redirects to provider's authorization URL with callback configuration
 */
export const startOAuthLogin = async (provider: 'google' | 'discord') => {
  try {
    let authUrl: string

    if (provider === 'google') {
      authUrl = await initiateGoogleLogin()
    } else if (provider === 'discord') {
      authUrl = await initiateDiscordLogin()
    } else {
      throw new Error(`Unsupported OAuth provider: ${provider}`)
    }

    // Add provider parameter to the callback URL
    const callbackUrl = `/auth/oauth-callback?provider=${provider}`

    // If the backend doesn't handle callback URL configuration automatically,
    // we might need to modify the auth URL to include our callback
    const finalAuthUrl = authUrl.includes('redirect_uri=')
      ? authUrl
      : `${authUrl}&redirect_uri=${encodeURIComponent(window.location.origin + callbackUrl)}`

    // Redirect to provider's authorization URL
    window.location.href = finalAuthUrl
  } catch (error) {
    console.error(`OAuth login error for ${provider}:`, error)
    throw error
  }
}
