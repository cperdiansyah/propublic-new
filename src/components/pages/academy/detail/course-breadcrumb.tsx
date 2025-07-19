import type { ICourseItem } from '@/types/home.types'
import { BookOpen, Home, Lightbulb } from 'lucide-react'
import type React from 'react'
import {
  Breadcrumb,
  type BreadcrumbItemData,
} from '@/components/common/breadcrumb'

interface CourseBreadcrumbProps {
  course: ICourseItem
}

const CourseBreadcrumb: React.FC<CourseBreadcrumbProps> = ({ course }) => {
  const breadcrumbItems: BreadcrumbItemData[] = [
    {
      href: '/',
      icon: <Home className="h-full w-full" />,
      label: 'Home',
    },
    {
      href: '/academy',
      icon: <BookOpen className="h-full w-full" />,
      label: 'Academy',
    },
    {
      icon: <Lightbulb className="h-full w-full" />,
      label: course.course_title,
      isActive: true,
    },
  ]

  return <Breadcrumb items={breadcrumbItems} />
}

export default CourseBreadcrumb
