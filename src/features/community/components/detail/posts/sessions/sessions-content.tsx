import { Calendar, Clock, Users, Star, Trophy, Play } from 'lucide-react'

export default function SessionsContent() {
  const upcomingSessions = [
    {
      id: 1,
      title: 'Aim Training Masterclass',
      instructor: 'Orvant',
      date: '2024-12-20',
      time: '14:00',
      duration: '2 hours',
      participants: 12,
      maxParticipants: 15,
      price: '$25',
      difficulty: 'Intermediate',
      description:
        'Intensive aim training session focusing on crosshair placement and flick shots.',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Map Control Strategies',
      instructor: 'Orvant',
      date: '2024-12-22',
      time: '16:00',
      duration: '1.5 hours',
      participants: 8,
      maxParticipants: 12,
      price: '$20',
      difficulty: 'Advanced',
      description:
        'Learn advanced map control techniques for competitive play.',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
    },
  ]

  const pastSessions = [
    {
      id: 3,
      title: 'Valorant Fundamentals',
      instructor: 'Orvant',
      date: '2024-12-15',
      participants: 20,
      rating: 4.8,
      reviews: 15,
      recording: true,
    },
    {
      id: 4,
      title: 'Economy Management',
      instructor: 'Orvant',
      date: '2024-12-12',
      participants: 18,
      rating: 4.9,
      reviews: 12,
      recording: true,
    },
  ]

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Session Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Calendar className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">7</div>
          <div className="text-sm text-gray-400">Total Sessions</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">156</div>
          <div className="text-sm text-gray-400">Total Attendees</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Star className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">4.9</div>
          <div className="text-sm text-gray-400">Avg Rating</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">24h</div>
          <div className="text-sm text-gray-400">Total Duration</div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-6">
          Upcoming Sessions
        </h2>
        <div className="space-y-6">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="bg-gray-800/50 border border-gray-600 rounded-xl p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Session Image */}
                <div className="lg:w-48 lg:h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-full h-32 lg:h-full object-cover"
                  />
                </div>

                {/* Session Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {session.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {session.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400 mb-1">
                        {session.price}
                      </div>
                      <div className="text-sm text-gray-400">per session</div>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>
                        {session.participants}/{session.maxParticipants}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="w-4 h-4 text-gray-400" />
                      <span>{session.difficulty}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300">
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Sessions */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-6">Past Sessions</h2>
        <div className="space-y-4">
          {pastSessions.map((session) => (
            <div
              key={session.id}
              className="bg-gray-800/50 border border-gray-600 rounded-xl p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{session.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3 lg:mb-0">
                    <span>Instructor: {session.instructor}</span>
                    <span>Date: {session.date}</span>
                    <span>Attendees: {session.participants}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>
                        {session.rating} ({session.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {session.recording && (
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
                      <Play className="w-4 h-4" />
                      Watch Recording
                    </button>
                  )}
                  <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Booking CTA */}
      <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-600/30 rounded-2xl p-6 lg:p-8 text-center">
        <h3 className="text-xl lg:text-2xl font-bold mb-4">
          Ready to Level Up Your Game?
        </h3>
        <p className="text-gray-300 mb-6">
          Join our coaching sessions and improve your Valorant skills with
          professional guidance.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
          Book Your First Session
        </button>
      </div>
    </div>
  )
}
