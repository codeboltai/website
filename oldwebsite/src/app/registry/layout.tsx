'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface RegistryLayoutProps {
  children: ReactNode;
}

export default function RegistryLayout({ children }: RegistryLayoutProps) {
  const pathname = usePathname();
  
  const tabs = [
    {
      name: 'AI Agents',
      href: '/registry/agents',
      description: 'Pre-built AI agents',
      isActive: pathname.startsWith('/registry/agents'),
    },
    {
      name: 'MCP Tools',
      href: '/registry/mcp-tools',
      description: 'Model Context Protocol servers',
      isActive: pathname.startsWith('/registry/mcp-tools'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Registry Header */}
      <div className="bg-card border-b border-border pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-3">
                Registry
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover and deploy MCP tools and AI agents to extend your development capabilities
              </p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex justify-center">
              <div className="flex bg-muted p-1 rounded-lg">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={`relative px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      tab.isActive
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">{tab.name}</div>
                      <div className="text-xs mt-1 opacity-75">{tab.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Page Content */}
      <div>{children}</div>
    </div>
  );
}