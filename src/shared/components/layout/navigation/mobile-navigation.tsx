'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { User, LogIn } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { cn } from '@shared/utils/utils'
import { navigation } from '@shared/config/const'
import ROUTE from '@shared/config/pages'

interface NavItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: number
}

const MobileBottomNav = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Create user/auth navigation item
  const authNavItem = session
    ? {
        href: '/dashboard',
        icon: User,
        label: 'Profile',
        isUserProfile: true,
      }
    : {
        href: ROUTE.PUBLIC.AUTH.LOGIN,
        icon: LogIn,
        label: 'Login',
        isUserProfile: false,
      }

  // Limit main navigation to prevent overcrowding and add auth item
  const limitedNavigation = navigation.slice(0, 4) // Take first 4 items
  const allNavItems = [...limitedNavigation, authNavItem]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray border-t border-gray-200/ md:hidden">
      <div
        className={cn(
          'flex items-center justify-around px-2 py-2',
          'bg-dark-primary',
        )}
      >
        {allNavItems.map((item) => {
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
  isUserProfile,
}: NavItem & {
  isActive: boolean
  notificationCount?: number
  isUserProfile?: boolean
}) {
  const Icon = icon
  const { data: session } = useSession()

  return (
    <Link
      key={href}
      href={href}
      className={`relative flex flex-col items-center justify-center p-4 w-12 h-12 !rounded-md transition-all duration-200 ${
        isActive
          ? 'bg-gray-50 text-custom-primary'
          : 'text-white hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {/* Square background for active state */}
      {isActive && (
        <div className="absolute inset-0 rounded-md transition-all duration-200" />
      )}

      {/* Icon container with badge */}
      <div className="relative z-10">
        {isUserProfile && session?.user?.userData?.avatar_url ? (
          <div className="relative">
            <img
              src={session.user.userData.avatar_url}
              alt={session.user.userData?.username || 'User'}
              className="w-6 h-6 rounded-full"
            />
            {session.user.userData?.is_active && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-dark-primary rounded-full"></div>
            )}
          </div>
        ) : (
          <Icon
            className={`h-6 w-6 ${isUserProfile && session ? 'text-custom-accent' : ''}`}
          />
        )}

        {notificationCount && (
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

export default MobileBottomNav
