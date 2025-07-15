// Type definitions for better maintainability and IntelliSense
export interface CarouselGameItem {
  readonly id: number
  readonly name: string
  readonly slug: string
  readonly path: string
  readonly imageSrc: string
}
export interface Brand {
  id: number
  name: string
  logo: string
  category: string
}

export interface ICourseItem {
  course_id: number
  course_title: string
  course_slug: string
  course_description: string | null
  course_image_url: string
  course_price: string
  order_count: string
  course_rating: string
}

export type TypeCommunityItem = {
  id: number
  name: string
  description: string
  author: string
  members: number
  posts: number
  sessions: number
  guides: number
  category: string
  avatar: string
  isVerified: boolean
  color: string
  headerImage?: string
  isFeatured?: boolean
}
