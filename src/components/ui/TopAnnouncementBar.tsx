'use client'

import { ArrowRight } from 'lucide-react'

interface TopAnnouncementBarProps {
  icon?: string
  text: string
  showArrow?: boolean
  variant?: 'default' | 'success' | 'warning' | 'info'
  className?: string
}

const TopAnnouncementBar = ({ 
  icon = "⚡", 
  text, 
  showArrow = true,
  variant = 'default',
  className = '' 
}: TopAnnouncementBarProps) => {
  const variantClasses = {
    default: 'bg-amber-50 dark:bg-amber-900 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    success: 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    warning: 'bg-orange-50 dark:bg-orange-900 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200',
    info: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  }

  const iconColors = {
    default: 'text-amber-600 dark:text-amber-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-orange-600 dark:text-orange-400',
    info: 'text-blue-600 dark:text-blue-400',
  }

  return (
    <div className={`fixed top-0 w-full z-50 ${variantClasses[variant]} border-b ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center space-x-2">
            {icon && (
              <span className={iconColors[variant]}>{icon}</span>
            )}
            <span className="text-xs md:text-sm font-medium font-cyber">{text}</span>
            {showArrow && (
              <ArrowRight className={`w-3 h-3 md:w-4 md:h-4 ${iconColors[variant]}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopAnnouncementBar 