'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

function HeroPreview() {
  return (
    <div className="relative rounded-lg border border-neutral-800/50 shadow-2xl shadow-black/50 bg-[#0A0A0A] overflow-hidden">
      {/* Subtle top sheen */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div className="relative aspect-[16/9] w-full">
        <svg viewBox="0 0 1600 900" className="absolute inset-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cb-hero-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect x="0" y="0" width="1600" height="900" fill="#050505" />

          {/* Grid */}
          <g opacity="0.25">
            {Array.from({ length: 40 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="900" stroke="#171717" strokeWidth="1" />
            ))}
            {Array.from({ length: 23 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 40} x2="1600" y2={i * 40} stroke="#171717" strokeWidth="1" />
            ))}
          </g>

          {/* Main panel */}
          <rect x="120" y="120" width="1360" height="660" fill="#0A0A0A" stroke="#27272A" strokeWidth="2" />

          {/* Title strip */}
          <rect x="120" y="120" width="1360" height="56" fill="#080808" stroke="#27272A" strokeWidth="0" />
          <circle cx="152" cy="148" r="6" fill="#3F3F46" />
          <circle cx="174" cy="148" r="6" fill="#3F3F46" />
          <circle cx="196" cy="148" r="6" fill="#3F3F46" />
          <rect x="260" y="140" width="280" height="16" rx="2" fill="#171717" />

          {/* Left column content blocks */}
          <rect x="170" y="230" width="520" height="18" fill="#FAFAFA" opacity="0.9" />
          <rect x="170" y="260" width="420" height="18" fill="#A3A3A3" opacity="0.65" />
          <rect x="170" y="310" width="560" height="10" fill="#737373" opacity="0.55" />
          <rect x="170" y="330" width="520" height="10" fill="#737373" opacity="0.45" />
          <rect x="170" y="350" width="480" height="10" fill="#737373" opacity="0.4" />

          {/* Right "diagram" */}
          <rect x="820" y="230" width="590" height="360" fill="#050505" stroke="#27272A" strokeWidth="2" />
          <rect x="860" y="270" width="200" height="90" fill="#0A0A0A" stroke="#3F3F46" strokeWidth="2" />
          <rect x="1170" y="270" width="200" height="90" fill="#0A0A0A" stroke="#3F3F46" strokeWidth="2" />
          <path d="M1060 315 L1170 315" stroke="#3F3F46" strokeWidth="2" strokeDasharray="8 10" />
          <circle cx="1060" cy="315" r="6" fill="#06b6d4" opacity="0.9" />
          <circle cx="1170" cy="315" r="6" fill="#06b6d4" opacity="0.9" />
          <path d="M900 470 C980 410 1070 410 1150 470" stroke="#06b6d4" strokeOpacity="0.35" strokeWidth="3" fill="none" />
          <path d="M900 510 C980 450 1070 450 1150 510" stroke="#06b6d4" strokeOpacity="0.2" strokeWidth="3" fill="none" />

          {/* Accent sweep */}
          <rect x="120" y="120" width="1360" height="660" fill="url(#cb-hero-sheen)" />
        </svg>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="bg-background text-foreground min-h-screen border-b border-border font-sans antialiased relative overflow-hidden dark:bg-[#050505] dark:text-white dark:border-neutral-900">
      {/* Grid Background (Dropstone) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 dark:opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="pt-32 pb-24 px-6 relative z-10">
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
                <h1 className="text-5xl md:text-8xl font-medium tracking-tighter text-foreground dark:text-white leading-[0.9]">
                  The Intelligent Runtime for{' '}
                  <br />
                  <span className="text-muted-foreground dark:text-neutral-500">Autonomous Engineering.</span>
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
                <p className="text-lg text-muted-foreground dark:text-neutral-400 font-light leading-relaxed mb-8">
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
                    className="inline-flex justify-between items-center w-full px-6 py-4 bg-primary text-black hover:bg-primary transition-all duration-300 group dark:bg-cyan-500 dark:hover:bg-cyan-500"
                  >
                    <span className="text-sm font-sans uppercase tracking-[0.2em] text-black font-bold">
                      DOWNLOAD
                    </span>
                    <span className="text-black group-hover:translate-x-1 transition-transform font-light text-lg">
                      →
                    </span>
                  </Link>

                  {/* Secondary Link */}
                  <Link
                    href="/newblog/horizon-mode-distributed-reasoning"
                    className="group flex flex-col items-start gap-1 px-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground dark:text-neutral-400 group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors font-mono uppercase tracking-[0.15em]">
                        Read Research Paper
                      </span>
                      <span className="h-[1px] w-4 bg-border dark:bg-neutral-800 group-hover:bg-primary dark:group-hover:bg-cyan-900 group-hover:w-8 transition-all" />
                    </div>
                    <span className="text-[9px] text-muted-foreground/70 dark:text-neutral-600 font-mono italic">
                      &quot;Solving the Linearity Barrier in Recursive Swarms&quot; (2025)
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hero Image / IDE Preview */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative">
              <div className="absolute -inset-px bg-gradient-to-b from-cyan-500/30 via-transparent to-transparent rounded-lg opacity-50" />
              <HeroPreview />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
