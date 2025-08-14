'use client'

import { useMemo } from 'react'
import type { CarouselGameItem } from '@shared/types/home.types'
import { CommunitiesSection } from '../community-section'
import { COMMUNITIES } from '@shared/config/exampleData'

interface RelatedCommunitiesProps {
  game: CarouselGameItem
}

export default function RelatedCommunities({ game }: RelatedCommunitiesProps) {
  // Filter communities related to this specific game
  const relatedCommunities = useMemo(() => {
    const gameName = game.name.toLowerCase()

    return COMMUNITIES.filter((community) => {
      const descLower = community.description.toLowerCase()
      const nameLower = community.name.toLowerCase()

      // Check if community is gaming-related and mentions the game
      return (
        community.category.toLowerCase() === 'gaming' &&
        (descLower.includes(gameName) ||
          nameLower.includes(gameName) ||
          // For generic gaming communities that could apply to any game
          descLower.includes('competitive gaming') ||
          descLower.includes('professional gaming'))
      )
    }).slice(0, 4) // Limit to 4 communities for game detail page
  }, [game])

  const handleJoinCommunity = () => {
    // In real app, this would navigate to community page or open join modal
    console.log('Join community clicked for game:', game.name)
  }

  return (
    <div>
      {/* <h2 className="text-3xl font-bold mb-8">{game.name} Communities</h2> */}
      <CommunitiesSection
        communities={relatedCommunities}
        onOpenModal={handleJoinCommunity}
      />
    </div>
  )
}
