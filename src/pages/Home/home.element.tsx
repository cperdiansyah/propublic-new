import { Button } from '@/components/ui/button'
import { Book, CalendarClock, TvMinimalPlay, Users } from 'lucide-react'
import type React from 'react'

export const HeroSection = () => {
  return (
    <section className="bg-primary-gradeint pt-28 pb-20 px-4 min-h-screen flex items-center bg-dark-primary ">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center lg:text-left ">
                We're changing how{' '}
                <span className="gradient-text">gaming communities </span>
                are built
              </h1>
              <p className="text-xl md:text-2xl text-cream/80 text-center lg:text-left">
                Connect with the best players, learn from pros, and build
                lasting relationships in the ultimate gaming community platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-to-r from-custom-primary to-custom-draker-primary text-cream px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all glow h-auto cursor-pointer">
                Join Community Free
              </Button>
              <Button className="border bg-transparent border-custom-secondary hover:bg-custom-secondary hover:text-dark-primary text-accent px-8 py-4 rounded-xl font-semibold text-lg transition-all h-auto cursor-pointer">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4 justify-center lg:justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-custom-secondary rounded-full animate-pulse"></div>
                <span className="text-cream/60 font-medium">
                  28,000+ Active Gamers
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-custom-primary rounded-full"></div>
                <span className="text-cream/60 font-medium">
                  1,200+ Pro Coaches
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-dark-secondary to-dark-primary rounded-3xl p-8 border border-custom-primary/20 animate-float">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
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
          </div>
        </div>
      </div>
    </section>
  )
}

type TypeHomeService = {
  icon: React.ReactNode
  title: string
  description: string
}

function CardFeature({ title, icon, description }: TypeHomeService) {
  return (
    <div className="card-hover bg-dark-secondary/80 border border-dark-tertiary rounded-3xl p-8 group">
      <div className="flex items-start space-x-6">
        <div className="w-16 h-16 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4 group-hover:text-custom-primary transition-colors">
            {title}
          </h3>
          <p className="text-cream/70 text-lg leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export const HomeServices = () => {
  const services: TypeHomeService[] = [
    {
      icon: <Users />,
      title: 'Communities',
      description:
        "There's safety in numbers. Support your favorite players and creators, share strategies with your peers, and find your next playgroup.",
    },
    {
      icon: <TvMinimalPlay />,
      title: '1-on-1 Sessions',
      description:
        'Face-time with the best in the game. Get personalized coaching, play co-op, or just hang out with your favorite players.',
    },
    {
      icon: <CalendarClock />,
      title: 'Live Events',
      description:
        'Gaming events without the expensive drinks. Learn, discover, and connect with your internet friends.',
    },
    {
      icon: <Book />,
      title: 'Expert Guides',
      description:
        "Greatness leaves clues. We're building the modern Library of Alexandria for gaming knowledge.",
    },
  ]
  return (
    <section className="py-24 px-4 feature-grid">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to{' '}
            <span className="gradient-text">dominate</span>
          </h2>
          <p className="text-xl text-cream/70 max-w-3xl mx-auto">
            From 1-on-1 coaching to massive tournaments, we've built the
            complete ecosystem for competitive gaming.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((services, index) => (
            <CardFeature key={`${index + services.title}`} {...services} />
          ))}
        </div>
      </div>
    </section>
  )
}
