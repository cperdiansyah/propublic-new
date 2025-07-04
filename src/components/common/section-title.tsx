import { Button } from '@/components/ui/button'
import type React from 'react'
import { useState, useEffect } from 'react'

interface SectionTitleProps {
  title?: string | React.ReactElement
  subTitle?: string | React.ReactElement
  withButton?: boolean
  btnText?: string
  href?: string
  center?: boolean
  // customStyles?: React.CSSProperties
  className?: string
  buttonClassname?: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title = '',
  subTitle = '',
  withButton = false,
  btnText = '',
  href = '#', // Default href for the link
  center,
  className,
  buttonClassname,
}) => {
  return (
    <div
      className={`section-title-wrapper container mx-auto flex flex-col items-center justify-between ${center && 'text-center justify-center'} ${className} `}
    >
      <div>
        <h1 className="section-title-title">{title}</h1>
        <p className="section-title-subtitle">{subTitle}</p>
      </div>
      {withButton && (
        <Button
          variant={'secondary'}
          size={'default'}
          className={buttonClassname}
        >
          {/* Using a standard <a> tag as next/link is specific to Next.js */}
          <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
            {btnText}
          </a>
        </Button>
      )}
    </div>
  )
}

export default SectionTitle
