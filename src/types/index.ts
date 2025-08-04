export interface MCPCategory {
    id: number;
    name: string;
    pageurl: string;
}

export interface MCP {
    id: number;
    mcpId: string;
    githubUrl: string;
    name: string;
    author: string;
    description: string;
    category: MCPCategory;
    tags: string;
    requiresApiKey: number;
    readmeContent: string | null;
    llmsInstallationContent: string | null;
    githubStars: number;
    createdAt: string;
    updatedAt: string;
    lastGithubSync: string;
    avatarSrc: string;
    status: number;
    isVerified: number;
    isDisabled: number;
    isInvalid: number;
}

export interface MCPResponse {
    lastUpdatedDate: string;
    data: MCP[];
}   

export interface AgentRouting {
    worksonblankcode: boolean;
    worksonexistingcode: boolean;
    supportedlanguages: string[];
    supportedframeworks: string[];
    softwaredevprocessmanaged: string[];
}

export interface DefaultAgentLLM {
    strict: boolean;
    modelorder: string[];
}

export interface LLMRole {
    name: string;
    description: string;
    strict: boolean;
    modelorder: string[];
}

export interface AgentMetadata {
    agent_routing: AgentRouting;
    defaultagentllm: DefaultAgentLLM;
    sdlc_steps_managed: string[];
    llm_role: LLMRole[];
}

export interface AgentAction {
    name: string;
    description: string;
    detailDescription: string;
    actionPrompt: string;
}

export interface Agent {
    id: number;
    agent_id: string;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    createdByUser: string;
    avatarSrc: string;
    avatarFallback: string;
    zipFilePath: string;
    unique_id: string;
    metadata: AgentMetadata;
    initial_message: string;
    actions: AgentAction[];
    slug: string;
    version: string;
    author: string;
    status: number;
    updatedAt: string;
    sourceCodeUrl: string;
    lastUpdatedUI: number;
    githubUrl: string | null;
    isInvalid: number;
    isVerified: number;
    isDisabled: number;
    isPrivate: number;
    rating?: number;
    createdAt?: string;
}