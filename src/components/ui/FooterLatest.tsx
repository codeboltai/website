'use client'

import { motion } from 'framer-motion'
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

interface FooterLatestProps {
  className?: string
}

export default function FooterLatest({ className = '' }: FooterLatestProps) {
  return (
    <footer className={`relative overflow-hidden bg-gray-50 ${className}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-2">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">CodeboltAI</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
              The futuristic code editor designed for AI agents. 
              Built with care, designed to last.
            </p>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-700 hover:text-black transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-700 hover:text-black transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-700 hover:text-black transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-700 hover:text-black transition-colors text-sm">
                  About us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-700 hover:text-black transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black">Our services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#ai-agents" className="text-gray-700 hover:text-black transition-colors text-sm">
                  AI Agents
                </a>
              </li>
              <li>
                <a href="#code-editor" className="text-gray-700 hover:text-black transition-colors text-sm">
                  Code Editor
                </a>
              </li>
              <li>
                <a href="#automation" className="text-gray-700 hover:text-black transition-colors text-sm">
                  Automation
                </a>
              </li>
              <li>
                <a href="#integrations" className="text-gray-700 hover:text-black transition-colors text-sm">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#support" className="text-gray-700 hover:text-black transition-colors text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black">Follow us</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-black transition-colors text-sm flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black transition-colors text-sm flex items-center">
                  <Twitter className="w-4 h-4 mr-2" />
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black transition-colors text-sm flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black transition-colors text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Large Background Text */}
        <div className="relative w-full overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center w-full px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] 2xl:text-[10vw] font-black text-gray-800 leading-none tracking-tight select-none whitespace-nowrap">
              CodeboltAI
            </h2>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className=" flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600 text-sm">
            © 2024 CodeboltAI. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#privacy" className="text-gray-600 hover:text-black text-sm transition-colors underline">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-600 hover:text-black text-sm transition-colors underline">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 