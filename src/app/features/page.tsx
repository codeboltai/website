'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Download, ArrowRight, Bot, Users, Brain, Eye, Workflow, Clock } from 'lucide-react'

const featureCategories = [
  {
    id: 'multi-agent-swarms',
    icon: Users,
    label: 'FIG 1.1 — SWARM ARCHITECTURE',
    title: 'Multi-Agent Swarms',
    description: 'Deploy 100+ AI agents simultaneously—each with specialized roles, working in parallel. True parallelization of development work.',
    highlights: [
      'Deploy 5, 10, 50, or 100+ agents at once',
      'Specialized agents for testing, docs, security',
      'Scale up or down instantly',
    ],
    href: '/features/multi-agent-swarms',
    stat: { value: '100+', label: 'Parallel Agents' },
  },
  {
    id: 'stigmergy',
    icon: Workflow,
    label: 'FIG 1.2 — COORDINATION PROTOCOL',
    title: 'Stigmergy-Based Coordination',
    description: 'Self-organizing intelligence without a central commander. Agents leave pheromone signals that others sense and respond to.',
    highlights: [
      'Pheromone-based task signaling',
      'Job locking, bidding, and proposals',
      'Agent deliberations for consensus',
    ],
    href: '/features/stigmergy',
    stat: { value: '0', label: 'Coordination Overhead' },
  },
  {
    id: 'persistent-memory',
    icon: Brain,
    label: 'FIG 1.3 — MEMORY ARCHITECTURE',
    title: 'Persistent Memory',
    description: 'Knowledge graphs, vector databases, and episodic memory give agents permanent, queryable memory spanning your project history.',
    highlights: [
      'Episodic memory with timestamps',
      'Knowledge graph relationships',
      'Semantic vector search',
    ],
    href: '/features/persistent-memory',
    stat: { value: '∞', label: 'Context Window' },
  },
  {
    id: 'observability',
    icon: Eye,
    label: 'FIG 1.4 — VISIBILITY LAYER',
    title: 'Full Observability',
    description: 'Complete visibility into what agents are doing, thinking, and deciding. Every tool call logged. Every decision auditable.',
    highlights: [
      'Real-time agent monitoring',
      'Complete audit trails',
      'Review & merge workflow',
    ],
    href: '/features/observability',
    stat: { value: '100%', label: 'Visibility' },
  },
  {
    id: 'ai-agents',
    icon: Bot,
    label: 'FIG 1.5 — AGENT CREATION',
    title: 'Custom AI Agents',
    description: 'Create custom agents via code or visual drag-and-drop builder. Flow agents, code agents, remix agents—tailored to your workflows.',
    highlights: [
      'Visual drag-and-drop builder',
      'Full SDK for code agents',
      'Remix and share templates',
    ],
    href: '/features/ai-agents',
    stat: { value: 'No-code', label: 'Creation' },
  },
  {
    id: '24-7-development',
    icon: Clock,
    label: 'FIG 1.6 — CONTINUOUS OPERATION',
    title: '24/7 Development',
    description: 'Agents work around the clock. Assign tasks before you sleep, wake up to completed features, tested code, and pull requests.',
    highlights: [
      'Overnight development',
      'Wake up to completed PRs',
      'No human bottleneck',
    ],
    href: '/use-cases',
    stat: { value: '24/7', label: 'Operation' },
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-background border-b border-border">
        <div className="relative bg-card pt-32 pb-24 md:pt-48 md:pb-32">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border bg-muted/30 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-8">
              Platform Capabilities
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-foreground tracking-tight mb-8 leading-[1.1]">
              The Agentic <br />
              <span className="text-muted-foreground">Development Platform.</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12 font-light">
              Everything you need to deploy, coordinate, and manage swarms of AI agents
              that work together to build software 24/7.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/download"
                className="px-8 py-4 bg-primary text-primary-foreground text-[11px] font-sans uppercase rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 flex items-center gap-3 group shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                Download Codebolt
                <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-primary dark:bg-cyan-500 rounded-full" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Core Capabilities
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tighter mb-4">
              Six Pillars of <span className="text-muted-foreground">Agentic Development</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl">
              Each capability is designed to work together, creating a complete platform
              for AI-powered software development at scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureCategories.map((feature, idx) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative border border-border dark:border-zinc-800 p-8 transition-all duration-300 hover:border-primary/50 dark:hover:border-cyan-500/30 bg-card/30"
                >
                  {/* Corner brackets */}
                  <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-muted-foreground/40 dark:border-zinc-600" />
                  <div className="absolute -top-px -right-px w-4 h-4 border-t border-r border-muted-foreground/40 dark:border-zinc-600" />
                  <div className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-muted-foreground/40 dark:border-zinc-600" />
                  <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-muted-foreground/40 dark:border-zinc-600" />

                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="w-12 h-12 border border-border dark:border-zinc-700 flex items-center justify-center bg-background dark:bg-zinc-900/50 group-hover:border-primary/50 transition-colors">
                      <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    <div className="flex-1">
                      {/* Label */}
                      <div className="mb-3 font-mono text-[10px] uppercase text-muted-foreground dark:text-zinc-500 tracking-widest">
                        {feature.label}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-medium text-foreground dark:text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground dark:text-zinc-400 font-light leading-relaxed mb-4">
                        {feature.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-1 mb-6">
                        {feature.highlights.map((highlight, hidx) => (
                          <li key={hidx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary/60 rounded-full" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-border dark:border-zinc-800">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-1">
                            {feature.stat.label}
                          </span>
                          <span className="font-mono text-lg text-foreground dark:text-zinc-200">
                            {feature.stat.value}
                          </span>
                        </div>
                        <Link
                          href={feature.href}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
                        >
                          Explore
                          <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-6 bg-muted/10 dark:bg-zinc-900/20 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="font-mono text-4xl font-medium text-primary dark:text-cyan-400 block mb-2">100+</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Parallel Agents</span>
            </div>
            <div>
              <span className="font-mono text-4xl font-medium text-primary dark:text-cyan-400 block mb-2">24/7</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Operation</span>
            </div>
            <div>
              <span className="font-mono text-4xl font-medium text-primary dark:text-cyan-400 block mb-2">∞</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Context Window</span>
            </div>
            <div>
              <span className="font-mono text-4xl font-medium text-primary dark:text-cyan-400 block mb-2">100%</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Visibility</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-medium text-foreground tracking-tight mb-6">
            Ready to deploy your AI team?
          </h2>
          <p className="text-muted-foreground mb-8">
            Download Codebolt and start building with multi-agent swarms today.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase rounded-full font-bold hover:bg-cyan-400 transition-colors"
          >
            Download Codebolt
            <Download className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
