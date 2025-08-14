import {
  BookOpen,
  Clock,
  Eye,
  Star,
  Download,
  Play,
  Trophy,
  Target,
} from 'lucide-react'

export default function GuidesContent() {
  const featuredGuides = [
    {
      id: 1,
      title: 'Complete Valorant Aim Training Guide',
      description:
        'Master your aim with this comprehensive guide covering crosshair placement, sensitivity settings, and training routines.',
      author: 'Orvant',
      publishDate: '2024-12-10',
      readTime: '15 min',
      views: 2840,
      rating: 4.9,
      reviews: 127,
      category: 'Mechanics',
      difficulty: 'Beginner',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
      isPremium: false,
      hasVideo: true,
    },
    {
      id: 2,
      title: 'Advanced Map Control Strategies',
      description:
        'Learn professional-level map control techniques used by top-tier teams and players.',
      author: 'Orvant',
      publishDate: '2024-12-05',
      readTime: '22 min',
      views: 1920,
      rating: 4.8,
      reviews: 89,
      category: 'Strategy',
      difficulty: 'Advanced',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
      isPremium: true,
      hasVideo: false,
    },
  ]

  const categories = [
    { name: 'All', count: 24, active: true },
    { name: 'Mechanics', count: 8, active: false },
    { name: 'Strategy', count: 6, active: false },
    { name: 'Economy', count: 4, active: false },
    { name: 'Agent Guides', count: 6, active: false },
  ]

  const recentGuides = [
    {
      id: 3,
      title: 'Jett Movement Techniques',
      readTime: '8 min',
      views: 1540,
      category: 'Mechanics',
      publishDate: '2024-12-08',
    },
    {
      id: 4,
      title: 'Eco Round Strategies',
      readTime: '12 min',
      views: 980,
      category: 'Economy',
      publishDate: '2024-12-06',
    },
    {
      id: 5,
      title: 'Sage Support Guide',
      readTime: '18 min',
      views: 2100,
      category: 'Agent Guides',
      publishDate: '2024-12-03',
    },
  ]

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Guide Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <BookOpen className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">24</div>
          <div className="text-sm text-gray-400">Total Guides</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Eye className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">45.2K</div>
          <div className="text-sm text-gray-400">Total Views</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Star className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">4.8</div>
          <div className="text-sm text-gray-400">Avg Rating</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Download className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">1.2K</div>
          <div className="text-sm text-gray-400">Downloads</div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                category.active
                  ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Featured Guides */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-6">Featured Guides</h2>
        <div className="space-y-6">
          {featuredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-gray-800/50 border border-gray-600 rounded-xl p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Guide Image */}
                <div className="lg:w-48 lg:h-32 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-32 lg:h-full object-cover"
                  />
                  {guide.hasVideo && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  )}
                  {guide.isPremium && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                      PREMIUM
                    </div>
                  )}
                </div>

                {/* Guide Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            guide.difficulty === 'Beginner'
                              ? 'bg-green-600/20 text-green-400'
                              : guide.difficulty === 'Advanced'
                                ? 'bg-red-600/20 text-red-400'
                                : 'bg-yellow-600/20 text-yellow-400'
                          }`}
                        >
                          {guide.difficulty}
                        </span>
                        <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                          {guide.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{guide.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {guide.description}
                      </p>
                    </div>
                  </div>

                  {/* Guide Stats */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{guide.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{guide.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>
                        {guide.rating} ({guide.reviews} reviews)
                      </span>
                    </div>
                    <span>By {guide.author}</span>
                    <span>{guide.publishDate}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300">
                      Read Guide
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Guides */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-6">Recent Guides</h2>
        <div className="space-y-4">
          {recentGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-gray-800/50 border border-gray-600 rounded-xl p-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{guide.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{guide.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{guide.views.toLocaleString()} views</span>
                    </div>
                    <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                      {guide.category}
                    </span>
                    <span>{guide.publishDate}</span>
                  </div>
                </div>
                <div className="mt-3 lg:mt-0">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
                    Read Guide
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Creation CTA */}
      <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-600/30 rounded-2xl p-6 lg:p-8 text-center">
        <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl lg:text-2xl font-bold mb-4">
          Share Your Knowledge
        </h3>
        <p className="text-gray-300 mb-6">
          Have expertise to share? Create your own guides and help the community
          improve.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
          Create a Guide
        </button>
      </div>
    </div>
  )
}
