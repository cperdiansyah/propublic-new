'use client'

import { useCallback, useState, useMemo, type ReactNode } from 'react'
import Link from 'next/link'
import { Plus, X } from 'lucide-react'

import OptimizedImageWithFallback from '@shared/components/optimized-image-with-fallback'
import { Card, CardContent } from '@/shared/components/ui/card'
import ROUTE from '@shared/config/pages'
import type { CarouselGameItem } from '@shared/types/home.types'

// Constants - Following DRY principle
const CARD_CONSTANTS = {
  ASPECT_RATIO: '[3/4]',
  TRANSITION_DURATION: {
    SHORT: '200ms',
    MEDIUM: '300ms',
    LONG: '500ms',
  },
  IMAGE_SIZES: {
    MOBILE: '50vw',
    DESKTOP: '33vw',
    SMALL_DESKTOP: '16vw',
  },
  FALLBACK_IMAGE: '/images/placeholder.png',
} as const

// Type definitions - Better type safety
interface GameCardProps {
  game?: CarouselGameItem
  variant?: 'default' | 'removable' | 'placeholder'
  onRemove?: (id: number) => void
  onClick?: () => void
  text?: string
  className?: string
  'aria-label'?: string
}

interface GameCardImageProps {
  game: CarouselGameItem
  priority?: boolean
  sizes: string
  className?: string
}

interface GameCardOverlayProps {
  children?: ReactNode
  showBlur?: boolean
}

// Extracted reusable image component - Following Single Responsibility Principle
const GameCardImage: React.FC<GameCardImageProps> = ({
  game,
  priority = false,
  sizes,
  className = '',
}) => {
  const imageClassName = useMemo(
    () =>
      `object-cover transition-transform duration-${CARD_CONSTANTS.TRANSITION_DURATION.LONG} group-hover:scale-110 ${className}`.trim(),
    [className],
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      <OptimizedImageWithFallback
        src={game.imageSrc}
        alt={`${game.name} game cover`}
        fill
        className={imageClassName}
        sizes={sizes}
        priority={priority}
        fallback={CARD_CONSTANTS.FALLBACK_IMAGE}
      />
    </div>
  )
}

// Extracted overlay component - Following DRY principle
const GameCardOverlay: React.FC<GameCardOverlayProps> = ({
  children,
  showBlur = true,
}) => (
  <>
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />

    {/* Conditional Blur Overlay */}
    {showBlur && (
      <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-xs transition-all duration-300" />
    )}

    {children}
  </>
)

// Enhanced main GameCard component with better error handling and accessibility
const GameCard: React.FC<GameCardProps> = ({
  game,
  variant = 'default',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  // All hooks must be called before any early returns
  const cardClassName = useMemo(
    () =>
      `overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow p-0 border-radius-propublic outline-card h-full ${className}`.trim(),
    [className],
  )

  const imageProps = useMemo(
    () => ({
      game: game || { name: '', slug: '', imageSrc: '', id: 0, path: '' },
      priority: false,
      sizes: `(max-width: 768px) ${CARD_CONSTANTS.IMAGE_SIZES.MOBILE}, ${CARD_CONSTANTS.IMAGE_SIZES.DESKTOP}`,
    }),
    [game],
  )

  if (!game?.slug || !game?.name) {
    // Input validation - Better error handling (after hooks)
    console.error('GameCard: Invalid game data provided', game)
    return null
  }

  return (
    <Link
      href={ROUTE.PUBLIC.GAME.DETAIL(game.slug)}
      aria-label={ariaLabel || `View details for ${game.name}`}
      className="focus:outline-none focus:ring-2 focus:ring-custom-primary focus:ring-offset-2 rounded-lg"
    >
      <Card className={cardClassName}>
        <div
          className={`relative border-none aspect-${CARD_CONSTANTS.ASPECT_RATIO}`}
        >
          <GameCardImage {...imageProps} />

          <GameCardOverlay>
            <CardContent className="bg-transparent border-none h-full">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <h3 className="text-xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-0">
                    {game.name}
                  </h3>
                </div>
              </div>
            </CardContent>
          </GameCardOverlay>
        </div>
      </Card>
    </Link>
  )
}
// Enhanced MyGameCard with better error handling and accessibility
export const MyGameCard: React.FC<GameCardProps> = ({
  game,
  onRemove,
  className = '',
  'aria-label': ariaLabel,
}) => {
  // All hooks must be called before any early returns
  const [isHovered, setIsHovered] = useState(false)

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      try {
        if (onRemove && game?.id) {
          onRemove(game.id)
        }
      } catch (error) {
        console.error('Error removing game:', error)
      }
    },
    [game?.id, onRemove],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        e.stopPropagation()
        handleRemove(e as unknown as React.MouseEvent)
      }
    },
    [handleRemove],
  )

  const cardClassName = useMemo(
    () =>
      `relative bg-white/5 backdrop-blur-sm !border-white/10 p-2 group cursor-pointer border-2 hover:!border-custom-primary transition-all overflow-hidden border-radius-propublic ${className}`.trim(),
    [className],
  )

  const removeButtonClassName = useMemo(
    () =>
      `absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 ${
        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`,
    [isHovered],
  )

  const imageProps = useMemo(
    () => ({
      game: game || { name: '', slug: '', imageSrc: '', id: 0, path: '' },
      priority: false,
      sizes: `(max-width: 768px) ${CARD_CONSTANTS.IMAGE_SIZES.MOBILE}, ${CARD_CONSTANTS.IMAGE_SIZES.SMALL_DESKTOP}`,
      className: 'transition-transform duration-300 group-hover:scale-110',
    }),
    [game],
  )

  // Input validation (after hooks)
  if (!game?.id || !game?.slug || !game?.name || !onRemove) {
    console.error('MyGameCard: Missing required props', { game, onRemove })
    return null
  }

  return (
    <Link
      href={ROUTE.PUBLIC.GAME.DETAIL(game.slug)}
      aria-label={ariaLabel || `View ${game.name} details`}
      className="focus:outline-none focus:ring-2 focus:ring-custom-primary focus:ring-offset-2 rounded-lg"
      onKeyDown={handleKeyDown}
    >
      <Card
        className={cardClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div
            className={`aspect-${CARD_CONSTANTS.ASPECT_RATIO} relative border-radius-propublic overflow-hidden`}
          >
            <GameCardImage {...imageProps} />

            <GameCardOverlay showBlur={true}>
              {/* Remove Button with better accessibility */}
              <button
                onClick={handleRemove}
                className={removeButtonClassName}
                aria-label={`Remove ${game.name} from saved games`}
                title={`Remove ${game.name}`}
              >
                <X className="w-4 h-4 text-white" aria-hidden="true" />
              </button>

              {/* Game Name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg truncate" title={game.name}>
                  {game.name}
                </h3>
              </div>
            </GameCardOverlay>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Enhanced AddGamePlaceholder with better accessibility and error handling
export const AddGamePlaceholder: React.FC<GameCardProps> = ({
  onClick,
  text = 'Add Game',
  className = '',
  'aria-label': ariaLabel,
}) => {
  // All hooks must be called before any early returns
  const handleClick = useCallback(() => {
    try {
      if (onClick && typeof onClick === 'function') {
        onClick()
      }
    } catch (error) {
      console.error('Error in AddGamePlaceholder onClick:', error)
    }
  }, [onClick])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick],
  )

  const cardClassName = useMemo(
    () =>
      `h-full border-2 border-dashed hover:border-custom-primary cursor-pointer transition-all group border-radius-propublic bg-white/5 backdrop-blur-sm border-white/10 focus:outline-none focus:ring-2 focus:ring-custom-primary focus:ring-offset-2 ${className}`.trim(),
    [className],
  )

  // Input validation (after hooks)
  if (!onClick || typeof onClick !== 'function') {
    console.error(
      'AddGamePlaceholder: onClick prop is required and must be a function',
    )
    return null
  }

  return (
    <button
      className={cardClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel || `Add new game: ${text}`}
    >
      <div className="h-full flex flex-col items-center justify-center p-4">
        <Plus
          className="w-8 h-8 text-gray-400 group-hover:text-custom-primary mb-2 transition-colors"
          aria-hidden="true"
        />
        <span className="text-gray-400 group-hover:text-custom-primary text-sm font-medium text-center transition-colors">
          {text}
        </span>
      </div>
    </button>
  )
}

// Factory Pattern - Create different card variants
export const createGameCard = (
  variant: GameCardProps['variant'] = 'default',
) => {
  switch (variant) {
    case 'removable':
      return MyGameCard
    case 'placeholder':
      return AddGamePlaceholder
    default:
      return GameCard
  }
}

// Compound Component Pattern - Export all related components
export const GameCardCompound = Object.assign(GameCard, {
  Removable: MyGameCard,
  Placeholder: AddGamePlaceholder,
  Image: GameCardImage,
  Overlay: GameCardOverlay,
  constants: CARD_CONSTANTS,
})

// Strategy Pattern - Different rendering strategies
export const GameCardStrategies = {
  default: (props: GameCardProps) => <GameCard {...props} />,
  removable: (props: GameCardProps) => <MyGameCard {...props} />,
  placeholder: (props: GameCardProps) => <AddGamePlaceholder {...props} />,
} as const

// Main export - Enhanced with better architecture
export default GameCard
