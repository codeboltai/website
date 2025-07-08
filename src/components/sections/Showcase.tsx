'use client'

import { motion } from 'framer-motion'
import { Code, Bot, Network, Zap, Terminal, Database, Cloud, Settings } from 'lucide-react'

export default function Showcase() {
  const showcaseItems = [
    {
      title: 'Visual Agent Builder',
      description: 'Drag-and-drop interface for creating complex AI agents without code',
      icon: Bot,
      color: 'bg-purple-500',
      position: 'left',
    },
    {
      title: 'API Integration Hub',
      description: 'Connect to any service with our comprehensive API ecosystem',
      icon: Network,
      color: 'bg-blue-500',
      position: 'center',
    },
    {
      title: 'Smart Automation',
      description: 'Intelligent workflows that adapt and learn from your patterns',
      icon: Zap,
      color: 'bg-orange-500',
      position: 'right',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Settings className="w-4 h-4" />
              <span>See It In Action</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Experience the Future of{' '}
              <span className="text-gradient">Code Development</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how CodeboltAI transforms traditional development workflows into intelligent, automated processes.
            </p>
          </motion.div>
        </div>

        {/* Isometric Showcase */}
        <div className="relative">
          {/* Main Isometric Container */}
          <div className="relative min-h-[600px] flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* Central Editor Interface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="bg-white rounded-3xl isometric-shadow-lg p-8 w-96 h-80 transform rotate-y-12">
                {/* Window Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">CodeboltAI Studio</div>
                </div>

                {/* Code Editor Simulation */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Code className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                      <Network className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Agent Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-3 h-3" />
                    <span>API Connected</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Components */}
            {showcaseItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50, x: item.position === 'left' ? -50 : item.position === 'right' ? 50 : 0 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className={`absolute ${
                  item.position === 'left' ? 'left-0 top-1/4' :
                  item.position === 'right' ? 'right-0 top-1/3' :
                  'bottom-0 left-1/2 transform -translate-x-1/2'
                } hidden lg:block`}
              >
                <div className="bg-white rounded-2xl p-6 isometric-shadow max-w-xs">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Connecting Lines */}
            <motion.div
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute inset-0 pointer-events-none hidden lg:block"
            >
              <svg className="w-full h-full" viewBox="0 0 800 600">
                <motion.path
                  d="M200 150 L400 300 L600 200"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.2 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Database,
              title: 'Real-time Sync',
              description: 'All changes sync instantly across your team and deployed agents',
            },
            {
              icon: Cloud,
              title: 'Cloud Native',
              description: 'Built for the cloud with automatic scaling and global deployment',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Optimized performance with sub-second response times',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 