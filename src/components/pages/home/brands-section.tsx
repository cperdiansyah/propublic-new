'use client'
import RadialGradient from '@/components/blocks/background/radialGradient'
import BrandCard from '@/components/blocks/brand/brand-card'
import SectionTitle from '@/components/common/section-title'
import { brands } from '@/config/exampleData'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'food', label: 'FOOD' },
  { id: 'esports', label: 'ESPORTS' },
  { id: 'services', label: 'SERVICES' },
]

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const BrandSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const filteredBrands =
    selectedCategory === 'all'
      ? brands
      : brands.filter((brand) => brand.category === selectedCategory)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Check scroll position for mobile slider
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current || !isMobile) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    if (isMobile) {
      checkScrollPosition()
      const container = scrollContainerRef.current
      if (container) {
        container.addEventListener('scroll', checkScrollPosition)
        return () =>
          container.removeEventListener('scroll', checkScrollPosition)
      }
    }
  }, [isMobile, filteredBrands])

  // Mobile scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 200 + 16 // card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth * 2,
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 200 + 16 // card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth * 2,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="bg-black text-white px-4 min-h-screen md:min-h-[200px] 2xl:min-h-fit">
      <RadialGradient
        x={70}
        y={50}
        primaryOpacity={0.2}
        className="md:py-16 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <SectionTitle
            title={
              <>
                <span className="section-title-underline font-teko">
                  BRANDS
                </span>{' '}
                WE'VE WORKED WITH
              </>
            }
            center
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 border-radius-propublic font-semibold text-sm transition-all duration-300 font-teko backdrop-blur-sm border ${
                  selectedCategory === category.id
                    ? 'bg-custom-primary text-white border-custom-primary shadow-lg shadow-custom-primary/25'
                    : 'bg-white/5 text-white hover:bg-white/10 border-white/20 hover:border-custom-primary/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Mobile Navigation Controls */}
          {isMobile && filteredBrands.length > 2 && (
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-custom-primary/50 text-custom-primary hover:bg-custom-primary hover:text-white'
                    : 'border-white/20 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-sm text-white/60">
                {filteredBrands.length} brands
              </div>

              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'border-custom-primary/50 text-custom-primary hover:bg-custom-primary hover:text-white'
                    : 'border-white/20 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Brand Grid/Slider */}
          <motion.div
            className={`relative ${
              isMobile
                ? 'overflow-hidden'
                : 'flex flex-row justify-center gap-4 justify-items-center flex-wrap md:max-w-[50vw] mx-auto'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
          >
            <div
              ref={scrollContainerRef}
              className={`${
                isMobile
                  ? 'flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4'
                  : 'contents'
              }`}
              style={
                isMobile
                  ? {
                      scrollSnapType: 'x mandatory',
                      scrollBehavior: 'smooth',
                    }
                  : {}
              }
            >
              <AnimatePresence mode="wait">
                {filteredBrands.map((brand, index) => (
                  <div
                    key={`${selectedCategory}-${brand.id}`}
                    className={`${
                      isMobile
                        ? 'flex-shrink-0 w-48'
                        : 'flex-1 min-w-[200px] max-w-[250px]'
                    }`}
                    style={isMobile ? { scrollSnapAlign: 'start' } : {}}
                  >
                    <BrandCard brand={brand} index={index} />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </RadialGradient>
    </section>
  )
}

export default BrandSection
