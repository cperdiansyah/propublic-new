'use client'

import {
  Calendar,
  Users,
  MessageSquare,
  BookOpen,
  X,
  Youtube,
  Music,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import type React from 'react'

type IconMap = {
  [key: string]: LucideIcon
}

export const iconMap: IconMap = {
  Calendar: Calendar,
  Users: Users,
  MessageSquare: MessageSquare,
  BookOpen: BookOpen,
  X: X,
  Youtube: Youtube,
  Music: Music,
  MessageCircle: MessageCircle,
}

type IconResolverProps = {
  iconName: string
  className?: string
}

export const IconResolver: React.FC<IconResolverProps> = ({
  iconName,
  className,
}) => {
  const LucideIcon = iconMap[iconName]

  return LucideIcon ? <LucideIcon className={className} /> : null
}
