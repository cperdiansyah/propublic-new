// src/components/pages/academy-detail/course-overview.tsx
import type { ICourseItem } from '@/types/home.types'
import { Target, Clock, BarChart, Globe } from 'lucide-react'

interface CourseOverviewProps {
  course: ICourseItem
}

export default function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className="enhanced-card border-radius-propublic p-8">
      <h2 className="text-3xl font-bold mb-6">Course Overview</h2>

      {/* Course Description */}
      <div
        className="prose prose-invert max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: course.course_description || '' }}
      />

      {/* What You'll Learn */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-custom-accent" />
          What You'll Learn
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Master advanced game mechanics and strategies',
            'Improve decision-making under pressure',
            'Learn professional-level communication',
            'Develop consistent gameplay habits',
            'Analyze and learn from your mistakes',
            'Build mental resilience and focus',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-custom-accent mt-1">✓</span>
              <span className="text-cream/80">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-cream/10">
        <div className="text-center">
          <Clock className="w-8 h-8 text-custom-accent mx-auto mb-2" />
          <div className="font-bold text-lg">24 Hours</div>
          <div className="text-cream/60 text-sm">Total Content</div>
        </div>
        <div className="text-center">
          <BarChart className="w-8 h-8 text-custom-accent mx-auto mb-2" />
          <div className="font-bold text-lg">All Levels</div>
          <div className="text-cream/60 text-sm">Skill Level</div>
        </div>
        <div className="text-center">
          <Globe className="w-8 h-8 text-custom-accent mx-auto mb-2" />
          <div className="font-bold text-lg">English</div>
          <div className="text-cream/60 text-sm">Language</div>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 text-custom-accent mx-auto mb-2 text-2xl">
            ∞
          </div>
          <div className="font-bold text-lg">Lifetime</div>
          <div className="text-cream/60 text-sm">Access</div>
        </div>
      </div>
    </div>
  )
}
