// src/types/academy-detail.types.ts
export interface CourseModule {
  id: string
  title: string
  duration: string
  description: string
  isLocked?: boolean
}

export interface CourseInstructor {
  id: string
  name: string
  title: string
  avatar: string
  bio: string
  achievements: string[]
}

export interface CourseReview {
  id: string
  userName: string
  userAvatar: string
  rating: number
  date: string
  comment: string
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'ewallet' | 'bank'
  name: string
  icon: string
  isPopular?: boolean
}

export interface PaymentFormData {
  paymentMethod: string
  agreeToTerms: boolean
}
