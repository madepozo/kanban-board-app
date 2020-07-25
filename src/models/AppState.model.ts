import { Issue } from "./Issue.model";

export interface AppState {
	issues: Issue[];
	filteredIssues: Issue[];
	isSearching: boolean;
	isDataLoaded: boolean;
	isCreating: boolean;
	isEditing: boolean;
	isDeleting: boolean;
	selectedIssue: Issue;
}
