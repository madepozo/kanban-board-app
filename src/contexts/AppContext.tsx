import React, { createContext, useReducer, useMemo } from 'react';

import reducer,
	{
		ADD_ISSUE,
		FETCH_ISSUES,
		UPDATE_ISSUE,
		CANCEL_ACTION,
		SET_EDITING_ISSUE,
		SET_CREATING_ISSUE,
		SET_DELETING_ISSUE,
		FILTER_ISSUES
	}
from '../reducers/AppReducer';
import { Issue } from '../models/Issue.model';
import { AppState } from '../models/AppState.model';
import storage from '../utils/storage';
import { $$storage_key } from '../constants';
import { v4 as uuidv4 } from 'uuid';

export const AppContext = createContext({});

const initialState: AppState = {
	issues: [],
	filteredIssues: null,
	isDataLoaded: false,
	isCreating: false,
	isEditing: false,
	isDeleting: false,
	isSearching: false,
	selectedIssue: null
};

export default ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getIssues = () => {
		setTimeout(() => {
			const issues = storage.get($$storage_key);

			dispatch({
				type: FETCH_ISSUES,
				payload: {
					issues: issues || []
				}
			});
		}, 5000);
	};

	const addIssue = (issue: Partial<Issue>) => {
		dispatch({
			type: ADD_ISSUE,
			payload: { 
				issue: {...issue, status: 'todo', id: uuidv4() }
			}
		});
	};

	const deleteIssue = (id: number) => {
		const copy = [...state.issues].filter(item => {
			return item.id !== id;
		});

		dispatch({
			type: UPDATE_ISSUE,
			payload: {
				issues: copy
			}
		});
	};

	const updateIssue = (issue: Issue) => {
		const copy = [...state.issues].map(item => {
			return item.id === issue.id ? issue : item;
		});

		dispatch({
			type: UPDATE_ISSUE,
			payload: {
				issues: copy
			}
		});
	};

	const updateStatus = (id: string, status: string) => {
		const copy = [...state.issues];
		const index = copy.map(issue => issue.id).indexOf(id);
		const [ issue ] = copy.splice(index, 1);

		if (issue.status !== status) {
			copy.push({...issue, status });

			dispatch({
				type: UPDATE_ISSUE,
				payload: {
					issues: copy
				}
			});
		}
	};

	const setCreating = () => {
		dispatch({
			type: SET_CREATING_ISSUE,
			payload: null
		});
	};

	const setDeleting = (issue: Issue) => {
		dispatch({
			type: SET_DELETING_ISSUE,
			payload: { selectedIssue: issue}
		});
	};

	const setEditing = (issue: Issue) => {
		dispatch({
			type: SET_EDITING_ISSUE,
			payload: { selectedIssue: issue}
		});
	};

	const filterIssues = (query: string) => {
		dispatch({
			type: FILTER_ISSUES,
			payload: {
				filteredIssues: state.issues.filter(issue => {
					const q = query.toLocaleLowerCase();
					const { title, assignee, tags } = issue;

					return title.toLowerCase().includes(q) ||
						assignee.toLowerCase().includes(q) ||
						tags.find(tag => tag.toLowerCase().includes(q));
				}),
				isSearching: !!query
			}
		});
	};

	const cancelAction = (action) => {
		dispatch({
			type: CANCEL_ACTION,
			payload: { action }
		});
	};

	const value = useMemo(() => {
		if (state.isDataLoaded) {
			storage.set($$storage_key, state.issues);
		}

		return {
			state,
			addIssue,
			deleteIssue,
			updateIssue,
			updateStatus,
			getIssues,
			setEditing,
			setCreating,
			setDeleting,
			cancelAction,
			filterIssues
		};
	}, [state]);

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	)
}
