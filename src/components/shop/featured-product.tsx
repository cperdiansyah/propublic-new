import { Star, Heart, ExternalLink } from 'lucide-react'

export default function FeaturedProduct() {
  return (
    <div className="bg-gradient-to-r from-custom-primary/20 via-custom-secondary/20 to-custom-accent/20 rounded-3xl p-6 md:p-8 mb-12 md:mb-16 border border-custom-primary/30">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-custom-accent/20 px-3 md:px-4 py-2 rounded-full mb-4">
            <Star
              className="w-4 md:w-5 h-4 md:h-5 text-custom-accent"
              fill="currentColor"
            />
            <span className="text-custom-accent font-semibold text-sm md:text-base">
              Bestseller
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            ProPublic <span className="gradient-text">Gaming Jersey</span>
          </h2>
          <p className="text-cream/80 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
            Premium gaming jersey worn by our sponsored pro players.
            Moisture-wicking fabric, ergonomic design, and bold ProPublic
            branding. Available in multiple colorways.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-6 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-custom-accent flex-shrink-0" />
              <span className="text-cream/70">2,847 sold</span>
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-2xl md:text-3xl font-bold">
              <span className="gradient-text">$69</span>
              <span className="text-base md:text-lg text-cream/50 line-through ml-2">
                $89
              </span>
            </div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:shadow-lg transition-all glow text-sm md:text-base inline-flex items-center space-x-2"
            >
              <span>Shop Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-dark-custom-secondary to-dark-custom-primary rounded-2xl p-6 md:p-8 border border-custom-primary/20">
            <div className="aspect-square bg-gradient-to-br from-custom-primary/20 to-custom-secondary/20 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl md:text-3xl font-bold text-cream">
                    P
                  </span>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2">
                  Gaming Jersey
                </h3>
                <p className="text-cream/60 text-xs md:text-sm">
                  Premium Pro Collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
