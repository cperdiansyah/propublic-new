interface CategoryFiltersProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function CategoryFilters({
  activeCategory,
  setActiveCategory,
}: CategoryFiltersProps) {
  const categories = ['All Products', 'Apparel', 'Gaming Gear', 'Accessories']

  return (
    <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8 md:mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`filter-btn px-4 md:px-6 py-2 md:py-3 rounded-xl text-cream/80 font-medium text-sm md:text-base ${
            activeCategory === category ? 'active' : ''
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
