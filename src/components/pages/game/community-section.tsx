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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center">
          {/* <span className="mr-3">👥</span> */}
          Related Communities
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {communities.map((community, index) => (
          <ComunitiesCard
            key={community.id}
            community={community}
            index={index}
            className="w-full "
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
      <h2 className="text-3xl font-bold text-white flex items-center mb-8">
        <span className="mr-3">👥</span>
        Related Communities
      </h2>

      <Card className="border-dashed border-2 border-gray-600">
        <CardContent className="text-center py-16">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No Communities Yet
          </h3>
          <p className="text-cream/70 mb-6">
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
