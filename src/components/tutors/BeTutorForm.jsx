import React from 'react';
import SubmitButton from '../general/SubmitButton';
import useFields from '../../hooks/useFields';

function BeTutorForm({ availability, save }) {
	// Form Data
	const INITIAL_STATE = {
		keywords: '',
		portfolio: '',
		availability: '',
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();
		save(formData);

		// Clear state of form
		resetFormData();
	};

	return (
		<div className='BeTutorForm'>
			<form className='container mb-3' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='courseMajor' className='float-left'>
						I can help in...
					</label>
					<input
						id='keywords'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='keywords'
						value={formData.keywords}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='portfolio-links' className='float-left'>
						Portfolio Links
					</label>
					<input
						id='portfolio-links'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='portfolio'
						value={formData.portfolio}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='availability' className='float-left'>
						Availability
					</label>
					<input
						id='availability'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='availability'
						value={formData.availability}
					/>
				</div>
				<SubmitButton text='Join' />
			</form>
		</div>
	);
}

export default BeTutorForm;
