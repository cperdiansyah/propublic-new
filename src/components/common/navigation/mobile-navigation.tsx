'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'

import { Compass, Gamepad2, Home, Newspaper, ShoppingBag } from 'lucide-react'

interface NavItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: number
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Academy', href: '/academy', icon: Compass },
  { label: 'Games', href: '/games', icon: Gamepad2 },
  { label: 'Shop', href: '/shop', icon: ShoppingBag },
  { label: 'News', href: '/news', icon: Newspaper },
]

const MobileBottomNav = () => {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
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
      className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {/* Square background for active state */}
      {isActive && (
        <div className="absolute inset-0 bg-blue-100 rounded-lg transition-all duration-200" />
      )}

      {/* Icon container with badge */}
      <div className="relative z-10 mb-1">
        <Icon
          className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
        />

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
      <span
        className={`text-xs font-medium z-10 ${
          isActive ? 'text-primary' : 'text-gray-500'
        }`}
      >
        {label}
      </span>
    </Link>
  )
}

export default MobileBottomNav
