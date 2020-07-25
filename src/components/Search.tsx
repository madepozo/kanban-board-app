import React, { useState, memo, useContext } from 'react';

import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from '@emotion/styled';

import { AppContext } from '../contexts/AppContext';

const Container = styled.div`
	display: flex;
	align-self: center;
	height: 48px;
	flex-direction: row;
	background: rgba(255, 255, 255, 0.15);
	position: relative;
	border-radius: 4px;
    margin-bottom: 20px;
	max-width: 845px;
	width: 90%;
`;

const IconContainer = styled.div`
	position: absolute;
	top: 10px;
	left: 8px;
`;

const Form = styled.form`
	flex: 1;
	height: 100%;
	padding-left: 40px;
`;

const Search = () => {
	const appContext: any = useContext(AppContext);
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		appContext.filterIssues(value);
	};

	return (
		<Container>
            <IconContainer>
            	<SearchIcon style={{color: 'white' }} />
            </IconContainer>
            <Form onSubmit={handleSubmit} autoComplete="off">
				<InputBase
					placeholder="Search by title, assignee, tags..."
					inputProps={{ 'aria-label': 'search' }}
					style={{ color: 'white', height: 48 }}
					fullWidth={true}
					value={value}
					onChange={handleChange}
				/>
			</Form>
        </Container>
	);
};

export default memo(Search);
