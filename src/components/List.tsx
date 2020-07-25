import React, { useContext } from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import styled from '@emotion/styled';
import IssueCard from './IssueCard';
import { Issue } from '../models/Issue.model';
import { AppContext } from '../contexts/AppContext';

const Wrapper = styled.div`
	width: 272px;
    box-sizing: border-box;
    display: inline-block;
	max-height: 75vh;
    margin: 10px 6px;
    vertical-align: top;
	white-space: nowrap;
	padding: 0;
`;

const Content = styled.div`
	background-color: #ebecf0;
	height: auto;
	white-space: normal;
	width: 100%;
    border-radius: 3px;
    box-sizing: border-box;
	display: flex;
	min-height: 140px;
    flex-direction: column;
    max-height: 100%;
	position: relative;
	padding: 0 8px;
`;

const ListIssues = styled.div`
	flex: 1;
	padding: 6px 0;
	overflow-y: auto;
	height: 100%;
`;

const ListTitle = styled.h2`
	color: #354664;
	text-align: left;
	margin-top: 10px;
	margin-bottom: 20px;
	font-size: 14px;
`;

const SkeletonFooter = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10px;
`;

const SkeletonTags = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 150px;
`;

const PLaceholderSkeleton = () => (
	<>
		<Skeleton variant="text" height={25} width={'70%'} />
		<Skeleton variant="text" height={100} />
		<SkeletonTags>
			<Skeleton variant="text" width={40} />
			<Skeleton variant="text" width={40} />
			<Skeleton variant="text" width={40} />
		</SkeletonTags>
		<SkeletonFooter>
			<Skeleton variant="circle" width={25} height={25} />
			<Skeleton variant="text" width={'35%'} height={25} />
			<Skeleton variant="text" width={'35%'} height={25} />
		</SkeletonFooter>
	</>
);

type Props = {
	data: Issue[];
	title: string;
	completed: boolean;
	status: string;
};
export default ({ data, title, completed, status }: Props) => {
	const appContext: any = useContext(AppContext);

	const handleDrop = (evt) => {
		const id = evt.dataTransfer.getData('id');
		appContext.updateStatus(id, status);
	};
	
	return (
		<Wrapper>
			<Content>
				<ListTitle>{title}</ListTitle>
				<ListIssues onDrop={handleDrop} onDragOver={(evt) => evt.preventDefault()}>
					{
						completed
						? data.map((issue: Issue) => 
							<IssueCard
								issue={issue}
								key={`Issue-list-${issue.id}`}
							/>)
						: <PLaceholderSkeleton />
					}
				</ListIssues>
			</Content>
		</Wrapper>	
	);
}
