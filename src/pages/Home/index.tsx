'use client'
import AcademiesSection from '@/components/home/academies-section'
import BrandSection from '@/components/home/brands-section'
import HeroSection from '@/components/home/hero-section'
import PricingPlan from '@/components/home/pricing-plan-section'
import { GAMELIST, COURSES } from '@/config/exampleData'

const HomePage = () => {
  return (
    <div className="homepage-wrapper ">
      <HeroSection games={GAMELIST} />
      {/* <FeaturesSection /> */}
      <AcademiesSection courses={COURSES} />
      {/* <GameSection games={GAMELIST} /> */}
      <BrandSection />
      {/* <PricingSection /> */}
      <PricingPlan />
    </div>
  )
}

export default HomePage
