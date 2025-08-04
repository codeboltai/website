'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

interface CTAButton {
  text: string
  variant: 'primary' | 'secondary' | 'outline'
  shape?: 'rectangle' | 'cut-corner' | 'clipped' | 'gaming' | 'cyber'
  href?: string
  onClick?: () => void
}

interface CTASectionProps {
  title: string
  description: string
  buttons: CTAButton[]
  backgroundColor?: 'white' | 'gray' | 'transparent'
  className?: string
}

export default function CTASection({
  title,
  description,
  buttons,
  backgroundColor = 'gray',
  className = ''
}: CTASectionProps) {
  const bgClasses = {
    white: 'bg-background',
    gray: 'bg-muted/30',
    transparent: 'bg-transparent'
  }

  return (
    <section className={`py-16 md:py-24 ${bgClasses[backgroundColor]} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber-heavy">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground font-cyber-alt">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                size="lg"
                shape={button.shape || 'gaming'}
                className="font-cyber"
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 