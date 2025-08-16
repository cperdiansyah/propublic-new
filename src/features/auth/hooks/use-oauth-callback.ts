import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useAppDispatch } from '@shared/store/hooks'
import { oauthLogin } from '@shared/store/reducers/authReducer'
import ROUTE from '@shared/config/pages'

export interface OAuthCallbackState {
  isProcessing: boolean
  authError: string | null
}

export interface OAuthCallbackActions {
  handleRetry: () => void
}

export interface UseOAuthCallbackReturn {
  state: OAuthCallbackState
  actions: OAuthCallbackActions
}

interface OAuthParams {
  token: string | null
  provider: string | null
  error: string | null
}

/**
 * Custom hook for handling OAuth callback logic
 * Separates business logic from UI components following SRP
 */
export const useOAuthCallback = (): UseOAuthCallbackReturn => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isProcessing, setIsProcessing] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  const extractUrlParams = useCallback((): OAuthParams => {
    const urlParams = new URLSearchParams(window.location.search)
    return {
      token: urlParams.get('token'),
      provider: urlParams.get('provider'),
      error: urlParams.get('error'),
    }
  }, [])

  const validateParams = useCallback((params: OAuthParams): void => {
    if (params.error) {
      throw new Error(`OAuth error: ${params.error}`)
    }

    if (!params.token || !params.provider) {
      throw new Error('Missing token or provider in callback URL')
    }
  }, [])

  const createAuthSession = useCallback(
    async (token: string, provider: string): Promise<void> => {
      const signInResult = await signIn('credentials', {
        email: `oauth_${provider}_user`,
        password: token,
        redirect: false,
      })

      if (signInResult?.error) {
        throw new Error('Failed to create authentication session')
      }
    },
    [],
  )

  const updateReduxStore = useCallback(
    async (token: string): Promise<void> => {
      const reduxResult = await dispatch(oauthLogin(token))

      if (oauthLogin.rejected.match(reduxResult)) {
        // Continue anyway since NextAuth session is created
        console.warn(
          'Redux store update failed, but NextAuth session created successfully',
        )
      }
    },
    [dispatch],
  )

  const handlePopupFlow = useCallback(
    (token: string, provider: string): void => {
      window.opener.postMessage(
        {
          type: 'OAUTH_SUCCESS',
          token,
          provider,
        },
        window.location.origin,
      )
      window.close()
    },
    [],
  )

  const handleDirectNavigation = useCallback((): void => {
    router.push(ROUTE.PUBLIC.HOME)
  }, [router])

  const handleError = useCallback((error: unknown): void => {
    const errorMessage =
      error instanceof Error ? error.message : 'Authentication failed'

    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'OAUTH_ERROR',
          error: errorMessage,
        },
        window.location.origin,
      )
      window.close()
    } else {
      setAuthError(errorMessage)
      setIsProcessing(false)
    }
  }, [])

  const processCallback = useCallback(async (): Promise<void> => {
    try {
      const params = extractUrlParams()
      validateParams(params)

      const { token, provider } = params as Required<OAuthParams>

      if (!token || !provider) {
        throw new Error('Token and provider are required')
      }

      await createAuthSession(token, provider)
      await updateReduxStore(token)

      if (window.opener) {
        handlePopupFlow(token, provider)
      } else {
        handleDirectNavigation()
      }
    } catch (error) {
      handleError(error)
    }
  }, [
    extractUrlParams,
    validateParams,
    createAuthSession,
    updateReduxStore,
    handlePopupFlow,
    handleDirectNavigation,
    handleError,
  ])

  const handleRetry = useCallback((): void => {
    router.push(ROUTE.PUBLIC.AUTH.LOGIN)
  }, [router])

  useEffect(() => {
    processCallback()
  }, [processCallback])

  return {
    state: {
      isProcessing,
      authError,
    },
    actions: {
      handleRetry,
    },
  }
}
