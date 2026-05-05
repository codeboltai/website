import { redirect } from 'next/navigation';

interface AgentDetailRedirectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgentDetailRedirect({ params }: AgentDetailRedirectProps) {
  const { id } = await params;
  
  // Redirect to the new registry location
  redirect(`/registry/agents/${id}`);
}