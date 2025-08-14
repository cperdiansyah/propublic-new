'use client'

interface TestimonialProps {
  avatar: string
  name: string
  title: string
  message: string
  className?: string
}

export const Testimonial = ({
  avatar,
  name,
  title,
  message,
  className = '',
}: TestimonialProps) => {
  return (
    <div
      className={`
      testimonial-card border-radius-propublic p-6 
      border border-custom-primary/20 ${className}
    `}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-custom-accent rounded-full flex items-center justify-center">
          <span
            className="text-dark-primary font-bold text-xl"
            aria-hidden="true"
          >
            {avatar}
          </span>
        </div>
        <div>
          <h3 className="font-bold text-cream">{name}</h3>
          <p className="text-cream/60 text-sm">{title}</p>
        </div>
      </div>
      <blockquote className="text-cream/80 italic">"{message}"</blockquote>
    </div>
  )
}
