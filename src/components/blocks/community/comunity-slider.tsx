'use client'

import CommunitiesCard from '@/components/blocks/community/community-card'
import type { CarouselProviderProps } from '@/components/common/infinite-carousel/carousel-context'
import {
  Carousel,
  CarouselContent,
  CarouselFlyingControls,
  CarouselItem,
} from '@/components/ui/carousel'
import type { TypeCommunityItem } from '@/types/home.types'
import type React from 'react'

interface IComunitySlider {
  communities: TypeCommunityItem[]
  autoPlay?: CarouselProviderProps['autoplay']
  autoplayDelay?: CarouselProviderProps['autoplayDelay']
  className?: string
}

const ComunitySlider: React.FC<IComunitySlider> = ({ communities }) => {
  if (communities?.length === 0 || !communities) return null
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent>
        {communities.map((item, index) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5"
          >
            <CommunitiesCard
              community={item}
              index={index}
              showJoinCommunityButton={true}
              className="h-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselFlyingControls />
    </Carousel>
  )
}

export default ComunitySlider
