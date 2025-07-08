'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedGridProps {
  gridSize?: number
  className?: string
}

export default function AnimatedGrid({ 
  gridSize = 72, 
  className = '' 
}: AnimatedGridProps) {
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 })

  useEffect(() => {
    setMounted(true)
    
    const updateDimensions = () => {
      const cols = Math.floor(window.innerWidth / gridSize)
      const rows = Math.floor(window.innerHeight / gridSize)
      setDimensions({ cols, rows })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => window.removeEventListener('resize', updateDimensions)
  }, [gridSize])

  useEffect(() => {
    if (!mounted || dimensions.cols === 0 || dimensions.rows === 0) return

    const interval = setInterval(() => {
      // Randomly select 1-3 cells to light up
      const numCells = Math.floor(Math.random() * 3) + 1
      const newActiveCells = new Set<string>()
      
      for (let i = 0; i < numCells; i++) {
        const col = Math.floor(Math.random() * dimensions.cols)
        const row = Math.floor(Math.random() * dimensions.rows)
        newActiveCells.add(`${col}-${row}`)
      }
      
      setActiveCells(newActiveCells)
      
      // Clear cells after animation duration
      setTimeout(() => {
        setActiveCells(new Set())
      }, 1500)
    }, 2000)

    return () => clearInterval(interval)
  }, [dimensions, mounted])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted || dimensions.cols === 0 || dimensions.rows === 0) {
    return null
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: dimensions.rows }, (_, row) =>
        Array.from({ length: dimensions.cols }, (_, col) => {
          const cellId = `${col}-${row}`
          const isActive = activeCells.has(cellId)
          
          return (
            <motion.div
              key={cellId}
              className="absolute"
              style={{
                left: col * gridSize,
                top: row * gridSize,
                width: gridSize,
                height: gridSize,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.8
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              {isActive && (
                <motion.div
                  className="w-full h-full bg-red-500/20 border border-red-500/40"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0.7, 0], scale: [0.5, 1.1, 1, 0.8] }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeOut",
                    times: [0, 0.2, 0.8, 1]
                  }}
                  style={{
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.1)'
                  }}
                />
              )}
            </motion.div>
          )
        })
      )}
    </div>
  )
} 