import ComunitySlider from '@features/community/components/comunity-slider'
import SectionTitle from '@shared/components/section-title'
import type { TypeCommunityItem } from '@shared/types/home.types'
import type React from 'react'

interface ITopComunitiesSection {
  communities: TypeCommunityItem[]
}
const TopComunitiesSection: React.FC<ITopComunitiesSection> = ({
  communities,
}) => {
  return (
    <section className="bg-black relative geometric-bg pt-20 pb-5 min-h-screen lg:min-h-fit py-24 lg:py-0">
      <div className="pt-24 md:pt-44 px-5 z-10 relative">
        <SectionTitle
          title={
            <>
              Top Popular{' '}
              <span className="section-title-underline font-teko">
                Comunities!
              </span>
            </>
          }
          withButton
          btnText="Discover More Comunities"
          href="/comunity"
          buttonClassname="bg-custom-accent text-black hover:bg-custom-accent/90"
        />

        {/* List of Communities */}
        <ComunitySlider communities={communities} />
      </div>
    </section>
  )
}
export default TopComunitiesSection
