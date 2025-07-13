import type { AutoplayType } from 'embla-carousel-autoplay'
import React from 'react'

// Custom hook for autoplay control
export function useAutoplayControl(
  autoplay: boolean,
  autoplayPlugin?: React.RefObject<AutoplayType>,
) {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true)
    if (autoplay && autoplayPlugin?.current) {
      autoplayPlugin.current.stop()
    }
  }, [autoplay, autoplayPlugin])

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false)
    if (autoplay && autoplayPlugin?.current) {
      autoplayPlugin.current.play()
    }
  }, [autoplay, autoplayPlugin])

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  }
}
