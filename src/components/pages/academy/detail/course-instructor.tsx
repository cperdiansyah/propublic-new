// src/components/pages/academy-detail/course-instructor.tsx
import type { ICourseItem } from '@/types/home.types'
import type { CourseInstructor as InstructorType } from '@/types/academy-detail.types'
import { Trophy, Award, Star, Users } from 'lucide-react'

interface CourseInstructorProps {
  course: ICourseItem
}

// Mock instructor data
const mockInstructor: InstructorType = {
  id: '1',
  name: 'Zeys',
  title: 'World Champion & Head Coach',
  avatar: 'https://avatar.iran.liara.run/public/42',
  bio: 'Former professional player with 10+ years of competitive experience. World champion, former national team head coach, and mentor to hundreds of successful players.',
  achievements: [
    '🏆 2x World Champion',
    '🥇 National Team Head Coach',
    '📚 500+ Students Coached',
    '⭐ 4.9/5 Average Rating',
    '🎮 10+ Years Pro Experience',
  ],
}

export default function CourseInstructor({ course }: CourseInstructorProps) {
  return (
    <div className="enhanced-card border-radius-propublic p-8">
      <h2 className="text-3xl font-bold mb-6">Your Instructor</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Instructor Avatar & Basic Info */}
        <div className="flex-shrink-0 text-center md:text-left">
          <img
            src={mockInstructor.avatar}
            alt={mockInstructor.name}
            className="w-32 h-32 rounded-full mx-auto md:mx-0 mb-4 border-4 border-custom-primary"
          />
          <h3 className="text-2xl font-bold">{mockInstructor.name}</h3>
          <p className="text-custom-accent font-semibold">
            {mockInstructor.title}
          </p>

          {/* Stats */}
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <div className="text-center">
              <Users className="w-5 h-5 text-custom-accent mx-auto mb-1" />
              <div className="font-bold">500+</div>
              <div className="text-cream/60 text-xs">Students</div>
            </div>
            <div className="text-center">
              <Star className="w-5 h-5 text-custom-accent mx-auto mb-1" />
              <div className="font-bold">4.9</div>
              <div className="text-cream/60 text-xs">Rating</div>
            </div>
            <div className="text-center">
              <Trophy className="w-5 h-5 text-custom-accent mx-auto mb-1" />
              <div className="font-bold">2x</div>
              <div className="text-cream/60 text-xs">Champion</div>
            </div>
          </div>
        </div>

        {/* Instructor Details */}
        <div className="flex-1">
          <p className="text-cream/80 mb-6 leading-relaxed">
            {mockInstructor.bio}
          </p>

          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-custom-accent" />
            Achievements & Credentials
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {mockInstructor.achievements.map((achievement, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-lg">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
