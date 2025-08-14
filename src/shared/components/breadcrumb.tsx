import React from 'react'

export interface BreadcrumbItemData {
  href?: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItemData[]
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
}) => {
  return (
    <nav
      className={`breadcrumb-container inline-flex items-center text-xs sm:text-sm bg-gradient-to-r from-dark-secondary/80 to-dark-primary/80 border border-custom-primary/20 backdrop-blur-[10px] rounded-full px-3 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-8 shadow-lg  overflow-x-auto ${className} flex-wrap w-full`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <BreadcrumbItem
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={item.isActive}
          />
          {index < items.length - 1 && (
            <span className="breadcrumb-separator text-cream/40 text-xs mx-1 sm:mx-3  xs:inline">
              ▶
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

// Reusable breadcrumb item component
interface BreadcrumbItemProps {
  href?: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

const BreadcrumbItem = ({
  href,
  icon,
  label,
  isActive = false,
}: BreadcrumbItemProps) => {
  const content = (
    <div className="breadcrumb-item flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:text-custom-primary hover:-translate-y-[1px] whitespace-nowrap">
      <span className="breadcrumb-icon w-3 h-3 sm:w-4 sm:h-4 opacity-70 flex-shrink-0">
        {icon}
      </span>
      <span
        className={`${isActive ? 'breadcrumb-current' : ''} truncate max-w-[80px] sm:max-w-none`}
      >
        {label}
      </span>
    </div>
  )

  if (href && !isActive) {
    return (
      <a href={href} className="hover:text-custom-accent transition-colors">
        {content}
      </a>
    )
  }

  return content
}

export default Breadcrumb
