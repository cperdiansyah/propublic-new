'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, GraduationCap, Rocket, Target, Trophy } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

// Existing components
import AcademyBackgroundEffects from '@shared/components/effects/academy-bacground'
import { AcademyCoursesSection } from '../components/academy-courses-section'
import { BenefitsSection } from '../components/benefit-section'
import { useAcademyFilters, useFilteredCourses } from '../hooks'
import { COURSES } from '@shared/config/exampleData'
import { searchSchema, type SearchForm } from '@shared/academy'
import type { AcademyBenefit } from '@shared/types/academy.types'

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
    title: 'SHARPEN SPECIFIC SKILLS WITH THE PERFECT ACADEMY.',
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
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Dynamic Background Effects */}
      <AcademyBackgroundEffects />

      <div className="relative z-10 pt-28 pb-20 px-4">
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
    </div>
  )
}

// Header Component
function AcademyHeader() {
  return (
    <header className="text-center mb-16">
      <div className="space-y-6">
        <h1 className="text-xl md:text-5xl font-bold text-white leading-tight">
          GET PROFESSIONAL & QUALITY
          <br />
          <span className="gradient-text">ACADEMY FOR YOUR GAMING CAREER</span>
        </h1>
      </div>
    </header>
  )
}
