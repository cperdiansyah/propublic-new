'use client'

import Link from 'next/link'
import type { CommunityData } from '@shared/types/community.types'
import type { TypeCommunityItem } from '@shared/types/home.types'

interface MobileNavProps {
  community: CommunityData
  currentPath: string
}

export default function MobileNav({ community, currentPath }: MobileNavProps) {
  return (
    <div className="lg:hidden bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {community.navigation.map((item) => {
            const isActive = currentPath === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-red-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {item.count && (
                  <span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
                {/* Active Page Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
