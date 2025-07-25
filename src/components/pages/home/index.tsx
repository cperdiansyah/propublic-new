'use client'
import { CarouselDemo } from '@/components/common/carousel-demo'
import AcademiesSection from '@/components/pages/home/academies-section'
import BrandSection from '@/components/pages/home/brands-section'
import HeroSection from '@/components/pages/home/hero-section'
import PricingPlan from '@/components/pages/home/pricing-plan-section'
import TopComunitiesSection from '@/components/pages/home/top-comunities-section'
import { GAMELIST, COURSES, COMMUNITIES } from '@/config/exampleData'

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
