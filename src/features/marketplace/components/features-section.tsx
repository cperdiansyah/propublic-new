'use client'

import { featureItems } from './shop-data'
import ShopFeatureCard from './shop-feature-card'

/**
 * Features Section Component
 * Displays the grid of feature cards
 * Following Single Responsibility Principle - only handles features display
 */
export const FeaturesSection = () => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
    {featureItems.map((feature) => (
      <ShopFeatureCard key={feature.title} {...feature} />
    ))}
  </section>
)
