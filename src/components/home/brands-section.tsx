'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '@/components/common/section-title'
import GradientBackground from '@/components/common/background/GradientBackground'
import RadialGradient from '@/components/common/background/radialGradient'

const brands: Brand[] = [
  {
    id: Math.random(),
    logo: 'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/partner/Bebek+Carok_Long.png',
    name: 'BEBEK CAROK',
    category: 'food',
  },
  {
    id: Math.random(),
    logo: 'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/partner/ESL+FACEIT_White.png',
    name: 'ESL FACEIT',
    category: 'esports',
  },
  {
    id: Math.random(),
    logo: 'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/partner/Sekuya.png',
    name: 'SEKUYA',
    category: 'services',
  },
  {
    id: Math.random(),
    logo: 'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/partner/T1_Red.png',
    name: 'T1',
    category: 'esports',
  },
  {
    id: Math.random(),
    logo: 'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/partner/Team+Falcon.png',
    name: 'TEAM FALCONS',
    category: 'esports',
  },
  {
    id: Math.random(),
    logo: 'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/partner/Team+Flash.png',
    name: 'TEAM FLASH',
    category: 'esports',
  },
  {
    id: Math.random(),
    logo: 'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/partner/Top+Up+No+Limit.png',
    name: 'TOPUP NO LIMIT',
    category: 'services',
  },
  {
    id: Math.random(),
    logo: 'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/partner/W3GG.png',
    name: 'W3GG',
    category: 'services',
  },
]

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'food', label: 'FOOD' },
  { id: 'esports', label: 'ESPORTS' },
  { id: 'services', label: 'SERVICES' },
]

// Simplified animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

const BrandSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredBrands =
    selectedCategory === 'all'
      ? brands
      : brands.filter((brand) => brand.category === selectedCategory)

  return (
    <section className="bg-black text-white px-4 ">
      <RadialGradient
        x={70}
        y={40}
        primaryOpacity={0.2}
        className=" py-16 min-h-screen relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <SectionTitle
            title={
              <>
                <span className="section-title-underline">BRANDS</span> WE'VE
                WORKED WITH
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
                className={`px-6 py-3 border-radius-propublic font-semibold text-sm transition-all duration-300 font-teko ${
                  selectedCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-gray-700/50 text-white hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          {/* Brand Grid */}
          <motion.div
            className="flex flex-row justify-center gap-4 justify-items-center flex-wrap md:max-w-[50vw] mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
          >
            <AnimatePresence mode="wait">
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={`${selectedCategory}-${brand.id}`}
                  className="bg-gray-500/50 border border-gray-400 rounded backdrop-blur-sm p-6 flex flex-col items-center  md:min-h-[200px] hover:bg-gray-800 transition-colors duration-300 group justify-between"
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit="exit"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.1,
                    ease: 'easeIn',
                  }}
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 h-[130px] justify-center items-center flex">
                    <Image
                      src={brand.logo || '/placeholder.svg'}
                      alt={brand.name}
                      width={100}
                      height={180}
                      className="object-contain"
                      blurDataURL={brand.logo || '/images/placeholder.png'}
                    />
                  </div>
                  <h3 className="text-center font-bold text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {brand.name}
                  </h3>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </RadialGradient>
    </section>
  )
}

export default BrandSection
