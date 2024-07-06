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
};