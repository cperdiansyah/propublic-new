// src/app/(app)/academy/[slug]/page.tsx
import AcademyDetailContent from '@/components/pages/academy/detail'
import { COURSES } from '@/config/exampleData'
import { notFound } from 'next/navigation'

// export async function generateStaticParams() {
//   return COURSES.map((course) => ({
//     slug: course.course_slug,
//   }))
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string }
// }) {
//   const course = COURSES.find((c) => c.course_slug === params.slug)

//   if (!course) {
//     return {
//       title: 'Course Not Found',
//     }
//   }

//   return {
//     title: `${course.course_title} - ProPublic Academy`,
//     description: course.course_description
//       ?.replace(/<[^>]*>/g, '')
//       .slice(0, 160),
//   }
// }

export default function AcademyDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const course = COURSES.find((c) => c.course_slug === params.slug)

  if (!course) {
    notFound()
  }

  return <AcademyDetailContent course={course} />
}
