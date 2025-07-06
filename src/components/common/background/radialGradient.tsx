import type React from 'react'

interface RadialGradientProps {
  /** X position of gradient center (0-100) */
  x?: number
  /** Y position of gradient center (0-100) */
  y?: number
  /** Primary color (defaults to red) */
  primaryColor?: string
  /** Background color (defaults to black) */
  backgroundColor?: string
  /** Primary color opacity (0-1) */
  primaryOpacity?: number
  /** Background opacity (0-1) */
  backgroundOpacity?: number
  /** Additional CSS classes */
  className?: string
  /** Children to render inside the gradient */
  children?: React.ReactNode
}

const RadialGradient: React.FC<RadialGradientProps> = ({
  x = 50,
  y = 50,
  primaryColor = 'rgb(220, 38, 38)', // red-600
  backgroundColor = 'rgb(0, 0, 0)', // black
  primaryOpacity = 0.3,
  backgroundOpacity = 0.8,
  className = '',
  children,
}) => {
  const gradientStyle = {
    background: `radial-gradient(circle at ${x}% ${y}%, 
      ${primaryColor.replace('rgb(', 'rgba(').replace(')', `, ${primaryOpacity})`)} 0%, 
      ${primaryColor.replace('rgb(', 'rgba(').replace(')', `, ${primaryOpacity * 0.5})`)} 15%, 
      ${backgroundColor.replace('rgb(', 'rgba(').replace(')', `, ${backgroundOpacity})`)} 50%)`,
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={gradientStyle}
    >
      {children}
    </div>
  )
}

export default RadialGradient
