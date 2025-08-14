// /shop/components/shop-data.ts

import { Crown, Star, Zap, ShoppingBag, Sparkles } from 'lucide-react'
type MarketplaceStyle = {
  gradient: string
  hoverGradient: string
  hoverShadow: string
  hoverBorder: string
}

export const featureItems = [
  {
    Icon: Zap,
    title: 'Lightning Fast Delivery',
    description: 'Get your gear delivered at the speed of light',
  },
  {
    Icon: Star,
    title: 'Premium Quality',
    description: 'Only the finest materials and craftsmanship',
  },
  {
    Icon: Crown,
    title: 'Exclusive Designs',
    description: 'Limited edition ProPublic merchandise',
  },
]

export const marketplaceLinks = [
  {
    href: 'https://shopee.com',
    name: 'Shopee',
    // Shopee's unique orange/red colors
    gradient: 'from-orange-500 to-red-500',
    hoverGradient: 'hover:from-orange-600 hover:to-red-600',
    hoverShadow: 'hover:shadow-orange-500/30',
    hoverBorder: 'hover:border-orange-400/50',
  },
  {
    href: 'https://tokopedia.com',
    name: 'Tokopedia',
    // Tokopedia's unique green colors
    gradient: 'from-green-500 to-emerald-500',
    hoverGradient: 'hover:from-green-600 hover:to-emerald-600',
    hoverShadow: 'hover:shadow-green-500/30',
    hoverBorder: 'hover:border-green-400/50',
  },
]

export const marketplaceStyles: Record<string, MarketplaceStyle> = {
  shopee: {
    gradient: 'from-orange-500 to-red-500',
    hoverGradient: 'hover:from-orange-600 hover:to-red-600',
    hoverShadow: 'hover:shadow-orange-500/30',
    hoverBorder: 'hover:border-orange-400/50',
  },
  tokopedia: {
    gradient: 'from-green-500 to-emerald-500',
    hoverGradient: 'hover:from-green-600 hover:to-emerald-600',
    hoverShadow: 'hover:shadow-green-500/30',
    hoverBorder: 'hover:border-green-400/50',
  },
  // Add more styles for other shops here...
  // e.g., 'lazada': { ... }
}

// A fallback style for any marketplace not defined above.
export const defaultMarketplaceStyle: MarketplaceStyle = {
  gradient: 'from-gray-600 to-gray-700',
  hoverGradient: 'hover:from-gray-500 hover:to-gray-600',
  hoverShadow: 'hover:shadow-gray-400/20',
  hoverBorder: 'hover:border-gray-400/50',
}
