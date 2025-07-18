// src/components/pages/academy-detail/course-hero.tsx
import type { ICourseItem } from '@/types/home.types'
import { Star, Users, PlayCircle, Award } from 'lucide-react'
import renderStars from '@/utils/renderStars'

interface CourseHeroProps {
  course: ICourseItem
  onBookCourse: () => void
}

export default function CourseHero({ course, onBookCourse }: CourseHeroProps) {
  const rating = Number(course.course_rating) || 4.5
  const students = Number(course.order_count) || 0

  return (
    <div className="relative min-h-[60vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={course.course_image_url}
          alt={course.course_title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-cream/60 mb-6">
            <a href="/" className="hover:text-cream transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/academy" className="hover:text-cream transition-colors">
              Academy
            </a>
            <span>/</span>
            <span className="text-cream">{course.course_title}</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase">
            {course.course_title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(rating)}
              </div>
              <span className="text-lg font-semibold">{rating}</span>
              <span className="text-cream/60">({students} students)</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-custom-accent" />
              <span>Live Sessions Available</span>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-custom-accent" />
              <span>Certificate Included</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onBookCourse}
              className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-8 py-4 border-radius-propublic font-bold text-lg hover:shadow-lg transition-all glow propublic-button"
            >
              <span className="font-teko text-xl">BOOK NOW</span>
            </button>

            <button className="border border-cream/30 text-cream px-8 py-4 border-radius-propublic font-bold text-lg hover:bg-cream/10 transition-all flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              <span className="font-teko text-xl">PREVIEW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
