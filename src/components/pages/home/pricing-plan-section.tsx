import CornerDecorations from '@/components/blocks/effects/corner-decoration'
import AnimatedBackground from '@/components/blocks/background/hexagon-background'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Gift,
  Network,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const pricingData = {
  price: '99K',
  currency: 'RP',
  period: 'month',
  description: '< 3,300 RP per day for unlimited gaming growth >',
}

const perksData = [
  {
    icon: Trophy,
    title: 'VIP Tournament Access',
    description:
      'Priority access to exclusive tournaments with bigger prize pools and professional exposure.',
    gradient: 'from-red-500 to-red-600',
    glowColor: 'red-500/20',
  },
  {
    icon: Users,
    title: 'Pro Coaching Sessions',
    description:
      '1-on-1 sessions with professional gamers and exclusive strategy workshops.',
    gradient: 'from-yellow-500 to-yellow-600',
    glowColor: 'yellow-500/20',
  },
  {
    icon: Network,
    title: 'Elite Gaming Network',
    description:
      'Connect with top players, streamers, and industry professionals in our exclusive community.',
    gradient: 'from-red-600 to-yellow-500',
    glowColor: 'red-500/15',
  },
  {
    icon: Gift,
    title: 'Monthly Rewards & Gear',
    description:
      'Exclusive gaming gear, in-game items, and surprise rewards delivered monthly.',
    gradient: 'from-yellow-600 to-red-500',
    glowColor: 'yellow-500/15',
  },
]

export default function PricingPlan() {
  const handleJoinElite = () => {
    console.log('Join Elite clicked!')
    // Add your join logic here
  }

  return (
    <div className="min-h-screen lg:min-h-fit py-24 lg:py-0 bg-black relative overflow-hidden">
      {/* Hexagonal BG */}
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
        {/* <HeaderBar /> */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-yellow-500/3 to-red-600/5 blur-xl" />

          <div className="relative bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-800/90 backdrop-blur-xl rounded-b-lg border border-red-500/20 p-8 md:p-12">
            <CornerDecorations />

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Pricing */}
              <div className="space-y-8">
                <HeroSection
                  title="BECOME A"
                  subtitle="GAMING LEGEND"
                  description="Join thousands of elite gamers in exclusive tournaments, masterclasses, and VIP events."
                />

                <PricingCard
                  price={pricingData.price}
                  currency={pricingData.currency}
                  period={pricingData.period}
                  description={pricingData.description}
                />

                <CTAButton onClick={handleJoinElite}>
                  JOIN THE ELITE NOW!
                </CTAButton>
              </div>

              {/* Right Side - Perks */}
              <PerksSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

function CTAButton({ children, onClick }: CTAButtonProps) {
  return (
    <div className="relative group">
      {/* <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-400 blur-lg group-hover:blur-xl transition-all duration-300" /> */}
      <Button
        onClick={onClick}
        className={cn(
          'relative w-full font-bold py-6 text-xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-500/25',
          'bg-gradient-to-r from-custom-primary to-custom-secondary text-cream  rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all glow text-xl propublic-button glow-pulse py-6 border-radius-propublic ',
        )}
      >
        <Zap className="w-6 h-6 mr-3 animate-pulse" />
        {children}
        <Zap className="w-6 h-6 ml-3 animate-pulse" />
      </Button>
    </div>
  )
}

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
}

function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  return (
    <div className="space-y-6 text-center md:text-left">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="text-white drop-shadow-2xl">{title}</span>
          <br />
          <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl ">
            {subtitle}
          </span>
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-md drop-shadow-lg">
          {description}
        </p>
      </div>
    </div>
  )
}

interface PerkCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  glowColor: string
}

function PerkCard({
  icon: Icon,
  title,
  description,
  gradient,
  glowColor,
}: PerkCardProps) {
  return (
    <div className="relative group">
      <div
        className={`absolute inset-0 bg-${glowColor} blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`}
      />

      <div className="relative bg-gradient-to-r from-gray-800/60 via-black/60 to-gray-900/60 border border-gray-600/50 border-radius-propublic  p-6 backdrop-blur-sm hover:border-red-400/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
        <div className="absolute inset-1 bg-gradient-to-r from-transparent via-red-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />

        <div className="relative flex items-start gap-4 flex-col md:flex-row justify-center">
          <div
            className={`bg-gradient-to-br ${gradient} p-4 border-radius-propublic  shadow-lg group-hover:shadow-2xl transition-all duration-300 mx-auto md:mx-0`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-3 group-hover:text-yellow-300 transition-colors duration-300 text-center md:text-left">
              {title}
            </h3>
            <p className="text-gray-300 text-xs leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-center md:text-left font-inter">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PerksSection() {
  return (
    <div className="space-y-8 order-first md:order-last ">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent drop-shadow-2xl">
          ELITE MEMBER PERKS
        </h2>
        {/* <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-yellow-400 mx-auto lg:mx-0 mt-2 rounded-full" /> */}
      </div>

      <div className="space-y-6">
        {perksData.map((perk, index) => (
          <PerkCard
            key={index}
            icon={perk.icon}
            title={perk.title}
            description={perk.description}
            gradient={perk.gradient}
            glowColor={perk.glowColor}
          />
        ))}
      </div>
    </div>
  )
}

interface PricingCardProps {
  price: string
  currency: string
  period: string
  description: string
}

function PricingCard({
  price,
  currency,
  period,
  description,
}: PricingCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/15 blur-xl group-hover:blur-2xl transition-all duration-500" />

      <div className="relative bg-gradient-to-br from-gray-800/80 via-black/80 to-gray-900/80 border-2 border-red-600/50 border-radius-propublic  p-8 backdrop-blur-sm group-hover:border-red-400/70 transition-all duration-500">
        <div className="absolute inset-1 bg-gradient-to-br from-red-500/5 to-yellow-500/5 rounded-lg" />

        <div className="relative text-center space-y-4">
          <div className="text-yellow-400 text-sm font-mono tracking-widest mb-4">
            ⚡ MONTHLY INVESTMENT ⚡
          </div>
          <div className="flex items-baseline justify-center gap-3">
            <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-custom-primary  to-red-400 bg-clip-text text-transparent drop-shadow-2xl ">
              {price}
            </span>
            <div className="text-gray-300">
              {/* <div className="text-xl font-bold text-yellow-400">
                {currency}
              </div> */}
              <div className="text-sm text-gray-400">/{period}</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4 font-mono">{description}</p>
        </div>
      </div>
    </div>
  )
}
