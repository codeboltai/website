import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Linkedin, Share2 } from 'lucide-react'
import { getNewBlogPostBySlug } from '@/lib/newBlogData'
import ScrollProgress from './ScrollProgress'

export const metadata = {
  title: 'New Blog Post | Codebolt',
  description: 'Dropstone-style blog detail layout preview.',
}

const CODE_SNIPPET = `async def flash_gated_consensus(swarm: AgentSwarm):
    """Flash-Gated Consensus Protocol"""

    while swarm.active:
        # Parallel execution across all agents
        results = await asyncio.gather(*[
            agent.execute_step() for agent in swarm.agents
        ])

        for agent, result in zip(swarm.agents, results):
            if result.confidence > 0.95:
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

                swarm.resume()`

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default async function NewBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getNewBlogPostBySlug(slug)
  if (!post) notFound()

  const canonicalUrl = `https://codebolt.ai/newblog/${post.slug}`
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(
    canonicalUrl,
  )}`
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`

  const toc = [
    'Introduction',
    'The Linearity Barrier',
    'The Recursive Swarm Architecture',
    'Budget-Aware Heterogeneous Topology',
    'Empirical Results',
    'Conclusion',
  ]

  const isHorizon = post.slug === 'horizon-mode-distributed-reasoning'

  return (
    <article className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      <ScrollProgress />

      <header className="pt-32 pb-16 px-6 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
              href="/newblog"
            >
              <ArrowLeft className="w-3 h-3" />
              Index
            </Link>
            <span className="text-border">/</span>
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest border border-primary/30 bg-primary/10 px-2 py-0.5 rounded-sm">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-foreground leading-[0.95] mb-8 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-muted border border-background flex items-center justify-center text-[10px] font-bold">
                  BR
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{post.author}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {post.date} • {post.readTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mr-2">Share</span>
              <a
                href={twitterShare}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground"
                title="Share on X"
              >
                <XIcon />
              </a>
              <a
                href={linkedinShare}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative h-64 md:h-96 w-full">
        <img alt={post.title} src={post.heroImage} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h4 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Contents</h4>
              <ul className="space-y-3 border-l border-border">
                {toc.map((t, idx) => (
                  <li
                    key={t}
                    className={[
                      'pl-4 text-sm cursor-pointer transition-all duration-200',
                      idx === 0 ? 'border-l border-primary -ml-[1px] text-foreground font-medium' : 'text-muted-foreground hover:text-foreground',
                    ].join(' ')}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Citation</h4>
              <div className="p-3 bg-muted/30 border border-border rounded-sm font-mono text-[9px] text-muted-foreground leading-relaxed break-all">
                {post.author} ({post.date.replaceAll('.', '-')}). {post.title}. Codebolt Research.
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-8 lg:col-start-5 space-y-12">
          {isHorizon ? (
            <>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
                  Current Foundation Models operate fundamentally as linear sequence generators. While effective for generalist tasks, this paradigm
                  suffers from stochastic degradation in high-assurance engineering domains. We introduce Horizon Mode, a distributed reasoning
                  protocol that orchestrates thousands of isolated agents via a Recursive Swarm Architecture. By decoupling reasoning time from fixed
                  context windows, we shift the optimization target from latency to solution space coverage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl text-foreground font-medium tracking-tight mb-6">The Linearity Barrier</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The probability of maintaining a valid terminal state decays exponentially with the length of the reasoning chain. If the
                  probability of a logic error at any node is ε, the cumulative success rate is P(success) ≈ (1-ε)^L. For a task requiring 500
                  steps, even with 99% accuracy per step, the success rate drops to less than 1%. Codebolt bypasses this by transitioning from
                  Next-Token Prediction to Trajectory Search Optimization.
                </p>
              </div>

              <div>
                <h2 className="text-2xl text-foreground font-medium tracking-tight mb-6">The Recursive Swarm Architecture</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Codebolt redefines the IDE as an intelligent runtime environment. Instead of querying a single endpoint, it instantiates a search
                  tree across thousands of agents. We deploy up to 10,000 isolated agents within ephemeral sandboxes. Divergent Initialization
                  generates thousands of strategic variations, exploring low-probability solution paths (P {'<'} 0.05) often pruned by standard
                  models. Agents write, compile, fail, debug, and iterate in real-time using actual compilers.
                </p>

                <div className="bg-muted/20 border border-border rounded-sm p-4 font-mono text-sm overflow-x-auto mb-8">
                  <div className="flex items-center justify-between border-b border-border pb-2 mb-4 text-xs text-muted-foreground">
                    <span>swarm_consensus.py</span>
                    <span>Python 3.10</span>
                  </div>
                  <pre className="text-foreground/90 whitespace-pre-wrap">{CODE_SNIPPET}</pre>
                </div>
              </div>

              <div>
                <h2 className="text-2xl text-foreground font-medium tracking-tight mb-6">Budget-Aware Heterogeneous Topology</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  To make scaling economically viable, we treat compute as a liquid asset that flows to the most promising solution branches. Layer 1
                  (Scout Swarm) uses highly optimized 8B parameter models for 98% of exploration at near-zero marginal cost. Scouts tag branches with
                  probability vectors — dead ends are marked in the shared workspace, preventing other agents from wasting compute. Layer 2 (Context
                  Promotion) triggers when a Scout identifies a candidate solution with high confidence (P {'>'} 0.85), promoting the state to
                  Frontier Models (Opus/GPT-4 class).
                </p>
              </div>

              <div>
                <h2 className="text-2xl text-foreground font-medium tracking-tight mb-6">Empirical Results</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  On the Deep-Sec benchmark, Horizon Mode achieved: 24+ hour reasoning horizons (vs. {'<'}1 hour for zero-shot), 1.4% hallucination
                  rate (vs. 14.2% baseline), and 0.2% safety violations (vs. 3.8% baseline). The Flash-Gated Consensus Protocol reduced safety
                  violations by 89% compared to zero-shot baselines while enabling continuous operation over multi-day engineering tasks.
                </p>
              </div>

              <div className="py-8">
                <blockquote className="border-l-2 border-primary pl-6 italic text-xl text-foreground font-light leading-relaxed">
                  &quot;By acknowledging the Linearity Barrier, we have moved beyond the &apos;better prompt&apos; fallacy towards a robust architectural
                  solution.&quot;
                </blockquote>
              </div>

              <div>
                <h2 className="text-2xl text-foreground font-medium tracking-tight mb-6">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Horizon Mode represents a paradigm shift in automated reasoning. The synergy between the Budget-Aware Swarm and the Flash-Gated
                  Consensus Protocol creates a system that is economically viable and probabilistically superior to linear reasoning methods. This
                  architecture enables Codebolt to tackle complex engineering projects that require sustained reasoning over days, not hours.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">{post.excerpt}</p>
              </div>
              <div className="border border-border bg-card p-6">
                <h2 className="text-xl font-medium text-foreground mb-2">Draft content</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is a layout-preview route. Only the Horizon Mode article has full Dropstone-style body content right now.
                </p>
              </div>
            </>
          )}

          <div className="pt-12 mt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Share this article</h4>
                <p className="text-xs text-muted-foreground">Help others discover this research</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={twitterShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-colors text-muted-foreground hover:text-foreground text-sm"
                >
                  <XIcon />
                  <span>Post</span>
                </a>
                <a
                  href={linkedinShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-colors text-muted-foreground hover:text-foreground text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Share</span>
                </a>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:brightness-110 rounded-lg transition-colors text-primary-foreground text-sm font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </article>
  )
}

