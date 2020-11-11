/** Dependencies */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';
import AutocompleteStudyGroups from '../AutocompleteStudyGroups/AutocompleteStudyGroups';
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog';
import createFbTimestamp from '../../../../utils/createFbTimestamp';
import addUserToCollection from '../../../../utils/addUserToCollection';
import { addFlashMessage } from '../../../../store/actions/flashMessages';
import './styles/StudyGroupForm.css';

/** Form to add a course.
 * StudyGroups -> 'Join Study Group' Button -> Modal -> StudyGroupForm
 *
 * @param {function}	save			Function to save new Study Group to DB.
 * @param {array}		studyGroups		Array of objects containing Study Group data.
 * @param {object}	 	user			Object of current user's data.
 */
function StudyGroupForm({ save, studyGroups, user }) {
	const { uid, displayName, photoURL } = user;
	const history = useHistory();
	const dispatch = useDispatch();

	// ! NEED TO MATCH NEW DB SCHEMA
	// ! WHEN MAKING NEW STUDY GROUP
	// Form Data
	const INITIAL_STATE = {
		active: true,
		private: false,
		admin: [uid],
		usersList: [uid],
		count: 0,
		maxUsers: null,
		title: '',
		createdAt: createFbTimestamp(),
		lastUpdatedAt: createFbTimestamp(),
	};

	const SEARCH_INITIAL_STATE = {
		studyGroupId: '',
		studyGroupTitle: '',
	};

	const [showOptions, setShowOptions] = useState(false);
	const [errors, setErrors] = useState('');
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [searchForm, setSearchForm] = useState(SEARCH_INITIAL_STATE);

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	const handleSearch = (e) => {
		setSearchForm({ studyGroupTitle: e.target.value });
	};

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

	/** Stores studyGroupId in state */
	const setId = (e) => {
		let { id } = e.target;
		let { name, value } = !e.target.dataset.name ? e.target : e.target.dataset;

		setSearchForm((fData) => ({
			...fData,
			studyGroupId: id,
			[name]: value,
		}));
		addStudyGroupPrompt(id, value);
	};

	/** Prompts Confirmation Dialog to Add User to Study Group */
	const addStudyGroupPrompt = (id, studyGroupName) => {
		setConfirmDialog({
			isOpen: true,
			title: `Join ${studyGroupName}?`,
			subtitle: '',
			onConfirm: () => {
				const userData = {
					uid,
					displayName,
					photoURL,
					admin: false,
				};
				addUserToCollection('study-groups', id, uid, userData);

				history.push(`/study-groups/${id}`);
				dispatch(
					addFlashMessage({
						isOpen: true,
						message: 'Joined Study Group!',
						type: 'success',
					})
				);
			},
		});
	};
	/***************************************************** */

	/** if user clicks outside of options, showOptions will be set to false */
	function toggleShowOptions(e) {
		if (
			e.target.tagName !== 'LI' ||
			e.target.tagName !== 'UL' ||
			e.target.tagName !== 'INPUT'
		) {
			setShowOptions(false);
		}
	}

	/** Toggles options display */
	function toggleOptions(status) {
		setShowOptions(status);
	}

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
			save(formData);
			// Clear state of form
			resetFormData();
		}
	};

	return (
		<div className="StudyGroupForm p-3" onClick={toggleShowOptions}>
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<form className="container mb-3">
				<AutocompleteStudyGroups
					id={'studyGroup'}
					name="studyGroupTitle"
					onChange={handleSearch}
					value={searchForm.studyGroupTitle}
					options={studyGroups}
					setId={setId}
					placeholder={'find study group...'}
					showOptions={showOptions}
					toggleOptions={toggleOptions}
				/>
			</form>
			<div className="StudyGroupForm__Create">
				<h4>Create Study Group</h4>
				<form className="container mb-3" onSubmit={handleSubmit}>
					<label htmlFor="title" className="float-left">
						Title*
					</label>
					<input
						id="title"
						className="form-control mate-form-input mb-3"
						type="text"
						onChange={handleChange}
						name="title"
						value={formData.title}
						maxLength="30"
						required
					/>
					<small
						className={`char-count ${
							30 - formData.title.length <= 10 ? 'error-limit' : ''
						}`}>
						{30 - formData.title.length} characters remaining
					</small>
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
					<SubmitButton text="Create Group" />
				</form>
			</div>
		</div>
	);
}

StudyGroupForm.propTypes = {
	save: PropTypes.func,
	studyGroups: PropTypes.array,
	user: PropTypes.object,
};

export default StudyGroupForm;
