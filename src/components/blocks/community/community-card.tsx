'use client'

import type { TypeCommunityItem } from '@/types/home.types'
import { ArrowRight, Calendar, FileText } from 'lucide-react'
import Image from 'next/image'

interface CommunitiesCardProps {
  community: TypeCommunityItem
  index: number
  className?: string
  showJoinCommunityButton?: boolean
}

const CommunitiesCard: React.FC<CommunitiesCardProps> = ({
  community,
  index,
  className,
  showJoinCommunityButton,
}) => {
  return (
    <div
      key={community.id}
      className={`group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white rounded-2xl hover:border-red-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 w-full max-w-sm mx-auto border-radius-propublic ${className}`}
      style={{
        animationDelay: `${index * 200}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards',
      }}
    >
      <div className="content-wrapper relative ">
        {/* Bg image header */}
        <div className="image-header-wrapper relative overflow-hidden border-radius-propublic">
          <Image
            src={community.headerImage || '/placeholder.png'}
            alt={community.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            width={400}
            height={200}
            blurDataURL={community.headerImage || '/images/placeholder.png'}
            placeholder="blur"
          />
          {/* Gradient Overlay */}{' '}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent  group-hover:scale-125 transition-transform duration-700"></div>
          {/* Featured Badge */}
          {community.isFeatured && (
            <div className="absolute top-3 left-3">
              <div className="border border-yellow-400  text-yellow-400 text-xs font-bold px-2 py-1 rounded  flex items-center gap-1 shadow-lg backdrop-blur-md">
                <span className="text-yellow-900">⭐</span>
                FEATURED
              </div>
            </div>
          )}
        </div>
        {/* Avatar */}
        <div className="avatar-wrapper px-6 relative mt-[-1.5rem]">
          <div
            className={`w-14 h-14  border-propublic bg-[#E8E1EF] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 overflow-hidden  border-radius-propublic`}
          >
            <img
              src={`${community.avatar}/${community.id}`}
              alt={community.name}
              className="  "
              width={56}
              height={56}
            />
          </div>
        </div>

        <div className="main-content p-6 flex flex-wrap flex-row justify-between gap-3">
          {/* Community Header */}
          <div className="community-wrappper w-full">
            <div className="flex items-start gap-4 mb-2 ">
              <div className="flex-1 min-w-0 ">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {community.name}
                  </h3>
                  {community.isVerified && (
                    <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-base  flex items-center justify-between gap-2 font-inter">
                  @{community.author}
                  {/* Category Badge */}
                  <div className="">
                    <span className="border-radius-propublic bg-transparent border border-custom-primary text-custom-primary px-2 py-1 text-sm">
                      {community.category}
                    </span>
                  </div>
                </p>
              </div>
            </div>
            <div className="community-desc py-3">
              <p className="text-gray-400 text-base leading-relaxed line-clamp-2 font-inter">
                {community.description}
              </p>
            </div>

            {/* Additional Stats */}
            <div className="flex justify-between items-center text-base text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span className="font-inter">
                  {community.sessions} Sessions
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FileText size={12} />
                <span className="font-inter">{community.guides} Guides</span>
              </div>
            </div>
          </div>
          {/* Join Button */}
          {showJoinCommunityButton && (
            <button className="w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold  transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-500/30 border-radius-propublic propublic-button  ">
              Join Community
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommunitiesCard
