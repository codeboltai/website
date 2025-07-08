'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  highlight?: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

const SectionHeader = ({ 
  title, 
  highlight, 
  subtitle, 
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}: SectionHeaderProps) => {
  return (
    <div className={`text-center mb-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 font-cyber-heavy ${titleClassName}`}>
          {title}
          {highlight && (
            <>
              {' '}
              <span className="text-red-600">{highlight}</span>
            </>
          )}
        </h2>
        {subtitle && (
          <p className={`text-large max-w-3xl mx-auto font-cyber-alt ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default SectionHeader 