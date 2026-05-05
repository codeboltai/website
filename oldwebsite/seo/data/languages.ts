/**
 * Programming languages and frameworks data for PSEO pages
 * Powers language/framework-specific pages
 */

export interface TechStack {
  id: string;
  name: string;
  slug: string;
  type: 'language' | 'framework' | 'library';
  category: string;
  description: string;
  popularity: string;
  useCases: string[];
  codeboltBenefits: string[];
  features: string[];
  targetKeywords: string[];
  relatedStacks: string[];
}

export const techStacks: TechStack[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    slug: 'typescript',
    type: 'language',
    category: 'Languages',
    description: 'Typed superset of JavaScript for scalable applications',
    popularity: 'Most Popular',
    useCases: [
      'Enterprise applications',
      'Full-stack development',
      'API development',
      'React/Vue/Angular apps',
      'Node.js backends'
    ],
    codeboltBenefits: [
      'Type-aware code generation',
      'Interface inference',
      'Automatic type imports',
      'Refactoring with type safety',
      'Multi-file TypeScript editing'
    ],
    features: [
      'AST parsing with Tree-sitter',
      'Type-aware completions',
      'Interface generation',
      'Refactoring safety',
      'Import organization'
    ],
    targetKeywords: [
      'codebolt for typescript',
      'ai typescript development',
      'typescript code generator',
      'ai for typescript',
      'typescript development tools'
    ],
    relatedStacks: ['javascript', 'react', 'nextjs', 'nodejs']
  },
  {
    id: 'python',
    name: 'Python',
    slug: 'python',
    type: 'language',
    category: 'Languages',
    description: 'Versatile language for data science, AI, and web development',
    popularity: 'Very High',
    useCases: [
      'Machine learning and AI',
      'Data analysis',
      'Web development (Django/FastAPI)',
      'Automation and scripting',
      'Scientific computing'
    ],
    codeboltBenefits: [
      'AI/ML model development',
      'Data pipeline automation',
      'FastAPI route generation',
      'Django model generation',
      'Testing with pytest'
    ],
    features: [
      'Python AST parsing',
      'Type hint awareness',
      'Virtual environment support',
      'Framework-specific templates',
      'Data science integration'
    ],
    targetKeywords: [
      'codebolt for python',
      'ai python development',
      'python code generator',
      'ai for python developers',
      'python development tools'
    ],
    relatedStacks: ['django', 'fastapi', 'pandas', 'numpy']
  },
  {
    id: 'rust',
    name: 'Rust',
    slug: 'rust',
    type: 'language',
    category: 'Languages',
    description: 'Systems programming language focused on safety and performance',
    popularity: 'High and Growing',
    useCases: [
      'Systems programming',
      'WebAssembly',
      'CLI tools',
      'Performance-critical applications',
      'Blockchain/cryptocurrency'
    ],
    codeboltBenefits: [
      'Memory-safe code generation',
      'Borrow checker awareness',
      'Macro expansion',
      'Cargo workflow integration',
      'Async/await patterns'
    ],
    features: [
      'Rust AST parsing',
      'Lifetime awareness',
      'Trait generation',
      'Error handling patterns',
      'Cargo.toml management'
    ],
    targetKeywords: [
      'codebolt for rust',
      'ai rust development',
      'rust code generator',
      'ai for rust developers',
      'rust development tools'
    ],
    relatedStacks: ['tokio', 'serde', 'wasm']
  },
  {
    id: 'go',
    name: 'Go',
    slug: 'go',
    type: 'language',
    category: 'Languages',
    description: 'Language for building simple, reliable, and efficient software',
    popularity: 'High',
    useCases: [
      'Microservices',
      'Cloud infrastructure',
      'DevOps tools',
      'APIs and backends',
      'Distributed systems'
    ],
    codeboltBenefits: [
      'Concurrent code generation',
      'Goroutine patterns',
      'Interface implementation',
      'Error handling best practices',
      'Module organization'
    ],
    features: [
      'Go AST parsing',
      'Goroutine safety',
      'Channel patterns',
      'Struct tag generation',
      'Go module support'
    ],
    targetKeywords: [
      'codebolt for go',
      'ai go development',
      'golang code generator',
      'ai for go developers',
      'go development tools'
    ],
    relatedStacks: ['grpc', 'kubernetes', 'docker']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    slug: 'javascript',
    type: 'language',
    category: 'Languages',
    description: 'Universal language for web development',
    popularity: 'Universal',
    useCases: [
      'Frontend development',
      'Node.js backends',
      'Cross-platform mobile',
      'Desktop applications',
      'Serverless functions'
    ],
    codeboltBenefits: [
      'Framework-aware completions',
      'ES6+ syntax',
      'Async patterns',
      'Module management',
      'Cross-platform patterns'
    ],
    features: [
      'Modern JS support',
      'Framework integration',
      'NPM package awareness',
      'TypeScript migration',
      'Build tool integration'
    ],
    targetKeywords: [
      'codebolt for javascript',
      'ai javascript development',
      'javascript code generator',
      'ai for javascript developers',
      'javascript development tools'
    ],
    relatedStacks: ['typescript', 'react', 'nodejs', 'nextjs']
  },
  {
    id: 'java',
    name: 'Java',
    slug: 'java',
    type: 'language',
    category: 'Languages',
    description: 'Enterprise-grade language for large-scale applications',
    popularity: 'High',
    useCases: [
      'Enterprise applications',
      'Android development',
      'Big data processing',
      'Backend services',
      'Financial systems'
    ],
    codeboltBenefits: [
      'Spring Boot integration',
      'Design pattern generation',
      'Enterprise Java patterns',
      'Maven/Gradle workflow',
      'JUnit test generation'
    ],
    features: [
      'Java AST parsing',
      'Spring awareness',
      'Annotation processing',
      'Stream API patterns',
      'Enterprise patterns'
    ],
    targetKeywords: [
      'codebolt for java',
      'ai java development',
      'java code generator',
      'ai for java developers',
      'java development tools'
    ],
    relatedStacks: ['spring', 'maven', 'kotlin']
  },
  {
    id: 'react',
    name: 'React',
    slug: 'react',
    type: 'framework',
    category: 'Frontend Frameworks',
    description: 'Popular library for building user interfaces',
    popularity: 'Most Popular',
    useCases: [
      'Single Page Applications',
      'Progressive Web Apps',
      'Component libraries',
      'Mobile apps (React Native)',
      'Desktop apps (Electron)'
    ],
    codeboltBenefits: [
      'Component generation',
      'Hook patterns',
      'State management',
      'Props typing',
      'Effect optimization'
    ],
    features: [
      'JSX/TSX support',
      'Hook patterns',
      'Component architecture',
      'React Query integration',
      'Next.js awareness'
    ],
    targetKeywords: [
      'codebolt for react',
      'ai react development',
      'react code generator',
      'ai for react developers',
      'react development tools'
    ],
    relatedStacks: ['nextjs', 'typescript', 'javascript', 'redux']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    slug: 'nextjs',
    type: 'framework',
    category: 'Frontend Frameworks',
    description: 'React framework for production-grade applications',
    popularity: 'Very High',
    useCases: [
      'SSR applications',
      'Static site generation',
      'E-commerce sites',
      'SaaS applications',
      'Marketing sites'
    ],
    codeboltBenefits: [
      'App Router patterns',
      'Server components',
      'Route generation',
      'API route creation',
      'Metadata generation'
    ],
    features: [
      'Next.js 14+ support',
      'App Router awareness',
      'Server/Client components',
      'Route patterns',
      'ISR/SSG optimization'
    ],
    targetKeywords: [
      'codebolt for nextjs',
      'ai nextjs development',
      'nextjs code generator',
      'ai for nextjs developers',
      'nextjs development tools'
    ],
    relatedStacks: ['react', 'typescript', 'tailwind']
  },
  {
    id: 'vue',
    name: 'Vue.js',
    slug: 'vue',
    type: 'framework',
    category: 'Frontend Frameworks',
    description: 'Progressive framework for building user interfaces',
    popularity: 'High',
    useCases: [
      'SPAs',
      'Interactive UIs',
      'Progressive enhancement',
      'Component libraries',
      'Mobile apps'
    ],
    codeboltBenefits: [
      'Composition API',
      'Template generation',
      'Reactive patterns',
      'Pinia state management',
      'Vue Router integration'
    ],
    features: [
      'Vue 3 support',
      'Composition API',
      'Template awareness',
      'Script setup patterns',
      'Nuxt.js support'
    ],
    targetKeywords: [
      'codebolt for vue',
      'ai vue development',
      'vue code generator',
      'ai for vue developers',
      'vue development tools'
    ],
    relatedStacks: ['javascript', 'typescript', 'nuxt']
  },
  {
    id: 'django',
    name: 'Django',
    slug: 'django',
    type: 'framework',
    category: 'Backend Frameworks',
    description: 'High-level Python web framework for rapid development',
    popularity: 'High',
    useCases: [
      'Web applications',
      'APIs (Django REST)',
      'Content management',
      'Enterprise apps',
      'Data-driven applications'
    ],
    codeboltBenefits: [
      'Model generation',
      'View creation',
      'URL routing',
      'Template generation',
      'Admin customization'
    ],
    features: [
      'Django 5+ support',
      'ORM patterns',
      'Class-based views',
      'DRF integration',
      'Management commands'
    ],
    targetKeywords: [
      'codebolt for django',
      'ai django development',
      'django code generator',
      'ai for django developers',
      'django development tools'
    ],
    relatedStacks: ['python', 'django-rest', 'postgresql']
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    slug: 'fastapi',
    type: 'framework',
    category: 'Backend Frameworks',
    description: 'Modern Python web framework for building APIs',
    popularity: 'Very High',
    useCases: [
      'REST APIs',
      'Microservices',
      'GraphQL servers',
      'WebSocket services',
      'Async services'
    ],
    codeboltBenefits: [
      'Endpoint generation',
      'Pydantic models',
      'Dependency injection',
      'Async patterns',
      'OpenAPI docs'
    ],
    features: [
      'FastAPI patterns',
      'Pydantic integration',
      'Async/await support',
      'Route generation',
      'Middleware patterns'
    ],
    targetKeywords: [
      'codebolt for fastapi',
      'ai fastapi development',
      'fastapi code generator',
      'ai for fastapi developers',
      'fastapi development tools'
    ],
    relatedStacks: ['python', 'pydantic', 'sqlalchemy']
  },
  {
    id: 'spring',
    name: 'Spring Boot',
    slug: 'spring-boot',
    type: 'framework',
    category: 'Backend Frameworks',
    description: 'Java framework for building production-grade applications',
    popularity: 'High',
    useCases: [
      'Microservices',
      'Enterprise applications',
      'REST APIs',
      'Web services',
      'Batch processing'
    ],
    codeboltBenefits: [
      'Controller generation',
      'Service patterns',
      'Repository patterns',
      'Configuration management',
      'Security integration'
    ],
    features: [
      'Spring Boot 3+',
      'Auto-configuration',
      'Dependency injection',
      'REST controllers',
      'Data JPA patterns'
    ],
    targetKeywords: [
      'codebolt for spring boot',
      'ai spring development',
      'spring code generator',
      'ai for spring developers',
      'spring development tools'
    ],
    relatedStacks: ['java', 'maven', 'microservices']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    slug: 'nodejs',
    type: 'framework',
    category: 'Backend Frameworks',
    description: 'JavaScript runtime for building server-side applications',
    popularity: 'Very High',
    useCases: [
      'APIs',
      'Microservices',
      'Real-time applications',
      'Serverless functions',
      'CLI tools'
    ],
    codeboltBenefits: [
      'Express route generation',
      'Middleware patterns',
      'Async/await workflows',
      'NPM package management',
      'Testing with Jest'
    ],
    features: [
      'Express/Koa support',
      'Async patterns',
      'Stream handling',
      'Event-driven patterns',
      'TypeScript integration'
    ],
    targetKeywords: [
      'codebolt for nodejs',
      'ai nodejs development',
      'nodejs code generator',
      'ai for nodejs developers',
      'nodejs development tools'
    ],
    relatedStacks: ['typescript', 'express', 'javascript']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    slug: 'tailwind',
    type: 'framework',
    category: 'CSS Frameworks',
    description: 'Utility-first CSS framework for rapid UI development',
    popularity: 'Very High',
    useCases: [
      'Component styling',
      'Responsive design',
      'Custom themes',
      'Design systems',
      'Rapid prototyping'
    ],
    codeboltBenefits: [
      'Class name generation',
      'Responsive utilities',
      'Component variants',
      'Theme integration',
      'Animation utilities'
    ],
    features: [
      'Tailwind 3+ support',
      'Utility awareness',
      'Responsive patterns',
      'Dark mode support',
      'Custom themes'
    ],
    targetKeywords: [
      'codebolt for tailwind',
      'ai tailwind development',
      'tailwind code generator',
      'ai for tailwind developers',
      'tailwind development tools'
    ],
    relatedStacks: ['react', 'nextjs', 'vue']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    slug: 'postgresql',
    type: 'library',
    category: 'Databases',
    description: 'Powerful open-source relational database',
    popularity: 'Very High',
    useCases: [
      'Transactional systems',
      'Data warehousing',
      'Geospatial data',
      'Time-series data',
      'JSON/document storage'
    ],
    codeboltBenefits: [
      'Schema generation',
      'Query optimization',
      'Migration generation',
      'Index recommendations',
      'ORM integration'
    ],
    features: [
      'SQL generation',
      'Schema awareness',
      'Migration support',
      'Performance hints',
      'Type mapping'
    ],
    targetKeywords: [
      'codebolt for postgresql',
      'ai database development',
      'postgresql tools',
      'ai for sql development',
      'database development tools'
    ],
    relatedStacks: ['sql', 'prisma', 'typeorm']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    slug: 'mongodb',
    type: 'library',
    category: 'Databases',
    description: 'Document-oriented NoSQL database',
    popularity: 'High',
    useCases: [
      'Document storage',
      'Real-time applications',
      'Content management',
      'Mobile backends',
      'Big data'
    ],
    codeboltBenefits: [
      'Schema design',
      'Aggregation pipelines',
      'Index optimization',
      'Mongoose schema generation',
      'Query patterns'
    ],
    features: [
      'NoSQL patterns',
      'Document modeling',
      'Aggregation support',
      'Index hints',
      'Replication awareness'
    ],
    targetKeywords: [
      'codebolt for mongodb',
      'ai mongodb development',
      'mongodb tools',
      'ai for nosql development',
      'nosql development tools'
    ],
    relatedStacks: ['nodejs', 'mongoose', 'javascript']
  }
];

// Helper functions
export function getTechStackBySlug(slug: string): TechStack | undefined {
  return techStacks.find(ts => ts.slug === slug);
}

export function getAllTechStackSlugs(): string[] {
  return techStacks.map(ts => ts.slug);
}

export function getTechStacksByCategory(category: string): TechStack[] {
  return techStacks.filter(ts => ts.category === category);
}

export function getTechStacksByType(type: TechStack['type']): TechStack[] {
  return techStacks.filter(ts => ts.type === type);
}

export function generateTechStackMetadata(techStack: TechStack) {
  return {
    title: `CodeBolt for ${techStack.name} | AI-Powered ${techStack.category}`,
    description: `Accelerate ${techStack.name} development with CodeBolt's multi-agent AI. ${techStack.codeboltBenefits[0]}, ${techStack.codeboltBenefits[1]}, and more.`,
    keywords: [
      `codebolt for ${techStack.slug}`,
      `ai ${techStack.slug} development`,
      `${techStack.slug} code generator`,
      `ai for ${techStack.slug} developers`,
      ...techStack.targetKeywords
    ]
  };
}
