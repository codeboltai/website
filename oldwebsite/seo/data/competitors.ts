/**
 * Competitor data for PSEO comparison pages
 * This data powers the "vs" pages generation
 */

export interface Competitor {
  id: string;
  name: string;
  slug: string;
  website: string;
  type: 'ai-copilot' | 'ai-platform' | 'ide' | 'agent-platform';
  description: string;
  keyFeatures: string[];
  pricing: string;
  strengths: string[];
  weaknesses: string[];
  codeboltAdvantages: string[];
  targetKeywords: string[];
}

export const competitors: Competitor[] = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    website: 'https://github.com/features/copilot',
    type: 'ai-copilot',
    description: 'AI code completion tool powered by OpenAI Codex',
    keyFeatures: [
      'Code completion',
      'Multi-line suggestions',
      'Natural language prompts',
      'IDE integration'
    ],
    pricing: '$10-$19/month',
    strengths: [
      'Wide IDE support',
      'Good at boilerplate code',
      'Fast autocomplete',
      'GitHub integration'
    ],
    weaknesses: [
      'Single agent only',
      'Limited context window',
      'No task coordination',
      'No persistent memory'
    ],
    codeboltAdvantages: [
      'Multi-agent parallelization (5-10x faster)',
      'Infinite context through memory systems',
      'Job coordination and task splitting',
      'Full codebase understanding',
      'Stigmergy-based agent collaboration',
      '24/7 autonomous development'
    ],
    targetKeywords: [
      'codebolt vs github copilot',
      'github copilot alternative',
      'better than github copilot',
      'multi-agent ai code assistant'
    ]
  },
  {
    id: 'cursor',
    name: 'Cursor',
    slug: 'cursor',
    website: 'https://cursor.sh',
    type: 'ide',
    description: 'AI-first code editor built on VS Code',
    keyFeatures: [
      'AI chat interface',
      'Codebase indexing',
      'Multi-file editing',
      'Command palette'
    ],
    pricing: '$20/month',
    strengths: [
      'Familiar VS Code interface',
      'Good codebase awareness',
      'Chat with codebase',
      'Fast iteration'
    ],
    weaknesses: [
      'Single AI agent',
      'No multi-agent coordination',
      'Limited to VS Code ecosystem',
      'No background agents'
    ],
    codeboltAdvantages: [
      'Multi-agent swarms vs single agent',
      'Dedicated agent types (local, global, external)',
      'Stigmergy coordination system',
      'Background agents for long tasks',
      'Agent economy with reputation',
      'Multi-environment support'
    ],
    targetKeywords: [
      'codebolt vs cursor',
      'cursor alternative',
      'multi-agent vs single agent ide',
      'best ai code editor'
    ]
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    slug: 'windsurf',
    website: 'https://codeium.com/windsurf',
    type: 'ide',
    description: 'AI-native IDE by Codeium with collaborative features',
    keyFeatures: [
      'AI chat',
      'Code completion',
      'Refactoring tools',
      'Collaborative editing'
    ],
    pricing: 'Free tier available',
    strengths: [
      'Free option',
      'Good completion',
      'Collaborative features',
      'Clean interface'
    ],
    weaknesses: [
      'Single-agent approach',
      'No swarm intelligence',
      'Limited task automation',
      'No job coordination'
    ],
    codeboltAdvantages: [
      'Swarm intelligence vs single agent',
      'Job bidding and allocation',
      'Stigmergy-based coordination',
      'Agent reputation systems',
      'Persistent memory across sessions',
      'Multi-environment workflows'
    ],
    targetKeywords: [
      'codebolt vs windsurf',
      'windsurf alternative',
      'ai ide comparison',
      'best free ai code editor'
    ]
  },
  {
    id: 'devin',
    name: 'Devin',
    slug: 'devin',
    website: 'https://www.cognition.ai',
    type: 'agent-platform',
    description: 'Autonomous AI software engineer by Cognition',
    keyFeatures: [
      'Autonomous coding',
      'Task planning',
      'Self-correction',
      'Terminal access'
    ],
    pricing: 'Enterprise pricing',
    strengths: [
      'Fully autonomous',
      'Can work independently',
      'Good at complex tasks',
      'Self-debugging'
    ],
    weaknesses: [
      'One agent vs team of agents',
      'No parallel execution',
      'Black-box operations',
      'Limited user control'
    ],
    codeboltAdvantages: [
      'Team of agents vs one agent',
      'Transparent agent operations',
      'Parallel task execution',
      'Human oversight and control',
      'Stigmergy coordination',
      'Local deployment option',
      'Multi-agent consensus mechanisms'
    ],
    targetKeywords: [
      'codebolt vs devin',
      'devin alternative',
      'multi-agent vs single ai engineer',
      'autonomous ai development'
    ]
  },
  {
    id: 'codeium',
    name: 'Codeium',
    slug: 'codeium',
    website: 'https://codeium.com',
    type: 'ai-copilot',
    description: 'Free AI code completion tool',
    keyFeatures: [
      'Code completion',
      'Chat interface',
      'Multi-language support',
      'Free tier'
    ],
    pricing: 'Free',
    strengths: [
      'Completely free',
      'Good completions',
      'Wide language support',
      'No usage limits'
    ],
    weaknesses: [
      'Basic copilot features',
      'No multi-agent',
      'No task automation',
      'Limited advanced features'
    ],
    codeboltAdvantages: [
      'Multi-agent orchestration',
      'Job coordination systems',
      'Persistent memory',
      'Agent economy and reputation',
      'Stigmergy-based coordination',
      'Advanced planning systems'
    ],
    targetKeywords: [
      'codebolt vs codeium',
      'codeium alternative',
      'free ai code assistant',
      'advanced ai code completion'
    ]
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    slug: 'tabnine',
    website: 'https://www.tabnine.com',
    type: 'ai-copilot',
    description: 'AI code assistant with local models',
    keyFeatures: [
      'Code completion',
      'Local AI models',
      'Private deployment',
      'Team learning'
    ],
    pricing: '$12-$49/month',
    strengths: [
      'Privacy-focused',
      'Local model option',
      'Custom training',
      'Enterprise features'
    ],
    weaknesses: [
      'Single agent only',
      'No coordination',
      'Limited to completions',
      'No autonomous tasks'
    ],
    codeboltAdvantages: [
      'Multi-agent collaboration',
      'Local AND cloud models',
      'Full self-hosting option',
      'Job orchestration',
      'Stigmergy coordination',
      'Agent reputation systems'
    ],
    targetKeywords: [
      'codebolt vs tabnine',
      'tabnine alternative',
      'local ai code assistant',
      'private ai development tool'
    ]
  },
  {
    id: 'jetbrains-ai',
    name: 'JetBrains AI',
    slug: 'jetbrains-ai',
    website: 'https://www.jetbrains.com/ai',
    type: 'ai-copilot',
    description: 'AI assistant integrated into JetBrains IDEs',
    keyFeatures: [
      'Code completion',
      'Chat interface',
      'Refactoring',
      'Documentation generation'
    ],
    pricing: 'Included with IDE',
    strengths: [
      'Deep IDE integration',
      'Context aware',
      'Multiple model support',
      'Part of JetBrains ecosystem'
    ],
    weaknesses: [
      'JetBrains only',
      'Single agent',
      'No cross-IDE workflows',
      'No multi-agent'
    ],
    codeboltAdvantages: [
      'Works with any environment',
      'Multi-agent parallelization',
      'Cross-project coordination',
      'Standalone IDE',
      'Agent swarms',
      'Job coordination'
    ],
    targetKeywords: [
      'codebolt vs jetbrains ai',
      'jetbrains ai alternative',
      'ai for jetlands ide',
      'best ai code completion'
    ]
  },
  {
    id: 'amazon-codewhisperer',
    name: 'Amazon CodeWhisperer',
    slug: 'amazon-codewhisperer',
    website: 'https://aws.amazon.com/codewhisperer',
    type: 'ai-copilot',
    description: 'AI code generator by AWS',
    keyFeatures: [
      'Code completion',
      'AWS integration',
      'Security scanning',
      'Free tier'
    ],
    pricing: 'Free tier available',
    strengths: [
      'AWS service integration',
      'Security focused',
      'Free individual tier',
      'Enterprise support'
    ],
    weaknesses: [
      'AWS ecosystem focused',
      'Basic completions',
      'No advanced coordination',
      'Limited to AWS workflows'
    ],
    codeboltAdvantages: [
      'Cloud-agnostic',
      'Multi-agent workflows',
      'Any tech stack',
      'Job orchestration',
      'Stigmergy coordination',
      'Multi-environment support'
    ],
    targetKeywords: [
      'codebolt vs codewhisperer',
      'codewhisperer alternative',
      'aws ai coding assistant',
      'best ai for aws development'
    ]
  },
  {
    id: 'sourcegraph-cody',
    name: 'Sourcegraph Cody',
    slug: 'sourcegraph-cody',
    website: 'https://about.sourcegraph.com/cody',
    type: 'ai-copilot',
    description: 'AI coding assistant with codebase intelligence',
    keyFeatures: [
      'Codebase chat',
      'Code graph awareness',
      'Multi-file editing',
      'Context understanding'
    ],
    pricing: '$9-$19/month',
    strengths: [
      'Deep code understanding',
      'Good at large codebases',
      'Code graph integration',
      'Context aware'
    ],
    weaknesses: [
      'Single agent',
      'No parallelization',
      'Limited automation',
      'No background tasks'
    ],
    codeboltAdvantages: [
      'Multi-agent speed',
      'Job coordination',
      'Background agents',
      'Stigmergy collaboration',
      'Agent reputation',
      '24/7 autonomous work'
    ],
    targetKeywords: [
      'codebolt vs cody',
      'cody alternative',
      'sourcegraph ai assistant',
      'best ai for large codebases'
    ]
  },
  {
    id: 'replit-ghostwriter',
    name: 'Replit Ghostwriter',
    slug: 'replit-ghostwriter',
    website: 'https://replit.com/site/ghostwriter',
    type: 'ai-copilot',
    description: 'AI assistant integrated into Replit IDE',
    keyFeatures: [
      'Code completion',
      'Chat interface',
      'Project explanation',
      'Replit integration'
    ],
    pricing: '$10-$20/month',
    strengths: [
      'Great for learning',
      'Integrated with Replit',
      'Good explanations',
      'Quick prototyping'
    ],
    weaknesses: [
      'Replit only',
      'Limited to web projects',
      'Single agent',
      'No advanced workflows'
    ],
    codeboltAdvantages: [
      'Full desktop IDE',
      'Any tech stack',
      'Multi-agent teams',
      'Local development',
      'Advanced coordination',
      'Production-ready workflows'
    ],
    targetKeywords: [
      'codebolt vs ghostwriter',
      'ghostwriter alternative',
      'replit ai assistant',
      'best ai for learning to code'
    ]
  },
  {
    id: 'pythoun-continue',
    name: 'Continue',
    slug: 'continue',
    website: 'https://continue.dev',
    type: 'ai-copilot',
    description: 'Open-source AI code assistant',
    keyFeatures: [
      'Open source',
      'Multi-model support',
      'VS Code extension',
      'Customizable'
    ],
    pricing: 'Free (self-hosted)',
    strengths: [
      'Open source',
      'Privacy focused',
      'Customizable',
      'Multiple LLMs'
    ],
    weaknesses: [
      'Single agent only',
      'Basic features',
      'No coordination',
      'Limited automation'
    ],
    codeboltAdvantages: [
      'Multi-agent orchestration',
      'Advanced coordination',
      'Full IDE (not extension)',
      'Job systems',
      'Agent economy',
      'Stigmergy intelligence'
    ],
    targetKeywords: [
      'codebolt vs continue',
      'continue alternative',
      'open source ai code assistant',
      'best open source ai coder'
    ]
  },
  {
    id: 'v0-dev',
    name: 'v0.dev',
    slug: 'v0-dev',
    website: 'https://v0.dev',
    type: 'ai-platform',
    description: 'AI UI generator by Vercel',
    keyFeatures: [
      'UI generation',
      'React components',
      'Tailwind styling',
      'Real-time preview'
    ],
    pricing: 'Free tier available',
    strengths: [
      'Great for UI',
      'Fast iteration',
      'Modern stack',
      'Copy-paste ready'
    ],
    weaknesses: [
      'UI focused only',
      'No full app development',
      'No backend logic',
      'No coordination'
    ],
    codeboltAdvantages: [
      'Full-stack development',
      'Backend + frontend',
      'Multi-agent coordination',
      'Complete application development',
      'Database integration',
      'Deployment workflows'
    ],
    targetKeywords: [
      'codebolt vs v0',
      'v0 alternative',
      'ai ui generator',
      'best ai for react development'
    ]
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    slug: 'bolt-new',
    website: 'https://bolt.new',
    type: 'ai-platform',
    description: 'AI full-stack app builder',
    keyFeatures: [
      'Full-stack apps',
      'Browser-based IDE',
      'Instant deployment',
      'AI chat'
    ],
    pricing: 'Free tier available',
    strengths: [
      'Quick prototyping',
      'No setup needed',
      'Good for MVPs',
      'Instant deployment'
    ],
    weaknesses: [
      'Browser limited',
      'Single AI chat',
      'No multi-agent',
      'Simple projects only'
    ],
    codeboltAdvantages: [
      'Desktop IDE power',
      'Multi-agent swarms',
      'Complex project support',
      'Local development',
      'Advanced coordination',
      'Production ready'
    ],
    targetKeywords: [
      'codebolt vs bolt',
      'bolt new alternative',
      'ai app builder',
      'best ai for full-stack development'
    ]
  },
  {
    id: 'lovable',
    name: 'Lovable',
    slug: 'lovable',
    website: 'https://lovable.dev',
    type: 'ai-platform',
    description: 'AI app generator with GitHub integration',
    keyFeatures: [
      'App generation',
      'GitHub sync',
      'UI preview',
      'Iteration'
    ],
    pricing: '$20/month',
    strengths: [
      'GitHub integration',
      'Good for startups',
      'Fast iteration',
      'Clean UI'
    ],
    weaknesses: [
      'Simple projects only',
      'Single agent workflow',
      'Limited complexity',
      'No coordination'
    ],
    codeboltAdvantages: [
      'Complex project support',
      'Multi-agent parallelization',
      'Job coordination',
      'Advanced workflows',
      'Enterprise ready',
      'Full observability'
    ],
    targetKeywords: [
      'codebolt vs lovable',
      'lovable alternative',
      'ai app generator',
      'best ai for startup mvp'
    ]
  },
  {
    id: ' Windsurf-cursor',
    name: 'Windsurf + Cursor',
    slug: 'windsurf-cursor-combined',
    website: '',
    type: 'ide',
    description: 'Comparison against combined AI IDE features',
    keyFeatures: [
      'AI chat',
      'Code completion',
      'Codebase awareness',
      'IDE integration'
    ],
    pricing: '$20/month combined',
    strengths: [
      'Feature complete',
      'Good experience',
      'Modern UI'
    ],
    weaknesses: [
      'Still single agent',
      'No swarm intelligence',
      'No job coordination',
      'Limited parallelization'
    ],
    codeboltAdvantages: [
      'Swarm intelligence paradigm',
      'Agent economy and reputation',
      'Stigmergy coordination',
      'Background agents',
      '24/7 autonomous work',
      'Multi-environment coordination'
    ],
    targetKeywords: [
      'codebolt vs windsurf cursor',
      'better than ai ide',
      'next generation ai ide',
      'swarm vs single agent ide'
    ]
  }
];

// Helper to get competitor by slug
export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return competitors.find(c => c.slug === slug);
}

// Helper to get all competitor slugs for static generation
export function getAllCompetitorSlugs(): string[] {
  return competitors.map(c => c.slug);
}

// Helper to get competitors by type
export function getCompetitorsByType(type: Competitor['type']): Competitor[] {
  return competitors.filter(c => c.type === type);
}

// Generate page metadata
export function generateComparisonMetadata(competitor: Competitor) {
  return {
    title: `CodeBolt vs ${competitor.name} | Multi-Agent AI IDE Comparison`,
    description: `Compare CodeBolt's multi-agent swarm intelligence to ${competitor.name}. Discover how parallel AI development delivers 5-10x productivity gains through coordinated agent teams.`,
    keywords: [
      `codebolt vs ${competitor.slug}`,
      `codebolt vs ${competitor.name.toLowerCase()}`,
      `${competitor.slug} alternative`,
      'multi-agent ai ide',
      'ai code assistant comparison',
      ...competitor.targetKeywords
    ],
    ogImage: `/images/og/vs-${competitor.slug}.png`
  };
}
