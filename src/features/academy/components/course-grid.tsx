import AcademyCard from '@shared/components/blocks/academy/academy-card'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { ICourseItem } from '@shared/types/home.types'

// Courses Grid Component
interface CoursesGridProps {
  courses: ICourseItem[]
}

export default function CoursesGrid({ courses }: CoursesGridProps) {
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
          slug={course.course_slug}
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
