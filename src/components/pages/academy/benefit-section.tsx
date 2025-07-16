import { Card, CardContent } from '@/components/ui/card'
import type { AcademyBenefit } from '@/types/academy.types'

// Benefits Section Component
interface BenefitsSectionProps {
  benefits: AcademyBenefit[]
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="mb-20 relative">
      {/* Section background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-red-950/20 rounded-3xl blur-3xl -z-10" />

      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          WHY GET THESE ACADEMY?
        </h2>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:overflow-x-visible md:pb-0">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="flex-shrink-0 w-64 md:w-auto">
            <BenefitCard benefit={benefit} />
          </div>
        ))}
      </div>
    </section>
  )
}

// Benefit Card Component
interface BenefitCardProps {
  benefit: AcademyBenefit
}

export function BenefitCard({ benefit }: BenefitCardProps) {
  const IconComponent = benefit.icon

  return (
    <Card className="group relative bg-dark-secondary/50 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden rounded-sm">
      <CardContent className="p-6 text-center space-y-4">
        {/* Icon */}
        <div
          className={`w-16 h-16 mx-auto bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm leading-tight uppercase tracking-wide">
            {benefit.title}
          </h3>
          {/* <p className="text-cream/70 text-xs leading-relaxed">
            {benefit.description}
          </p> */}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  )
}
