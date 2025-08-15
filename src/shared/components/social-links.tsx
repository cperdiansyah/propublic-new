'use client'

import type React from 'react'
import { IconResolver } from '@shared/utils/iconMap'

type SocialLink = {
  platform: string
  url: string
  iconName: string // Changed to string
}

type SocialLinksProps = {
  links: Array<SocialLink>
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex gap-2">
      {links.map((link) => (
        <a key={link.platform} href={link.url}>
          <IconResolver iconName={link.iconName} />
        </a>
      ))}
    </div>
  )
}
