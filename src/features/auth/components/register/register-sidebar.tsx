'use client'

import { GamepadIcon, User, Check } from 'lucide-react'

/**
 * Register Sidebar Component
 * Displays branding and benefits for registration
 */
export const RegisterSidebar = () => (
  <div className="space-y-8 order-1 lg:order-2">
    <BrandingSection />
    <BenefitsSection />
    <TrustIndicators />
  </div>
)

/**
 * Branding Section Component
 * Main headline and description
 */
const BrandingSection = () => (
  <div className="space-y-6">
    <h1 className="text-4xl md:text-5xl font-black leading-tight text-center lg:text-left">
      Join the
      <span className="gradient-text"> ultimate gaming</span> community
    </h1>
    <p className="text-xl text-cream/80 leading-relaxed text-center lg:text-left">
      Connect with pro players, learn from the best, and take your gaming to the
      next level.
    </p>
  </div>
)

/**
 * Benefits Section Component
 * List of benefits for joining
 */
const BenefitsSection = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-center lg:text-left">
      What you'll get:
    </h3>
    <div className="space-y-4">
      {BENEFITS.map((benefit) => (
        <BenefitItem key={benefit.title} {...benefit} />
      ))}
    </div>
  </div>
)

/**
 * Benefit Item Component
 * Individual benefit with icon and description
 */
interface BenefitItemProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  iconBg: string
}

const BenefitItem = ({
  icon: Icon,
  title,
  description,
  iconBg,
}: BenefitItemProps) => (
  <div className="flex items-center space-x-4">
    <div
      className={`w-12 h-12 ${iconBg} border-radius-propublic flex items-center justify-center flex-shrink-0`}
    >
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-cream/70">{description}</p>
    </div>
  </div>
)

/**
 * Trust Indicators Component
 * Statistics and social proof
 */
const TrustIndicators = () => (
  <div className="bg-dark-custom-secondary/50 border-radius-propublic p-6 border border-custom-primary/20">
    <div className="text-center">
      <h4 className="font-bold text-lg mb-4">Trusted by gamers worldwide</h4>
      <div className="grid grid-cols-3 gap-4 text-center">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            <div className="text-cream/60 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

/**
 * Benefits Configuration
 * Static data for benefits section
 */
const BENEFITS = [
  {
    icon: GamepadIcon,
    title: 'Access to 50+ Games',
    description: 'Find coaches and communities for all your favorite games',
    iconBg: 'bg-custom-primary/20 text-custom-primary',
  },
  {
    icon: User,
    title: '1-on-1 Coaching',
    description: 'Get personalized training from professional players',
    iconBg: 'bg-custom-accent/20 text-custom-accent',
  },
  {
    icon: Check,
    title: 'Expert Guides',
    description: 'Access premium courses and strategy guides',
    iconBg: 'bg-custom-secondary/20 text-custom-secondary',
  },
] as const

/**
 * Trust Statistics Configuration
 * Static data for trust indicators
 */
const TRUST_STATS = [
  { value: '28K+', label: 'Active Users' },
  { value: '1.2K+', label: 'Pro Coaches' },
  { value: '4.9★', label: 'User Rating' },
] as const
