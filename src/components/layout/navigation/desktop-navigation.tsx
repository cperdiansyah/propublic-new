import { navigation } from '@/config/const'
import Link from 'next/link'
import React from 'react'

const Desktopnavigation = () => {
  const newNavigation = navigation.filter((item) => item.label !== 'Home')
  return (
    <div className=" gap-3 text-white list-none capitalize font-semibold md:flex hidden p-5">
      {newNavigation.map((link) => {
        return (
          <li
            key={link.label}
            className="p-3 hover:text-custom-secondary transition-200s "
          >
            <Link href={link.href} className="text-xl">
              {link.label}
            </Link>
          </li>
        )
      })}
    </div>
  )
}

export default Desktopnavigation
