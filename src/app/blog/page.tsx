'use client'

import { useState, useEffect } from 'react'
import { Calendar, User, Clock, ArrowRight, BookOpen, Tag, Search, Zap, Brain, Code2, Rocket, Shield, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import AnimatedBackground from '@/components/ui/AnimatedBackground'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  image?: string
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const blogPosts: BlogPost[] = [
    {
      id: "ai-coding-future",
      title: "The Future of AI-Powered Code Development",
      excerpt: "Explore how artificial intelligence is revolutionizing the way developers write, debug, and optimize code. From intelligent autocomplete to automated testing.",
      content: "Full article content...",
      author: "Sarah Chen",
      publishDate: "2024-01-20",
      readTime: "8 min read",
      category: "AI & Technology",
      tags: ["AI", "Development", "Future", "Automation"],
      featured: true
    },
    {
      id: "multi-agent-orchestration",
      title: "Multi-Agent Orchestration: Building Collaborative AI Systems",
      excerpt: "Learn how to coordinate multiple AI agents to work together seamlessly, creating more powerful and efficient development workflows.",
      content: "Full article content...",
      author: "Marcus Rodriguez",
      publishDate: "2024-01-18",
      readTime: "12 min read",
      category: "AI & Technology",
      tags: ["Multi-Agent", "Orchestration", "AI Systems", "Workflow"],
      featured: true
    },
    {
      id: "debugging-with-ai",
      title: "Advanced Debugging Techniques with AI Assistance",
      excerpt: "Discover how AI can help you identify, understand, and fix bugs faster than ever before. Real-world examples and best practices included.",
      content: "Full article content...",
      author: "Alex Thompson",
      publishDate: "2024-01-15",
      readTime: "10 min read",
      category: "Development",
      tags: ["Debugging", "AI", "Best Practices", "Productivity"],
      featured: false
    },
    {
      id: "security-ai-code",
      title: "Security Considerations in AI-Generated Code",
      excerpt: "Understanding the security implications of AI-generated code and best practices for maintaining secure development workflows.",
      content: "Full article content...",
      author: "Dr. Emily Watson",
      publishDate: "2024-01-12",
      readTime: "15 min read",
      category: "Security",
      tags: ["Security", "AI", "Code Review", "Best Practices"],
      featured: false
    },
    {
      id: "productivity-tips",
      title: "10 Productivity Tips for AI-Enhanced Development",
      excerpt: "Maximize your development efficiency with these proven tips and tricks for working with AI-powered coding tools.",
      content: "Full article content...",
      author: "Jordan Kim",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      category: "Productivity",
      tags: ["Productivity", "Tips", "Efficiency", "Development"],
      featured: false
    },
    {
      id: "getting-started-guide",
      title: "Getting Started with CodeboltAI: A Complete Guide",
      excerpt: "New to CodeboltAI? This comprehensive guide will help you get up and running with our AI-powered development platform.",
      content: "Full article content...",
      author: "CodeboltAI Team",
      publishDate: "2024-01-08",
      readTime: "20 min read",
      category: "Getting Started",
      tags: ["Tutorial", "Getting Started", "Guide", "Beginner"],
      featured: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen },
    { id: 'AI & Technology', name: 'AI & Technology', icon: Brain },
    { id: 'Development', name: 'Development', icon: Code2 },
    { id: 'Security', name: 'Security', icon: Shield },
    { id: 'Productivity', name: 'Productivity', icon: Zap },
    { id: 'Getting Started', name: 'Getting Started', icon: Rocket }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : BookOpen
  }

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

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 thread-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <BookOpen className="w-10 h-10 text-red-600" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
                  CODEBOLT <span className="text-red-600">BLOG</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
                Insights, tutorials, and updates from the world of AI-powered development
              </p>
            </div>
          </div>
        </div>
        
        {/* Floating Elements Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-500/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-green-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-8">
              <TrendingUp className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-cyber">
                Featured Articles
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => {
                const IconComponent = getCategoryIcon(post.category)
                return (
                  <article 
                    key={post.id} 
                    className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                          <IconComponent className="w-3 h-3 mr-1" />
                          {post.category}
                        </span>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-foreground font-cyber mb-3 group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground font-cyber-alt mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center text-muted-foreground text-sm">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.publishDate).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <Button
                          variant="secondary"
                          size="sm"
                          shape="cyber"
                          className="font-cyber opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(`/blog/${post.id}`, '_self')}
                        >
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Section */}
      <section className="py-8 md:py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-cyber ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white shadow-lg transform scale-105'
                        : 'bg-card text-muted-foreground border border-border hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-800'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                )
              })}
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full lg:w-80 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-foreground font-cyber-alt"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground font-cyber mb-2">No articles found</h3>
              <p className="text-muted-foreground font-cyber-alt">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => {
                const IconComponent = getCategoryIcon(post.category)
                return (
                  <article 
                    key={post.id} 
                    className="group bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                          <IconComponent className="w-3 h-3 mr-1" />
                          {post.category}
                        </span>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-foreground font-cyber mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground font-cyber-alt text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="inline-flex items-center px-2 py-1 bg-muted text-xs text-muted-foreground rounded font-cyber-alt">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground font-cyber-alt">+{post.tags.length - 3}</span>
                        )}
                      </div>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        shape="cyber"
                        className="w-full font-cyber group-hover:bg-red-600 group-hover:text-white transition-colors"
                        onClick={() => window.open(`/blog/${post.id}`, '_self')}
                      >
                        Read Article <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section with Animation */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-black">
        <AnimatedBackground />
        
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-800/10 select-none font-cyber-heavy leading-none">
            BLOG
          </h1>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-cyber">
            Stay Updated
          </h2>
          <p className="text-gray-300 text-lg mb-8 font-cyber-alt">
            Get the latest insights on AI development, coding tips, and CodeboltAI updates delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 font-cyber-alt"
            />
            <Button
              variant="primary"
              size="md"
              shape="cyber"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-cyber whitespace-nowrap"
            >
              Subscribe <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}