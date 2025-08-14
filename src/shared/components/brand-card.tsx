import OptimizedImageWithFallback from '@shared/components/common/optimized-image-with-fallback'
import type { Brand } from '@shared/types/home.types'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface BrandCardProps {
  brand: Brand
  index: number
}

const BrandCard = ({ brand, index }: BrandCardProps) => {
  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-custom-primary/50 rounded-lg p-6 flex flex-col items-center hover:bg-white/10 transition-all duration-300 cursor-pointer border-radius-propublic h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
        ease: 'easeIn',
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-custom-primary/0 via-custom-primary/5 to-custom-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-radius-propublic" />

      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-secondary/30 to-dark-primary/30 backdrop-blur-sm border-radius-propublic opacity-0 group-hover:opacity-100 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
        {/* Logo container */}
        <div className="mb-4 group-hover:scale-110 transition-transform duration-300 h-[130px] w-full flex justify-center items-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <OptimizedImageWithFallback
              src={brand.logo}
              alt={brand.name}
              fallback="/images/placeholder.png"
              width={120}
              height={80}
              className="object-contain filter group-hover:brightness-110 transition-all duration-300"
              blurDataURL={brand.logo}
              placeholder="blur"
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h3 className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:scale-105 transform">
            {brand.name}
          </h3>
        </div>

        {/* Hover indicator */}
        {/* <div className="absolute top-2 right-2 w-2 h-2 bg-custom-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
      </div>

      {/* Enhanced border effect on hover */}
      <div className="absolute inset-0  border border-transparent group-hover:border-custom-primary/30 transition-all duration-300" />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-custom-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg" />
    </motion.div>
  )
}

export default BrandCard
