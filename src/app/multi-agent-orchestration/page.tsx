'use client'

import { motion } from 'framer-motion'
import { Code, Bot, Zap, Users, GitBranch, Terminal, Cpu, Shield } from 'lucide-react'
// import CTASection from '@/components/ui/CTASection'

const features = [
  {
    icon: Bot,
    title: 'AI Agent Builder',
    description: 'Create specialized AI coding agents with unique personalities and expertise areas. Train agents for specific frameworks, languages, or project types.',
    highlights: ['Custom Agent Training', 'Personality Configuration', 'Skill Specialization']
  },
  {
    icon: Code,
    title: 'Intelligent Code Editor',
    description: 'Advanced code editor with AI-powered suggestions, real-time collaboration, and seamless integration with your development workflow.',
    highlights: ['Smart Autocomplete', 'Error Prevention', 'Code Optimization']
  },
  {
    icon: Users,
    title: 'Multi-Agent Orchestration',
    description: 'Coordinate multiple AI agents to work together on complex projects. Assign different agents to different tasks and watch them collaborate.',
    highlights: ['Task Distribution', 'Agent Communication', 'Workflow Automation']
  },
  {
    icon: Zap,
    title: 'Real-Time Execution',
    description: 'Execute code in real-time with instant feedback. See your agents work live and interact with the development process as it happens.',
    highlights: ['Live Code Execution', 'Instant Feedback', 'Performance Monitoring']
  },
  {
    icon: GitBranch,
    title: 'Version Control Integration',
    description: 'Seamlessly integrate with Git workflows. Agents can create branches, commit changes, and manage pull requests automatically.',
    highlights: ['Git Integration', 'Automated Commits', 'Branch Management']
  },
  {
    icon: Terminal,
    title: 'Command Interface',
    description: 'Control your agents through natural language commands. Simply describe what you want to build and watch your agents get to work.',
    highlights: ['Natural Language', 'Voice Commands', 'Gesture Control']
  },
  {
    icon: Cpu,
    title: 'Advanced Processing',
    description: 'Leverage cutting-edge AI models for complex reasoning, pattern recognition, and intelligent decision-making in your development process.',
    highlights: ['Deep Learning', 'Pattern Recognition', 'Smart Decisions']
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with encrypted communications, secure agent deployment, and comprehensive audit trails for enterprise environments.',
    highlights: ['End-to-End Encryption', 'Audit Trails', 'Compliance Ready']
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
              MULTI AGENT <span className="text-red-600">ORCHESTRATION</span>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 rounded-lg hover:shadow-lg transition-all duration-300 bg-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                    <feature.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground font-cyber">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4 font-cyber-alt text-sm">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center text-sm text-muted-foreground font-cyber-alt">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                      {highlight}
                    </li>
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