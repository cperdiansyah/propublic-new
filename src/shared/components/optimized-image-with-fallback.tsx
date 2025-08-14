'use client'

import Image, { type ImageProps } from 'next/image'
import { useCallback, useState } from 'react'

interface OptimizedImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallback?: string
}

const OptimizedImageWithFallback: React.FC<OptimizedImageWithFallbackProps> = ({
  src,
  fallback = '/images/placeholder.png',
  onError,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src || fallback)
  const [hasErrored, setHasErrored] = useState(false)

  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!hasErrored && imageSrc !== fallback) {
        setHasErrored(true)
        setImageSrc(fallback)
      }

      if (onError) {
        onError(event)
      }
    },
    [hasErrored, imageSrc, fallback, onError],
  )

  return (
    <Image
      {...props}
      src={hasErrored ? fallback : src}
      onError={handleImageError}
      placeholder="blur"
      blurDataURL={hasErrored ? fallback : src}
    />
  )
}

export default OptimizedImageWithFallback
