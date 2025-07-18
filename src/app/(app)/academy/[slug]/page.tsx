import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import AcademyDetailContent from '@/components/pages/academy/detail'
import { COURSES } from '@/config/exampleData'
import { findCourseBySlug, sanitizeDescription } from '@/lib/utils'

interface Params {
  slug: string
}

interface PageProps {
  params: Promise<Params>
}

export async function generateStaticParams(): Promise<Array<Params>> {
  return COURSES.map((course) => ({
    slug: course.course_slug,
  }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  try {
    const { slug } = await props.params
    const course = findCourseBySlug(slug)

    if (!course) {
      return {
        title: 'Course Not Found',
        description: 'The requested course could not be found.',
      }
    }

    return {
      title: `${course.course_title} - ProPublic Academy`,
      description: sanitizeDescription(course.course_description || ''),
      openGraph: {
        title: course.course_title,
        description: sanitizeDescription(course.course_description || ''),
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error Loading Course',
      description: 'An error occurred while loading the course.',
    }
  }
}

export default async function AcademyDetailPage(props: PageProps) {
  try {
    const { slug } = await props.params
    const course = findCourseBySlug(slug)

    if (!course) {
      notFound()
    }

    return <AcademyDetailContent course={course} />
  } catch (error) {
    console.error('Error loading academy page:', error)
    notFound()
  }
}
