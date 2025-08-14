// /shop/page.tsx
'use client'
import RadialGradient from '@/components/blocks/background/radialGradient'
import MarketplaceLink from '@/components/pages/shop/marketplace-link'
import {
  defaultMarketplaceStyle,
  featureItems,
  marketplaceLinks,
  marketplaceStyles,
} from '@/components/pages/shop/shop-data'
import ShopFeatureCard from '@/components/pages/shop/shop-feature-card'
import useShops from '@/components/pages/shop/useShop'
import { Crown, Loader2, Sparkles, Star } from 'lucide-react'

export default function ShopPage() {
  const { data: shops, isLoading, isError } = useShops()
  const renderMarketplaceLinks = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )
    }

    if (isError || !shops) {
      return (
        <p className="text-red-400">
          Could not load marketplaces. Please try again later.
        </p>
      )
    }

    return (
      <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
        {shops.map((shop) => {
          // Look up the style, or use the default if not found
          const styles =
            marketplaceStyles[shop.name.toLowerCase()] ||
            defaultMarketplaceStyle

          return (
            <MarketplaceLink
              key={shop.id}
              href={shop.shop_url}
              name={shop.name}
              {...styles} // Spread the styles as props
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen lg:min-h-fit bg-black relative overflow-hidden pt-20 md:pt-0">
      <RadialGradient
        x={70}
        y={50}
        primaryOpacity={0.15}
        className="min-h-screen lg:min-h-fit relative"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-red-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-to-br from-purple-500 to-red-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-xl animate-pulse delay-3000"></div>
        </div>

        <section className="relative px-4 py-20 md:py-32 z-10">
          <div className="container mx-auto text-center relative z-10 max-w-5xl">
            {/* Hero */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/25 to-pink-500/25 rounded-full border border-red-400/40 mb-8 backdrop-blur-sm">
              <Crown className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold text-white tracking-wider">
                OFFICIAL PROPUBLIC STORE
              </span>
              <Star className="w-4 h-4 text-yellow-400 ml-2" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 drop-shadow-2xl">
                GEAR UP
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">LEVEL UP</span>
            </h1>

            <div className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed space-y-3">
              <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                The Ultimate Gaming Merchandise Experience
              </p>
              <p>
                From premium gaming gear to exclusive ProPublic-branded apparel,
                <span className="text-red-400 font-bold">
                  {' '}
                  dominate both in-game and in style.
                </span>
              </p>
              <p className="text-gray-400">
                Join thousands of gamers who've already upgraded their arsenal.
              </p>
            </div>

            {/* Features Grid - Now Data-Driven */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {featureItems.map((feature) => (
                <ShopFeatureCard key={feature.title} {...feature} />
              ))}
            </div>

            {/* CTA Section - Now Data-Driven */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 text-white mb-6">
                <span className="text-lg font-semibold">
                  Choose Your Marketplace
                </span>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              {renderMarketplaceLinks()}
            </div>

            {/* Social Proof */}
            <div className="text-gray-400 text-sm">
              <p>
                Trusted by <span className="text-white font-bold">10,000+</span>{' '}
                gamers worldwide
              </p>
            </div>
          </div>
        </section>
      </RadialGradient>
    </div>
  )
}
