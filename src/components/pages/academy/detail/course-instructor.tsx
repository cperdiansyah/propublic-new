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
    <div className="enhanced-card border-radius-propublic p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
        Your Instructor
      </h2>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Instructor Avatar & Basic Info */}
        <div className="flex-shrink-0 text-center md:text-left">
          <img
            src={mockInstructor.avatar}
            alt={mockInstructor.name}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mx-auto md:mx-0 mb-3 sm:mb-4 border-2 sm:border-4 border-custom-primary"
          />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
            {mockInstructor.name}
          </h3>
          <p className="text-sm sm:text-base text-custom-accent font-semibold">
            {mockInstructor.title}
          </p>

          {/* Stats */}
          <div className="flex gap-2 sm:gap-4 mt-3 sm:mt-4 justify-center md:justify-start">
            <div className="text-center flex-1 sm:flex-none">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-custom-accent mx-auto mb-1" />
              <div className="text-sm sm:text-base font-bold">500+</div>
              <div className="text-cream/60 text-xs sm:text-xs">Students</div>
            </div>
            <div className="text-center flex-1 sm:flex-none">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-custom-accent mx-auto mb-1" />
              <div className="text-sm sm:text-base font-bold">4.9</div>
              <div className="text-cream/60 text-xs sm:text-xs">Rating</div>
            </div>
            <div className="text-center flex-1 sm:flex-none">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-custom-accent mx-auto mb-1" />
              <div className="text-sm sm:text-base font-bold">2x</div>
              <div className="text-cream/60 text-xs sm:text-xs">Champion</div>
            </div>
          </div>
        </div>

        {/* Instructor Details */}
        <div className="flex-1">
          <p className="text-sm sm:text-base text-cream/80 mb-4 sm:mb-6 leading-relaxed">
            {mockInstructor.bio}
          </p>

          <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-custom-accent" />
            Achievements & Credentials
          </h4>
          <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
            {mockInstructor.achievements.map((achievement, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm sm:text-base">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
