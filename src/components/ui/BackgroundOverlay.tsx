'use client'

import FloatingDot from './FloatingDot'

interface BackgroundOverlayProps {
  variant?: 'gradient' | 'dots' | 'both'
  gradientDirection?: 'to-b' | 'to-t' | 'to-r' | 'to-l'
  showDots?: boolean
  className?: string
}

const BackgroundOverlay = ({ 
  variant = 'both',
  gradientDirection = 'to-b',
  showDots = true,
  className = ''
}: BackgroundOverlayProps) => {
  const gradientClasses = {
    'to-b': 'bg-gradient-to-b from-transparent via-background/50 to-background/80',
    'to-t': 'bg-gradient-to-t from-transparent via-background/50 to-background/80',
    'to-r': 'bg-gradient-to-r from-transparent via-background/50 to-background/80',
    'to-l': 'bg-gradient-to-l from-transparent via-background/50 to-background/80',
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient overlay */}
      {(variant === 'gradient' || variant === 'both') && (
        <div className={`absolute inset-0 ${gradientClasses[gradientDirection]}`}></div>
      )}
      
      {/* Floating dots */}
      {(variant === 'dots' || variant === 'both') && showDots && (
        <>
          <FloatingDot
            size="md"
            color="indigo"
            position={{ top: '25%', left: '25%' }}
            duration={6}
            delay={0}
          />
          <FloatingDot
            size="lg"
            color="purple"
            position={{ top: '33%', right: '25%' }}
            duration={8}
            delay={2}
          />
          <FloatingDot
            size="sm"
            color="orange"
            position={{ bottom: '33%', left: '33%' }}
            duration={7}
            delay={4}
          />
        </>
      )}
    </div>
  )
}

export default BackgroundOverlay 