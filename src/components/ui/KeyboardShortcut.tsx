'use client'

interface KeyboardShortcutProps {
  keys: string[]
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const KeyboardShortcut = ({ 
  keys, 
  className = '',
  size = 'md'
}: KeyboardShortcutProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div className={`flex items-center space-x-1 text-white opacity-80 ${className}`}>
      {keys.map((key, index) => (
        <span key={index} className={`${sizeClasses[size]} ${index === keys.length - 1 ? '' : 'mr-1'}`}>
          {key}
        </span>
      ))}
    </div>
  )
}

export default KeyboardShortcut 