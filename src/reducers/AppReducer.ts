import { AppState } from "../models/AppState.model";

export const ADD_ISSUE = 'ADD_ISSUE';
export const CANCEL_ACTION = 'CANCEL_ACTION';
export const FETCH_ISSUES = 'FETCH_ISSUES';
export const FILTER_ISSUES = 'FILTER_ISSUES';
export const SET_CREATING_ISSUE = 'SET_CREATING_ISSUE';
export const SET_DELETING_ISSUE = 'SET_DELETING_ISSUE';
export const SET_EDITING_ISSUE = 'SET_EDITING_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';

type Payload = {
	[key: string]: any;
}

type Action = {
	type: string;
	payload: Payload;
}
export default (state: AppState, { type, payload }: Action) => {
	switch (type) {
		case ADD_ISSUE: {
			return {
				...state,
				issues: [...state.issues, payload.issue],
				isCreating: false
			};
		}
		case FILTER_ISSUES: {
			return {
				...state,
				...payload
			};
		}
		case UPDATE_ISSUE: {
			return {
				...state,
				issues: payload.issues,
				isEditing: false,
				isDeleting: false,
				selectedIssue: null
			};
		}
		case SET_EDITING_ISSUE: {
			return {
				...state,
				selectedIssue: payload.selectedIssue,
				isEditing: true
			};
		}
		case SET_DELETING_ISSUE: {
			return {
				...state,
				selectedIssue: payload.selectedIssue,
				isDeleting: true
			};
		}
		case SET_CREATING_ISSUE: {
			return {
				...state,
				isCreating: true
			};
		}
		case CANCEL_ACTION: {
			return {
				...state,
				[payload.action]: false
			};
		}
		case FETCH_ISSUES: {
			return {
				...state,
				issues: payload.issues,
				isDataLoaded: true
			};
		}
		default:
			return state;
	}
}
