'use client'

import type { Crown, Star } from 'lucide-react'

/**
 * Hero Section Configuration Interface
 * Defines the contract for hero content
 */
export interface HeroConfig {
  badge: {
    text: string
    leftIcon: typeof Crown
    rightIcon: typeof Star
  }
  title: {
    highlighted: string
    normal: string
  }
  subtitle: string
  description: {
    main: string
    emphasized: string
    secondary: string
  }
}

/**
 * Hero Section Props Interface
 */
interface HeroSectionProps {
  config: HeroConfig
}

/**
 * Hero Section Component
 * Displays the main hero content with badge, title, and description
 * Following Single Responsibility Principle - only handles hero display
 */
export const HeroSection = ({ config }: HeroSectionProps) => {
  const { badge, title, description } = config

  return (
    <section className="space-y-8">
      <HeroBadge {...badge} />
      <HeroTitle highlighted={title.highlighted} normal={title.normal} />
      <HeroDescription {...description} />
    </section>
  )
}

/**
 * Hero Badge Component
 * Displays the official store badge
 */
interface HeroBadgeProps {
  text: string
  leftIcon: typeof Crown
  rightIcon: typeof Star
}

const HeroBadge = ({
  text,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
}: HeroBadgeProps) => (
  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/25 to-pink-500/25 rounded-full border border-red-400/40 backdrop-blur-sm">
    <LeftIcon className="w-5 h-5 text-yellow-400 mr-2" />
    <span className="text-sm font-semibold text-white tracking-wider">
      {text}
    </span>
    <RightIcon className="w-4 h-4 text-yellow-400 ml-2" />
  </div>
)

/**
 * Hero Title Component
 * Displays the main title with gradient text
 */
interface HeroTitleProps {
  highlighted: string
  normal: string
}

const HeroTitle = ({ highlighted, normal }: HeroTitleProps) => (
  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 drop-shadow-2xl">
      {highlighted}
    </span>
    <br />
    <span className="text-white drop-shadow-2xl">{normal}</span>
  </h1>
)

/**
 * Hero Description Component
 * Displays the hero description with emphasized text
 */
interface HeroDescriptionProps {
  main: string
  emphasized: string
  secondary: string
}

const HeroDescription = ({
  main,
  emphasized,
  secondary,
}: HeroDescriptionProps) => (
  <div className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed space-y-3">
    <p className="text-2xl md:text-3xl font-bold text-white mb-4">{main}</p>
    <p>
      From premium gaming gear to exclusive ProPublic-branded apparel,
      <span className="text-red-400 font-bold"> {emphasized}</span>
    </p>
    <p className="text-gray-400">{secondary}</p>
  </div>
)
