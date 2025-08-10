'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, ExternalLink } from 'lucide-react'
import type { CommunityData } from '@/types/community.types'
import type { TypeCommunityItem } from '@/types/home.types'
import { IconResolver } from '@/utils/iconMap'

interface CommunitySidebarProps {
  community: CommunityData
  currentPath: string
}

export default function CommunitySidebar({
  community,
  currentPath,
}: CommunitySidebarProps) {
  const [showNotification, setShowNotification] = useState(true)

  return (
    <div className="lg:w-64 bg-gray-900/90 backdrop-blur-sm border-r border-gray-700">
      <div className="p-6 space-y-6">
        {/* Community Header */}
        <div>
          <div className="relative mb-4 rounded-xl overflow-hidden">
            <img
              src={community.headerImage}
              alt={community.name}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <h1 className="text-white font-bold text-lg leading-tight">
                {community.name}
              </h1>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4">{community.description}</p>

          {/* Social Links */}
          <div className="flex gap-3 mb-4">
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
            <button className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Upgrade Section */}
        <div className="bg-red-900/30 border border-red-600/30 rounded-xl p-4">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300 mb-2">
            Upgrade
          </button>
          <p className="text-center text-gray-300 text-sm">
            <span className="font-bold">{community.subscriberCount}</span>{' '}
            subscribers
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {community.navigation.map((item) => {
            // const Icon = item.icon
            const isActive = currentPath === item.href

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconResolver iconName={item.iconName} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count && (
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Dismissible Notification */}
        {showNotification && (
          <div className="bg-gray-800/50 rounded-xl p-4 relative">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="pr-6">
              <h4 className="font-bold text-sm mb-2">
                Start building your Community!
              </h4>
              <p className="text-xs text-gray-400 mb-3">
                There's money to be made in these digital hills.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300">
                Start selling on Metaly
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
