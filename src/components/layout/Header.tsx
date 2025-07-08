'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, ChevronDown, ExternalLink } from 'lucide-react'
import Button from '@/components/ui/Button'
import TopAnnouncementBar from '@/components/ui/TopAnnouncementBar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const aiAgentItems = [
    { name: 'Custom Agents', href: '#custom-agents', description: 'Build and customize your own AI agents' },
    { name: 'Agent Marketplace', href: '#agent-marketplace', description: 'Discover and deploy pre-built agents' },
  ]

  const developerItems = [
    { name: 'Docs', href: 'https://docs.codebolt.ai', description: 'Technical documentation and guides', external: true },
    { name: 'Forums', href: '#forums', description: 'Community discussions and support' },
    { name: 'Blog', href: '#blog', description: 'Latest updates and tutorials' },
  ]

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdowns = () => {
    setActiveDropdown(null)
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <TopAnnouncementBar 
        text="AI AGENTS • LIVE NOW"
        variant="default"
      />
      
      <header className="fixed top-8 md:top-10 w-full z-40 glass-subtle border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 font-cyber">
                CodeboltAI
              </span>
            </Link>
          </motion.div>

                      {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
            



            {/* Regular Navigation Items */}
            <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-cyber-alt">
              Features
            </Link>

            {/* AI Agents Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors font-cyber-alt"
                onClick={() => handleDropdownToggle('ai-agents')}
                onMouseEnter={() => setActiveDropdown('ai-agents')}
              >
                <span>Agents</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'ai-agents' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'ai-agents' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    onMouseLeave={closeDropdowns}
                  >
                    {aiAgentItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={closeDropdowns}
                      >
                        <div className="text-sm font-medium text-gray-900 font-cyber">{item.name}</div>
                        <div className="text-xs text-gray-500 font-cyber-alt">{item.description}</div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

                        {/* Developers Dropdown */}
                        <div className="relative">
              <button
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors font-cyber-alt"
                onClick={() => handleDropdownToggle('developers')}
                onMouseEnter={() => setActiveDropdown('developers')}
              >
                <span>Developers</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'developers' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'developers' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    onMouseLeave={closeDropdowns}
                  >
                    {developerItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={closeDropdowns}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                      >
                        <div className="text-sm font-medium text-gray-900 font-cyber flex items-center">
                          {item.name}
                          {item.external && <ExternalLink className="w-3 h-3 ml-1 text-gray-400" />}
                        </div>
                        <div className="text-xs text-gray-500 font-cyber-alt">{item.description}</div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-cyber-alt">
              Pricing
            </Link>
            <a href="#enterprise" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-cyber-alt">
              Enterprise
            </a>
          </nav>

          {/* CTA Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="secondary" size="sm" className="font-cyber">
              Download
            </Button>
            <Button variant="outline" size="sm" className="font-cyber">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="w-6 h-6 text-gray-600" /> : 
              <Menu className="w-6 h-6 text-gray-600" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: '100vh' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden fixed inset-0 top-[72px] bg-white z-50 overflow-y-auto"
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile CTA Buttons */}
            <div className="flex space-x-2 pb-4 border-b border-subtle">
              <Button variant="secondary" size="sm" className="flex-1 font-cyber">
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex-1 font-cyber">
                Sign Up
              </Button>
            </div>

            {/* Features - First item to match desktop */}
            <Link
              href="/features"
              className="block text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 font-cyber-alt"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>

            {/* Mobile AI Agents Section */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2 font-cyber">AI Agents</div>
              {aiAgentItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block pl-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-cyber-alt"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Developers Section */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2 font-cyber">Developers</div>
              {developerItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block pl-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-cyber-alt"
                  onClick={() => setIsMenuOpen(false)}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  <span className="flex items-center">
                    {item.name}
                    {item.external && <ExternalLink className="w-3 h-3 ml-1 text-gray-400" />}
                  </span>
                </a>
              ))}
            </div>

            {/* Pricing */}
            <Link
              href="/pricing"
              className="block text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 font-cyber-alt"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Enterprise */}
            <a
              href="#enterprise"
              className="block text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 font-cyber-alt"
              onClick={() => setIsMenuOpen(false)}
            >
              Enterprise
            </a>

            
          </div>
        </motion.div>
      )}
    </header>
    </>
  )
} 