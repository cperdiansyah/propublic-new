'use client'
import AnimatedBackground from '@/components/blocks/background/hexagon-background'
import { Button } from '@/components/ui/button'
import { Crown, Sparkles } from 'lucide-react'

export default function ShopContent() {
  return (
    <div className="max-h-screen bg-black relative py-20 md:py-32   overflow-hidden">
      {/* Hexagonal BG */}
      <AnimatedBackground />
      {/* Hero Section */}
      <section className="relative px-4 m-auto py-10  z-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto text-center relative z-10 mb-5">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full border border-red-500/30 mb-8">
            <Crown className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium text-white">
              Official Gaming Community Store
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via--400 to-custom-secondary">
              EXCLUSIVE
            </span>
            <br />
            <span className="text-white">MERCH AWAITS</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Don't just play the game.{' '}
            <span className="text-red-400 font-semibold">Dominate it.</span>
            <br />
            Get exclusive merchandise that makes other gamers jealous.
          </p>

          {/* Stats */}

          {/* CTA Scroll Indicator */}
          <div className="animate-bounce flex mx-auto justify-center text-red-400">
            <span className="mr-2">Explore Stores Below</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
          <Button
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 cursor-pointer"
            onClick={() => window.open('https://shopee.com', '_blank')}
          >
            Shopee
          </Button>
          <Button
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-8 py-3 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 cursor-pointer"
            onClick={() => window.open('https://tokopedia.com', '_blank')}
          >
            Tokopedia
          </Button>
        </div>
      </section>
    </div>
  )
}
