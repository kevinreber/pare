import React from 'react';
import useFields from '../../../../hooks/useFields';
import SubmitButton from '../../../general/SubmitButton';

/** Form to add a assignment. */
function AssignmentForm({ save }) {
	// Form Data
	const INITIAL_STATE = {
		title: '',
		dueDate: '',
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();
		save(formData);

		// Clear state of form
		resetFormData();
	};

	return (
		<div className='AssignmentForm p-3'>
			<h4>Add Assignment</h4>
			<form className='container mb-3' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='title' className='float-left'>
						Name of Assignment
					</label>
					<input
						id='title'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='title'
						value={formData.title}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='dueDate' className='float-left'>
						Due Date
					</label>
					<input
						id='dueDate'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='dueDate'
						value={formData.dueDate}
					/>
				</div>
				<SubmitButton text='Add' />
			</form>
		</div>
	);
}

export default AssignmentForm;
