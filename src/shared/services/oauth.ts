'use client'

import { NEXT_PUBLIC_API_URL } from '@/shared/config'
import API from '@shared/config/api'

export interface OAuthResult {
  token: string
  provider: string
}

/**
 * Opens OAuth popup window and waits for token from redirect callback
 * New flow: FE -> popup -> https://api-dev.propublic.gg/v1/auth/google_oauth2
 * API handles OAuth with cookies -> redirects to callback with token
 */
const openOAuthPopup = (
  authUrl: string,
  provider: string,
): Promise<OAuthResult> => {
  return new Promise((resolve, reject) => {
    // Open popup directly to the API endpoint
    // Browser will include cookies automatically (same-site/credentials)
    console.log('Main window: Opening OAuth popup to:', authUrl)
    const popup = window.open(
      authUrl,
      `${provider}_oauth`,
      'width=600,height=700,scrollbars=yes,resizable=yes',
    )
    console.log('Main window: Popup opened:', !!popup)

    if (!popup) {
      reject(
        new Error(
          'Failed to open popup window. Please allow popups for this site.',
        ),
      )
      return
    }

    // Listen for messages from popup callback page
    const handleMessage = (event: MessageEvent) => {
      console.log(
        'Main window: Received message from origin:',
        event.origin,
        'data:',
        event.data,
      )

      // Security: verify origin matches our domain
      const allowedOrigins = [
        window.location.origin,
        'https://propublic.gg',
        'https://api-dev.propublic.gg',
        'https://propublic-new.vercel.app/',
      ]

      if (
        !allowedOrigins.some(
          (origin) =>
            event.origin === origin || event.origin.endsWith('.propublic.gg'),
        )
      ) {
        console.log(
          'Main window: Message rejected - origin not allowed:',
          event.origin,
        )
        return
      }

      if (event.data.type === 'OAUTH_SUCCESS') {
        console.log('Main window: Received OAUTH_SUCCESS message:', {
          hasToken: !!event.data.token,
          tokenLength: event.data.token?.length,
          provider: event.data.provider,
        })
        cleanup()
        resolve({
          token: event.data.token,
          provider: event.data.provider,
        })
      } else if (event.data.type === 'OAUTH_ERROR') {
        console.log(
          'Main window: Received OAUTH_ERROR message:',
          event.data.error,
        )
        cleanup()
        reject(new Error(event.data.error || 'OAuth authentication failed'))
      }
    }

    // Poll only for popup closure
    const pollInterval = setInterval(() => {
      if (popup.closed) {
        cleanup()
        reject(new Error('OAuth popup was closed before completion'))
        return
      }
    }, 1000)

    const cleanup = () => {
      clearInterval(pollInterval)
      window.removeEventListener('message', handleMessage)
      if (!popup.closed) {
        popup.close()
      }
    }

    // Listen for postMessage from callback page
    console.log(
      'Main window: Setting up message listener for popup communication',
    )
    window.addEventListener('message', handleMessage)

    // Timeout after 5 minutes
    setTimeout(() => {
      cleanup()
      reject(new Error('OAuth timeout - please try again'))
    }, 300000)
  })
}

/**
 * Initiates OAuth login with popup window
 * Opens popup directly to API OAuth endpoint which handles cookies automatically
 */
export const startOAuthLogin = async (
  provider: 'google' | 'discord',
): Promise<OAuthResult> => {
  try {
    let apiOAuthUrl: string

    if (provider === 'google') {
      apiOAuthUrl = `${NEXT_PUBLIC_API_URL}${API.AUTH.V1.GOOGLE_LOGIN}`
    } else if (provider === 'discord') {
      apiOAuthUrl = `${NEXT_PUBLIC_API_URL}${API.AUTH.V1.DISCORD_LOGIN}`
    } else {
      throw new Error(`Unsupported OAuth provider: ${provider}`)
    }

    console.log(`Starting OAuth flow for ${provider}:`, apiOAuthUrl)

    // Open popup directly to API endpoint
    // Browser will automatically include cookies for the API domain
    const result = await openOAuthPopup(apiOAuthUrl, provider)
    return result
  } catch (error) {
    console.error(`OAuth login error for ${provider}:`, error)
    throw error
  }
}

/**
 * Handles OAuth callback by extracting token and notifying parent window
 * This function should be called on the callback page
 */
export const handleOAuthCallback = (): { success: boolean } => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const provider = urlParams.get('provider')
    const error = urlParams.get('error')

    if (error) {
      if (window.opener) {
        window.opener.postMessage(
          { type: 'OAUTH_ERROR', error },
          window.location.origin,
        )
        window.close()
      }
      return { success: false }
    }

    if (!token || !provider) {
      return { success: false }
    }

    // Notify parent window about successful OAuth
    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'OAUTH_SUCCESS',
          token,
          provider,
        },
        window.location.origin,
      )
      window.close()
    }

    return { success: true }
  } catch (error) {
    console.error('Error processing OAuth callback:', error)
    return { success: false }
  }
}
