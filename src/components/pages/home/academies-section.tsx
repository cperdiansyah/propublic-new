/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
'use client'

import ParticleGradient from '@/components/blocks/background/particleGradient'
import SectionTitle from '@/components/common/section-title'
import type { ICourseItem } from '@/types/home.types'
import type React from 'react'

import AcademySlider from '@/components/blocks/academy/academy-slider'

// import Plac
interface IAcademiesSection {
  courses: ICourseItem[]
}

const AcademiesSection: React.FC<IAcademiesSection> = ({ courses }) => {
  return (
    <ParticleGradient className="bg-black min-h-screen lg:min-h-fit py-24 lg:py-0 ">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-red-900/10 to-black"></div>

        {/* Animated geometric shapes */}
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-r from-red-600/10 to-yellow-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-to-l from-red-500/10 to-black/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-yellow-500/5 to-red-600/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      <div className="  px-5 relative py-5">
        <SectionTitle
          title={
            <>
              Top Popular{' '}
              <span className="section-title-underline font-teko">
                Academies!
              </span>
            </>
          }
          withButton
          btnText="Explore More Academy"
          href="/academy"
          buttonClassname="bg-custom-accent text-black !font-teko hover:bg-custom-accent/90"
        />

        <div className="academies-wrapper container">
          <AcademySlider academies={courses} />
        </div>
      </div>
    </ParticleGradient>
  )
}

// export default CoachCard

export default AcademiesSection
