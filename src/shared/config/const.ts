import {
  Compass,
  Gamepad2,
  Home,
  Newspaper,
  ShoppingBag,
  SquarePlay,
} from 'lucide-react'

export interface NavItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: number
}

export const { NODE_ENV, NEXT_PUBLIC_API_URL } = process.env

export const navigation: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Academy', href: '/academy', icon: Compass },
  { label: 'Games', href: '/game', icon: Gamepad2 },
  { label: 'Shop', href: '/shop', icon: ShoppingBag },
  // { label: 'News', href: '/news', icon: Newspaper },
  { label: 'Replay', href: '/replay', icon: SquarePlay },
]

export const DELAY_AUTOPLAY_MS: number = 3000

export const COLORS = {
  redPrimary: '#FE0037',
  limeGreenSecondary: '#ffcc00',
}

export const GAME_SECTION_CONFIG = {
  MAX_GAMES: 10,
  CARD_WIDTH: 160, // 40 * 4 (w-40 = 10rem = 160px)
  CARD_GAP: 24, // gap-6 = 1.5rem = 24px
  DEFAULT_ADD_GAME_TEXT: 'Add Game',
  PLACEHOLDER_IMAGE: '/images/placeholder.png',
} as const
