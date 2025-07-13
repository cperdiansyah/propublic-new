'use client'

import AcademyCard from '@/components/blocks/academy/academy-card'
import {
  InfiniteCarouselContent,
  InfiniteCarouselItem,
} from '@/components/common/infinite-carousel'
import {
  CarouselProvider,
  type CarouselProviderProps,
} from '@/components/common/infinite-carousel/carousel-context'
import {
  CarouselNext,
  CarouselPrevious,
} from '@/components/common/infinite-carousel/carousel-controls'
import { DELAY_AUTOPLAY_MS } from '@/config/const'
import type { ICourseItem } from '@/types/home.types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface IAcademySlider {
  academies: ICourseItem[]
  showControlButton?: boolean
  autoPlay?: CarouselProviderProps['autoplay']
  autoplayDelay?: CarouselProviderProps['autoplayDelay']
  className?: string
}
const AcademySlider = ({
  academies,
  showControlButton = false,
  autoPlay = true,
  autoplayDelay = DELAY_AUTOPLAY_MS,
  className,
}: IAcademySlider) => {
  if (academies?.length === 0 || !academies) return
  return (
    <CarouselProvider
      itemCount={academies.length}
      autoplay={autoPlay}
      autoplayDelay={autoplayDelay}
      visibleItems={{ mobile: 2, tablet: 4, desktop: 6 }}
    >
      <div className={`carousel-container ${className}`}>
        {/* Controls */}
        {showControlButton && (
          <div className="relative flex justify-end items-center mb-4 mt-5 z-10">
            <div className="flex items-center gap-2">
              <CarouselPrevious
                className="text-black hover:bg-custom-accent"
                size="sm"
              >
                <ChevronLeft />
              </CarouselPrevious>

              <CarouselNext
                className="text-black hover:bg-custom-accent"
                size="sm"
              >
                <ChevronRight />
              </CarouselNext>
            </div>
          </div>
        )}
        <InfiniteCarouselContent>
          {academies.map((academy) => (
            <InfiniteCarouselItem key={academy.course_id}>
              <AcademyCard
                key={academy.course_id}
                id={academy.course_id}
                name={academy.course_title}
                rating={Number(academy.course_rating)}
                image={academy.course_image_url}
                price={Number(academy.course_price)}
                description={academy.course_description}
              />
            </InfiniteCarouselItem>
          ))}
        </InfiniteCarouselContent>
      </div>
    </CarouselProvider>
  )
}

export default AcademySlider
