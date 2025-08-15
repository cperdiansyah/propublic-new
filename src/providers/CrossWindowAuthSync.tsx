'use client'

import { useCrossWindowAuthSync } from '@shared/hooks/use-cross-window-auth-sync'

/**
 * Component that handles cross-window authentication state synchronization
 * Must be inside Redux provider to work properly
 */
export const CrossWindowAuthSync = () => {
  useCrossWindowAuthSync()
  return null // This component doesn't render anything
}
