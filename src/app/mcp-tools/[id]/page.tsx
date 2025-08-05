import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MCP } from '@/types';
import { ArrowLeft, Star, ExternalLink, Shield, Calendar, Key } from 'lucide-react';
import MDXRenderer from '@/components/MDXRenderer';
import { formatDistanceToNow } from 'date-fns';

async function fetchMCPTool(id: string): Promise<MCP | null> {
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Fetching MCP tool ${id} (attempt ${attempt}/${maxRetries})...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 10 second timeout
      
      const response = await fetch(`https://api.codebolt.ai/mcp/detail/${id}`, {
        next: { revalidate: 1200 }, // Cache for 20 minutes (details change less frequently)
        signal: controller.signal,
        headers: {
          'User-Agent': 'CodeboltAI-Website/1.0',
          'Accept': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error(`Failed to fetch MCP tool ${id} (attempt ${attempt}):`, response.status, response.statusText);
        
        // If it's a server error (5xx) and we have retries left, try again
        if (response.status >= 500 && attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        return null;
      }
      
      const responseData = await response.json() as { data: MCP };
      console.log(`Successfully fetched MCP tool: ${responseData.data.name}`);
      return responseData.data;
      
    } catch (err) {
      console.error(`Error fetching MCP tool ${id} (attempt ${attempt}):`, err);
      
      // If this was the last attempt, return null
      if (attempt === maxRetries) {
        console.error('All retry attempts failed. Returning null.');
        return null;
      }
      
      // Wait before retrying, with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return null;
}

interface McpDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Parse tags safely
const getTags = (tags: string | undefined) => {
  if (!tags) return [];
  
  try {
    if (typeof tags === 'string') {
      if (tags.startsWith('[')) {
        return JSON.parse(tags);
      }
      return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }
    return Array.isArray(tags) ? tags : [];
  } catch {
    return tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];
  }
};

export default async function McpDetailsPage({ params }: McpDetailsPageProps) {
  const { id } = await params;
  const mcpTool = await fetchMCPTool(id);

  if (!mcpTool) {
    notFound();
  }

  // Get markdown content or fallback
  const markdownContent = mcpTool.readmeContent || 'No README content available';
  
  const formattedDate = mcpTool.updatedAt 
    ? formatDistanceToNow(new Date(mcpTool.updatedAt), { addSuffix: true }).replace('about ', '')
    : '';

  const tags = getTags(mcpTool.tags);

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/mcp-tools" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground border border-border rounded-lg px-4 py-2 bg-card hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to MCP Tools
            </Link>
          </div>

          {/* MCP Tool Header */}
          <div className="bg-card border border-border rounded-xl shadow-sm mb-8">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                {/* MCP Tool Avatar */}
                <div className="w-32 h-32 flex-shrink-0">
                  <Image
                    src={`https://hono-avatars.pages.dev/?name=${mcpTool.name}`}
                    alt={`${mcpTool.name} avatar`}
                    width={128}
                    height={128}
                    className="w-full h-full rounded-xl border-2 border-border shadow-sm"
                  />
                </div>
                
                {/* MCP Tool Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-foreground">
                      {mcpTool.name}
                    </h1>
                    {mcpTool.isVerified === 1 && (
                      <div title="Verified by CodeboltAI" className="flex-shrink-0">
                        <Shield className="w-6 h-6 text-blue-500" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-3 text-base">
                    Created by <span className="text-primary font-semibold">{mcpTool.author}</span>
                  </p>
                  
                  {mcpTool.description && (
                    <p className="text-foreground text-base mb-5 max-w-4xl leading-relaxed">
                      {mcpTool.description}
                    </p>
                  )}
                  
                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    {/* GitHub Stars */}
                    <div className="flex items-center gap-2 bg-accent px-2.5 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      <span className="text-xs font-medium text-foreground">
                        {mcpTool.githubStars?.toLocaleString() || 0} stars
                      </span>
                    </div>
                    
                    {/* Category */}
                    {mcpTool.category && (
                      <div className="flex items-center gap-2 bg-accent px-2.5 py-1 rounded-lg">
                        <span className="text-xs text-muted-foreground">Category:</span>
                        <span className="text-xs font-semibold text-primary">
                          {mcpTool.category.name}
                        </span>
                      </div>
                    )}
                    
                    {/* Last Updated */}
                    {formattedDate && (
                      <div className="flex items-center gap-2 bg-accent px-2.5 py-1 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground">
                          Updated {formattedDate}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.map((tag: string, index: number) => (
                        <span 
                          key={index} 
                          className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Indicators */}
                  <div className="flex flex-wrap gap-2">
                    {mcpTool.requiresApiKey === 1 && (
                      <div className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-lg text-xs font-medium">
                        <Key className="w-3.5 h-3.5" />
                        API Key Required
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-2 lg:flex-shrink-0">
                  {mcpTool.githubUrl && (
                    <a
                      href={mcpTool.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Content - README */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-xl shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-3">Documentation</h2>
                  <MDXRenderer content={markdownContent} />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Installation */}
              {mcpTool.llmsInstallationContent && (
                <div className="bg-card border border-border rounded-xl shadow-sm p-4">
                  <h3 className="text-base font-bold text-foreground mb-3 border-b border-border pb-2">Installation</h3>
                  <MDXRenderer content={mcpTool.llmsInstallationContent} />
                </div>
              )}
              
              {/* MCP Details */}
              <div className="bg-card border border-border rounded-xl shadow-sm p-4">
                <h3 className="text-base font-bold text-foreground mb-3 border-b border-border pb-2">Details</h3>
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">MCP ID</dt>
                    <dd className="text-xs text-foreground mt-1 font-mono bg-muted px-2 py-1 rounded break-all">{mcpTool.mcpId}</dd>
                  </div>
                  
                  {mcpTool.createdAt && (
                    <div>
                      <dt className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Created</dt>
                      <dd className="text-sm text-foreground mt-1">
                        {formatDistanceToNow(new Date(mcpTool.createdAt), { addSuffix: true })}
                      </dd>
                    </div>
                  )}
                  
                  {mcpTool.lastGithubSync && (
                    <div>
                      <dt className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Last Sync</dt>
                      <dd className="text-sm text-foreground mt-1">
                        {formatDistanceToNow(new Date(mcpTool.lastGithubSync), { addSuffix: true })}
                      </dd>
                    </div>
                  )}
                  
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Status</dt>
                    <dd className="text-sm mt-1">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        mcpTool.status === 1 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800'
                      }`}>
                        {mcpTool.status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: McpDetailsPageProps) {
  const { id } = await params;
  const mcpTool = await fetchMCPTool(id);
  
  if (!mcpTool) {
    return {
      title: 'MCP Tool Not Found | CodeboltAI',
    };
  }

  return {
    title: `${mcpTool.name} | MCP Tool | CodeboltAI`,
    description: mcpTool.description || `Discover ${mcpTool.name}, a Model Context Protocol server for extending AI capabilities.`,
    openGraph: {
      title: `${mcpTool.name} | MCP Tool | CodeboltAI`,
      description: mcpTool.description || `Discover ${mcpTool.name}, a Model Context Protocol server for extending AI capabilities.`,
    },
  };
}