/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import firebase from 'firebase';

/** Components & Helpers */
import Loader from '../../../../components/layout/Loader/Loader';
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog';
import SwitchToggler from '../../../../components/SwitchToggler/SwitchToggler';
import createFbTimestamp from '../../../../utils/createFbTimestamp';
import { addFlashMessage } from '../../../../store/actions/flashMessages';
import db from '../../../../config/fbConfig';

/** MUI */
import { IconButton } from '@material-ui/core';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import Chip from '@material-ui/core/Chip';
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

/**
 * Form to fill out user's tutor info and availability.
 *
 * @param {string}    uid     		User's ID used to get User's availability.
 * @param {object}    user    		Object of user's data.
 */
function BeTutorForm({ uid, user }) {
	const dispatch = useDispatch();

	const CONFIRM_DIALOG_INITIAL_STATE = {
		isOpen: false,
		title: '',
		subtitle: '',
	};

	const [confirmDialog, setConfirmDialog] = useState(
		CONFIRM_DIALOG_INITIAL_STATE
	);

	// Form Data
	const INITIAL_STATE = {
		keywords: '',
		portfolio: '',
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [userAvailability, setUserAvailability] = useState([]);
	const [changeMade, setChangeMade] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Toggles user's tutor status
	const handleTutorToggle = () => {
		db.collection('users').doc(uid).update({
			isTutor: !user.isTutor,
		});
		setConfirmDialog(CONFIRM_DIALOG_INITIAL_STATE);
	};

	// Prompt to toggle user's tutor status
	// Only prompts when user is "turning on" tutor services
	const promptTutorDialog = () => {
		if (!user.isTutor) {
			setConfirmDialog({
				isOpen: true,
				title: 'Offer tutoring services?',
				subtitle:
					'Your profile and availability will appear in the Tutor section',
				onConfirm: () => {
					handleTutorToggle();
				},
			});
		} else {
			handleTutorToggle();
		}
	};

	useEffect(() => {
		/** Get User Availability */
		const getData = () => {
			db.collection('users')
				.doc(uid)
				.collection('availability')
				.orderBy('day')
				.onSnapshot((snapshot) =>
					setUserAvailability(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					)
				);

			setIsLoading(false);
		};

		if (uid) {
			getData();
		}
	}, [uid, setIsLoading]);

	/** Handles general fields in form */
	const handleChange = (e) => {
		if (!changeMade) setChangeMade(true);
		if (e.target.name) {
			const { name, value } = e.target;
			setFormData((fData) => ({ ...fData, [name]: value }));
		}
	};

	// if no changes made to date, save button will not highlight
	if (changeMade && formData.keywords === '' && formData.portfolio === '') {
		setChangeMade(false);
	}

	const handleDate = (time, day, type, index) => {
		updateUserAvailability(day, type, index, time);
	};

	// updates user's availability
	const updateUserAvailability = (day, type, idx, time) => {
		db.collection('users')
			.doc(uid)
			.collection('availability')
			.doc(day)
			.update({
				[idx.toString() + '.' + type]: time,
			});
	};

	// ! Temp
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	update(formData);

	// 	// Clear state of form
	// 	setFormData(INITIAL_STATE);
	// 	setChangeMade(false);
	// };

	// 'Start' and 'End' Time Pickers
	const timePickers = (day, index = 0) => {
		let startTime = null;
		let endTime = null;

		if (day.data['0']) {
			if (day.data['0'].start !== null) {
				startTime = day.data['0'].start.toDate();
			}
			if (day.data['0'].end) {
				endTime = day.data['0'].end.toDate();
			}
		}

		return (
			<div className={`TimePickers-Day TimePickers__${day.id}`}>
				<label>{day.id.charAt(0).toUpperCase() + day.id.slice(1)}</label>
				<div className={`TimePickers-Content`}>
					<TimePicker
						clearable
						minutesStep={15}
						value={startTime}
						placeholder="00:00 AM"
						onChange={(e) => handleDate(e, day.id, 'start', index)}
					/>
					<p className="TimePicker__Separator">—</p>
					<TimePicker
						clearable
						minutesStep={15}
						value={endTime}
						placeholder="00:00 AM"
						onChange={(e) => handleDate(e, day.id, 'end', index)}
					/>

					{index !== 0 ? (
						<div className="Availability__Remove">
							<IconButton>
								<RemoveCircleOutlineSharpIcon />
							</IconButton>
						</div>
					) : null}
				</div>
			</div>
		);
	};

	// Build Fields for Availability
	const dayFields = userAvailability.map((day) => (
		<div key={day.id} className="Availability__Day">
			<div className="Availability__TimePicker">{timePickers(day)}</div>
			{/** ! Temp */}
			{/* <div className="Availability__Add">
				<IconButton>
					<AddCircleOutlineRoundedIcon />
				</IconButton>
			</div> */}
		</div>
	));

	// Returns true if data is verified
	const verifyData = (data, variant) => {
		// Verifies keywords doesn't exceed 10 and if data is empty string
		if (variant === 'keywords') {
			if (user.keywords.length === 10) {
				dispatch(
					addFlashMessage({
						isOpen: true,
						message: 'Only allowed 10 keywords',
						type: 'error',
					})
				);
				return false;
			} else if (data === '' || data.trim() === '') {
				dispatch(
					addFlashMessage({
						isOpen: true,
						message: 'Field can not be empty',
						type: 'error',
					})
				);
				return false;
			}
		}
		// Verifies if data is valid URL
		if (variant === 'portfolio') {
			const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
			if (user.portfolio.length === 5) {
				dispatch(
					addFlashMessage({
						isOpen: true,
						message: 'Only allowed 5 portfolio links',
						type: 'error',
					})
				);
				return false;
			} else if (!regexp.test(data)) {
				dispatch(
					addFlashMessage({
						isOpen: true,
						message: 'Invalid URL',
						type: 'error',
					})
				);
				return false;
			}
		}
		return true;
	};

	// Adds user field data from DB
	const addData = (field, data, e = null) => {
		if (e) {
			e.preventDefault();
		}
		if (verifyData(data, field)) {
			db.collection('users')
				.doc(uid)
				.update({
					[field]: firebase.firestore.FieldValue.arrayUnion(data),
				});
			updateUser(uid);
			// reset field data
			setFormData((fData) => ({
				...fData,
				[field]: '',
			}));
		}
	};

	// Removes user field data from DB
	const removeData = (field, data) => {
		db.collection('users')
			.doc(uid)
			.update({
				[field]: firebase.firestore.FieldValue.arrayRemove(data),
			});
		updateUser(uid);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Removed Field',
				type: 'success',
			})
		);
	};

	// updates user's last update timestamp
	const updateUser = (uid) => {
		db.collection('users').doc(uid).update({
			lastUpdatedAt: createFbTimestamp(),
		});
	};

	// Build list of elements for User Keywords and User Portfolio Links
	const fieldList = (field, arrayOfData) => {
		return arrayOfData.map((data, index) => (
			<li data-name={field} key={index}>
				<Chip
					label={data}
					onDelete={() => removeData(field, data)}
					size={field === 'keywords' ? 'small' : null}
				/>
			</li>
		));
	};

	// listens for key down events
	const handleKeyDown = (field, data, e) => {
		if (['Enter', 'Tab', ','].includes(e.key)) {
			e.preventDefault();
			addData(field, data, e);
		}
	};

	return (
		<div className="BeTutorForm">
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<SwitchToggler
						checked={user.isTutor}
						handleChange={promptTutorDialog}
						name={'is-tutor-toggle'}
					/>
					{/* <form className="container mb-3" onSubmit={handleSubmit}> */}
					<div className="form-group">
						<label className="float-left">I can help in...</label>
						<small className="char-count">
							{10 - user.keywords.length} keywords left
						</small>
						<input
							className="form-control mate-form-input"
							type="text"
							onChange={handleChange}
							onKeyDown={(e) => handleKeyDown('keywords', formData.keywords, e)}
							name="keywords"
							value={formData.keywords}
							maxLength="30"
							placeholder="ex. python, photoshop, calculus..."
						/>
						<div className="keyword-form-footer form-footer">
							<small className="info-text">
								*use comma to separate keywords
							</small>
							<small
								className={`char-count ${
									30 - formData.keywords.length <= 10 ? 'error-limit' : ''
								}`}>
								{30 - formData.keywords.length} characters left
							</small>
						</div>
					</div>
					{user.keywords.length > 0 ? (
						<>
							<ul className="User-Keywords">
								{fieldList('keywords', user.keywords)}
							</ul>
						</>
					) : null}
					<div className="form-group BeTutor__Portfolio">
						<div className="Portfolio__Label">
							<label className="float-left">Portfolio Links</label>
							<small className="char-count">
								{5 - user.portfolio.length} links left
							</small>
						</div>
						<div className="Portfolio__Input">
							<input
								className="form-control mate-form-input"
								type="text"
								onChange={handleChange}
								onKeyDown={(e) =>
									handleKeyDown('portfolio', formData.portfolio, e)
								}
								name="portfolio"
								value={formData.portfolio}
								maxLength="30"
								placeholder="ex. linkedin, github, website..."
							/>
							<div className="portfolio-form-footer form-footer">
								<small className="info-text">
									*use comma to separate links
								</small>
								<small
									className={`char-count ${
										30 - formData.portfolio.length <= 10 ? 'error-limit' : ''
									}`}>
									{30 - formData.portfolio.length} characters left
								</small>
							</div>
						</div>
					</div>
					{user.portfolio.length > 0 ? (
						<ul className="User-Portfolio-Links">
							{fieldList('portfolio', user.portfolio)}
						</ul>
					) : null}
					<div className="Be-Tutor__Availability">
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							{dayFields}
						</MuiPickersUtilsProvider>
					</div>
					{/* <div className={`Search__Footer ${!changeMade ? 'disabled-btn' : ''}`}>
							<CTAButton text="Save" />
						</div>
					</form> */}
				</>
			)}
		</div>
	);
}

BeTutorForm.propTypes = {
	uid: PropTypes.string,
	user: PropTypes.object,
};

export default BeTutorForm;
