/** Dependencies */
import React, { useState } from 'react';
import moment from 'moment';
import { original, produce } from 'immer';

/** Components & Helpers */
import DatePicker from 'react-datepicker';
import CTAButton from '../general/CTAButton';
import useFields from '../../hooks/useFields';

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

function BeTutorForm({ user, update, availability }) {
	// Form Data
	const INITIAL_STATE = {
		keywords: '',
		portfolio: [],
	};
	console.log(availability);

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
				variant='inline'
				minutesStep={5}
				label={day.charAt(0).toUpperCase() + day.slice(1)}
				value={availability[day][0].start}
				onChange={(e) => handleDate(e, day, 'start', index)}
			/>
			<TimePicker
				clearable
				variant='inline'
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
			<div className='Availability__Remove'>
				<IconButton>
					<RemoveCircleOutlineSharpIcon />
				</IconButton>
			</div>
		</>
	);

	// Build Fields for Availability
	const dayFields = DAYS.map((day, index) => (
		<div className='Availability__Day'>
			<div className='Availability__TimePicker'>{timePickers(day)}</div>
			<div className='Availability__Add'>
				<IconButton>
					<AddCircleOutlineRoundedIcon />
				</IconButton>
			</div>
		</div>
	));

	return (
		<div className='BeTutorForm'>
			<form className='container mb-3' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='keywords' className='float-left'>
						I can help in...
					</label>
					<input
						id='keywords'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='keywords'
						value={formData.keywords}
					/>
				</div>
				<div className='form-group BeTutor__Portfolio'>
					<label htmlFor='portfolio-links' className='float-left'>
						Portfolio Links
					</label>
					<input
						id='portfolio-links'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='portfolio'
						value={formData.portfolio}
					/>
					<div className='Portfolio__Add'>
						<IconButton>
							<AddCircleOutlineRoundedIcon />
						</IconButton>
					</div>
				</div>
				<div className='Be-Tutor__Availability'>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						{dayFields}
					</MuiPickersUtilsProvider>
				</div>
				<div className={`Search__Footer ${!changeMade ? 'disabled-btn' : ''}`}>
					<CTAButton text='Save' />
				</div>
			</form>
		</div>
	);
}

export default BeTutorForm;
