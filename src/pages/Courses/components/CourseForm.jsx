/** Dependencies */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import Autocomplete from '../../../components/Autocomplete/Autocomplete';

/** Form to add a course.
 * Courses -> 'Join Class' Button -> Modal -> CourseForm
 */
function CourseForm({ save, confirmDialog, setConfirmDialog, courses }) {
	// Form Data
	const INITIAL_STATE = {
		courseName: '',
		courseSemester: '',
		courseYear: '',
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
		// Check if course is already added to user's course list
		for (let course of courses) {
			if (course.id === formData.courseId) {
				setErrors('Course Already added!');
				return false;
			}
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateFormData()) {
			save(formData);

			// Reset form data
			setFormData(INITIAL_STATE);
		}
	};

	return (
		<div className="CourseForm p-3">
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<h4>Join Class</h4>
			<form className="container mb-3" onSubmit={handleSubmit}>
				<Autocomplete
					id={'courseName'}
					name="courseName"
					onChange={handleChange}
					value={formData.courseName}
					label={'Search'}
					options={courseCatalog.courses}
					type={'courses'}
					setId={setId}
					placeholder={'ex: COMPSCI 61A'}
				/>
				<div className="form-group CourseFormSemesterFields">
					<select
						id="courseSemester"
						className="form-control mate-form-input mr-2"
						onChange={handleChange}
						name="courseSemester"
						value={formData.courseSemester}>
						<option className="option-disabled" value="" disabled>
							Semester
						</option>
						<option>Fall</option>
						<option>Spring</option>
						<option>Summer</option>
					</select>
					<select
						id="courseYear"
						className="form-control mate-form-input ml-2"
						onChange={handleChange}
						name="courseYear"
						value={formData.courseYear}>
						<option className="option-disabled" value="" disabled>
							Year
						</option>
						<option>2020</option>
						<option>2019</option>
						<option>2018</option>
						<option>2017</option>
						<option>2016</option>
					</select>
				</div>
				<div className="alert errors">{errors}</div>
				<SubmitButton text="Join" />
			</form>
		</div>
	);
}

export default CourseForm;
