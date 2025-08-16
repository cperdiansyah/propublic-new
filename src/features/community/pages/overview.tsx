import { Users, Calendar, BookOpen, MessageSquare } from 'lucide-react'

export default function OverviewContent() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop"
            alt="ORVANT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-red-500 mb-2 lg:mb-4 tracking-wider">
              ORVANT
            </h1>
            <p className="text-base lg:text-xl text-gray-300 font-semibold tracking-widest">
              VALORANT COACHING
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8 text-center">
        <p className="text-base lg:text-lg text-gray-300 mb-4 lg:mb-6">
          Not sure what's best for you? Book a free call with me now!
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 lg:px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 touch-manipulation">
          Click me!
        </button>
      </div>

      {/* About Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
          Welcome to Our Community
        </h2>
        <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
          Join thousands of players improving their Valorant skills with
          professional coaching and community support. Our community offers
          personalized training sessions, strategy guides, and a supportive
          environment for players of all skill levels.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">1,436</div>
          <div className="text-sm text-gray-400">Subscribers</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Calendar className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">7</div>
          <div className="text-sm text-gray-400">Sessions</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <BookOpen className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">2</div>
          <div className="text-sm text-gray-400">Guides</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <MessageSquare className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">45</div>
          <div className="text-sm text-gray-400">Posts</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
        <h3 className="text-lg lg:text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm lg:text-base font-medium">
                New coaching session scheduled
              </p>
              <p className="text-xs lg:text-sm text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm lg:text-base font-medium">
                New guide published: "Mastering Jett Mechanics"
              </p>
              <p className="text-xs lg:text-sm text-gray-400">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm lg:text-base font-medium">
                50 new members joined this week
              </p>
              <p className="text-xs lg:text-sm text-gray-400">3 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Rules */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
        <h3 className="text-lg lg:text-xl font-bold mb-4">
          Community Guidelines
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-bold text-sm mt-0.5">1.</span>
            <p className="text-sm lg:text-base text-gray-300">
              Be respectful to all community members
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-bold text-sm mt-0.5">2.</span>
            <p className="text-sm lg:text-base text-gray-300">
              No spam or self-promotion without permission
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-bold text-sm mt-0.5">3.</span>
            <p className="text-sm lg:text-base text-gray-300">
              Keep discussions relevant to Valorant and gaming
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-bold text-sm mt-0.5">4.</span>
            <p className="text-sm lg:text-base text-gray-300">
              Help others and share your knowledge
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
