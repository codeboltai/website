export type NewBlogCategory = 'Research' | 'Architecture' | 'Engineering' | 'Feature'

export interface NewBlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string // YYYY.MM.DD
  readTime: string
  id: string
  category: NewBlogCategory
  heroImage: string
}

export const newBlogPosts: NewBlogPost[] = [
  {
    slug: 'horizon-mode-distributed-reasoning',
    title: 'Horizon Mode: 24-Hour Reasoning Horizons',
    excerpt:
      'Breaking the Linearity Barrier with Recursive Swarm Architecture. How we enable coherent AI reasoning over extended time horizons.',
    author: 'Blankline Research',
    date: '2025.12.20',
    readTime: '14m read',
    id: 'PUB-301',
    category: 'Research',
    heroImage:
      'https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=1200',
  },
  {
    slug: 'd3-engine-neuro-symbolic-runtime',
    title: 'The D3 Engine: Neuro-Symbolic Runtime Architecture',
    excerpt:
      'Introducing Dynamic Distillation & Deployment — how we reduce compute costs by 99% while maintaining engineering-grade accuracy.',
    author: 'Blankline Research',
    date: '2025.12.15',
    readTime: '15m read',
    id: 'PUB-300',
    category: 'Research',
    heroImage:
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1200',
  },
  {
    slug: 'infinite-context-state-virtualization',
    title: 'Infinite Context Through State Virtualization',
    excerpt:
      'How we achieved a 50:1 compression ratio while maintaining 99.9% recall accuracy. A deep dive into our memory architecture.',
    author: 'Blankline Research',
    date: '2025.11.28',
    readTime: '12m read',
    id: 'PUB-299',
    category: 'Architecture',
    heroImage:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200',
  },
  {
    slug: 'ast-parsing-tree-sitter-40-languages',
    title: 'AST Parsing at Scale: Tree-sitter Across 40 Languages',
    excerpt:
      'How Codebolt achieves deep code understanding through intelligent AST parsing. A technical deep-dive into our polyglot parsing infrastructure.',
    author: 'Blankline Research',
    date: '2025.11.20',
    readTime: '11m read',
    id: 'PUB-298.5',
    category: 'Architecture',
    heroImage:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200',
  },
  {
    slug: 'zero-overhead-runtime-rust',
    title: 'Fighting the Lag: Designing a Zero-Overhead Runtime',
    excerpt:
      "LLMs are inherently slow. The runtime wrapping them shouldn't be. How we are migrating the engine to Rust to strip away every microsecond of overhead.",
    author: 'Blankline Research',
    date: '2025.11.12',
    readTime: '10m read',
    id: 'PUB-298',
    category: 'Engineering',
    heroImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200',
  },
  {
    slug: 'introducing-collaborative-sessions',
    title: 'Introducing Collaborative Sessions',
    excerpt:
      'We are introducing Session Forking. Generate immutable, shareable links to your environments and fork the exact reasoning context.',
    author: 'Blankline Research',
    date: '2025.11.05',
    readTime: '6m read',
    id: 'PUB-297',
    category: 'Feature',
    heroImage:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200',
  },
]

export function getNewBlogPostBySlug(slug: string) {
  return newBlogPosts.find((p) => p.slug === slug) ?? null
}

