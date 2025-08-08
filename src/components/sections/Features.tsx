'use client'

import { motion } from 'framer-motion'
import { Eye, Users, Bot, Clock, Cloud, Cpu } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'

export default function Features() {
  const codeboltAgentFeatures = [
    {
      icon: Eye,
      title: "Complete Agent Observability",
      description: "Monitor and debug your AI agents with comprehensive visibility into their operations and decision-making processes.",
      features: [
        "Agent Debugging",
        "AI Message Request and Response"
      ],
      className: 'lg:col-span-2',
      layout: 'default',
    },
    {
      icon: Users,
      title: "Multi-Agent Swarm",
      description: "Deploy multiple AI agents working together in coordinated swarms for complex development tasks.",
      features: [
        "Sub Agent",
        "Parallel Agent Through Task Creation"
      ],
      className: 'lg:col-span-1 lg:row-span-2',
      layout: 'image-bg',
      imageUrl: 'https://placehold.co/600x800/000000/dc2626/png?text=SWARM&font=orbitron',
    },
    {
      icon: Bot,
      title: "Custom Agent",
      description: "Create specialized agents tailored to your specific development needs and coding requirements.",
      features: [
        "Prompt Based Custom Agent",
        "Code-based Custom Agent"
      ],
      className: 'lg:col-span-1',
      layout: 'icon-bottom',
    },
    {
      icon: Clock,
      title: "Longer Duration Task Management",
      description: "Handle complex, long-running development tasks with intelligent planning and distributed execution.",
      features: [
        "Task Planner",
        "Distributed Task Management"
      ],
      className: 'lg:col-span-1',
      layout: 'highlight',
      bgColor: 'bg-red-600 text-white',
    },
    {
      icon: Cloud,
      title: "Multi Remote Runners",
      description: "Execute your agents across multiple environments and cloud platforms for maximum flexibility.",
      features: [
        "Custom Run remotely on any cloud platform",
        "Run swarm locally across system"
      ],
      className: 'lg:col-span-2',
      layout: 'image-bg',
      imageUrl: 'https://placehold.co/800x400/1a1a1a/ffffff/png?text=CLOUD&font=space-mono',
    },
    {
      icon: Cpu,
      title: "Multi LLMs",
      description: "Leverage multiple language models simultaneously for enhanced capabilities and performance.",
      features: [
        "Single agent can use multiple LLMs",
        "Multiple agents can use multiple LLMs based upon their needs"
      ],
      className: 'lg:col-span-1',
      layout: 'default',
    },
  ]

  return (
    <section id="features" className="py-24 bg-background thread-bg-dense">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title="AI AGENTS •"
          highlight="AUTONOMOUS CODING"
          subtitle="Deploy specialized AI coding agents that work 24/7. Each agent brings unique capabilities to accelerate your development workflow."
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[1fr]">
          {codeboltAgentFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group rounded-lg border border-gray-200 hover:border-red-300/50 hover:shadow-xl hover:shadow-red-100/50 transition-all duration-300 flex flex-col relative overflow-hidden ${feature.className} ${feature.bgColor || 'bg-white'}`}
            >
              {feature.layout === 'image-bg' && feature.imageUrl && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>
              )}

              <div className={`p-8 flex flex-col h-full z-10 ${feature.layout === 'icon-bottom' ? 'justify-between' : ''} ${feature.layout === 'image-bg' ? 'text-white justify-end' : ''}`}>
                <div className={`${feature.layout === 'icon-bottom' ? 'order-2 text-right' : 'order-1'}`}>
                  <h3 className={`text-xl font-semibold mb-3 font-cyber flex items-center gap-3 ${feature.layout === 'image-bg' ? 'text-white' : 'text-gray-900'} ${feature.bgColor ? 'text-white' : ''} ${feature.layout === 'icon-bottom' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.4)] ${feature.layout === 'image-bg' ? 'text-red-400' : 'text-red-600'} ${feature.bgColor ? 'text-white' : ''}`}>
                      <feature.icon className="w-full h-full" />
                    </div>
                    {feature.title}
                  </h3>
                </div>
                
                <div className={`${feature.layout === 'icon-bottom' ? 'order-1' : 'order-2'}`}>
                  <p className={`leading-relaxed font-cyber-alt mb-4 ${feature.layout === 'image-bg' ? 'text-gray-300' : 'text-gray-600'} ${feature.bgColor ? 'text-red-100' : ''}`}>
                    {feature.description}
                  </p>
                  
                  {feature.features && (
                    <ul className="space-y-2">
                      {feature.features.map((featureItem, featureIndex) => (
                        <motion.li 
                          key={featureItem} 
                          className={`flex items-start text-sm font-cyber-alt ${feature.layout === 'image-bg' ? 'text-gray-300' : 'text-gray-600'} ${feature.bgColor ? 'text-red-200' : ''}`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0 ${feature.layout === 'image-bg' ? 'bg-red-400' : 'bg-red-500'} ${feature.bgColor ? 'bg-red-200' : ''}`}></div>
                          <span className="leading-relaxed">{featureItem}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
 