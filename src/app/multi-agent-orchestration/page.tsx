'use client'

import { motion } from 'framer-motion'
import { Users, Share2, Zap, GitMerge, ShieldCheck, Scaling, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const features = [
  {
    icon: Users,
    title: 'Collaborative Swarms',
    description: 'Assemble teams of specialized AI agents to tackle complex problems. One agent can write tests, another can refactor code, and a third can handle documentation, all working in parallel.',
  },
  {
    icon: Share2,
    title: 'Intelligent Task Delegation',
    description: "The orchestrator analyzes the project goals and delegates tasks to the most suitable agent based on its skills and current workload, ensuring efficient project execution.",
  },
  {
    icon: Zap,
    title: 'Real-Time Communication Bus',
    description: 'Agents communicate and share context in real-time. An agent can pick up exactly where another left off, creating a seamless and continuous development workflow.',
  },
  {
    icon: GitMerge,
    title: 'Automated Code Integration',
    description: 'The orchestrator manages the integration of code from multiple agents, handling potential conflicts and ensuring that all contributions merge cleanly into the main branch.',
  },
  {
    icon: ShieldCheck,
    title: 'Centralized Oversight & Control',
    description: 'Monitor the progress of all agents from a central dashboard. Intervene, provide feedback, or change priorities as needed to guide the swarm towards the desired outcome.',
  },
  {
    icon: Scaling,
    title: 'Scalable Agent Pools',
    description: 'Dynamically scale your agent workforce up or down based on project demands. Spin up new agents to accelerate development and retire them when the work is done.',
  },
]

export default function MultiAgentOrchestrationPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 thread-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
              MULTI-AGENT <span className="text-red-600">ORCHESTRATION</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
              Unleash the power of collaborative AI. Coordinate swarms of specialized agents to build, test, and deploy software faster than ever before.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
                <Button size="lg" className="font-cyber">
                    Launch a Swarm
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber">The Power of a Coordinated Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 font-cyber-alt">
              CodeboltAI enables true parallel development with intelligent agent collaboration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 rounded-lg hover:shadow-lg transition-all duration-300 bg-card border border-transparent hover:border-red-600"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-cyber mt-2">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground font-cyber-alt text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Visualization Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber">A Seamless Workflow</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 font-cyber-alt">
              From task delegation to code integration, the orchestrator handles it all.
            </p>
          </div>
          <div className="relative flex flex-col items-center">
            {/* Replace with a more sophisticated graphic or animation if possible */}
            <div className="font-mono text-sm text-muted-foreground space-y-2 text-center">
                <p>[Project Goal]</p>
                <p className="text-red-600">|</p>
                <p>v</p>
                <p>[Orchestrator Analyzes & Delegates]</p>
                <p className="text-red-600">|</p>
                <p>v</p>
                <div className="flex justify-center gap-4">
                    <p>[Agent A: Frontend]</p>
                    <p>[Agent B: Backend]</p>
                    <p>[Agent C: Tests]</p>
                </div>
                <p className="text-red-600">|</p>
                <p>v</p>
                <p>[Real-Time Collaboration & Code Merge]</p>
                <p className="text-red-600">|</p>
                <p>v</p>
                <p>[Completed Feature]</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}