// src/pages/Academy/index.tsx
'use client'

import { useState, useMemo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Search,
  Trophy,
  Target,
  GraduationCap,
  Rocket,
  Clock,
} from 'lucide-react'

// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// Existing components
import AcademyCard from '@/components/blocks/academy/academy-card'
import { COURSES } from '@/config/exampleData'
import type { ICourseItem } from '@/types/home.types'
import type { AcademyBenefit, CategoryFilter } from '@/types/academy.types'
import { searchSchema, type SearchForm } from '@/schema/academy'
import {
  useAcademyFilters,
  useFilteredCourses,
} from '@/components/pages/academy/hooks'

// Constants
const ACADEMY_BENEFITS: AcademyBenefit[] = [
  {
    id: 1,
    icon: Trophy,
    title: "LEARN FROM THE LEGENDS, GIVE STUDENTS THE CHAMPION'S EDGE.",
    description:
      'Train with world-class coaches and professional players who have competed at the highest levels.',
    gradient: 'from-red-500 to-red-600',
  },
  {
    id: 2,
    icon: Target,
    title: 'SHARPEN SPECIFIC SKILLS WITH THE PERFECT COURSE.',
    description:
      'Focused curriculum designed to improve specific aspects of your gameplay with precision.',
    gradient: 'from-red-600 to-red-700',
  },
  {
    id: 3,
    icon: GraduationCap,
    title: 'FLEXIBLE LEARNING LETS STUDENTS TRAIN ANYTIME, ANYWHERE.',
    description:
      'Access premium content on your schedule with our flexible online learning platform.',
    gradient: 'from-red-500 to-red-600',
  },
  {
    id: 4,
    icon: Rocket,
    title: 'BOOST YOUR ACADEMY WITH GAME-CHANGING MASTERCLASS CONTENT.',
    description:
      'Exclusive masterclasses from top-tier players sharing their secrets and strategies.',
    gradient: 'from-red-600 to-red-700',
  },
  {
    id: 5,
    icon: Clock,
    title: 'SEE FASTER RESULTS TOWARDS YOUR GAMING GOALS.',
    description:
      'Accelerated learning paths designed to get you climbing ranks and improving faster.',
    gradient: 'from-red-500 to-red-600',
  },
]

// Main Component
export default function AcademyContent() {
  const { activeCategory, categories, setCategory } = useAcademyFilters()

  const searchForm = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: '',
    },
  })

  const searchTerm = searchForm.watch('searchTerm')
  const filteredCourses = useFilteredCourses(
    COURSES,
    searchTerm,
    activeCategory,
  )

  const handleCategoryChange = useCallback(
    (category: string) => {
      setCategory(category)
    },
    [setCategory],
  )

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <AcademyHeader />
        <BenefitsSection benefits={ACADEMY_BENEFITS} />
        <AcademyCoursesSection
          courses={filteredCourses}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchForm={searchForm}
        />
      </div>
    </div>
  )
}

// Header Component
function AcademyHeader() {
  return (
    <header className="text-center mb-16">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          GET PROFESSIONAL & QUALITY
          <br />
          <span className="gradient-text">ACADEMY FOR YOUR GAMING CAREER</span>
        </h1>
        <p className="text-xl text-cream/70 max-w-3xl mx-auto leading-relaxed">
          Master your favorite games with expert-crafted courses from
          professional players and world-class coaches.
        </p>
      </div>
    </header>
  )
}

// Benefits Section Component
interface BenefitsSectionProps {
  benefits: AcademyBenefit[]
}

function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          WHY GET THESE ACADEMY?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </section>
  )
}

// Benefit Card Component
interface BenefitCardProps {
  benefit: AcademyBenefit
}

function BenefitCard({ benefit }: BenefitCardProps) {
  const IconComponent = benefit.icon

  return (
    <Card className="group relative bg-dark-secondary/50 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden">
      <CardContent className="p-6 text-center space-y-4">
        {/* Icon */}
        <div
          className={`w-16 h-16 mx-auto bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm leading-tight uppercase tracking-wide">
            {benefit.title}
          </h3>
          <p className="text-cream/70 text-xs leading-relaxed">
            {benefit.description}
          </p>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  )
}

// Academy Courses Section Component
interface AcademyCoursesSectionProps {
  courses: ICourseItem[]
  categories: CategoryFilter[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  searchForm: any
}

function AcademyCoursesSection({
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
    <section>
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
      <div className="bg-dark-secondary/30 rounded-3xl p-6 mb-12 space-y-6">
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
