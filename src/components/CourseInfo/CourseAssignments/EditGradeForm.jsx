import React from 'react';
import SubmitButton from '../../general/SubmitButton';
import useFields from '../../../hooks/useFields';

function EditGradeForm({ assignmentName, userGrade = 0, save }) {
	const INITIAL_STATE = {
		userGrade: userGrade,
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Convert userGrade to integer
		save(+formData.userGrade);

		// Clear state of form
		resetFormData();
	};

	return (
		<div className='Enter-Grade-Form p-3'>
			<h4 className='mb-5'>{assignmentName}</h4>
			<form onSubmit={handleSubmit} className='container'>
				<div className='form-group'>
					<label htmlFor='userGrade' className='float-left'>
						Enter Grade
					</label>
					<input
						id='userGrade'
						name='userGrade'
						className='form-control mate-form-input'
						onChange={handleChange}
						value={formData.userGrade}
						type='number'
					/>
				</div>
				<SubmitButton text='Save' />
			</form>
		</div>
	);
}

export default EditGradeForm;
