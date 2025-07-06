import Marquee from '@/components/common/Marquee'
import { COLORS } from '@/config/const'

export default function HeroSection() {
  return (
    <section className="bg-black pt-28 pb-20 px-4 min-h-screen flex flex-col items-center hero-section max-w-screen">
      <div className="max-w-7xl m-auto w-full z-1 lg:py-20">
        <div className=" gap-12 items-center text-center">
          <div className="space-y-8">
            <div className="space-y-6 lg:w-2/3 mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight capitalize">
                We're changing how
                <span className="gradient-text"> gaming communities</span> are
                built
              </h1>
              <p className="text-2xl md:text-2xl text-cream/80 leading-relaxed">
                {/* Connect with the best players, learn from pros, and build
                lasting relationships in the ultimate gaming community platform. */}
                The all-in-one platform for Southeast Asia’s gamers and coaches
                — learn, grow, and monetize your skills.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center ">
              <button
                className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all glow"
                type="button"
              >
                Join Community
              </button>
            </div>

            <div className="flex items-center justify-center  space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-custom-accent rounded-full animate-pulse"></div>
                <span className="text-cream/60 font-medium text-lg">
                  28,000+ Active Gamers
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-custom-primary rounded-full animate-pulse"></div>
                <span className="text-cream/60 font-medium text-lg">
                  1,200+ Pro Coaches
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PropublicMarquee />
    </section>
  )
}

function PropublicMarquee() {
  return (
    <div className="propublic-marquee-wrapper absolute bottom-0 max-w-screen">
      <div className="marque-content relative">
        <Marquee text="SCROLL TO EXPLORE" direction="left" />
        <div className="react-marquee-red-line ">
          <Marquee
            text="UNLEASH YOUR POTENTIAL"
            background={COLORS.redPrimary}
            color="white"
            direction="right"
          />
        </div>
      </div>
    </div>
  )
}
