import { COURSES } from '@/config/exampleData'
import type { ICourseItem } from '@/types/home.types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function for course lookup (DRY principle)
export const findCourseBySlug = (slug: string): ICourseItem | undefined => {
  return COURSES.find((course) => course.course_slug === slug)
}

// Utility function for metadata description cleanup
export const sanitizeDescription = (description?: string): string => {
  if (!description) return ''
  return description.replace(/<[^>]*>/g, '').slice(0, 160)
}
