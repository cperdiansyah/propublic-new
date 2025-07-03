export default function HeroSection() {
  return (
    <section className="hero-pattern pt-28 pb-20 px-4 min-h-screen flex items-center hero-section">
      <div className="max-w-7xl mx-auto w-full z-1">
        <div className=" gap-12 items-center text-center">
          <div className="space-y-8">
            <div className="space-y-6 w-2/3 mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                We're changing how
                <span className="gradient-text"> gaming communities</span> are
                built
              </h1>
              <p className="text-xl md:text-2xl text-cream/80 leading-relaxed">
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
              <button
                className="border border-custom-accent hover:bg-custom-accent hover:text-dark-primary text-custom-accent px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                type="button"
              >
                Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center  space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-custom-accent rounded-full animate-pulse"></div>
                <span className="text-cream/60 font-medium">
                  28,000+ Active Gamers
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-custom-primary rounded-full animate-pulse"></div>
                <span className="text-cream/60 font-medium">
                  1,200+ Pro Coaches
                </span>
              </div>
            </div>
          </div>

          {/* <div className="relative">
            <div className="bg-gradient-to-br from-dark-secondary to-dark-primary rounded-3xl p-8 border border-custom-primary/20 animate-float">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-custom-accent rounded-full flex items-center justify-center">
                    <span className="text-dark-primary font-bold">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Pro Tournament Winner</h3>
                    <p className="text-cream/60">just joined the community</p>
                  </div>
                </div>
                <div className="bg-dark-primary/50 rounded-xl p-4">
                  <p className="text-cream/80">
                    "The coaching here is next level. Went from Diamond to
                    Master in 2 weeks!"
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
