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

    // Listen for localStorage changes from other windows/tabs
    const handleStorageChange = (event: StorageEvent) => {
      console.log(
        'Cross-window auth sync: localStorage changed:',
        event.key,
        event.newValue?.substring(0, 100),
      )

      // Check if the Redux Persist key changed
      if (event.key === `persist:${REDUX_PERSIST_KEY}`) {
        console.log(
          'Cross-window auth sync: Redux persist key changed, triggering rehydration',
        )

        // Force Redux Persist to rehydrate
        persistor.purge().then(() => {
          console.log('Cross-window auth sync: Purged persisted state')
          persistor.persist()
          console.log('Cross-window auth sync: Triggered rehydration')
        })
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
          'Cross-window auth sync: Forcing Redux rehydration after OAuth',
        )

        // Get current localStorage value
        const persistedState = localStorage.getItem(
          `persist:${REDUX_PERSIST_KEY}`,
        )
        if (persistedState) {
          console.log(
            'Cross-window auth sync: Found persisted state, triggering rehydration',
          )

          // Force rehydration by purging and persisting again
          persistor.purge().then(() => {
            persistor.persist()
          })
        }
      }, 300)
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

          console.log('Cross-window auth sync: Comparing states:', {
            persistedAuth: authState?.isAuthenticated,
            currentAuth: currentState.isAuthenticated,
            persistedUser: authState?.user?.id,
            currentUser: currentState.user?.id,
          })

          // If persisted state shows authentication but current state doesn't
          if (authState?.isAuthenticated && !currentState.isAuthenticated) {
            console.log(
              'Cross-window auth sync: Auth state mismatch detected, forcing rehydration',
            )
            persistor.purge().then(() => {
              persistor.persist()
            })
          }
        } catch (error) {
          console.error(
            'Cross-window auth sync: Error parsing persisted state:',
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
