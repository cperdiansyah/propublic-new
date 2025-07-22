import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDown={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden p-3"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

// Flying Controls Component for regular carousel (Netflix-style with conditional visibility)
interface CarouselFlyingControlsProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

function CarouselFlyingControls({
  className,
  variant = 'ghost',
  size = 'icon',
}: CarouselFlyingControlsProps) {
  const {
    orientation,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    api,
  } = useCarousel()
  const [isHovered, setIsHovered] = React.useState(false)
  const [totalSlides, setTotalSlides] = React.useState(0)
  const [visibleSlides, setVisibleSlides] = React.useState(1)

  React.useEffect(() => {
    if (!api) return

    const updateSlideInfo = () => {
      setTotalSlides(api.slideNodes().length)
      // Get number of slides in view
      const slidesInView = api.slidesInView().length
      setVisibleSlides(slidesInView)
    }

    updateSlideInfo()
    api.on('init', updateSlideInfo)
    api.on('resize', updateSlideInfo)

    return () => {
      api.off('init', updateSlideInfo)
      api.off('resize', updateSlideInfo)
    }
  }, [api])

  const handlePrevClick = React.useCallback(() => {
    scrollPrev()
  }, [scrollPrev])

  const handleNextClick = React.useCallback(() => {
    scrollNext()
  }, [scrollNext])

  // Show next button only if there are more slides than what's visible and can scroll
  const shouldShowNextButton = React.useMemo(() => {
    if (totalSlides <= visibleSlides) return false
    return canScrollNext
  }, [totalSlides, visibleSlides, canScrollNext])

  const slideVariants = {
    left: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: isHovered ? 1 : 0.7, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    right: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: isHovered ? 1 : 0.7, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    up: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: isHovered ? 1 : 0.7, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    down: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: isHovered ? 1 : 0.7, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  }

  return (
    <section
      className={cn('absolute inset-0 pointer-events-none', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Carousel navigation controls"
    >
      {/* Previous Button - Show only when can scroll previous */}
      <AnimatePresence>
        {canScrollPrev && (
          <motion.div
            variants={
              orientation === 'vertical' ? slideVariants.up : slideVariants.left
            }
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
              'absolute z-10',
              orientation === 'vertical'
                ? 'top-2 left-1/2 -translate-x-1/2'
                : 'top-1/2 -translate-y-1/2 left-2',
            )}
          >
            <Button
              variant={variant}
              size={size}
              className={cn(
                'pointer-events-auto w-10 h-10 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-300',
                canScrollPrev
                  ? 'border-custom-primary/50 text-custom-primary hover:bg-custom-primary hover:text-white'
                  : 'border-white/20 text-white/30 cursor-not-allowed',
              )}
              onClick={handlePrevClick}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="sr-only">Previous slide</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button - Show only when there are more slides than visible and can scroll */}
      <AnimatePresence>
        {shouldShowNextButton && (
          <motion.div
            variants={
              orientation === 'vertical'
                ? slideVariants.down
                : slideVariants.right
            }
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
              'absolute z-10',
              orientation === 'vertical'
                ? 'bottom-2 left-1/2 -translate-x-1/2'
                : 'top-1/2 -translate-y-1/2 right-2',
            )}
          >
            <Button
              variant={variant}
              size={size}
              className={cn(
                'pointer-events-auto w-10 h-10 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-300',
                shouldShowNextButton
                  ? 'border-custom-primary/50 text-custom-primary hover:bg-custom-primary hover:text-white'
                  : 'border-white/20 text-white/30 cursor-not-allowed',
              )}
              onClick={handleNextClick}
              disabled={!shouldShowNextButton}
            >
              <ChevronRight className="w-5 h-5" />
              <span className="sr-only">Next slide</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselFlyingControls,
}
