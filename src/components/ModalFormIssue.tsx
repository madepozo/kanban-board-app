import React, { useContext } from 'react';

import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import FormIssue from './FormIssue';
import { AppContext } from '../contexts/AppContext';
import { Issue } from '../models/Issue.model';

const getModalStyle = () => {
    return {
        top: `10%`,
        left: `50%`,
        transform: `translate(-200px, 0px)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
		width: 400,
        backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Title = styled.h2`
	color: #354664;
	margin-top: 10px;
	text-align: center;
`;

type Props = {
	show: boolean;
}
export default ({ show= false }: Props) => {
	const appContext: any = useContext(AppContext);
	const { state, cancelAction, addIssue, updateIssue } = appContext;
	const { isEditing, selectedIssue } = state; 
	const title = isEditing ? 'Edit Issue' : 'Create Issue';
	const issueModel = isEditing ? selectedIssue : null;
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	const handleClose = () => {
		cancelAction(isEditing ? 'isEditing' : 'isCreating');
	};

	const handleSubmit = (issue: Partial<Issue>) => {
		if (isEditing) {
			updateIssue(issue);
		} else {
			addIssue(issue);
		}
	};
	
	return (
		<Modal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={show}
			onClose={handleClose}
		>
			<div style={modalStyle} className={classes.paper}>
				<Title>{title}</Title>
				<FormIssue
					handleCancel={handleClose}
					issue={issueModel}
					handleSubmit={handleSubmit}
				/>
			</div>
		</Modal>
	);
}
