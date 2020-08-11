import React from 'react';
import useFields from '../../hooks/useFields';

/** Form to add a course.
 * Courses -> Modal -> CourseForm
 */
function CourseForm({ save }) {
	// Form Data
	const INITIAL_STATE = {
		courseMajor: '',
		courseId: '',
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();
		save(formData);

		// Clear state of form
		resetFormData();
	};

	return (
		<div className='CourseForm p-3'>
			<h4>Add Class</h4>
			<form className='container mb-3' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='courseMajor' className='float-left'>
						Course Major
					</label>
					<input
						id='courseMajor'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='courseMajor'
						value={formData.courseMajor}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='courseId' className='float-left'>
						Course ID
					</label>
					<input
						id='courseId'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='courseId'
						value={formData.courseId}
					/>
				</div>
				<button className='btn mate-btn w-100 mate-btn-primary'>Add</button>
			</form>
		</div>
	);
}

export default CourseForm;
