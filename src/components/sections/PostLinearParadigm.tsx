'use client'

import { motion } from 'motion/react'
import VelocityVsComplexity from '@/components/diagrams/VelocityVsComplexity'

export default function PostLinearParadigm() {
  return (
    <section className="bg-background text-foreground py-24 px-6 lg:px-10 border-b border-border">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-6 border-l-2 border-indigo-500 pl-4">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">System Phase Transition</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-6">
            The Post-Linear <br />
            <span className="text-muted-foreground">Paradigm.</span>
          </h2>

          <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              Traditional software engineering hits a <strong className="text-foreground">Linearity Barrier</strong>. As a system grows larger, it
              becomes harder for humans to maintain, causing progress to stall.
            </p>
            <p>
              Codebolt removes this barrier. By using <span className="text-indigo-400">Recursive Swarms</span> to write the implementation
              details, velocity actually <em>increases</em> as the system gets more complex.
            </p>
          </div>

          <div className="mt-10 border-t border-border pt-8 grid grid-cols-2 gap-8">
            <div>
              <span className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Dev Velocity</span>
              <span className="text-3xl font-light text-foreground">100x</span>
              <span className="block text-sm text-muted-foreground mt-1">Faster Prototyping</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Cognitive Load</span>
              <span className="text-3xl font-light text-foreground">~0%</span>
              <span className="block text-sm text-muted-foreground mt-1">Manual Overhead</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-7 w-full aspect-[4/3] bg-card border border-border relative flex flex-col"
        >
          <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
            <div>
              <h3 className="text-sm text-foreground font-medium">Velocity vs. Complexity</h3>
              <p className="text-xs text-muted-foreground mt-1">Comparing Human limits against Recursive AI</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-muted-foreground/60" />
                <span className="text-xs text-muted-foreground">Human Limit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-indigo-500" />
                <span className="text-xs text-indigo-400">Recursive AI</span>
              </div>
            </div>
          </div>

          <div className="relative flex-1 w-full h-full p-6">
            <div className="absolute left-6 top-6 text-xs font-mono text-muted-foreground">Output Velocity ↑</div>
            <div className="absolute right-6 bottom-6 text-xs font-mono text-muted-foreground">System Complexity →</div>
            <VelocityVsComplexity />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

