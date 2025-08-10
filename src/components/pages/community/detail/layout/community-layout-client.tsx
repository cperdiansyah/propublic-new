'use client'

import { usePathname } from 'next/navigation'
import type { CommunityData } from '@/types/community.types'
import CommunitySidebar from './community-sidebar'
import MobileNav from './mobile-nav'
import CommunityHeader from './community-header'
import { useEffect, useRef } from 'react'

interface CommunityLayoutClientProps {
  children: React.ReactNode
  community: CommunityData
}

export default function CommunityLayoutClient({
  children,
  community,
}: CommunityLayoutClientProps) {
  const pathname = usePathname()
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset mobile content scroll
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Reset desktop content scroll
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 100, behavior: 'smooth' })
    }
  }, [pathname])

  return (
    <div
      className="h-screen bg-black text-white flex flex-col md:pt-20 "
      ref={scrollRef}
    >
      {/* CSS for scrollbar hiding */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Custom scrollbar for content area */
        .content-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(75, 85, 99, 0.8) rgba(17, 24, 39, 0.3);
        }
        .content-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .content-scroll::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.3);
          border-radius: 4px;
        }
        .content-scroll::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 4px;
        }
        .content-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }

        .from-ondark-base {
          --tw-gradient-from: var(--color-neutral-900);
          --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position));
        }
      `}</style>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full">
        <CommunityHeader community={community} />
        <MobileNav community={community} currentPath={pathname} />
        <div ref={mobileScrollRef} className="flex-1 overflow-y-auto ">
          <div className="p-4">{children}</div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full ">
        <CommunitySidebar community={community} currentPath={pathname} />
        <div
          ref={desktopScrollRef}
          className="flex-1 overflow-y-auto  scrollbar-hide"
        >
          <div className="max-w-4xl mx-auto p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
