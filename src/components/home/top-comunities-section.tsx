'use client'
import ComunitiesCard from '@/components/blocks/community/community-card'
import SectionTitle from '@/components/common/section-title'
import type { TypeCommunityItem } from '@/types/home.types'
import type React from 'react'

interface ITopComunitiesSection {
  communities: TypeCommunityItem[]
}
const TopComunitiesSection: React.FC<ITopComunitiesSection> = ({
  communities,
}) => {
  return (
    <div className="bg-black relative geometric-bg pt-20 pb-5">
      <div className="pt-44 px-5 z-10 relative">
        <SectionTitle
          title={
            <>
              Top Popular{' '}
              <span className="section-title-underline">Comunities!</span>
            </>
          }
          withButton
          btnText="Discover More Comunities"
          href="/comunity"
          buttonClassname="bg-custom-accent text-black hover:bg-custom-accent/90"
        />

        {/* List of Communities */}
        <div className="relative container mx-auto">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 m-5">
              {communities.map((item, i) => (
                <ComunitiesCard community={item} index={i} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TopComunitiesSection
