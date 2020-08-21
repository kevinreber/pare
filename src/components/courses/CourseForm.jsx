import React, { useState } from 'react';
import SubmitButton from '../general/SubmitButton';
import { useSelector } from 'react-redux';
import Autocomplete from '../general/Autocomplete';

/** Form to add a course.
 * Courses -> 'Join Class' Button -> Modal -> CourseForm
 */
function CourseForm({ save }) {
	// Form Data
	const INITIAL_STATE = {
		courseName: '',
		courseSemester: '',
		courseYear: null,
		courseId: null,
	};

	/** Get courseCatalog from redux store */
	const courseCatalog = useSelector((state) => state.courseCatalog);

	const [errors, setErrors] = useState('');

	const [formData, setFormData] = useState(INITIAL_STATE);

	/** Update state in formData */
	const handleChange = (e) => {
		let { name, value } = !e.target.dataset.name ? e.target : e.target.dataset;

		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	/** Stores courseId in state */
	const setId = (e) => {
		let { id } = e.target;

		setFormData((fData) => ({
			...fData,
			courseId: id,
		}));
	};

	const resetFormData = () => setFormData(INITIAL_STATE);

	/** User must enter in a class with a valid class ID */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (!formData.courseId) {
			setErrors('Course does not exist');
			return false;
		}
		if (!formData.courseSemester) {
			setErrors('Invalid semester');
			return false;
		}
		if (!formData.courseYear) {
			setErrors('Invalid year');
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateFormData()) {
			save(formData);
			// Clear state of form
			resetFormData();
		}
	};

	return (
		<div className='CourseForm p-3'>
			<h4>Join Class</h4>
			<form className='container mb-3' onSubmit={handleSubmit}>
				<Autocomplete
					id={'courseName'}
					name='courseName'
					onChange={handleChange}
					value={formData.courseName}
					label={'Search'}
					options={courseCatalog.courses}
					type={'courses'}
					setId={setId}
					placeholder={'ex: COMPSCI 61A'}
				/>
				<div className='form-group CourseFormSemesterFields'>
					<select
						id='courseSemester'
						className='form-control mate-form-input mr-2'
						onChange={handleChange}
						name='courseSemester'
						value={formData.courseSemester}>
						<option className='option-disabled' value='' disabled selected>
							Semester
						</option>
						<option>Fall</option>
						<option>Spring</option>
						<option>Summer</option>
					</select>
					<select
						id='courseYear'
						className='form-control mate-form-input ml-2'
						onChange={handleChange}
						name='courseYear'
						value={formData.courseYear}>
						<option className='option-disabled' value='' disabled selected>
							Year
						</option>
						<option>2020</option>
						<option>2019</option>
						<option>2018</option>
						<option>2017</option>
						<option>2016</option>
					</select>
				</div>
				<div className='alert errors'>{errors}</div>
				<SubmitButton text='Join' />
			</form>
		</div>
	);
}

export default CourseForm;
