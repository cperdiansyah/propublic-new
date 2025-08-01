import type React from 'react'

interface ParticleGradientProps {
  children?: React.ReactNode
  className?: string
  isGeomtericBg?: boolean
}
const ParticleGradient: React.FC<ParticleGradientProps> = ({
  children,
  className,
  isGeomtericBg,
}) => {
  return (
    <section
      className={`relative  flex items-center justify-center overflow-hidden  ${className} ${isGeomtericBg && 'geometric-bg'}`}
    >
      {/* <!-- Particle Background --> */}
      {/* <div className="particles fixed z-10"> */}
      <div className="scan-line fixed " style={{ animationDelay: '0s' }}></div>
      <div
        className="scan-line fixed "
        style={{ left: '20%', animationDelay: '2s' }}
      ></div>
      <div
        className="scan-line fixed "
        style={{ left: '30%', animationDelay: '3s' }}
      ></div>
      <div
        className="scan-line fixed "
        style={{ left: '40%', animationDelay: '1s' }}
      ></div>
      <div
        className="scan-line fixed "
        style={{ left: '50%', animationDelay: '2s' }}
      />
      <div
        className="scan-line fixed "
        style={{ left: '60%', animationDelay: '3s' }}
      />
      <div
        className="scan-line fixed "
        style={{ left: '70%', animationDelay: '1s' }}
      />
      <div
        className="scan-line fixed "
        style={{ left: '80%', animationDelay: '2s' }}
      />
      <div
        className="scan-line fixed "
        style={{ left: '90%', animationDelay: '3s' }}
      />
      {/* </div> */}

      {/* <div className="scan-line fixed z-10"></div> */}

      {children}
    </section>
  )
}

export default ParticleGradient
