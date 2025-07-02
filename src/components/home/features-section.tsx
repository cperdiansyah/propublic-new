import { Users, Video, Calendar, BookOpen } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Communities',
      description:
        "There's safety in numbers. Support your favorite players and creators, share strategies with your peers, and find your next playgroup.",
      gradient: 'from-primary to-secondary',
    },
    {
      icon: Video,
      title: '1-on-1 Sessions',
      description:
        'Face-time with the best in the game. Get personalized coaching, play co-op, or just hang out with your favorite players.',
      gradient: 'from-accent to-primary',
    },
    {
      icon: Calendar,
      title: 'Live Events',
      description:
        'Gaming events without the expensive drinks. Learn, discover, and connect with your internet friends.',
      gradient: 'from-secondary to-accent',
    },
    {
      icon: BookOpen,
      title: 'Expert Guides',
      description:
        "Greatness leaves clues. We're building the modern Library of Alexandria for gaming knowledge.",
      gradient: 'from-primary via-accent to-secondary',
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
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="card-hover bg-dark-secondary/80 border border-dark-tertiary rounded-3xl p-8 group"
              >
                <div className="flex items-start space-x-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent className="w-8 h-8 text-cream" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-cream/70 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
