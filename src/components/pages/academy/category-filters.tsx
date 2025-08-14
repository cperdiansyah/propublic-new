import { Button } from '@/shared/components/ui/button'
import type { CategoryFilter } from '@/types/academy.types'

// Category Filters Component
interface CategoryFiltersProps {
  categories: CategoryFilter[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`
            ${
              activeCategory === category.id
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'border-red-500/30 text-cream/80 hover:border-red-500 hover:bg-red-500/10 bg-transparent hover:text-white'
            }
            transition-all duration-200 rounded-sm
          `}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
