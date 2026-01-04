'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

// 3D Cube Logo matching Dropstone style
function CubeLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      {/* Front face */}
      <path
        d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Top edge to center */}
      <path
        d="M12 2V12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Left edge to center */}
      <path
        d="M3 7L12 12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Right edge to center */}
      <path
        d="M21 7L12 12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Center to bottom */}
      <path
        d="M12 12V22"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  const navItems = [
    { name: 'Features', href: '/features' },
    { name: 'Platform', href: '/platform' },
    { name: 'Use Cases', href: '/use-cases' },
    { name: 'Comparison', href: '/comparison' },
    { name: 'Download', href: '/download' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b bg-background/80 backdrop-blur-xl border-border">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 z-50 relative group">
          <CubeLogo />
          <span className="font-medium text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">
            Codebolt
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-sm transition-colors duration-200 ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side - Theme Toggle & CTA */}
        <div className="hidden md:flex items-center gap-4 z-50">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* CTA Button - Cyan pill */}
          <Link
            href="/dashboard"
            className="text-sm bg-primary text-primary-foreground px-5 py-2 rounded-full font-medium hover:bg-cyan-400 transition-all duration-300"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button
            className="z-50 flex flex-col gap-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-[1.5px] bg-foreground transition-transform duration-200 ${isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`w-5 h-[1.5px] bg-foreground transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-[1.5px] bg-foreground transition-transform duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 top-16 bg-background z-40 overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col h-full">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block text-lg font-medium transition-colors border-b border-border py-4 ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <button className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-cyan-400 transition-colors">
                    Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
