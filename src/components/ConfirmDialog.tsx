import React, { useContext } from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { AppContext } from '../contexts/AppContext';

export default () => {
	const appContext: any = useContext(AppContext);
	const { cancelAction, deleteIssue, state } = appContext;
	const { selectedIssue } = state;

	const handleClose = () => {
		cancelAction('isDeleting');
	};

	const handleDelete = () => {
		deleteIssue(selectedIssue.id);
	};

	return (
		<Dialog
			open
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{ selectedIssue.title }
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure you want to delete this issue?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					color="secondary"
					variant="contained"
					startIcon={<DeleteIcon />}
					onClick={handleDelete}
				>
					Delete
				</Button>
			</DialogActions>
      </Dialog>
	)
}