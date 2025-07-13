import type { CarouselGameItem, ICourseItem } from '@/types/home.types'

export const GAMELIST: CarouselGameItem[] = [
  {
    id: 1,
    name: 'Valorant',
    slug: 'valorant',
    path: '/games/valorant',
    imageSrc: '/images/game-covers/valorant.jpg',
  },
  {
    id: 2,
    name: 'Apex Legends',
    slug: 'apex-legends',
    path: '/games/apex-legends',
    imageSrc: '/images/game-covers/apex-legends.jpg',
  },
  {
    id: 3,
    name: 'Mobile Legends',
    slug: 'mobile-legends',
    path: '/games/mobile-legends',
    imageSrc: '/images/game-covers/mobile-legends.jpg',
  },
  {
    id: 4,
    name: 'Dota 2',
    slug: 'dota-2',
    path: '/games/dota-2',
    imageSrc: '/images/game-covers/dota-2.jpg',
  },
  {
    id: 5,
    name: 'EA FC',
    slug: 'eafc',
    path: '/games/eafc',
    imageSrc: '/images/game-covers/eafc.jpg',
  },
] as const

export const COURSES: ICourseItem[] = [
  {
    course_id: 4,
    course_title: ' path to pro, jakarta - offline',
    course_slug: 'path-to-pro-jakarta-offline',
    course_description:
      '<p>Level up your esports career in just 4 intensive lessons (6 hours each)—just like how the pros do it. Train with access to pro scrims, deep match analysis, monthly performance reviews, career coaching, and real tryout opportunities with MPL/MDL teams.</p><p><br></p><h3><strong>Disclaimer</strong></h3><ol><li>Minimum Quota Requirement: A minimum of 10 students is required for the class to commence. If the quota is not met, the class may be rescheduled or canceled.</li><li>Refund or Credit Clause: In the event of cancellation due to low enrollment, participants will receive a full refund or credit towards a future class of equal value.</li><li>Tentative Schedule: Class schedule and session dates are tentative and subject to change based on participant count and coach availability.</li><li>Notification Clause: Participants will be notified at least 5 days in advance if the class will not proceed due to unmet minimum requirements.</li></ol>',
    course_image_url:
      'https://propublic-academy.s3.amazonaws.com/course/1747323402_Scarletto.png',
    course_price: '4000000.00',
    order_count: '3',
    course_rating: '0.0000',
  },
  {
    course_id: 1,
    course_title: '1:1 vip coaching - head instuctor: zeys ',
    course_slug: '1:1-vip-coaching-head-instuctor:-zeys',
    course_description:
      '<p>Train with a world-class coach, world champion, and former national team head coach. Get personalized insights, pro-level gameplay analysis, and tailored strategies to reach your goals. Perfect for players serious about leveling up.</p>',
    course_image_url:
      'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/course/1747323432_Scarletto.png',
    course_price: '500000.00',
    order_count: '1',
    course_rating: '0.0000',
  },
  {
    course_id: 6,
    course_title: 'test',
    course_slug: 'test',
    course_description: null,
    course_image_url:
      'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/course/1750096142_propublic.jpg',
    course_price: '16283000.00',
    order_count: '0',
    course_rating: '0.0000',
  },
  {
    course_id: 5,
    course_title: 'test',
    course_slug: 'test',
    course_description: null,
    course_image_url:
      'https://propublic-academy.s3.ap-southeast-1.amazonaws.com/course/1747409832_Scarletto.png',
    course_price: '16493000.00',
    order_count: '0',
    course_rating: '0.0000',
  },
  {
    course_id: 3,
    course_title: 'rank up - online',
    course_slug: 'rank-up-online',
    course_description:
      "<p>Become a rank god and break past the Mythical wall with 4 high-impact online sessions (3 hours each). Whether you're aiming to go semi-pro in community tournaments or just want to carry your friends and dominate ranked, you'll train like the best—exclusive pro scrims, advanced mechanics, and winning strategies included.</p>",
    course_image_url:
      'https://propublic-academy.s3.amazonaws.com/course/1747323413_Scarletto.png',
    course_price: '490000.00',
    order_count: '0',
    course_rating: '0.0000',
  },
] as const
