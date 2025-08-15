import {
  Calendar,
  Users,
  MessageSquare,
  BookOpen,
  X,
  Youtube,
  Music,
  MessageCircle,
} from 'lucide-react'
import type { CommunityData } from '@shared/types/community.types'
import { COMMUNITIES } from '@shared/config/exampleData'
import type { TypeCommunityItem } from '@shared/types/home.types'

export async function getCommunityData(
  slug: string,
): Promise<CommunityData | null> {
  // Mock data - replace with your API call
  const communities: Record<string, CommunityData> = {
    'orvant-valorant': {
      id: 'orvant-valorant',
      slug: 'orvant-valorant',
      name: "Orvant's Valorant Lounge",
      description: "Orvant's Valorant Lounge: From the Best to the Best",
      headerImage:
        'https://images.unsplash.com/photo-1542751371-adc38444a05e?w=400&h=200&fit=crop',
      subscriberCount: 1436,
      socialLinks: [
        { platform: 'X', url: '#', iconName: 'X' },
        { platform: 'YouTube', url: '#', iconName: 'Youtube' },
        { platform: 'TikTok', url: '#', iconName: 'Music' },
        { platform: 'Discord', url: '#', iconName: 'MessageCircle' },
      ],
      navigation: [
        {
          id: 'overview',
          label: 'Overview',
          href: `/community/${slug}`,
          iconName: 'Users',
        },
        {
          id: 'sessions',
          label: 'Sessions',
          href: `/community/${slug}/sessions`,
          iconName: 'Calendar',
          count: 7,
        },
        {
          id: 'guides',
          label: 'Guides',
          href: `/community/${slug}/guides`,
          iconName: 'BookOpen',
          count: 2,
        },
        {
          id: 'posts',
          label: 'Posts',
          href: `/community/${slug}/posts`,
          iconName: 'MessageSquare',
        },
      ],
    },
  }

  return communities['orvant-valorant']
  // return dataCommunities.find((item) => item.author === slug) || null;
  // return filteredCommunities || null;
}
