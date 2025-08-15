'use client'

import type React from 'react'
import { ReduxProvider } from '@/providers/ReduxProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { Toaster } from '@shared/components/ui/sonner'
import { CrossWindowAuthSync } from './CrossWindowAuthSync'

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  // Create QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors
              if (
                error?.response?.status >= 400 &&
                error?.response?.status < 500
              ) {
                return false
              }
              return failureCount < 3
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  )
  return (
    <SessionProvider>
      <ReduxProvider>
        <CrossWindowAuthSync />
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="bottom-right" />
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  )
}

export default AppProviders
