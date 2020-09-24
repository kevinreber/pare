import React, { useState } from 'react';
import SubmitButton from '../../general/SubmitButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/AssignmentForm.css';

/** Form to add a assignment. */
function AssignmentForm({ save }) {
	// Form Data
	const INITIAL_STATE = {
		title: '',
		type: '',
		dueDate: new Date(),
	};

	const [formData, setFormData] = useState(INITIAL_STATE);

	/** Handles general fields in form */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((fData) => ({ ...fData, [name]: value }));
	};

	/** Handles 'dueDate' field */
	const handleDate = (date) => {
		setFormData((fData) => ({ ...fData, dueDate: date }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		save(formData);

		// Clear state of form
		setFormData(INITIAL_STATE);
	};

	return (
		<div className="AssignmentForm p-3">
			<h4>Add Assignment</h4>
			<form className="container mb-3" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title" className="float-left">
						Name
					</label>
					<input
						id="title"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="title"
						value={formData.title}
						maxLength="30"
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
					<label className="float-left" for="type">
						Type
					</label>
					<select
						onChange={handleChange}
						name="type"
						className="Assignment-Form-Type Mate-Form-Select mate-form-input form-control"
						id="type">
						<option value="" disabled selected className="text-disabled">
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
				</div>
				<DatePicker
					name="dueDate"
					selected={formData.dueDate}
					onChange={handleDate}
					timeInputLabel="Time:"
					dateFormat="MM/dd/yyyy h:mm aa"
					showTimeInput
				/>
				<SubmitButton text="Add" />
			</form>
		</div>
	);
}

export default AssignmentForm;
