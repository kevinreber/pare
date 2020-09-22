/** Dependencies */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import SubmitButton from '../general/SubmitButton';
import Autocomplete from '../general/Autocomplete';
import createFbTimestamp from '../../utils/createFbTimestamp';
import './styles/StudyGroupForm.css';

/** MUI */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const PrivateCheckbox = withStyles({
	root: {
		color: 'red',
		'&$checked': {
			color: 'red',
		},
	},
	checked: {},
})((props) => <Checkbox color="var(--primary-color)" {...props} />);

/** Form to add a course.
 * StudyGroups -> 'Join Study Group' Button -> Modal -> StudyGroupForm
 */
function StudyGroupForm({ save, studyGroups, user }) {
	const { uid, displayName, photoURL } = user;

	// Form Data
	const INITIAL_STATE = {
		active: true,
		private: false,
		users: [{ uid, displayName, photoURL, admin: true }],
		count: 0,
		maxUsers: null,
		title: '',
		createdAt: createFbTimestamp(),
		lastUpdatedAt: createFbTimestamp(),
	};

	const SEARCH_INITIAL_STATE = {
		studyGroupSearch: '',
	};

	const [errors, setErrors] = useState('');

	const [formData, setFormData] = useState(INITIAL_STATE);

	/** Update state in formData */
	const handleChange = (e) => {
		// handle checkbox
		if (e.target.type === 'checkbox') {
			console.log(formData.private);
			setFormData((fData) => ({
				...fData,
				private: !fData.private,
			}));
		} else {
			let { name, value } = !e.target.dataset.name
				? e.target
				: e.target.dataset;

			setFormData((fData) => ({
				...fData,
				[name]: value,
			}));
		}
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
		if (!formData.title) {
			setErrors('*Required');
			return false;
		}

		/** if maxUsers, verify it is an integer
		 * else change set maxUsers to null
		 */
		if (formData.maxUsers) {
			if (!Number.isInteger(parseInt(formData.maxUsers))) {
				resetFormData();
				setErrors('*Number must be an Integer');
				return false;
			} else {
				setFormData((fData) => ({
					...fData,
					maxUsers: parseInt(fData.maxUsers),
				}));
			}
		} else {
			setFormData((fData) => ({
				...fData,
				maxUsers: null,
			}));
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateFormData()) {
			formData.count++;
			save(formData);
			// Clear state of form
			resetFormData();
		}
	};

	return (
		<div className="StudyGroupForm p-3">
			<h4>Join Study Group</h4>
			<form className="container mb-3" onSubmit={handleSubmit}>
				{/* <Autocomplete
					id={'courseName'}
					name='courseName'
					onChange={handleChange}
					value={formData.studyGroupSearch}
					label={'Search'}
					options={studyGroups}
					type={'courses'}
					setId={setId}
					placeholder={'Search for Study Groups...'}
				/> */}
				<label htmlFor="title" className="float-left">
					Title*
				</label>
				<input
					id="title"
					className="form-control mate-form-input"
					type="text"
					onChange={handleChange}
					name="title"
					value={formData.title}
					maxLength="20"
					required
				/>
				<div className="StudyGroupForm__Bottom">
					<div className="form-group max-users">
						<label htmlFor="max" className="float-left">
							Max Users
						</label>
						<input
							id="max"
							className="form-control mate-form-input"
							type="number"
							onChange={handleChange}
							name="maxUsers"
							// step="1"
							value={formData.maxUsers}
						/>
					</div>
					<div className="form-group form-check">
						<label htmlFor="private">Private</label>
						<input
							id="private"
							className="form-control mate-form-input form-check-input"
							type="checkbox"
							onChange={handleChange}
							name="private"
							value={formData.private}
						/>
						{/* <FormControlLabel
							control={
								<PrivateCheckbox
									checked={formData.private}
									onChange={handleChange}
									name="private"
								/>
							}
							label="Private"
						/> */}
					</div>
				</div>

				<div className="alert errors">{errors}</div>
				<SubmitButton text="Join" />
			</form>
		</div>
	);
}

export default StudyGroupForm;
