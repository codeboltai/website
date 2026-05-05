import Link from 'next/link';
import { Agent } from '@/types';
import AgentCard from '@/components/AgentCard';
import SearchAndSort from '@/components/SearchAndSort';

async function fetchAgents(): Promise<Agent[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const res = await fetch('https://api.codebolt.ai/api/agents/list', {
      next: { revalidate: 600 }, // Cache for 10 minutes
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.error('Failed to fetch agents:', res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching agents:', error.message);
    } else {
      console.error('Unknown error fetching agents:', error);
    }
    return []; // Return empty array on error instead of throwing
  }
}

interface AgentsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
    perPage?: string;
    sortBy?: 'rating' | 'title' | 'newest';
  }>
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const resolvedSearchParams = await searchParams;
  const agents = await fetchAgents();
  
  const query = resolvedSearchParams.query || '';
  const page = parseInt(resolvedSearchParams.page || '1', 10);
  const perPage = parseInt(resolvedSearchParams.perPage || '12', 10);
  const sortBy = (resolvedSearchParams.sortBy as 'rating' | 'title' | 'newest') || 'rating';
  
  // Filter agents based on search query
  const filteredAgents = query 
    ? agents.filter((agent) => 
        agent.title.toLowerCase().includes(query.toLowerCase()) ||
        (agent.description && agent.description.toLowerCase().includes(query.toLowerCase())) ||
        (agent.createdByUser && agent.createdByUser.toLowerCase().includes(query.toLowerCase()))
      ) 
    : agents;

  // Sort agents based on sort criteria
  const sortAgents = (agentsToSort: Agent[], sortOption: 'rating' | 'title' | 'newest') => {
    const sortedAgents = [...agentsToSort];
    
    switch (sortOption) {
      case 'rating':
        return sortedAgents.sort((a, b) => {
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          return ratingB - ratingA;
        });
      case 'title':
        return sortedAgents.sort((a, b) => a.title.localeCompare(b.title));
      case 'newest':
        return sortedAgents.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      default:
        return sortedAgents;
    }
  };

  const sortedAgents = sortAgents(filteredAgents, sortBy);
  
  // Calculate pagination
  const totalItems = sortedAgents.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  
  // Get paginated agents
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);
  const paginatedAgents = sortedAgents.slice(startIndex, endIndex);
  
  // Generate pagination numbers
  const generatePaginationNumbers = () => {
    const maxVisibleButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }
    
    return { startPage, endPage };
  };
  
  const { startPage, endPage } = generatePaginationNumbers();

  return (
    <div className="pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Sort Component */}
        <div className="flex justify-end mb-8 pt-8">
          <SearchAndSort 
            currentQuery={query}
            currentSortBy={sortBy}
            currentPerPage={perPage}
            basePath="/registry/agents"
          />
        </div>

        {/* No results message */}
        {paginatedAgents.length === 0 && (
          <div className="flex flex-col justify-center items-center py-20 bg-card rounded-lg shadow mb-6">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg text-muted-foreground mb-4">No agents found matching your search criteria.</p>
            <Link 
              href="/registry/agents" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Clear filters
            </Link>
          </div>
        )}

        {/* Agents Grid */}
        {paginatedAgents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {paginatedAgents.map((agent) => (
              <Link
                key={agent.agent_id}
                href={`/registry/agents/${agent.agent_id}`}
                className="block h-full"
              >
                <AgentCard agent={agent} />
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginatedAgents.length > 0 && totalPages > 1 && (
          <div className="mt-8 mb-6">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{endIndex} of {totalItems} agents
              </div>
            </div>
            
            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
              <nav className="flex items-center space-x-2">
                {/* Previous page button */}
                {currentPage > 1 && (
                  <Link 
                    href={`/registry/agents?query=${encodeURIComponent(query)}&page=${currentPage - 1}&perPage=${perPage}&sortBy=${sortBy}`}
                    className="px-3 py-2 rounded-md text-muted-foreground hover:bg-accent flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                )}
                
                {/* Page numbers */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(num => (
                  <Link 
                    key={num}
                    href={`/registry/agents?query=${encodeURIComponent(query)}&page=${num}&perPage=${perPage}&sortBy=${sortBy}`}
                    className={`px-3 py-2 rounded-md ${
                      currentPage === num 
                        ? 'bg-blue-600 text-white' 
                        : 'text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {num}
                  </Link>
                ))}
                
                {/* Next page button */}
                {currentPage < totalPages && (
                  <Link 
                    href={`/registry/agents?query=${encodeURIComponent(query)}&page=${currentPage + 1}&perPage=${perPage}&sortBy=${sortBy}`}
                    className="px-3 py-2 rounded-md text-muted-foreground hover:bg-accent flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ searchParams }: AgentsPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || '';
  const title = query 
    ? `AI Agents - Search: ${query} | CodeboltAI` 
    : 'AI Agent Marketplace | CodeboltAI';
  
  return {
    title,
    description: 'Discover and deploy AI agents for your development workflow. Browse our marketplace of pre-built agents or create your own custom solutions.',
    openGraph: {
      title,
      description: 'Discover and deploy AI agents for your development workflow.',
    },
  };
}