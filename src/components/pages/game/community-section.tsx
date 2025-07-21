'use client'

// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Existing components
import ComunitiesCard from '@/components/blocks/community/community-card'
import type { TypeCommunityItem } from '@/types/home.types'

interface CommunitiesSectionProps {
  communities: TypeCommunityItem[]
  onOpenModal: () => void
}

export function CommunitiesSection({
  communities,
  onOpenModal,
}: CommunitiesSectionProps) {
  if (communities.length === 0) {
    return <EmptyCommunitiesState onOpenModal={onOpenModal} />
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center">
          {/* <span className="mr-3">👥</span> */}
          Related Communities
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {communities.map((community, index) => (
          <ComunitiesCard
            key={community.id}
            community={community}
            index={index}
            className="w-full"
            showJoinCommunityButton={true}
          />
        ))}
      </div>
    </section>
  )
}

// Empty Communities State Component
interface EmptyCommunitiesStateProps {
  onOpenModal: () => void
}

export function EmptyCommunitiesState({
  onOpenModal,
}: EmptyCommunitiesStateProps) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center mb-6 sm:mb-8">
        <span className="mr-3">👥</span>
        Related Communities
      </h2>

      <Card className="border-dashed border-2 border-gray-600">
        <CardContent className="text-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
            🎯
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
            No Communities Yet
          </h3>
          <p className="text-cream/70 text-sm sm:text-base mb-4 sm:mb-6">
            Add some games to discover related communities
          </p>
          <Button
            onClick={onOpenModal}
            className="bg-gradient-to-r from-custom-primary to-custom-secondary hover:shadow-lg glow"
          >
            Add Your First Game
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
