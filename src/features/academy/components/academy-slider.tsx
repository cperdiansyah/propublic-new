'use client'

import AcademyCard from './academy-card'
import { InfiniteCarouselContent } from '@shared/components/infinite-carousel/carousel-content'
import {
  CarouselProvider,
  type CarouselProviderProps,
} from '@shared/components/infinite-carousel/carousel-context'
import {
  CarouselNext,
  CarouselPrevious,
} from '@shared/components/infinite-carousel/carousel-controls'
import { InfiniteCarouselItem } from '@shared/components/infinite-carousel/carousel-item'
import { DELAY_AUTOPLAY_MS } from '@shared/config/const'
import type { ICourseItem } from '@shared/types/home.types'
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
      visibleItems={{
        mobile: 1,
        tablet: 3,
        desktop: 4,
        // desktopExtraLarge: 5,
      }}
    >
      <div className={`carousel-container ${className}`}>
        {/* Controls */}
        <InfiniteCarouselContent>
          {academies.map((academy) => (
            <InfiniteCarouselItem
              key={academy.course_id}
              className="academy-card-item"
            >
              <AcademyCard
                key={academy.course_id}
                id={academy.course_id}
                name={academy.course_title}
                rating={Number(academy.course_rating)}
                image={academy.course_image_url}
                price={Number(academy.course_price)}
                description={academy.course_description}
                slug={academy.course_slug}
              />
            </InfiniteCarouselItem>
          ))}
        </InfiniteCarouselContent>
      </div>
    </CarouselProvider>
  )
}

export default AcademySlider
