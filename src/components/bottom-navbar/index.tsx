import { checkMobile } from '@/utils/checkMobile'
import type React from 'react'
import { useId } from 'react'
import Link from 'next/link'

import { Compass, Gamepad2, House, Newspaper, ShoppingBag } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: <House /> },
  { name: 'Academy', href: '/academy', icon: <Compass /> },
  { name: 'Games', href: '/games', icon: <Gamepad2 /> },
  { name: 'Shop', href: '/shop', icon: <ShoppingBag /> },
  { name: 'News', href: '/news', icon: <Newspaper /> },
]

const BottomNavbar = () => {
  const bottomNavbarId = useId()
  if (!checkMobile) return
  return (
    <div id={bottomNavbarId} className="bottom-navbar-wrapper">
      {navigation.map((item) => (
        <NavigationItem key={item.name} {...item} />
      ))}
    </div>
  )
}

function NavigationItem({
  name,
  href,
  icon,
}: {
  name: string
  href: string
  icon: React.ReactNode
}) {
  return (
    <Link href={href} className="bottom-navbar-item">
      {icon}
    </Link>
  )
}

export default BottomNavbar
