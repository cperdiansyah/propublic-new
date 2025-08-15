import {
  MessageSquare,
  Heart,
  Share,
  Clock,
  Eye,
  Pin,
  Flame,
  TrendingUp,
  Plus,
} from 'lucide-react'

export default function PostsContent() {
  const pinnedPosts = [
    {
      id: 1,
      title: "Welcome to Orvant's Valorant Community!",
      content:
        "Hey everyone! Welcome to our community. Here you'll find the latest updates, coaching tips, and connect with fellow Valorant enthusiasts. Make sure to read our community guidelines and don't hesitate to ask questions!",
      author: {
        name: 'Orvant',
        avatar: 'https://avatar.iran.liara.run/public/42',
        role: 'Community Owner',
        verified: true,
      },
      timestamp: '2024-12-01',
      likes: 127,
      comments: 23,
      views: 890,
      isPinned: true,
      category: 'Announcement',
    },
  ]

  const recentPosts = [
    {
      id: 2,
      title: 'New Patch 8.11 Analysis - What Changed?',
      content:
        "The latest patch brought some significant changes to the meta. Let's break down what this means for competitive play and how you should adapt your strategies...",
      author: {
        name: 'ProPlayer_X',
        avatar: 'https://avatar.iran.liara.run/public/15',
        role: 'Member',
        verified: false,
      },
      timestamp: '2024-12-15',
      likes: 89,
      comments: 34,
      views: 1240,
      isPinned: false,
      category: 'Discussion',
      isHot: true,
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Looking for ranked duo partners (Immortal+)',
      content:
        "Hey! I'm currently Immortal 2 and looking for consistent duo partners for ranked games. I main duelist but can flex to other roles. Must have good comms and positive attitude. DM me if interested!",
      author: {
        name: 'AimGod_2024',
        avatar: 'https://avatar.iran.liara.run/public/23',
        role: 'Member',
        verified: false,
      },
      timestamp: '2024-12-14',
      likes: 45,
      comments: 18,
      views: 567,
      isPinned: false,
      category: 'LFG',
    },
    {
      id: 4,
      title: 'Coaching Session Recap: Common Mistakes in Silver',
      content:
        'Just finished a great coaching session with some of our silver players. Here are the top 5 mistakes I see consistently and how to fix them: 1. Crosshair placement...',
      author: {
        name: 'Orvant',
        avatar: 'https://avatar.iran.liara.run/public/42',
        role: 'Community Owner',
        verified: true,
      },
      timestamp: '2024-12-13',
      likes: 156,
      comments: 42,
      views: 2100,
      isPinned: false,
      category: 'Coaching',
      isTrending: true,
    },
    {
      id: 5,
      title: 'Highlight: Insane Jett 4K clutch',
      content:
        "Had to share this incredible clutch moment from our scrimmage yesterday. The movement and aim was just *chef's kiss* 🔥",
      author: {
        name: 'FlickMaster',
        avatar: 'https://avatar.iran.liara.run/public/8',
        role: 'Member',
        verified: false,
      },
      timestamp: '2024-12-12',
      likes: 203,
      comments: 67,
      views: 3200,
      isPinned: false,
      category: 'Highlights',
      hasVideo: true,
    },
  ]

  const postCategories = [
    { name: 'All', count: 156, active: true },
    { name: 'Discussion', count: 45, active: false },
    { name: 'LFG', count: 28, active: false },
    { name: 'Coaching', count: 32, active: false },
    { name: 'Highlights', count: 39, active: false },
    { name: 'Announcements', count: 12, active: false },
  ]

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    )

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Post Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <MessageSquare className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">156</div>
          <div className="text-sm text-gray-400">Total Posts</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">2.1K</div>
          <div className="text-sm text-gray-400">Total Likes</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <Eye className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">15.8K</div>
          <div className="text-sm text-gray-400">Total Views</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center">
          <TrendingUp className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-xl font-bold">24</div>
          <div className="text-sm text-gray-400">This Week</div>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <img
            src="https://avatar.iran.liara.run/public/1"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-400 text-left px-4 py-3 rounded-xl transition-colors">
            What's on your mind about Valorant?
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Categories */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-3">
          {postCategories.map((category) => (
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

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Pin className="w-5 h-5 text-yellow-400" />
            Pinned Posts
          </h2>
          {pinnedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-yellow-900/10 border border-yellow-600/30 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold">{post.author.name}</h3>
                    {post.author.verified && (
                      <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-black text-xs">✓</span>
                      </div>
                    )}
                    <span className="text-sm text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded">
                      {post.author.role}
                    </span>
                    <span className="text-sm text-gray-400">
                      • {formatTimeAgo(post.timestamp)}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-3">{post.title}</h4>
                  <p className="text-gray-300 mb-4">{post.content}</p>
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                      <Share className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-400 ml-auto">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Posts */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recent Posts</h2>
        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold">{post.author.name}</h3>
                  {post.author.verified && (
                    <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs">✓</span>
                    </div>
                  )}
                  <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    {post.author.role}
                  </span>
                  <span className="text-sm text-gray-400">
                    • {formatTimeAgo(post.timestamp)}
                  </span>
                  <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  {post.isHot && (
                    <Flame
                      className="w-4 h-4 text-orange-400"
                      // title="Hot post"
                    />
                  )}
                  {post.isTrending && (
                    <TrendingUp
                      className="w-4 h-4 text-green-400"
                      // title="Trending"
                    />
                  )}
                </div>
                <h4 className="text-lg font-bold mb-3">{post.title}</h4>
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post "
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                    <Share className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-400 ml-auto">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300">
          Load More Posts
        </button>
      </div>
    </div>
  )
}
