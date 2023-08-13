export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
};
