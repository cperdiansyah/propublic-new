'use client'

/**
 * Animated Background Component
 * Displays animated gradient circles for visual effect
 * Following Single Responsibility Principle - only handles background animation
 */
export const AnimatedBackground = () => (
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-red-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-2xl animate-pulse delay-1000" />
    <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-to-br from-purple-500 to-red-500 rounded-full blur-3xl animate-pulse delay-2000" />
    <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-xl animate-pulse delay-3000" />
  </div>
)
