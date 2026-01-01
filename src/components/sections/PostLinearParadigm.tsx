'use client'

import { motion } from 'motion/react'
import VelocityVsComplexity from '@/components/diagrams/VelocityVsComplexity'

export default function PostLinearParadigm() {
  return (
    <section className="bg-background text-foreground py-24 px-6 lg:px-10 border-b border-border dark:bg-black dark:text-zinc-200 dark:border-white/5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-6 border-l-2 border-indigo-500 pl-4">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground dark:text-zinc-400">
              System Phase Transition
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-6 dark:text-white">
            The Post-Linear <br />
            <span className="text-muted-foreground dark:text-zinc-500">Paradigm.</span>
          </h2>

          <div className="space-y-6 text-base text-muted-foreground leading-relaxed dark:text-zinc-400">
            <p>
              Traditional software engineering hits a <strong className="text-foreground dark:text-white">Linearity Barrier</strong>. As a system
              grows larger, it becomes harder for humans to maintain, causing progress to stall.
            </p>
            <p>
              Codebolt removes this barrier. By using <span className="text-indigo-400">Recursive Swarms</span> to write the implementation
              details, velocity actually <em>increases</em> as the system gets more complex.
            </p>
          </div>

          <div className="mt-10 border-t border-border pt-8 grid grid-cols-2 gap-8 dark:border-zinc-800">
            <div>
              <span className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 dark:text-zinc-500">
                Dev Velocity
              </span>
              <span className="text-3xl font-light text-foreground dark:text-white">100x</span>
              <span className="block text-sm text-muted-foreground mt-1 dark:text-zinc-500">Faster Prototyping</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 dark:text-zinc-500">
                Cognitive Load
              </span>
              <span className="text-3xl font-light text-foreground dark:text-white">~0%</span>
              <span className="block text-sm text-muted-foreground mt-1 dark:text-zinc-500">Manual Overhead</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-7 w-full aspect-[4/3] bg-card border border-border relative flex flex-col dark:bg-[#050505] dark:border-zinc-800"
        >
          <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20 dark:bg-[#080808] dark:border-zinc-800">
            <div>
              <h3 className="text-sm text-foreground font-medium dark:text-white">Velocity vs. Complexity</h3>
              <p className="text-xs text-muted-foreground mt-1 dark:text-zinc-500">
                Comparing Human limits against Recursive AI
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-muted-foreground/60 dark:bg-zinc-600" />
                <span className="text-xs text-muted-foreground dark:text-zinc-400">Human Limit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-indigo-500" />
                <span className="text-xs text-indigo-400">Recursive AI</span>
              </div>
            </div>
          </div>

          <div className="relative flex-1 w-full h-full p-6">
            <div className="absolute left-6 top-6 text-xs font-mono text-muted-foreground dark:text-zinc-500">Output Velocity ↑</div>
            <div className="absolute right-6 bottom-6 text-xs font-mono text-muted-foreground dark:text-zinc-500">System Complexity →</div>
            <VelocityVsComplexity />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

