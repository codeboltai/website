'use client'

import { motion } from 'framer-motion'
import { Code2, Users, Server, GitBranch, Settings } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'

export default function MajorFeatures() {
  const features = [
    {
      id: 1,
      icon: Code2,
      title: 'Custom Agent Creation with Code',
      description: 'Create custom agents using the Codebolt AI SDK without fighting with prompts. Unlike other AI code editors that lock you into their agentic loop, Codebolt gives you complete control over your agent\'s behavior through code.',
      highlights: ['Full SDK control', 'No prompt limitations', 'Custom agentic loops'],
      imageUrl: 'https://placehold.co/600x400/000000/dc2626/png?text=//AGENT&font=orbitron',
    },
    {
      id: 2,
      icon: Users,
      title: 'Multi-Agent Swarm Configuration',
      description: 'Deploy multiple agents in parallel or hierarchical configurations with different roles. Run them simultaneously for complex workflows or orchestrate them with specific responsibilities.',
      highlights: ['Parallel execution', 'Hierarchical structure', 'Role-based assignment'],
      imageUrl: 'https://placehold.co/600x400/1a1a1a/ffffff/png?text=SWARM&font=space-mono',
    },
    {
      id: 3,
      icon: Server,
      title: 'Flexible Deployment & Orchestration',
      description: 'Run agents locally or on any remote infrastructure including Docker, EC2, and more. Complete orchestration tools provide full observability and control over your agent ecosystem.',
      highlights: ['Local & remote deployment', 'Docker support', 'Complete observability'],
      imageUrl: 'https://placehold.co/600x400/0f172a/64748b/png?text=DEPLOY&font=orbitron',
    },
    {
      id: 4,
      icon: GitBranch,
      title: 'Long-Running Collaborative Execution',
      description: 'Enable agent swarms to collaborate effectively for extended periods. Agents work together seamlessly, sharing context and maintaining execution state across complex, long-duration tasks.',
      highlights: ['Extended execution', 'Context sharing', 'Collaborative workflows'],
      imageUrl: 'https://placehold.co/600x400/18181b/f4f4f5/png?text=COLLAB&font=space-mono',
    },
    {
      id: 5,
      icon: Settings,
      title: 'Heavily Customized Agent Processes',
      description: 'Create specialized agents for different processes, execution patterns, and prompting strategies. Achieve customization levels impossible with other platforms through granular control over every aspect.',
      highlights: ['Process customization', 'Execution patterns', 'Custom prompting'],
      imageUrl: 'https://placehold.co/600x400/7c2d12/fed7aa/png?text=CUSTOM&font=orbitron',
    },
  ]

  return (
    <section id="major-features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title="MAJOR FEATURES •"
          highlight="UNPARALLELED CONTROL"
          subtitle="Discover the unique capabilities that set Codebolt apart from other AI coding platforms. Build, deploy, and orchestrate AI agents your way."
        />

        {/* Features List */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Text Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-red-600 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-red-600 font-cyber tracking-wider">
                    FEATURE {String(feature.id).padStart(2, '0')}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground font-cyber-heavy leading-tight">
                  {feature.title}
                </h3>

                <p className="text-base text-muted-foreground font-cyber-alt leading-relaxed">
                  {feature.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {feature.highlights.map((highlight, highlightIndex) => (
                    <div
                      key={highlightIndex}
                      className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200"
                    >
                      <div className="w-2 h-2 rounded-full bg-red-600"></div>
                      <span className="text-sm font-medium text-gray-900 font-cyber">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-lg border-2 border-gray-200 group-hover:border-red-300 transition-colors duration-300 overflow-hidden">
                    <div className="aspect-[3/2] relative">
                      <Image
                        src={feature.imageUrl}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Feature indicator overlay */}
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm font-cyber">
                          {feature.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-50 border border-red-200">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-red-700 font-medium font-cyber text-sm">
              Ready to build your custom AI agent ecosystem?
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
