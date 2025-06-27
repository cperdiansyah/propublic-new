'use client'

import { Button } from '@/components/ui/button'
import { scrollToTop } from '@/utils/helpers'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Footer = () => {
  const footerLinks = {
    ['quick-link']: [
      { name: 'Terms', href: '/' },
      { name: 'Privacy', href: '/' },
    ],
  }

  function handleScroll() {
    scrollToTop()
  }
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src={'/svg/logo.svg'}
                width={200}
                height={100}
                alt="logo"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed capitalize">
              the ultimate gaming academy dedicated to nurturing your skills,
              fostering camaraderie, and shaping the next generation of esports
              champions.
            </p>
            {/* Social links */}
          </div>
        </div>
        {/* Links sections */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {footerLinks['quick-link'].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            onClick={handleScroll}
            className={cn(
              'bg-white text-custom-dark hidden md:block mt-5',
              'hover:bg-amber-300 transition-200s',
            )}
          >
            Back To Top
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
