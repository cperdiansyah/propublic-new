'use client'

import ComunitiesCard from '@/components/blocks/community/community-card'
import type { TypeCommunityItem } from '@/types/home.types'
import type React from 'react'

interface IComunitySlider {
  communities: TypeCommunityItem[]
}
const ComunitySlider: React.FC<IComunitySlider> = ({ communities }) => {
  return (
    <div className="relative container mx-auto">
      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-6 m-5">
          {communities.map((item, i) => (
            <ComunitiesCard community={item} index={i} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComunitySlider
