import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MCP } from '@/types';
import { ArrowLeft, Star, ExternalLink, Shield, Calendar, Key } from 'lucide-react';
import { marked } from 'marked';
import { formatDistanceToNow } from 'date-fns';

async function fetchMCPTool(id: string): Promise<MCP | null> {
  try {
    const response = await fetch(`https://api.codebolt.ai/mcp/detail/${id}`, {
      next: { revalidate: 1200 }, // Cache for 20 minutes (details change less frequently)
    });
    
    if (!response.ok) {
      console.error('Failed to fetch MCP tool:', response.status, response.statusText);
      return null;
    }
    
    const responseData = await response.json() as { data: MCP };
    return responseData.data;
  } catch (err) {
    console.error('Error fetching MCP tool:', err);
    return null;
  }
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

  // Configure marked with options for better rendering
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  // Parse markdown to HTML
  const htmlContent = mcpTool.readmeContent 
    ? marked.parse(mcpTool.readmeContent) as string
    : '<p>No README content available</p>';
  
  const formattedDate = mcpTool.updatedAt 
    ? formatDistanceToNow(new Date(mcpTool.updatedAt), { addSuffix: true }).replace('about ', '')
    : '';

  const tags = getTags(mcpTool.tags);

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/mcp-tools" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gray-800  rounded-lg px-4 py-2 bg-card hover:bg-background transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to MCP Tools
            </Link>
          </div>

          {/* MCP Tool Header */}
          <div className="bg-card rounded-lg  shadow-sm mb-6">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* MCP Tool Avatar */}
                <div className="w-24 h-24 flex-shrink-0">
                  <Image
                    src={`https://hono-avatars.pages.dev/?name=${mcpTool.name}`}
                    alt={`${mcpTool.name} avatar`}
                    width={96}
                    height={96}
                    className="w-full h-full rounded-lg border-2 border-border"
                  />
                </div>
                
                {/* MCP Tool Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                      {mcpTool.name}
                    </h1>
                    {mcpTool.isVerified === 1 && (
                      <div title="Verified by CodeboltAI">
                        <Shield className="w-6 h-6 text-blue-500" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-3">
                    Created by <span className="text-blue-600 font-medium">{mcpTool.author}</span>
                  </p>
                  
                  {mcpTool.description && (
                    <p className="text-gray-700 text-lg mb-4 max-w-3xl">
                      {mcpTool.description}
                    </p>
                  )}
                  
                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    {/* GitHub Stars */}
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">
                        {mcpTool.githubStars?.toLocaleString() || 0} stars
                      </span>
                    </div>
                    
                    {/* Category */}
                    {mcpTool.category && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Category:</span>
                        <span className="text-sm font-medium text-blue-600">
                          {mcpTool.category.name}
                        </span>
                      </div>
                    )}
                    
                    {/* Last Updated */}
                    {formattedDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-muted-foreground">
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
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Indicators */}
                  <div className="flex flex-wrap gap-3">
                    {mcpTool.requiresApiKey === 1 && (
                      <div className="inline-flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm">
                        <Key className="w-4 h-4" />
                        API Key Required
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-3 lg:flex-shrink-0">
                  {mcpTool.githubUrl && (
                    <a
                      href={mcpTool.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Content - README */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg  shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Documentation</h2>
                  <div 
                    className="prose prose-gray max-w-none prose-pre:bg-background prose-pre:border prose-pre:border-border"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Installation */}
              {mcpTool.llmsInstallationContent && (
                <div className="bg-card rounded-lg  shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-3">Installation</h3>
                  <div 
                    className="prose prose-sm prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: marked.parse(mcpTool.llmsInstallationContent) as string 
                    }}
                  />
                </div>
              )}
              
              {/* MCP Details */}
              <div className="bg-card rounded-lg  shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Details</h3>
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">MCP ID</dt>
                    <dd className="text-sm text-foreground">{mcpTool.mcpId}</dd>
                  </div>
                  
                  {mcpTool.createdAt && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Created</dt>
                      <dd className="text-sm text-foreground">
                        {formatDistanceToNow(new Date(mcpTool.createdAt), { addSuffix: true })}
                      </dd>
                    </div>
                  )}
                  
                  {mcpTool.lastGithubSync && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Last Sync</dt>
                      <dd className="text-sm text-foreground">
                        {formatDistanceToNow(new Date(mcpTool.lastGithubSync), { addSuffix: true })}
                      </dd>
                    </div>
                  )}
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        mcpTool.status === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
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