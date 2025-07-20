'use client'

import { useState } from 'react'
import type { ICourseItem } from '@/types/home.types'
import AcademyBackgroundEffects from '@/components/blocks/background/academy-bacground'
import CourseHero from '@/components/pages/academy/detail/course-hero'
import CourseOverview from '@/components/pages/academy/detail/course-overview'
import CourseModules from '@/components/pages/academy/detail/course-modules'
import CourseInstructor from '@/components/pages/academy/detail/course-instructor'
import CourseReviews from '@/components/pages/academy/detail/course-reviews'
import PaymentModal from '@/components/pages/academy/detail/payment-modal'
import FloatingCTA from '@/components/pages/academy/detail/floating-cta'
import { formatIDRCurrency } from '@/lib/formatCurrency'
import CoruseInfo from '@/components/pages/academy/detail/course-info'

interface AcademyDetailContentProps {
  course: ICourseItem
}

export default function AcademyDetailContent({
  course,
}: AcademyDetailContentProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const handleBookCourse = () => {
    // In real app, check auth status here
    setIsPaymentModalOpen(true)
  }

  return (
    <div className="relative min-h-screen bg-black">
      <AcademyBackgroundEffects />

      <div className="relative z-10 pt-16 sm:pt-20">
        <CourseHero course={course} onBookCourse={handleBookCourse} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
          <CoruseInfo />
          <div className="flex lg:flex-row flex-col gap-6 lg:gap-8 mt-8 sm:mt-12">
            <div className="flex-1 lg:w-2/3 space-y-8 lg:space-y-12">
              <CourseOverview course={course} />
              {/* <CourseModules course={course} /> */}
              <CourseInstructor course={course} />
              {/* <CourseReviews course={course} /> */}
            </div>

            <div className="lg:w-1/3 w-full">
              <div className="md:sticky md:top-24 z-10">
                <CourseCard course={course} onBookCourse={handleBookCourse} />
              </div>
            </div>
          </div>
        </div>
        <FloatingCTA
          price={course.course_price}
          onBookCourse={handleBookCourse}
        />
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          course={course}
        />
      </div>
    </div>
  )
}

// Course Card Component
function CourseCard({
  course,
  onBookCourse,
}: {
  course: ICourseItem
  onBookCourse: () => void
}) {
  return (
    <div className="enhanced-card border-radius-propublic p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="aspect-video rounded-xl overflow-hidden mb-4 sm:mb-6">
        <img
          src={course.course_image_url}
          alt={course.course_title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <div className="text-2xl sm:text-3xl font-bold gradient-text">
          {formatIDRCurrency(Number(course.course_price))}
        </div>

        <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-cream/80">
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Certificate of completion</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Direct mentor support</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Practical exercises</span>
          </div>
        </div>

        <button
          onClick={onBookCourse}
          className="w-full premium-gradient text-white py-3 sm:py-4 border-radius-propublic font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] propublic-button"
        >
          <span className="font-teko text-lg sm:text-xl">
            BOOK THIS ACADEMY
          </span>
        </button>

        <p className="text-center text-xs sm:text-sm text-cream/60">
          30-day money-back guarantee
        </p>
      </div>
    </div>
  )
}
