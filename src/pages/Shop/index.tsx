'use client'
import RadialGradient from '@/components/blocks/background/radialGradient'
import { Crown, ShoppingBag, Sparkles, Star, Zap } from 'lucide-react'
// import ShopeeImage from '@/p'

export default function ShopContent() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <RadialGradient
        x={70}
        y={50}
        primaryOpacity={0.15}
        className="min-h-screen relative"
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-red-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-to-br from-purple-500 to-red-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-xl animate-pulse delay-3000"></div>
        </div>

        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32 z-10">
          <div className="container mx-auto text-center relative z-10 max-w-5xl">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/25 to-pink-500/25 rounded-full border border-red-400/40 mb-8 backdrop-blur-sm">
              <Crown className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold text-white tracking-wider">
                OFFICIAL PROPUBLIC STORE
              </span>
              <Star className="w-4 h-4 text-yellow-400 ml-2" />
            </div>

            {/* Enhanced Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 drop-shadow-2xl">
                GEAR UP
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">LEVEL UP</span>
            </h1>

            {/* Enhanced Subheadline */}
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

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">
                  Lightning Fast Delivery
                </h3>
                <p className="text-gray-400 text-sm">
                  Get your gear delivered at the speed of light
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Premium Quality</h3>
                <p className="text-gray-400 text-sm">
                  Only the finest materials and craftsmanship
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Exclusive Designs</h3>
                <p className="text-gray-400 text-sm">
                  Limited edition ProPublic merchandise
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 text-white mb-6">
                {/* <ShoppingBag className="w-5 h-5" /> */}
                <span className="text-lg font-semibold">
                  Choose Your Marketplace
                </span>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
                <a
                  className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-4 rounded-xl border border-transparent hover:border-orange-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 cursor-pointer flex items-center justify-center space-x-3 min-w-[200px]"
                  href="https://shopee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                  <span className="text-lg">Shop on Shopee</span>
                </a>
                <a
                  className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-10 py-4 rounded-xl border border-transparent hover:border-green-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1 cursor-pointer flex items-center justify-center space-x-3 min-w-[200px]"
                  href="https://tokopedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                  <span className="text-lg">Shop on Tokopedia</span>
                </a>
              </div>
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
