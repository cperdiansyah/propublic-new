import { REDUX_PERSIST_KEY } from '@shared/config'
import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Persist configuration
const persistConfig = {
  key: REDUX_PERSIST_KEY || 'root',
  storage, // if needed, use a safer storage
  whitelist: ['auth'], // only counter will be persisted, add other reducers if needed
}

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// const persistedReducer = persistReducer(persistConfig, rootReducer);
export const persistor = persistStore(store)

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
