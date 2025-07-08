'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface AnnouncementBarProps {
  icon?: string
  text: string
  IconComponent?: LucideIcon
  variant?: 'default' | 'success' | 'warning' | 'info'
  className?: string
}

const AnnouncementBar = ({ 
  icon, 
  text, 
  IconComponent, 
  variant = 'default',
  className = '' 
}: AnnouncementBarProps) => {
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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2 z-10 ${className}`}
    >
      <div className={`flex items-center space-x-1.5 md:space-x-2 ${variantClasses[variant]} border px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium font-cyber-alt`}>
        {icon && (
          <span className={`text-xs md:text-sm ${iconColors[variant]}`}>{icon}</span>
        )}
        {IconComponent && (
          <IconComponent className={`w-3 h-3 md:w-4 md:h-4 ${iconColors[variant]}`} />
        )}
        <span className="font-cyber text-xs md:text-sm">{text}</span>
        {IconComponent && (
          <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
        )}
      </div>
    </motion.div>
  )
}

export default AnnouncementBar 