import AcademyCard from '@/components/blocks/academy/academy-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { CategoryFilter } from '@/types/academy.types'
import type { ICourseItem } from '@/types/home.types'
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent rounded-3xl blur-2xl -z-10" />

      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
          <span className="mr-3">🎓</span>
          ACADEMY
          <Badge variant="secondary" className="ml-3">
            {courses.length} courses
          </Badge>
        </h2>
      </div>

      {/* Search and Filters */}
      <div className="bg-dark-secondary/30 backdrop-blur-sm rounded-3xl p-6 mb-12 space-y-6 border border-red-500/10">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cream/40" />
          <Input
            {...register('searchTerm')}
            placeholder="Search courses..."
            className="pl-10 bg-dark-secondary/50 border-red-500/20 text-cream placeholder-cream/40 focus:border-red-500"
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
            className="border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white"
          >
            Load More Courses
          </Button>
        </div>
      )}
    </section>
  )
}

// Category Filters Component
interface CategoryFiltersProps {
  categories: CategoryFilter[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

function CategoryFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`
            ${
              activeCategory === category.id
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'border-red-500/30 text-cream/80 hover:border-red-500 hover:bg-red-500/10'
            }
            transition-all duration-200
          `}
        >
          {category.label}
          <Badge variant="secondary" className="ml-2">
            {category.count}
          </Badge>
        </Button>
      ))}
    </div>
  )
}

// Courses Grid Component
interface CoursesGridProps {
  courses: ICourseItem[]
}

function CoursesGrid({ courses }: CoursesGridProps) {
  if (courses.length === 0) {
    return <EmptyCoursesState />
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <AcademyCard
          key={course.course_id}
          id={course.course_id}
          name={course.course_title}
          rating={Number(course.course_rating) || 4.5}
          image={course.course_image_url}
          price={Number(course.course_price)}
          description={course.course_description}
        />
      ))}
    </div>
  )
}

// Empty Courses State Component
function EmptyCoursesState() {
  return (
    <Card className="border-dashed border-2 border-gray-600">
      <CardContent className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-2">No Courses Found</h3>
        <p className="text-cream/70 mb-6">
          Try adjusting your search or filter criteria
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
