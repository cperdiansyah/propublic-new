import { Clock, Users, Star } from 'lucide-react'

export default function FeaturedCourse() {
  return (
    <div className="bg-gradient-to-r from-custom-primary/20 via-custom-secondary/20 to-custom-accent/20 rounded-3xl p-8 mb-16 border border-custom-primary/30">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-custom-accent/20 px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5 text-custom-accent" fill="currentColor" />
            <span className="text-custom-accent font-semibold">
              Featured Course
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Zero to <span className="gradient-text">Radiant</span>
          </h2>
          <p className="text-cream/80 text-lg mb-6 leading-relaxed">
            Master Valorant with our comprehensive course. Learn from
            professional players who've competed at the highest level. Cover
            everything from crosshair placement to advanced team strategies.
          </p>
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-custom-accent" />
              <span className="text-cream/70">12 hours content</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-custom-accent" />
              <span className="text-cream/70">2,847 students</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-custom-accent"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-cream/70">4.9 (1,247)</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold">
              <span className="gradient-text">$79</span>
              <span className="text-lg text-cream/50 line-through ml-2">
                $129
              </span>
            </div>
            <button
              className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all glow"
              type="button"
            >
              Enroll Now
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-dark-custom-secondary to-dark-custom-primary rounded-2xl p-8 border border-custom-primary/20">
            <div className="aspect-video bg-dark-custom-primary/50 rounded-xl flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-custom-primary rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-cream border-y-[12px] border-y-transparent ml-1"></div>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">
              Preview: Crosshair Placement Fundamentals
            </h3>
            <p className="text-cream/60 text-sm">
              Watch how proper crosshair placement can instantly improve your
              aim and reaction time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
