import { Agent } from '@/types';
import Image from 'next/image';

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
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-ring 
                  focus:ring-offset-2 bg-gray-50 text-gray-700
                  hover:bg-gray-100">
    <span className="truncate max-w-[100px]">{children}</span>
  </span>
);

export default function AgentCard({ agent }: AgentCardProps) {
  const avatarSeed = generateAvatarSeed(agent.agent_id || agent.id.toString());
  
  return (
    <div className="h-full p-4 flex flex-col justify-between items-start hover:shadow-lg transition-all 
                   duration-200 cursor-pointer 
                   bg-white border border-gray-200
                   rounded-lg overflow-hidden text-black">
      {/* Top row with icon, title and author */}
      <div className="flex items-center w-full mb-2">
        <div className="h-10 w-10 flex-shrink-0 mr-3">
          {agent.avatarSrc ? (
            <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-50">
              <Image 
                src={agent.avatarSrc} 
                alt="Agent Avatar" 
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-50">
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
          <div className="flex items-center justify-between w-full">
            <div className="text-left text-black text-base font-medium truncate">
              {agent.title}
            </div>
          </div>
          {agent.createdByUser && (
            <span className="text-left text-xs font-medium truncate text-gray-600">
              By {agent.createdByUser}
            </span>
          )}
        </div>
      </div>
      
      {/* Description with full width */}
      <div className="w-full text-left p-0 line-clamp-2 min-h-[3rem] text-xs overflow-hidden text-gray-700">
        {agent.description}
      </div>

      {/* Tags section */}
      {agent.tags && agent.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 p-0 w-full overflow-hidden">
          <div className="flex flex-wrap gap-1 overflow-hidden">
            {agent.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
            {agent.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{agent.tags.length - 3} more</span>
            )}
          </div>
        </div>
      )}

      {/* Rating if available */}
      {agent.rating && (
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(agent.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-600">
              {agent.rating.toFixed(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}