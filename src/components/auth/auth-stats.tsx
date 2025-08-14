'use client'

import type { LucideIcon } from 'lucide-react'

interface StatItemProps {
  icon: LucideIcon
  value: string
  label: string
  color: 'primary' | 'accent' | 'secondary'
}

const colorClasses = {
  primary: {
    bg: 'bg-custom-primary/20',
    text: 'text-custom-primary',
  },
  accent: {
    bg: 'bg-custom-accent/20',
    text: 'text-custom-accent',
  },
  secondary: {
    bg: 'bg-custom-secondary/20',
    text: 'text-custom-secondary',
  },
}

const StatItem = ({ icon: Icon, value, label, color }: StatItemProps) => {
  const colors = colorClasses[color]

  return (
    <div className="text-center">
      <div
        className={`
        w-12 h-12 ${colors.bg} border-radius-propublic 
        flex items-center justify-center mx-auto mb-3
      `}
      >
        <Icon className={`w-6 h-6 ${colors.text}`} />
      </div>
      <div className="text-2xl font-bold gradient-text">{value}</div>
      <div className="text-cream/60 text-sm">{label}</div>
    </div>
  )
}

interface AuthStatsProps {
  stats?: Array<{
    icon: LucideIcon
    value: string
    label: string
    color: 'primary' | 'accent' | 'secondary'
  }>
  className?: string
}

export const AuthStats = ({ stats = [], className = '' }: AuthStatsProps) => {
  if (stats.length === 0) return null

  return (
    <div className={`grid grid-cols-3 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatItem
          key={`${stat.label}-${index}`}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          color={stat.color}
        />
      ))}
    </div>
  )
}
