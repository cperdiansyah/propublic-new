'use client'

import { Suspense } from 'react'
import RadialGradient from '@shared/components/effects/radialGradient'

import { HERO_CONFIG, SOCIAL_PROOF_CONFIG } from './shop-data'
import { MarketplaceSection } from './marketplace-section'
import { FeaturesSection } from './features-section'
import { HeroSection } from './hero-section'
import { LoadingSpinner } from './loading-spinner'
import { AnimatedBackground } from './animated-background'

/**
 * ShopPage component following clean architecture principles:
 * - Single Responsibility: Each component has one clear purpose
 * - Separation of Concerns: Logic, presentation, and data are separated
 * - Dependency Inversion: Components depend on abstractions, not concretions
 * - Open/Closed: Easy to extend with new sections without modifying existing code
 */
export default function ShopPage() {
  return (
    <div className="min-h-screen lg:min-h-fit bg-black relative overflow-hidden pt-20 md:pt-0">
      <RadialGradient
        x={70}
        y={50}
        primaryOpacity={0.15}
        className="min-h-screen lg:min-h-fit relative"
      >
        <AnimatedBackground />

        <main className="relative px-4 py-20 md:py-32 z-10">
          <div className="container mx-auto text-center relative z-10 max-w-5xl space-y-12">
            <HeroSection config={HERO_CONFIG} />
            <FeaturesSection />
            <Suspense fallback={<LoadingSpinner />}>
              <MarketplaceSection />
            </Suspense>
            <SocialProofSection config={SOCIAL_PROOF_CONFIG} />
          </div>
        </main>
      </RadialGradient>
    </div>
  )
}

/**
 * Social Proof Section Component
 * Displays trust indicators and user statistics
 */
interface SocialProofConfig {
  userCount: string
  description: string
}

interface SocialProofSectionProps {
  config: SocialProofConfig
}

const SocialProofSection = ({ config }: SocialProofSectionProps) => (
  <section className="text-gray-400 text-sm">
    <p>
      Trusted by{' '}
      <span className="text-white font-bold">{config.userCount}</span>{' '}
      {config.description}
    </p>
  </section>
)
