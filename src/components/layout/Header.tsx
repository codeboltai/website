'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Menu, X, Code2, ChevronDown, ExternalLink } from 'lucide-react'
import Button from '@/components/ui/Button'
import TopAnnouncementBar from '@/components/ui/TopAnnouncementBar'
import ThemeToggle from '@/components/ui/ThemeToggle'


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Define routes that should NOT show the top announcement bar
  const hideTopBarRoutes = [
    '/registry'
  ]
  
  // Check if current path should hide the top bar
  const shouldHideTopBar = hideTopBarRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  const aiAgentItems = [
    { name: 'Agent Marketplace', href: '/registry/agents', description: 'Discover and deploy pre-built agents' },
    { name: 'Custom Coding Agents', href: '/custom-coding-agents', description: 'Build and customize your own AI agents' },
    { name: 'Multi Agent Orchestration', href: '/multi-agent-orchestration', description: 'Run multiple agents together in a swarm' },
  ]

  const developerItems = [
    { name: 'Registry', href: '/registry', description: 'MCP Tools and AI Agents registry' },
    { name: 'Docs', href: 'https://docs.codebolt.ai', description: 'Technical documentation and guides', external: true },
    { name: 'Forums', href: 'https://forum.codebolt.ai/', description: 'Community discussions and support' , external: true},
    { name: 'Blog', href: '/blog', description: 'Latest updates and tutorials' },
  ]



  return (
    <>
      {!shouldHideTopBar && (
        <TopAnnouncementBar 
          text="AI AGENTS • LIVE NOW"
          variant="default"
        />
      )}
      <header className={`fixed ${shouldHideTopBar ? 'top-0' : 'top-8 md:top-10'} w-full z-40 ${shouldHideTopBar ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-background/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground font-cyber">
                CodeboltAI
              </span>
            </Link>
          </motion.div>

                      {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
            



            {/* Regular Navigation Items */}
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-cyber-alt">
              Features
            </Link>

            {/* AI Agents Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-cyber-alt outline-none">
                <span>Agents</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-80 bg-background text-card-foreground rounded-md border border-border p-1 shadow-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {aiAgentItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex flex-col items-start py-3 px-2 rounded-sm hover:bg-accent transition-colors"
                  >
                    <div className="text-sm font-medium text-card-foreground font-cyber">{item.name}</div>
                    <div className="text-xs text-muted-foreground font-cyber-alt">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Developers Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-cyber-alt outline-none">
                <span>Developers</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-72 bg-background text-card-foreground rounded-md border border-border p-1 shadow-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {developerItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex flex-col items-start py-3 px-2 rounded-sm hover:bg-accent transition-colors"
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    <div className="text-sm font-medium text-card-foreground font-cyber flex items-center">
                      {item.name}
                      {item.external && <ExternalLink className="w-3 h-3 ml-1 text-muted-foreground" />}
                    </div>
                    <div className="text-xs text-muted-foreground font-cyber-alt">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-cyber-alt">
              Pricing
            </Link>
            <a href="#enterprise" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-cyber-alt">
              Enterprise
            </a>
          </nav>

          {/* CTA Buttons and Theme Toggle - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="secondary" size="sm" className="font-cyber">
              Download
            </Button>
            <Button variant="outline" size="sm" className="font-cyber">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors duration-200"
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
          className={`md:hidden fixed inset-0 ${shouldHideTopBar ? 'top-16' : 'top-[72px]'} bg-background dark:bg-background z-50 overflow-y-auto`}
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile CTA Buttons and Theme Toggle */}
            <div className="flex space-x-2 pb-4 border-b border-border">
              <Button variant="secondary" size="sm" className="flex-1 font-cyber">
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex-1 font-cyber">
                Sign Up
              </Button>
              <ThemeToggle />
            </div>

            {/* Features - First item to match desktop */}
            <Link
              href="/features"
              className="block text-sm text-muted-foreground hover:text-foreground font-medium transition-colors duration-200 font-cyber-alt"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>

            {/* Mobile AI Agents Section */}
            <div>
              <div className="text-sm font-medium text-foreground mb-2 font-cyber">AI Agents</div>
              {aiAgentItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block pl-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-cyber-alt"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Developers Section */}
            <div>
              <div className="text-sm font-medium text-foreground mb-2 font-cyber">Developers</div>
              {developerItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block pl-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-cyber-alt"
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
              className="block text-sm text-muted-foreground hover:text-foreground font-medium transition-colors duration-200 font-cyber-alt"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Enterprise */}
            <a
              href="#enterprise"
              className="block text-sm text-muted-foreground hover:text-foreground font-medium transition-colors duration-200 font-cyber-alt"
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