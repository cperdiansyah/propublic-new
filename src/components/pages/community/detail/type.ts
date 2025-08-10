// TypeScript interfaces
interface SocialLink {
  platform: string
  url: string
  icon: React.ComponentType<any>
}

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  count?: number
  active?: boolean
}

interface CommunityData {
  id: string
  name: string
  description: string
  headerImage: string
  avatar?: string
  subscriberCount: number
  socialLinks: SocialLink[]
  navigation: NavigationItem[]
}
