import { Agent } from "../types/types";

export const additionalAgents:Agent[] = [
    {
        longDescription: "This agent assists with React development by providing code snippets, best practices, and debugging tips.",
        createdByUser: "jane_doe",
        avatarSrc: "/images/avatars/react.png",
        action: [
            {
                detailDescription: "Generates a new React component with the specified name.",
                name: "Generate Component",
                description: "Creates a new React component.",
                actionPrompt: "Please provide the name of the component."
            },
            {
                detailDescription: "Provides best practices for React development.",
                name: "Best Practices",
                description: "Lists best practices for React development.",
                actionPrompt: "Would you like to see best practices for React development?"
            }
        ],
        description: "React development assistant",
        id: "react-agent-001",
        title: "React Agent",
        avatarFallback: "R",
        slug: "react-agent",
        tags: ["React", "JavaScript", "TypeScript", "Web Development"],
        zipFilePath: "/downloads/react-agent.zip",
        featured: true,
        recommended: true,
        category: "Frameworks"
    },
    {
        longDescription: "This agent assists with Cloudflare Workers by providing code snippets, best practices, and debugging tips.",
        createdByUser: "alice_smith",
        avatarSrc: "/images/avatars/cloudflare.png",
        action: [
            {
                detailDescription: "Generates a new Cloudflare Worker with the specified name.",
                name: "Generate Worker",
                description: "Creates a new Cloudflare Worker.",
                actionPrompt: "Please provide the name of the worker."
            },
            {
                detailDescription: "Provides best practices for Cloudflare Workers development.",
                name: "Best Practices",
                description: "Lists best practices for Cloudflare Workers development.",
                actionPrompt: "Would you like to see best practices for Cloudflare Workers development?"
            }
        ],
        description: "Cloudflare Workers development assistant",
        id: "cloudflare-agent-001",
        title: "Cloudflare Workers Agent",
        avatarFallback: "C",
        slug: "cloudflare-agent",
        tags: ["Cloudflare", "JavaScript", "Serverless", "Web Development"],
        zipFilePath: "/downloads/cloudflare-agent.zip",
        featured: true,
        recommended: true,
        category: "Serverless"
    },
    {
        longDescription: "This agent assists with Google Cloud Functions by providing code snippets, best practices, and debugging tips.",
        createdByUser: "bob_jones",
        avatarSrc: "/images/avatars/googlecloud.png",
        action: [
            {
                detailDescription: "Generates a new Google Cloud Function with the specified name.",
                name: "Generate Function",
                description: "Creates a new Google Cloud Function.",
                actionPrompt: "Please provide the name of the function."
            },
            {
                detailDescription: "Provides best practices for Google Cloud Functions development.",
                name: "Best Practices",
                description: "Lists best practices for Google Cloud Functions development.",
                actionPrompt: "Would you like to see best practices for Google Cloud Functions development?"
            }
        ],
        description: "Google Cloud Functions development assistant",
        id: "googlecloud-agent-001",
        title: "Google Cloud Functions Agent",
        avatarFallback: "G",
        slug: "googlecloud-agent",
        tags: ["Google Cloud", "JavaScript", "Serverless", "Web Development"],
        zipFilePath: "/downloads/googlecloud-agent.zip",
        featured: true,
        recommended: true,
        category: "Serverless"
    },
  ];