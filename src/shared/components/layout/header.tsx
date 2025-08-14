'use client'

import Desktopnavigation from '@/shared/components/layout/navigation/desktop-navigation'
import UserDropdown from '@/shared/components/layout/navigation/user-dropdown'
import { Button } from '@/shared/components/ui/button'
import ROUTE from '@/config/pages'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-dark-primary/50  backdrop-blur-sm border-b border-gray-800 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="nav-left flex items-center justify-between gap-5">
            {/* Logo */}
            <div className="flex items-center mr-5">
              <Link
                href={ROUTE.PUBLIC.HOME}
                className="flex items-center space-x-2 "
              >
                <Image
                  src={'/svg/logo.svg'}
                  width={120}
                  height={50}
                  alt="logo"
                  placeholder="blur"
                  blurDataURL={'/svg/logo.svg'}
                />
              </Link>
            </div>
          </div>
          {/* Link */}
          <Desktopnavigation />
          {/* User Navigation */}
          <HeaderUser />
        </div>
      </div>
    </nav>
  )
}

function HeaderUser() {
  const { data: session, status } = useSession()

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-20 h-10 bg-gray-700/50 rounded animate-pulse"></div>
        <div className="w-24 h-10 bg-gray-700/50 rounded animate-pulse hidden md:block"></div>
      </div>
    )
  }

  // Show user dropdown if logged in
  if (session) {
    return <UserDropdown />
  }

  // Show login/signup buttons if not logged in
  return (
    <div className="flex items-center gap-3">
      <Link href={ROUTE.PUBLIC.AUTH.LOGIN}>
        <Button
          variant="outline"
          className="transition-200s bg-transparent text-white hover:bg-custom-secondary-dark hover:text-white propublic-button text-base font-semibold cursor-pointer"
        >
          Join
        </Button>
      </Link>
      <Link href={ROUTE.PUBLIC.AUTH.REGISTER} className="hidden md:block">
        <Button className="bg-custom-primary text-white propublic-button hover:bg-custom-secondary-dark transition-200s text-base font-semibold hover:bg-custom-primary/80 cursor-pointer">
          Get Started
        </Button>
      </Link>
    </div>
  )
}

export default Header
