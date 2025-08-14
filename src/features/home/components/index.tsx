'use client'
import { CarouselDemo } from '@shared/components/carousel-demo'
import AcademiesSection from './academies-section'
import BrandSection from './brands-section'
import HeroSection from './hero-section'
import PricingPlan from './pricing-plan-section'
import TopComunitiesSection from './top-comunities-section'
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
