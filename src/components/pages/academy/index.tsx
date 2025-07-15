'use client'

import CategoryFilters from '@/components/pages/academy/category-filters'
import CourseGrid from '@/components/pages/academy/course-grid'
import FeaturedCourse from '@/components/pages/academy/featured-course'
import { useState } from 'react'

export default function AcademyContent() {
  const [activeCategory, setActiveCategory] = useState('All Courses')

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Academy Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Propublic <span className="gradient-text">Academy</span>
          </h1>
          <p className="text-xl text-cream/70 max-w-3xl mx-auto">
            Master your favorite games with expert-crafted courses. From
            beginner fundamentals to pro-level strategies, we've got you
            covered.
          </p>
        </div>

        {/* Course Categories */}
        <CategoryFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Featured Course */}
        <FeaturedCourse />

        {/* Course Grid */}
        <CourseGrid />

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button
            className="border border-custom-accent hover:bg-custom-accent hover:text-dark-primary text-custom-accent px-8 py-4 rounded-xl font-semibold transition-all"
            type="button"
          >
            Load More Courses
          </button>
        </div>
      </div>
    </div>
  )
}
