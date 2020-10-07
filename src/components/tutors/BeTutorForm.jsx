/** Dependencies */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import moment from 'moment';
import { original, produce } from 'immer';

/** Components & Helpers */
import DatePicker from 'react-datepicker';
import CTAButton from '../general/CTAButton';
import useFields from '../../hooks/useFields';
import createFbTimestamp from '../../utils/createFbTimestamp';
import { addFlashMessage } from '../../store/actions/flashMessages';
import db from '../../config/fbConfig';

/** MUI */
import { IconButton } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import Chip from '@material-ui/core/Chip';
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const DAYS = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
];

function BeTutorForm({ uid, user, update, availability }) {
	const dispatch = useDispatch();

	// Form Data
	const INITIAL_STATE = {
		keywords: '',
		portfolio: '',
	};
	console.log(availability);
	console.log(user);
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [changeMade, setChangeMade] = useState(false);

	// const availability = {
	// 	monday: {
	// 		start: moment(new Date()).format(),
	// 		end: moment(new Date()).format(),
	// 	},
	// 	tuesday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	wednesday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	thursday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	friday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	saturday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	sunday: { start: new Date().getTime(), end: new Date().getTime() },
	// };

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
		setChangeMade(true);
		const availability = { time, day, type, index };
		update(availability);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		update(formData);

		// Clear state of form
		setFormData(INITIAL_STATE);
		setChangeMade(false);
	};

	// 'Start' and 'End' Time Pickers
	const timePickers = (day, index = 0) => (
		<>
			<TimePicker
				clearable
				variant="inline"
				minutesStep={5}
				label={day.charAt(0).toUpperCase() + day.slice(1)}
				value={availability[day][0].start}
				onChange={(e) => handleDate(e, day, 'start', index)}
			/>
			<p className="TimePicker__Seperator">—</p>
			<TimePicker
				clearable
				variant="inline"
				minutesStep={5}
				value={availability[day][0].end}
				onChange={(e) => handleDate(e, day, 'end', index)}
			/>

			{/* Default HTML Input fields */}
			{/* <div className='form-group'>
				<label htmlFor={day} className='float-left'>
					{day.charAt(0).toUpperCase() + day.slice(1)}
				</label>
				<input
					className='form-control mate-form-input'
					type='time'
					onChange={(e) => handleDate(e, day, 'start', index)}
					name={day}
					value={availability[day].start}
				/>
			</div>
			<div className='form-group'>
				<input
					className='form-control mate-form-input'
					type='time'
					onChange={(e) => handleDate(e, day, 'end', index)}
					name={day}
					value={availability[day].end}
				/>
			</div> */}
			<div className="Availability__Remove">
				<IconButton>
					<RemoveCircleOutlineSharpIcon />
				</IconButton>
			</div>
		</>
	);

	// Build Fields for Availability
	const dayFields = DAYS.map((day, index) => (
		<div className="Availability__Day">
			<div className="Availability__TimePicker">{timePickers(day)}</div>
			<div className="Availability__Add">
				<IconButton>
					<AddCircleOutlineRoundedIcon />
				</IconButton>
			</div>
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
			if (!regexp.test(data)) {
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
		if (field === 'keywords') {
			return arrayOfData.map((data, index) => (
				<li data-name={field} key={index}>
					<Chip
						label={data}
						onDelete={() => removeData(field, data)}
						size="small"
						//   className={classes.chip}
					/>
				</li>
			));
		} else {
			return arrayOfData.map((data, index) => (
				<li data-name={field} key={index}>
					{data}
					<IconButton onClick={() => removeData(field, data)}>
						<RemoveCircleOutlineSharpIcon />
					</IconButton>
				</li>
			));
		}
	};

	return (
		<div className="BeTutorForm">
			{/* <form className="container mb-3" onSubmit={handleSubmit}> */}
			<form onSubmit={(e) => addData('keywords', formData.keywords, e)}>
				<div className="form-group">
					<label className="float-left">I can help in...</label>
					<small className="char-count">
						{10 - user.keywords.length} keywords left
					</small>
					<input
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="keywords"
						value={formData.keywords}
						maxLength="25"
						placeholder="ex. python, photoshop, calculus..."
					/>
					<div className="keyword-form-footer form-footer">
						<small className="info-text">*press enter after each keyword</small>
						<small
							className={`char-count ${
								25 - formData.keywords.length <= 10 ? 'error-limit' : ''
							}`}>
							{25 - formData.keywords.length} characters left
						</small>
					</div>
				</div>
			</form>
			{user.keywords.length > 0 ? (
				<>
					<ul className="User-Keywords">
						{fieldList('keywords', user.keywords)}
					</ul>
				</>
			) : null}
			<div className="form-group BeTutor__Portfolio">
				<label className="float-left">Portfolio Links</label>
				<input
					className="form-control mate-form-input"
					type="text"
					onChange={handleChange}
					name="portfolio"
					value={formData.portfolio}
					placeholder="ex. linkedin, github, website..."
				/>
				{user.portfolio.length > 0 ? (
					<ul className="User-Porfolio-Links">
						{fieldList('portfolio', user.portfolio)}
					</ul>
				) : null}
				<div className="Portfolio__Add">
					<IconButton onClick={() => addData('portfolio', formData.portfolio)}>
						<AddCircleOutlineRoundedIcon />
					</IconButton>
				</div>
			</div>
			<div className="Be-Tutor__Availability">
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					{dayFields}
				</MuiPickersUtilsProvider>
			</div>
			{/* <div className={`Search__Footer ${!changeMade ? 'disabled-btn' : ''}`}>
					<CTAButton text="Save" />
				</div>
			</form> */}
		</div>
	);
}

export default BeTutorForm;
