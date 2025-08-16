'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@shared/store/hooks'
import { persistor, store } from '@shared/store/store'
import { REDUX_PERSIST_KEY } from '@shared/config'

/**
 * Enhanced cross-window authentication state synchronization
 * Monitors localStorage and triggers Redux Persist rehydration
 */
export const useCrossWindowAuthSync = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('Cross-window auth sync: Setting up listeners')
    console.log(
      'Cross-window auth sync: Redux persist key:',
      `persist:${REDUX_PERSIST_KEY}`,
    )

    // Listen for localStorage changes from other windows/tabs
    const handleStorageChange = (event: StorageEvent) => {
      console.log(
        'Cross-window auth sync: localStorage changed:',
        event.key,
        event.newValue?.substring(0, 200),
      )

      // Check if the Redux Persist key changed
      if (event.key === `persist:${REDUX_PERSIST_KEY}`) {
        console.log(
          'Cross-window auth sync: Redux persist key changed, triggering rehydration',
        )

        try {
          // Parse the new state and manually update Redux if it has auth data
          if (event.newValue) {
            const newState = JSON.parse(event.newValue)
            const authData = newState.auth ? JSON.parse(newState.auth) : null

            console.log('Cross-window auth sync: Parsed auth data:', {
              isAuthenticated: authData?.isAuthenticated,
              hasUser: !!authData?.user,
              userId: authData?.user?.id,
            })

            if (
              authData?.isAuthenticated &&
              authData?.user &&
              authData?.token
            ) {
              console.log(
                'Cross-window auth sync: Found valid auth data, manually updating Redux',
              )

              // Manually dispatch the auth state to Redux
              const action = {
                type: 'auth/oauthLogin/fulfilled' as const,
                payload: {
                  user: authData.user,
                  token: authData.token,
                },
              }
              dispatch(action)
            }
          }
        } catch (error) {
          console.error(
            'Cross-window auth sync: Error parsing localStorage:',
            error,
          )

          // Fallback: Force Redux Persist rehydration
          console.log(
            'Cross-window auth sync: Falling back to persistor rehydration',
          )
          persistor.purge().then(() => {
            persistor.persist()
          })
        }
      }
    }

    // Listen for custom OAuth completion events
    const handleOAuthUpdate = (event: CustomEvent) => {
      console.log(
        'Cross-window auth sync: OAuth update event received:',
        event.detail,
      )

      // Delay to ensure localStorage is written by Redux Persist
      setTimeout(() => {
        console.log(
          'Cross-window auth sync: Checking localStorage after OAuth completion',
        )

        // Get current localStorage value and manually sync
        const persistedState = localStorage.getItem(
          `persist:${REDUX_PERSIST_KEY}`,
        )
        if (persistedState) {
          console.log(
            'Cross-window auth sync: Found persisted state, manually syncing to Redux',
          )

          try {
            const parsed = JSON.parse(persistedState)
            const authData = parsed.auth ? JSON.parse(parsed.auth) : null

            console.log('Cross-window auth sync: OAuth - Parsed auth data:', {
              isAuthenticated: authData?.isAuthenticated,
              hasUser: !!authData?.user,
              userId: authData?.user?.id,
            })

            if (
              authData?.isAuthenticated &&
              authData?.user &&
              authData?.token
            ) {
              console.log(
                'Cross-window auth sync: OAuth - Manually updating Redux with auth data',
              )

              // Manually dispatch the auth state to Redux
              const action = {
                type: 'auth/oauthLogin/fulfilled' as const,
                payload: {
                  user: authData.user,
                  token: authData.token,
                },
              }
              dispatch(action)
            }
          } catch (error) {
            console.error(
              'Cross-window auth sync: Error parsing persisted state for OAuth:',
              error,
            )

            // Fallback: Force rehydration
            persistor.purge().then(() => {
              persistor.persist()
            })
          }
        } else {
          console.log(
            'Cross-window auth sync: No persisted state found after OAuth',
          )
        }
      }, 500) // Increased delay to ensure localStorage is written
    }

    // Listen for window focus (when popup closes, main window gains focus)
    const handleWindowFocus = () => {
      console.log(
        'Cross-window auth sync: Window focused, checking for auth state changes',
      )

      // Check if auth state in localStorage is different from current Redux state
      const persistedState = localStorage.getItem(
        `persist:${REDUX_PERSIST_KEY}`,
      )
      if (persistedState) {
        try {
          const parsed = JSON.parse(persistedState)
          const authState = parsed.auth ? JSON.parse(parsed.auth) : null
          const currentState = store.getState().auth

          console.log('Cross-window auth sync: Focus - Comparing states:', {
            persistedAuth: authState?.isAuthenticated,
            currentAuth: currentState.isAuthenticated,
            persistedUser: authState?.user?.id,
            currentUser: currentState.user?.id,
          })

          // If persisted state shows authentication but current state doesn't
          if (
            authState?.isAuthenticated &&
            authState?.user &&
            authState?.token &&
            !currentState.isAuthenticated
          ) {
            console.log(
              'Cross-window auth sync: Focus - Auth state mismatch detected, manually updating Redux',
            )

            // Manually update Redux with persisted auth data
            dispatch({
              type: 'auth/oauthLogin/fulfilled',
              payload: {
                user: authState.user,
                token: authState.token,
              },
            })
          }
        } catch (error) {
          console.error(
            'Cross-window auth sync: Focus - Error parsing persisted state:',
            error,
          )
        }
      }
    }

    // Add event listeners
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(
      'oauth-auth-updated',
      handleOAuthUpdate as EventListener,
    )
    window.addEventListener('focus', handleWindowFocus)

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(
        'oauth-auth-updated',
        handleOAuthUpdate as EventListener,
      )
      window.removeEventListener('focus', handleWindowFocus)
    }
  }, [dispatch])
}
