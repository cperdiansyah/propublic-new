import CourseBreadcrumb from '@/components/pages/academy/detail/course-breadcrumb'
import type { ICourseItem } from '@/types/home.types'
import renderStars from '@/utils/renderStars'
import { Award, PlayCircle, Users } from 'lucide-react'

interface CourseHeroProps {
  course: ICourseItem
  onBookCourse: () => void
}

export default function CourseHero({ course, onBookCourse }: CourseHeroProps) {
  const rating = Number(course.course_rating) || 4.5
  const students = Number(course.order_count) || 0

  return (
    <div className="relative  bg-black hero-enhanced">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-600/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-red-700/6 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10">
        <div className="relative min-h-[60vh] flex items-center">
          {/* Background Image with Enhanced Overlay */}
          <div className="absolute inset-0">
            <img
              src={course.course_image_url}
              alt={course.course_title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 hero-content">
            <div className="max-w-3xl">
              {/* Enhanced Breadcrumb */}
              <CourseBreadcrumb course={course} />
              {/* Title with Gradient */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase gradient-text">
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

                <div className="flex items-center gap-2 text-custom-accent">
                  <Users className="w-5 h-5" />
                  <span>Live Sessions Available</span>
                </div>

                <div className="flex items-center gap-2 text-custom-accent">
                  <Award className="w-5 h-5" />
                  <span>Certificate Included</span>
                </div>
              </div>
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onBookCourse}
                  className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,0,56,0.3)] glow propublic-button"
                  aria-label="Book this course now"
                >
                  <span className="font-teko text-xl">BOOK NOW</span>
                </button>

                <button
                  className="border border-cream/30 text-cream px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-cream/10 flex items-center gap-2"
                  aria-label="Preview course content"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span className="font-teko text-xl">PREVIEW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
