import { Agent } from '@/types';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface AgentCardProps {
  agent: Agent;
}

// Helper function to generate consistent avatar seeds based on ID
const generateAvatarSeed = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString();
};

// Badge component
const Badge = ({ children }: { children: string }) => (
  <span className="inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-semibold 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-ring 
                  focus:ring-offset-2 bg-muted text-muted-foreground
                  hover:bg-muted/80">
    <span className="truncate max-w-[100px]">{children}</span>
  </span>
);

export default function AgentCard({ agent }: AgentCardProps) {
  const avatarSeed = generateAvatarSeed(agent.agent_id || agent.id.toString());
  
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex items-center w-full">
          <div className="h-10 w-10 flex-shrink-0 mr-3">
            {agent.avatarSrc ? (
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image 
                  src={agent.avatarSrc} 
                  alt="Agent Avatar" 
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image 
                  src={`https://hono-avatars.pages.dev/?name=${agent.title}&seed=${avatarSeed}`}
                  alt="Agent Avatar" 
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col overflow-hidden flex-grow">
            <div className="text-left text-card-foreground text-base font-medium truncate">
              {agent.title}
            </div>
            {agent.createdByUser && (
              <span className="text-left text-xs font-medium truncate text-muted-foreground">
                By {agent.createdByUser}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 flex flex-col justify-between flex-grow">
        {/* Description */}
        <div className="text-left line-clamp-2 min-h-[3rem] text-xs overflow-hidden text-card-foreground mb-3">
          {agent.description}
        </div>

        <div className="mt-auto">
          {/* Tags section */}
          {agent.tags && agent.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 overflow-hidden">
              {agent.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
              {agent.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{agent.tags.length - 3} more</span>
              )}
            </div>
          )}

          {/* Rating if available */}
          {agent.rating && (
            <div className="flex items-center">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(agent.rating || 0) ? 'text-yellow-400' : 'text-muted-foreground'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs text-muted-foreground">
                  {agent.rating.toFixed(1)}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}