'use client'
import LoadingSpinner from '@shared/components/feedback/Loading'
import { persistor, store } from '@shared/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

interface ReduxProviderProps {
  children: React.ReactNode
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
