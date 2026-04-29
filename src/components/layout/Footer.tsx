'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Youtube } from 'lucide-react'

// 3D Cube Logo matching header
function CubeLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      <path
        d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 2V12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7L12 12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 7L12 12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12V22" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Footer() {
  const links = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/newpricing' },
      { name: 'Downloads', href: '/newdownload' },
      { name: 'Enterprise', href: '/enterprise' },
      { name: 'Changelog', href: '/changelog' },
    ],
    resources: [
      { name: 'Documentation', href: 'https://docs.codebolt.ai' },
      { name: 'Status', href: '/status' },
      { name: 'Contact', href: '/contact' },
    ],
    company: [
      { name: 'About', href: '/newabout' },
      { name: 'Blog', href: '/newblog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Research', href: '/research' },
    ],
    connect: [
      { name: 'X (Twitter)', href: 'https://twitter.com/codeboltai', icon: Twitter },
      { name: 'GitHub', href: 'https://github.com/codeboltai', icon: Github },
      { name: 'YouTube', href: 'https://youtube.com/@codeboltai', icon: Youtube },
    ],
    legal: [
      { name: 'Terms', href: '/terms' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'EULA', href: '/eula' },
      { name: 'License', href: '/license' },
      { name: 'DPA', href: '/dpa' },
    ]
  }

  return (
    <footer className="w-full bg-background border-t border-border text-sm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 py-24 border-b border-border gap-16 lg:gap-0">
          <div className="lg:col-span-4 flex flex-col justify-between h-full pr-12">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-8 group">
                <CubeLogo />
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                  Codebolt
                </span>
              </Link>
              <h2 className="text-3xl font-medium tracking-tight text-foreground mb-6">
                Architecting Intelligence.
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                Codebolt builds the kinetic infrastructure required to safely scale recursive reasoning models.
              </p>
            </div>

            <div className="mt-12 lg:mt-24">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Systems Operational
                </span>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Ref: 2025.8F4A
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:border-l border-border lg:pl-16">
            <FooterCol title="Product" items={links.product} />
            <FooterCol title="Resources" items={links.resources} />
            <FooterCol title="Company" items={links.company} />
            <FooterConnectCol items={links.connect} />
            <FooterCol title="Legal" items={links.legal} />
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 py-12 items-start gap-12 lg:gap-0">
          <div className="lg:col-span-5 pr-12 flex flex-col gap-6">
            <div className="text-muted-foreground text-xs font-medium">
              © 2025 Codebolt via Blankline. All rights reserved.
            </div>
            <div className="text-muted-foreground/70 text-[10px] leading-relaxed space-y-3 text-justify">
              <p>
                <strong className="text-muted-foreground">PLATFORM GOVERNANCE:</strong> Codebolt is an advanced autonomous coding environment. The
                underlying architecture utilizes proprietary recursive reasoning models designed to solve complex engineering tasks through
                iterative self-correction.
              </p>
              <p>
                <strong className="text-muted-foreground">COMMERCIAL USE:</strong> Access is governed by enterprise terms. Any unauthorized
                reproduction or redistribution of the platform’s core logic is prohibited.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between h-full lg:pl-16 lg:border-l border-border">
            <div className="text-muted-foreground/70 text-[10px] leading-relaxed space-y-4 text-justify w-full">
              <p>
                <strong className="text-muted-foreground block mb-1">MODEL BEHAVIOR & LIABILITY</strong>
                Codebolt employs stochastic search paths. Output is non-deterministic. The user retains full responsibility for review,
                compilation, and deployment of generated code.
              </p>
              <p>
                <strong className="text-muted-foreground block mb-1">SAFETY ALIGNMENT & ACCEPTABLE USE</strong>
                This platform integrates alignment layers designed to prevent malicious payloads. Attempts to bypass safety guardrails constitute a
                material breach of the Terms of Service.
              </p>
            </div>

            <div className="w-12 h-12 opacity-40 self-end mt-6">
              <svg viewBox="0 0 100 100" className="w-full h-full text-muted-foreground" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="30" strokeWidth="0.5" opacity="0.3" />
                <circle cx="50" cy="50" r="45" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4" />
                <circle cx="80" cy="50" r="2" fill="currentColor" stroke="none" />
                <path d="M 20 50 Q 50 20 80 50" strokeWidth="0.5" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  items,
}: {
  title: string
  items: Array<{ name: string; href: string }>
}) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{title}</h3>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="block text-sm transition-colors duration-200 text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterConnectCol({
  items,
}: {
  items: Array<{ name: string; href: string; icon: React.ComponentType<{ className?: string }> }>
}) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Connect</h3>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm transition-colors duration-200 text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
