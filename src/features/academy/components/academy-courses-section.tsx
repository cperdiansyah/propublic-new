import CategoryFilters from '@shared/components/pages/academy/category-filters'
import CoursesGrid from '@shared/components/pages/academy/course-grid'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import type { CategoryFilter } from '@shared/types/academy.types'
import type { ICourseItem } from '@shared/types/home.types'
import { Search } from 'lucide-react'

// Academy Courses Section Component
interface AcademyCoursesSectionProps {
  courses: ICourseItem[]
  categories: CategoryFilter[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  searchForm: any
}

export function AcademyCoursesSection({
  courses,
  categories,
  activeCategory,
  onCategoryChange,
  searchForm,
}: AcademyCoursesSectionProps) {
  const {
    register,
    formState: { errors },
  } = searchForm

  return (
    <section className="relative">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent rounded blur-2xl -z-10" />

      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
          <span className="mr-3">🎓</span>
          ACADEMY
        </h2>
      </div>

      {/* Search and Filters */}
      <div className="bg-dark-secondary/30 backdrop-blur-sm rounded-sm p-6 mb-12 space-y-6 border border-red-500/10">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40 " />
          <Input
            {...register('searchTerm')}
            placeholder="Search academies..."
            className="pl-10 bg-dark-secondary/50 border-red-500/20 text-cream placeholder-cream/40 focus:border-red-500 rounded-sm"
          />
          {errors.searchTerm && (
            <p className="text-red-400 text-sm mt-1">
              {errors.searchTerm.message}
            </p>
          )}
        </div>

        {/* Category Filters */}
        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* Courses Grid */}
      <CoursesGrid courses={courses} />

      {/* Load More Button */}
      {courses.length > 0 && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-red-500/50 text-red-500/80 hover:bg-red-500 hover:text-white bg-transparent"
          >
            Load More Academies
          </Button>
        </div>
      )}
    </section>
  )
}
