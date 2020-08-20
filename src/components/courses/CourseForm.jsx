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
		courseYear: '',
		courseId: '',
	};

	/** Get courseCatalog from redux store */
	const courseCatalog = useSelector((state) => state.courseCatalog);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		save(formData);

		// Clear state of form
		resetFormData();
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
				<div className='form-group CourseFormSemester'>
					<label htmlFor='courseSemester' className='float-left'>
						Semester
					</label>
					<div className='CourseFormSemesterFields'>
						<select
							id='courseSemester'
							className='form-control mate-form-input mr-2'
							onChange={handleChange}
							name='courseSemester'
							value={formData.courseSemester}>
							<option>FALL</option>
							<option>SPRING</option>
							<option>SUMMER</option>
						</select>
						<select
							id='courseYear'
							className='form-control mate-form-input ml-2'
							onChange={handleChange}
							name='courseYear'
							value={formData.courseYear}>
							<option>2020</option>
							<option>2019</option>
							<option>2018</option>
							<option>2017</option>
							<option>2016</option>
						</select>
					</div>
					{/* <input
						id='courseSemester'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='courseSemester'
						autoComplete='off'
						value={formData.courseSemester}
						placeholder='ex: FALL 2020'
					/> */}
				</div>
				<SubmitButton text='Join' />
			</form>
		</div>
	);
}

export default CourseForm;
