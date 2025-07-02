'use client'

import CategoryFilters from '@/components/shop/category-filters'
import FeaturedProduct from '@/components/shop/featured-product'
import PartnerNotice from '@/components/shop/partner-notice'
import ProductGrid from '@/components/shop/product-grid'
import { useState } from 'react'

export default function ShopContent() {
  const [activeCategory, setActiveCategory] = useState('All Products')

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Shop Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            ProPublic <span className="gradient-text">Shop</span>
          </h1>
          <p className="text-lg md:text-xl text-cream/70 max-w-3xl mx-auto">
            Get premium gaming merchandise and gear. All items are available
            through our trusted retail partners with worldwide shipping.
          </p>
        </div>

        {/* Categories */}
        <CategoryFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Featured Product */}
        <FeaturedProduct />

        {/* Product Grid */}
        <ProductGrid />

        {/* Partner Notice */}
        <PartnerNotice />
      </div>
    </div>
  )
}
