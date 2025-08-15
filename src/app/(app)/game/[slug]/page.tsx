import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import GameDetailContent from '@features/game-stats/components/detail'
import { GAMELIST } from '@shared/config/exampleData'
import { findGameBySlug, sanitizeGameDescription } from '@shared/utils/utils'

interface Params {
  slug: string
}

interface PageProps {
  params: Promise<Params>
}

export async function generateStaticParams(): Promise<Array<Params>> {
  return GAMELIST.map((game) => ({
    slug: game.slug,
  }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  try {
    const { slug } = await props.params
    const game = findGameBySlug(slug)

    if (!game) {
      return {
        title: 'Game Not Found',
        description: 'The requested game could not be found.',
      }
    }

    return {
      title: `${game.name} - ProPublic Gaming`,
      description: sanitizeGameDescription(game.name),
      openGraph: {
        title: game.name,
        description: `Master ${game.name} with ProPublic's expert coaching and community.`,
        images: [game.imageSrc],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error Loading Game',
      description: 'An error occurred while loading the game.',
    }
  }
}

export default async function GameDetailPage(props: PageProps) {
  try {
    const { slug } = await props.params
    const game = findGameBySlug(slug)

    if (!game) {
      notFound()
    }

    return <GameDetailContent game={game} />
  } catch (error) {
    console.error('Error loading game page:', error)
    notFound()
  }
}
