'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'

import { cn } from '@/lib/utils'
import { navigation } from '@/config/const'

interface NavItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: number
}

const MobileBottomNav = () => {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray  border-t border-gray-200/ md:hidden">
      <div
        className={cn(
          'flex items-center justify-around px-2 py-4 ',
          'bg-dark-primary  ',
        )}
      >
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <NavigationItem key={item.label} {...item} isActive={isActive} />
          )
        })}
      </div>
    </nav>
  )
}

function NavigationItem({
  label,
  href,
  icon,
  isActive,
  notificationCount,
}: NavItem & { isActive: boolean; notificationCount?: number }) {
  const Icon = icon
  return (
    <Link
      key={href}
      href={href}
      className={`relative flex flex-col items-center justify-center p-4 w-10 h-10 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-blue-100 text-custom-primary'
          : 'text-white hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {/* Square background for active state */}
      {isActive && (
        <div className="absolute inset-0 bg-[#7B001F] rounded-lg transition-all duration-200" />
      )}

      {/* Icon container with badge */}
      <div className="relative z-10 mb-1">
        <Icon className={`h-5 w-5 ${isActive && 'text-custom-primary'}`} />

        {notificationCount && (
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">
              {' '}
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      {/* <span
        className={`text-xs font-medium z-10 ${
          isActive ? 'text-primary' : 'text-gray-500'
        }`}
      >
        {label}
      </span> */}
    </Link>
  )
}

export default MobileBottomNav
