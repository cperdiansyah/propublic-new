// Type definitions for better maintainability and IntelliSense
interface CarouselGameItem {
  readonly id: number
  readonly name: string
  readonly slug: string
  readonly path: string
  readonly imageSrc: string
}
// interface CarouselItem {
//   readonly id: number;
//   readonly title: string;
//   readonly description: string;
//   readonly price: string;
//   readonly image: string;
// }

type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'large'

interface ResponsiveConfig {
  readonly mobile: number
  readonly tablet: number
  readonly desktop: number
  readonly large: number
}

interface CarouselConfig {
  readonly autoScrollInterval: number
  readonly responsiveItems: ResponsiveConfig
  readonly dataMultiplier: number
}

interface CarouselApi {
  scrollTo: (index: number, jump?: boolean) => void
  scrollNext: () => void
  scrollPrev: () => void
  selectedScrollSnap: () => number
  canScrollNext: () => boolean
  canScrollPrev: () => boolean
  on: (event: string, callback: () => void) => void
  off: (event: string, callback: () => void) => void
}

interface ProductCardProps {
  readonly item: CarouselGameItem
}

interface CarouselControlsProps {
  readonly isAutoScrolling: boolean
  readonly onToggleAutoScroll: () => void
  readonly currentItemsPerView: number
  readonly totalItems: number
  readonly currentSlideNumber: number
  readonly originalData: readonly CarouselGameItem[]
  readonly onDotClick: (index: number) => void
}
