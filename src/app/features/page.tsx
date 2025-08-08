'use client'

import { motion } from 'framer-motion'
import { Eye, Users, Bot, Clock, Cloud, Cpu } from 'lucide-react'
// import CTASection from '@/components/ui/CTASection'

const codeboltAgentFeatures = [
  {
    icon: Eye,
    title: "Complete Agent Observability",
    features: [
      "Agent Debugging",
      "AI Message Request and Response"
    ]
  },
  {
    icon: Users,
    title: "Multi-Agent Swarm",
    features: [
      "Sub Agent",
      "Parallel Agent Through Task Creation"
    ]
  },
  {
    icon: Bot,
    title: "Custom Agent",
    features: [
      "Prompt Based Custom Agent",
      "Code-based Custom Agent"
    ]
  },
  {
    icon: Clock,
    title: "Longer Duration Task Management",
    features: [
      "Task Planner",
      "Distributed Task Management"
    ]
  },
  {
    icon: Cloud,
    title: "Multi Remote Runners",
    features: [
      "Custom Run remotely on any cloud platform",
      "Run swarm locally across system"
    ]
  },
  {
    icon: Cpu,
    title: "Multi LLMs",
    features: [
      "Single agent can use multiple LLMs",
      "Multiple agents can use multiple LLMs based upon their needs"
    ]
  }
]

export default function FeaturesPage() {
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
              POWERFUL <span className="text-red-600">FEATURES</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
              Discover the cutting-edge capabilities that make CodeboltAI the most advanced 
              AI code editor for autonomous development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {codeboltAgentFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group p-6 rounded-lg hover:shadow-lg transition-all duration-300 bg-card border border-border"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                    <feature.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-cyber">
                    {feature.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {feature.features.map((featureItem, featureIndex) => (
                    <motion.li 
                      key={featureItem} 
                      className="flex items-start text-sm text-muted-foreground font-cyber-alt"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{featureItem}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <CTASection
        title="Ready to Build with AI Agents?"
        description="Experience the future of coding with autonomous AI agents that understand your needs."
        buttons={[
          {
            text: "Start Free Trial",
            variant: "primary",
            shape: "gaming"
          },
          {
            text: "Watch Demo",
            variant: "outline",
            shape: "cyber"
          }
        ]}
        backgroundColor="gray"
      /> */}
    </div>
  )
} 