import type { RootState } from '@shared/store/store'
import type { Middleware } from '@reduxjs/toolkit'

const STORAGE_KEY = 'redux-app-state'

// Custom persistence middleware
export const persistenceMiddleware: Middleware<{}, RootState> =
  () => (next) => (action) => {
    const result = next(action)

    // Save state to localStorage after each action
    try {
      const persistedState = {}
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState))
    } catch (error) {
      console.warn('Failed to persist state:', error)
    }

    return result
  }

// Function to load persisted state
export const loadPersistedState = (): Partial<RootState> | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.warn('Failed to load persisted state:', error)
    return undefined
  }
}

// Function to clear persisted state
export const clearPersistedState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear persisted state:', error)
  }
}
