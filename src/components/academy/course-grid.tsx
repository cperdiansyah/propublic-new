import { Star } from 'lucide-react'

export default function CourseGrid() {
  const courses = [
    {
      title: 'League of Legends: Jungle Mastery',
      description:
        'Master jungle pathing, ganking, and objective control to carry your team to victory.',
      level: 'Intermediate',
      levelColor: 'custom-accent',
      duration: '8.5 hours',
      students: '1,234',
      rating: 4.8,
      price: 59,
      icon: '⚔️',
      gradient: 'from-custom-primary/20 to-custom-secondary/20',
    },
    {
      title: 'Rocket League: Air Dribbling Pro',
      description:
        'Learn advanced air dribbling techniques from SSL players and dominate the aerial game.',
      level: 'Advanced',
      levelColor: 'custom-primary',
      duration: '6 hours',
      students: '890',
      rating: 4.9,
      price: 49,
      icon: '🚗',
      gradient: 'from-custom-secondary/20 to-custom-accent/20',
    },
    {
      title: 'CS2: Complete Beginner Guide',
      description:
        'Start your CS2 journey right with proper fundamentals, aiming, and game sense.',
      level: 'Beginner',
      levelColor: 'green-400',
      duration: '10 hours',
      students: '3,456',
      rating: 4.7,
      price: 39,
      icon: '🎯',
      gradient: 'from-custom-accent/20 to-custom-primary/20',
      featured: true,
    },
    {
      title: 'Tekken 8: Tournament Ready',
      description:
        'Advanced techniques and strategies used by professional Tekken players.',
      level: 'Pro Level',
      levelColor: 'purple-400',
      duration: '15 hours',
      students: '234',
      rating: 5.0,
      price: 149,
      icon: '🥊',
      gradient: 'from-custom-primary/20 to-custom-accent/20',
    },
    {
      title: 'Fortnite: Building & Editing',
      description:
        'Master advanced building techniques and lightning-fast editing for competitive play.',
      level: 'Intermediate',
      levelColor: 'blue-400',
      duration: '7 hours',
      students: '1,567',
      rating: 4.6,
      price: 69,
      icon: '🏰',
      gradient: 'from-custom-secondary/20 to-custom-primary/20',
    },
    {
      title: 'Valorant: Agent Mastery',
      description:
        'Deep dive into agent abilities, team compositions, and strategic gameplay.',
      level: 'Intermediate',
      levelColor: 'custom-accent',
      duration: '9 hours',
      students: '2,103',
      rating: 4.8,
      price: 89,
      icon: '🎮',
      gradient: 'from-custom-accent/20 to-custom-secondary/20',
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <div
          key={index}
          className={`course-card rounded-3xl overflow-hidden ${course.featured ? 'featured' : ''}`}
        >
          <div
            className={`aspect-video bg-gradient-to-br ${course.gradient} flex items-center justify-center`}
          >
            <span className="text-4xl">{course.icon}</span>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span
                className={`bg-${course.levelColor}/20 text-${course.levelColor} px-3 py-1 rounded-full text-sm font-medium`}
              >
                {course.level}
              </span>
              <div className="flex items-center space-x-1">
                <Star
                  className="w-4 h-4 text-custom-accent"
                  fill="currentColor"
                />
                <span className="text-cream/70 text-sm">{course.rating}</span>
              </div>
            </div>
            <h3 className="font-bold text-xl mb-2">{course.title}</h3>
            <p className="text-cream/70 mb-4">{course.description}</p>
            <div className="flex items-center space-x-4 mb-4 text-sm text-cream/60">
              <span>{course.duration}</span>
              <span>•</span>
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold gradient-text">
                ${course.price}
              </div>
              <button className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                Enroll
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
