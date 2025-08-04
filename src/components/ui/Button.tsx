'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rectangle' | 'cut-corner' | 'clipped' | 'gaming' | 'cyber'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', shape = 'cut-corner', children, ...buttonProps }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'
    
    const variantClasses = {
      primary: 'bg-foreground text-background hover:bg-foreground/80 focus:ring-foreground border-2 border-foreground',
      secondary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 border-2 border-red-600',
      outline: 'bg-transparent text-foreground border-2 border-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-600 focus:ring-foreground',
    }
    
    const borderAnimationColors = {
      primary: 'bg-background',
      secondary: 'bg-white',
      outline: 'bg-red-600',
    }
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const shapeClasses = {
      rectangle: 'rounded-none',
      'cut-corner': 'cut-corner-button',
      clipped: 'clipped-button',
      gaming: 'gaming-button',
      cyber: 'cyber-button',
    }

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={buttonProps.onClick}
        disabled={buttonProps.disabled}
        type={buttonProps.type}
        form={buttonProps.form}
        name={buttonProps.name}
        value={buttonProps.value}
      >
        {/* Animated border overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute top-0 left-0 w-0 h-0.5 ${borderAnimationColors[variant]} group-hover:w-full transition-all duration-500 ease-out`}></div>
          <div className={`absolute top-0 right-0 w-0.5 h-0 ${borderAnimationColors[variant]} group-hover:h-full transition-all duration-500 ease-out delay-100`}></div>
          <div className={`absolute bottom-0 right-0 w-0 h-0.5 ${borderAnimationColors[variant]} group-hover:w-full transition-all duration-500 ease-out delay-200`}></div>
          <div className={`absolute bottom-0 left-0 w-0.5 h-0 ${borderAnimationColors[variant]} group-hover:h-full transition-all duration-500 ease-out delay-300`}></div>
        </div>

        {/* Background shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        
        <span className="relative z-10 flex items-center space-x-2">
          {children}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button 