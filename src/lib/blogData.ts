export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  pubId: string
  image?: string
  views: number
  likes: number
  comments: number
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    pubId: 'PUB-301',
    slug: 'horizon-mode-distributed-reasoning',
    title: 'Horizon Mode: 24-Hour Reasoning Horizons',
    excerpt:
      "Breaking the Linearity Barrier with Recursive Swarm Architecture. How we enable coherent AI reasoning over extended time horizons.",
    author: 'Blankline Research',
    publishDate: '2025-12-20',
    readTime: '14m read',
    category: 'Research',
    tags: ['Research', 'Engineering', 'Autonomous', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=1200',
    views: 2847,
    likes: 192,
    comments: 17,
    content: `
      <div id="introduction"></div>
      <div class="mb-12">
        <p class="text-xl text-muted-foreground font-light leading-relaxed mb-8">
          Current Foundation Models operate fundamentally as linear sequence generators. While effective for generalist tasks, this paradigm suffers from stochastic degradation in high-assurance engineering domains. We introduce Horizon Mode, a distributed reasoning protocol that orchestrates thousands of isolated agents via a Recursive Swarm Architecture. By decoupling reasoning time from fixed context windows, we shift the optimization target from latency to solution space coverage.
        </p>
      </div>

      <div>
        <h2 id="the-linearity-barrier" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">The Linearity Barrier</h2>
        <p class="text-muted-foreground leading-relaxed mb-8">
          The probability of maintaining a valid terminal state decays exponentially with the length of the reasoning chain. If the probability of a logic error at any node is ε, the cumulative success rate is P(success) ≈ (1-ε)^L. For a task requiring 500 steps, even with 99% accuracy per step, the success rate drops to less than 1%. Dropstone bypasses this by transitioning from Next-Token Prediction to Trajectory Search Optimization.
        </p>
      </div>

      <div>
        <h2 id="the-recursive-swarm-architecture" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">The Recursive Swarm Architecture</h2>
        <p class="text-muted-foreground leading-relaxed mb-8">
          Dropstone redefines the IDE as an intelligent runtime environment. Instead of querying a single endpoint, it instantiates a search tree across thousands of agents. We deploy up to 10,000 isolated agents within ephemeral sandboxes. Divergent Initialization generates thousands of strategic variations, exploring low-probability solution paths (P &lt; 0.05) often pruned by standard models. Agents write, compile, fail, debug, and iterate in real-time using actual compilers.
        </p>

        <div class="bg-card border border-border rounded-sm p-4 font-mono text-sm overflow-x-auto mb-8">
          <div class="flex items-center justify-between border-b border-border pb-2 mb-4 text-xs text-muted-foreground">
            <span>swarm_consensus.py</span>
            <span>Python 3.10</span>
          </div>
<pre class="text-muted-foreground whitespace-pre-wrap">async def flash_gated_consensus(swarm: AgentSwarm):
    """Flash-Gated Consensus Protocol"""

    while swarm.active:
        # Parallel execution across all agents
        results = await asyncio.gather(*[
            agent.execute_step() for agent in swarm.agents
        ])

        for agent, result in zip(swarm.agents, results):
            if result.confidence &gt; 0.95:
                # Emit flash signal - freeze swarm
                swarm.freeze()

                # Adversarial verification
                verified = await verify_solution(result.solution)

                if verified:
                    return result.solution
                else:
                    # Vectorize failure and broadcast
                    constraint = create_failure_embedding(result)
                    swarm.broadcast_constraint(constraint)
                    swarm.prune_similar_paths(constraint)

                swarm.resume()</pre>
        </div>
      </div>

      <div>
        <h2 id="budget-aware-heterogeneous-topology" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Budget-Aware Heterogeneous Topology</h2>
        <p class="text-muted-foreground leading-relaxed mb-8">
          To make scaling economically viable, we treat compute as a liquid asset that flows to the most promising solution branches. Layer 1 (Scout Swarm) uses highly optimized 8B parameter models for 98% of exploration at near-zero marginal cost. Scouts tag branches with probability vectors — dead ends are marked in the shared workspace, preventing other agents from wasting compute. Layer 2 (Context Promotion) triggers when a Scout identifies a candidate solution with high confidence (P &gt; 0.85), promoting the state to Frontier Models (Opus/GPT-4 class).
        </p>
      </div>

      <div>
        <h2 id="empirical-results" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Empirical Results</h2>
        <p class="text-muted-foreground leading-relaxed mb-8">
          On the Deep-Sec benchmark, Horizon Mode achieved: 24+ hour reasoning horizons (vs. &lt;1 hour for zero-shot), 1.4% hallucination rate (vs. 14.2% baseline), and 0.2% safety violations (vs. 3.8% baseline). The Flash-Gated Consensus Protocol reduced safety violations by 89% compared to zero-shot baselines while enabling continuous operation over multi-day engineering tasks.
        </p>
      </div>

      <div class="py-8">
        <blockquote class="border-l-2 border-primary pl-6 italic text-xl text-foreground font-light leading-relaxed">
          "By acknowledging the Linearity Barrier, we have moved beyond the 'better prompt' fallacy towards a robust architectural solution."
        </blockquote>
      </div>

      <div>
        <h2 id="conclusion" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Conclusion</h2>
        <p class="text-muted-foreground leading-relaxed">
          Horizon Mode represents a paradigm shift in automated reasoning. The synergy between the Budget-Aware Swarm and the Flash-Gated Consensus Protocol creates a system that is economically viable and probabilistically superior to linear reasoning methods. This architecture enables Dropstone to tackle complex engineering projects that require sustained reasoning over days, not hours.
        </p>
      </div>
    `,
  },
  {
    id: '2',
    pubId: 'PUB-300',
    slug: 'd3-engine-neuro-symbolic-runtime',
    title: 'The D3 Engine: Neuro-Symbolic Runtime Architecture',
    excerpt:
      'Introducing Dynamic Distillation & Deployment — how we reduce compute costs while maintaining engineering-grade accuracy.',
    author: 'Blankline Research',
    publishDate: '2025-12-15',
    readTime: '15m read',
    category: 'Research',
    tags: ['Research', 'Architecture', 'Compression', 'Runtime'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200',
    views: 1974,
    likes: 141,
    comments: 12,
    content: `
      <div id="introduction"></div>
      <p class="text-muted-foreground leading-relaxed mb-8">
        The D3 Engine is a neuro-symbolic runtime designed to virtualize context and preserve logical constraints at scale. This post outlines the architectural primitives and why “infinite context” must be engineered as a system, not a prompt.
      </p>
      <h2 id="overview" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Overview</h2>
      <p class="text-muted-foreground leading-relaxed mb-8">
        Dynamic Distillation &amp; Deployment compresses semantic state while retaining invariants. The result is a persistent memory manifold that stays coherent across long-running refactors.
      </p>
      <h2 id="implications" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Implications</h2>
      <p class="text-muted-foreground leading-relaxed">
        With D3, the runtime promotes high-confidence states, prunes dead branches, and maintains auditability across iterations.
      </p>
    `,
  },
  {
    id: '3',
    pubId: 'PUB-299',
    slug: 'infinite-context-state-virtualization',
    title: 'Infinite Context Through State Virtualization',
    excerpt:
      'How we achieve large compression ratios while maintaining recall accuracy — a deep dive into memory topology.',
    author: 'Blankline Research',
    publishDate: '2025-11-28',
    readTime: '12m read',
    category: 'Architecture',
    tags: ['Architecture', 'Memory', 'Context', 'Virtualization'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200',
    views: 1655,
    likes: 118,
    comments: 9,
    content: `
      <div id="introduction"></div>
      <p class="text-muted-foreground leading-relaxed mb-8">
        State virtualization treats context as a structured asset rather than a fixed window. By caching invariants and rehydrating only the necessary frontier, systems can reason far beyond linear token limits.
      </p>
      <h2 id="compression" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Compression</h2>
      <p class="text-muted-foreground leading-relaxed mb-8">
        Compression without losing constraints requires topology-aware distillation — the system must understand which details are safe to discard.
      </p>
      <h2 id="retrieval" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Retrieval</h2>
      <p class="text-muted-foreground leading-relaxed">
        Retrieval is a scheduling problem: allocate attention to the branch most likely to change outcome, not the branch that’s easiest to summarize.
      </p>
    `,
  },
  {
    id: '4',
    pubId: 'PUB-298.5',
    slug: 'ast-parsing-tree-sitter-40-languages',
    title: 'AST Parsing at Scale: Tree-sitter Across 40 Languages',
    excerpt:
      'How deep code understanding emerges from polyglot parsing pipelines — and why ASTs are the right abstraction layer.',
    author: 'Blankline Research',
    publishDate: '2025-11-20',
    readTime: '11m read',
    category: 'Architecture',
    tags: ['Architecture', 'Parsing', 'Tree-sitter', 'Polyglot'],
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=1200',
    views: 1422,
    likes: 103,
    comments: 7,
    content: `
      <div id="introduction"></div>
      <p class="text-muted-foreground leading-relaxed mb-8">
        Reliable refactoring needs structure. Tree-sitter provides consistent ASTs across ecosystems, enabling transformations that are syntax-aware and language-agnostic.
      </p>
      <h2 id="pipeline" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Pipeline</h2>
      <p class="text-muted-foreground leading-relaxed mb-8">
        The parsing layer normalizes source into a unified IR, so downstream systems can operate on intent rather than text.
      </p>
      <h2 id="edge-cases" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Edge Cases</h2>
      <p class="text-muted-foreground leading-relaxed">
        Mixed-language repositories require incremental parsing and robust caching to avoid recomputation during iterative edits.
      </p>
    `,
  },
  {
    id: '5',
    pubId: 'PUB-298',
    slug: 'zero-overhead-runtime-rust',
    title: 'Fighting the Lag: Designing a Zero-Overhead Runtime',
    excerpt:
      'LLMs are slow. The runtime wrapping them should not be. A look at systems-level optimization for agent loops.',
    author: 'Blankline Research',
    publishDate: '2025-11-12',
    readTime: '10m read',
    category: 'Engineering',
    tags: ['Engineering', 'Runtime', 'Rust', 'Performance'],
    image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200',
    views: 1531,
    likes: 111,
    comments: 8,
    content: `
      <div id="introduction"></div>
      <p class="text-muted-foreground leading-relaxed mb-8">
        The fastest model call still needs orchestration. This piece covers how we strip overhead from scheduling, I/O, and verification to keep loops tight.
      </p>
      <h2 id="why-rust" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Why Rust</h2>
      <p class="text-muted-foreground leading-relaxed mb-8">
        Predictable latency requires predictable systems. Rust enables zero-cost abstractions without sacrificing safety.
      </p>
      <h2 id="profiling" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Profiling</h2>
      <p class="text-muted-foreground leading-relaxed">
        Most “AI latency” is coordination latency. Fix the scheduler and the system feels an order of magnitude faster.
      </p>
    `,
  },
  {
    id: '6',
    pubId: 'PUB-297',
    slug: 'introducing-collaborative-sessions',
    title: 'Introducing Collaborative Sessions',
    excerpt:
      'Session forking enables immutable, shareable links to exact reasoning contexts — teammates can fork and continue the thread.',
    author: 'Blankline Research',
    publishDate: '2025-11-05',
    readTime: '6m read',
    category: 'Feature',
    tags: ['Feature', 'Collaboration', 'Sessions', 'Sharing'],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200',
    views: 1189,
    likes: 87,
    comments: 5,
    content: `
      <div id="introduction"></div>
      <p class="text-muted-foreground leading-relaxed mb-8">
        Collaborative Sessions let you share an immutable snapshot of state: code, constraints, and reasoning context. Teammates can fork the snapshot and evolve it without stepping on each other.
      </p>
      <h2 id="forking" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Forking</h2>
      <p class="text-muted-foreground leading-relaxed mb-8">
        Forks preserve provenance. You can compare trajectories, diff outcomes, and keep “negative knowledge” shared across the team.
      </p>
      <h2 id="access" class="text-2xl text-foreground font-medium tracking-tight mb-6 scroll-mt-24">Access</h2>
      <p class="text-muted-foreground leading-relaxed">
        Links can be configured for read-only or fork-only access and can expire automatically to reduce risk.
      </p>
    `,
  },
]

// Helper function to get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find(post => post.slug === slug) || null
}

// Helper function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

// Helper function to get related posts (excluding current post)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .sort(() => Math.random() - 0.5) // Simple random shuffle
    .slice(0, limit)
}
