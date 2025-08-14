export interface SocialLink {
  platform: string
  url: string
  // icon: React.ComponentType<any>;
  iconName: string
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  // icon: React.ComponentType<any>;
  count?: number
  iconName: string
}

export interface CommunityData {
  id: string
  slug: string
  name: string
  description: string
  headerImage: string
  avatar?: string
  subscriberCount: number
  socialLinks: SocialLink[]
  navigation: NavigationItem[]
}
