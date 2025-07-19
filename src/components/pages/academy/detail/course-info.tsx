import { BarChart, Clock, Globe } from 'lucide-react'
import type React from 'react'

interface CourseInfoItem {
  icon: React.ReactNode
  value: string
  label: string
}

interface CourseInfoProps {
  courseData?: {
    duration: string
    level: string
    language: string
    access: string
  }
}

const CourseInfo: React.FC<CourseInfoProps> = ({
  courseData = {
    duration: '24 Hours',
    level: 'All Levels',
    language: 'English',
    access: 'Lifetime',
  },
}) => {
  const courseInfoItems: (CourseInfoItem & { id: string })[] = [
    {
      id: 'duration',
      icon: <Clock className="w-8 h-8 text-custom-accent mx-auto mb-2" />,
      value: courseData.duration,
      label: 'Total Content',
    },
    {
      id: 'level',
      icon: <BarChart className="w-8 h-8 text-custom-accent mx-auto mb-2" />,
      value: courseData.level,
      label: 'Skill Level',
    },
    {
      id: 'language',
      icon: <Globe className="w-8 h-8 text-custom-accent mx-auto mb-2" />,
      value: courseData.language,
      label: 'Language',
    },
    {
      id: 'access',
      icon: (
        <div className="w-8 h-8 text-custom-accent mx-auto mb-2 text-2xl">
          ∞
        </div>
      ),
      value: courseData.access,
      label: 'Access',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-cream/10">
      {courseInfoItems.map((stat, index) => (
        <CourseStat key={index} {...stat} />
      ))}
    </div>
  )
}

interface CourseStatProps {
  icon: React.ReactNode
  value: string
  label: string
}
const CourseStat = ({ icon, value, label }: CourseStatProps) => (
  <div className="course-stat-item bg-gradient-to-br from-custom-primary/10 to-dark-secondary/30 border border-custom-primary/20 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-custom-primary/20 hover:border-custom-primary">
    <div className="course-stat-icon w-8 h-8 mx-auto mb-2 text-custom-accent">
      {icon}
    </div>
    <div className="font-bold text-lg">{value}</div>
    <div className="text-cream/60 text-sm">{label}</div>
  </div>
)

export default CourseInfo
