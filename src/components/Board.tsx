import React, { useContext, useEffect } from 'react'

import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from '@emotion/styled';

import { AppContext } from '../contexts/AppContext';
import { Statuses } from '../constants';

import ConfirmDialog from './ConfirmDialog';
import List from './List';
import ModalFormIssue from './ModalFormIssue';
import Search from './Search';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Content = styled.div`
	align-self: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	max-width: 845px;
	overflow-x: auto;
	width: 90%;
`;

const Header = styled.header`
	align-items: center;
	align-self: center;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 10px;
	max-width: 845px;
	width: 90%;
`;

const Title = styled.h1`
	color: white;
	margin: 10px 0;
	text-align: center;
`;

const Titles = ['To Do', 'In Progress', 'Done'];

export default () => {
	const appContext: any = useContext(AppContext);
	const {
		isDataLoaded,
		issues,
		filteredIssues,
		isSearching,
		isEditing,
		isCreating,
		isDeleting
	} = appContext.state;

	const data = isSearching ? filteredIssues : issues;

	const handleOpen = () => {
		appContext.setCreating();
	};

	useEffect(() => {
		appContext.getIssues();
	}, []);

	return (
		<>
			<Container>
				<Header>
					<Title>
						Kanban Board
					</Title>
					<Button variant="contained" color="secondary" onClick={handleOpen} disabled={!isDataLoaded}>
						<AddIcon /> New Issue
					</Button>
				</Header>
				<Search />
				<Content>
					{Statuses.map((status, index) => (
						<List
							key={`Board-List-${status}`}
							title={Titles[index]}
							completed={isDataLoaded}
							data={data.filter(issue => issue.status === status)}
							status={status}
						/>
					))}
				</Content>
			</Container>
			<ModalFormIssue show={isEditing || isCreating} />
			{ isDeleting && <ConfirmDialog /> }
		</>
	);
}
