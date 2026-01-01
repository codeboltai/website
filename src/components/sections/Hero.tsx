'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen border-b border-border overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-12 gap-12 items-end mb-20">

            {/* Left Column - Headline */}
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Status Indicator */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
                    System Status: Learning
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
                  The Intelligent Runtime for{' '}
                  <br className="hidden md:block" />
                  <span className="text-muted-foreground">Autonomous Engineering.</span>
                </h1>
              </motion.div>
            </div>

            {/* Right Column - Description & CTA */}
            <div className="md:col-span-4 pb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Codebolt is an agentic IDE that goes beyond simple code completion.
                  While standard editors guess the next token, Codebolt&apos;s Horizon Mode
                  orchestrates a recursive swarm of agents to explore, compile, and
                  debug solutions in the background—decoupling deep reasoning from
                  your immediate keystrokes.
                </p>

                <div className="flex flex-col gap-4">
                  {/* Primary CTA */}
                  <Link
                    href="/newdownload"
                    className="inline-flex justify-between items-center w-full px-6 py-4 bg-primary hover:bg-cyan-400 transition-all duration-300 group"
                  >
                    <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground">
                      DOWNLOAD
                    </span>
                    <span className="text-primary-foreground group-hover:translate-x-1 transition-transform text-lg">
                      →
                    </span>
                  </Link>

                  {/* Secondary Link */}
                  <Link
                    href="#research"
                    className="group flex flex-col items-start gap-1 px-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors font-mono uppercase tracking-[0.15em]">
                        Read Research Paper
                      </span>
                      <span className="h-[1px] w-4 bg-border group-hover:bg-primary group-hover:w-8 transition-all" />
                    </div>
                    <span className="text-[9px] text-muted-foreground/70 font-mono italic">
                      &quot;Solving the Linearity Barrier in Recursive Swarms&quot; (2025)
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hero Image / IDE Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative">
              {/* Top border glow */}
              <div className="absolute -inset-px bg-gradient-to-b from-primary/30 via-transparent to-transparent rounded-lg opacity-50" />
              
              {/* IDE Preview Container */}
              <div className="relative rounded-lg border border-border bg-card shadow-2xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    {/* Window Controls */}
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Codebolt — Autonomous Software Engineering Runtime
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Horizon Mode
                    </span>
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </div>
                  </div>
                </div>

                {/* IDE Content Placeholder */}
                <div className="h-[350px] md:h-[400px] flex items-center justify-center bg-background">
                  <div className="text-center px-4">
                    <div className="w-16 h-16 mx-auto mb-4 border border-border rounded-lg flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
                        <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path d="M12 2V12M3 7L12 12M21 7L12 12M12 12V22" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <p className="text-muted-foreground font-mono text-sm">
                      [ IDE Interface Preview ]
                    </p>
                    <p className="text-muted-foreground/60 font-mono text-xs mt-2">
                      with Horizon Mode architecture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
