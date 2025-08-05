import Link from 'next/link';
import { MCP } from '@/types';
import McpCard from '@/components/McpCard';
import SearchAndSort from '@/components/SearchAndSort';

async function fetchMCPTools(): Promise<MCP[]> {
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Fetching MCP tools (attempt ${attempt}/${maxRetries})...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const res = await fetch('https://api.codebolt.ai/mcp/all/basic', {
        next: { revalidate: 600 }, // Cache for 10 minutes
        signal: controller.signal,
        headers: {
          'User-Agent': 'CodeboltAI-Website/1.0',
          'Accept': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        console.error(`Failed to fetch MCP tools (attempt ${attempt}):`, res.status, res.statusText);
        
        // If it's a server error (5xx) and we have retries left, try again
        if (res.status >= 500 && attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        return [];
      }
      
      const jsonData = await res.json() as { data: MCP[] };
      console.log(`Successfully fetched ${jsonData.data?.length || 0} MCP tools`);
      return jsonData.data || [];
      
    } catch (error) {
      console.error(`Error fetching MCP tools (attempt ${attempt}):`, error);
      
      // If this was the last attempt, return empty array
      if (attempt === maxRetries) {
        console.error('All retry attempts failed. Returning empty array.');
        return [];
      }
      
      // Wait before retrying, with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return [];
}

interface McpToolsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
    perPage?: string;
    sortBy?: 'stars' | 'name' | 'newest';
  }>
}

export default async function McpToolsPage({ searchParams }: McpToolsPageProps) {
  const resolvedSearchParams = await searchParams;
  const mcpTools = await fetchMCPTools();
  
  const query = resolvedSearchParams.query || '';
  const page = parseInt(resolvedSearchParams.page || '1', 10);
  const perPage = parseInt(resolvedSearchParams.perPage || '12', 10);
  const sortBy = (resolvedSearchParams.sortBy as 'stars' | 'name' | 'newest') || 'stars';
  
  // Filter MCP tools based on search query
  const filteredMCPs = query 
    ? mcpTools.filter((mcp) => 
        mcp.name.toLowerCase().includes(query.toLowerCase()) ||
        (mcp.description && mcp.description.toLowerCase().includes(query.toLowerCase())) ||
        (mcp.author && mcp.author.toLowerCase().includes(query.toLowerCase()))
      ) 
    : mcpTools;

  // Sort MCPs based on sort criteria
  const sortMCPs = (mcpsToSort: MCP[], sortOption: 'stars' | 'name' | 'newest') => {
    const sortedMCPs = [...mcpsToSort];
    
    switch (sortOption) {
      case 'stars':
        return sortedMCPs.sort((a, b) => {
          const starsA = a.githubStars || 0;
          const starsB = b.githubStars || 0;
          return starsB - starsA;
        });
      case 'name':
        return sortedMCPs.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sortedMCPs.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      default:
        return sortedMCPs;
    }
  };

  const sortedMCPs = sortMCPs(filteredMCPs, sortBy);
  
  // Calculate pagination
  const totalItems = sortedMCPs.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  
  // Get paginated MCPs
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);
  const paginatedMCPs = sortedMCPs.slice(startIndex, endIndex);
  
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
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">MCP Tools</h1>
              <p className="text-lg text-muted-foreground">
                Discover Model Context Protocol (MCP) servers to extend your AI capabilities
              </p>
            </div>
            
            {/* Search and Sort Component */}
            <SearchAndSort 
              currentQuery={query}
              currentSortBy={sortBy}
              currentPerPage={perPage}
              basePath="/mcp-tools"
            />
          </div>

          {/* No results message */}
          {paginatedMCPs.length === 0 && (
            <div className="flex flex-col justify-center items-center py-20 bg-card rounded-lg shadow mb-6">
              <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg text-gray-500 mb-4">No MCP tools found matching your search criteria.</p>
              <Link 
                href="/mcp-tools" 
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </Link>
            </div>
          )}

          {/* MCP Tools Grid */}
          {paginatedMCPs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedMCPs.map((mcp) => (
                <Link
                  key={mcp.id}
                  href={`/mcp-tools/${mcp.id}`}
                  className="block h-full"
                >
                  <McpCard mcp={mcp} />
                </Link>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {paginatedMCPs.length > 0 && totalPages > 1 && (
            <div className="mt-8 mb-6">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{endIndex} of {totalItems} MCP tools
                </div>
              </div>
              
              {/* Pagination controls */}
              <div className="flex justify-center mt-4">
                <nav className="flex items-center space-x-2">
                  {/* Previous page button */}
                  {currentPage > 1 && (
                    <Link 
                      href={`/mcp-tools?query=${encodeURIComponent(query)}&page=${currentPage - 1}&perPage=${perPage}&sortBy=${sortBy}`}
                      className="px-3 py-2 rounded-md text-muted-foreground hover:bg-gray-100 flex items-center"
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
                      href={`/mcp-tools?query=${encodeURIComponent(query)}&page=${num}&perPage=${perPage}&sortBy=${sortBy}`}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === num 
                          ? 'bg-blue-600 text-white' 
                          : 'text-muted-foreground hover:bg-gray-100'
                      }`}
                    >
                      {num}
                    </Link>
                  ))}
                  
                  {/* Next page button */}
                  {currentPage < totalPages && (
                    <Link 
                      href={`/mcp-tools?query=${encodeURIComponent(query)}&page=${currentPage + 1}&perPage=${perPage}&sortBy=${sortBy}`}
                      className="px-3 py-2 rounded-md text-muted-foreground hover:bg-gray-100 flex items-center"
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
    </div>
  );
}

export async function generateMetadata({ searchParams }: McpToolsPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || '';
  const title = query 
    ? `MCP Tools - Search: ${query} | CodeboltAI` 
    : 'MCP Tools | Model Context Protocol Servers | CodeboltAI';
  
  return {
    title,
    description: 'Discover Model Context Protocol (MCP) servers to extend your AI capabilities. Browse our collection of community-built MCP tools.',
    openGraph: {
      title,
      description: 'Discover Model Context Protocol (MCP) servers to extend your AI capabilities.',
    },
  };
}