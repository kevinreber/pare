import React, { useState, useEffect } from 'react';
import useFields from '../../hooks/useFields';
import SubmitButton from '../general/SubmitButton';
import { useSelector } from 'react-redux';
import Autocomplete from './Autocomplete';

/** Form to add a course.
 * Courses -> 'Join Class' Button -> Modal -> CourseForm
 */
function CourseForm({ save }) {
	// Form Data
	const INITIAL_STATE = {
		courseName: '',
		courseSemester: '',
	};
	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const courseCatalog = useSelector((state) => state.courseCatalog);
	console.log(courseCatalog);

	const [displaySearch, setDisplaySearch] = useState(false);
	// const [courseCatalog, setCourseCatalog] = useState([]);
	const [filteredCatalog, setFilteredCatalog] = useState([]);
	// const [search, setSearch] = useState('');

	const toggleCatalog = () => setDisplaySearch((show) => !show);

	// useEffect(() => {
	// 	if (displaySearch) {
	// 		const results = courseCatalog.filter((course) => course.abbreviation);
	// 		setFilteredCatalog(results);
	// 	}
	// }, [formData.courseName, displaySearch]);

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
				{/* <div className='form-group'>
					<label htmlFor='courseMajor' className='float-left'>
						Search
					</label>
					<input
						id='courseMajor'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='courseMajor'
						value={formData.courseName}
						onSelect={toggleCatalog}
					/>
				</div> */}
				<Autocomplete
					id={'courseName'}
					name='courseName'
					onChange={handleChange}
					value={formData.courseName}
					label={'Search'}
					options={courseCatalog.courses}
					type={'courses'}
				/>
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
				<SubmitButton text='Join' />
			</form>
		</div>
	);
}

export default CourseForm;
