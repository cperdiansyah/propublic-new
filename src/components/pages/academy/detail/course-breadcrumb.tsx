import type { ICourseItem } from '@/types/home.types'
import { BookOpen, Home, Lightbulb } from 'lucide-react'
import type React from 'react'

interface CourseBreadcrumbProps {
  course: ICourseItem
}
const CourseBreadcrumb: React.FC<CourseBreadcrumbProps> = ({ course }) => {
  return (
    <nav
      className="breadcrumb-container inline-flex items-center text-sm bg-gradient-to-r from-dark-secondary/80 to-dark-primary/80 border border-custom-primary/20 backdrop-blur-[10px] rounded-full px-6 py-3 mb-8 shadow-lg w-full"
      aria-label="Breadcrumb"
    >
      <BreadcrumbItem
        href="/"
        icon={<Home className="h-full w-full" />}
        label="Home"
      />
      <span className="breadcrumb-separator text-cream/40 text-xs mx-3">▶</span>
      <BreadcrumbItem
        href="/academy"
        icon={<BookOpen className="h-full w-full" />}
        label="Academy"
      />
      <span className="breadcrumb-separator text-cream/40 text-xs mx-3">▶</span>
      <BreadcrumbItem
        icon={<Lightbulb className="h-full w-full" />}
        label={course.course_title}
        isActive
      />
    </nav>
  )
}

// Reusable breadcrumb item component
interface BreadcrumbItemProps {
  href?: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

const BreadcrumbItem = ({
  href,
  icon,
  label,
  isActive = false,
}: BreadcrumbItemProps) => {
  const content = (
    <div className="breadcrumb-item flex items-center gap-2 transition-all duration-300 hover:text-custom-primary hover:-translate-y-[1px]">
      <span className="breadcrumb-icon w-4 h-4 opacity-70">{icon}</span>
      <span className={isActive ? 'breadcrumb-current' : ''}>{label}</span>
    </div>
  )

  if (href && !isActive) {
    return (
      <a href={href} className="hover:text-custom-accent transition-colors">
        {content}
      </a>
    )
  }

  return content
}

export default CourseBreadcrumb
