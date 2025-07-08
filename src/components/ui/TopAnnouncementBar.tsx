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
    default: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-orange-50 border-orange-200 text-orange-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  const iconColors = {
    default: 'text-amber-600',
    success: 'text-green-600',
    warning: 'text-orange-600',
    info: 'text-blue-600',
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