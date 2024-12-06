export type Agent = {
	longDescription: string;
	createdByUser: string;
	avatarSrc: string;
	action?: {
		detailDescription: string;
		name: string;
		description: string;
		actionPrompt: string;
	}[];
	description: string;
	id: string;
	title: string;
	avatarFallback: string;
	slug: string;
	tags: string[];
	zipFilePath: string;
	featured?: boolean;
	recommended?: boolean;
	category?: string;
};

interface Action {
    detailDescription: string;
    name: string;
    description: string;
    actionPrompt: string;
}

interface additionalAgents {
    longDescription: string;
    createdByUser: string;
    avatarSrc: string;
    action: Action[];
    description: string;
    id: string;
    title: string;
    avatarFallback: string;
    slug: string;
    tags: string[];
    zipFilePath: string;
    featured: boolean;
    recommended: boolean;
    category: string;
}

export type AgentsData = {
    Libraries: additionalAgents[];
    Assistants: additionalAgents[];
}

interface Image {
    url: string
}


export type Blog = {
    title: string;
    description: string;
    slug: string;
    documentId: string;
    image: Image
}

export type Feature = {
    title: string;
    description: string;
    id: number;
}

export type CardProps = {
    BusinessData: { title: string }[];
    developerData: { title: string }[];
  }
