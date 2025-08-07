'use client'

import { useState, useEffect, use } from 'react'
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen, Tag, Eye, Heart, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { getBlogPostBySlug, getRelatedPosts, type BlogPost } from '@/lib/blogData'
import { notFound } from 'next/navigation'

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [darkMode, setDarkMode] = useState(false)
  const [liked, setLiked] = useState(false)

  // Unwrap the params promise
  const { slug } = use(params)

  // Get the blog post by slug
  const blogPost = getBlogPostBySlug(slug)
  
  // If blog post not found, show 404
  if (!blogPost) {
    notFound()
  }

  // Get related posts
  const relatedPosts = getRelatedPosts(slug, 3)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI & Technology': 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800',
      'Development': 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800',
      'Security': 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800',
      'Productivity': 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
      'Getting Started': 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800'
    }
    return colors[category] || 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800'
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: 'Check out this article from CodeboltAI Blog',
        url: window.location.href,
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  return (
    <div className="pt-24 md:pt-28">
      {/* Back Button */}
      <section className="py-6 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="secondary"
            size="sm"
            shape="cyber"
            className="font-cyber"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(blogPost.category)}`}>
                <BookOpen className="w-4 h-4 mr-1" />
                {blogPost.category}
              </span>
              <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {blogPost.views.toLocaleString()} views
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {blogPost.readTime}
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-cyber-heavy leading-tight">
              {blogPost.title}
            </h1>

            {/* Author and Date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground font-cyber">{blogPost.author}</p>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(blogPost.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 font-cyber ${
                    liked 
                      ? 'bg-red-600 text-white border-red-600' 
                      : 'bg-card text-muted-foreground border-border hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span>{liked ? blogPost.likes + 1 : blogPost.likes}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-card text-muted-foreground border-border hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/20 transition-all duration-300 font-cyber"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-lg text-sm font-cyber-alt">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div 
              className="text-muted-foreground font-cyber-alt leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75'
              }}
            />
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-12 md:py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <MessageCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-2xl font-bold text-foreground font-cyber">
              Comments ({blogPost.comments})
            </h3>
          </div>

          {/* Comment Form */}
          <div className="bg-card rounded-lg p-6 border border-border mb-8">
            <h4 className="text-lg font-semibold text-foreground font-cyber mb-4">Leave a Comment</h4>
            <div className="space-y-4">
              <textarea
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-foreground font-cyber-alt resize-none"
              />
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  shape="cyber"
                  className="font-cyber"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Sample Comments */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h5 className="font-semibold text-foreground font-cyber">Alex Developer</h5>
                    <span className="text-muted-foreground text-sm font-cyber-alt">2 days ago</span>
                  </div>
                  <p className="text-muted-foreground font-cyber-alt">
                    Great article! I've been using AI tools in my workflow for the past year and the productivity gains are incredible. 
                    Looking forward to seeing what CodeboltAI brings to the table.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h5 className="font-semibold text-foreground font-cyber">Maria Rodriguez</h5>
                    <span className="text-muted-foreground text-sm font-cyber-alt">1 day ago</span>
                  </div>
                  <p className="text-muted-foreground font-cyber-alt">
                    The points about maintaining coding standards while using AI are spot on. It's important to review and understand 
                    the generated code rather than blindly accepting it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-foreground font-cyber mb-8 text-center">
            Related Articles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <article key={post.id} className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 group">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mb-3 ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <h4 className="text-lg font-semibold text-foreground font-cyber mb-2 group-hover:text-red-600 transition-colors">
                  <a href={`/blog/${post.slug}`} className="hover:text-red-600 transition-colors">
                    {post.title}
                  </a>
                </h4>
                <p className="text-muted-foreground font-cyber-alt text-sm mb-4">
                  {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.readTime}</span>
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}