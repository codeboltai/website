'use client'

import { motion } from 'framer-motion'

interface FloatingDotProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'indigo' | 'purple' | 'orange' | 'blue' | 'green' | 'red'
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  duration?: number
  delay?: number
  className?: string
}

const FloatingDot = ({ 
  size = 'md',
  color = 'indigo',
  position,
  duration = 6,
  delay = 0,
  className = ''
}: FloatingDotProps) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  }

  const colorClasses = {
    indigo: 'bg-indigo-400',
    purple: 'bg-purple-400',
    orange: 'bg-orange-400',
    blue: 'bg-blue-400',
    green: 'bg-green-400',
    red: 'bg-red-400',
  }

  const positionStyles = {
    ...(position.top && { top: position.top }),
    ...(position.bottom && { bottom: position.bottom }),
    ...(position.left && { left: position.left }),
    ...(position.right && { right: position.right }),
  }

  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute ${sizeClasses[size]} ${colorClasses[color]} rounded-full ${className}`}
      style={positionStyles}
    />
  )
}

export default FloatingDot 