'use client'
import { CarouselDemo } from '@shared/components/common/carousel-demo'
import AcademiesSection from '@shared/components/pages/home/academies-section'
import BrandSection from '@shared/components/pages/home/brands-section'
import HeroSection from '@shared/components/pages/home/hero-section'
import PricingPlan from '@shared/components/pages/home/pricing-plan-section'
import TopComunitiesSection from '@shared/components/pages/home/top-comunities-section'
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
