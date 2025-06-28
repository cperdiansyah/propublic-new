import { Button } from '@/components/ui/button'
import { navigation } from '@/config/const'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 bg-custom-dark/95  backdrop-blur-sm border-b border-gray-800 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="nav-left flex items-center justify-between gap-5">
            {/* Logo */}
            <div className="flex items-center mr-5">
              <Link href="/" className="flex items-center space-x-2">
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
          <HeaderLink />
          {/* User Navigation */}
          <HeaderUser />
        </div>
      </div>
    </nav>
  )
}

function HeaderLink() {
  return (
    <div className=" gap-3 text-white list-none capitalize font-semibold md:flex hidden p-5">
      {navigation.map((link) => {
        return (
          <li
            key={link.label}
            className="p-3 hover:text-custom-secondary transition-200s "
          >
            <Link href={link.href} className="">
              {link.label}
            </Link>
          </li>
        )
      })}
    </div>
  )
}

function HeaderUser() {
  /* need improve for state management in this section for login and logout*/
  return (
    <div className="flex items-center gap-3">
      <Link href="/login">
        <Button
          variant="outline"
          className=" transition-200s bg-transparent text-white hover:bg-custom-secondary-dark hover:text-white px-4 py-3 text-base font-semibold cursor-pointer"
        >
          Join
        </Button>
      </Link>
      <Link href="/register">
        <Button className="bg-custom-primary text-white px-4 py-3  hover:bg-custom-secondary-dark transition-200s text-base font-semibold hover:bg-custom-primary/80 cursor-pointer">
          Get Started
        </Button>
      </Link>
    </div>
  )
}

export default Header
