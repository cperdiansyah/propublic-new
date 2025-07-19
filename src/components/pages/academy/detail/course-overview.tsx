import type { ICourseItem } from '@/types/home.types'
import { Target, Clock, BarChart, Globe, AlertCircle } from 'lucide-react'

interface CourseOverviewProps {
  course: ICourseItem
}

// Reusable learning outcome component
interface LearningOutcomeProps {
  text: string
}

const LearningOutcome = ({ text }: LearningOutcomeProps) => (
  <div className="flex items-start gap-3 p-3 bg-custom-primary/5 rounded-xl transition-all duration-300 hover:bg-custom-primary/10">
    <span className="text-custom-accent mt-1 flex-shrink-0">✓</span>
    <span className="text-cream/90">{text}</span>
  </div>
)

// Reusable disclaimer item component
interface DisclaimerItemProps {
  text: string
}

const DisclaimerItem = ({ text }: DisclaimerItemProps) => (
  <li className="flex items-start gap-2">
    <span className="text-custom-accent mt-1 flex-shrink-0">•</span>
    <span>{text}</span>
  </li>
)

export default function CourseOverview({ course }: CourseOverviewProps) {
  // Extract learning outcomes for better maintainability
  const learningOutcomes = [
    'Advanced game mechanics and strategies',
    'Decision-making under pressure',
    'Professional-level communication',
    'Consistent gameplay habits',
    'Mistake analysis and improvement',
    'Mental resilience and focus',
  ]

  // Extract disclaimer items for reusability
  const disclaimerItems = [
    'Minimum 10 students required for class to commence',
    'Full refund or credit if enrollment quota not met',
    'Schedule subject to change based on availability',
    '5-day advance notice for any schedule changes',
  ]

  return (
    <div className="enhanced-card bg-gradient-to-br from-dark-secondary/90 to-dark-primary/90 border border-custom-primary/20 backdrop-blur-[10px] rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 gradient-text">Course Overview</h2>

      {/* Course Description */}
      <div className="prose prose-invert max-w-none mb-8">
        <div
          className="text-lg leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: course.course_description || '' }}
        />

        {/* Important Disclaimer Box */}
        <div className="bg-custom-primary/10 border border-custom-primary/20 rounded-xl p-4 my-6">
          <h3 className="text-xl font-bold mb-3 text-custom-accent flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Important Disclaimer
          </h3>
          <ul className="space-y-2 text-sm">
            {disclaimerItems.map((item, index) => (
              <DisclaimerItem key={index} text={item} />
            ))}
          </ul>
        </div>
      </div>

      {/* What You'll Master Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 gradient-text">
          <Target className="w-6 h-6 text-custom-accent" />
          What You'll Master
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {learningOutcomes.map((outcome, index) => (
            <LearningOutcome key={index} text={outcome} />
          ))}
        </div>
      </div>
    </div>
  )
}
