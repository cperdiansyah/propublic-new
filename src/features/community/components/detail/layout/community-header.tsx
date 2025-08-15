'use client'

import { useState } from 'react'
import type { CommunityData } from '@shared/types/community.types'
import { IconResolver } from '@shared/utils/iconMap'

interface CommunityHeaderProps {
  community: CommunityData
}

export default function CommunityHeader({ community }: CommunityHeaderProps) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="lg:hidden">
      {/* Hero Image */}
      <div className="relative h-48">
        <img
          src={community.headerImage}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Community Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-xl font-bold mb-1">{community.name}</h1>
          <p className="text-sm text-gray-300 mb-2">{community.description}</p>

          {/* Toggle Info Button */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            {showInfo ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>

      {/* Expandable Info Section */}
      {showInfo && (
        <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-4">
          <div className="space-y-4">
            {/* Stats */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Subscribers</span>
              <span className="font-semibold">{community.subscriberCount}</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {community.socialLinks.map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.url}
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <IconResolver
                      iconName={social.iconName}
                      className="w-4 h-4 text-gray-400"
                    />
                  </a>
                )
              })}
            </div>

            {/* Upgrade Button */}
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300">
              Upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
