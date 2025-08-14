import type { ElementType } from 'react'

type ShopFeatureCardProps = {
  Icon: ElementType
  title: string
  description: string
}

const ShopFeatureCard = ({
  Icon,
  title,
  description,
}: ShopFeatureCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
      <h3 className="text-white font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

export default ShopFeatureCard
