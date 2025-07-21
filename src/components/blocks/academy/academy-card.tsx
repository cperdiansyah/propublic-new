/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */

import { formatIDRCurrency } from '@/lib/formatCurrency'
import renderStars from '@/utils/renderStars'
import Image from 'next/image'
import Link from 'next/link'

interface IAcademyCard {
  id: string | number
  name: string
  description?: string | null
  rating: number
  image: string
  price: number
  // onSelect: (coachId: string) => void
  slug: string
}

const AcademyCard: React.FC<IAcademyCard> = ({
  name,
  description,
  rating,
  image,
  price,
  // onSelect,
  slug,
}) => {
  return (
    <Link href={`/academy/${slug}`}>
      <div
        className="group relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer border-radius-propublic"
        // onClick={() => onSelect(id)}
      >
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-black/60"></div>
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            width={500}
            height={500}
            blurDataURL={'/images/placeholder.png'}
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
            {name.toUpperCase()}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">{rating}</span>
              <div className="flex items-center gap-1">
                {renderStars(rating)}
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:via-black/20 group-hover:to-transparent transition-all duration-200" />

        {/* Blur Overlay on Hover*/}
        <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500" />

        {/* Hover visible - Additional content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 hover:block opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          <p
            className="text-base text-gray-200 mb-3 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: description || '' }}
          ></p>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">
              {formatIDRCurrency(price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default AcademyCard
