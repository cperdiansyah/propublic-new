import type React from 'react'

interface ParticleGradientProps {
  children?: React.ReactNode
  className?: string
}
const ParticleGradient: React.FC<ParticleGradientProps> = ({
  children,
  className,
}) => {
  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden geometric-bg ${className}`}
    >
      {/* <!-- Particle Background --> */}
      <div className="particles">
        <div
          className="particle"
          style={{ left: '10%', animationDelay: '0s' }}
        ></div>
        <div
          className="particle"
          style={{ left: '20%', animationDelay: '2s' }}
        ></div>
        <div
          className="particle"
          style={{ left: '30%', animationDelay: '4s' }}
        ></div>
        <div
          className="particle"
          style={{ left: '40%', animationDelay: '6s' }}
        ></div>
        <div
          className="particle"
          style={{ left: '50%', animationDelay: '8s' }}
        />
        <div
          className="particle"
          style={{ left: '60%', animationDelay: '1s' }}
        />
        <div
          className="particle"
          style={{ left: '70%', animationDelay: '3s' }}
        />
        <div
          className="particle"
          style={{ left: '80%', animationDelay: '5s' }}
        />
        <div
          className="particle"
          style={{ left: '90%', animationDelay: '7s' }}
        />
      </div>

      {children}
    </section>
  )
}

export default ParticleGradient
