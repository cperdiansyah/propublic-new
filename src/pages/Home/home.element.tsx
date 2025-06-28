import { Button } from '@/components/ui/button'
import React from 'react'

const HeroSection = () => {
  return (
    <section className="bg-primary-gradeint pt-28 pb-20 px-4 min-h-screen flex items-center bg-dark-primary text-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black ">
                We're changing how{' '}
                <span className="gradient-text">gaming communities </span>
                are built
              </h1>
              <p className="text-xl md:text-2xl text-cream/80 ">
                Connect with the best players, learn from pros, and build
                lasting relationships in the ultimate gaming community platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-custom-primary to-custom-draker-primary text-cream px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all glow h-auto">
                Join Community Free
              </Button>
              <Button className="border bg-transparent border-custom-secondary hover:bg-custom-secondary hover:text-dark-primary text-accent px-8 py-4 rounded-xl font-semibold text-lg transition-all h-auto">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-custom-secondary rounded-full animate-pulse"></div>
                <span className="text-cream/60 font-medium">
                  28,000+ Active Gamers
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-custom-primary rounded-full"></div>
                <span className="text-cream/60 font-medium">
                  1,200+ Pro Coaches
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-dark-secondary to-dark-primary rounded-3xl p-8 border border-custom-primary/20 animate-float">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-dark-primary font-bold">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Pro Tournament Winner</h3>
                    <p className="text-cream/60">just joined the community</p>
                  </div>
                </div>
                <div className="bg-dark-primary/50 rounded-xl p-4">
                  <p className="text-cream/80">
                    "The coaching here is next level. Went from Diamond to
                    Master in 2 weeks!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
