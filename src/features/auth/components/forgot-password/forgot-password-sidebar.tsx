'use client'

// External libraries
import { Shield, Clock, CheckCircle } from 'lucide-react'

/**
 * Forgot Password Sidebar Component
 * Displays branding and security information
 * Following Single Responsibility Principle
 */
export const ForgotPasswordSidebar = () => (
  <div className="hidden lg:block space-y-8">
    <BrandingSection />
    <SecurityFeatures />
    <GamingTip />
  </div>
)

/**
 * Branding Section Component
 * Hero content for forgot password sidebar
 */
const BrandingSection = () => (
  <div className="space-y-6">
    <h1 className="text-4xl md:text-5xl font-black leading-tight">
      Forgot your
      <span className="gradient-text"> password?</span>
    </h1>

    <p className="text-xl text-cream/80 leading-relaxed">
      No worries! We'll help you reset it and get you back to dominating your
      games.
    </p>
  </div>
)

/**
 * Security Features Component
 * Displays security information about the reset process
 */
const SecurityFeatures = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold">Secure Reset Process</h3>
    <div className="space-y-4">
      <SecurityFeature
        icon={Shield}
        title="Encrypted Email Link"
        description="Secure, time-limited reset link sent to your email"
        bgColor="bg-custom-primary/20"
        iconColor="text-custom-primary"
      />

      <SecurityFeature
        icon={Clock}
        title="15-Minute Expiry"
        description="Links expire quickly for maximum security"
        bgColor="bg-custom-accent/20"
        iconColor="text-custom-accent"
      />

      <SecurityFeature
        icon={CheckCircle}
        title="Account Protection"
        description="Your gaming progress and data stay safe"
        bgColor="bg-custom-secondary/20"
        iconColor="text-custom-secondary"
      />
    </div>
  </div>
)

/**
 * Security Feature Component
 * Individual security feature item
 */
interface SecurityFeatureProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  bgColor: string
  iconColor: string
}

const SecurityFeature = ({
  icon: Icon,
  title,
  description,
  bgColor,
  iconColor,
}: SecurityFeatureProps) => (
  <div className="flex items-center space-x-4">
    <div
      className={`w-12 h-12 ${bgColor} border-radius-propublic flex items-center justify-center flex-shrink-0`}
    >
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div>
      <h4 className="font-bold">{title}</h4>
      <p className="text-cream/70 text-sm">{description}</p>
    </div>
  </div>
)

/**
 * Gaming Tip Component
 * Motivational tip for users
 */
const GamingTip = () => (
  <div className="testimonial-card border-radius-propublic p-6 border border-custom-primary/20">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-12 h-12 bg-custom-accent rounded-full flex items-center justify-center">
        <span className="text-dark-primary font-bold">🎮</span>
      </div>
      <div>
        <h3 className="font-bold">Quick Tip</h3>
        <p className="text-cream/60 text-sm">Pro Player</p>
      </div>
    </div>
    <p className="text-cream/80 italic">
      "Use a strong, unique password for your gaming accounts. Your rank depends
      on it!"
    </p>
  </div>
)
