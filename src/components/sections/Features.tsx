'use client'

import { motion } from 'framer-motion'
import { Bot, Code, Zap, Network, Terminal, Cpu } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: 'Multi-Agent Creation',
      description: 'Deploy multiple specialized AI coding agents simultaneously.',
      className: 'lg:col-span-2',
      layout: 'default',
    },
    {
      icon: Code,
      title: 'Autonomous Coding',
      description: 'AI agents write, debug, and optimize code independently.',
      className: 'lg:col-span-1 lg:row-span-2',
      layout: 'image-bg',
      imageUrl: 'https://placehold.co/600x800/000000/dc2626/png?text=//&font=orbitron',
    },
    {
      icon: Network,
      title: 'Agent Orchestration',
      description: 'Coordinate multiple AI agents working together.',
      className: 'lg:col-span-1',
      layout: 'icon-bottom',
    },
    {
      icon: Zap,
      title: 'Real-Time Execution',
      description: 'Instant code execution and testing by AI agents.',
      className: 'lg:col-span-1',
      layout: 'highlight',
      bgColor: 'bg-red-600 text-white',
    },
    {
      icon: Terminal,
      title: 'Command Interface',
      description: 'Direct communication with your AI agents through natural language commands.',
      className: 'lg:col-span-2',
      layout: 'image-bg',
      imageUrl: 'https://placehold.co/800x400/1a1a1a/ffffff/png?text=C:\\>_&font=space-mono',
    },
    {
      icon: Cpu,
      title: 'Intelligent Processing',
      description: 'Advanced AI reasoning and code analysis.',
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
          {features.map((feature, index) => (
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
                  <h3 className={`text-xl font-semibold mb-3 font-cyber flex items-center gap-3 ${feature.layout === 'image-bg' ? 'text-white' : 'text-gray-900'} ${feature.bgColor ? 'text-white' : ''}`}>
                    <div className={`w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.4)] ${feature.layout === 'image-bg' ? 'text-red-400' : 'text-red-600'} ${feature.bgColor ? 'text-white' : ''}`}>
                      <feature.icon className="w-full h-full" />
                    </div>
                    {feature.title}
                  </h3>
                </div>
                
                <div className={`${feature.layout === 'icon-bottom' ? 'order-1' : 'order-2'}`}>
                  <p className={`leading-relaxed font-cyber-alt ${feature.layout === 'image-bg' ? 'text-gray-300' : 'text-gray-600'} ${feature.bgColor ? 'text-red-100' : ''}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
 