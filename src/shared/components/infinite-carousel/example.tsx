'use client'

import { InfiniteCarouselContent } from '@shared/components/common/infinite-carousel/carousel-content'
import {
  CarouselProvider,
  useCarouselContext,
} from '@shared/components/common/infinite-carousel/carousel-context'
import {
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
} from '@shared/components/common/infinite-carousel/carousel-controls'
import { InfiniteCarouselItem } from '@shared/components/common/infinite-carousel/carousel-item'
import { Badge } from '@/shared/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  featured?: boolean
}

interface ScalableCarouselDemoProps {
  products: Product[]
}

// Custom carousel info component
export function CarouselInfo() {
  const { current, totalItems, infiniteMultiplier } = useCarouselContext()
  const originalCount = totalItems / infiniteMultiplier
  const currentOriginal = (current % originalCount) + 1

  return (
    <div className="text-sm text-muted-foreground text-center">
      {currentOriginal} of {originalCount}
    </div>
  )
}

export function ScalableCarouselDemo({ products }: ScalableCarouselDemoProps) {
  return (
    <div className="space-y-12">
      {/* Example 1: Traditional Layout with Side Controls */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Traditional Layout</h2>
        <CarouselProvider
          itemCount={products.length}
          visibleItems={{ mobile: 1, tablet: 2, desktop: 3 }}
        >
          <div className="relative">
            <InfiniteCarouselContent>
              {products.map((product) => (
                <InfiniteCarouselItem key={product.id}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {product.name}
                        </CardTitle>
                        {product.featured && <Badge>Featured</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">
                          ${product.price}
                        </span>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </InfiniteCarouselItem>
              ))}
            </InfiniteCarouselContent>

            {/* Positioned controls */}
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </div>

          <CarouselIndicators className="mt-6" />
        </CarouselProvider>
      </div>

      {/* Example 2: Controls Outside with Custom Styling */}
      <div>
        <h2 className="text-2xl font-bold mb-6">External Controls</h2>
        <CarouselProvider
          itemCount={products.length}
          autoplay={true}
          autoplayDelay={4000}
          visibleItems={{ mobile: 1, tablet: 2, desktop: 4 }}
        >
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-4">
            <CarouselInfo />
            <div className="flex gap-2">
              <CarouselPrevious variant="default" size="sm">
                Previous
              </CarouselPrevious>
              <CarouselNext variant="default" size="sm">
                Next
              </CarouselNext>
            </div>
          </div>

          <InfiniteCarouselContent>
            {products.map((product) => (
              <InfiniteCarouselItem key={product.id}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${product.price}</span>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </InfiniteCarouselItem>
            ))}
          </InfiniteCarouselContent>

          <CarouselIndicators showNumbers className="mt-4" />
        </CarouselProvider>
      </div>

      {/* Example 3: Vertical Carousel */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Vertical Carousel</h2>
        <div className="flex gap-6">
          <CarouselProvider
            itemCount={products.length}
            orientation="vertical"
            visibleItems={{ mobile: 2, tablet: 3, desktop: 4 }}
          >
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>

              <InfiniteCarouselContent className="max-h-96">
                {products.map((product) => (
                  <InfiniteCarouselItem key={product.id}>
                    <Card>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">
                            {product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            ${product.price}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </InfiniteCarouselItem>
                ))}
              </InfiniteCarouselContent>
            </div>
          </CarouselProvider>
        </div>
      </div>

      {/* Example 4: Custom Responsive Breakpoints */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Custom Responsive</h2>
        <CarouselProvider
          itemCount={products.length}
          visibleItems={{ mobile: 1, tablet: 3, desktop: 5 }}
        >
          <InfiniteCarouselContent>
            {products.map((product) => (
              <InfiniteCarouselItem
                key={product.id}
                customBasis="basis-full sm:basis-1/3 lg:basis-1/5"
              >
                <Card className="h-32">
                  <CardContent className="p-3 h-full flex flex-col justify-center items-center text-center">
                    <h4 className="font-semibold text-sm mb-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      ${product.price}
                    </p>
                  </CardContent>
                </Card>
              </InfiniteCarouselItem>
            ))}
          </InfiniteCarouselContent>

          {/* Bottom controls */}
          <div className="flex justify-center gap-4 mt-4">
            <CarouselPrevious variant="ghost" />
            <CarouselNext variant="ghost" />
          </div>
        </CarouselProvider>
      </div>
    </div>
  )
}
