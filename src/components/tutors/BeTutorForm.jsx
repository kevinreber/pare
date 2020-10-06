/** Dependencies */
import React, { useState } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { original, produce } from 'immer';

/** Components & Helpers */
import DatePicker from 'react-datepicker';
import CTAButton from '../general/CTAButton';
import useFields from '../../hooks/useFields';
import createFbTimestamp from '../../utils/createFbTimestamp';
import db from '../../config/fbConfig';

/** MUI */
import { IconButton } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
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
		console.log(e.target);
		if (e.target.name) {
			const { name, value } = e.target;
			setFormData((fData) => ({ ...fData, [name]: value }));
		}
	};

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

	// Removes user field data from DB
	const removeData = (field, data) => {
		console.log(field, data);
		db.collection('users')
			.doc(uid)
			.update({
				[field]: firebase.firestore.FieldValue.arrayRemove(data),
			});

		db.collection('users').doc(uid).update({
			lastUpdatedAt: createFbTimestamp(),
		});
	};

	// Build list of elements for User Keywords and User Portfolio Links
	const fieldList = (field, arrayOfData) => {
		return arrayOfData.map((data, index) => (
			<li data-name={field} key={index}>
				{data}
				<IconButton onClick={() => removeData(field, data)}>
					<RemoveCircleOutlineSharpIcon />
				</IconButton>
			</li>
		));
	};

	return (
		<div className="BeTutorForm">
			<form className="container mb-3" onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="float-left">I can help in...</label>
					<input
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="keywords"
						value={formData.keywords}
						placeholder="use commas to separate keywords..."
					/>
				</div>
				{user.keywords.length > 0 ? (
					<ul className="User-Keywords">
						{fieldList('keywords', user.keywords)}
					</ul>
				) : null}
				<div className="form-group BeTutor__Portfolio">
					<label className="float-left">Portfolio Links</label>
					<input
						className="form-control mate-form-input"
						type="url"
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
						<IconButton>
							<AddCircleOutlineRoundedIcon />
						</IconButton>
					</div>
				</div>
				<div className="Be-Tutor__Availability">
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						{dayFields}
					</MuiPickersUtilsProvider>
				</div>
				<div className={`Search__Footer ${!changeMade ? 'disabled-btn' : ''}`}>
					<CTAButton text="Save" />
				</div>
			</form>
		</div>
	);
}

export default BeTutorForm;
