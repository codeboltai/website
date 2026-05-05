import { redirect } from 'next/navigation';

interface MCPToolDetailRedirectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MCPToolDetailRedirect({ params }: MCPToolDetailRedirectProps) {
  const { id } = await params;
  
  // Redirect to the new registry location
  redirect(`/registry/mcp-tools/${id}`);
}