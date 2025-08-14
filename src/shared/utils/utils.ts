import { COURSES, GAMELIST } from '@shared/config/exampleData'
import type { CarouselGameItem, ICourseItem } from '@shared/types/home.types'
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

// Utility function for game lookup (DRY principle)
export const findGameBySlug = (slug: string): CarouselGameItem | undefined => {
  return GAMELIST.find((game) => game.slug === slug)
}

// Utility function for game description generation
export const sanitizeGameDescription = (gameName: string): string => {
  return `Master ${gameName} with ProPublic's expert coaching and gaming community. Find pro coaches, join tournaments, and level up your skills.`
}
