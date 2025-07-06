import Desktopnavigation from '@/components/layout/navigation/desktop-navigation'
import { Button } from '@/components/ui/button'
import { navigation } from '@/config/const'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-dark-primary/50  backdrop-blur-sm border-b border-gray-800 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="nav-left flex items-center justify-between gap-5">
            {/* Logo */}
            <div className="flex items-center mr-5">
              <Link href="/" className="flex items-center space-x-2 ">
                <Image
                  src={'/svg/logo.svg'}
                  width={120}
                  height={50}
                  alt="logo"
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
  /* need improve for state management in this section for login and logout*/
  return (
    <div className="flex items-center gap-3">
      <Link href="/auth/login">
        <Button
          variant="outline"
          className=" transition-200s bg-transparent text-white hover:bg-custom-secondary-dark hover:text-white propublic-button text-base font-semibold cursor-pointer"
        >
          Join
        </Button>
      </Link>
      <Link href="/auth/register" className="hidden md:block">
        <Button className="bg-custom-primary text-white propublic-button  hover:bg-custom-secondary-dark transition-200s text-base font-semibold hover:bg-custom-primary/80 cursor-pointer">
          Get Started
        </Button>
      </Link>
    </div>
  )
}

export default Header
