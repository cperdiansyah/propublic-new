/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
'use client'

import SectionTitle from '@/components/common/section-title'
import { Card, CardContent } from '@/components/ui/card'
import { formatIDRCurrency } from '@/lib/formatCurrency'
import { Star } from 'lucide-react'
import Image from 'next/image'
import type React from 'react'
// import Plac

const AcademiesSection = () => {
  const courses = [
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
  ]

  return (
    <div className="py-20 pt-44 bg-black">
      <SectionTitle
        title={
          <>
            Top Popular{' '}
            <span className="section-title-underline">Academies!</span>
          </>
        }
        withButton
        btnText="Explore More Course"
        href="/academy"
        buttonClassname="bg-custom-accent text-black hover:bg-custom-accent/90"
      />
      <div className="academies-wrapper container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {courses.map((course) => (
          <AcademyCard
            key={course.course_id}
            id={course.course_id}
            name={course.course_title}
            rating={Number(course.course_rating)}
            image={course.course_image_url}
            price={Number(course.course_price)}
            description={course.course_description}
          />
        ))}
      </div>
    </div>
  )
}

interface CoachCardProps {
  id: string | number
  name: string
  description?: string | null
  rating: number
  image: string
  price: number
  // onSelect: (coachId: string) => void
}

const AcademyCard: React.FC<CoachCardProps> = ({
  name,
  description,
  rating,
  image,
  price,
  // onSelect,
}) => {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-600 absolute" />
            <div className="overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        )
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-600" />)
      }
    }
    return stars
  }

  return (
    <div
      className="group relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer border-radius-propublic"
      // onClick={() => onSelect(id)}
    >
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-black/60"></div>
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={500}
          height={500}
          blurDataURL={'/images/placeholder.png'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
          {name.toUpperCase()}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">{rating}</span>
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" /> */}
      <div className="absolute inset-0 group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:via-black/20 group-hover:to-transparent transition-all duration-200" />

      {/* Blur Overlay on Hover*/}
      <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500" />

      {/* Hover visible - Additional content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform  translate-y-4 hover:block opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 ">
        <p
          className="text-sm text-gray-200 mb-3 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description || '' }}
        ></p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-white">
            {formatIDRCurrency(price)}
          </span>
        </div>
      </div>
    </div>
  )
}

// export default CoachCard

export default AcademiesSection
