'use client'

import { Sparkles } from 'lucide-react'
import MarketplaceLink from './marketplace-link'
import { defaultMarketplaceStyle, marketplaceStyles } from './shop-data'
import useShops from './useShop'
import { LoadingSpinner } from './loading-spinner'
import { ErrorMessage } from './error-message'

/**
 * Marketplace Section Component
 * Handles the display of marketplace links with loading and error states
 * Following Single Responsibility Principle - only handles marketplace display
 */
export const MarketplaceSection = () => {
  const { data: shops, isLoading, isError } = useShops()

  return (
    <section className="space-y-6">
      <MarketplaceHeader />
      <MarketplaceContent
        shops={shops}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  )
}

/**
 * Marketplace Header Component
 * Displays the section title with icon
 */
const MarketplaceHeader = () => (
  <div className="flex items-center justify-center gap-3 text-white">
    <span className="text-lg font-semibold">Choose Your Marketplace</span>
    <Sparkles className="w-5 h-5 animate-pulse" />
  </div>
)

/**
 * Marketplace Content Component
 * Handles different states: loading, error, and success
 */
interface MarketplaceContentProps {
  shops: any[] | undefined
  isLoading: boolean
  isError: boolean
}

const MarketplaceContent = ({
  shops,
  isLoading,
  isError,
}: MarketplaceContentProps) => {
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError || !shops) {
    return (
      <ErrorMessage message="Could not load marketplaces. Please try again later." />
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
      {shops.map((shop) => {
        const styles =
          marketplaceStyles[shop.name.toLowerCase()] || defaultMarketplaceStyle

        return (
          <MarketplaceLink
            key={shop.id}
            href={shop.shop_url}
            name={shop.name}
            {...styles}
          />
        )
      })}
    </div>
  )
}
