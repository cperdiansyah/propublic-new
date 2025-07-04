'use client'
import BrandSection from '@/components/home/brands-section'
import FeaturesSection from '@/components/home/features-section'
import GameSection from '@/components/home/game-section'
import HeroSection from '@/components/home/hero-section'
import PricingSection from '@/components/home/pricing-section'
import { GAMELIST } from '@/config/exampleData'
// import { HeroSection, HomeServices } from '@/pages/Home/home.element'

const HomePage = () => {
  return (
    <div className="homepage-wrapper ">
      <HeroSection />
      <FeaturesSection />
      <GameSection games={GAMELIST} />
      <BrandSection />
      <PricingSection />
    </div>
  )
}

export default HomePage
