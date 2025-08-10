'use client'
import { Card, CardContent } from '@/components/ui/card'
import type { CarouselGameItem } from '@/types/home.types'
import Image from 'next/image'
import Link from 'next/link'

interface IGameCard {
  game: CarouselGameItem
}
const GameCard: React.FC<IGameCard> = ({ game }) => {
  return (
    <Link href={`/game/${game.slug}`}>
      <Card className="overflow-hidden group cursor-pointer  hover:shadow-lg transition-shadow p-0 border-radius-propublic outline-card h-full">
        <div className="relative border-none aspect-[3/4]">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={game.imageSrc || `/images/placeholder.png`}
              alt={game.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={false}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />

          {/* Blur Overlay on Hover */}
          <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-xs transition-all duration-300" />

          <CardContent className=" bg-transparent  border-none h-full">
            <div className=" bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center h-full">
              <span className="text-2xl fonpy-10 md:py-15t-bold text-blue-600">
                {game.name.charAt(0)}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {/* Always visible - Product name */}

              {/* Hover visible - Additional content */}
              <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                <p className="text-xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-0">
                  {game.name}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
export default GameCard
