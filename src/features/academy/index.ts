// Academy feature public API
// Export only what other features need

// Main component (for page routing)
export { default } from './components/index'

// Components
export { default as AcademyCoursesSection } from './components/academy-courses-section'
export { default as BenefitSection } from './components/benefit-section'
export { default as CategoryFilters } from './components/category-filters'
export { default as CourseGrid } from './components/course-grid'

// Re-export detail components as named exports
export * from './components/detail'

// Hooks
export * from './components/hooks'

// Types
export * from '@shared/types/academy.types'
export * from '@shared/types/academy-detail.types'
