import Link from 'next/link'
import { newBlogPosts } from '@/lib/newBlogData'

export const metadata = {
  title: 'New Blog | Codebolt',
  description: 'Dropstone-style blog index layout preview.',
}

export default function NewBlogPage() {
  const latest = newBlogPosts[0]
  const rest = newBlogPosts.slice(1)

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-primary-foreground border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-24 pt-32">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 pb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Transmission Log
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
              Research Index
            </h1>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-md">
              Technical papers, release manifests, and architectural deep-dives from the Codebolt labs.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2">
            <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">Publications</span>
            <span className="text-4xl font-sans text-foreground">{newBlogPosts.length}</span>
          </div>
        </div>

        {/* Latest Publication */}
        {latest && (
          <div className="mb-24">
            <div className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest mb-4">
              Latest Publication
            </div>
            <Link className="group block relative" href={`/newblog/${latest.slug}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 border border-border bg-card hover:bg-muted/30 transition-colors">
                <div className="p-12 lg:p-16 flex flex-col justify-between h-full order-2 lg:order-1">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[10px] font-mono text-foreground bg-muted px-2 py-1 uppercase tracking-widest">
                        {latest.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">{latest.date}</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-6 leading-tight group-hover:underline decoration-1 underline-offset-4 decoration-border">
                      {latest.title}
                    </h2>

                    <p className="text-muted-foreground font-sans leading-relaxed mb-8 max-w-md">
                      {latest.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest pt-8 border-t border-border">
                    <span>Auth: {latest.author}</span>
                    <span>//</span>
                    <span>Ref: {latest.id}</span>
                  </div>
                </div>

                <div className="relative h-64 lg:h-auto border-b lg:border-b-0 lg:border-l border-border bg-background overflow-hidden order-1 lg:order-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <img
                    alt={latest.title}
                    src={latest.heroImage}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 right-4 text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                    {latest.readTime}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Filters + Search (visual only) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="text-foreground">All</span>
            <span>/</span>
            <button className="hover:text-foreground transition-colors" type="button">
              Engineering
            </button>
            <span>/</span>
            <button className="hover:text-foreground transition-colors" type="button">
              Safety
            </button>
            <span>/</span>
            <button className="hover:text-foreground transition-colors" type="button">
              Philosophy
            </button>
          </div>

          <div className="relative w-full md:w-64 group">
            <input
              placeholder="SEARCH_INDEX..."
              className="w-full bg-transparent border-b border-border py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
              type="text"
            />
          </div>
        </div>

        {/* Table list */}
        <div className="border-t border-border">
          <div className="hidden md:grid grid-cols-12 py-3 border-b border-border text-[9px] font-mono text-muted-foreground/70 uppercase tracking-widest">
            <div className="col-span-2">Date / ID</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-6">Subject</div>
            <div className="col-span-2 text-right">Meta</div>
          </div>

          {rest.map((post) => (
            <Link
              key={post.slug}
              className="group grid grid-cols-1 md:grid-cols-12 py-6 border-b border-border items-baseline gap-4 md:gap-0 hover:bg-muted/20 transition-colors relative"
              href={`/newblog/${post.slug}`}
            >
              <div className="md:hidden text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                {post.date}
              </div>

              <div className="col-span-2 text-xs font-mono text-muted-foreground">
                <div className="group-hover:text-foreground transition-colors">{post.date}</div>
                <div className="text-[9px] opacity-50 mt-1">{post.id}</div>
              </div>

              <div className="col-span-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm">
                  {post.category}
                </span>
              </div>

              <div className="col-span-6 pr-8">
                <h3 className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="col-span-2 flex flex-col items-end text-xs font-mono text-muted-foreground/70">
                <span>{post.readTime}</span>
                <span className="mt-1">By {post.author}</span>
                <span className="mt-4 text-foreground transform transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

