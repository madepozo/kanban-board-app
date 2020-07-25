import React, { useContext } from 'react'

import { Card, Avatar, IconButton, Menu, MenuItem, Chip } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import styled from '@emotion/styled';
import { Issue } from '../models/Issue.model';

import css from './assets/styles/IssueCard.module.scss';
import { AppContext } from '../contexts/AppContext';

type TextProps = {
	size?: number;
	bold?: boolean;
}
const Text = styled.h2`
	display: block;
	margin: 8px 0;
	color: #172b4d;
	font-weight: ${(props: TextProps) => props.bold ? 400 : 300};
	font-size: ${(props: TextProps) => props.size || 12}px;
	line-height: 14px;
	text-align: left;
`;

const CardFooter = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 12px;
	paddin-bottom: 6px;
`;

const DueDate = styled.span`
	color: #333;
	font-size: 12px;
`;

const Assignee = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Name = styled.span`
	color: #333;
	font-size: 12px;
	margin-left: 8px;
`;

const Tags = styled.div`
	margin-top: 16px;
`;

type PropTypes = {
	issue: Issue,
}
export default ({ issue }: PropTypes) => {
	const appContext: any = useContext(AppContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
  	const open = !!anchorEl;
	const handleDragStart = (evt) => {
		evt.dataTransfer.setData('id', issue.id);
	};

	const handleOpen = (event) => {
    	setAnchorEl(event.currentTarget);
  	};

  	const handleClose = (action: string, e) => {
		setAnchorEl(null);

		if (action) {
			if (action === 'edit') {
				appContext.setEditing(issue);
			} else {
				appContext.setDeleting(issue);
			}
		}
  	};

	return (
		<Card
			className={css.Card}
			onDragStart={handleDragStart}
			draggable>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				className={css.CardActionsMenu}
				onClick={handleOpen}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose.bind(this, '')}
			>
				<MenuItem onClick={handleClose.bind(this, 'edit')}>
					<EditIcon className={css.MenuItemIcon} />
					Edit
				</MenuItem>
				<MenuItem onClick={handleClose.bind(this, 'delete')}>
					<DeleteIcon className={css.MenuItemIcon} />
					Delete
				</MenuItem>
			</Menu>
			<Text size={14} bold>{issue.title}</Text>
			<Text>{issue.description}</Text>
			<Tags>
				{issue.tags.map(tag => (
					<Chip
						variant="outlined"
						size="small"
						key={`IssueCard-issue-${tag}`}
						label={tag}
						color="primary"
						style={{ marginRight: 4 }}
					/>
				))}
			</Tags>
			<CardFooter>
				<Assignee>
					<Avatar
						className={css.CardAvatar}
						alt={issue.assignee}
						src="/static/images/avatar/1.jpg"
					/>
					<Name>{issue.assignee}</Name>
				</Assignee>
				<DueDate>
					Due Date: {issue.dueDate}
				</DueDate>
			</CardFooter>
		</Card>
	)
}
