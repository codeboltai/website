'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Palette, Wrench, BookOpenCheck, Component, GitBranch, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const features = [
  {
    icon: BrainCircuit,
    title: 'Skill Specialization',
    description: 'Train agents on specific libraries, frameworks like React or Django, or programming languages. They become true experts in their domain, providing more accurate and context-aware code.',
  },
  {
    icon: Palette,
    title: 'Personality & Coding Style',
    description: "Define your agent's personality and coding style. Whether you prefer verbose comments or concise code, your agent will adapt to match your team's conventions.",
  },
  {
    icon: Wrench,
    title: 'Custom Tooling',
    description: 'Equip your agents with custom tools and scripts. Allow them to interact with your specific APIs, databases, or internal services to automate complex workflows.',
  },
  {
    icon: BookOpenCheck,
    title: 'Knowledge Base Integration',
    description: 'Connect your agent to your private documentation, codebases, or wikis. It will learn from your existing knowledge to provide highly relevant and context-aware assistance.',
  },
  {
    icon: Component,
    title: 'Visual Builder',
    description: 'Utilize a user-friendly interface to assemble, configure, and test your agents. No complex setup or steep learning curve required to start building.',
  },
  {
    icon: GitBranch,
    title: 'Version Control & Sharing',
    description: 'Your agents are version-controlled. Share, reuse, and collaborate on agent development with your team, ensuring consistency and quality.',
  },
]

export default function CustomCodingAgentsPage() {
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
              CUSTOM CODING <span className="text-red-600">AGENTS</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
              Go beyond generic AI. Create specialized agents tailored to your exact coding style, frameworks, and project requirements.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
                <Button size="lg" className="font-cyber">
                    Build Your First Agent
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber">Tailor-Made Intelligence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 font-cyber-alt">
              CodeboltAI gives you granular control to build agents that work the way you do.
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

      {/* How it works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber">Simple to Build, Powerful to Use</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 font-cyber-alt">
              Create a new agent in just a few steps.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="text-center p-6 bg-card rounded-lg">
                <div className="text-5xl font-bold text-red-600 font-cyber-heavy">1</div>
                <h3 className="text-xl font-semibold my-2 font-cyber">Define Core Skills</h3>
                <p className="text-muted-foreground font-cyber-alt">Choose languages, frameworks, and libraries.</p>
            </div>
            <div className="text-2xl text-muted-foreground font-sans">&rarr;</div>
            <div className="text-center p-6 bg-card rounded-lg">
                <div className="text-5xl font-bold text-red-600 font-cyber-heavy">2</div>
                <h3 className="text-xl font-semibold my-2 font-cyber">Configure Personality</h3>
                <p className="text-muted-foreground font-cyber-alt">Set coding style and communication preferences.</p>
            </div>
            <div className="text-2xl text-muted-foreground font-sans">&rarr;</div>
            <div className="text-center p-6 bg-card rounded-lg">
                <div className="text-5xl font-bold text-red-600 font-cyber-heavy">3</div>
                <h3 className="text-xl font-semibold my-2 font-cyber">Deploy & Iterate</h3>
                <p className="text-muted-foreground font-cyber-alt">Use your agent, provide feedback, and refine its skills.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}