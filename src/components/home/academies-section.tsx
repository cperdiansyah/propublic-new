/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
'use client'

import ParticleGradient from '@/components/common/background/particleGradient'
import SectionTitle from '@/components/common/section-title'
import { formatIDRCurrency } from '@/lib/formatCurrency'
import type { ICourseItem } from '@/types/home.types'
import renderStars from '@/utils/renderStars'
import Image from 'next/image'
import type React from 'react'

import {
  InfiniteCarouselContent,
  InfiniteCarouselItem,
} from '@/components/common/infinite-carousel'
import { CarouselProvider } from '@/components/common/infinite-carousel/carousel-context'

// import Plac
interface IAcademiesSection {
  courses: ICourseItem[]
}

const AcademiesSection: React.FC<IAcademiesSection> = ({ courses }) => {
  return (
    <ParticleGradient className="bg-black ">
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
              <span className="section-title-underline">Academies!</span>
            </>
          }
          withButton
          btnText="Explore More Course"
          href="/academy"
          buttonClassname="bg-custom-accent text-black hover:bg-custom-accent/90"
        />

        <div className="academies-wrapper container">
          <CarouselProvider
            itemCount={courses.length}
            autoplay={true}
            autoplayDelay={4000}
            visibleItems={{ mobile: 1, tablet: 4 }}
          >
            <div className={`carousel-container`}>
              {/* Controls */}
              <InfiniteCarouselContent>
                {courses.map((game) => (
                  <InfiniteCarouselItem key={game.course_id}>
                    <AcademyCard
                      key={game.course_id}
                      id={game.course_id}
                      name={game.course_title}
                      rating={Number(game.course_rating)}
                      image={game.course_image_url}
                      price={Number(game.course_price)}
                      description={game.course_description}
                    />
                  </InfiniteCarouselItem>
                ))}
              </InfiniteCarouselContent>
            </div>
          </CarouselProvider>
        </div>
      </div>
    </ParticleGradient>
  )
}

interface CoachCardProps {
  id: string | number
  name: string
  description?: string | null
  rating: number
  image: string
  price: number
  // onSelect: (coachId: string) => void
}

const AcademyCard: React.FC<CoachCardProps> = ({
  name,
  description,
  rating,
  image,
  price,
  // onSelect,
}) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer border-radius-propublic"
      // onClick={() => onSelect(id)}
    >
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-black/60"></div>
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={500}
          height={500}
          blurDataURL={'/images/placeholder.png'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
          {name.toUpperCase()}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">{rating}</span>
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" /> */}
      <div className="absolute inset-0 group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:via-black/20 group-hover:to-transparent transition-all duration-200" />

      {/* Blur Overlay on Hover*/}
      <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500" />

      {/* Hover visible - Additional content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform  translate-y-4 hover:block opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 ">
        <p
          className="text-base text-gray-200 mb-3 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description || '' }}
        ></p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-white">
            {formatIDRCurrency(price)}
          </span>
        </div>
      </div>
    </div>
  )
}

// export default CoachCard

export default AcademiesSection
