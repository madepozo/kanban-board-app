export interface Issue {
	id?: string;
	title: string;
	description: string;
	tags: string[];
	assignee: string;
	dueDate: Date;
	status?: string;
}
