'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Linkedin, Share2 } from 'lucide-react'
import type { BlogPost } from '@/lib/blogData'

type TocItem = { id: string; title: string }

function formatIndexDate(iso: string) {
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

function stripTags(html: string) {
  return html.replace(/<[^>]*>/g, '').trim()
}

function buildTocFromContent(content: string): TocItem[] {
  const items: TocItem[] = [{ id: 'introduction', title: 'Introduction' }]
  const seen = new Set(items.map((i) => i.id))

  const re = /<h2\s+[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) {
    const id = m[1]
    const title = stripTags(m[2] || '')
    if (!id || !title) continue
    if (seen.has(id)) continue
    seen.add(id)
    items.push({ id, title })
  }

  return items
}

export default function BlogArticleClient({ post }: { post: BlogPost }) {
  const toc = useMemo(() => buildTocFromContent(post.content), [post.content])
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState<TocItem['id']>('introduction')
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      setProgress(Math.max(0, Math.min(100, pct)))

      if (window.scrollY < 160) setActiveId('introduction')
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = toc.map((t) => t.id).filter((id) => id !== 'introduction')
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId((entry.target as HTMLElement).id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [toc])

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.excerpt, url })
        return
      }
    } catch {
      // fall through to clipboard
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // no-op
    }
  }

  const xHref = useMemo(() => {
    const u = encodeURIComponent(currentUrl || '')
    const t = encodeURIComponent(post.title)
    return `https://twitter.com/intent/tweet?text=${t}&url=${u}`
  }, [post.title, currentUrl])
  const linkedInHref = useMemo(() => {
    const u = encodeURIComponent(currentUrl || '')
    return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`
  }, [currentUrl])

  const year = new Date(post.publishDate).getFullYear()

  return (
    <article className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      <div className="fixed top-0 left-0 h-1 bg-primary/20 w-full z-[60]">
        <div className="h-full bg-primary transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <header className="pt-32 pb-16 px-6 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
              href="/blog"
            >
              <ArrowLeft className="w-3 h-3" />
              Index
            </Link>
            <span className="text-border">/</span>
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest border border-primary/30 bg-primary/5 px-2 py-0.5 rounded-sm">
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
                  {initials(post.author) || 'CB'}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{post.author}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {formatIndexDate(post.publishDate)} • {post.readTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mr-2">
                {copied ? 'Copied' : 'Share'}
              </span>

              {/* X share (inline svg to match reference) */}
              <a
                href={xHref}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground"
                title="Share on X"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href={linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={share}
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
        {post.image ? (
          <>
            <img
              alt={post.title}
              src={post.image}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h4 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Contents</h4>
              <ul className="space-y-3 border-l border-border">
                {toc.map((t) => {
                  const active = t.id === activeId
                  return (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className={[
                          'block pl-4 text-sm transition-all duration-200 -ml-[1px]',
                          active
                            ? 'border-l border-primary text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground',
                        ].join(' ')}
                      >
                        {t.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Citation</h4>
              <div className="p-3 bg-muted/30 border border-border rounded-sm font-mono text-[9px] text-muted-foreground leading-relaxed break-all">
                {post.author} ({year}). {post.title}. {post.author}.
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-8 lg:col-start-5">
          <div className="space-y-12" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="pt-12 mt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Share this article</h4>
                <p className="text-xs text-muted-foreground">Help others discover this research</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={xHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-colors text-muted-foreground hover:text-foreground text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Post</span>
                </a>

                <a
                  href={linkedInHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-colors text-muted-foreground hover:text-foreground text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Share</span>
                </a>

                <button
                  type="button"
                  onClick={share}
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

