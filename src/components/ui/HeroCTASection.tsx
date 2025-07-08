'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

interface HeroCTAButton {
  text: string
  variant: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rectangle' | 'cut-corner' | 'clipped' | 'gaming' | 'cyber'
  className?: string
  onClick?: () => void
}

interface HeroCTASectionProps {
  title: string
  buttons: HeroCTAButton[]
  showIsometricCube?: boolean
  showBrandOverlay?: boolean
  brandText?: string
  className?: string
}

export default function HeroCTASection({
  title,
  buttons,
  showIsometricCube = true,
  showBrandOverlay = true,
  brandText = 'CodeboltAI',
  className = ''
}: HeroCTASectionProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="relative py-12 md:py-20 gradient-footer diagonal-lines">
        <div className="absolute inset-0 thread-bg-dense opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-cyber-heavy">
              {title}
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 md:pt-6">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant}
                  size={button.size || 'lg'}
                  shape={button.shape || 'cyber'}
                  className={button.className || 'font-cyber'}
                  onClick={button.onClick}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Isometric Cube - Hidden on mobile */}
        {showIsometricCube && (
          <div className="hidden md:block absolute bottom-8 right-8 opacity-20 z-10">
            <div className="w-16 h-16 transform rotate-12">
              <div className="w-full h-full bg-white/20 border border-white/30 transform rotate-45 skew-x-12 skew-y-12"></div>
            </div>
          </div>
        )}

        {/* Large Brand Name Overlay */}
        {showBrandOverlay && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="text-[20vw] font-black text-white/5 font-cyber-heavy leading-none">
              {brandText}
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 