'use client'
import FeaturesSection from '@/components/home/features-section'
import HeroSection from '@/components/home/hero-section'
import PricingSection from '@/components/home/pricing-section'
// import { HeroSection, HomeServices } from '@/pages/Home/home.element'

const HomePage = () => {
  return (
    <div className="homepage-wrapper ">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </div>
  )
}

export default HomePage
