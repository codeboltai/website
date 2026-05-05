import { MCP } from '@/types';
import Image from 'next/image';
import { Star, ExternalLink, Shield } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface McpCardProps {
  mcp: MCP;
}

const truncateText = (text: string, maxLength = 100): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

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
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  }
};

export default function McpCard({ mcp }: McpCardProps) {
  const tags = getTags(mcp.tags);
  
  return (
    <Card className="h-full hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-12 h-12 flex-shrink-0">
            <Image
              src={`https://hono-avatars.pages.dev/?name=${mcp.name}`}
              alt={`${mcp.name} avatar`}
              width={48}
              height={48}
              className="w-full h-full rounded-lg border border-border"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1">
              <h3 className="text-base font-semibold text-card-foreground leading-tight break-words flex-1 min-w-0">
                {mcp.name}
              </h3>
              {mcp.isVerified === 1 && (
                <div title="Verified by CodeboltAI" className="flex-shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-blue-500" />
                </div>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground truncate">
              By {mcp.author}
            </p>
            
            {/* GitHub Stars */}
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-muted-foreground">
                {mcp.githubStars?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Description */}
        <p className="text-sm text-card-foreground mb-3 flex-1">
          {truncateText(mcp.description || 'No description available', 120)}
        </p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag: string, index: number) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-muted-foreground">+{tags.length - 3} more</span>
            )}
          </div>
        )}
        
        {/* API Key Required Indicator */}
        {mcp.requiresApiKey === 1 && (
          <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 px-2 py-1 rounded">
            <span>🔑</span>
            API Key Required
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-muted-foreground">
            {mcp.category?.name}
          </div>
          
          {mcp.githubUrl && (
            <div className="text-muted-foreground" title="View on GitHub">
              <ExternalLink className="w-4 h-4" />
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}