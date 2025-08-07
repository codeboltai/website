'use client'

import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react'

interface FooterContentProps {
  colorScheme: 'grey' | 'red'
  className?: string
}

export default function FooterContent({ colorScheme, className = '' }: FooterContentProps) {
  const colors = {
    grey: {
      background: 'bg-gray-50 dark:bg-gray-900',
      border: 'border-gray-200 dark:border-gray-700',
      topBorder: 'border-gray-200 dark:border-gray-700',
      bottomBorder: 'border-gray-200 dark:border-gray-700',
      horizontalLine: 'bg-gray-300 dark:bg-gray-600',
      separatorLines: 'from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
      logoBackground: 'bg-black dark:bg-white',
      logoIcon: 'text-white dark:text-black',
      brandName: 'text-gray-900 dark:text-gray-100',
      description: 'text-gray-600 dark:text-gray-400',
      headings: 'text-gray-900 dark:text-gray-100',
      links: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
      legalLinks: 'text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100',
      socialIcons: 'text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300'
    },
    red: {
      background: 'bg-red-600',
      border: 'border-red-700',
      topBorder: 'border-red-700',
      bottomBorder: 'border-red-400',
      horizontalLine: 'bg-red-400',
      separatorLines: 'from-red-400 via-red-300 to-red-400',
      logoBackground: 'bg-white',
      logoIcon: 'text-red-600',
      brandName: 'text-white',
      description: 'text-red-100',
      headings: 'text-white',
      links: 'text-red-100 hover:text-white',
      legalLinks: 'text-red-200 hover:text-white',
      socialIcons: 'text-red-200 hover:text-white'
    }
  }

  const scheme = colors[colorScheme]

  return (
    <div className={`${scheme.background} ${scheme.topBorder} border-t relative ${className}`}>
      {/* Vertical separator lines - Only on desktop */}
      <div className="hidden md:block absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-full">
          <div className={`absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b ${scheme.separatorLines}`}></div>
          <div className={`absolute left-2/4 top-0 bottom-0 w-px bg-gradient-to-b ${scheme.separatorLines}`}></div>
          <div className={`absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b ${scheme.separatorLines}`}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {/* Mobile: 2 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info - Full width on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-4 mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${scheme.logoBackground} rounded-lg flex items-center justify-center`}>
                <Code2 className={`w-5 h-5 ${scheme.logoIcon}`} />
              </div>
              <span className={`text-xl font-bold ${scheme.brandName} font-cyber`}>
                CodeboltAI
              </span>
            </div>
            <p className={`${scheme.description} text-sm font-cyber-alt`}>
              AI Code Editor for AI Agents
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className={`text-sm font-semibold ${scheme.headings} mb-3 md:mb-4 font-cyber`}>
              Product
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <a href="#apis" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  APIs & SDKs
                </a>
              </li>
              <li>
                <a href="/changelog" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  Changelog
                </a>
              </li>
              <li>
                <a href="https://docs.codebolt.ai" className={`${scheme.links} text-sm transition-colors font-cyber-alt`} target="_blank" rel="noopener noreferrer">
                  Docs
                </a>
              </li>
              <li>
                <a href="/comparison" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  Comparison
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className={`text-sm font-semibold ${scheme.headings} mb-3 md:mb-4 font-cyber`}>
              Company
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <a href="/careers" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  Careers
                </a>
              </li>
              <li>
                <a href="/partners" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  Partner with Us
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Links */}
          <div>
            <h3 className={`text-sm font-semibold ${scheme.headings} mb-3 md:mb-4 font-cyber`}>
              Resources
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <a href="/blog" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#forums" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  Forums
                </a>
              </li>
              <li>
                <a href="#github" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  Github
                </a>
              </li>
              <li>
                <a href="#status" className={`${scheme.links} text-sm transition-colors font-cyber-alt`}>
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 md:mt-12 pt-6 md:pt-8 border-t ${scheme.bottomBorder} relative`}>
          {/* Full width horizontal line */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-screen h-px ${scheme.horizontalLine}`}></div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a href="/privacy" className={`${scheme.legalLinks} text-sm transition-colors font-cyber-alt`}>
                Privacy policy
              </a>
              <a href="/terms" className={`${scheme.legalLinks} text-sm transition-colors font-cyber-alt`}>
                Terms of Service
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className={`${scheme.socialIcons} transition-colors`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`${scheme.socialIcons} transition-colors`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className={`${scheme.socialIcons} transition-colors`}>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className={`${scheme.socialIcons} transition-colors`}>
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 