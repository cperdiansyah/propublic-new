'use client'

import { CarouselProvider } from '@shared/components/common/infinite-carousel/carousel-context'
import { InfiniteCarouselContent } from '@shared/components/common/infinite-carousel/carousel-content'
import { InfiniteCarouselItem } from '@shared/components/common/infinite-carousel/carousel-item'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselFlyingControls,
} from '@/shared/components/ui/carousel'
import { Card, CardContent } from '@/shared/components/ui/card'

const demoItems = [
  { id: 1, title: 'Item 1', content: 'First item content' },
  { id: 2, title: 'Item 2', content: 'Second item content' },
  { id: 3, title: 'Item 3', content: 'Third item content' },
  { id: 4, title: 'Item 4', content: 'Fourth item content' },
  { id: 5, title: 'Item 5', content: 'Fifth item content' },
]

export function CarouselDemo() {
  return (
    <div className="space-y-12 p-8">
      {/* Infinite Carousel with Flying Controls */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Infinite Carousel (Netflix-style)
        </h2>
        <CarouselProvider
          itemCount={demoItems.length}
          visibleItems={{ mobile: 1, tablet: 2, desktop: 3 }}
        >
          <InfiniteCarouselContent>
            {demoItems.map((item) => (
              <InfiniteCarouselItem key={item.id}>
                <Card className="h-40">
                  <CardContent className="p-6 flex flex-col justify-center items-center h-full">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              </InfiniteCarouselItem>
            ))}
          </InfiniteCarouselContent>
        </CarouselProvider>
      </div>

      {/* Regular Carousel with Conditional Flying Controls */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Regular Carousel (Conditional Controls)
        </h2>
        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              {demoItems.map((item) => (
                <CarouselItem key={item.id} className="basis-1/3">
                  <Card className="h-40">
                    <CardContent className="p-6 flex flex-col justify-center items-center h-full">
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center">
                        {item.content}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselFlyingControls />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
