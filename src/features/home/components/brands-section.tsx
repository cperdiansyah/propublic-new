'use client'
import RadialGradient from '@shared/components/effects/radialGradient'
import BrandCard from '@shared/components/blocks/brand/brand-card'
import SectionTitle from '@shared/components/common/section-title'
import { brands } from '@shared/config/exampleData'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselFlyingControls,
} from '@/shared/components/ui/carousel'

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
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const filteredBrands =
    selectedCategory === 'all'
      ? brands
      : brands.filter((brand) => brand.category === selectedCategory)

  // Handle category change with proper animation reset
  const handleCategoryChange = (category: string) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category)
      setIsInitialLoad(false)
    }
  }

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="bg-black text-white px-4 min-h-screen md:min-h-[200px] 2xl:min-h-fit">
      <RadialGradient
        x={70}
        y={50}
        primaryOpacity={0.2}
        className="py-16 relative"
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
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 border-radius-propublic font-semibold text-sm transition-all duration-300 font-teko backdrop-blur-sm border ${
                  selectedCategory === category.id
                    ? 'bg-custom-primary text-white border-custom-primary shadow-lg shadow-custom-primary/25'
                    : 'bg-white/5 text-white hover:bg-white/10 border-white/20 hover:border-custom-primary/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay:
                    0.1 * categories.findIndex((cat) => cat.id === category.id),
                }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Brand Grid/Slider */}
          {isMobile ? (
            <Carousel
              opts={{
                align: 'start',
                loop: false,
                slidesToScroll: 'auto',
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                <AnimatePresence mode="wait">
                  {filteredBrands.map((brand, index) => (
                    <CarouselItem
                      key={`${selectedCategory}-${brand.id}`}
                      className="pl-2 md:pl-4 basis-48"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.5,
                          type: 'spring',
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <BrandCard brand={brand} index={index} />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </AnimatePresence>
              </CarouselContent>
              <CarouselFlyingControls />
            </Carousel>
          ) : (
            <motion.div
              className="flex flex-row justify-center gap-4 justify-items-center flex-wrap lg:max-w-[50vw] mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={`${selectedCategory}-${isInitialLoad}`}
            >
              <AnimatePresence mode="wait">
                {filteredBrands.map((brand, index) => (
                  <motion.div
                    key={`${selectedCategory}-${brand.id}`}
                    className="flex-1 min-w-[200px] max-w-[250px]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    <BrandCard brand={brand} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </RadialGradient>
    </section>
  )
}

export default BrandSection
