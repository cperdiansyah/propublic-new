'use client'

import BackgroundEffects from '@/components/blocks/effects/grid-glow'
import GameSlider from '@/components/blocks/gaming/game-slider'
import Marquee from '@/components/common/Marquee'
import { COLORS } from '@/config/const'
import type { CarouselGameItem } from '@/types/home.types'

interface IGameSection {
  games?: CarouselGameItem[]
}
export default function HeroSection({ games }: IGameSection) {
  return (
    <section className="bg-black flex flex-col items-center hero-section max-w-screen min-h-screen lg:min-h-fit py-32 relative ">
      <BackgroundEffects className="z-1 overflow-hidden" />

      <div className="max-w-7xl m-auto w-full z-1  px-4 ">
        <div className=" gap-12 items-center text-center">
          <div className="space-y-5 ">
            <div className="space-y-6 lg:w-2/3 mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-6xl font-black leading-tight capitalize">
                We're changing how
                <span className="gradient-text"> gaming communities</span> are
                built
              </h1>
              <p className="text-lg md:text-lg text-cream/80 leading-relaxed">
                {/* Connect with the best players, learn from pros, and build
                lasting relationships in the ultimate gaming community platform. */}
                The all-in-one platform for Southeast Asia’s gamers and coaches
                — learn, grow, and monetize your skills.
              </p>
            </div>

            <GameSlider games={games} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0  w-full">
        <PropublicMarquee />
      </div>
    </section>
  )
}

function PropublicMarquee() {
  return (
    <div className="propublic-marquee-wrapper relative h-full w-full">
      <Marquee text="SCROLL TO EXPLORE" direction="left" />
      <div className="react-marquee-red-line h-full">
        <Marquee
          text="UNLEASH YOUR POTENTIAL"
          background={COLORS.redPrimary}
          color="white"
          direction="right"
        />
      </div>
      <div className="marque-content relative"></div>
    </div>
  )
}
