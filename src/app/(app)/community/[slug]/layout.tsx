import { notFound } from 'next/navigation'
import { getCommunityData } from '@shared/utils/community-data'
import CommunityLayoutClient from '@features/community/components/detail/layout/community-layout-client'

interface CommunityLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function CommunityLayout({
  children,
  params,
}: CommunityLayoutProps) {
  const { slug } = await params
  const community = await getCommunityData(slug)
  if (!community) {
    notFound()
  }

  return (
    <CommunityLayoutClient community={community}>
      {children}
    </CommunityLayoutClient>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const community = await getCommunityData(slug)

  if (!community) return {}

  return {
    title: `${community.name} | Community`,
    description: community.description,
  }
}
