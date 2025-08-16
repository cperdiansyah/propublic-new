'use client'
import AcademiesSection from '../components/academies-section'
import BrandSection from '../components/brands-section'
import HeroSection from '../components/hero-section'
import PricingPlan from '../components/pricing-plan-section'
import TopComunitiesSection from '../components/top-comunities-section'
import { GAMELIST, COURSES, COMMUNITIES } from '@shared/config/exampleData'

const HomePage = () => {
  return (
    <div className="homepage-wrapper ">
      <HeroSection games={GAMELIST.slice(0, 8)} />
      <TopComunitiesSection communities={COMMUNITIES} />
      <AcademiesSection courses={COURSES} />
      <BrandSection />
      <PricingPlan />
      {/* <CarouselDemo /> */}
    </div>
  )
}

export default HomePage
