import React from 'react';
import useFields from '../../hooks/useFields';
import SubmitButton from '../general/SubmitButton';

/** Form to add a course.
 * Courses -> Modal -> CourseForm
 */
function CourseForm({ save }) {
	// Form Data
	const INITIAL_STATE = {
		courseMajor: '',
		courseNumber: '',
		courseSemester: '',
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
						Subject
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
					<label htmlFor='courseNumber' className='float-left'>
						Course Number
					</label>
					<input
						id='courseNumber'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='courseNumber'
						value={formData.courseNumber}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='courseSemester' className='float-left'>
						Semester
					</label>
					<input
						id='courseSemester'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='courseSemester'
						value={formData.courseSemester}
					/>
				</div>
				<SubmitButton text='Add' />
			</form>
		</div>
	);
}

export default CourseForm;
