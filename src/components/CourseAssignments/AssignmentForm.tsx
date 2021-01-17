/** Dependencies */
import React, { useState, memo, MouseEvent, ChangeEvent } from 'react';
import './styles/AssignmentForm.css';

/** Components & Helpers */
import SubmitButton from '../SubmitButton/SubmitButton';
import 'react-datepicker/dist/react-datepicker.css';

/** MUI */
import TextField from '@material-ui/core/TextField';

interface Props {
	save: Function;
	userId: string;
}

interface NewAssignmentProps {
	title: string;
	type: string;
}

/** Form to add a assignment. */
const AssignmentForm = ({ save, userId }: Props): JSX.Element => {
	// Form Data
	const INITIAL_STATE = {
		title: '',
		type: '',
		dueDate: null,
		grades: [userId],
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [errors, setErrors] = useState('');

	/** Handles general fields in form */
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setErrors('');
		const { name, value } = e.target;
		setFormData((fData) => ({ ...fData, [name]: value }));
	};

	/** Handles 'dueDate' field */
	const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
		setErrors('');
		const { name, value } = e.target;
		const date = new Date(value);

		setFormData((fData) => ({ ...fData, [name]: date }));
	};

	/** Validates form has no empty fields */
	const validateData = (data: NewAssignmentProps) => {
		if (
			data.title === '' ||
			data.title.trim() === '' ||
			data.type === '' ||
			data.type.trim() === ''
		) {
			return false;
		}
		return true;
	};

	const handleSubmit = (e: MouseEvent) => {
		e.preventDefault();
		if (validateData(formData)) {
			save(formData);
			// Clear state of form
			setFormData(INITIAL_STATE);
		} else {
			setErrors('*Can not leave field empty!');
		}
	};

	return (
		<div className="AssignmentForm p-3">
			<h4>Add Assignment</h4>
			{/* @ts-ignore */}
			<form className="container mb-3" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title" className="float-left">
						Name
					</label>
					<input
						id="title"
						className="form-control mate-form-input"
						type="text"
						// @ts-ignore
						onChange={handleChange}
						name="title"
						value={formData.title}
						maxLength={30}
						required
					/>
					<small
						className={`char-count ${
							30 - formData.title.length <= 10 ? 'error-limit' : ''
						}`}>
						{30 - formData.title.length} characters remaining
					</small>
				</div>
				<div className="form-group">
					<label className="float-left" htmlFor="type">
						Type
					</label>
					<select
						required
						// @ts-ignore
						onChange={handleChange}
						name="type"
						className="Assignment-Form-Type Mate-Form-Select mate-form-input form-control"
						id="type"
						defaultValue={formData.type}>
						<option value="" disabled className="text-disabled">
							Select a type
						</option>
						<option>Homework</option>
						<option>Project</option>
						<option>Lab</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="dueDate" className="float-left Assignment-Due-Date">
						Due Date
					</label>
					{/* <DatePicker
					name="dueDate"
					selected={formData.dueDate}
					onChange={handleDate}
					timeInputLabel="Time:"
					dateFormat="MM/dd/yyyy h:mm aa"
					showTimeInput
				/> */}

					<TextField
						required
						id="assignmentDueDate"
						type="datetime-local"
						className="float-right"
						defaultValue={formData.dueDate}
						name="dueDate"
						// @ts-ignore
						onChange={handleDate}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<SubmitButton text="Add" />
			</form>
			<div className="alert errors">{errors}</div>
		</div>
	);
};

export default memo(AssignmentForm);
