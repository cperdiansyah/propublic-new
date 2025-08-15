'use client'

import { useCallback, useMemo, useState } from 'react'
import { z } from 'zod'

// Existing components
import { COURSES } from '@shared/config/exampleData'
import type { ICourseItem } from '@shared/types/home.types'
import type { CategoryFilter } from '@shared/types/academy.types'

// Custom Hooks
export const useAcademyFilters = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Courses')

  const categories: CategoryFilter[] = useMemo(() => {
    const allCourses = COURSES.length
    return [
      { id: 'All Courses', label: 'All', count: allCourses },
      {
        id: 'Beginner',
        label: 'Beginner',
        count: Math.floor(allCourses * 0.3),
      },
      {
        id: 'Intermediate',
        label: 'Intermediate',
        count: Math.floor(allCourses * 0.4),
      },
      {
        id: 'Advanced',
        label: 'Advanced',
        count: Math.floor(allCourses * 0.2),
      },
      {
        id: 'Pro Level',
        label: 'Pro Level',
        count: Math.floor(allCourses * 0.1),
      },
    ]
  }, [])

  const setCategory = useCallback((category: string) => {
    const result = z.string().min(1).safeParse(category)
    if (result.success) {
      setActiveCategory(category)
    }
  }, [])

  return {
    activeCategory,
    categories,
    setCategory,
  }
}

export const useFilteredCourses = (
  courses: ICourseItem[],
  searchTerm: string,
  activeCategory: string,
) => {
  return useMemo(() => {
    let filtered = [...courses]

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.course_title.toLowerCase().includes(searchLower) ||
          course.course_description?.toLowerCase().includes(searchLower),
      )
    }

    // Filter by category (mock implementation)
    if (activeCategory !== 'All Courses') {
      // In a real app, you'd have category data in your course objects
      // For now, we'll just return all courses for demonstration
      filtered = filtered.filter((_, index) => {
        switch (activeCategory) {
          case 'Beginner':
            return index % 4 === 0
          case 'Intermediate':
            return index % 4 === 1 || index % 4 === 2
          case 'Advanced':
            return index % 4 === 3
          case 'Pro Level':
            return index % 5 === 0
          default:
            return true
        }
      })
    }

    return filtered
  }, [courses, searchTerm, activeCategory])
}
