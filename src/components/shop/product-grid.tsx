import { Star, ExternalLink } from 'lucide-react'

export default function ProductGrid() {
  const products = [
    {
      name: 'ProPublic Hoodie',
      description: 'Premium cotton blend hoodie with embroidered logo.',
      price: 79,
      rating: 4.8,
      category: 'Apparel',
      categoryColor: 'custom-primary',
      icon: '👕',
      gradient: 'from-custom-primary/20 to-custom-secondary/20',
    },
    {
      name: 'Pro Gaming Mouse Pad',
      description: 'XXL size with optimized surface for precision gaming.',
      price: 35,
      rating: 4.9,
      category: 'Gaming Gear',
      categoryColor: 'custom-accent',
      icon: '🖱️',
      gradient: 'from-custom-accent/20 to-custom-primary/20',
    },
    {
      name: 'Pro Gaming Headset',
      description: '7.1 surround sound with crystal clear mic.',
      price: 199,
      rating: 4.7,
      category: 'Gaming Gear',
      categoryColor: 'custom-accent',
      icon: '🎧',
      gradient: 'from-custom-primary/20 to-custom-accent/20',
      featured: true,
    },
    {
      name: 'Minimalist Pro Tee',
      description: 'Clean design with subtle ProPublic logo.',
      price: 39,
      rating: 4.6,
      category: 'Apparel',
      categoryColor: 'custom-primary',
      icon: '👔',
      gradient: 'from-custom-secondary/20 to-custom-primary/20',
    },
    {
      name: 'ProPublic Water Bottle',
      description: 'Stay hydrated during long gaming sessions.',
      price: 25,
      rating: 4.8,
      category: 'Accessories',
      categoryColor: 'blue-400',
      icon: '🥤',
      gradient: 'from-custom-primary/20 to-custom-secondary/20',
    },
    {
      name: 'Mechanical Gaming Keyboard',
      description: 'Tactile switches with RGB backlight.',
      price: 149,
      rating: 4.9,
      category: 'Gaming Gear',
      categoryColor: 'custom-accent',
      icon: '⌨️',
      gradient: 'from-custom-accent/20 to-custom-secondary/20',
    },
    {
      name: 'ProPublic Snapback',
      description: 'Adjustable cap with embroidered logo.',
      price: 29,
      rating: 4.7,
      category: 'Apparel',
      categoryColor: 'custom-primary',
      icon: '🧢',
      gradient: 'from-custom-secondary/20 to-custom-accent/20',
    },
    {
      name: 'Sticker Pack',
      description: '10-pack vinyl stickers, perfect for setup.',
      price: 15,
      rating: 4.9,
      category: 'Accessories',
      categoryColor: 'green-400',
      icon: '🏷️',
      gradient: 'from-custom-accent/20 to-custom-primary/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {products.map((product, index) => (
        <div
          key={index}
          className={`course-card rounded-3xl overflow-hidden ${product.featured ? 'featured' : ''}`}
        >
          <div
            className={`aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
          >
            <span className="text-3xl md:text-4xl">{product.icon}</span>
          </div>
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <span
                className={`bg-${product.categoryColor}/20 text-${product.categoryColor} px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium`}
              >
                {product.category}
              </span>
              <div className="flex items-center space-x-1">
                <Star
                  className="w-3 md:w-4 h-3 md:h-4 text-custom-accent"
                  fill="currentColor"
                />
                <span className="text-cream/70 text-xs md:text-sm">
                  {product.rating}
                </span>
              </div>
            </div>
            <h3 className="font-bold text-lg md:text-xl mb-2">
              {product.name}
            </h3>
            <p className="text-cream/70 mb-4 text-sm md:text-base">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-xl md:text-2xl font-bold gradient-text">
                ${product.price}
              </div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-custom-primary to-custom-secondary text-cream px-4 md:px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-xs md:text-sm inline-flex items-center space-x-1"
              >
                <span>Shop</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
