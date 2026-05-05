'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchAndSortProps {
  currentQuery: string;
  currentSortBy: string;
  currentPerPage: number;
  basePath: string;
}

export default function SearchAndSort({ 
  currentQuery, 
  currentSortBy, 
  currentPerPage, 
  basePath 
}: SearchAndSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams();
      if (query) params.set('query', query);
      params.set('page', '1');
      params.set('perPage', currentPerPage.toString());
      params.set('sortBy', currentSortBy);
      
      router.push(`${basePath}?${params.toString()}`);
    });
  };

  const handleSortChange = (sortBy: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('sortBy', sortBy);
      params.set('page', '1');
      
      router.push(`${basePath}?${params.toString()}`);
    });
  };

  const handlePerPageChange = (perPage: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('perPage', perPage);
      params.set('page', '1');
      
      router.push(`${basePath}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents..."
            className="pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring w-64 bg-background text-foreground"
          />
        </div>
      </form>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Sort by:</span>
        <select
          value={currentSortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="text-sm border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
          disabled={isPending}
        >
          <option value="rating">Highest Rating</option>
          <option value="title">Name (A-Z)</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Per Page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Show:</span>
        <select
          value={currentPerPage}
          onChange={(e) => handlePerPageChange(e.target.value)}
          className="text-sm border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
          disabled={isPending}
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="96">96</option>
        </select>
      </div>
    </div>
  );
}