'use client'

import { usePathname } from 'next/navigation'
import type { CommunityData } from '@/types/community.types'
import MobileNav from './mobile-nav'
import CommunitySidebar from './community-sidebar'
import CommunityHeader from './community-header'
import type { TypeCommunityItem } from '@/types/home.types'

interface CommunityLayoutClientProps {
  children: React.ReactNode
  community: CommunityData
}

export default function CommunityLayoutClient({
  children,
  community,
}: CommunityLayoutClientProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <CommunityHeader community={community} />
        <MobileNav community={community} currentPath={pathname} />
        <div className="p-4">{children}</div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <CommunitySidebar community={community} currentPath={pathname} />
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
