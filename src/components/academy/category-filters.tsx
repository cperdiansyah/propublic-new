interface CategoryFiltersProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function CategoryFilters({
  activeCategory,
  setActiveCategory,
}: CategoryFiltersProps) {
  const categories = [
    'All Courses',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Pro Level',
  ]

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`filter-btn px-6 py-3 rounded-xl text-cream/80 font-medium ${
            activeCategory === category ? 'active' : ''
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
