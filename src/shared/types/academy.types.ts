// Types
export interface AcademyBenefit {
  readonly id: number
  readonly icon: React.ComponentType<{ className?: string }>
  readonly title: string
  readonly description: string
  readonly gradient: string
}

export interface CategoryFilter {
  readonly id: string
  readonly label: string
  readonly count: number
}
