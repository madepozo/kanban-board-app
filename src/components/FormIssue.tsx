import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Chip } from '@material-ui/core';
import styled from '@emotion/styled';

import { Issue } from '../models/Issue.model';
import css from './assets/styles/FormIssue.module.scss';

const Form = styled.form``;

const Tags = styled.div`
	margin: 6px 0;
`;

const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: 10px;
`;

type Props = {
	issue?: Issue,
	handleSubmit: Function,
	handleCancel: React.MouseEventHandler
}
export default ({ issue, handleCancel, handleSubmit }: Props) => {
	const [tag, setTag] = useState('');
	const [tags, setTags] = useState(issue ? issue.tags : []);
	const formik = useFormik({
		initialValues: issue || {
			title: '',
			description: '',
			assignee: '',
			dueDate: ''
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Title is required'),
			description: Yup.string().required('Description is required'),
			assignee: Yup.string().required('Assignee is required'),
			dueDate: Yup.string().required('Due date is required')
		}),
		onSubmit: values => {
			handleSubmit({...values, tags });
		},
	});

	const handleChangeTag = (e) => {
		setTag(e.target.value);
	};

	const handleDeleteTag = (tag) => {
		setTags(tags.filter(item => item !== tag));
	};

	const handleKeyDown = (e) => {
		if (["Enter", "Tab", ","].includes(e.key)) {
			e.preventDefault();
			if (!tags.includes(tag)) {
				setTags([...tags, tag]);
				setTag('');
			}
		}
	};

	return (
		<Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
			<TextField
				error={!!(formik.touched.title && formik.errors.title)}
				helperText={formik.errors.title}
				className={css.TextField}
				label="Title"
				id="title"
				name="title"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.title}
			/>

			<TextField
				error={!!(formik.touched.description && formik.errors.description)}
				helperText={formik.errors.description}
				className={css.TextField}
				label="Description"
				id="description"
				name="description"
				multiline
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.description}
			/>

			<TextField
				error={!!(formik.touched.assignee && formik.errors.assignee)}
				helperText={formik.errors.assignee}
				className={css.TextField}
				label="Assignee"
				id="assignee"
				name="assignee"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.assignee}
			/>

			<TextField
				error={!!(formik.touched.dueDate && formik.errors.dueDate)}
				helperText={formik.errors.dueDate}
				className={css.TextField}
				id="dueDate"
				label="Due Date"
				type="date"
				name="dueDate"
				InputLabelProps={{
					shrink: true,
				}}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.dueDate}
			/>

			<TextField
				className={css.TextField}
				id="tags"
				label="Tags"
				name="tags"
				onChange={handleChangeTag}
				onKeyDown={handleKeyDown}
				value={tag}
			/>
			<Tags>
				{tags.map(tag => (
					<Chip
						variant="outlined"
						key={`FormIssue-tags-${tag}`}
						label={tag}
						color="default"
						onDelete={handleDeleteTag.bind(this, tag)}
					/>
				))}
			</Tags>

			<Buttons>
				<Button className={css.ButtonCancel} onClick={handleCancel}>Cancel</Button>
				<Button color="secondary" disabled={formik.isSubmitting || !formik.isValid} type='submit'>
					Save
				</Button>
			</Buttons>
		</Form>
	)
}
