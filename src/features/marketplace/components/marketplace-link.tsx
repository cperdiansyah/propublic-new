import { ShoppingBag } from 'lucide-react'

type MarketplaceLinkProps = {
  href: string
  name: string
  gradient: string
  hoverGradient: string
  hoverShadow: string
  hoverBorder: string
}

const MarketplaceLink = ({
  href,
  name,
  gradient,
  hoverGradient,
  hoverShadow,
  hoverBorder,
}: MarketplaceLinkProps) => {
  const baseClasses =
    'group text-white font-bold px-10 py-4 rounded-xl border border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex items-center justify-center space-x-3 min-w-[200px] bg-gradient-to-r '

  const finalClasses = `b ${baseClasses} ${gradient} ${hoverGradient} ${hoverShadow} ${hoverBorder}`

  return (
    <a
      className={finalClasses}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
      <span className="text-lg font-teko">Shop on {name}</span>
    </a>
  )
}

export default MarketplaceLink
