'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import StatusIndicator from '@/components/ui/StatusIndicator'
import KeyboardShortcut from '@/components/ui/KeyboardShortcut'
import BackgroundOverlay from '@/components/ui/BackgroundOverlay'
import AnimatedGrid from '@/components/ui/AnimatedGrid'

export default function Hero() {
  const [os, setOs] = useState<'windows' | 'mac' | 'other'>('other')

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes('win')) {
      setOs('windows')
    } else if (userAgent.includes('mac')) {
      setOs('mac')
    } else {
      setOs('other')
    }
  }, [])

  const getDownloadButtonText = () => {
    switch (os) {
      case 'windows':
        return 'Download for Windows'
      case 'mac':
        return 'Download for Mac'
      default:
        return 'Download Editor'
    }
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background thread-bg">
      {/* Animated Grid Overlay */}
      <AnimatedGrid gridSize={72} className="z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <h1 className="text-hero text-foreground font-cyber-heavy">
            AI CODE EDITOR FOR{' '}
            <span className="text-red-600">AI AGENTS</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-large max-w-2xl mx-auto font-cyber-alt text-muted-foreground">
            Create, deploy, and manage multiple AI coding agents in one powerful editor. 
                            Build the future of autonomous development with CodeboltAI.
          </p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-4"
          >
            <Link href="/download">
              <Button variant="primary" size="lg" shape="gaming" className="space-x-2 font-cyber">
                <span>{getDownloadButtonText()}</span>
                <KeyboardShortcut keys={['⌘', '⏎']} size="lg" className="ml-2" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Sub CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-sm font-cyber-alt"
          >
            Deploy autonomous coding agents • No setup required
          </motion.p>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-20"
        >
          <p className="text-sm text-muted-foreground mb-6 font-cyber-alt">
            POWERING AI DEVELOPMENT WORLDWIDE
          </p>
          
          {/* Status Indicators */}
          <div className="flex items-center justify-center space-x-8">
            <StatusIndicator status="online" label="AGENTS ONLINE" />
            <StatusIndicator status="info" label="AI READY" />
            <StatusIndicator status="warning" label="BETA ACCESS" />
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <BackgroundOverlay variant="gradient" gradientDirection="to-b" />
    </section>
  )
} 