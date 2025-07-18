import type { ICourseItem } from '@/types/home.types'
import type { CourseReview } from '@/types/academy-detail.types'
import renderStars from '@/utils/renderStars'
import { ThumbsUp, MessageSquare } from 'lucide-react'

interface CourseReviewsProps {
  course: ICourseItem
}

// Mock reviews data
const mockReviews: CourseReview[] = [
  {
    id: '1',
    userName: 'Alex Chen',
    userAvatar: 'https://avatar.iran.liara.run/public/15',
    rating: 5,
    date: '2 weeks ago',
    comment:
      'This course completely transformed my gameplay! The strategies are game-changing and the instructor explains everything so clearly. Worth every penny!',
  },
  {
    id: '2',
    userName: 'Sarah Kim',
    userAvatar: 'https://avatar.iran.liara.run/public/23',
    rating: 5,
    date: '1 month ago',
    comment:
      "Best investment I've made for my gaming career. The 1-on-1 coaching sessions were incredible. Climbed 3 ranks in just 2 weeks!",
  },
  {
    id: '3',
    userName: 'Mike Johnson',
    userAvatar: 'https://avatar.iran.liara.run/public/8',
    rating: 4,
    date: '1 month ago',
    comment:
      "Great content and amazing instructor. The only reason I'm giving 4 stars is I wish there were more practice sessions. Otherwise perfect!",
  },
]

export default function CourseReviews({ course }: CourseReviewsProps) {
  const rating = Number(course.course_rating) || 4.5
  const totalReviews = mockReviews.length

  return (
    <div className="enhanced-card border-radius-propublic p-8">
      <h2 className="text-3xl font-bold mb-6">Student Reviews</h2>

      {/* Rating Summary */}
      <div className="flex items-center gap-8 mb-8 pb-8 border-b border-cream/10">
        <div className="text-center">
          <div className="text-5xl font-bold gradient-text">{rating}</div>
          <div className="flex justify-center my-2">{renderStars(rating)}</div>
          <p className="text-cream/60">Course Rating</p>
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-3">{stars}</span>
                <div className="flex">{renderStars(stars)}</div>
                <div className="flex-1 h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-custom-accent rounded-full"
                    style={{
                      width: stars === 5 ? '70%' : stars === 4 ? '30%' : '0%',
                    }}
                  />
                </div>
                <span className="text-cream/60 text-sm w-10 text-right">
                  {stars === 5 ? '70%' : stars === 4 ? '30%' : '0%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="pb-6 border-b border-cream/10 last:border-0"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold">{review.userName}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-cream/60 text-sm">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-cream/80 leading-relaxed">
                  {review.comment}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-2 text-cream/60 hover:text-cream text-sm transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful
                  </button>
                  <button className="flex items-center gap-2 text-cream/60 hover:text-cream text-sm transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 border border-cream/30 text-cream py-3 border-radius-propublic font-semibold hover:bg-cream/10 transition-all">
        Show More Reviews
      </button>
    </div>
  )
}
