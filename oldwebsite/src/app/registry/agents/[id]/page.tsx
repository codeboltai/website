import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Agent } from '@/types';
import { ArrowLeft } from 'lucide-react';
import CopyButton from '@/components/CopyButton';

async function fetchAgent(id: string): Promise<Agent | null> {
  try {
    const response = await fetch(`https://api.codebolt.ai/api/agents/detail?id=${id}`, {
      next: { revalidate: 1200 }, // Cache for 20 minutes (details change less frequently)
    });
    
    if (!response.ok) {
      console.error('Failed to fetch agent:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    return data as Agent;
  } catch (error) {
    console.error('Error fetching agent:', error);
    return null;
  }
}

interface AgentDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgentDetailsPage({ params }: AgentDetailsPageProps) {
  const { id } = await params;
  const agent = await fetchAgent(id);

  if (!agent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/registry/agents" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground  rounded-lg px-4 py-2 bg-card hover:bg-accent/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Agents
            </Link>
          </div>

          {/* Agent Header */}
          <div className="bg-card rounded-lg /20 shadow-sm mb-6">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Agent Avatar */}
                <div className="w-24 h-24 flex-shrink-0">
                  {agent.avatarSrc ? (
                    <Image
                      src={agent.avatarSrc}
                      alt="Agent Avatar"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full border-2 border-border"
                    />
                  ) : (
                    <Image
                      src={`https://hono-avatars.pages.dev/?name=${agent.title}&seed=${agent.id}`}
                      alt="Agent Avatar"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full border-2 border-border"
                    />
                  )}
                </div>
                
                {/* Agent Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {agent.title}
                  </h1>
                  {agent.createdByUser && (
                    <p className="text-muted-foreground mb-3">
                      Created by <span className="text-blue-600 font-medium">{agent.createdByUser}</span>
                    </p>
                  )}
                  {agent.description && (
                    <p className="text-foreground text-lg mb-4 max-w-3xl">
                      {agent.description}
                    </p>
                  )}
                  {agent.tags && agent.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {agent.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content - Tabs */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg  shadow-sm">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <nav className="flex px-6" id="tab-nav">
                    <button 
                      className="tab-btn py-4 px-2 mr-8 text-sm font-medium border-b-2 border-blue-500 text-blue-600" 
                      data-tab="about"
                    >
                      About
                    </button>
                    <button 
                      className="tab-btn py-4 px-2 mr-8 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-foreground" 
                      data-tab="llm-roles"
                    >
                      LLM Roles
                    </button>
                    <button 
                      className="tab-btn py-4 px-2 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-foreground" 
                      data-tab="versions"
                    >
                      Versions
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* About Tab */}
                  <div id="about-content" className="tab-content">
                    <h3 className="text-lg font-semibold mb-4">About</h3>
                    <div className="text-foreground leading-relaxed prose max-w-none">
                      {agent.longDescription || "Codebolt answers your questions about building, running, and testing your apps — clearly and efficiently. Just ask, and I'll guide you with exactly what you need."}
                    </div>
                  </div>

                  {/* LLM Roles Tab */}
                  <div id="llm-roles-content" className="tab-content hidden">
                    <h3 className="text-lg font-semibold mb-4">LLM Roles</h3>
                    {agent.metadata?.llm_role && agent.metadata.llm_role.length > 0 ? (
                      <div className="space-y-4">
                        {agent.metadata.llm_role.map((role, index) => (
                          <div key={index} className=" rounded-lg p-4 hover:bg-accent/50">
                            <h4 className="text-lg font-semibold mb-2">{role.name}</h4>
                            <p className="text-muted-foreground mb-3 text-sm">{role.description}</p>
                            {role.modelorder && role.modelorder.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {role.modelorder.map((model, modelIndex) => (
                                  <span key={modelIndex} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                                    {model}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No LLM roles defined for this agent.</p>
                    )}
                  </div>

                  {/* Versions Tab */}
                  <div id="versions-content" className="tab-content hidden">
                    <h3 className="text-lg font-semibold mb-4">Version History</h3>
                    <div className="overflow-hidden shadow ring-1 ring-border rounded-lg">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted">
                          <tr>
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground">
                              Version
                            </th>
                            <th className="px-3 py-3.5 text-right text-sm font-semibold text-foreground">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-card">
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground">
                              {agent.version || '1.0.0'}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-muted-foreground">
                              latest
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Agent Identifiers */}
              <div className="bg-card rounded-lg  shadow-sm p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Agent Identifiers</h4>
                
                <div className="space-y-4">
                  {/* Agent ID */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Agent ID:</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value={agent.agent_id || ''}
                        readOnly
                        className="flex-1 px-3 py-2 border border-input rounded-md text-sm bg-muted text-foreground"
                      />
                      <CopyButton text={agent.agent_id || ''} />
                    </div>
                  </div>

                  {/* Unique ID */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Unique ID:</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value={agent.unique_id || agent.title?.toLowerCase() || 'act'}
                        readOnly
                        className="flex-1 px-3 py-2 border border-input rounded-md text-sm bg-muted text-foreground"
                      />
                      <CopyButton text={agent.unique_id || agent.title?.toLowerCase() || 'act'} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Supported Frameworks */}
              {agent.metadata?.agent_routing?.supportedframeworks && agent.metadata.agent_routing.supportedframeworks.length > 0 && (
                <div className="bg-card rounded-lg  shadow-sm p-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Supported Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.metadata.agent_routing.supportedframeworks.map((framework, index) => (
                      <span key={index} className="bg-muted text-foreground px-2 py-1 rounded text-xs">
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Supported Languages */}
              {agent.metadata?.agent_routing?.supportedlanguages && agent.metadata.agent_routing.supportedlanguages.length > 0 && (
                <div className="bg-card rounded-lg  shadow-sm p-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Supported Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.metadata.agent_routing.supportedlanguages.map((language, index) => (
                      <span key={index} className="bg-muted text-foreground px-2 py-1 rounded text-xs">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Default Agent LLM */}
              {agent.metadata?.defaultagentllm?.modelorder && agent.metadata.defaultagentllm.modelorder.length > 0 && (
                <div className="bg-card rounded-lg  shadow-sm p-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Default Agent LLM</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.metadata.defaultagentllm.modelorder.map((model, index) => (
                      <span key={index} className="bg-muted text-foreground px-2 py-1 rounded text-xs">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Client-side script for tabs */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const tabButtons = document.querySelectorAll('.tab-btn');
              const tabContents = document.querySelectorAll('.tab-content');
              
              tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                  const targetTab = this.getAttribute('data-tab');
                  
                  // Remove active state from all tabs
                  tabButtons.forEach(btn => {
                    btn.classList.remove('border-blue-500', 'text-blue-600');
                    btn.classList.add('border-transparent', 'text-gray-500');
                  });
                  
                  // Add active state to clicked tab
                  this.classList.remove('border-transparent', 'text-gray-500');
                  this.classList.add('border-blue-500', 'text-blue-600');
                  
                  // Hide all tab contents
                  tabContents.forEach(content => {
                    content.classList.add('hidden');
                  });
                  
                  // Show target tab content
                  const targetContent = document.getElementById(targetTab + '-content');
                  if (targetContent) {
                    targetContent.classList.remove('hidden');
                  }
                });
              });
            });
          `
        }}
      />
    </div>
  );
}

export async function generateMetadata({ params }: AgentDetailsPageProps) {
  const { id } = await params;
  const agent = await fetchAgent(id);
  
  if (!agent) {
    return {
      title: 'Agent Not Found | CodeboltAI',
    };
  }

  return {
    title: `${agent.title} | AI Agent | CodeboltAI`,
    description: agent.description || `Discover ${agent.title}, an AI agent for your development workflow.`,
    openGraph: {
      title: `${agent.title} | AI Agent | CodeboltAI`,
      description: agent.description || `Discover ${agent.title}, an AI agent for your development workflow.`,
      images: agent.avatarSrc ? [{ url: agent.avatarSrc }] : [],
    },
  };
}