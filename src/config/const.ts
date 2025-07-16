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
